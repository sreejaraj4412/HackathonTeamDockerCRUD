
import { useEffect, useState } from 'react';

const initialForm = {
  teamName: '',
  projectTitle: '',
  memberCount: '',
  qualified: false,
};

function HackathonTeamForm({ onSubmit, editData, onCancel, saving }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    setFormData(
      editData
        ? {
            teamName: editData.teamName ?? '',
            projectTitle: editData.projectTitle ?? '',
            memberCount: editData.memberCount ?? '',
            qualified: editData.qualified ?? false,
          }
        : initialForm
    );
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit({
      ...formData,
      memberCount: Number(formData.memberCount),
      qualified: Boolean(formData.qualified),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="teamName" className="form-label">Team Name</label>
        <input
          id="teamName"
          name="teamName"
          className="form-control"
          value={formData.teamName}
          onChange={handleChange}
          placeholder="Enter team name"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="projectTitle" className="form-label">Project Title</label>
        <input
          id="projectTitle"
          name="projectTitle"
          className="form-control"
          value={formData.projectTitle}
          onChange={handleChange}
          placeholder="Enter project title"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="memberCount" className="form-label">Member Count</label>
        <input
          id="memberCount"
          name="memberCount"
          type="number"
          min="1"
          className="form-control"
          value={formData.memberCount}
          onChange={handleChange}
          placeholder="Enter member count"
          required
        />
      </div>

      <div className="form-check mb-3">
        <input
          id="qualified"
          name="qualified"
          type="checkbox"
          className="form-check-input"
          checked={formData.qualified}
          onChange={handleChange}
        />
        <label htmlFor="qualified" className="form-check-label">Qualified</label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={saving}>
        {saving ? 'Saving...' : editData ? 'Update Team' : 'Add Team'}
      </button>

      {editData && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default HackathonTeamForm;
