import { useEffect, useMemo, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';

import { Header } from './Header';
import { ScoreSubmission } from './ScoreSubmission';
import { RankViewer } from './RankViewer';
import { TeacherPanel } from './TeacherPanel';
import { CONTRACT_ADDRESS, CONTRACT_ABI, IS_PLACEHOLDER_ADDRESS } from '../config/contracts';
import '../styles/RankingApp.css';

type TabKey = 'submit' | 'rank' | 'teacher';

export function RankingApp() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<TabKey>('submit');

  const { data: ownerAddress } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'owner',
    query: {
      enabled: Boolean(!IS_PLACEHOLDER_ADDRESS),
    },
  });

  const isTeacher = useMemo(() => {
    if (!ownerAddress || !address) {
      return false;
    }
    return ownerAddress.toLowerCase() === address.toLowerCase();
  }, [ownerAddress, address]);

  const availableTabs: { key: TabKey; label: string }[] = useMemo(() => {
    const tabs: { key: TabKey; label: string }[] = [
      { key: 'submit', label: 'Submit Score' },
      { key: 'rank', label: 'View Rank' },
    ];

    if (isTeacher) {
      tabs.push({ key: 'teacher', label: 'Teacher Console' });
    }

    return tabs;
  }, [isTeacher]);

  useEffect(() => {
    if (activeTab === 'teacher' && !isTeacher) {
      setActiveTab('submit');
    }
  }, [activeTab, isTeacher]);

  return (
    <div className="ranking-app">
      <Header />
      <main className="main-content">
        <div>
          <div className="tab-navigation">
            <nav className="tab-nav">
              {availableTabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`tab-button ${activeTab === tab.key ? 'active' : 'inactive'}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === 'submit' && <ScoreSubmission />}
          {activeTab === 'rank' && <RankViewer />}
          {activeTab === 'teacher' && isTeacher && <TeacherPanel />}
        </div>
      </main>
    </div>
  );
}
