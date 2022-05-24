import React from "react"
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
            />
            <div className="button-group">
                <button onClick={props.handleOutlinerSort}>Sort</button>
                <button onClick={props.handleOutlinerVisible}>Show</button>
                <button onClick={props.handleOutlinerHidden}>Hide</button>
            </div>
        </div>
    )
}

export default OutlinerContainer