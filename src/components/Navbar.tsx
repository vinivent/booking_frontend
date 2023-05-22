import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <header>
      <nav className="flex items-center justify-center bg-white bg-opacity-90 py-4 px-8 border-b-2 border-red-900 h-14">
        <Link to="/" className="text-white font-poppins font-semibold">
          <img src={logo} alt="logo" className="w-14" />
        </Link>
       </nav>
    </header>
  );
}

export default Navbar;
