import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import MasterGerbang from "./pages/master-gerbang";
import Report from "./pages/report";
import PrivateRoute from "./protectedRoute";
import DefaultLayout from "./component/layout";
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rute yang memerlukan DefaultLayout */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DefaultLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/master-gerbang" element={<MasterGerbang />} />
                </Routes>
              </DefaultLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
