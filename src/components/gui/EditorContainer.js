import React from "react"
import Editor from "./Editor"

const EditorContainer = () => {
    return (
        <div id="editor-container">
            <h2 className="label-container">Editor</h2>
            <Editor />
            <div className="button-group">
                <button>Save</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default EditorContainer