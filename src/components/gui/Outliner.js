import React, { useEffect, useState } from "react"

const Outliner = (props) => {
    const ws = "  ";
    const payload = [
        {
            categoryId: "outliner-category-primitives",
            categoryName: "Primitives", 
            items: [
                {
                    id: 1,
                    name: "Cube",
                },
                {
                    id: 2,
                    name: "Cube_01",
                },
                {
                    id: 3,
                    name: "Cube_02",
                },
                {
                    id: 4,
                    name: "Cube_03",
                },
                {
                    id: 5,
                    name: "Cylinder",
                },
            ]
        },
        {
            categoryId: "outliner-category-lights",
            categoryName: "Lights",
            items: [
                {
                    id: 6,
                    name: "Ambient",
                },
                {
                    id: 7,
                    name: "Ambient_01",
                },
                {
                    id: 8,
                    name: "Point",
                },
                {
                    id: 9,
                    name: "Point_01",
                },
                {
                    id: 10,
                    name: "Point_02",
                },
            ]
        }
    ]

    const [categorySelected, setCategorySelected] = useState([...Array(payload.length)].fill(false))
    const [itemsSelected, setItemsSelected] = useState([...Array(payload.length)].map((x, i) => 
        [...Array(payload[i].items.length).fill(false)]))

    useEffect(() => {
        for (let i = 0; i < itemsSelected.length; i++) {
            let selected = false;
            if (itemsSelected[i].every((x) => x)){
                selected = true;
            }
            setCategorySelected(prevState => (
                [].concat(prevState.slice(0, i), 
                          selected, 
                          prevState.slice(i + 1, prevState.length))
            ))
        }
    }, [itemsSelected]);

    const handleCategoryClick = (e) => {
        const idx = Number(e.target.dataset.idx)
        const selected = !categorySelected[idx]
        setCategorySelected(prevState => (
            [].concat(prevState.slice(0, idx), 
                      selected, 
                      prevState.slice(idx + 1, prevState.length))
        ))
        setItemsSelected(prevState => (
            [].concat(prevState.slice(0, idx), 
                      [[...Array(payload[idx].items.length)].fill(selected)],
                      prevState.slice(idx + 1, prevState.length))
        ))
    }

    const handleItemClick = (e) => {
        const idx_i = Number(e.target.parentElement.parentElement.dataset.idx);
        const idx_j = Number(e.target.dataset.idx);
        const selected = !itemsSelected[idx_i][idx_j]
        setItemsSelected(prevState => (
            [].concat(prevState.slice(0, idx_i), 
                      [[].concat(prevState[idx_i].slice(0, idx_j),
                                selected,
                                prevState[idx_i].slice(idx_j + 1, prevState[idx_i].length))],
                      prevState.slice(idx_i + 1, prevState.length))
        ))
    }
    
    return (
        <div id="outliner">
            {payload.map((x, i) => 
                <div key={i}
                     data-idx={i}>
                    <p  key={i}
                        data-idx={i}
                        className={`outliner-category outliner-item 
                                   ${(categorySelected[i]) ? "outliner-category-selected" : ""}`
                                  }
                        id={x.categoryId}
                        data-id={x.categoryId}
                        data-name={x.categoryName}
                        onClick={handleCategoryClick}>
                        {x.categoryName}
                    </p>
                    <ul>
                        {x.items.map((y, j) => 
                            <li key={j}
                                data-idx={j} 
                                data-id={y.id}
                                data-name={y.name}
                                className={`outliner-item 
                                            ${(itemsSelected[i][j]) ? "outliner-item-selected" : ""}`
                                          }
                                onClick={handleItemClick}>
                                {ws + y.name}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Outliner