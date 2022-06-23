import TextEditor from "./TextEditor";
import { FaTrash, FaSave } from "react-icons/fa";
import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { ToastContainer, toast } from "react-toastify";

export default function JeletQnaAdder({ onDelete, uploadURL, chapter }: any) {
  const [question, setQuestion] = useState(EditorState.createEmpty());
  const [solution, setSolution] = useState(EditorState.createEmpty());
  const [year, setYear] = useState(null);
  const [isPreviousYearQuestion, setPreviousYear] = useState(false);

  const saveQuestionToDB = async () => {
    const htmlQuestion = draftToHtml(
      convertToRaw(question.getCurrentContent())
    );
    const htmlSolution = draftToHtml(
      convertToRaw(solution.getCurrentContent())
    );
    const payload = {
      question: htmlQuestion,
      questionImagePath: [],
      solution: htmlSolution,
      solutionImage: [],
      isPreviousYearQuestion,
      year,
      chapter,
    };
    console.log(payload);
    try {
      const response = await toast.promise(
        fetch(uploadURL, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }),
        {
          pending: "Uploading the question!",
          error: "Please retry!!",
          success: "Uploaded successfully!!",
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.error) throw result.message;
      if (result.count === 0) return [];
      return result.question;
    } catch (err) {
      console.log(err);
      return {
        error: true,
      };
    }
  };
  const handleSetPreviousYear = (e: any) => {
    console.log(e.target.checked);
    if (e.target.checked) setPreviousYear(true);
    else setPreviousYear(false);
  };
  const handleSetYear = (e: any) => {
    console.log(e.target.value);
    setYear(e.target.value);
  };

  return (
    <div className="bg-white flex flex-col items-center h-[100vh] overflow-scroll border-2 fixed top-0 left-[25%] z-[200]">
      <ToastContainer />
      {/* wrapper */}
      <div className="border-4 p-2 rounded-xl h-[700px]">
        {/* top bar */}
        <div className="flex justify-end align-center h-7 p-10">
          <div
            onClick={onDelete}
            className="rounded p-2 h-[30px] flex items-center m-2 cursor-pointer bg-red-600 text-white"
          >
            <span>Close</span>
            <FaTrash className="m-2" />
          </div>
          <div
            onClick={saveQuestionToDB}
            className="rounded bg-red p-2 h-[30px] flex items-center m-2 cursor-pointer bg-green-600 text-white"
          >
            <span>Save</span>
            <FaSave className="m-2 " />
          </div>
        </div>
        <label htmlFor="pyr">Previous year</label>
        <input id="pyr" type="checkbox" onChange={handleSetPreviousYear} />
        {isPreviousYearQuestion && (
          <div className="flex">
            <label>Year</label>
            <input
              className="border-2 border-[#000]"
              type="number"
              onChange={handleSetYear}
            />
          </div>
        )}

        {/* question */}
        <div className="flex h-[28%] w-[42rem] mb-20">
          <TextEditor
            editorState={question}
            setEditorState={setQuestion}
            placeholder="Type Question Here..."
          />
        </div>

        {/* Solution */}
        <div className="flex h-[28%] w-[42rem]">
          <TextEditor
            editorState={solution}
            setEditorState={setSolution}
            placeholder="Type Solution Here..."
          />
        </div>
      </div>
    </div>
  );
}

//console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
