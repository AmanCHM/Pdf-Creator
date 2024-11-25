import { useFormik } from "formik";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import Validation from "./Component/Validation";

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
        <Route path="/" element={<Validation />} />
      </Routes>
    </Router>
  );
};

export default App;
