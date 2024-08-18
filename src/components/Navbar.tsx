import "../index.css";

interface NavbarProps {
  toggleSidebar: () => void;
}

function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <nav className="navbar">
      <a href="#"><img src="https://64.media.tumblr.com/d7d598288ac457dd78c3b64217f99cf2/cd9cf5c94cc6db8d-4d/s75x75_c1/b5256b77bcf10e2bdaccf2c920b0166e638ea54d.pnj" alt="Logo" /></a>
      <p className="navbarText">Create Flowchart Slide</p>
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
