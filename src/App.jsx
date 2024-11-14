import { useFormik } from "formik";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import LandPage from "./Component/LandPage";
import Answer from "./Component/Answer";
import Editor from "./Component/Editor";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandPage />} />
        <Route path="/editor" element={<Editor />} />
        <Route  path="/answer" element={<Answer/>}/>

      </Routes>
    </Router>
    
  );
};

export default App;
