import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <header>
          <h1>Welcome to My React App!</h1>
          Name: Braza, Joshua <br />
          Student Number: 2023-102112 <br />
          Block: INF 234 <br />
          Email: brazaj@students.national-u.edu.ph <br />
        </header>
      </div>
    </>
  );
}

export default App;
