import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();
      setResponseMsg(result.message || "Signup successful.");
    } catch {
      setResponseMsg("Signup failed. Please try again.");
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
          <h1 className="h3 mb-3 fw-normal">Create your account</h1>
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

        <button className="btn btn-success w-100 py-2" type="submit">
          Sign up
        </button>

        {responseMsg && (
          <div className="alert alert-info mt-3 text-center">{responseMsg}</div>
        )}

        <p className="mt-5 mb-3 text-body-secondary text-center">© 2017–2025</p>
      </form>
    </div>
  );
}
