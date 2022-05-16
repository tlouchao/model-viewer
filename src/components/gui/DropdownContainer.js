import React from "react"
import Dropdown from "./Dropdown"

const DropdownContainer = (props) => {

    return (
        <div className="dropdown-container">
            <h2 className="name-container">
                {props.name}
            </h2>
            <Dropdown name={props.name}
                onChange={props.handleDropdownChange} 
                options={props.options} />
            <button id={`add-${props.id}`} onClick={props.handleDropdownClick}>Add</button>
        </div>
    )
}

export default DropdownContainer