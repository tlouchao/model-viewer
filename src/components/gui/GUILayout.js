import React from "react"
import PropTypes from "prop-types"
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
                        handleGUIBlur={props.handleGUIBlur}
                        optionValues={props.actorTypes[x]} 
                        optionNames={(x != "lights") ?
                                      props.actorTypes[x].map(y => y.charAt(0).toUpperCase() + y.slice(1)) :
                                      props.actorTypes[x].map(y => y.charAt(0).toUpperCase() + y.slice(1) + " Light")
                                    }
                    />
                )}
            </div>
            <div id="gui-browse">
                <OutlinerContainer  actors={props.actors}
                                    actorIds={props.actorIds}
                                    categoryCapacity={props.categoryCapacity}
                                    categoriesSelected={props.categoriesSelected}
                                    categoriesVisible={props.categoriesVisible}
                                    handleCategoryClick={props.handleCategoryClick}
                                    handleCategoryItemClick={props.handleCategoryItemClick}
                                    handleOutlinerSort={props.handleOutlinerSort} 
                                    handleOutlinerVisible={props.handleOutlinerVisible}
                                    handleOutlinerHidden={props.handleOutlinerHidden}
                                    handleGUIBlur={props.handleGUIBlur}
                />
                <EditorContainer actors={props.actors}
                                 currentSelected={props.currentSelected}
                                 handleEditorSave={props.handleEditorSave}
                                 handleEditorDelete={props.handleEditorDelete}
                                 handleGUIBlur={props.handleGUIBlur}
                 />
            </div>
            <div id="gui-toggle-layout">
                <div id="gui-toggle">
                    <Toggle id="show-grid" 
                            label="Show Grid" 
                            handleChange={props.handleToggle}
                            handleGUIBlur={props.handleGUIBlur}
                            checked={props.showGrid} />
                    <Toggle id="show-axes" 
                            label="Show Axes" 
                            handleChange={props.handleToggle}
                            handleGUIBlur={props.handleGUIBlur}
                            checked={props.showAxes} />
                    <Toggle id="show-wireframe" 
                            label="Show Wireframe" 
                            handleChange={props.handleToggle}
                            handleGUIBlur={props.handleGUIBlur}
                            checked={props.showWireframe} />
                </div>
            </div>
            <div id="export">
                <button disabled>Export</button>     
            </div>     
        </div>
    )
}

GUILayout.propTypes = {
    currentSelected: PropTypes.instanceOf(Element) || null,
    actors: PropTypes.object.isRequired,
    actorIds: PropTypes.object.isRequired,
    categoryTypes: PropTypes.array.isRequired,
    actorTypes: PropTypes.object.isRequired,
    categoryCapacity: PropTypes.object.isRequired,
    categoriesSelected: PropTypes.object.isRequired,
    categoriesVisible: PropTypes.object.isRequired,
    handleDropdownClick: PropTypes.func.isRequired,
    handleCategoryClick: PropTypes.func.isRequired,
    handleCategoryItemClick: PropTypes.func.isRequired,
    handleOutlinerSort: PropTypes.func.isRequired,
    handleOutlinerVisible: PropTypes.func.isRequired,
    handleOutlinerHidden: PropTypes.func.isRequired,
    handleEditorSave: PropTypes.func.isRequired,
    handleEditorDelete: PropTypes.func.isRequired,
    handleGUIBlur: PropTypes.func.isRequired,
    showGrid: PropTypes.bool.isRequired,
    showAxes: PropTypes.bool.isRequired,
    showWireframe: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
}

export default GUILayout