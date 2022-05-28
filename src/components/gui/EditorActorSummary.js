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

    const blendStyle = {
        backgroundColor: props.actor.color,
        maskImage: `url("assets/${props.actor.actorType}-thumb.png")`,
        WebkitMaskBoxImage: `url("assets/${props.actor.actorType}-thumb.png")`,
    }

    return (
        <div id="editor-actor-summary">
            <div id="editor-actor-summary-header">
                <div className="editor-item">
                    <div id="editor-thumbnail-background">
                        <div id="editor-thumbnail-blend" 
                             style={blendStyle}>
                            <img id="editor-thumbnail-base" 
                                 src={`assets/${props.actor.actorType}-thumb.png`} 
                                 alt="editor thumbnail"/>
                            <img id="editor-thumbnail" 
                                 src={`assets/${props.actor.actorType}-thumb.png`} 
                                 alt="editor thumbnail"/>
                            
                        </div>
                    </div>
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
                    <ColorAttributeSlider color={props.actor.color}
                        name="color-slider"
                        min="0"
                        max="100"
                        step="1"
                        bufferHSL={props.bufferHSL}
                        handleColorInput={props.handleColorInput}
                        handleColorSliderChange={props.handleColorSliderChange}
                    />
                </div>
                {attributes.map(([k, v]) => 
                    <div key={`attr-${k}`} className="editor-item">
                        <div key={`name-${k}`} className="attr-name">
                            <label>{k.split(/(?=[A-Z])/).join(" ")}</label>
                        </div>
                        <AttributeSlider key={`slider-${k}`}
                            name={k}
                            value={v.data}
                            defaultValue={v.min}
                            min={v.min}
                            max={v.max}
                            step={v.step}
                            bufferNumValue={props.bufferNumValue}
                            bufferSliderValue={props.bufferSliderValue}
                            editAttrName={props.editAttrName}
                            handleNumBlur={props.handleNumBlur}
                            handleNumChange={props.handleNumChange}
                            handleNumSliderChange={props.handleNumSliderChange}
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
    bufferHSL: PropTypes.array.isRequired,
    bufferNumValue: PropTypes.string || null,
    bufferSliderValue: PropTypes.string || null,
    editAttrName: PropTypes.string || null,
    handleMatrixChange: PropTypes.func.isRequired,
    handleMatrixBlur: PropTypes.func.isRequired,
    handleColorInput: PropTypes.func.isRequired,
    handleColorSliderChange: PropTypes.func.isRequired,
    handleNumBlur: PropTypes.func.isRequired,
    handleNumChange: PropTypes.func.isRequired,
    handleNumSliderChange: PropTypes.func.isRequired,
    formatValueHelper: PropTypes.func.isRequired,
}

export default EditorActorSummary