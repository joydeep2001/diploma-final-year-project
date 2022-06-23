import { useRouter } from "next/router";
import SearchBox from "../../components/SearchBox";
import QnaCard from "../../components/QnaCard";
import MenuBar from "../../components/MenuBar";
import { MdAddCircle } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import JELETQnaAdder from "../../components/JELETQnaAdder";

import { useEffect, useState, useContext } from "react";

interface QuestionProps {
  qna: any;
  subject: string;
  subjectCode: string;
  chapter: string;
  year: string | number;
}
interface RequestPayload {
  subject: string;
  param: number | string;
}

const QuestionViewer = ({
  qna,
  subject,
  subjectCode,
  chapter,
  year,
}: QuestionProps) => {
  // console.log(qna);
  // return <></>;
  const { isAdmin } = useContext(AuthContext);
  // const isAdmin = true;
  const [showStickySubjectName, setShowStickySubjectName] = useState(false);
  const [showQnaAdder, setShowQnaAdder] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const scrollListener = () => {
    if (window.scrollY >= 96 && !showStickySubjectName) {
      setShowStickySubjectName(true);
      console.log("re render");
    } else if (window.scrollY < 96 && showStickySubjectName) {
      setShowStickySubjectName(false);
      console.log("re render 2");
    }
    console.log(showStickySubjectName);
    console.log(window.scrollY);
  };

  const hideQnaAdder = () => {
    setShowQnaAdder(false);
  };

  function getChapterName(chapter: string) {
    return chapter.split("_").join(" ");
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="flex relative">
      <MenuBar className={`${isMenuOpen ? "" : "hidden "} sm:flex`} />
      <div className="flex flex-col w-full">
        {/* heading */}
        <div className="flex h-24 items-center px-5">
          <AiOutlineMenu
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="sm:hidden flex h-6 w-7 ml-1 mr-4"
          />
          {/*Menu icon*/}
          {
            <span className="font-beba capitalize text-3xl">
              {subject}-{getChapterName(chapter)}
            </span>
          }
        </div>

        <div className="bg-[#EFEFEF] min-h-screen p-5 flex flex-col items-center rounded-tc">
          {/*Sticky header*/}
          <div
            className={
              !showStickySubjectName
                ? "rounded-tc "
                : " " +
                  "z-50 flex flex-col justify-center sticky sm:w-full w-screen sm:h-[90px] h-[100px] top-0 bg-[#EFEFEF]"
            }
          >
            {showStickySubjectName ? (
              <div className="flex items-center md-3">
                {/*Menu icon*/}
                <AiOutlineMenu
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  className="sm:hidden flex h-6 w-7 mx-5"
                />
                <span className="font-beba text-3xl ">{subject}</span>
              </div>
            ) : (
              <span className="font-beba text-3xl opacity-0">{"Subject"}</span>
            )}

            <div className="w-full flex justify-center items-center">
              <SearchBox />
            </div>
          </div>
          {qna.length <= 0 ? <div>No Data Found!</div> : null}
          {qna.map((data: any) => (
            <QnaCard
              key={data._id}
              question={data.question}
              solution={data.solution}
              chapter={data.chapter}
              year={data.isPreviousYearQuestion ? data.year : null}
            />
          ))}
        </div>
      </div>
      {/* Question adder button */}
      {isAdmin && (
        <MdAddCircle
          className="fixed top-[90vh] left-[90vw] text-[50px] cursor-pointer"
          onClick={() => setShowQnaAdder(true)}
        />
      )}
      {isAdmin && showQnaAdder && (
        <JELETQnaAdder
          uploadURL={`http://localhost:3005/question/${subjectCode}`}
          onDelete={hideQnaAdder}
          chapter={chapter}
        />
      )}
    </div>
  );
};

async function fetchQuestions(url: string, payload: any) {
  console.log(payload);
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
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
}

export async function getServerSideProps(context: any) {
  //console.log(context.query.params);

  const subjectCodes = {
    chem: "Chemistry",
    phys: "Physics",
    feee: "FEEE",
    math: "Maths",
  };

  let subject = "",
    chapter = "",
    year = null,
    endPoint = "";
  let questions = null,
    payload = null;
  subject = context.query.params[1];

  const serverURL = "http://localhost:3005/";
  if (context.query.params[0] === "chapter_wise") {
    chapter = context.query.params[2];
    endPoint = "chapterwisequestions/" + subject;
    const url = serverURL + endPoint;
    payload = {
      chapter,
    };
  } else if (context.query.params[0] === "prev_year") {
    year = context.query.params[2];
    endPoint = "previousyearquestions/" + subject;
    payload = {
      year,
    };
  }
  const url = serverURL + endPoint;
  questions = await fetchQuestions(url, payload);

  if (!questions || questions.error) {
    console.log("No data found!");
    return {
      props: {
        qna: [],
        subject: "invalid!",
        chapter: null,
        year: null,
      },
    };
  }
  console.log(questions);
  console.log(questions);
  return {
    props: {
      qna: questions,
      subject: subjectCodes[subject as keyof typeof subjectCodes],
      subjectCode: subject,
      chapter,
      year,
    },
  };
}

export default QuestionViewer;
