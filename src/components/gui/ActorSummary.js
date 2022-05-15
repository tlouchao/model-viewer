import React from "react"
import Matrix from "./Matrix"
import AttributeName from "./AttributeName"
import AttributeSlider from "./AttributeSlider"
import ColorAttributeSlider from "./ColorAttributeSlider"
import placeholderImg from "./../../static/imgs/cube-placeholder.png"

const ActorSummary = () => {
    return (
        <div id="actor-summary">
            <div id="actor-summary-header">
                <img id="actor-thumbnail" src={placeholderImg} alt="actor thumbnail" />
                <Matrix />
            </div>
            <div id="actor-summary-attrs">
                <AttributeName name="Color" /><ColorAttributeSlider color="#00FF00"/>
                <AttributeName name="Radius" /><AttributeSlider />
            </div>
        </div>
    )
}

export default ActorSummary