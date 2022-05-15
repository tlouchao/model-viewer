import React from "react"
import Dropdown from "./Dropdown"

const DropdownContainer = () => {
    return (
        <div className="dropdown-container">
            <h2 className="name-container">Dropdown</h2>
            <Dropdown />
            <button>Add</button>
        </div>
    )
}

export default DropdownContainer