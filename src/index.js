import React from "react";
import ReactDOM from "react-dom";
import Routes from "./pages/routes";
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from "./components/topBar";
import { CurrentUserProvider } from "./context/currentUser";
import CurrentUserChecker from "./components/currentUserChecker";

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
