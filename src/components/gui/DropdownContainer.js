import React from "react"
import Dropdown from "./Dropdown"

const DropdownContainer = (props) => {
    return (
        <div className="dropdown-container">
            <h2 className="name-container">{props.name}</h2>
            <Dropdown name={props.name} options={props.options} />
            <button>Add</button>
        </div>
    )
}

export default DropdownContainer