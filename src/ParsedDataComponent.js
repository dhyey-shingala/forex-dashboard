import React, { useEffect } from "react";
import MyChartComponent from "./MyChartComponent";

const ParsedDataComponent = ({ parsedData }) => {
  // useEffect will be called every time parsedData prop changes
  useEffect(() => {
    if (parsedData && parsedData.length > 0) {
      console.log("Parsed Data received:", parsedData);
    }
  }, [parsedData]); // Dependency array ensures the effect runs when parsedData changes

  return (
    <div>
      {/* Display the parsed data here */}
      {parsedData && parsedData.length > 0 ? (
        parsedData.map((data, index) => (
          <div key={index}>{/* Render data as needed */}</div>
        ))
      ) : (
        <div>No parsed data available</div>
      )}
      <MyChartComponent data={parsedData}/>
    </div>
  );
};

export default ParsedDataComponent;
