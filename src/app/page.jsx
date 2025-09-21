"use client";
import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import TestCases from "./components/TestCases";
import RightSideBar from "./components/RightSideBar";

export default function Home() {
  const [testFlows, setTestFlows] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWorkflowHeader, setShowWorkflowHeader] = useState(true);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setShowWorkflowHeader(true);

    const initialTestFlows = [
      {
        id: "flow-1",
        name: "first test creation Flow",
        status: "generating",
        testCases: [
          {
            id: "1",
            name: "Verify username text field behaviour",
            status: "generating",
            isExpanded: false,
          },
          {
            id: "2",
            name: "Verify username text field behaviour",
            status: "generating",
            isExpanded: false,
          },
        ],
      },
      {
        id: "flow-2",
        name: "add new test case manually Flow",
        status: "generating",
        testCases: [
          {
            id: "3",
            name: "Verify username text field behaviour",
            status: "generating",
            isExpanded: false,
          },
          {
            id: "4",
            name: "Verify username text field behaviour",
            status: "generating",
            isExpanded: false,
          },
        ],
      },
      {
        id: "flow-3",
        name: "delete existing content and re-upload Flow",
        status: "generating",
        testCases: [
          {
            id: "5",
            name: "Verify username text field behaviour",
            status: "generating",
            isExpanded: false,
          },
          {
            id: "6",
            name: "Verify username text field behaviour",
            status: "generating",
            isExpanded: false,
          },
        ],
      },
      {
        id: "flow-4",
        name: "add integrations to workspace level Flow",
        status: "generating",
        testCases: [
          {
            id: "7",
            name: "Verify username text field behaviour",
            status: "generating",
            isExpanded: false,
          },
          {
            id: "8",
            name: "Verify username text field behaviour",
            status: "generating",
            isExpanded: false,
          },
        ],
      },
      {
        id: "flow-5",
        name: "text field editing Flow",
        status: "generating",
        testCases: [
          {
            id: "9",
            name: "Verify username text field behaviour",
            status: "generating",
            isExpanded: false,
          },
        ],
      },
    ];

    setTestFlows(initialTestFlows);
    // console.log("initialTestFlows", initialTestFlows);
    setTimeout(() => {
      const allTestCases = [];

      initialTestFlows.forEach((flow) => {
        flow.testCases.forEach((testCase) => {
          allTestCases.push({
            ...testCase,
            status: "completed",
            selected: false,
            details: {
              preCondition: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              ],
              expectedOutcome: [
                "Mauris ut mi in tortor ultricies mattis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
              ],
              testSteps: [
                "Navigate to login screen",
                "Verify that the username text field is in default and enabled state",
                "Click on the username text field",
                "Verify that the text field changes to active state",
                "Click outside the text field",
                "Verify that the username field goes back to default state",
                "Click on the username text field and enter a valid username",
                "Click outside the text field",
                "Verify that the text field changes to filled state",
              ],
              testData: [
                "Key One: <value>",
                "Key Two: <value>",
                "Key Three: <value>",
              ],
            },
          });
        });
      });

      setTestFlows(allTestCases);
      // console.log("all test cases", allTestCases);
      setShowWorkflowHeader(false);
      setIsGenerating(false);
    }, 4000);
  }, []);

  // console.log("test flow", testFlows);
  const toggleTestCase = (id) => {
    setTestFlows((flow) =>
      flow.map((tc) => ({
        ...tc,
        isExpanded: tc.id === id ? !tc.isExpanded : false,
      }))
    );
  };
  const toggleTestCaseSelection = (id) => {
    setTestFlows((flow) =>
      flow.map((tc) => (tc.id === id ? { ...tc, selected: !tc.selected } : tc))
    );
  };

  const toggleTestCaseStatus = (id) => {
    setTestFlows((flow) =>
      flow.map((tc) =>
        tc.id === id
          ? {
              ...tc,
              status: tc.status === "completed" ? "generating" : "completed",
            }
          : tc
      )
    );
  };
  const reorderTestCases = (dragIndex, hoverIndex) => {
    setTestFlows((flow) => {
      const draggedItem = flow[dragIndex];
      const newItems = [...flow];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, draggedItem);

      return newItems.map((item, index) => ({
        ...item,
        // position: index + 1,
      }));
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-80px)]">
        <TestCases
          testCases={testFlows}
          onToggleTestCase={toggleTestCase}
          onToggleSelection={toggleTestCaseSelection}
          onToggleStatus={toggleTestCaseStatus}
          onReorder={reorderTestCases}
          showWorkflowHeader={showWorkflowHeader}
          selectionMode={!showWorkflowHeader && testFlows.length > 0}
        />
        {/* Right: Sidebar with controls */}
        <RightSideBar onGenerate={handleGenerate} isGenerating={isGenerating} />
      </div>
    </div>
  );
}
