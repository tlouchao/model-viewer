import React from "react"

const Dropdown = (props) => {
    return (
        <div className="dropdown">
            <select name={props.name} 
                    id={`select-${props.id}`} 
                    defaultValue="" 
                    onChange={props.onChange}
                    required>
                <option value="" 
                        disabled 
                        hidden>
                        - Select -
                </option>
                {props.options.map((x, i) => 
                    <option key={i} value={x}>{x}</option>)
                }
            </select>
        </div>
    )
}

export default Dropdown