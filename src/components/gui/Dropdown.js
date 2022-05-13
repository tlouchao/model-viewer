import React from "react"

const Dropdown = () => {
    return (
        <div className="dropdown">
            <select name="prims" id="prims" defaultValue = "" required>
                <option value="" disabled hidden>- Select -</option>
                <option value="cube">Cube</option>
                <option value="cylinder">Cylinder</option>
                <option value="torus">Torus</option>
            </select>
        </div>
    )
}

export default Dropdown