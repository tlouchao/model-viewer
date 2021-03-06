import React from "react"
import PropTypes from "prop-types"

const AttributeSlider = (props) => {

    const numValue = (props.editAttrName === props.name) ? props.bufferNumValue : props.value
    const sliderValue = (props.editAttrName ===props.name) ? props.bufferSliderValue : props.value

    return (
        <div className="attr-slider">
            <input  className="attr-num"
                    id={`num-${props.name}`}
                    name={props.name}
                    type="number" 
                    onBlur={props.handleNumBlur}
                    onChange={props.handleNumChange}
                    value={numValue}
                    step={props.step}
                    min={props.min}  
                    max={props.max} 
                    required 
            />
            <input  className="attr-slider-range" 
                    id={`range-${props.name}`}
                    name={props.name}
                    type="range" 
                    onChange={props.handleNumSliderChange}
                    value={sliderValue}
                    step={props.step}
                    min={props.min}  
                    max={props.max} 
            />
        </div>
    )
}

AttributeSlider.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    defaultValue: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    bufferNumValue: PropTypes.string || null,
    bufferSliderValue: PropTypes.string || null,
    editAttrName: PropTypes.string || null,
    handleNumSliderChange: PropTypes.func.isRequired,
    handleNumChange: PropTypes.func.isRequired,
    handleNumBlur: PropTypes.func.isRequired,
}

export default AttributeSlider