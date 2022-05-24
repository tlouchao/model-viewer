import React, { useState } from "react"
import PropTypes from "prop-types"
import chroma from "chroma-js"

const ColorAttributeSlider = (props) => {
    const [actorColor, setActorColor] = useState(props.color)
    const [actorSat, setActorSat] = useState(chroma(props.color).get("hsl.s"))
    const [actorHue, setActorHue] = useState(chroma(props.color).get("hsl.h"))

    const handleColorInput = (e) => {
        setActorColor(e.target.value)
        setActorSat(chroma(e.target.value).get("hsl.s"))
        setActorHue(chroma(e.target.value).get("hsl.h"))
    }

    const handleRangeChange = (e) => {
        setActorColor(prevState => 
            chroma.hsl(actorHue, 
                       e.target.value / 100,
                       chroma(prevState).get("hsl.l"),
                       "hsl"
            ).hex()
        )             
        setActorSat(e.target.value / 100)
    }

    return (
        <div className="attr-slider">
            <input  className="attr-color"
                    type="color"
                    onInput={handleColorInput}
                    value={actorColor}
            />
            <input  className="attr-slider-range" 
                    type="range" 
                    onChange={handleRangeChange}
                    value={Math.round(actorSat * 100)}
                    min={props.min}  
                    max={props.max} 
            />
        </div>
    )
}

ColorAttributeSlider.propTypes = {
    color: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
}

export default ColorAttributeSlider