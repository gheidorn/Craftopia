import React from 'react';
import { useAuth } from '../context/AuthContext';
import useFarming from '../hooks/useFarming';
import useCrafting from '../hooks/useCrafting';
import ActiveSession from '../components/farming/ActiveSession';
import ActiveCraftingSession from '../components/crafting/ActiveCraftingSession';
import { useNotification } from '../context/NotificationContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const { success: notifySuccess, error: notifyError } = useNotification();

  const {
    activeSession: farmingSession,
    loading: farmingLoading,
    collect: collectFarming,
    cancel: cancelFarming,
  } = useFarming();

  const {
    activeSessions: craftingSessions,
    loading: craftingLoading,
    collect: collectCrafting,
    cancel: cancelCrafting,
  } = useCrafting();

  const handleFarmingCollect = async () => {
    const result = await collectFarming();
    if (result.success) {
      notifySuccess(`Collected ${result.quantity}x ${result.material.name}!`);
    } else if (result.error) {
      notifyError(result.error);
    }
  };

  const handleFarmingCancel = async () => {
    if (window.confirm('Are you sure? You will lose any progress.')) {
      const result = await cancelFarming();
      if (result.success) {
        notifySuccess('Farming session cancelled.');
      } else if (result.error) {
        notifyError(result.error);
      }
    }
  };

  const handleCraftingCollect = async (sessionId) => {
    const result = await collectCrafting(sessionId);
    if (result.success) {
      notifySuccess(`Collected ${result.quantity}x ${result.component.name}!`);
    } else if (result.error) {
      notifyError(result.error);
    }
  };

  const handleCraftingCancel = async (sessionId) => {
    if (window.confirm('Are you sure? Materials will not be refunded.')) {
      const result = await cancelCrafting(sessionId);
      if (result.success) {
        notifySuccess('Crafting session cancelled.');
      } else if (result.error) {
        notifyError(result.error);
      }
    }
  };

  const hasActiveSessions = farmingSession || craftingSessions.length > 0;

  return (
    <div className="page dashboard-page">
      <div className="container">
        <h2 className="page-title">Welcome, {user?.username}!</h2>

        <div className="dashboard-grid">
          <div className="card dashboard-card">
            <h3>Farming</h3>
            <p>Gather materials from wood, metal, fish, and herbs.</p>
            <a href="/farming" className="button button-primary">
              Start Farming
            </a>
          </div>

          <div className="card dashboard-card">
            <h3>Crafting</h3>
            <p>Craft components from your collected materials.</p>
            <a href="/crafting" className="button button-primary">
              Start Crafting
            </a>
          </div>

          <div className="card dashboard-card">
            <h3>Bank</h3>
            <p>View your inventory of materials, components, and items.</p>
            <a href="/bank" className="button button-primary">
              View Bank
            </a>
          </div>

          <div className="card dashboard-card active-sessions-card">
            <h3>Active Sessions</h3>
            {!hasActiveSessions ? (
              <p className="empty-message">No active farming or crafting sessions.</p>
            ) : (
              <div className="session-grid">
                {farmingSession && (
                  <ActiveSession
                    session={farmingSession}
                    onCollect={handleFarmingCollect}
                    onCancel={handleFarmingCancel}
                    loading={farmingLoading}
                  />
                )}
                {craftingSessions.map((session) => (
                  <ActiveCraftingSession
                    key={session.id}
                    session={session}
                    onCollect={handleCraftingCollect}
                    onCancel={handleCraftingCancel}
                    loading={craftingLoading}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
