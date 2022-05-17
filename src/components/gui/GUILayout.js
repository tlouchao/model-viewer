import React from "react"
import DropdownContainer from "./DropdownContainer"
import OutlinerContainer from "./OutlinerContainer"
import EditorContainer from "./EditorContainer"
import Toggle from "./Toggle"

const GUILayout = (props) => {

    return (
        <div id="gui-layout">
            <h1 id="brand"><span>Model</span>Viewer</h1>
            <div id="gui-add">
                <DropdownContainer  name="Add Primitives" 
                                    suffix="prim" 
                                    handleClick={props.handleDropdownClick} 
                                    optionValues={props.prims} 
                                    optionNames={props.prims.map(x => x.charAt(0).toUpperCase() + x.slice(1))}
                />
                <DropdownContainer  name="Add Lights" 
                                    suffix="light" 
                                    optionValues={props.lights}
                                    handleClick={props.handleDropdownClick} 
                                    optionNames={props.lights.map(x => x.charAt(0).toUpperCase() + x.slice(1) + " Light")}
                />
            </div>
            <div id="gui-browse">
                <OutlinerContainer  actors={props.actors}
                                    categoriesSelected={props.categoriesSelected}
                                    categoryItemsSelected={props.categoryItemsSelected}
                                    prevCategoryItemSelected={props.prevCategoryItemSelected}
                                    categoriesVisible={props.categoriesVisible}
                                    categoryItemsVisible={props.categoryItemsVisible}
                                    handleCategoryClick={props.handleCategoryClick}
                                    handleCategoryItemClick={props.handleCategoryItemClick} 
                                    handleOutlinerVisible={props.handleOutlinerVisible}
                                    handleOutlinerHidden={props.handleOutlinerHidden} 
                />
                <EditorContainer actors={props.actors} />
            </div>
            <div id="gui-toggle-layout">
                <div id="gui-toggle">
                    <Toggle id="show-grid" 
                            label="Show Grid" 
                            handleChange={props.handleToggle} 
                            checked={props.showGrid} />
                    <Toggle id="show-axes" 
                            label="Show Axes" 
                            handleChange={props.handleToggle} 
                            checked={props.showAxes} />
                    <Toggle id="show-wireframe" 
                            label="Show Wireframe" 
                            handleChange={props.handleToggle} 
                            checked={props.showWireframe} />
                </div>
            </div>
            <div id="export">
                <button>Export</button>     
            </div>     
        </div>
    )
}

export default GUILayout