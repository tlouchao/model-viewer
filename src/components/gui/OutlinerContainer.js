import React from "react"
import Outliner from "./Outliner"

const OutlinerContainer = (props) => {
    return (
        <div id="outliner-container">
            <h2 className="name-container">Outliner</h2>
            <Outliner actors={props.actors}
                      actorIds={props.actorIds}
                      actorTypes={props.actorTypes}
                      categoryTypes={props.categoryTypes}
                      categoriesSelected={props.categoriesSelected}
                      categoryItemsSelected={props.categoryItemsSelected}
                      categoriesVisible={props.categoriesVisible}
                      categoryItemsVisible={props.categoryItemsVisible}
                      handleCategoryClick={props.handleCategoryClick}
                      handleCategoryItemClick={props.handleCategoryItemClick} 
            />
            <div className="button-group">
                <button onClick={props.handleOutlinerVisible}>Show</button>
                <button onClick={props.handleOutlinerHidden}>Hide</button>
            </div>
        </div>
    )
}

export default OutlinerContainer