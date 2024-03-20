import { Link, useLocation } from "react-router-dom";
import { destroyCookie, parseCookies } from "nookies";
import toast from "react-hot-toast";

export default function Navbar() {
  const { pathname } = useLocation();

  const isLoggedIn = document.cookie;
  const cookieValue = parseCookies(null, isLoggedIn);
  const isAuthenticated = cookieValue?.TwtiterAuth;

  const handleLogout = async () => {
    destroyCookie(null, "TwtiterAuth");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    toast.success("Logged Out.");
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      resolve();
    });
  };
  return (
    <nav className="navbar border-b-2 border-[--acc]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="text-[--acc] menu outline rounded menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 w-52"
          >
            <li>
              <Link
                to="/"
                className={`${
                  pathname === "/" && "border-b-2  border-[--acc]"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                className={`${
                  pathname === "/about" && "border-b-2  border-[--acc]"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                className={`${
                  pathname === "/contact" && "border-b-2  border-[--acc]"
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl text-[--acc]">
          Twitter
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="text-[--acc] menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className={`${pathname === "/" && "border-b-2  border-[--acc]"}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="about"
              className={`${
                pathname === "/about" && "border-b-2  border-[--acc]"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              className={`${
                pathname === "/contact" && "border-b-2  border-[--acc]"
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            type="button"
            className="px-4 py-2  bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md"
          >
            Logout
          </button>
        )}
        {!isAuthenticated && (
          <button
            type="button"
            className="px-4 py-2 hover:bg-[--acc] hover:text-black transition font-semibold text-white border-2 border-[--acc] rounded"
          >
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
}
