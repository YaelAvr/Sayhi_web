import React from "react";
import "./LoginPage.css";
import { useState } from "react";

// const generateToken = async () => {
//   try {
//     const response = await fetch("/api/tokens/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();
//     console.log("Token:", data.token);
//   } catch (error) {
//     console.error("Error generating token:", error);
//   }
// };

// function generateToken() {
//   const token = localStorage.getItem("token");
//   if (token) {
//     console.log("Token:", token);
//   } else {
//     console.error("No token found in localStorage.");
//   }
// }

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    //   const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 201) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      generateToken(); // Call the function to log the token
      alert("Login successful"); // לשנות למעבר עמוד לאינבוקס
    } else {
        alert("Invalid username and/or password");

    }
  };

 const generateToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Token:", token);
  } else {
    console.error("No token found in localStorage.");
  }
}

  return (
    <div className="login-page">
      <h1>Sign in</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="input"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {/* <input className="input" type="text" id="username" name="username" required /> */}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          {/* <input type="password" className="input" id="password" name="password" required /> */}
        </div>
        {/*  <Link to="../registerPage/RegisterPage">Create a new account</Link> */}
        <a>Create a new account</a>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginPage;
