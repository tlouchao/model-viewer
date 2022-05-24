import React from "react"
import PropTypes from "prop-types"

const Outliner = (props) => {

    const indent = "  "

    const spanHelper = (x, val) => {
        if (Object.keys(props.actors[x]).length < Number(props.categoryCapacity[x])) {
            return (<span onClick={handleSpanClick} className="category-max"></span>)
        } else {
            return (<span onClick={handleSpanClick} className="category-max">{val}</span>)
        }
    }

    const handleSpanClick = (e) => {
        e.stopPropagation()
        e.target.parentElement.click()
    }

    return (
        <div id="outliner">
            <div>
            {Object.keys(props.actors).map((x, i) => 
                <div key={i}>
                    <p  key={i}
                        className={`outliner-category ${(props.categoriesSelected[x]) ? "outliner-category-selected" : ""} ${(props.categoriesVisible[x]) ? "" : "outliner-hidden"}`}
                        data-categorytype={x}
                        onClick={props.handleCategoryClick}>
                        {x}
                        {spanHelper(x, " (Max: ")}
                        {spanHelper(x, props.categoryCapacity[x])}
                        {spanHelper(x, ")")}
                    </p>
                    <ul>
                        {props.actorIds[x].map(y => 
                            <li key={y}
                                data-id={props.actors[x][y].id}
                                data-actortype={props.actors[x][y].actorType}
                                data-categorytype={props.actors[x][y].categoryType}
                                className={`outliner-item ${(props.actors[x][y].isSelected) ? "outliner-item-selected" : ""} ${(props.actors[x][y].isVisible) ? "" : "outliner-hidden"}`}
                                onClick={props.handleCategoryItemClick}>
                                <span>{indent}</span>{props.actors[x][y].actorName}
                            </li>
                        )}
                    </ul>
                </div>
            )}
            </div>
        </div>
    )
}

Outliner.propTypes = {
    actors: PropTypes.object.isRequired,
    actorIds: PropTypes.object.isRequired,
    categoryCapacity: PropTypes.object.isRequired,
    categoriesSelected: PropTypes.object.isRequired,
    categoriesVisible: PropTypes.object.isRequired,
    handleCategoryClick: PropTypes.func.isRequired,
    handleCategoryItemClick: PropTypes.func.isRequired,
}

export default Outliner