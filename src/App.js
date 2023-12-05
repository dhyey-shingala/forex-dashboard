import React, { useState } from "react";
import Papa from "papaparse";
import MyChartComponent from "./MyChartComponent";
import './App.css'

function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [view, setView] = useState("table"); // 'table' or 'graph'

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };

  return (
    <div>
      <h1 className="heading">Forex Predictor</h1>
      <div className="file-input-container">
        <label htmlFor="file" className="browse-button">
          Browse File
        </label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "none" }}
        />
      </div>
      <br />
      <br />
      {/* Toggle between table and graph views */}
      <div className="toggle-buttons">
        <button onClick={() => setView("table")}>Table View</button>
        <button onClick={() => setView("graph")}>Graph View</button>
      </div>
      <br />
      {/* Render table or graph based on the selected view */}
      {view === "table" && (
        <table>
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {view === "graph" && parsedData.length > 0 && (
        <MyChartComponent data={parsedData} />
      )}
    </div>
  );
}

export default App;
