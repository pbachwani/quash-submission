"use client";
import React, { useState } from "react";
import RightSideBar from "./RightSideBar";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Grip,
  RotateCcw,
} from "lucide-react";

export default function TestCases({
  testCases,
  onToggleTestCase,
  onToggleSelection,
  onToggleStatus,
  onReorder,
  showWorkflowHeader,
  selectionMode = false,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const completedCount = testCases.filter(
    (tc) => tc.status === "completed"
  ).length;

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex && onReorder) {
      onReorder(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  // console.log("test cases", testCases);
  return (
    <section className="h-screen flex-1 pl-6 text-white w-full overflow-y-scroll">
      {/* header text */}
      <div className="pt-6">
        <span className="text-[#FFD233]">Test Cases</span>
        <span> ({completedCount})</span>
      </div>

      {/* test cases mapping */}
      <div className="flex-1 overflow-y-auto">
        {testCases.map((testCase, index) => (
          <div
            key={testCase.id}
            draggable={selectionMode}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className=""
          >
            <div
              className={`flex items-center hover:bg-[#1C1F22] ${
                testCase.isExpanded ? "bg-[#1C1F22]" : ""
              }`}
            >
              {selectionMode && (
                <div className="flex items-center p-2 space-x-2 ">
                  <input
                    type="checkbox"
                    checked={testCase.selected || false}
                    onChange={() => onToggleSelection?.(testCase.id)}
                    className="border-gray-500"
                  />
                  <Grip className="h-4 w-4 text-gray-500 cursor-grab" />
                  <span className="text-xs text-gray-100 w-6">
                    {testCase.id}.
                  </span>
                </div>
              )}

              <div
                className="flex-1 justify-between p-4 h-auto text-left  cursor-pointer flex items-center"
                onClick={() => onToggleTestCase(testCase.id)}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <span className="text-sm text-white flex-1">
                    {testCase.name}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {selectionMode && (
                    <button
                      className="h-6 w-6 p-0 hover:bg-gray-600 rounded-md flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStatus?.(testCase.id);
                      }}
                    >
                      <RotateCcw className="h-3 w-3 text-gray-400" />
                    </button>
                  )}

                  {testCase.status === "generating" && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-xs text-yellow-400">
                        generating
                      </span>
                    </div>
                  )}

                  {testCase.status === "completed" && (
                    <div className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">completed</span>
                    </div>
                  )}

                  {testCase.status === "pending" && (
                    <div className="w-2 h-2 bg-gray-500 rounded-full" />
                  )}
                  {testCase.isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {testCase.isExpanded && testCase.details && (
              <div className="px-8 pb-6 bg-[#1C1F22]">
                <div className="grid grid-cols-2 gap-6 relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#4A525B] transform -translate-x-1/2"></div>

                  {/* Left Column */}
                  <div className="space-y-4 pr-3">
                    {/* pre-condition section */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-3">
                        Pre-conditions
                      </h4>
                      <div className="space-y-2">
                        {testCase.details.preCondition.map(
                          (condition, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-300 leading-relaxed"
                            >
                              {condition}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* expected outcome section */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-3">
                        Expected outcome
                      </h4>
                      <div className="space-y-2">
                        {testCase.details.expectedOutcome.map(
                          (outcome, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-300 leading-relaxed"
                            >
                              {outcome}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* test data section */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-3">
                        Test Data
                      </h4>
                      <div className="space-y-1">
                        {testCase.details.testData.map((data, index) => (
                          <div key={index} className="text-sm text-gray-400">
                            {data}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* right column */}
                  <div className="pl-3">
                    {/* test steps section */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-3">
                        Test Steps
                      </h4>
                      <div className="space-y-2">
                        {testCase.details.testSteps.map((step, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-300 leading-relaxed"
                          >
                            {index + 1}. {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
