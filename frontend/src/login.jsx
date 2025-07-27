import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (res.ok) {
        const profileRes = await fetch(
          "http://localhost:5000/api/user/profile",
          {
            credentials: "include",
          }
        );

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setLoggedInUser(profileData.username);
          setResponseMsg("Logged in successfully.");
          navigate("/");
        } else {
          setResponseMsg("Login cookie invalid or expired.");
        }
      } else {
        setResponseMsg(result.message || result.error || "Login failed.");
      }
    } catch (error) {
      setResponseMsg("Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
        className="w-100"
        style={{ maxWidth: "330px" }}
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingUsername"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="floatingUsername">Username</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>

        {responseMsg && (
          <div className="alert alert-info mt-3 text-center">{responseMsg}</div>
        )}

        <p className="mt-5 mb-3 text-body-secondary text-center">© 2017–2025</p>
      </form>
    </div>
  );
}
