import "../index.css";

interface NavbarProps {
  toggleSidebar: () => void;
}

function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <nav className="navbar">
      <a href="#"><img src="public/logo.png" alt="Logo" /></a>
      <p className="navbarText">Create Timeline Slide</p>
      <div className="navbarUser">
        <button className="navbarButton">Export to Google Slides</button>
        <div className="avatar"><p style={{fontSize: '1.5rem'}}>A</p></div>
      </div>
      <button className="toggleSidebarButtonSmall" onClick={toggleSidebar}>
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
