import React, { useState }from "react";
import "../styles/Navbar.css"

const links = ["Profile","Work Experience", "Skills", "Projects", "Achievements", " Blogs and Research", "Contact"];

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="navbar">
            <a href="#hero" className="logo">Ama Adu-Mensah.</a>

            <button
             className="menu-btn"
             aria-label="Toggle menu"
             aria-expanded={open}
             onClick={() => setOpen(!open)}
            >
                ☰
            </button>

            <nav>
                <ul className={open ? "nav-list open" : "nav-list"}>
                    {links.map((link) => (
                        <li key={link}>
                            <a href={`#${link}`} onClick={() => setOpen(false)}>
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>


        </header>
    )
}

export default Navbar;

