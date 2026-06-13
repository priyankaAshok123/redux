const Flex = () => {
  return (
    <div className="page">
      <header className="header">
        <div className="headerinner">
          <img src="" alt="logo" />
          <p>Profile</p>
        </div>
      </header>

      <div className="body">
        <aside className="sidebar">
          <div className="sidebarmenu">
            <p>Home</p>
            <p>More</p>
            <p>Download</p>
          </div>
        </aside>

        <main className="main">
          <div className="cards">
            <div className="card">Card 1</div>
            <div className="card">Longer Card Content</div>
            <div className="card">Card 3</div>
          </div>

          <div className="table-wrapper">
            <table>
              <tbody>
                {[...Array(30)].map((_, i) => (
                  <tr key={i}>
                    <td>Row {i}</td>
                    <td>Data</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <footer className="footer">I am footer</footer>
    </div>
  );
};


export default Flex;