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

    const initialCategories = Object.fromEntries([
        [CATEGORY_TYPES[0] + 's', false],
        [CATEGORY_TYPES[1] + 's', false],
    ])

    const initialCategoriesItems = Object.fromEntries([
        [CATEGORY_TYPES[0] + 's', []],
        [CATEGORY_TYPES[1] + 's', []],
    ])

    // auto-increment ID
    const [actorId, setActorId] = useState(1)
    const [actorNames, setActorNames] = useState(initialActorNames)
    const [actors, setActors] = useState(initialActors)
    const [isInitialized, setIsInitialized] = useState(false)

    const [categoriesSelected, setCategoriesSelected] = useState(initialCategories)
    const [categoryItemsSelected, setCategoryItemsSelected] = useState(initialCategoriesItems)
    const [prevCategoryItemSelected, setPrevCategoryItemSelected] = useState(null)

    const [showGrid, setShowGrid] = useState(true)
    const [showAxes, setShowAxes] = useState(true)
    const [showWireframe, setShowWireframe] = useState(false)

    useEffect(() => {
        setActors(prevActors => ({
            ...prevActors,
            primitives: prevActors.primitives.concat(_makeActor("box", CATEGORY_TYPES[0]))
        }))
        setCategoryItemsSelected(prevItems => ({
            ...prevItems,
            primitives: prevItems.primitives.concat(false)
        }))
        setIsInitialized(true)
    }, [])

    /* Debug log after initialization */
    useEffect(() => {
        if (isInitialized){
            console.log(actors)
            console.log(actorNames)
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
                    setCategoryItemsSelected(prevItems => ({
                        ...prevItems,
                        primitives: prevItems.primitives.concat(categoriesSelected["primitives"])
                    }))
                    break
                case "add-light":
                    setActors(prevActors => ({
                        ...prevActors,
                        lights: prevActors.lights.concat(_makeActor(e.target.value, CATEGORY_TYPES[1]))
                    }))
                    setCategoryItemsSelected(prevItems => ({
                        ...prevItems,
                        lights: prevItems.lights.concat(categoriesSelected["lights"])
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
        setCategoryItemsSelected(prevState => ({
            ...prevState,
            [categoryType]: [...Array(prevState[categoryType].length)].fill(selected),
        }))
        setPrevCategoryItemSelected(e.target)
    }

    const handleCategoryItemClick = (e) => {
        const actorType = e.target.dataset.type
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
                            handleDropdownClick={handleDropdownClick} 
                            handleCategoryClick={handleCategoryClick} 
                            handleCategoryItemClick={handleCategoryItemClick} 
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