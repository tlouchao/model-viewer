import React from "react"
import PropTypes from "prop-types"

const Toggle = (props) => {

    return (
        <div className="toggle" tabIndex="0" onBlur={props.handleGUIBlur}>
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

Toggle.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleGUIBlur: PropTypes.func.isRequired,
}

export default Toggle