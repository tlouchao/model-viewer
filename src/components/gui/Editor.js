import React from "react"
import PropTypes from "prop-types"
import EditorActorSummary from "./EditorActorSummary"

const Editor = (props) => {
    let content
    if (!props.currentSelected || !props.currentSelected.hasAttribute("data-actortype")) {
        content = <p id="editor-empty">
            Select an actor in the Outliner to view and edit its attributes.
            </p>       
    } else {
        const id = props.currentSelected.dataset.id
        const categoryType = props.currentSelected.dataset.categorytype
        const actor = props.actors[categoryType + "s"][id]
        content = <EditorActorSummary actor={actor} />
    }

    return (
        <div id="editor">
            {content}
        </div>
    )
}

Editor.propTypes = {
    actors: PropTypes.object.isRequired,
    currentSelected: PropTypes.instanceOf(Element) || null,
}

export default Editor