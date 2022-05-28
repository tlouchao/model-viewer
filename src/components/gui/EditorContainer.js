import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import chroma from "chroma-js"
import Editor from "./Editor"
import EditorActorSummary from "./EditorActorSummary"
import {DEF_TRANSLATE, MIN_TRANSLATE, MAX_TRANSLATE,
        DEF_ROTATE, MIN_ROTATE, MAX_ROTATE,
        DEF_SCALE, MIN_SCALE, MAX_SCALE} 
        from "constants/constants"

const EditorContainer = (props) => {

    const [bufferActor, setBufferActor] = useState(null)
    const [bufferNumValue, setBufferNumValue] = useState(null)
    const [bufferSliderValue, setBufferSliderValue] = useState(null)
    const [bufferHSL, setBufferHSL] = useState(null)
    const [editAttrName, setEditAttrName] = useState(null)

    /*------------------------------------------------------------------------------------------*/

    /* Side effects */

    useEffect(() => {
        if (isCurrentlySelectedActor()) {
            const id = Number(props.currentSelected.dataset.id)
            const categoryType = props.currentSelected.dataset.categorytype
            const actor = props.actors[categoryType + "s"][id]
            Object.keys(actor.matrix).forEach(row => {
                Object.keys(actor.matrix[row]).forEach(col => 
                    actor.matrix[row][col] = 
                        String(parseFloat(actor.matrix[row][col]).toFixed(2))
                )
            })
            Object.keys(actor.attributes).forEach(k => {
                if (k.includes("Seg")){
                    actor.attributes[k].data = 
                        String(parseInt(actor.attributes[k].data))
                } else {
                    actor.attributes[k].data = 
                        String(parseFloat(actor.attributes[k].data).toFixed(2))
                }
            })
            setBufferActor(actor)
            setBufferHSL(chroma(actor.color).hsl())
        } else {
            setBufferActor(null)
            setBufferHSL(null)
        }
    }, [props.currentSelected])

    /*------------------------------------------------------------------------------------------*/

    /* Helpers */

    function isCurrentlySelectedActor() {
        return (props.currentSelected != null) && 
            (props.currentSelected.hasAttribute("data-actortype"))
    }

    function formatValueHelper(v, tdef, tmin, tmax, tstep){
        v = Number(v)
        if (!v){
            v = tdef
        } else if (v < tmin){
            v = tmin
        } else if (v > tmax){
            v = tmax
        }
        if (tstep == 1){
            return String(parseInt(v))
        } else {
            return String(parseFloat(v).toFixed(2))
        }
    }

    function setMatrixHelper(row, col, val) {
        setBufferActor(() => ({
            ...bufferActor,
            matrix: ({
                ...bufferActor.matrix,
                [row]: ({
                    ...bufferActor.matrix[row],
                    [col]: val
                })
            })
        }))
    }

    /*------------------------------------------------------------------------------------------*/

    /* Event listeners */

    const handleMatrixChange = (e) => {
        const [row, col] = e.target.id.split("-")
        setMatrixHelper(row, col, e.target.value)
    }

    const handleMatrixBlur = (e) => {
        const [row, col] = e.target.id.split("-")
        let tdef, tmin, tmax
        if (row === "translate"){
            [tdef, tmin, tmax] = [DEF_TRANSLATE, MIN_TRANSLATE, MAX_TRANSLATE]
        } else if (row === "rotate"){
            [tdef, tmin, tmax] = [DEF_ROTATE, MIN_ROTATE, MAX_ROTATE]
        } else if (row === "scale"){
            [tdef, tmin, tmax] = [DEF_SCALE, MIN_SCALE, MAX_SCALE]
        } else {
            throw new Error(`${row} is not a property in actor matrix`)
        }
        let v = formatValueHelper(e.target.value, tdef, tmin, tmax, 0.01)
        setMatrixHelper(row, col, v)
    }

    const handleColorInput = (e) => {
        setBufferActor(() => ({
            ...bufferActor,
            color: e.target.value
        }))
        setBufferHSL(chroma(e.target.value).hsl())
    }

    const handleColorSliderChange = (e) => {
        setBufferActor(() => ({
            ...bufferActor,
            color: chroma(bufferHSL[0], 
                          bufferHSL[1], 
                          e.target.value / 100, 
                          "hsl").hex()
        }))
        setBufferHSL(() => [bufferHSL[0], bufferHSL[1], e.target.value / 100]
        )
    }

    const setAttributeHelper = (e, val) => {
        let t = e.target
        let v = formatValueHelper(val, t.min, t.min, t.max, t.step)
        setBufferActor(() => ({
            ...bufferActor,
            attributes: ({
                ...bufferActor.attributes,
                [e.target.name]: ({
                    ...bufferActor.attributes[e.target.name],
                    data: v,
                })
            })
        }))
    }

    const handleNumBlur = (e) => {
        setAttributeHelper(e, bufferNumValue)
        setEditAttrName(null)
        setBufferNumValue(null)
        setBufferSliderValue(null)
    }

    const handleNumChange = (e) => {
        if (editAttrName === null){ setEditAttrName(e.target.name)}
        let t = e.target
        let formatted = formatValueHelper(t.value, t.min, t.min, t.max, t.step)
        setBufferNumValue(t.value) // unformatted
        setBufferSliderValue(formatted)
    }

    const handleNumSliderChange = (e) => {
        if (editAttrName !== null){ setEditAttrName(null)}
        setAttributeHelper(e, e.target.value)
    }

    /*------------------------------------------------------------------------------------------*/

    // JSX helper
    const getContent = () => {
        if (bufferActor){
            return (<EditorActorSummary
                        actor={bufferActor}
                        bufferHSL={bufferHSL}
                        bufferNumValue={bufferNumValue}
                        bufferSliderValue={bufferSliderValue}
                        editAttrName={editAttrName}
                        handleMatrixChange={handleMatrixChange}
                        handleMatrixBlur={handleMatrixBlur}
                        handleColorInput={handleColorInput}
                        handleColorSliderChange={handleColorSliderChange}
                        handleNumBlur={handleNumBlur}
                        handleNumChange={handleNumChange}
                        handleNumSliderChange={handleNumSliderChange}
                        formatValueHelper={formatValueHelper}
                    />
            )
        } else {
            return (<p id="editor-empty">
                        Select an object in the Outliner to view and edit its attributes.
                    </p>  
            )
        }
    }

    /*------------------------------------------------------------------------------------------*/

    return (
        <div id="editor-container">
            <h2 className="name-container">Editor</h2>
            <Editor handleGUIBlur={props.handleGUIBlur} content={getContent()}/>
            <div className="button-group">
                <button onBlur={props.handleGUIBlur} 
                        onClick={props.handleEditorSave}>
                        Save
                </button>
                <button onBlur={props.handleGUIBlur} 
                        onClick={props.handleEditorDelete}>
                        Delete
                </button>
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