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
                        id={`outliner-category-${x}`}
                        data-id={`outliner-category-${x}`}
                        data-categorytype={x}
                        onClick={props.handleCategoryClick}>
                        {x}
                    </p>
                    <ul>
                        {props.actors[x].map((y, j) => 
                            <li key={j}
                                data-idx={j}
                                data-id={x.id}
                                data-type={y.type}
                                data-categorytype={y.categoryType}
                                className={`outliner-item ${(props.categoryItemsSelected[x][j]) ? "outliner-item-selected" : ""} ${(props.categoryItemsVisible[x][j]) ? "" : "outliner-hidden"}`}
                                onClick={props.handleCategoryItemClick}>
                                {indent + y.name}
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