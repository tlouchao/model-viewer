import React from "react"
import PropTypes from "prop-types"
import DropdownContainer from "./DropdownContainer"
import OutlinerContainer from "./OutlinerContainer"
import EditorContainer from "./EditorContainer"
import Toggle from "./Toggle"

const GUILayout = (props) => {

    const toggleOptionsEntries = Array.from(props.toggleOptions.entries())

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
                                      props.actorTypes[x] :
                                      props.actorTypes[x].map(y => y + " light")
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
            <div id="gui-toggle">
                <div id="toggle-container">
                    <div className="toggle-columns">
                    {[...Array(2)].map((_, i) => 
                        <div key={i} className="toggle-flex">
                            {[...Array(2)].map((_, j) =>
                            <Toggle key={(2 * i) + j}
                                value={toggleOptionsEntries[(2 * i) + j][0]}
                                id={`show-${toggleOptionsEntries[(2 * i) + j][0]}`}
                                label={`show ${toggleOptionsEntries[(2 * i) + j][0]}`}
                                handleChange={props.handleToggle}
                                handleGUIBlur={props.handleGUIBlur}
                                checked={toggleOptionsEntries[(2 * i) + j][1]}
                            />
                            )} 
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div id="export">
                <button id="reset-camera-button">Reset Camera</button>
                <button id="export-button">Export Scene</button>     
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
    toggleOptions: PropTypes.object.isRequired,

    handleDropdownClick: PropTypes.func.isRequired,
    handleCategoryClick: PropTypes.func.isRequired,
    handleCategoryItemClick: PropTypes.func.isRequired,
    handleOutlinerSort: PropTypes.func.isRequired,
    handleOutlinerVisible: PropTypes.func.isRequired,
    handleOutlinerHidden: PropTypes.func.isRequired,
    handleEditorSave: PropTypes.func.isRequired,
    handleEditorDelete: PropTypes.func.isRequired,
    handleGUIBlur: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
}

export default GUILayout