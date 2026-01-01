import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import Books from "./pages/dashboard/Books";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar visible on all pages (or only when logged in if you wrap logic inside Navbar) */}
      <Navbar />

      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Landing />} />

        {/* Protected dashboard route with nested routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Books />} /> {/* default page */}
          <Route path="books" element={<Books />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
