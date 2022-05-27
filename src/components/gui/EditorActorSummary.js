import React from "react"
import PropTypes from "prop-types"
import EditorMatrix from "./EditorMatrix"
import AttributeSlider from "./AttributeSlider"
import ColorAttributeSlider from "./ColorAttributeSlider"
import boxThumb from "static/imgs/box-thumb.png"
import cylinderThumb from "static/imgs/cylinder-thumb.png"
import torusThumb from "static/imgs/torus-thumb.png"
import ambientThumb from "static/imgs/ambient-thumb.png"
import pointThumb from "static/imgs/point-thumb.png"

const EditorActorSummary = (props) => {

    const attributes = Object.entries(props.actor.attributes)

    let thumb
    switch(props.actor.actorType){
        case "box":
            thumb=boxThumb
            break
        case "cylinder":
            thumb=cylinderThumb
            break
        case "torus":
            thumb=torusThumb
            break
        case "ambient":
            thumb=ambientThumb
            break
        case "point":
            thumb=pointThumb
            break
        default:
            console.warn("image not available for actor type " + props.actor.actorType)
            thumb=boxThumb
            break
    }

    return (
        <div id="editor-actor-summary">
            <div id="editor-actor-summary-header">
                <div className="editor-item">
                    <img id="editor-thumbnail" src={thumb} alt="actor thumbnail" />
                    <EditorMatrix matrix={props.actor.matrix} 
                                  handleChange={props.handleMatrixChange}
                                  handleBlur={props.handleMatrixBlur}
                    />
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
                {attributes.map(([k, v]) => 
                    <div key={`attr-${k}`} className="editor-item">
                        <div key={`name-${k}`} className="attr-name">
                            <label>{k.split(/(?=[A-Z])/).join(" ")}</label>
                        </div>
                        <AttributeSlider key={`slider-${k}`}
                            name={k}
                            value={String(v.data)}
                            defaultValue={v.min}
                            min={v.min}
                            max={v.max}
                            step={v.step}
                            bufferNumValue={props.bufferNumValue}
                            bufferSliderValue={props.bufferSliderValue}
                            editAttrName={props.editAttrName}
                            handleNumBlur={props.handleNumBlur}
                            handleNumChange={props.handleNumChange}
                            handleSliderChange={props.handleSliderChange}
                            formatValueHelper={props.formatValueHelper}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

EditorActorSummary.propTypes = {
    actor: PropTypes.object.isRequired,
    bufferNumValue: PropTypes.string || null,
    bufferSliderValue: PropTypes.string || null,
    editAttrName: PropTypes.string || null,
    handleMatrixChange: PropTypes.func.isRequired,
    handleMatrixBlur: PropTypes.func.isRequired,
    handleNumBlur: PropTypes.func.isRequired,
    handleNumChange: PropTypes.func.isRequired,
    handleSliderChange: PropTypes.func.isRequired,
    formatValueHelper: PropTypes.func.isRequired,
}

export default EditorActorSummary