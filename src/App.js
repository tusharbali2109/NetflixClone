import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Banner from "./components/banner/Banner";
import List from "./components/list/List";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                <Header />
                <Login />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                <Header />
                <Login />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <div>
                <Header />
                <Banner />
                <List title="Netflix Originals" param="originals" />
                <List title="Trending Now" param="trending" />
                <List title="Now Playing" param="now_playing" />
                <List title="popular" param="popular" />
                <List title="Top Rated" param="top_rated" />
                <List title="Upcoming" param="upcoming" />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
