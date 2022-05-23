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
                {props.categoryTypes.map(x => 
                    <DropdownContainer key={`add ${x}`} name={`add ${x}`}
                        categoryType={x}
                        handleClick={props.handleDropdownClick} 
                        optionValues={props.actorTypes[x]} 
                        optionNames={(x != "light") ?
                                      props.actorTypes[x].map(y => y.charAt(0).toUpperCase() + y.slice(1)) :
                                      props.actorTypes[x].map(y => y.charAt(0).toUpperCase() + y.slice(1) + " Light")
                                    }
                    />
                )}
            </div>
            <div id="gui-browse">
                <OutlinerContainer  actors={props.actors}
                                    actorIds={props.actorIds}
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
                                 actorIds={props.actorIds}
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
                <button disabled>Export</button>     
            </div>     
        </div>
    )
}

export default GUILayout