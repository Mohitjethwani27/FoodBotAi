import { useRef, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Input() {
  const inputRef = useRef(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser } = useContext(AuthContext);

  const handleSubmit = async () => {
    const text = inputRef.current.value.trim();

    if (!loggedInUser) {
      setResponseMsg("Please login to continue.");
      return;
    }

    if (!text) {
      setResponseMsg("Please enter a conversation.");
      return;
    }

    setIsLoading(true);
    setResponseMsg("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/aiagent/parseandcreate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ conversation: text }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setResponseMsg(result.error || "Failed to create lead.");
      } else if (result.message === "Lead created successfully") {
        setResponseMsg("Lead added successfully.");
        inputRef.current.value = "";
      } else {
        setResponseMsg(result.message || "Done.");
      }
    } catch (error) {
      setResponseMsg("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-3 mt-5 w-50 mx-auto">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        Enter Conversation
      </label>
      <textarea
        ref={inputRef}
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="6"
      ></textarea>

      <div className="col-auto mt-3">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </div>

      {responseMsg && (
        <div className="alert alert-info mt-3" role="alert">
          {responseMsg}
        </div>
      )}
    </div>
  );
}
