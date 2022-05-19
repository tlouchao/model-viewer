import React from "react"
import Editor from "./Editor"

const EditorContainer = (props) => {
    return (
        <div id="editor-container">
            <h2 className="name-container">Editor</h2>
            <Editor actors={props.actors} currentSelected={props.currentSelected} />
            <div className="button-group">
                <button disabled>Save</button>
                <button disabled>Delete</button>
            </div>
        </div>
    )
}

export default EditorContainer