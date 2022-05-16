import React from "react"

const Toggle = (props) => {

    return (
        <div className="toggle">
            <input  type="checkbox"
                    onChange={props.handleChange}
                    id={props.id} 
                    name={props.label}
                    checked={props.checked}
            />
            <label htmlFor={props.label}>{props.label}</label>
        </div>
    )
}

export default Toggle