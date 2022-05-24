import React, { useState } from "react"
import PropTypes from "prop-types"

const AttributeSlider = (props) => {

    const [numValue, setNumValue] = useState(parseFloat(props.value).toFixed(2))
    const [sliderValue, setSliderValue] = useState(parseFloat(props.value).toFixed(2))

    const handleNumChange = (e) => {
        setNumValue(e.target.value)
        setSliderValue(formatAttr(Number(e.target.value)))
    }

    const handleChange = (e) => {
        setNumValue(formatAttr(Number(e.target.value)))
        setSliderValue(formatAttr(Number(e.target.value)))
    }

    const formatAttr = (v) => {
        if (!v){
            v = props.defaultValue
        } else if (v < props.min){
            v = props.min
        } else if (v > props.max){
            v = props.max
        }
        return(parseFloat(v).toFixed(2))
    }

    return (
        <div className="attr-slider">
            <input  className="attr-num"
                    type="number" 
                    onBlur={handleChange}
                    onChange={handleNumChange}
                    value={numValue}
                    min={props.min}  
                    max={props.max} 
                    required 
            />
            <input  className="attr-slider-range" 
                    type="range" 
                    onChange={handleChange}
                    value={sliderValue} 
                    step={props.step} 
                    min={props.min}  
                    max={props.max} 
            />
        </div>
    )
}

AttributeSlider.propTypes = {
    value: PropTypes.number.isRequired,
    defaultValue: PropTypes.string.isRequired,
    step: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
}

export default AttributeSlider