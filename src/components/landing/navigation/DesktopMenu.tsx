
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DesktopMenu = () => {
  return (
    <nav className="hidden md:flex space-x-6">
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        to="/browse"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Browse Classes
      </Link>
      <Link
        to="/teach"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Teach
      </Link>
      <Link
        to="/about"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        About
      </Link>
    </nav>
  );
};

export default DesktopMenu;
