import React, { useEffect, useState } from "react"
import Outliner from "./Outliner"

const OutlinerContainer = (props) => {
    return (
        <div id="outliner-container">
            <h2 className="name-container">Outliner</h2>
            <Outliner actors={props.actors}
                      categoryTypes={props.categoryTypes}
                      categoriesSelected={props.categoriesSelected}
                      categoryItemsSelected={props.categoryItemsSelected}
                      prevCategoryItemSelected={props.prevCategoryItemSelected}
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