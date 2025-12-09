import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-primary text-primary-foreground px-6 py-4 shadow-lg border-b border-primary/20 backdrop:shadow-lg sticky top-0 left-0 w-full z-[1000]">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-lg md:text-xl font-bold tracking-wide">
            CEIT CYBER X NETWORK
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex justify-center items-center gap-10 font-bold text-primary-foreground">
          <li>
            <Link to="/" className="hover:opacity-80 transition-opacity">Map</Link>
          </li>
          <li>
            <Link to="/analysis" className="hover:opacity-80 transition-opacity">Analysis</Link>
          </li>
          <li>
            <Link to="/game" className="hover:opacity-80 transition-opacity">Game</Link>
          </li>
          <li>
            <Link to="/about" className="hover:opacity-80 transition-opacity">AboutUs</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 hover:bg-primary-foreground/10 rounded-md transition-colors z-[1102]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1100] md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-primary text-primary-foreground z-[1101] transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-primary-foreground/20">
            <h2 className="text-lg font-bold">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-primary-foreground/10 rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <ul className="flex flex-col gap-2 p-6 font-bold">
            <li>
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="block py-3 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                to="/analysis"
                onClick={closeMobileMenu}
                className="block py-3 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              >
                Analysis
              </Link>
            </li>
            <li>
              <Link
                to="/game"
                onClick={closeMobileMenu}
                className="block py-3 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              >
                Game
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="block py-3 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="block py-3 px-4 hover:bg-primary-foreground/10 rounded-md transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
