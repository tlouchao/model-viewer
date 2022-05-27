import React, { useState } from "react"
import PropTypes from "prop-types"

const ColorAttributeSlider = (props) => {
    /*
    const [actorColor, setActorColor] = useState(props.color)
    const [bufferHSL, setBufferHSL] = useState(chroma(props.color).hsl())

    const handleColorInput = (e) => {
        setActorColor(e.target.value)
        setBufferHSL(chroma(e.target.value).hsl())
    }

    const handleRangeChange = (e) => {
        console.log(e.target.value)
        setActorColor(() => 
            chroma(bufferHSL[0],
                   bufferHSL[1],
                   e.target.value / 100,
                   "hsl")
        )          
        setBufferHSL(() =>
            [bufferHSL[0], 
            bufferHSL[1],
            e.target.value / 100,
            ]
        )
    }
    */

    return (
        <div className="attr-slider">
            <label htmlFor="num-color">
                <input  className="attr-color"
                        id="num-color"
                        type="color"
                        onInput={props.handleColorInput}
                        value={props.color}
                />
            </label>
            <label htmlFor="range-color">
                <input  className="attr-slider-range" 
                        id="range-color"
                        type="range" 
                        onChange={props.handleColorSliderChange}
                        value={props.bufferHSL[2] * 100}
                        min={props.min}  
                        max={props.max} 
                />
            </label>
        </div>
    )
}

ColorAttributeSlider.propTypes = {
    bufferHSL: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    handleColorInput: PropTypes.func.isRequired,
    handleColorSliderChange: PropTypes.func.isRequired,
}

export default ColorAttributeSlider