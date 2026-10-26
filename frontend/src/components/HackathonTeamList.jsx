
function HackathonTeamList({
  teams = [],
  loading,
  deletingId,
  onEdit,
  onDelete,
  onRefresh,
}) {
  const isQualified = (value) =>
    value === true ||
    value === 1 ||
    ['true', '1', 'yes', 'qualified'].includes(
      String(value).trim().toLowerCase()
    );

  return (
    <div className="team-list-container">
      <div className="team-list-toolbar">
        <p className="team-total">Total: {teams.length} teams</p>

        <button
          type="button"
          className="refresh-button"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

      {loading ? (
        <p className="team-empty">Loading teams...</p>
      ) : teams.length === 0 ? (
        <div className="team-empty">
          <h3>No teams registered yet</h3>
          <p>Create your first team using the form above.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table team-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Project Title</th>
                <th>Members</th>
                <th>Qualified</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>{team.teamName}</td>
                  <td>{team.projectTitle}</td>
                  <td>{team.memberCount}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        isQualified(team.qualified)
                          ? 'qualified-badge'
                          : 'not-qualified-badge'
                      }`}
                    >
                      {isQualified(team.qualified)
                        ? 'Qualified'
                        : 'Not Qualified'}
                    </span>
                  </td>

                  <td>
                    <div className="team-actions">
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => onEdit(team)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => onDelete(team.id)}
                        disabled={deletingId === team.id}
                      >
                        {deletingId === team.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HackathonTeamList;
