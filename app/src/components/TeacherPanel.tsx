import { useMemo, useState } from 'react';
import { Contract, isAddress, getAddress } from 'ethers';
import { useAccount, useReadContract } from 'wagmi';

import { useZamaInstance } from '../hooks/useZamaInstance';
import { useEthersSigner } from '../hooks/useEthersSigner';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';
import '../styles/TeacherPanel.css';

type Entry = {
  student: string;
  score: string;
};

export function TeacherPanel() {
  const { address } = useAccount();
  const { instance, isLoading: zamaLoading, error: zamaError } = useZamaInstance();
  const signerPromise = useEthersSigner();

  const [entries, setEntries] = useState<Entry[]>([{ student: '', score: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const { data: registeredStudents } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getStudents',
    query: {
      enabled: true,
    },
  });

  const canSubmit = useMemo(() => {
    if (!instance || !address || !signerPromise) {
      return false;
    }

    return entries.every(entry => entry.student && entry.score);
  }, [entries, instance, address, signerPromise]);

  const updateEntry = (index: number, field: keyof Entry, value: string) => {
    setEntries(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addRow = () => {
    setEntries(prev => [...prev, { student: '', score: '' }]);
  };

  const removeRow = (index: number) => {
    setEntries(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!instance || !address || !signerPromise) {
      setFeedback('Missing encryption context or wallet connection.');
      return;
    }

    const normalizedEntries = entries.map(entry => ({
      student: entry.student.trim(),
      score: entry.score.trim(),
    }));

    for (const entry of normalizedEntries) {
      if (!entry.student || !isAddress(entry.student)) {
        setFeedback('Please provide valid student addresses.');
        return;
      }

      const numericScore = Number(entry.score);
      if (!Number.isInteger(numericScore) || numericScore < 0 || numericScore > 4294967295) {
        setFeedback('Scores must be integers between 0 and 4,294,967,295.');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      setFeedback('Encrypting scores...');

      const encryption = instance.createEncryptedInput(CONTRACT_ADDRESS, address);
      normalizedEntries.forEach(entry => {
        const numericScore = Number(entry.score);
        encryption.add32(numericScore);
      });

      const encryptedInput = await encryption.encrypt();

      const signer = await signerPromise;
      if (!signer) {
        setFeedback('Signer unavailable.');
        return;
      }

      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const studentAddresses = normalizedEntries.map(entry => getAddress(entry.student));
      const handles = encryptedInput.handles.slice(0, normalizedEntries.length);

      setFeedback('Submitting transaction...');
      const tx = await contract.batchSubmitScores(studentAddresses, handles, encryptedInput.inputProof);
      await tx.wait();

      setFeedback('Scores stored successfully. Rankings are now refreshed.');
      setEntries([{ student: '', score: '' }]);
    } catch (error) {
      console.error('Failed to submit scores:', error);
      setFeedback(error instanceof Error ? error.message : 'Failed to submit scores.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="teacher-panel">
      <div className="panel-header">
        <h2>Batch Score Upload</h2>
        {registeredStudents && (
          <span className="student-count">{(registeredStudents as string[]).length} students registered</span>
        )}
      </div>

      {zamaError && (
        <div className="panel-alert">{zamaError}</div>
      )}

      <form className="teacher-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {entries.map((entry, index) => (
            <div key={`${index}-${entry.student}`} className="form-row">
              <div className="input-group">
                <label>Student Address</label>
                <input
                  type="text"
                  value={entry.student}
                  placeholder="0x..."
                  onChange={event => updateEntry(index, 'student', event.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Score</label>
                <input
                  type="number"
                  min="0"
                  max="4294967295"
                  value={entry.score}
                  onChange={event => updateEntry(index, 'score', event.target.value)}
                  placeholder="Enter score"
                  required
                />
              </div>
              {entries.length > 1 && (
                <button type="button" className="remove-row" onClick={() => removeRow(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="panel-actions">
          <button type="button" className="add-row" onClick={addRow}>
            Add Another Student
          </button>
          <button type="submit" disabled={!canSubmit || isSubmitting || zamaLoading} className="submit">
            {zamaLoading ? 'Initializing encryption...' : isSubmitting ? 'Submitting...' : 'Upload Scores'}
          </button>
        </div>
      </form>

      {feedback && <div className="panel-feedback">{feedback}</div>}
    </div>
  );
}
