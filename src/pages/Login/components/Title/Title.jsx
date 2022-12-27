import React from "react";
import './Title.css' 


const Title = (props) => {
    return (<div className="title-container">
       <label className="title-label">{props.text}</label>
    </div>)
};

export default Title;