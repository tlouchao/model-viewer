import React from "react"

const ColorAttributeSlider = (props) => {

    return (
        <div className="attr-slider">
            <input  className="attr-color"
                    type="color"
                    defaultValue={props.defaultColor}
            />
            <input  className="attr-slider-range" 
                    type="range" 
                    id={props.id}
                    name={props.id}
            />
        </div>
    )
}

export default ColorAttributeSlider