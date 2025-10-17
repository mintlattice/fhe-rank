import { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';

import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';
import { useZamaInstance } from '../hooks/useZamaInstance';
import { useEthersSigner } from '../hooks/useEthersSigner';
import '../styles/RankViewer.css';

type DecryptedData = {
  score: number;
  rank: number;
};

export function RankViewer() {
  const { address } = useAccount();
  const { instance, error: zamaError } = useZamaInstance();
  const signerPromise = useEthersSigner();

  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decrypted, setDecrypted] = useState<DecryptedData | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { data: hasScore } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'hasScore',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const { data: encryptedScore } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getEncryptedScore',
    args: address && hasScore ? [address] : undefined,
    query: {
      enabled: Boolean(address && hasScore),
    },
  });

  const { data: encryptedRank } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getEncryptedRank',
    args: address && hasScore ? [address] : undefined,
    query: {
      enabled: Boolean(address && hasScore),
    },
  });

  const decrypt = async () => {
    if (!instance || !address || !encryptedScore || !encryptedRank || !signerPromise) {
      setStatusMessage('Missing requirements for decryption.');
      return;
    }

    setIsDecrypting(true);
    setStatusMessage('Preparing decryption request...');

    try {
      const keypair = instance.generateKeypair();

      const handleContractPairs = [
        { handle: encryptedScore as string, contractAddress: CONTRACT_ADDRESS },
        { handle: encryptedRank as string, contractAddress: CONTRACT_ADDRESS },
      ];

      const startTimestamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = '10';
      const contractAddresses = [CONTRACT_ADDRESS];

      const eip712 = instance.createEIP712(
        keypair.publicKey,
        contractAddresses,
        startTimestamp,
        durationDays
      );

      const signer = await signerPromise;
      if (!signer) {
        setStatusMessage('Signer unavailable.');
        return;
      }

      const signature = await signer.signTypedData(
        eip712.domain,
        { UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification },
        eip712.message
      );

      setStatusMessage('Decrypting with Zama Relayer...');
      const decryptedResult = await instance.userDecrypt(
        handleContractPairs,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace('0x', ''),
        contractAddresses,
        address,
        startTimestamp,
        durationDays
      );

      const scoreValue = decryptedResult[encryptedScore as string];
      const rankValue = decryptedResult[encryptedRank as string];

      setDecrypted({
        score: scoreValue ? Number(scoreValue) : 0,
        rank: rankValue ? Number(rankValue) : 0,
      });
      setStatusMessage('Decryption complete.');
    } catch (error) {
      console.error('Failed to decrypt values:', error);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to decrypt.');
    } finally {
      setIsDecrypting(false);
    }
  };

  if (!address) {
    return (
      <div className="rank-viewer">
        <p className="rank-message">Connect your wallet to view encrypted scores.</p>
      </div>
    );
  }

  if (!hasScore) {
    return (
      <div className="rank-viewer">
        <div className="rank-card empty">
          <h2>No Score Found</h2>
          <p>Submit your score first to receive an encrypted ranking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rank-viewer">
      <div className="rank-card">
        <h2>Your Encrypted Performance</h2>
        <p className="rank-description">
          Both your score and rank are stored encrypted on-chain. Decrypt them locally whenever you need insights.
        </p>

        {zamaError && <div className="rank-alert">{zamaError}</div>}

        <div className="encrypted-grid">
          <div className="encrypted-item">
            <label>Encrypted Score Handle</label>
            <code className="encrypted-value">{(encryptedScore as string).slice(0, 16)}...</code>
          </div>
          <div className="encrypted-item">
            <label>Encrypted Rank Handle</label>
            <code className="encrypted-value">{(encryptedRank as string).slice(0, 16)}...</code>
          </div>
        </div>

        {decrypted ? (
          <div className="decrypted-grid">
            <div className="decrypted-item">
              <span className="decrypted-label">Score</span>
              <span className="decrypted-number">{decrypted.score}</span>
            </div>
            <div className="decrypted-item">
              <span className="decrypted-label">Rank</span>
              <span className="decrypted-number">{decrypted.rank}</span>
            </div>
          </div>
        ) : (
          <div className="decrypted-placeholder">
            <p>Your decrypted values will appear here.</p>
          </div>
        )}

        <button
          className="decrypt-button"
          onClick={decrypt}
          disabled={isDecrypting || !instance}
        >
          {isDecrypting ? 'Decrypting...' : 'Decrypt My Score & Rank'}
        </button>

        {statusMessage && <div className="rank-status">{statusMessage}</div>}
      </div>
    </div>
  );
}
