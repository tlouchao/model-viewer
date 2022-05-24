import React from "react"
import PropTypes from "prop-types"
import Editor from "./Editor"

const EditorContainer = (props) => {
    return (
        <div id="editor-container">
            <h2 className="name-container">Editor</h2>
            <Editor actors={props.actors} currentSelected={props.currentSelected} />
            <div className="button-group">
                <button>Save</button>
                <button onClick={props.handleEditorDelete}>Delete</button>
            </div>
        </div>
    )
}

EditorContainer.propTypes = {
    actors: PropTypes.object.isRequired,
    currentSelected: PropTypes.instanceOf(Element) || null,
    handleEditorDelete: PropTypes.func.isRequired,
}

export default EditorContainer