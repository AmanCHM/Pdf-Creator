import React, { useState } from "react";

const Answer = () => {
  const [question, setQuestion] = useState("");
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [ansdata, setAnsdata] = useState([]);
  const handleClick = () => {
    setData([...data, { id: data.length + 1, question }]);
    setQuestion("");
  };
  const handleAClick = () => {
    setAnsdata([...ansdata, answer]);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  const handleModify=(id)=>{
       
  }
  console.log(data);
  console.log(ansdata);
  return (
    <>
      <label htmlFor="question"> Question</label>
      <input
        type="text"
        placeholder="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleClick}>Upload question </button>

      <br />

      <label htmlFor="answer"> Answer</label>
      <input
        type="text"
        placeholder="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleAClick}>Upload Answer</button>

      <h4>Questions</h4>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.question}

            <button onClick={() => handleDelete(item.id)}>Delete</button>

            <button onClick={()=>handleModify(item.id)}> Modify</button>
          </li>
        ))}
      </ul>

      <h4>Answer</h4>
      <ul>
        {ansdata.map((item1) => (
          <li key={item1.id}>{item1.id}</li>
        ))}
      </ul>
    </>
  );
};

export default Answer;

// <CKEditor
// editor={ClassicEditor}
// data={formData.title}
// onChange={(event, editor) => {
//   handleEditorChange('title', editor.getData());
// }}