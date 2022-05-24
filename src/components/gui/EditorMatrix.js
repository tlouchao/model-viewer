import React from "react"
import EditorMatrixRow from "./EdtiorMatrixRow"
import {DEF_TRANSLATE, MIN_TRANSLATE, MAX_TRANSLATE,
        DEF_ROTATE, MIN_ROTATE, MAX_ROTATE,
        DEF_SCALE, MIN_SCALE, MAX_SCALE} from "../../constants/constants"

const EditorMatrix = () => {

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
        <div className="matrix">
            <EditorMatrixRow handleBlur={handleBlur} name="Translate" 
                defaultValue={parseFloat(DEF_TRANSLATE).toFixed(2)}
                min={parseFloat(MIN_TRANSLATE).toFixed(2)} 
                max={parseFloat(MAX_TRANSLATE).toFixed(2)}  
            />
            <EditorMatrixRow handleBlur={handleBlur} name="Rotate" 
                defaultValue={parseFloat(DEF_ROTATE).toFixed(2)} 
                min={parseFloat(MIN_ROTATE).toFixed(2)} 
                max={parseFloat(MAX_ROTATE).toFixed(2)} 
            />
            <EditorMatrixRow handleBlur={handleBlur} name="Scale" 
                defaultValue={parseFloat(DEF_SCALE).toFixed(2)} 
                min={parseFloat(MIN_SCALE).toFixed(2)} 
                max={parseFloat(MAX_SCALE).toFixed(2)} 
            />
        </div>
    )
}

export default EditorMatrix