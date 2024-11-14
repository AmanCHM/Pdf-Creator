import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

const LandPage = () => {

  const navigate = useNavigate()
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "name is required";
    } else if (values.name.length > 20) {
      errors.length = "require a valid name";
    } else if (!values.email) {
      errors.email = "require email";
    } 
    // else if (!Regex.test()) {
    //   error.email = "enter a valid email";
    // }
    return errors;
  };
 
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validate,
    onSubmit: () => {
      navigate('/editor')
    },
  });
 
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="abc@gmail.com"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
 {formik.errors.email ? <div>{formik.errors.email}</div>:null}
        <br />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
         {formik.errors.name? <div>{formik.errors.name}</div>:null}
        
        <button type="submit">Next</button>
      </form>
    </>
  );
};

export default LandPage;
