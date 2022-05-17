import React, { useEffect, useState } from "react"
import Outliner from "./Outliner"

const OutlinerContainer = (props) => {
/*
    const [categoriesSelected, setCategoriesSelected] = useState([...Array(Object.keys(props.actors).length)].fill(false))
    const [itemsSelected, setItemsSelected] = useState([...Array(Object.keys(props.actors).length)].map((x, i) => 
        [...Array(props.actors[Object.keys(props.actors)[i]].length)].fill(false)))
    const [prevSelected, setPrevSelected] = useState(null)
    
    const [categoriesVisible, setCategoriesVisible] = useState([...Array(Object.keys(props.actors).length)].fill(true))
    const [itemsVisible, setItemsVisible] = useState(props.actors[[Object.keys(props.actors)][1]])
    // Category is hidden, if all of its items are also hidden //
    useEffect(() => {
        console.log("Items visible: " + itemsVisible)
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
            [].concat(prevState.slice(0, idx).fill(false), 
                      selected, 
                      prevState.slice(idx + 1, prevState.length).fill(false))
        ))
        setItemsSelected(prevState => (
            [].concat(prevState.slice(0, idx)
                        .map(x => [...Array(x.length)].fill(false)),
                      [[...Array(payload[idx].items.length)].fill(selected)],
                      prevState.slice(idx + 1, prevState.length)
                        .map(x => [...Array(x.length)].fill(false))
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
    */
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