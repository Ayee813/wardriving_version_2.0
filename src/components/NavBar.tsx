import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <nav className="flex justify-between items-center bg-primary text-primary-foreground px-6 py-4 shadow-lg border-b border-primary/20 backdrop:shadow-lg sticky top-0 z-999">
        <ul>
          <li>
            <Link to="/">
              <h1 className="text-xl font-bold tracking-wide">
                CEIT CYBER X NETWORK
              </h1>
            </Link>
          </li>
        </ul>
        <ul className="flex justify-center items-center gap-10 mr-10 font-bold text-primary-foreground">
          <li>
            <Link to="/">Map</Link>
          </li>
          <li>
            <Link to="/analysis">Analysis</Link>
          </li>
          <li>
            <Link to="/about">AboutUs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
