import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const handleLogout = () => {
    // Clear cookie on backend if needed (optional)
    fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

    setLoggedInUser(null); // Update state
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          FoodbotAi
        </Link>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarsExample02"
        >
          <div className="d-flex gap-2 me-5">
            {!loggedInUser ? (
              <>
                <Link to="/login" className="btn btn-outline-light">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-light text-dark">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-white me-2 mt-1">
                  hello User {loggedInUser.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
