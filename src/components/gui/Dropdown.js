import React from "react"

const Dropdown = (props) => {
    return (
        <div className="dropdown">
            <select name={props.name} id={props.name} defaultValue = "" required>
                <option value="" disabled hidden>- Select -</option>
                {props.options.map((x, i) => <option key={i} value={x}>{x}</option>)}
            </select>
        </div>
    )
}

export default Dropdown