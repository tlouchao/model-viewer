import React from "react"

const Outliner = () => {
    const ws = "  ";
    const prims_arr = ['cube', 'cube_01', 'cube_02', 'cube_03', 'cylinder']
    const lights_arr = ['ambient', 'ambient_01', 'point', 'point_01', 'point_02']

    return (
        <div id="outliner">
            <h2 className="outliner-item">Primitives</h2>
            <ul>
                {prims_arr.map((x, idx) => <li key={idx} className="outliner-item">{ws + x}</li>)}
            </ul>
            <h2 className="outliner-item">Lights</h2>
            <ul>
                {lights_arr.map((x, idx) => <li key={idx} className="outliner-item">{ws + x}</li>)}
            </ul>
        </div>
    )
}

export default Outliner