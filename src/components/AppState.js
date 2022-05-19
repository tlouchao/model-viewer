import React, { useEffect, useState } from "react"
import GUILayout from "./gui/GUILayout"
import ThreeContainer from "./ThreeContainer"
import * as ACTORS from "./../actors/actors"
import * as CONSTS from "./../constants/constants"

const AppState = () => {

    /*------------------------------------------------------------------------------------------*/

    /* Temporaries */

    const _primsClasses = Object.values(ACTORS).filter((x) => ACTORS.Primitive.isPrototypeOf(x))
    const _primsClassMap = [...Array(_primsClasses.length)].map((x, i) => 
        [_primsClasses[i].name.split(/(?=[A-Z])/)[0].toLowerCase(), _primsClasses[i]])
        
    const _lightsClasses = Object.values(ACTORS).filter((x) => ACTORS.Light.isPrototypeOf(x))
    const _lightsClassMap = [...Array(_lightsClasses.length)].map((x, i) => 
        [_lightsClasses[i].name.split(/(?=[A-Z])/)[0].toLowerCase(), _lightsClasses[i]])

    const _initialActorNamesValues = [CONSTS.PRIMS_TYPES.map(x => [x, 0]), CONSTS.LIGHTS_TYPES.map(x => [x, 0])]
    
    /*------------------------------------------------------------------------------------------*/

    /* App constants / Initial state helper */
    const categoryKeys = CONSTS.CATEGORY_TYPES.map((x, i) => x + 's')
    const actorTypes = [CONSTS.PRIMS_TYPES, CONSTS.LIGHTS_TYPES]

    // Set up a hashmap where key=actorType, value=Function() which creates a new Actor instance
    const actorsClassMap = Object.fromEntries([].concat(_primsClassMap, _lightsClassMap))
    const initialActorNames = Object.fromEntries(categoryKeys.map((x, i) => [x, Object.fromEntries(_initialActorNamesValues[i])]))
    const makeActorMap = (initialValue) => Object.fromEntries(categoryKeys.map((x, i) => [x, initialValue]))

    /*------------------------------------------------------------------------------------------*/
    
    /* App state */

    // auto-increment ID
    const [actorNames, setActorNames] = useState(initialActorNames)
    const [actorId, setActorId] = useState(1)
    const [actors, setActors] = useState(makeActorMap([]))
    const [isAppStateInitialized, setIsAppStateInitialized] = useState(false)

    const [categoriesSelected, setCategoriesSelected] = useState(makeActorMap(false))
    const [categoryItemsSelected, setCategoryItemsSelected] = useState(makeActorMap([]))
    const [currentSelected, setCurrentSelected] = useState(null)

    const [categoriesVisible, setCategoriesVisible] = useState(makeActorMap(true))
    const [categoryItemsVisible, setCategoryItemsVisible] = useState(makeActorMap([]))

    const [showGrid, setShowGrid] = useState(true)
    const [showAxes, setShowAxes] = useState(true)
    const [showWireframe, setShowWireframe] = useState(false)

    /*------------------------------------------------------------------------------------------*/

    /* Side Effects */

    // Add one box to the scene
    useEffect(() => {
        setActors(prevActors => ({
            ...prevActors,
            primitives: prevActors.primitives.concat(makeActor("box"))
        }))
        setCategoryItemsSelected(prevSelected=> ({
            ...prevSelected,
            primitives: prevSelected.primitives.concat(false)
        }))
        setCategoryItemsVisible(prevVisible => ({
            ...prevVisible,
            primitives: prevVisible.primitives.concat(true)
        }))
        setIsAppStateInitialized(true)
    }, [])

    // Debug log after initialization
    useEffect(() => {
        if (isAppStateInitialized){
            console.log(actors)
        }
    }, [isAppStateInitialized, actors])

    /*------------------------------------------------------------------------------------------*/

    /* Initialize actor helpers */

    const makeActor = (actorType) => {
        let actor = JSON.parse(JSON.stringify(
            new actorsClassMap[actorType]))
        actor = {
            ...actor,
            id: actorId,
            name: makeActorName(actorType),
            color: CONSTS.ACTOR_COLORS[Math.floor(Math.random() * CONSTS.ACTOR_COLORS.length)],
        }
        setActorId(prevState => prevState + 1)
        return actor
    }

    const makeActorName = (actorType) => {
        let num;
        if (CONSTS.PRIMS_TYPES.includes(actorType)){
            num = actorNames.primitives[actorType]
            setActorNames(prevActorNames => ({
                ...prevActorNames,
                primitives: {
                    ...prevActorNames.primitives,
                    [actorType]: prevActorNames.primitives[actorType] + 1
                }
            }))
        } else if (CONSTS.LIGHTS_TYPES.includes(actorType)){
            num = actorNames.lights[actorType]
            setActorNames(prevActorNames => ({
                ...prevActorNames,
                lights: {
                    ...prevActorNames.lights,
                    [actorType]: prevActorNames.lights[actorType] + 1
                }
            }))
        } else {
            throw new Error("Did not select actor name")
        }
        if (num === 0){
            return actorType
        } else {
            return actorType + '_' + String(num).padStart(2, '0')
        }
    }

    /*------------------------------------------------------------------------------------------*/

    /* Event listeners */

    const handleDropdownClick = (e) => {
        if (e.target.value) {
            const categoryType = e.target.dataset.categorytype + 's'
            setActors(prevActors => ({
                ...prevActors,
                [categoryType]: prevActors[categoryType].concat(makeActor(e.target.value))
            }))
            setCategoryItemsSelected(prevSelected => ({
                ...prevSelected,
                [categoryType]: prevSelected[categoryType].concat(categoriesSelected[categoryType])
            }))
            setCategoryItemsVisible(prevVisible => ({
                ...prevVisible,
                [categoryType]: prevVisible[categoryType].concat(categoriesVisible[categoryType])
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
            let itemSelected;
            if (x === categoryType) {
                // copy currently selected category state
                itemSelected = selected;
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
        const idx = e.target.dataset.idx
        const categoryType = e.target.dataset.categorytype

        // if previously selected HTML element is a category, always select the item
        let selected;
        if (currentSelected && currentSelected.dataset.elemtype === "category") {
            selected = true
        } else {
            selected = !categoryItemsSelected[categoryType + 's'][idx]
        }

        // reset category state
        setCategoriesSelected(makeActorMap(false))

        // build new state for category items
        let nextState = []
        const keys = Object.keys(categoryItemsSelected)
        keys.map(x => 
            nextState.push([x, [...Array(categoryItemsSelected[x].length)].fill(false)])
        )

        // change into object for setState function
        nextState = Object.fromEntries(nextState)
        nextState[categoryType + 's'][idx] = selected

        // set the new state
        setCategoryItemsSelected(nextState)

        // set previously selected target
        setCurrentSelected(e.target)
    }

    const handleVisible = (e) => {
        handleVisibilityHelper(true)
    }

    const handleHidden = (e) => {
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
                break;
            case "show-axes":
                setShowAxes(e.target.checked)
                break
            case "show-wireframe":
                setShowWireframe(e.target.checked)
        }
    }

    /*------------------------------------------------------------------------------------------*/

    return (
        <div id="app-state">
            <div id="layout">
                <GUILayout  actors={actors}
                            prims={CONSTS.PRIMS_TYPES}
                            lights={CONSTS.LIGHTS_TYPES}
                            categoryTypes={CONSTS.CATEGORY_TYPES}
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
                                prims={CONSTS.PRIMS_TYPES}
                                lights={CONSTS.LIGHTS_TYPES}
                                showGrid={showGrid}
                                showAxes={showAxes}
                                showWireframe={showWireframe}
                />
            </div>
        </div>
    )
}

export default AppState