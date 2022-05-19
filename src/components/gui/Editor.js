import React from "react"
import EditorActorSummary from "./EditorActorSummary"

const Editor = (props) => {
    let content;
    if (!props.currentSelected || props.currentSelected.dataset.elemtype === "category") {
        content = <p id="editor-empty">
            Select an actor in the Outliner to view and edit its attributes.
            </p>       
    } else {
        const idx = props.currentSelected.dataset.idx
        const categoryType = props.currentSelected.dataset.categorytype
        const actor = props.actors[categoryType + 's'][idx]
        content = <EditorActorSummary actor={actor} />
    }

    return (
        <div id="editor">
            {content}
        </div>
    )
}

export default Editor