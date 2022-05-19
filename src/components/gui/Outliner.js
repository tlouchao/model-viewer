import React from "react"

const Outliner = (props) => {

    const indent = "  "

    return (
        <div id="outliner">
            <div>
            {Object.keys(props.actors).map((x, i) => 
                <div key={i}
                     data-idx={i}>
                    <p  key={i}
                        data-idx={i}
                        className={`outliner-category ${(props.categoriesSelected[x]) ? "outliner-category-selected" : ""} ${(props.categoriesVisible[x]) ? "" : "outliner-hidden"}`}
                        data-categorytype={x}
                        data-elemtype="category"
                        onClick={props.handleCategoryClick}>
                        {x}
                    </p>
                    <ul>
                        {props.actors[x].map((y, j) => 
                            <li key={j}
                                data-id={y.id}
                                data-idx={j}
                                data-actortype={y.actorType}
                                data-categorytype={y.categoryType}
                                data-elemtype="item"
                                className={`outliner-item ${(props.categoryItemsSelected[x][j]) ? "outliner-item-selected" : ""} ${(props.categoryItemsVisible[x][j]) ? "" : "outliner-hidden"}`}
                                onClick={props.handleCategoryItemClick}>
                                <span>{indent}</span>{y.name}
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