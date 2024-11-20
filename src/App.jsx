import { useFormik } from "formik";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import LandPage from "./Component/LandPage";
import Answer from "./Component/Answer";
import Editor from "./Component/Editor";
import Validation from "./Component/Validation";
import Test from "./Component/Test";
import QuestionAnswer from "./Component/QuestionAnswer";

const App = () => {

  const PrivateRoute = ({})=>{

    let isLocalStoragePresent = localStorage.getItem('formData') ==null?false:true;
    return isLocalStoragePresent?<QuestionAnswer/>: <Navigate to="/" />
   
  }
  return (
    <Router>
      <Routes>
        <Route  path="/question" element={<PrivateRoute>  <QuestionAnswer /></PrivateRoute>  }/>
        {/* <Route  path="/question" element={<QuestionAnswer/>}/> */}
        <Route path="/" element={<Validation />} />
      </Routes>
    </Router>
  );
};

export default App;
