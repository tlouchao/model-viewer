import React, { useEffect, useState } from "react"
import Outliner from "./Outliner"

const OutlinerContainer = () => {
    const pre = "  ";
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
                {
                    id: 11,
                    name: "Point_03",
                },
                {
                    id: 12,
                    name: "Point_04",
                },
            ]
        }
    ]

    const [categoriesSelected, setCategoriesSelected] = useState([...Array(payload.length)].fill(false))
    const [itemsSelected, setItemsSelected] = useState([...Array(payload.length)].map((x, i) => 
        [...Array(payload[i].items.length).fill(false)]))
    const [categoriesHidden, setCategoriesHidden] = useState([...Array(payload.length)].fill(false))
    const [itemsHidden, setItemsHidden] = useState([...Array(payload.length)].map((x, i) => 
        [...Array(payload[i].items.length).fill(false)]))

    useEffect(() => {
        for (let i = 0; i < itemsSelected.length; i++) {
            let selected = false;
            if (itemsSelected[i].every((x) => x)){
                selected = true;
            }
            setCategoriesSelected(prevState => (
                [].concat(prevState.slice(0, i), 
                          selected, 
                          prevState.slice(i + 1, prevState.length))
            ))
        }
    }, [itemsSelected]);

    const handleCategoryClick = (e) => {
        const idx = Number(e.target.dataset.idx)
        const selected = !categoriesSelected[idx]
        setCategoriesSelected(prevState => (
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
        <div id="outliner-container">
            <h2 className="name-container">Outliner</h2>
            <Outliner payload={payload}
                      pre={pre}
                      categoriesSelected={categoriesSelected}
                      itemsSelected={itemsSelected}
                      categoriesHidden={categoriesHidden}
                      itemsHidden={itemsHidden}
                      handleCategoryClick={handleCategoryClick}
                      handleItemClick={handleItemClick} />
            <div className="button-group">
                <button>Show</button>
                <button>Hide</button>
            </div>
        </div>
    )
}

export default OutlinerContainer