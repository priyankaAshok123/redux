const DashboardFlex = () => {
  return (
    <div className="page">
      {/* APP HEADER */}
      <header className="app-header">
        <h3>Dashboard</h3>
        <span>Profile</span>
      </header>

      {/* BODY */}
      <div className="body">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-top">
            <p>Home</p>
            <p>Analytics</p>
            <p>Reports</p>
            <p>Users</p>
            <p>Settings</p>
            {Array.from({ length: 15 }).map((_, i) => (
              <p key={i}>Menu {i + 1}</p>
            ))}
          </div>

          <div className="sidebar-bottom">
            <p>Help</p>
            <p>Logout</p>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          {/* DASHBOARD HEADER (Sticky via Flexbox) */}
          <div className="dashboard-header">
            <h4>Overview</h4>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="content">
            {Array.from({ length: 40 }).map((_, i) => (
              <div className="card" key={i}>
                Content Card {i + 1}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardFlex;
