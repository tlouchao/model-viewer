import React from "react"
import Outliner from "./Outliner"

const OutlinerContainer = () => {

    return (
        <div id="outliner-container">
            <h2 className="name-container">Outliner</h2>
            <Outliner />
            <div className="button-group">
                <button>Show</button>
                <button>Hide</button>
            </div>
        </div>
    )
}

export default OutlinerContainer