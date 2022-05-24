import React from "react"
import PropTypes from "prop-types"

const Editor = (props) => {

    return (
        <div id="editor" tabIndex="0" onBlur={props.handleGUIBlur}>
            {props.content}
        </div>
    )
}

Editor.propTypes = {
    content: PropTypes.element || PropTypes.elementType,
    handleGUIBlur: PropTypes.func.isRequired,
}

export default Editor