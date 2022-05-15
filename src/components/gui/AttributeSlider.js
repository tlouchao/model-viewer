import React from "react"

const AttributeSlider = (props) => {

    const handleBlur = (e) => {
        const t = e.target
        if (!t.value){
            t.value = t.defaultValue
        } else if (Number(t.value) < t.min){
            t.value = t.min
        } else if (Number(t.value) > t.max){
            t.value = t.max
        }
        t.value = parseFloat(t.value).toFixed(2)
    }

    return (
        <div className="attr-slider">
            <input  className="attr-num"
                    onBlur={handleBlur}
                    type="number" 
                    step="0.01" 
                    defaultValue="0.00" 
                    min="-100.00" 
                    max="100.00" 
                    required 
            />
            <input  className="attr-slider-range" 
                    type="range" 
                    id={props.id}
                    name={props.id}
            />
        </div>
    )
}

export default AttributeSlider