import React from "react"

const Outliner = () => {
    const ws = "  ";
    const prims_arr = ['Cube', 'Cube_01', 'Cube_02', 'Cube_03', 'Cylinder']
    const lights_arr = ['Ambient', 'Ambient_01', 'Point', 'Point_01', 'Point_02']

    return (
        <div id="outliner">
            <h2 className="outliner-item">Primitives</h2>
            <ul>
                {prims_arr.map((x, i) => <li key={i} className="outliner-item">{ws + x}</li>)}
            </ul>
            <h2 className="outliner-item">Lights</h2>
            <ul>
                {lights_arr.map((x, i) => <li key={i} className="outliner-item">{ws + x}</li>)}
            </ul>
        </div>
    )
}

export default Outliner