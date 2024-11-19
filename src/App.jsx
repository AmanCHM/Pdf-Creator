import { useFormik } from "formik";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import LandPage from "./Component/LandPage";
import Answer from "./Component/Answer";
import Editor from "./Component/Editor";
import Validation from "./Component/Validation";
import Test from "./Component/Test";
import QuestionAnswer from "./Component/QuestionAnswer";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/editor" element={<Editor />} />
        <Route path="/test" element={<Test/>} />
        <Route  path="/answer" element={<Answer/>}/> */}
        <Route  path="/question" element={<QuestionAnswer/>}/>
        <Route  path="/" element={<Validation/>}/>
      </Routes>
    </Router>
    
  );
};

export default App;
