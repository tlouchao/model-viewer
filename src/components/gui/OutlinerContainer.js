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
            ]
        }
    ]

    /* Selection state */
    const [categoriesSelected, setCategoriesSelected] = useState([...Array(payload.length)].fill(false))
    const [itemsSelected, setItemsSelected] = useState([...Array(payload.length)].map((x, i) => 
        [...Array(payload[i].items.length).fill(false)]))
    const [prevSelected, setPrevSelected] = useState(null)
    
    /* Visibility state */
    const [categoriesVisible, setCategoriesVisible] = useState([...Array(payload.length)].fill(true))
    const [itemsVisible, setItemsVisible] = useState([...Array(payload.length)].map((x, i) => 
        [...Array(payload[i].items.length).fill(true)]))

    // Category is hidden, if all of its items are also hidden //
    useEffect(() => {
        for (let i = 0; i < itemsSelected.length; i++) {
            let isHidden = false;
            if (itemsVisible[i].every((x) => !x)){
                isHidden = true;
            }
            setCategoriesVisible(prevState => (
                [].concat(prevState.slice(0, i), 
                          !isHidden, 
                          prevState.slice(i + 1, prevState.length))
            ))
        }
    }, [itemsVisible]);

    const handleCategoryClick = (e) => {
        const idx = Number(e.target.dataset.idx)
        const selected = !categoriesSelected[idx]
        setCategoriesSelected(prevState => (
            [].concat(prevState.slice(0, idx), 
                      selected, 
                      prevState.slice(idx + 1, prevState.length))
        ))
        setItemsSelected(prevState => (
            [].concat(prevState.slice(0, idx)
                        .map(x => (x.every(y => true)) ? x : [...Array(x.length)].fill(false)),
                      [[...Array(payload[idx].items.length)].fill(selected)],
                      prevState.slice(idx + 1, prevState.length)
                        .map(x => (x.every(y => true)) ? x : [...Array(x.length)].fill(false))
        )))
        setPrevSelected(e.target)
    }

    const handleItemClick = (e) => {
        const idx_i = Number(e.target.parentElement.parentElement.dataset.idx);
        const idx_j = Number(e.target.dataset.idx);
        const selected = (prevSelected.classList.contains("outliner-category")) ? true : !itemsSelected[idx_i][idx_j]
        setCategoriesSelected(categoriesSelected.map(x => false))
        setItemsSelected(prevState => (
            [].concat(prevState.slice(0, idx_i)
                        .map((z) => [...Array(z.length)].fill(false)), 
                      [[].concat(prevState[idx_i].slice(0, idx_j).fill(false),
                                selected,
                                prevState[idx_i].slice(idx_j + 1, prevState[idx_i].length).fill(false))],
                      prevState.slice(idx_i + 1, prevState.length)
                        .map((z) => [...Array(z.length)].fill(false))
                    
        )))
        setPrevSelected(e.target)
    }

    const handleVisible = () => {
        setVisibilityHelper(true)
    }

    const handleHidden = () => {
        setVisibilityHelper(false)
    }

    const setVisibilityHelper = (boolValue) => {
        setCategoriesVisible(prevState => 
            categoriesSelected.map((x, i) => (x) ? boolValue : prevState[i])
        )
        setItemsVisible(prevState => 
            itemsSelected.map((x, i) => 
                x.map((y, j) => (y) ? boolValue : prevState[i][j])
            )
        )
    }

    return (
        <div id="outliner-container">
            <h2 className="name-container">Outliner</h2>
            <Outliner payload={payload}
                      categoriesSelected={categoriesSelected}
                      itemsSelected={itemsSelected}
                      categoriesVisible={categoriesVisible}
                      itemsVisible={itemsVisible}
                      handleCategoryClick={handleCategoryClick}
                      handleItemClick={handleItemClick} 
            />
            <div className="button-group">
                <button onClick={handleVisible}>Show</button>
                <button onClick={handleHidden}>Hide</button>
            </div>
        </div>
    )
}

export default OutlinerContainer