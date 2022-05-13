import React from "react"
import DropdownContainer from "./DropdownContainer"
import OutlinerContainer from "./OutlinerContainer"
import EditorContainer from "./EditorContainer"
import Toggle from "./Toggle"

const GUILayout = () => {
    return (
        <div id="gui-layout">
            <h1 id="brand"><span>Model</span>Viewer</h1>
            <div id="gui-add">
                <DropdownContainer />
                <DropdownContainer />
            </div>
            <div id="gui-browse">
                <OutlinerContainer />
                <EditorContainer />
            </div>
            <div id="gui-toggle-layout">
                <div id="gui-toggle">
                    <Toggle />
                    <Toggle />
                </div>
            </div>
            <div id="export">
                <button>Export</button>     
            </div>     
        </div>
    )
}

export default GUILayout