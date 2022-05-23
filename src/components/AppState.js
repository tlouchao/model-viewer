import React, { useEffect, useState } from "react"
import { actorColorHelper,
         categoryMapHelper,
         categoryTypes, 
         actorTypes, 
         actorClasses,
         initialActorNames } from "./helpers"
import GUILayout from "./gui/GUILayout"
import ThreeContainer from "./ThreeContainer"

const AppState = () => {

    /*------------------------------------------------------------------------------------------*/
    
    /* App state */
    const [isAppStateInitialized, setIsAppStateInitialized] = useState(false)

    // auto-increment ID
    const [actorNames, setActorNames] = useState(initialActorNames)
    const [internalId, setInternalId] = useState(1)
    const [actorIds, setActorIds] = useState(categoryMapHelper([]))
    const [actors, setActors] = useState(categoryMapHelper({}))

    const [categoriesSelected, setCategoriesSelected] = useState(categoryMapHelper(false))
    const [categoryItemsSelected, setCategoryItemsSelected] = useState(categoryMapHelper([]))
    const [categoriesVisible, setCategoriesVisible] = useState(categoryMapHelper(true))
    const [categoryItemsVisible, setCategoryItemsVisible] = useState(categoryMapHelper([]))
    const [currentSelected, setCurrentSelected] = useState(null)

    const [showGrid, setShowGrid] = useState(true)
    const [showAxes, setShowAxes] = useState(true)
    const [showWireframe, setShowWireframe] = useState(false)

    /*------------------------------------------------------------------------------------------*/

    /* Side Effects */

    // Add one box to the scene
    useEffect(() => {
        const actorType = "box"
        if (!actorClasses[actorType]){
            throw new TypeError(actorType + " is not a valid actor type")
        }    
        setActors(prevActors => ({
            ...prevActors,
            primitives: {
                ...prevActors.primitives,
                [internalId]: buildActor(actorType)
            }
        }))
        setCategoryItemsSelected(prevState => ({
            ...prevState,
            primitives: prevState.primitives.concat(false)
        }))
        setCategoryItemsVisible(prevState => ({
            ...prevState,
            primitives: prevState.primitives.concat(true)
        }))
        setIsAppStateInitialized(true)
    }, [])

    // Debug log after initialization
    useEffect(() => {
        if (isAppStateInitialized){
        }
    }, [isAppStateInitialized, actors])

    /*------------------------------------------------------------------------------------------*/

    /* Helpers */

    const buildActor = (actorType, color=undefined) => {

        // get static property of parent
        const categoryType = Object.getPrototypeOf(actorClasses[actorType]).categoryType

        let actor = JSON.parse(JSON.stringify(new actorClasses[actorType]))

        actor = {
            ...actor,
            id: getActorId(categoryType),
            name: buildActorName(actorType),
            color: (color) ? color : actorColorHelper(),
            actorType: actorType,
            categoryType: categoryType,
            selected: getSelected(categoryType),
            visible: getVisible(categoryType),
        }
        return actor
    }

    const buildActorName = (actorType) => {

        // get static property of parent
        const categoryType = Object.getPrototypeOf(actorClasses[actorType]).categoryType + 's'

        let num = actorNames[categoryType][actorType]

        setActorNames(prevActorNames => ({
            ...prevActorNames,
            [categoryType]: {
                ...prevActorNames[categoryType],
                [actorType]: prevActorNames[categoryType][actorType] + 1
            }
        }))

        if (num === 0) {
            return actorType 
        } else {
            return actorType + "_" + String(actorNames[categoryType][actorType]).padStart(2, "0")
        }
    }

    const getActorId = (categoryType) => {
        const actorId = internalId
        setActorIds(prevState => ({
            ...prevState,
            [categoryType + 's']: prevState[categoryType + 's'].concat(internalId)
        }))
        setInternalId(prevState => prevState + 1)
        return actorId
    }

    const getSelected = (categoryType) => {
        if (currentSelected && currentSelected.dataset.elemtype === "category"){
            return categoriesSelected[categoryType + 's']
        } else {
            return false
        }
    }

    const getVisible = (categoryType) => {
        if (currentSelected && currentSelected.dataset.elemtype === "category"){
            return categoriesVisible[categoryType + 's']
        } else {
            return true
        }
    }

    /*------------------------------------------------------------------------------------------*/

    /* Event listeners */

    const handleDropdownClick = (e) => {
        const actorType = e.target.value
        if (actorType) {
            const categoryType = e.target.dataset.categorytype
            setActors(prevActors => ({
                ...prevActors,
                [categoryType]: {
                    ...prevActors[categoryType],
                   [internalId]: buildActor(actorType)
                }
            }))
            setCategoryItemsSelected(prevState => ({
                ...prevState,
                [categoryType]: prevState[categoryType].concat(categoriesSelected[categoryType])
            }))
            setCategoryItemsVisible(prevState => ({
                ...prevState,
                [categoryType]: prevState[categoryType].concat(categoriesVisible[categoryType])
            }))
        } else {
            console.warn("Did not add dropdown value")
        }
    }

    const handleCategoryClick = (e) => {
        const categoryType = e.target.dataset.categorytype
        const selected = !categoriesSelected[categoryType]
        setCategoriesSelected(prevState => ({
            ...prevState,
            [categoryType]: selected,
        }))

        // build new state for category items
        let nextState = []
        const keys = Object.keys(categoryItemsSelected)
        keys.map(x => {
            let itemSelected
            if (x === categoryType) {
                // copy currently selected category state
                itemSelected = selected
            } else {
                // preserve other category item states
                itemSelected = categoriesSelected[x]
            }
            nextState.push([x, [...Array(categoryItemsSelected[x].length)].fill(itemSelected)])
        })

        // change into object for setState function
        nextState = Object.fromEntries(nextState)
        setCategoryItemsSelected(nextState)

        // set previously selected target
        setCurrentSelected(e.target)     
    }

    const handleCategoryItemClick = (e) => {
        const idx = e.target.dataset.idx // todo
        const categoryType = e.target.dataset.categorytype

        // if previously selected HTML element is a category, always select the item
        let selected
        if (currentSelected && currentSelected.dataset.elemtype === "category") {
            selected = true
        } else {
            selected = !categoryItemsSelected[categoryType + "s"][idx]
        }

        // reset category state
        setCategoriesSelected(categoryMapHelper(false))

        // build new state for category items
        let nextState = []
        const keys = Object.keys(categoryItemsSelected)
        keys.map(x => 
            nextState.push([x, [...Array(categoryItemsSelected[x].length)].fill(false)])
        )

        // change into object for setState function
        nextState = Object.fromEntries(nextState)
        nextState[categoryType + "s"][idx] = selected

        // set the new state
        setCategoryItemsSelected(nextState)

        // set previously selected target
        setCurrentSelected(e.target)
    }

    const handleVisible = () => {
        handleVisibilityHelper(true)
    }

    const handleHidden = () => {
        handleVisibilityHelper(false)
    }

    const handleVisibilityHelper = (boolValue) => {
        const keys = Object.keys(categoriesSelected)
        let nextVisibleState = []
        let nextVisibleItemsState = []
        keys.map((x) => {
            nextVisibleState.push([x, categoriesSelected[x] ? boolValue : categoriesVisible[x]])
            nextVisibleItemsState.push([x, [...Array(categoryItemsSelected[x].length)].map((y, j) => 
                (categoryItemsSelected[x][j]) ? boolValue : categoryItemsVisible[x][j]
            )])
        })
        setCategoriesVisible(Object.fromEntries(nextVisibleState))
        setCategoryItemsVisible(Object.fromEntries(nextVisibleItemsState))
    }

    const handleToggle = (e) => {
        switch (e.target.id) {
            case "show-grid":
                setShowGrid(e.target.checked)
                break
            case "show-axes":
                setShowAxes(e.target.checked)
                break
            case "show-wireframe":
                setShowWireframe(e.target.checked)
                break
        }
    }

    /*------------------------------------------------------------------------------------------*/

    return (
        <div id="app-state">
            <div id="layout">
                <GUILayout  actors={actors}
                            actorIds={actorIds}
                            categoryTypes={categoryTypes}
                            actorTypes={actorTypes}
                            categoriesSelected={categoriesSelected}
                            categoryItemsSelected={categoryItemsSelected}
                            currentSelected={currentSelected}
                            categoriesVisible={categoriesVisible}
                            categoryItemsVisible={categoryItemsVisible}
                            handleDropdownClick={handleDropdownClick} 
                            handleCategoryClick={handleCategoryClick} 
                            handleCategoryItemClick={handleCategoryItemClick} 
                            handleOutlinerVisible={handleVisible}
                            handleOutlinerHidden={handleHidden}
                            showGrid={showGrid}
                            showAxes={showAxes}
                            showWireframe={showWireframe}
                            handleToggle={handleToggle}
                />
                <ThreeContainer actors={actors}
                                showGrid={showGrid}
                                showAxes={showAxes}
                                showWireframe={showWireframe}

                />
            </div>
        </div>
    )
}

export default AppState