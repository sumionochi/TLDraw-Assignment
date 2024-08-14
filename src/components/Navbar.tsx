import "../index.css";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#"><img src="public\logo.png" alt="public\logo.png"/></a>
      <p className="navbarText">Create Timeline Slide</p>
      <div className="navbarUser">
        <button className="navbarButton">Export to Google Slides</button>
        <div className="avatar"><p style={{fontSize: '1.5rem'}}>A</p></div>
      </div>
    </nav>
  );
}

export default Navbar;
