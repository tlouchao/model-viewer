import React from "react"
import DropdownContainer from "./DropdownContainer"
import OutlinerContainer from "./OutlinerContainer"
import EditorContainer from "./EditorContainer"
import Toggle from "./Toggle"

const GUILayout = () => {
    const primsOptions = ["Cube", "Cylinder", "Torus"]
    const lightsOptions = ["Ambient Light", "Point Light"]
    return (
        <div id="gui-layout">
            <h1 id="brand"><span>Model</span>Viewer</h1>
            <div id="gui-add">
                <DropdownContainer id="prim" name="Add Primitives" options={primsOptions} />
                <DropdownContainer id="light" name="Add Lights" options={lightsOptions}/>
            </div>
            <div id="gui-browse">
                <OutlinerContainer />
                <EditorContainer />
            </div>
            <div id="gui-toggle-layout">
                <div id="gui-toggle">
                    <Toggle label="Show Ground Plane" checked="checked" />
                    <Toggle label="Show Wireframe" checked="" />
                </div>
            </div>
            <div id="export">
                <button>Export</button>     
            </div>     
        </div>
    )
}

export default GUILayout