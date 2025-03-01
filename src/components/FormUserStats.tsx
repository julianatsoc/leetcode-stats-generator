import { useState } from "react";
import { useNavigate } from "react-router-dom";
import leetcodelogo from "../assets/leetcodelogo.png";

const FormUserStats = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      navigate(`/stats/${username}`);
    }
  };

  return (
    <div className="p-8 bg-stone-800 text-white rounded-lg shadow-lg w-lg flex flex-col items-center">
      <img src={leetcodelogo} width={120} alt="LeetCode Logo" />
      <h2 className="text-lg font-semibold mb-4">
        Generate your LeetCode Stats
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border-none outline-0 text-center focus:bg-stone-800"
          placeholder="Insert your LeetCode username"
        />
        <button
          type="submit"
          className="mt-4 bg-stone-500 hover:bg-stone-600 text-white py-2 px-4 rounded w-full"
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default FormUserStats;
