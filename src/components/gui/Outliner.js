import React from "react"

const Outliner = (props) => {

    const indent = "  "

    return (
        <div id="outliner">
            <div>
            {Object.keys(props.actors).map((x, i) => 
                <div key={i}>
                    <p  key={i}
                        className={`outliner-category ${(props.categoriesSelected[x]) ? "outliner-category-selected" : ""} ${(props.categoriesVisible[x]) ? "" : "outliner-hidden"}`}
                        data-categorytype={x}
                        data-elemtype="category"
                        onClick={props.handleCategoryClick}>
                        {x}
                    </p>
                    <ul>
                        {props.actorIds[x].map((y, j) => 
                            <li key={j}
                                data-id={props.actors[x][y].id}
                                data-actortype={props.actors[x][y].actorType}
                                data-categorytype={props.actors[x][y].categoryType}
                                data-elemtype="item"
                                className={`outliner-item ${(props.categoryItemsSelected[x][j]) ? "outliner-item-selected" : ""} ${(props.categoryItemsVisible[x][j]) ? "" : "outliner-hidden"}`}
                                onClick={props.handleCategoryItemClick}>
                                <span>{indent}</span>{props.actors[x][y].name}
                            </li>
                        )}
                    </ul>
                </div>
            )}
            </div>
        </div>
    )
}

export default Outliner