import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import Button from "./Button";
import BrandLogo from "./BrandLogo";
import "./Header.css";

export default function Header({ title = "Study Assistant" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand">
          <BrandLogo title={title} />
        </div>

        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <button
            className="nav-link"
            onClick={() => handleNavigation("/dashboard")}
          >
            Dashboard
          </button>
        </nav>

        <div className="header-actions">
          <Button
            variant="ghost"
            size="sm"
            icon={FiLogOut}
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </Button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
