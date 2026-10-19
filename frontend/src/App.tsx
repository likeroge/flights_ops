import { useNavigate } from "react-router";
import "./App.css";

export function App() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Frontend App</h1>
      <button onClick={() => navigate("/flights")}>Flights</button>{" "}
    </>
  );
}

export default App;
