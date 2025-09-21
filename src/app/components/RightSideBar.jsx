"use client";
import React from "react";

const RightSideBar = ({ onGenerate, isGenerating }) => {
  //   console.log("is generating", isGenerating);
  return (
    <aside className="w-80 bg-[#1C1F22] p-4 flex flex-col gap-4">
      <div>
        <button className="bg-[#333124] text-[#FFD233] w-fit px-2 py-1 rounded-sm">
          Generate
        </button>
        <button className="ml-4">Execute</button>
      </div>
      <div className="flex flex-col">
        {!isGenerating && <p>PRD</p>}
        <div className="w-full flex justify-between items-center bg-[#25292D] px-2 rounded-lg mt-2">
          <input
            type="text"
            defaultValue={"very_very_long_file_name_v3_final_final.pdf"}
            className="py-2 w-full truncate"
          />
          <span>✅</span>
        </div>
        {!isGenerating && (
          <span className="text-right text-[#BACCE3]">+ add more</span>
        )}
      </div>

      <div className="flex flex-col">
        {!isGenerating && <p>Figma File</p>}
        <div className="w-full flex justify-between items-center bg-[#25292D] px-2 rounded-lg mt-2">
          <input
            type="text"
            defaultValue={"filename/pagename"}
            className="py-2 w-full"
          />
          <span>✅</span>
        </div>
      </div>
      {!isGenerating && (
        <>
          <div className="flex flex-col">
            <p>Branch</p>
            <div className="w-full flex justify-between items-center bg-[#25292D] px-2 rounded-lg mt-2">
              <input
                type="text"
                defaultValue={"+ Link Branch"}
                className="py-2 w-full text-[#BACCE3]"
              />
              <span>✅</span>
            </div>
          </div>

          <div className="flex flex-col">
            <p>LLM Model</p>
            <div className="w-full flex justify-between items-center bg-[#16191B] px-2 rounded-lg mt-2">
              <input
                type="text"
                defaultValue={"Auto Selected"}
                className="py-2 w-full "
              />

              <span className="rotate-90">{">"}</span>
            </div>
          </div>

          <div className="">
            <button
              className="text-left text-black bg-gray-100 p-2 rounded-lg hover:bg-gray-800 duration-200 ease-out hover:text-white"
              onClick={onGenerate}
              disabled={isGenerating}
            >
              Generate
            </button>
          </div>
        </>
      )}
      {/* Add inputs here for PRD file, branch, etc. */}

      {isGenerating && (
        <>
          <div className="flex justify-between items-center">
            <span className="text-xs">Generating test cases</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </div>
          <div className="p-3 rounded border border-[] h-full"></div>
        </>
      )}
    </aside>
  );
};

export default RightSideBar;
