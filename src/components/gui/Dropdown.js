import React from "react"
import PropTypes from "prop-types"

const Dropdown = (props) => {
    
    return (
        <div className="dropdown" tabIndex="0">
            <select name={props.name} 
                    data-categorytype={props.categoryType} 
                    defaultValue=""
                    onBlur={props.handleGUIBlur}
                    onChange={props.handleChange}
                    required>
                <option value="" 
                        disabled 
                        hidden>
                        - select -
                </option>
                {props.optionValues.map((x, i) => 
                    <option key={i} value={x}>{props.optionNames[i]}</option>)
                }
            </select>
        </div>
    )
}

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    categoryType: PropTypes.string.isRequired,
    optionNames: PropTypes.array.isRequired,
    optionValues: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleGUIBlur: PropTypes.func.isRequired,
}

export default Dropdown