import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="toggle-auth"
        >
          {isRegister ? "Have an account? Login" : "New user? Register"}
        </button>
      </form>
    </div>
  );
}
