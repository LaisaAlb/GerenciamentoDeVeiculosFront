import { Link } from "react-router-dom"; 
import { FiBarChart2, FiGrid, FiLogOut, FiMenu } from "react-icons/fi";
import logo from "../../assets/logo-epta.png";
import "./header.css";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
        <FiMenu size={24} />
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-container">
          <img src={logo} alt="Logo da empresa EPTA Tecnologia" />
          <p>Navegação</p>
        </div>

        <nav className="nav-links">
          <Link to="/dashboard" className="nav-link">
            <FiGrid size={20} />
            Dashboard
          </Link>

          <Link to="#" className="nav-link">
            <FiBarChart2 size={20} />
            Relatórios
          </Link>

          <Link to="/" className="nav-link" onClick={() => localStorage.clear()}>
            <FiLogOut size={20} />
            Sair
          </Link>
        </nav>
      </div>
    </div>
  );
}
