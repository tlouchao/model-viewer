import React from "react"

const Dropdown = (props) => {
    
    return (
        <div className="dropdown">
            <select name={props.name} 
                    id={`select-${props.suffix}`} 
                    defaultValue="" 
                    onChange={props.handleChange}
                    required>
                <option value="" 
                        disabled 
                        hidden>
                        - Select -
                </option>
                {props.optionValues.map((x, i) => 
                    <option key={i} value={x}>{props.optionNames[i]}</option>)
                }
            </select>
        </div>
    )
}

export default Dropdown