import React, { useState } from "react"
import EditorMatrix from "./EditorMatrix"
import AttributeSlider from "./AttributeSlider"
import ColorAttributeSlider from "./ColorAttributeSlider"
import boxThumb from "./../../static/imgs/box-thumb.png"
import cylinderThumb from "./../../static/imgs/cylinder-thumb.png"
import torusThumb from "./../../static/imgs/torus-thumb.png"
import * as CONSTS from "./../../constants/constants"

const EditorActorSummary = (props) => {

    let thumb;
    switch(props.actor.actorType){
        case "box":
            thumb=boxThumb
            break;
        case "cylinder":
            thumb=cylinderThumb
            break;
        case "torus":
            thumb=torusThumb
            break;
        default:
            console.warn("image not available for actor type " + props.actor.actorType)
            thumb=boxThumb
            break;
    }

    return (
        <div id="editor-actor-summary">
            <div id="editor-actor-summary-header">
                <div className="editor-item">
                    <img id="editor-thumbnail" src={thumb} alt="actor thumbnail" />
                    <EditorMatrix />
                </div>
            </div>
            <div id="editor-actor-summary-attrs">
                <div key="attr-color" className="editor-item">
                    <div className="attr-name">
                        <label>Color</label>
                    </div>
                    <ColorAttributeSlider key={props.actor.color} color={props.actor.color}
                        name="color-slider"
                        min="0"
                        max="100"
                        step="1"
                    />
                </div>
                {Object.entries(props.actor.attributes).map(x => 
                    <div key={`attr-${x[0]}`} className="editor-item">
                        <div key={`name-${x[0]}`} className="attr-name">
                            <label>{x[0]}</label>
                        </div>
                        <AttributeSlider key={`slider-${x[0]}`} value={x[1]}
                            defaultValue="0.00"
                            name={`${x[0]}-slider`}
                            min="0.00"
                            max={(x[0] === 'intensity') ? "10.00" : "100.00"}
                            step="0.01"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditorActorSummary