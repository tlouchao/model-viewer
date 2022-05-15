import React from "react"

const MatrixElem = (props) => {

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
        <div className="matrix-elem">
            <input  onBlur={handleBlur}
                    type="number" 
                    step="0.01" 
                    defaultValue={props.defaultValue} 
                    min={props.min} 
                    max={props.max}  
                    required 
            />
        </div>
    )
}

export default MatrixElem