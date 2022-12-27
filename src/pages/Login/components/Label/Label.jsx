import React from "react";
import "./Label.css"

const Label = (props) => {
  return (<div className="label-content">
    <label>{props.text}</label>
    </div>)
};

export default Label;
