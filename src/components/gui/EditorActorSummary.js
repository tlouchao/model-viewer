import React, { useState } from "react"
import chroma from "chroma-js"
import EditorMatrix from "./EditorMatrix"
import AttributeSlider from "./AttributeSlider"
import ColorAttributeSlider from "./ColorAttributeSlider"
import placeholderImg from "./../../static/imgs/cube-placeholder.png"

const EditorActorSummary = () => {

    const [actorColor, setActorColor] = useState(chroma("green").hex())

    return (
        <div id="editor-actor-summary">
            <div id="editor-actor-summary-header">
                <img id="editor-actor-thumbnail" src={placeholderImg} alt="actor thumbnail" />
                <EditorMatrix />
            </div>
            <div id="editor-actor-summary-attrs">
                <div className="attr-name">
                    <label>Color</label>
                </div>
                <ColorAttributeSlider
                    defaultColor={actorColor}
                    name="color-slider"
                    min="0"
                    max="100"
                    step="1"
                />
                <div className="attr-name">
                    <label>Radius</label>
                </div>
                <AttributeSlider
                    defaultValue="0.00"
                    name="radius-slider" 
                    min="0.00"
                    max="100.00"
                    step="0.01"
                />
            </div>
        </div>
    )
}

export default EditorActorSummary