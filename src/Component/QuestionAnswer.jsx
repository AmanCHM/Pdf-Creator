import { Formik, Form, Field, FieldArray, useFormik } from "formik";
import {
  ClassicEditor,
  Context,
  Bold,
  Essentials,
  Italic,
  Paragraph,
} from "ckeditor5";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import { exportToExcel } from "react-json-to-excel";
import * as Yup from "yup";
import jsPDF from "jspdf";

import html2pdf from 'html2pdf.js';


const QuestionAnswer = () => {
  const [allData, setAllData] = useState([]);

const headerData = localStorage.formData;
const footerheader = JSON.parse(headerData);
console.log(footerheader);

  const handleSubmit = (values) => {
    const formattedData = values.Question.map((item) => ({
      question: item.question,
      answer: item.answer,
    }));
    setAllData(formattedData);
    // console.log("Qustion Data=", formattedData);
    // console.log("localdata=",localStorage.formData);
  };

  console.log("alldata:",allData);


  const pdf = new jsPDF();

  const downloadPDF = () => {
    pdf.text(JSON.stringify(allData), 10, 10, { align: "center" });
    pdf.save("answer.pdf");
  };


  const listItems = allData.map(item => (
    <li key={item.id}>
      <p>
        <b>{item.question}:</b>
            {item.answer}
      </p>
    </li>
  ));
  


  const exportHtmlToPDF = () => {
    // Create a temporary container to hold the combined HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = footerheader.header + '<br/>'
footerheader
    // Loop through the array and combine the HTML content for each item
    allData.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      
      // Combine Header, Question, Answer, and Footer into one div
      itemDiv.innerHTML = `
        ${item.Header ? item.Header : ''}
        <p><b>Question:</b> ${item.question}</p>
        <p><b>Answer:</b> ${item.answer}</p>
        ${item.Footer ? item.Footer : ''}
      `;
      
      tempDiv.appendChild(itemDiv);
    });
    tempDiv.innerHTML += '<br/>'+footerheader.footer + '<br/>'
    // Ensure that tempDiv has content before generating the PDF
    if (tempDiv.innerHTML.trim() === '') {
      console.error('No content to export!');
      return;
    }

    // Use html2pdf.js to generate and download the PDF
    html2pdf()
      .set({
        margin: 1,
        filename: 'ExportedContent.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(tempDiv)
      .save();
  };

  return (
    <>
    <label htmlFor=""> Enter your Answer and Question</label>
      <Formik
        initialValues={{ Question: [{ question: "", answer: "" }] }}
        
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <FieldArray
              name="Question"
              render={(arrayHelpers) => (
                <div>
                  {values.Question.map((item, index) => (
                    <div key={index}>
                      <label> Question:{index + 1}</label>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          plugins: [Essentials, Bold, Italic, Paragraph],
                          toolbar: [
                            "heading",
                            "undo",
                            "redo",
                            "|",
                            "bold",
                            "italic",
                          ],
                        }}
                        onChange={(event, editor) => {
                          const quesdata = editor.getData();
                          const questext = quesdata.replace(
                            /<\/?[^>]+(>|$)/g,
                            ""
                          );
                          arrayHelpers.replace(index, {
                            ...item,
                            question: questext,
                          });
                        }}
                      />
                     
                      <label> Answer:{index + 1}</label>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          plugins: [Essentials, Bold, Italic, Paragraph],
                          toolbar: [
                            "heading",
                            "undo",
                            "redo",
                            "|",
                            "bold",
                            "italic",
                          ],
                        }}
                        onChange={(event, editor) => {
                          const ansdata = editor.getData();

                          const answertext = ansdata.replace(
                            /<\/?[^>]+(>|$)/g,
                            ""
                          );
                          arrayHelpers.replace(index, {
                            ...item,
                            answer: answertext,
                          });
                        }}
                      />
                      
                      <button
                        type="button"
                        className="submit-button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="submit-button"
                    onClick={() =>
                      arrayHelpers.push({ question: "", answer: "" })
                    }
                  >
                    Add
                  </button>
                  <div>
                    <button type="submit" className="submit-button">
                      Submit
                    </button>
                  </div>

                  <button
                    onClick={() => exportToExcel(allData, "data")}
                    className="submit-button"
                  >
                    Download Excel
                  </button>
                  <div>
                    <button type="submit" onClick={downloadPDF}
                    className="submit-button">
                      Dowwnload PDF
                    </button>
                  </div>
                </div>
              )}
            />

    
{allData && allData.length > 0 ? (
        allData.map((item, index) => (
          <div key={index}>
            <div dangerouslySetInnerHTML={{ __html: item.Header }}></div>
            <div>
              <p><b>Question:</b> {item.question}</p>
              <p><b>Answer:</b> {item.answer}</p>
            </div>

            <div dangerouslySetInnerHTML={{ __html: item.Footer }}></div>
          </div>
        ))
      ) : (
        <p>No data available to display.</p>
      )}

      <button onClick={exportHtmlToPDF} className="submit-button">
        Export to PDF
      </button>


          </Form>
        )}
      </Formik>
    


      <h2>Question and Answer</h2>
      <ul> {listItems}</ul>
    </>
  );
};

export default QuestionAnswer;
