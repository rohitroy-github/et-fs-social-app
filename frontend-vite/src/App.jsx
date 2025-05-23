import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import FeedPage from "./pages/FeedPage";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>

      <Layout>
        <Navbar />

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/:username/profile" element={<ProfilePage />} />
          <Route path="/:username/feed" element={<FeedPage />} />
        </Routes>

        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
