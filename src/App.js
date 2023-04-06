import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DepartementAverage from "./components/DepartementAverage";
import AddressForm from "./components/AddressForm";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/departement/:departement"
          element={<DepartementAverage />}
        />
      </Routes>
      <AddressForm />
    </Router>
  );
}

export default App;
