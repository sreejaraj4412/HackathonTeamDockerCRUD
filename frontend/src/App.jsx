
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import HackathonTeamForm from './components/HackathonTeamForm.jsx';
import HackathonTeamList from './components/HackathonTeamList.jsx';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

const isQualified = (value) => {
  if (value === true || value === 1) return true;

  return ['true', '1', 'yes', 'qualified'].includes(
    String(value).trim().toLowerCase()
  );
};

function App() {
  const [teams, setTeams] = useState([]);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  // GET: Display all teams
  const fetchTeams = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/displayAll`);
      const data = Array.isArray(response.data) ? response.data : [];

      console.log('Teams received from backend:', data);
      setTeams(data);
      setMessage('');
    } catch (error) {
      console.error('Fetch teams error:', error);
      setMessage(
        'Cannot load teams. Check that the backend is running on port 8081.'
      );
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // POST: Add team | PUT: Update team
  const handleSubmit = async (formData) => {
    const isEditing = Boolean(editData);
    setSaving(true);
    setMessage('');

    try {
      const payload = {
        teamName: formData.teamName,
        projectTitle: formData.projectTitle,
        memberCount: Number(formData.memberCount),
        qualified: isQualified(formData.qualified),
      };

      if (isEditing) {
        await axios.put(`${API_URL}/update/${editData.id}`, payload);
      } else {
        await axios.post(`${API_URL}/addTeam`, payload);
      }

      alert(
        isEditing
          ? '✅ Team updated successfully!'
          : '🎉 Team added successfully!'
      );

      setMessage(
        isEditing
          ? 'Team updated successfully!'
          : 'New hackathon team added successfully!'
      );
      setMessageType('success');
      setEditData(null);
      setSearchResult(null);

      await fetchTeams();
    } catch (error) {
      console.error('Save team error:', error);

      const details =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Please try again.';

      alert(
        `❌ Failed to ${isEditing ? 'update' : 'add'} team!\n${details}`
      );

      setMessage(
        `Failed to ${isEditing ? 'update' : 'add'} team. ${details}`
      );
      setMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  // DELETE: Delete team
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team?')) {
      return;
    }

    setDeletingId(id);
    setMessage('');

    try {
      await axios.delete(`${API_URL}/delete/${id}`);

      alert('🗑️ Team deleted successfully!');
      setMessage('Team deleted successfully!');
      setMessageType('success');

      if (String(editData?.id) === String(id)) {
        setEditData(null);
      }

      if (String(searchId) === String(id)) {
        setSearchResult(null);
        setSearchError('Team not found.');
      }

      await fetchTeams();
    } catch (error) {
      console.error('Delete team error:', error);

      alert(
        `❌ Failed to delete team!\n${
          error.response?.data?.message || error.message || 'Please try again.'
        }`
      );

      setMessage('Unable to delete team. Please try again.');
      setMessageType('error');
    } finally {
      setDeletingId(null);
    }
  };

  // GET: Find team by ID
  const findTeam = async (e) => {
    e.preventDefault();
    setSearchResult(null);
    setSearchError('');

    const id = searchId.trim();

    if (!/^[1-9]\d*$/.test(id)) {
      setSearchError('Please enter a valid team ID.');
      alert('⚠️ Please enter a valid team ID.');
      return;
    }

    setSearchLoading(true);

    try {
      const response = await axios.get(`${API_URL}/displayById/${id}`);
      const data = response.data;

      if (!data || data.id == null || String(data.id) !== id) {
        setSearchError('Team not found.');
        alert('❌ Team not found!');
        return;
      }

      setSearchResult(data);

      alert(
        `✅ Team found successfully!\n\n` +
          `Team ID: ${data.id}\n` +
          `Team Name: ${data.teamName}\n` +
          `Project: ${data.projectTitle}\n` +
          `Members: ${data.memberCount}\n` +
          `Status: ${isQualified(data.qualified) ? 'Qualified' : 'Not Qualified'}`
      );
    } catch (error) {
      console.error('Find team error:', error);

      setSearchError('Team not found. Check the team ID.');

      alert(
        `❌ Search failed!\n${
          error.response?.status === 404
            ? `Team ID ${id} was not found.`
            : error.response?.data?.message ||
              error.message ||
              'Please check the backend and try again.'
        }`
      );
    } finally {
      setSearchLoading(false);
    }
  };

  // Dashboard statistics
  const qualified = teams.filter(
    (team) => isQualified(team.qualified)
  ).length;

  const notQualified = teams.length - qualified;

  return (
    <div className="app-shell">
      <Navbar />

      <main className="dashboard container py-5" id="home">
        {/* Page heading: top Create Your Team button removed */}
        <header className="hero-section">
          <div className="hero-label">
            ✦ INNOVATE · COLLABORATE · CREATE ✦
          </div>

          <h1>
            Hackathon <span>Team Hub</span>
          </h1>

          <p>
            Big ideas start with great teams. Manage your next breakthrough here.
          </p>
        </header>

        {message && (
          <div className={`notice ${messageType}`} role="alert">
            <span>{message}</span>
            <button
              type="button"
              onClick={() => setMessage('')}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}

        {/* Dashboard statistics */}
        <section className="stats-grid">
          <div className="stat-card stat-purple">
            <div className="stat-icon">🚀</div>
            <p>Total Teams</p>
            <h2>{teams.length}</h2>
            <span>Teams registered</span>
          </div>

          <div className="stat-card stat-green">
            <div className="stat-icon">🏆</div>
            <p>Qualified Teams</p>
            <h2>{qualified}</h2>
            <span>Ready to compete</span>
          </div>

          <div className="stat-card stat-orange">
            <div className="stat-icon">💡</div>
            <p>Not Qualified</p>
            <h2>{notQualified}</h2>
            <span>Ideas in progress</span>
          </div>
        </section>

        {/* Add or update team */}
        <section className="glass-panel" id="register">
          <div className="section-heading">
            <div className="section-icon">✎</div>
            <div>
              <h2>
                {editData ? 'Update Your Team' : 'Create a New Team'}
              </h2>
              <p>Every great innovation starts with an idea.</p>
            </div>
          </div>

          <HackathonTeamForm
            onSubmit={handleSubmit}
            editData={editData}
            onCancel={() => setEditData(null)}
            saving={saving}
          />
        </section>

        {/* All teams */}
        <section className="glass-panel" id="teams">
          <div className="section-heading">
            <div className="section-icon">◈</div>
            <div>
              <h2>Explore Teams</h2>
              <p>All registered teams in one place.</p>
            </div>
          </div>

          <HackathonTeamList
            teams={teams}
            loading={loading}
            deletingId={deletingId}
            onEdit={(team) => {
              setEditData(team);
              document.getElementById('register')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            onDelete={handleDelete}
            onRefresh={fetchTeams}
          />
        </section>

        {/* Search team */}
        <section className="glass-panel" id="find-team">
          <div className="section-heading">
            <div className="section-icon">⌕</div>
            <div>
              <h2>Find a Team</h2>
              <p>Search for a team using its unique ID.</p>
            </div>
          </div>

          <form className="search-row" onSubmit={findTeam}>
            <input
              type="number"
              min="1"
              placeholder="Enter team ID..."
              value={searchId}
              onChange={(e) => {
                setSearchId(e.target.value);
                setSearchResult(null);
                setSearchError('');
              }}
              required
            />

            <button
              type="submit"
              className="gradient-button"
              disabled={searchLoading}
            >
              {searchLoading ? 'Searching...' : 'Search Team →'}
            </button>
          </form>

          {searchError && (
            <p className="search-error">{searchError}</p>
          )}

          {searchResult && (
            <div className="team-result">
              <h3>{searchResult.teamName}</h3>
              <p>
                <strong>Team ID:</strong> {searchResult.id}
              </p>
              <p>
                <strong>Project:</strong> {searchResult.projectTitle}
              </p>
              <p>
                <strong>Members:</strong> {searchResult.memberCount}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {isQualified(searchResult.qualified)
                  ? '🏆 Qualified'
                  : '⏳ Not Qualified'}
              </p>
            </div>
          )}
        </section>

        <footer className="dashboard-footer">
          <div className="footer-logo">✦ HackathonTeam</div>
          <p>Dream big. Build together. Make an impact.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
