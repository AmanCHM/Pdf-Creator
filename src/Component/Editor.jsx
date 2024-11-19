

import { Formik, Form, Field, FieldArray } from "formik";
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
import jsPDF from "jspdf";
import { useCallback } from "react";
import { debounce } from "lodash";

const Editor = () => {
  const footerHeader = localStorage.getItem("content");
  const parsefooterheader = JSON.parse(footerHeader);

  console.log(parsefooterheader.header);

  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
 
 const [data, setData] = useState({
    Header: parsefooterheader.header,
    Question: "",
    Answer: "",
    Footer: parsefooterheader.footer,
  });
  const handleSubmit = () =>
    setData((prevdata) => ({
      ...prevdata,
      Question: question,
      Answer: answer,
    }));

  const pdf = new jsPDF();

  const downloadPDF = () => {
    pdf.text(JSON.stringify(data), 10, 10, { align: "center" });
    pdf.save("answer.pdf");
  };

  const debouncedSetAnswer = useCallback(
    debounce((newAnswer) => {
      setAnswer((prev) => [...prev, newAnswer]);
    }, 1500),
    []
  );

  const debouncedSetQuestion = useCallback(
    debounce((newQuestion) => {
      setQuestion((prev) => [...prev, newQuestion]);
    }, 1500),
    []
  );
  console.log(data);
  
  return (
    <>
      <Formik
        initialValues={{ Question: [] }}
        onSubmit={() => {}}
        render={({ values }) => (
          <Form>
            <FieldArray
              name="Question"
              render={(arrayHelpers) => (
                <div>
                  {values.Question && values.Question.length > 0 ? (
                    values.Question.map((Question, index) => (
                      <div key={index}>
                        <CKEditor
                        label
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
                            allowedContent: false,
                          }}
                          onChange={(event, editor) => {
                            const quesdata = editor.getData();
                            const questext = quesdata.replace(/<\/?[^>]+(>|$)/g, ""); 
                            debouncedSetQuestion(questext);
                          }}
                        />
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
                            allowedContent: false,
                          }}
                          onChange={(event, editor) => {
                            const ansdata = editor.getData();
                            const plainText = ansdata.replace(/<\/?[^>]+(>|$)/g, ""); 
                            debouncedSetAnswer(plainText);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")}
                        >
                          Add another Query-Answer
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      Add Query-Answer
                    </button>
                  )}

                  <div>
                    <button type="submit" onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      ></Formik>

      {/* <Formik
        initialValues={{ Answer: [] }}
        onSubmit={() => {}}
        render={({ values }) => (
          <Form>
            <FieldArray
              name="Answer"
              render={(arrayHelpers) => (
                <div>
                  {values.Answer && values.Answer.length > 0 ? (
                    values.Answer.map((Answer, index) => (
                      <div key={index}>
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
                            debouncedSetAnswer(ansdata);
                          }}
                        />
                       
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      Add Answer
                    </button>
                  )}

                  <div>
                    <button type="submit" onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>

                  <div>
                    <button type="submit" onClick={downloadPDF}>
                      Dowwnload PDF
                    </button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      ></Formik> */}



    </>
  );
};

export default Editor;
