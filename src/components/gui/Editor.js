import React from "react"
import PropTypes from "prop-types"

const Editor = (props) => {

    return (
        <div id="editor">
            {props.children}
        </div>
    )
}

Editor.propTypes = {
    children: PropTypes.element || PropTypes.elementType,
}

export default Editor