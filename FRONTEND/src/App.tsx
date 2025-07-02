// FRONTEND>src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoute"; 
import CreatorRoutes from "./routes/CreatorRoute"; 
import AdminRoutes from "./routes/AdminRoute";
import LandingPage from "./components/layout/user/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
                <Route path="/" element={<LandingPage />} />

        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/creator/*" element={<CreatorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
