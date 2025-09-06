import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DiabetesPrediction from "./pages/DiabetesPrediction";
import HeartDiseasePrediction from "./pages/HeartDiseasePrediction";
import ParkinsonsPrediction from "./pages/ParkinsonsPrediction";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diabetes" element={<DiabetesPrediction />} />
            <Route path="/heart" element={<HeartDiseasePrediction />} />
            <Route path="/parkinsons" element={<ParkinsonsPrediction />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
