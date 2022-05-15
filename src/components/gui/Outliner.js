import React from "react"

const Outliner = (props) => {
    
    return (
        <div id="outliner">
            {props.payload.map((x, i) => 
                <div key={i}
                     data-idx={i}>
                    <p  key={i}
                        data-idx={i}
                        className={`outliner-category outliner-item 
                                   ${(props.categoriesSelected[i]) ? "outliner-category-selected" : ""}`
                                  }
                        id={x.categoryId}
                        data-id={x.categoryId}
                        data-name={x.categoryName}
                        onClick={props.handleCategoryClick}>
                        {x.categoryName}
                    </p>
                    <ul>
                        {x.items.map((y, j) => 
                            <li key={j}
                                data-idx={j} 
                                data-id={y.id}
                                data-name={y.name}
                                className={`outliner-item 
                                            ${(props.itemsSelected[i][j]) ? "outliner-item-selected" : ""}`
                                          }
                                onClick={props.handleItemClick}>
                                {props.pre + y.name}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Outliner