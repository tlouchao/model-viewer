import React, { useState } from "react"
import ActorSummary from "./ActorSummary"

const Editor = (props) => {

    const [isEmpty, setIsEmpty] = useState(false)
    let content;
    if (isEmpty) {
        content = <p className="editor-empty">
            Select an actor in the scene to view and edit its attributes.
            </p>       
    } else {
        content = <ActorSummary />
    }

    return (
        <div id="editor">
            {content}
        </div>
    )
}

export default Editor