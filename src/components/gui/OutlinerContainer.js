import React from "react"
import PropTypes from "prop-types"
import Outliner from "./Outliner"

const OutlinerContainer = (props) => {
    return (
        <div id="outliner-container">
            <h2 className="name-container">Outliner</h2>
            <Outliner actors={props.actors}
                      actorIds={props.actorIds}
                      categoryCapacity={props.categoryCapacity}
                      categoriesSelected={props.categoriesSelected}
                      categoriesVisible={props.categoriesVisible}
                      handleCategoryClick={props.handleCategoryClick}
                      handleCategoryItemClick={props.handleCategoryItemClick}
                      handleGUIBlur={props.handleGUIBlur}
            />
            <div className="button-group">
                <button onBlur={props.handleGUIBlur} onClick={props.handleOutlinerSort}>Sort</button>
                <button onBlur={props.handleGUIBlur} onClick={props.handleOutlinerVisible}>Show</button>
                <button onBlur={props.handleGUIBlur} onClick={props.handleOutlinerHidden}>Hide</button>
            </div>
        </div>
    )
}

OutlinerContainer.propTypes = {
    actors: PropTypes.object.isRequired,
    actorIds: PropTypes.object.isRequired,
    categoryCapacity: PropTypes.object.isRequired,
    categoriesSelected: PropTypes.object.isRequired,
    categoriesVisible: PropTypes.object.isRequired,
    handleCategoryClick: PropTypes.func.isRequired,
    handleCategoryItemClick: PropTypes.func.isRequired,
    handleOutlinerSort: PropTypes.func.isRequired,
    handleOutlinerVisible: PropTypes.func.isRequired,
    handleOutlinerHidden: PropTypes.func.isRequired,
    handleGUIBlur: PropTypes.func.isRequired,
}

export default OutlinerContainer