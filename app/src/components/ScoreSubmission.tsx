import { useState } from 'react';
import { Contract } from 'ethers';
import { useAccount } from 'wagmi';

import { useZamaInstance } from '../hooks/useZamaInstance';
import { useEthersSigner } from '../hooks/useEthersSigner';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';
import '../styles/ScoreSubmission.css';

export function ScoreSubmission() {
  const { address, isConnected } = useAccount();
  const { instance, isLoading: zamaLoading, error: zamaError } = useZamaInstance();
  const signerPromise = useEthersSigner();

  const [score, setScore] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConnected || !address) {
      setStatus('Connect your wallet to submit a score.');
      return;
    }

    if (!instance || !signerPromise) {
      setStatus('Encryption service not ready.');
      return;
    }

    const parsedScore = Number(score);
    if (!Number.isInteger(parsedScore) || parsedScore < 0 || parsedScore > 4294967295) {
      setStatus('Score must be an integer between 0 and 4,294,967,295.');
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus('Encrypting score...');

      const encryptedInput = await instance
        .createEncryptedInput(CONTRACT_ADDRESS, address)
        .add32(parsedScore)
        .encrypt();

      const signer = await signerPromise;
      if (!signer) {
        setStatus('Signer unavailable.');
        return;
      }

      const rankingContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setStatus('Submitting transaction...');
      const tx = await rankingContract.submitMyScore(encryptedInput.handles[0], encryptedInput.inputProof);
      await tx.wait();

      setScore('');
      setStatus('Score submitted successfully. Your rank will refresh shortly.');
    } catch (error) {
      console.error('Failed to submit score:', error);
      setStatus(error instanceof Error ? error.message : 'Failed to submit score.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="score-submission">
      <h2>Submit Your Score</h2>
      <p className="submission-description">
        Encrypt your score locally with Zama FHE and store it on-chain without exposing the value.
      </p>

      {zamaError && <div className="submission-alert">{zamaError}</div>}

      <form className="submission-form" onSubmit={handleSubmit}>

        <input
          type="number"
          value={score}
          min="0"
          max="4294967295"
          onChange={event => setScore(event.target.value)}
          placeholder="Enter your score"
          className="submission-input"
          required
        />

        <button
          type="submit"
          className="submission-button"
          disabled={isSubmitting || zamaLoading}
        >
          {zamaLoading ? 'Initializing encryption...' : isSubmitting ? 'Submitting...' : 'Submit Score'}
        </button>
      </form>

      {status && <div className="submission-status">{status}</div>}
    </div>
  );
}
