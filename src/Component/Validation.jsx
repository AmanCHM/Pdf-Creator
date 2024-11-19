
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
import { useNavigate } from "react-router";
import "./Validation.css";

const Validation = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      header: "",
      footer: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      header: Yup.string().required("Header cannot be blank"),
      footer: Yup.string().required("Footer cannot be blank"),
    }),
    onSubmit: (values) => {
     
      localStorage.setItem("formData", JSON.stringify(values));
      // console.log("Data saved to localStorage:", values);

      navigate("/question");
    },
  });

  return (
    <>  
    <label htmlFor="">Validation Form</label>
        
      <form onSubmit={formik.handleSubmit}>
        
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="abc@gmail.com"
          // value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="name">Name</label>
        <input
          id="Name"
          name="Name"
          type="text"
          placeholder="Name"
          // value={formik.values.Name}
          onChange={formik.handleChange}
        />
        {formik.touched.Name && formik.errors.Name ? (
          <div>{formik.errors.Name}</div>
        ) : null}

        <label>Header</label>
        <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [Title, Essentials, Bold, Italic, Paragraph],
            toolbar: ["heading", "undo", "redo", "|", "bold", "italic"],
          }}
          data={formik.values.header}
          onChange={(event, editor) => {
            const data = editor.getData();
            formik.setFieldValue("header", data);
          }}
        />
        {formik.touched.header && formik.errors.header ? (
          <div>{formik.errors.header}</div>
        ) : null}

        <label>Footer</label>
        <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [Title, Essentials, Bold, Italic, Paragraph],
            toolbar: ["heading", "undo", "redo", "|", "bold", "italic"],
          }}
          data={formik.values.footer}
          onChange={(event, editor) => {
            const adata = editor.getData();
           
            formik.setFieldValue("footer", adata);
          }}
        />
        {formik.touched.footer && formik.errors.footer ? (
          <div>{formik.errors.footer}</div>
        ) : null}

        <button type="submit" className="submit-button">Next</button>
      </form>
    </>
  );
};

export default Validation;