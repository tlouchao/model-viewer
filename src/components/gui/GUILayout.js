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
                {props.categoryTypes.map((x, i) => 
                    <DropdownContainer key={i} name={`add ${props.categoryTypes[i]}s`}
                        categoryType={props.categoryTypes[i]}
                        handleClick={props.handleDropdownClick} 
                        optionValues={props.actorTypes[i]} 
                        optionNames={(x != "light") ?
                                      props.actorTypes[i].map(x => x.charAt(0).toUpperCase() + x.slice(1)) :
                                      props.actorTypes[i].map(x => x.charAt(0).toUpperCase() + x.slice(1) + " Light")
                                    }
                    />
                )}
            </div>
            <div id="gui-browse">
                <OutlinerContainer  actors={props.actors}
                                    categoriesSelected={props.categoriesSelected}
                                    categoryItemsSelected={props.categoryItemsSelected}
                                    categoriesVisible={props.categoriesVisible}
                                    categoryItemsVisible={props.categoryItemsVisible}
                                    handleCategoryClick={props.handleCategoryClick}
                                    handleCategoryItemClick={props.handleCategoryItemClick} 
                                    handleOutlinerVisible={props.handleOutlinerVisible}
                                    handleOutlinerHidden={props.handleOutlinerHidden} 
                />
                <EditorContainer actors={props.actors}
                                 currentSelected={props.currentSelected} />
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