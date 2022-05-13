import React from "react"

const Toggle = () => {
    return (
        <div className="toggle">
            <input type="checkbox" id="check-ground-plane" name="check-ground-plane" />
            <label htmlFor="check-ground-plane">Show Ground Plane</label>
        </div>
    )
}

export default Toggle