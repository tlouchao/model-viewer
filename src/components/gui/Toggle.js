import React, { useState } from "react"

const Toggle = (props) => {

    const [checked, setChecked] = useState(props.checked)

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return (
        <div className="toggle">
            <input  type="checkbox"
                    onChange={handleChange}
                    id={props.label} 
                    name={props.label}
                    checked={checked}
            />
            <label htmlFor={props.label}>{props.label}</label>
        </div>
    )
}

export default Toggle