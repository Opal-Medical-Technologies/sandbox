import { React, useState, useEffect } from "react";
import "./OuterWrap.css";
import * as eva from "eva-icons";
import { uid } from "react-uid";

function handleRemove(id, dosagesList) {
  let newList = dosagesList.filter((item) => uid(item) !== uid(id));
  return newList;
}

function DosageInput(lineNumber, lines) {
  const [firstDosages, setFirstDosages] = useState([0]);
  const [subsequentDosages, setSubsequentDosages] = useState([0]);
  const [subsequentDosageBoolean, setSubsequentDosageBoolean] = useState(false);
  let firstDosageHeader;
  let subsequentDosageInput;
  let subsequentDosageToggle;
  //let dosageInput = <div className = "parent"><input className="dosage" /> <button className = "child"> X </button></div>;

  if (subsequentDosageBoolean == false) {
    firstDosageHeader = null;
    subsequentDosageInput = null;
    subsequentDosageToggle = (
      <a>
        <button
          className="dropdown-item"
          onClick={() => {
            setSubsequentDosageBoolean(!subsequentDosageBoolean);
          }}
        >
          Add Subsequent
        </button>
      </a>
    );
  }
  if (subsequentDosageBoolean == true) {
    firstDosageHeader = <div> First Dosage: </div>;
    subsequentDosageInput = (
      <div>
        <div>Subsequent Dosage:</div>
        {subsequentDosages.map((m) => (
          <div className="parent" key={uid(m)}>
            <input className="dosage" />
            <button
              className="child"
              onClick={() => {
                if (subsequentDosages.length > 1) {
                  let updatedList = handleRemove(m,subsequentDosages);
                  setSubsequentDosages(updatedList);
                }
              }}
            >
              X
            </button>
          </div>
        ))}
        <button
          className="addDosageButton"
          onClick={() => {
            setSubsequentDosages([
              ...subsequentDosages,
              Date.now(),
            ]);
          }}
        >
          +
        </button>
        <label className="units"> mg/kg </label>
      </div>
    );
    subsequentDosageToggle = (
      <a>
        <button
          className="dropdown-item"
          onClick={() => {
            setSubsequentDosageBoolean(!subsequentDosageBoolean);
          }}
        >
          Remove Subsequent
        </button>
      </a>
    );
  }

  return (
    /* Use Map Function for adding stamps, exactly like dosage add */
    <div className="dosageInput">
      <div className="weightsToggleButton">
        <button> Choose Weights </button>
      </div>
      <div className="dropdown">
        <button className="ellipse"> : </button>
        <div className="dropdown-content">
          {subsequentDosageToggle}
          <a>
            <button className="dropdown-item">Delete</button>
          </a>
          <a>
            <button className="dropdown-item">Copy</button>
          </a>
          <a>
            <button className="dropdown-item">Paste</button>
          </a>
        </div>
      </div>
      <div className="dosageInput">
        {firstDosageHeader}
        {firstDosages.map((m) => (
          <div className="parent" key={uid(m)}>
            <input className="dosage" />{" "}
            <button
              className="child"
              onClick={() => {
                if (firstDosages.length > 1) {
                  let updatedList = handleRemove(m,firstDosages);
                  setFirstDosages(updatedList);
                }
              }}
            >
              X
            </button>
          </div>
        ))}
        <button
          className="addDosageButton"
          onClick={() => {
            setFirstDosages([...firstDosages, Date.now()]); /* Instead of Date.now, use some unique value */
          }}
        >
          {" "}
          +{" "}
        </button>
        <label className="units"> mg/kg </label>
        {subsequentDosageInput}
      </div>
    </div>
  );
}
/* 
props List
----------
header = "text": Title of Widget
input = {<Child/>}: Child component underneath divider
*/
function Widget(props) {
  const [lines, setLines] = useState([0]);
  return (
    <div>
      <div className="Border">
        <div className="TopRow">
          <h1 className="Header">{props.header}</h1>
        </div>
        <hr className="Divider" />
        {lines.map((m) => (props.input))}
      </div>
      
      <button
        className="StandardCustomButton"
        onClick={() => {
          setLines([...lines, Date.now()]);
        }} 
      >
        +
      </button>
      <div>
        hello
        <i data-eva="github" data-eva-animation= "pulse" className = "test69"></i>
        <i data-eva = "activity"></i>
        </div>
    </div>
  );
}

export default function App(props) {
  useEffect(() => {
    // add this line
    eva.replace();
  }, []);
  return <Widget header="Dosage" input={<DosageInput />} toggle />;
}