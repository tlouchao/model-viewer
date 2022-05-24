import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Editor from "./Editor"
import EditorActorSummary from "./EditorActorSummary"

const EditorContainer = (props) => {

    const [bufferActor, setBufferActor] = useState(null)

    /*------------------------------------------------------------------------------------------*/

    /* Side effects */

    useEffect(() => {
        let actor = null
        if (isCurrentlySelectedActor()) {
            const id = props.currentSelected.dataset.id
            const categoryType = props.currentSelected.dataset.categorytype
            actor = props.actors[categoryType + "s"][id]
            Object.keys(actor.matrix).forEach(k => {
                actor.matrix[k].x = parseFloat(actor.matrix[k].x).toFixed(2)
                actor.matrix[k].y = parseFloat(actor.matrix[k].y).toFixed(2)
                actor.matrix[k].z = parseFloat(actor.matrix[k].z).toFixed(2)
            })
        }
        setBufferActor(actor)
    }, [props.currentSelected])

    /*------------------------------------------------------------------------------------------*/

    /* Helpers */

    function isCurrentlySelectedActor() {
        return (props.currentSelected != null) && (props.currentSelected.hasAttribute("data-actortype"))
    }

    const getContent = () => {
        if (bufferActor){
            return (<EditorActorSummary
                        actor={bufferActor}
                        handleMatrixChange={handleMatrixChange}
                        handleMatrixBlur={handleMatrixBlur} 
                    />
            )
        } else {
            return (<p id="editor-empty">
                        Select an actor in the Outliner to view and edit its attributes.
                    </p>  
            )
        }
    }

    /*------------------------------------------------------------------------------------------*/

    /* Event listeners */

    const handleMatrixChange = (e) => {
        e.target.value
    }

    const handleMatrixBlur = (e) => {
        let t = e.target
        if (!t.value){
            t.value = props.defaultValue
        } else if (t.value < props.min){
            t.value = props.min
        } else if (t.value > props.max){
            t.value = props.max
        }
        t.value = parseFloat(t.value).toFixed(2)
    }

    /*------------------------------------------------------------------------------------------*/

    return (
        <div id="editor-container">
            <h2 className="name-container">Editor</h2>
            <Editor handleGUIBlur={props.handleGUIBlur} content={getContent()}/>
            <div className="button-group">
                <button onBlur={props.handleGUIBlur} onClick={props.handleEditorSave}>Save</button>
                <button onBlur={props.handleGUIBlur} onClick={props.handleEditorDelete}>Delete</button>
            </div>
        </div>
    )
}

EditorContainer.propTypes = {
    actors: PropTypes.object.isRequired,
    currentSelected: PropTypes.instanceOf(Element) || null,
    handleEditorSave: PropTypes.func.isRequired,
    handleEditorDelete: PropTypes.func.isRequired,
    handleGUIBlur: PropTypes.func.isRequired,
}

export default EditorContainer