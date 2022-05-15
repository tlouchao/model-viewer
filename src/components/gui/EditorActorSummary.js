import React from "react"
import Matrix from "./Matrix"
import AttributeName from "./AttributeName"
import AttributeSlider from "./AttributeSlider"
import ColorAttributeSlider from "./ColorAttributeSlider"
import placeholderImg from "./../../static/imgs/cube-placeholder.png"

const EditorActorSummary = () => {
    return (
        <div id="editor-actor-summary">
            <div id="editor-actor-summary-header">
                <img id="editor-actor-thumbnail" src={placeholderImg} alt="actor thumbnail" />
                <Matrix />
            </div>
            <div id="editor-actor-summary-attrs">
                <AttributeName id="color-slider" name="Color" /><ColorAttributeSlider id="color-slider" defaultColor="#00FF00"/>
                <AttributeName id="radius-slider" name="Radius" /><AttributeSlider id="radius-slider" />
            </div>
        </div>
    )
}

export default EditorActorSummary