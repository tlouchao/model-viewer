import React, { useState } from "react"

const AttributeSlider = (props) => {

    const [numValue, setNumValue] = useState(props.value)
    const [sliderValue, setSliderValue] = useState(props.value)

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
                    value={parseFloat(numValue).toFixed(2)}
                    step={props.step} 
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

export default AttributeSlider