import React, { useState } from "react"
import PropTypes from "prop-types"
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
                categoryType={props.categoryType}
                handleChange={handleChange}
                optionValues={props.optionValues}
                optionNames={props.optionNames} 
            />
            <button data-categorytype={props.categoryType} 
                value={selectedValue} 
                onClick={props.handleClick}>
                Add
            </button>
        </div>
    )
}

DropdownContainer.propTypes = {
    name: PropTypes.string.isRequired,
    categoryType: PropTypes.string.isRequired,
    optionNames: PropTypes.array.isRequired,
    optionValues: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default DropdownContainer