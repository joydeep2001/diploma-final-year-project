import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";

interface QnaProps {
  question: string;
  solution: string;
  chapter: string;
  year: number | null;
}
export default function QnaCard({
  question,
  solution,
  chapter,
  year,
}: QnaProps) {
  const [displayToolMenu, setDisplayToolMenu] = useState(false);
  const { isAdmin } = useContext(AuthContext);
  // const isAdmin = true;
  const showToolMenu = () => {
    setDisplayToolMenu(true);
  };
  const hideToollMenu = () => {
    setDisplayToolMenu(false);
  };

  return (
    <div className="relative flex flex-col p-4 sm:w-2/3 w-[319px] rounded-xl min-h-[144px] bg-white m-4 shadow-3xl">
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: "<b>Question: </b>" + question }}
      ></div>
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: "<b>Solution: </b>" + solution }}
      ></div>
      <div className="flex w-full justify-between mt-20 text-[12px]">
        <div className="flex">
          {/* year */}
          {year ? (
            <div className="flex items-center mx-5">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#FF1616" />
              </svg>
              <span className="m-1">{year}</span>
            </div>
          ) : null}
          {/* chapter */}
          <div className="flex items-center">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="#7DFF16" />
            </svg>

            <span className="m-1">{chapter} </span>
          </div>
        </div>
        {isAdmin && (
          <BsThreeDotsVertical
            className="text-lg cursor-pointer "
            onClick={showToolMenu}
          />
        )}
        {displayToolMenu && (
          <div className="z-[100] rounded bg-white absolute flex flex-col top-[80%] sm:left-[78.3%] left-[75%] text-[14px] border border-black-bg">
            <span className="hover:bg-[#cad2de]  transition-colors w-16 border-b-black-bg border cursor-pointer">
              Edit
            </span>

            <span className=" border-b-black-bg border hover:bg-[#7A0012] hover:text-[#fff] cursor-pointer transition-colors w-16">
              Delete
            </span>
            <span
              className="hover:bg-[#cad2de] cursor-pointer transition-colors w-16"
              onClick={hideToollMenu}
            >
              Cancel
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/*


position: absolute;
width: 319px;
height: 154px;
left: 18px;
top: 223px;

background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 22px;
*/
