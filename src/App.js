import { useRoutes } from "react-router-dom";
import "./App.css";
import Aside from "./Component/Aside/Aside";
import Header from "./Component/Header/Header";
import routes from "./Routes";

function App() {
  let router = useRoutes(routes);
  return (
    <div className="App">
      <Aside />
      <main className="main">
        <Header />
        {router}
      </main>
     
    </div>
  );
}

export default App;
