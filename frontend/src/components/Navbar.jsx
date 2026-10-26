
function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: 'rgba(12, 9, 32, 0.94)',
        borderBottom: '1px solid rgba(167, 139, 250, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(14px)',
      }}
    >
      <div className="container">
        <a
          className="navbar-brand fw-bold"
          href="#home"
          style={{ color: '#c4a7ff' }}
        >
          ✦ HackathonTeam
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hackathonNavbar"
          aria-controls="hackathonNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="hackathonNavbar">
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#home">Home</a>
            <a className="nav-link" href="#register">Create Team</a>
            <a className="nav-link" href="#teams">Explore Teams</a>
            <a className="nav-link" href="#find-team">Find Team</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
