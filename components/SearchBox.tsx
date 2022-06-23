import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBox({ width, bg }: any) {
  return (
    <div className="relative">
      <AiOutlineSearch className="absolute top-3 left-3" />
      <input
        type="text"
        placeholder="Search..."
        className={`bg-[${bg}] h-10 w-[${width}] rounded-lg outline-0 px-[30px] shadow-3in text-sm`}
      />
    </div>
  );
}

/* Rectangle 51 */

// position: absolute;
// width: 255px;
// height: 36px;
// left: 45px;
// top: 165px;

// background: rgba(255, 255, 255, 0.81);
// box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
// border-radius: 10px;
/* Rectangle 101 */

// position: absolute;
// width: 360px;
// height: 512px;
// left: 0px;
// top: 128px;

// background: #EFEFEF;
// border-radius: 50px 50px 0px 0px;

//absolute sm:top-[42%] top-[68px] sm:left-[31%] left-5 text-md text-[#000]
