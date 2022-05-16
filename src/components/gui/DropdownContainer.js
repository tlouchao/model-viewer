import React, { useState } from "react"
import Dropdown from "./Dropdown"

const DropdownContainer = (props) => {

    const [selectedValue, setSelectedValue] = useState(null)

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
    }

    return (
        <div className="dropdown-container">
            <h2 className="name-container">
                {props.name}
            </h2>
            <Dropdown name={props.name}
                suffix={props.suffix}
                handleChange={handleChange}
                optionValues={props.optionValues}
                optionNames={props.optionNames} 
            />
            <button id={`add-${props.suffix}`} 
                value={selectedValue} 
                onClick={props.handleClick}>
                Add
            </button>
        </div>
    )
}

export default DropdownContainer