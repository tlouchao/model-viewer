import React from "react"

const ColorAttributeSlider = (props) => {

    return (
        <div className="attr-slider">
            <input  className="attr-color"
                    type="color"
                    value={props.color}
            />
            <input  className="attr-slider-range" 
                    type="range" 
                    id="color_slider-range" 
                    name="color_slider-range" 
            />
        </div>
    )
}

export default ColorAttributeSlider