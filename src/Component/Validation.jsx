
import React, { useEffect, useState } from "react";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ClassicEditor,
  Context,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  ContextWatchdog,
  Title,
  FontSize,
} from "ckeditor5";
import { Navigate, useNavigate } from "react-router";
import "./Validation.css";

const Validation = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Name: "",
      email: "",
      header: "",
      footer: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed')
        .trim()
        .required("Name is Required"),
      email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
  
      header: Yup.string().required("Header cannot be blank"),
      footer: Yup.string().required("Footer cannot be blank"),
    }),
    onSubmit: (values) => {
     
      localStorage.setItem("formData", JSON.stringify(values));
      // console.log("Data saved to localStorage:", values);

      navigate("/question");
    },
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      formik.setValues(parsedData); 
    }
    // return ()=>{
    //   localStorage.removeItem("formData")
    // }
  }, []);

  // console.log(localStorage);
  return (
<>
      <h1 >Validation Form</h1>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {formik.errors.email}
          </div>
        ) : null}
       
       <label htmlFor="Name">Name</label>
        <input
          id="Name"
          name="Name"
          type="text"
          placeholder="Enter your name"
          value={formik.values.Name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.Name && formik.errors.Name ? (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {formik.errors.Name}
          </div>
        ) : null}

        <label>Header</label>
        <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [ Essentials, Bold, Italic, Paragraph],
            toolbar: ["heading", "undo", "redo", "|", "bold", "italic"],
          }}
          data={formik.values.header}
          onChange={(event, editor) => {
            const data = editor.getData();
            formik.setFieldValue("header", data);
          }}
          onBlur={() => formik.setTouched({ ...formik.touched, header: true })}
        />
        {formik.touched.header && formik.errors.header ? (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {formik.errors.header}
          </div>
        ) : null}

        <label>Footer</label>
        <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [ Essentials, Bold, Italic, Paragraph],
            toolbar: ["heading", "undo", "redo", "|", "bold", "italic"],
          }}
          data={formik.values.footer}
          onChange={(event, editor) => {
            const data = editor.getData();
            formik.setFieldValue("footer", data);
          }}
          onBlur={() => formik.setTouched({ ...formik.touched, footer: true })}
        />
        {formik.touched.footer && formik.errors.footer ? (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {formik.errors.footer}
          </div>
        ) : null}

        {/* Submit Button */}
        <button
          type="submit" className="submit-button"
        >
          Next
        </button>
      </form>
    </>
  );
};

export default Validation;