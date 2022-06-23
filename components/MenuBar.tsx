import React, { useState } from "react";
import Link from "next/link";
import { AiFillCaretDown, AiOutlinePoweroff } from "react-icons/ai";
import SearchBox from "./SearchBox";
import {
  physicsChapters,
  chemChapters,
  mathChapters,
  feeeChapters,
} from "./menu";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
interface MenuProps {
  className: string;
}
function getChapterId(chapter: string) {
  const result = Array.from(chapter).map(char => {
    if (char === " ") return "_";
    if (char.match(/\w/) || char.match(/\d/)) return char.toLowerCase();
    return "";
  });

  //console.log(result.join());
  return result.join("");
}

const chapterWiseBaseURL = "/questionViewer/chapter_wise";
const prevYearBaseURL = "/questionViewer/prev_year";
export default function MenuBar({ className }: MenuProps) {
  const [isJeletChapterWiseOpen, setJeletChapterWiseOpen] = useState(true);
  const [isPhysicsSubjectOpen, setPhysicsSubjectOpen] = useState(false);
  const [isChemSubjectOpen, setChemSubjectOpen] = useState(false);
  const [isMathSubjectOpen, setMathSubjectOpen] = useState(false);
  const [isFEEESubjectOpen, setFEEESubjectOpen] = useState(false);
  const [isPrevYearOpen, setPrevYearOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  //const years = [2021, 2022];
  const [years, setYearOpen] = useState([
    { value: 2022, isOpen: false },
    { value: 2021, isOpen: false },
  ]);
  const toggleYearVisibility = (e: any) => {
    const targetYear = e.target.id;
    console.log(e.target.id);
    const newYearArray = years.map((year: any) => {
      if (year.value == targetYear) {
        return {
          value: year.value,
          isOpen: !year.isOpen,
        };
      }
      return year;
    });
    //console.log(newYearArray);
    setYearOpen(newYearArray);
  };
  return (
    <div
      className={`w-[340px] font-serif flex flex-col h-screen mx-2 sticky top-2 left-0 ${className}`}
    >
      {/* close button */}
      <div className="flex justify-end opacity-0">
        <svg
          width="16"
          height="16"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4" cy="4" r="4" fill="#ff0000" />
        </svg>
      </div>
      {/* name and image */}
      <div className="flex items-center">
        <img src="http://localhost:3000/avtar.webp" className="h-20" />
        <span>Joydeep Bhattacharjee</span>
        <button
          className="m-2 flex items-center justify-between text-xs text-red-600"
          onClick={logout}
        >
          <AiOutlinePoweroff />
          Logout
        </button>
      </div>
      <SearchBox width={"200px"} bg={"#EFEFEF"} />
      {/* list */}
      <div className="overflow-y-scroll">
        <ul>
          <Link href="/Dashboard">
            <li>
              <h1 className="menu-items">Dashboard</h1>
            </li>
          </Link>

          <li>
            <span
              onClick={() => setJeletChapterWiseOpen(!isJeletChapterWiseOpen)}
              className="menu-items flex justify-between items-center"
            >
              <h1>Jelet TopicWise Questions</h1>
              <AiFillCaretDown
                className={
                  isJeletChapterWiseOpen ? "rotate-[90px]" : "rotate-[270deg]"
                }
              />
            </span>

            <ul className={"ml-2 " + (isJeletChapterWiseOpen ? "" : "hidden")}>
              {/* Physics */}
              <li>
                <span
                  onClick={() => setPhysicsSubjectOpen(!isPhysicsSubjectOpen)}
                  className="menu-items flex justify-between items-center"
                >
                  <h1>Physics</h1>
                  <AiFillCaretDown
                    className={
                      isPhysicsSubjectOpen ? "rotate-[90px]" : "rotate-[270deg]"
                    }
                  />
                </span>
                <ul
                  className={"ml-2 " + (isPhysicsSubjectOpen ? "" : "hidden")}
                >
                  {physicsChapters.map(chapter => (
                    <Link
                      href={
                        chapterWiseBaseURL + "/phys/" + getChapterId(chapter)
                      }
                      key={getChapterId(chapter)}
                    >
                      <li>
                        <h1 className="menu-items">{chapter}</h1>
                      </li>
                    </Link>
                  ))}
                </ul>
              </li>
              {/* Chemistry */}
              <li>
                <span
                  onClick={() => setChemSubjectOpen(!isChemSubjectOpen)}
                  className="menu-items flex justify-between items-center"
                >
                  <h1>Chemistry</h1>
                  <AiFillCaretDown
                    className={
                      isChemSubjectOpen ? "rotate-[90px]" : "rotate-[270deg]"
                    }
                  />
                </span>
                <ul className={"ml-2 " + (isChemSubjectOpen ? "" : "hidden")}>
                  {chemChapters.map(chapter => (
                    <Link
                      href={
                        chapterWiseBaseURL + "/chem/" + getChapterId(chapter)
                      }
                      key={getChapterId(chapter)}
                    >
                      <li>
                        <h1 className="menu-items">{chapter}</h1>
                      </li>
                    </Link>
                  ))}
                </ul>
              </li>
              {/* Mathematics */}
              <li>
                <span
                  onClick={() => setMathSubjectOpen(!isMathSubjectOpen)}
                  className="menu-items flex justify-between items-center"
                >
                  <h1>Mathematics</h1>
                  <AiFillCaretDown
                    className={
                      isMathSubjectOpen ? "rotate-[90px]" : "rotate-[270deg]"
                    }
                  />
                </span>
                <ul className={"ml-2 " + (isMathSubjectOpen ? "" : "hidden")}>
                  {mathChapters.map(chapter => (
                    <Link
                      href={
                        chapterWiseBaseURL + "/math/" + getChapterId(chapter)
                      }
                      key={getChapterId(chapter)}
                    >
                      <li>
                        <h1 className="menu-items">{chapter}</h1>
                      </li>
                    </Link>
                  ))}
                </ul>
              </li>
              {/* FEEE */}
              <li>
                <span
                  onClick={() => setFEEESubjectOpen(!isFEEESubjectOpen)}
                  className="menu-items flex justify-between items-center"
                >
                  <h1 className="">
                    Fundamentals of Electronics and Engineering
                  </h1>
                  <AiFillCaretDown
                    className={
                      "w-8 " +
                      (isFEEESubjectOpen ? "rotate-[90px]" : "rotate-[270deg]")
                    }
                  />
                </span>
                <ul className={"ml-2 " + (isFEEESubjectOpen ? "" : "hidden")}>
                  {feeeChapters.map(chapter => (
                    <Link
                      href={
                        chapterWiseBaseURL + "/feee/" + getChapterId(chapter)
                      }
                      key={getChapterId(chapter)}
                    >
                      <li>
                        <h1 className="menu-items">{chapter}</h1>
                      </li>
                    </Link>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <span
              onClick={() => setPrevYearOpen(!isPrevYearOpen)}
              className="menu-items flex justify-between items-center"
            >
              <h1 className="">Jelet Previous Year</h1>
              <AiFillCaretDown
                className={isPrevYearOpen ? "rotate-[90px]" : "rotate-[270deg]"}
              />
            </span>
            <ul className={"ml-2 " + (isPrevYearOpen ? "" : "hidden")}>
              {years.map((year: any) => {
                return (
                  <li>
                    <span
                      id={year.value}
                      onClick={toggleYearVisibility}
                      className="menu-items flex justify-between items-center"
                    >
                      <h1 className="">{year.value}</h1>
                      <AiFillCaretDown
                        className={
                          year.isOpen ? "rotate-[90px]" : "rotate-[270deg]"
                        }
                      />
                    </span>
                    <ul className={"ml-2 " + (year.isOpen ? "" : "hidden")}>
                      <Link href={prevYearBaseURL + "/phys/" + year.value}>
                        <li>
                          <h1 className="menu-items">Physics</h1>
                        </li>
                      </Link>
                      <Link href={prevYearBaseURL + "/chem/" + year.value}>
                        <li>
                          <h1 className="menu-items">Chemistry</h1>
                        </li>
                      </Link>
                      <Link href={prevYearBaseURL + "/math/" + year.value}>
                        <li>
                          <h1 className="menu-items">Mathematics</h1>
                        </li>
                      </Link>
                      <Link href={prevYearBaseURL + "/feee/" + year.value}>
                        <li>
                          <h1 className="menu-items">
                            Fundamentals of Electronics and Engineering
                          </h1>
                        </li>
                      </Link>
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

/*


position: absolute;
width: 130px;
height: 21px;
left: 35px;
top: 230px;

background: linear-gradient(180deg, rgba(234, 229, 229, 0.6) 0%, rgba(246, 246, 246, 0.36) 100%);
border-radius: 5px;
*/
