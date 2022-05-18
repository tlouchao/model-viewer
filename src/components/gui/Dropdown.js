import React from "react"

const Dropdown = (props) => {
    
    return (
        <div className="dropdown">
            <select name={props.name} 
                    data-categorytype={props.categoryType} 
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