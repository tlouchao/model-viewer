import React, { useEffect, useState } from "react"
import { actorColorHelper,
         categoryMapHelper,
         categoryCapacity,
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
    const [categoriesVisible, setCategoriesVisible] = useState(categoryMapHelper(true))
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
            id: getActorId(categoryType + 's'),
            name: getActorName(actorType, categoryType + 's'),
            color: (color) ? color : actorColorHelper(),
            actorType: actorType,
            categoryType: categoryType,
            isSelected: categoriesSelected[categoryType + 's'],
            isVisible: categoriesVisible[categoryType + 's'],
        }
        return actor
    }

    const getActorId = (categoryType) => {
        const actorId = internalId
        setActorIds(prevState => ({
            ...prevState,
            [categoryType]: prevState[categoryType].concat(internalId)
        }))
        setInternalId(prevState => prevState + 1)
        return actorId
    }

    const getActorName = (actorType, categoryType) => {

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

    /*------------------------------------------------------------------------------------------*/

    /* Event listeners */

    const handleDropdownClick = (e) => {
        const actorType = e.target.value
        if (actorType) {
            const categoryType = e.target.dataset.categorytype
            if (Object.keys(actors[categoryType]).length < categoryCapacity[categoryType]){
                setActors(prevActors => ({
                    ...prevActors,
                    [categoryType]: {
                        ...prevActors[categoryType],
                    [internalId]: buildActor(actorType)
                    }
                }))
            }
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

        // build new state for actors
        let nextActors = {...actors}
        Object.keys(nextActors).forEach(x => {
            let itemSelected
            if (x === categoryType) {
                // copy currently selected category state
                itemSelected = selected
            } else {
                // preserve other category item states
                itemSelected = categoriesSelected[x]
            }
            Object.keys(nextActors[x]).forEach(y => nextActors[x][y].isSelected = itemSelected)
        })
        setActors(nextActors)

        // set previously selected target
        setCurrentSelected(e.target)     
    }

    const handleCategoryItemClick = (e) => {
        const id = e.target.dataset.id
        const categoryType = e.target.dataset.categorytype + 's'

        // if previously selected HTML element is a category, always select the item
        let selected
        if (currentSelected && !currentSelected.hasAttribute("data-actortype")) {
            selected = true
        } else {
            selected = !actors[categoryType][id].isSelected
        }

        // reset category state
        setCategoriesSelected(categoryMapHelper(false))

        // build new state for actors
        let nextActors = {...actors}
        Object.keys(nextActors).forEach(x => {
            Object.keys(nextActors[x]).forEach(y => {
                nextActors[x][y].isSelected = false
            })
        })

        // change into object for setState function
        nextActors[categoryType][id].isSelected = selected

        // set the new state
        setActors(nextActors)

        // set previously selected target
        setCurrentSelected(e.target)
    }

    const handleSort = () => {
        console.log("sort")
    }

    const handleVisible = () => {
        handleVisibilityHelper(true)
    }

    const handleHidden = () => {
        handleVisibilityHelper(false)
    }

    const handleVisibilityHelper = (boolValue) => {
        let nextActors = {...actors}
        let nextVisible = []
        Object.keys(nextActors).forEach(x => {
            nextVisible.push([x, (categoriesSelected[x]) ? boolValue : categoriesVisible[x]])
            Object.keys(nextActors[x]).forEach(y => 
                nextActors[x][y].isVisible = 
                    (nextActors[x][y].isSelected) ? boolValue : nextActors[x][y].isVisible
            )
        })
        nextVisible = Object.fromEntries(nextVisible)
        setCategoriesVisible(nextVisible)
        setActors(nextActors)
    }

    const handleDelete = () => {
        if (currentSelected && currentSelected.hasAttribute("data-actortype")) {

            const id = currentSelected.dataset.id
            const categoryType = currentSelected.dataset.categorytype + 's'

            // delete actor
            let nextActors = {...actors}
            delete nextActors[categoryType][id]
            setActors(nextActors)

            // delete id from list of ids
            const deleteIdx = actorIds[categoryType].findIndex((x) => x === Number(id))
            setActorIds(prevState => ({
                ...prevState,
                [categoryType]: [].concat(prevState[categoryType].slice(0, deleteIdx), 
                                          prevState[categoryType].slice(deleteIdx + 1, 
                                            prevState[categoryType].length))
            }))

            // no target currently selected
            setCurrentSelected(null)
        }
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
                            categoryCapacity={categoryCapacity}
                            categoriesSelected={categoriesSelected}
                            currentSelected={currentSelected}
                            categoriesVisible={categoriesVisible}
                            handleDropdownClick={handleDropdownClick} 
                            handleCategoryClick={handleCategoryClick} 
                            handleCategoryItemClick={handleCategoryItemClick} 
                            handleOutlinerSort={handleSort}
                            handleOutlinerVisible={handleVisible}
                            handleOutlinerHidden={handleHidden}
                            handleEditorDelete={handleDelete}
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