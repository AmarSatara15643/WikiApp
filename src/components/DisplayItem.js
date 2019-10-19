import React from "react";

import "../css/DisplayItem.css";

function DisplayItem (props){

  return(
    <div className="displayContainer">
      <div className="image">
        <img src={props.img} alt="nema"></img>
      </div>
      <div className="displayTitle">
        <p>{props.title}</p>
      </div>
    </div>
  );
}

export default DisplayItem;