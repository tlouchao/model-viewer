import React, { useState } from "react"
import EditorActorSummary from "./EditorActorSummary"

const Editor = (props) => {

    const [isEmpty, setIsEmpty] = useState(false)
    let content;
    if (isEmpty) {
        content = <p className="editor-empty">
            Select an actor in the scene to view and edit its attributes.
            </p>       
    } else {
        content = <EditorActorSummary />
    }

    return (
        <div id="editor">
            {content}
        </div>
    )
}

export default Editor