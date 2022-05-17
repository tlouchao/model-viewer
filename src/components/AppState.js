import React, { useEffect, useState } from "react"
import GUILayout from "./gui/GUILayout"
import ThreeContainer from "./ThreeContainer"
import * as constants from "./../constants/constants"

const AppState = () => {

    /* App constants */
    const CATEGORY_TYPES = ["primitive", "light"]
    const PRIMS_TYPES = ["box", "cylinder", "torus"]
    const LIGHTS_TYPES = ["ambient", "point"]

    const PRIMS = Object.fromEntries([  
        [PRIMS_TYPES[0], {width: constants.BOX_DEF_WIDTH, 
                          height: constants.BOX_DEF_HEIGHT, 
                          length: constants.BOX_DEF_LENGTH }],

        [PRIMS_TYPES[1], {radius: constants.CYLINDER_DEF_RADIUS, 
                          height: constants.CYLINDER_DEF_HEIGHT }],

        [PRIMS_TYPES[2], {radius: constants.TORUS_DEF_RADIUS, 
                          tube: constants.TORUS_DEF_TUBE, 
                          radialSegments: constants.TORUS_DEF_RADIUS_SEG, 
                          tubularSegments: constants.TORUS_DEF_TUBE_SEG }],
    ])

    const LIGHTS = Object.fromEntries([
        [LIGHTS_TYPES[0], { intensity: 1}],
        [LIGHTS_TYPES[1], { intensity: 1, distance: 0 }],
    ])

    /* App state */
    const initialActorNames = Object.fromEntries([
        [CATEGORY_TYPES[0] + 's', Object.fromEntries(PRIMS_TYPES.map(x => [x, 0]))],
        [CATEGORY_TYPES[1] + 's', Object.fromEntries(LIGHTS_TYPES.map(x => [x, 0]))],
    ])

    const initialActors = Object.fromEntries([
        [CATEGORY_TYPES[0] + 's', []],
        [CATEGORY_TYPES[1] + 's', []],
    ])

    const initialSelected = Object.fromEntries([
        [CATEGORY_TYPES[0] + 's', false],
        [CATEGORY_TYPES[1] + 's', false],
    ])

    const initialItemsSelected = Object.fromEntries([
        [CATEGORY_TYPES[0] + 's', []],
        [CATEGORY_TYPES[1] + 's', []],
    ])

    const initialVisible = Object.fromEntries([
        [CATEGORY_TYPES[0] + 's', true],
        [CATEGORY_TYPES[1] + 's', true],
    ])

    const initialItemsVisible = Object.fromEntries([
        [CATEGORY_TYPES[0] + 's', []],
        [CATEGORY_TYPES[1] + 's', []],
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
            primitives: prevActors.primitives.concat(_makeActor("box", CATEGORY_TYPES[0]))
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

    const _makeActor = (actorType, categoryType) => {
        const actor = {
            id: actorId,
            name: _makeName(actorType),
            categoryType: categoryType,
            type: actorType,
            selected: false,
            visible: true,
            matrix: {
                translate: constants.ARR_DEF_TRANSLATE,
                rotate: constants.ARR_DEF_ROTATE,
                scale: constants.ARR_DEF_SCALE,
            },
            // pick random color
            color: constants.ACTOR_COLORS[Math.floor(Math.random() * 
                                          constants.ACTOR_COLORS.length)],
            attributes: _selectAttributes(actorType)
        }
        setActorId(prevState => prevState + 1)
        return actor
    }

    const _makeName = (actorType) => {
        let num;
        if (PRIMS.hasOwnProperty(actorType)){
            num = actorNames.primitives[actorType]
            setActorNames(prevActorNames => ({
                ...prevActorNames,
                primitives: {
                    ...prevActorNames.primitives,
                    [actorType]: prevActorNames.primitives[actorType] + 1
                }
            }))
        } else if (LIGHTS.hasOwnProperty(actorType)){
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

    const _selectAttributes = (actorType) => {
        let attrs;
        if (PRIMS.hasOwnProperty(actorType)){
            attrs = PRIMS[actorType]
        } else if (LIGHTS.hasOwnProperty(actorType)){
            attrs = LIGHTS[actorType]
        } else {
            throw new Error("Did not select actor name")
        }
        return attrs;
    }

    const handleDropdownClick = (e) => {
        if (e.target.value) {
            switch (e.target.id) {
                case "add-prim":
                    setActors(prevActors => ({
                        ...prevActors,
                        primitives: prevActors.primitives.concat(_makeActor(e.target.value, CATEGORY_TYPES[0]))
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
                        lights: prevActors.lights.concat(_makeActor(e.target.value, CATEGORY_TYPES[1]))
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
        console.log(actors)
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
        console.log("show")
        _setVisibilityHelper(true)
    }

    const handleOutlinerHidden = (e) => {
        console.log("hide")
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
                            prims={PRIMS_TYPES}
                            lights={LIGHTS_TYPES}
                            categories={CATEGORY_TYPES}
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
                                prims={PRIMS_TYPES}
                                lights={LIGHTS_TYPES}
                                showGrid={showGrid}
                                showAxes={showAxes}
                                showWireframe={showWireframe}
                />
            </div>
        </div>
    )
}

export default AppState