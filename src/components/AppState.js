import React, { useEffect, useState } from "react"
import GUILayout from "./gui/GUILayout"
import ThreeContainer from "./ThreeContainer"
import * as ACTORS from "./../actors/actors"
import * as CONSTS from "./../constants/constants"

const AppState = () => {

    /* Setup hashmap to refer to when creating a new Actor instance */
    /* key=actorType, value=Function() which creates the new Actor instance */
    const primsClasses = Object.values(ACTORS).filter((x) => ACTORS.Primitive.isPrototypeOf(x))
    const primsClassMap = [...Array(primsClasses.length)].map((x, i) => [primsClasses[i].name.split(/(?=[A-Z])/)[0].toLowerCase(), primsClasses[i]])
    const lightsClasses = Object.values(ACTORS).filter((x) => ACTORS.Light.isPrototypeOf(x))
    const lightsClassMap = [...Array(lightsClasses.length)].map((x, i) => [lightsClasses[i].name.split(/(?=[A-Z])/)[0].toLowerCase(), lightsClasses[i]])
    
    const actorsClassMap = Object.fromEntries([].concat(primsClassMap, lightsClassMap))

    /* App state */
    const initialActorNames = Object.fromEntries([
        [CONSTS.CATEGORY_TYPES[0] + 's', 
            Object.fromEntries(CONSTS.PRIMS_TYPES.map(x => [x, 0]))],
        [CONSTS.CATEGORY_TYPES[1] + 's', 
            Object.fromEntries(CONSTS.LIGHTS_TYPES.map(x => [x, 0]))],
    ])

    const initialActors = Object.fromEntries([
        [CONSTS.CATEGORY_TYPES[0] + 's', []],
        [CONSTS.CATEGORY_TYPES[1] + 's', []],
    ])

    const initialSelected = Object.fromEntries([
        [CONSTS.CATEGORY_TYPES[0] + 's', false],
        [CONSTS.CATEGORY_TYPES[1] + 's', false],
    ])

    const initialItemsSelected = Object.fromEntries([
        [CONSTS.CATEGORY_TYPES[0] + 's', []],
        [CONSTS.CATEGORY_TYPES[1] + 's', []],
    ])

    const initialVisible = Object.fromEntries([
        [CONSTS.CATEGORY_TYPES[0] + 's', true],
        [CONSTS.CATEGORY_TYPES[1] + 's', true],
    ])

    const initialItemsVisible = Object.fromEntries([
        [CONSTS.CATEGORY_TYPES[0] + 's', []],
        [CONSTS.CATEGORY_TYPES[1] + 's', []],
    ])

    // auto-increment ID
    const [actorId, setActorId] = useState(1)
    const [actorNames, setActorNames] = useState(initialActorNames)
    const [actors, setActors] = useState(initialActors)
    const [isInitialized, setIsInitialized] = useState(false)

    const [categoriesSelected, setCategoriesSelected] = useState(initialSelected)
    const [categoryItemsSelected, setCategoryItemsSelected] = useState(initialItemsSelected)
    const [prevCategoryItemSelected, setPrevCategoryItemSelected] = useState(null)

    const [categoriesVisible, setCategoriesVisible] = useState(initialVisible)
    const [categoryItemsVisible, setCategoryItemsVisible] = useState(initialItemsVisible)

    const [showGrid, setShowGrid] = useState(true)
    const [showAxes, setShowAxes] = useState(true)
    const [showWireframe, setShowWireframe] = useState(false)

    /* Add one box to the scene */
    useEffect(() => {
        setActors(prevActors => ({
            ...prevActors,
            primitives: prevActors.primitives.concat(_makeActor("box"))
        }))
        setCategoryItemsSelected(prevSelected=> ({
            ...prevSelected,
            primitives: prevSelected.primitives.concat(false)
        }))
        setCategoryItemsVisible(prevVisible => ({
            ...prevVisible,
            primitives: prevVisible.primitives.concat(true)
        }))
        setIsInitialized(true)
    }, [])

    /* Debug log after initialization */
    useEffect(() => {
        if (isInitialized){
            console.log(actors)
        }
    }, [isInitialized, actors])

    const _makeActor = (actorType) => {
        let actor = JSON.parse(JSON.stringify(new actorsClassMap[actorType]))
        actor = {
            ...actor,
            id: actorId,
            name: _makeName(actorType),
            color: CONSTS.ACTOR_COLORS[Math.floor(Math.random() * CONSTS.ACTOR_COLORS.length)],
        }
        setActorId(prevState => prevState + 1)
        return actor
    }

    const _makeName = (actorType) => {
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

    const handleDropdownClick = (e) => {
        if (e.target.value) {
            switch (e.target.id) {
                case "add-prim":
                    setActors(prevActors => ({
                        ...prevActors,
                        primitives: prevActors.primitives.concat(_makeActor(e.target.value, CONSTS.CATEGORY_TYPES[0]))
                    }))
                    setCategoryItemsSelected(prevSelected => ({
                        ...prevSelected,
                        primitives: prevSelected.primitives.concat(categoriesSelected["primitives"])
                    }))
                    setCategoryItemsVisible(prevVisible => ({
                        ...prevVisible,
                        primitives: prevVisible.primitives.concat(categoriesVisible["primitives"])
                    }))
                    break
                case "add-light":
                    setActors(prevActors => ({
                        ...prevActors,
                        lights: prevActors.lights.concat(_makeActor(e.target.value, CONSTS.CATEGORY_TYPES[1]))
                    }))
                    setCategoryItemsSelected(prevSelected => ({
                        ...prevSelected,
                        lights: prevSelected.lights.concat(categoriesSelected["lights"])
                    }))
                    setCategoryItemsVisible(prevVisible => ({
                        ...prevVisible,
                        lights: prevVisible.lights.concat(categoriesVisible["lights"])
                    }))
                    break
                default:
                    throw new Error("Did not add dropdown value")
            }
        }
    }

    const handleCategoryClick = (e) => {
        const categoryType = e.target.dataset.type
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
        setPrevCategoryItemSelected(e.target)
    }

    const handleCategoryItemClick = (e) => {
        const idx = e.target.dataset.idx
        const categoryType = e.target.dataset.categorytype

        // if previously selected HTML element is a category, always select the item
        let selected;
        if (prevCategoryItemSelected && prevCategoryItemSelected.classList.contains("outliner-category")) {
            selected = true
        } else {
            selected = !categoryItemsSelected[categoryType + 's'][idx]
        }

        // reset category state
        setCategoriesSelected(initialSelected)

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
        setPrevCategoryItemSelected(e.target)
    }

    const handleOutlinerVisible = (e) => {
        _setVisibilityHelper(true)
    }

    const handleOutlinerHidden = (e) => {
        _setVisibilityHelper(false)
    }

    const _setVisibilityHelper = (boolValue) => {
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

    return (
        <div id="app-state">
            <div id="layout">
                <GUILayout  actors={actors}
                            prims={CONSTS.PRIMS_TYPES}
                            lights={CONSTS.LIGHTS_TYPES}
                            categories={CONSTS.CATEGORY_TYPES}
                            categoriesSelected={categoriesSelected}
                            categoryItemsSelected={categoryItemsSelected}
                            prevCategoryItemSelected={prevCategoryItemSelected}
                            categoriesVisible={categoriesVisible}
                            categoryItemsVisible={categoryItemsVisible}
                            handleDropdownClick={handleDropdownClick} 
                            handleCategoryClick={handleCategoryClick} 
                            handleCategoryItemClick={handleCategoryItemClick} 
                            handleOutlinerVisible={handleOutlinerVisible}
                            handleOutlinerHidden={handleOutlinerHidden}
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