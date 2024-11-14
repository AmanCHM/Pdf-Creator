import {
  ClassicEditor,
  Context,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  ContextWatchdog,
  submitHandler,
} from "ckeditor5";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import jsPDF from "jspdf";


// import 'ckeditor5/ckeditor5.css';

function App() {
  const [content, setContent] = useState({
    header: "",
    question: "",
    answer: "",
    footer: "",
  });
   
  

  const pdf = new jsPDF();
  const downloadPDf = () => {
    pdf.text(JSON.stringify(content),10,10);
    pdf.save("answer.pdf");
  };


  console.log(content);
  return (
    <CKEditorContext
      context={Context}
      contextWatchdog={ContextWatchdog}
      // onChangeInitializedEditors={(editors) => {
      //   console.info(
      //     editors.editor1?.instance,
      //     editors.editor1?.yourAdditionalData
      //   );
      // }}
    >
      <CKEditor
        editor={ClassicEditor}
        config={{
          plugins: [Essentials, Bold, Italic, Paragraph],
          toolbar: ['heading',"undo", "redo", "|", "bold",'italic'],
        }}
        // data={data1}
        onChange={(event, editor) => {
          const data1 = editor.getData();
              setContent({
                ...content,
                header:data1
              })
        }}
      />
  
      <CKEditor
        editor={ClassicEditor}
        config={{
          plugins: [Essentials, Bold, Italic, Paragraph],
          toolbar: ["undo", "redo", "|", "bold", "italic"],
        }}
        // data={quesdata}
        onChange={(event, editor) => {
          const quesdata = editor.getData();
          setContent({
            ...content,
            question:quesdata
          })
        }}
      />

      <CKEditor
        editor={ClassicEditor}
        config={{
          plugins: [Essentials, Bold, Italic, Paragraph],
          toolbar: ["undo", "redo", "|", "bold", "italic"],
        }}
        // data={ansdata}
        onChange={(event, editor) => {
          const ansdata = editor.getData();
          setContent({
            ...content,
             answer:ansdata
          })
        }}
      />
      <CKEditor
        editor={ClassicEditor}
        config={{
          plugins: [Essentials, Bold, Italic, Paragraph],
          toolbar: ["undo", "redo", "|", "bold", "italic"],
        }}
        // data={fdata}
        onChange={(event, editor) => {
          const fdata = editor.getData();
          setContent({
            ...content,
             footer:fdata
          })
        }}
      
      />
  <button onClick={downloadPDf}> Download Pdf</button>


 
    </CKEditorContext>
      
      
  );
}

export default App;

