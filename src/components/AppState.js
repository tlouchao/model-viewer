import React, { useEffect, useState } from "react"
import GUILayout from "./gui/GUILayout"
import ThreeContainer from "./ThreeContainer"
import * as constants from "./../constants/constants"

const AppState = () => {

    /* App constants */
    const PRIMS = {
        "box": { width: constants.BOX_DEF_WIDTH, 
                  height: constants.BOX_DEF_HEIGHT, 
                  length: constants.BOX_DEF_LENGTH }, 
        "cylinder": { radius: constants.CYLINDER_DEF_RADIUS, 
                       height: constants.CYLINDER_DEF_HEIGHT }, 
        "torus": { radius: constants.TORUS_DEF_RADIUS, 
                    tube: constants.TORUS_DEF_TUBE, 
                    radialSegments: constants.TORUS_DEF_RADIUS_SEG, 
                    tubularSegments: constants.TORUS_DEF_TUBE_SEG }
    }
    const LIGHTS = {
        "ambient": { intensity: 1},
        "point": { intensity: 1, distance: 0 }
    }

    /* App state */
    const initialActorNames = {
        "primitives": Object.fromEntries(Object.getOwnPropertyNames(PRIMS).map(x => [x, 0])),
        "lights": Object.fromEntries(Object.getOwnPropertyNames(LIGHTS).map(x => [x, 0])),
    }
    const initialActors = {
        "primitives": [],
        "lights": []
    }

    // auto-increment ID
    const [isInitialized, setIsInitialized] = useState(false)
    const [actorId, setActorId] = useState(1)
    const [actorNames, setActorNames] = useState(initialActorNames)
    const [actors, setActors] = useState(initialActors)

    const [selectedPrimValue, setSelectedPrimValue] = useState(null)
    const [selectedLightValue, setSelectedLightValue] = useState(null)

    useEffect(() => {
        setActors(prevActors => ({
            ...prevActors,
            primitives: prevActors.primitives.concat(makeActor("box"))
        }))
        setIsInitialized(true)
    }, [])

    useEffect(() => {
        if(isInitialized){
            console.log(actors)
        }
    }, [isInitialized])

    const makeActor = (typeValue) => {
        const actor = {
            id: actorId,
            name: selectName(typeValue),
            type: typeValue,
            visible: true,
            matrix: {
                translate: constants.ARR_DEF_TRANSLATE,
                rotate: constants.ARR_DEF_ROTATE,
                scale: constants.ARR_DEF_SCALE,
            },
            // pick random color
            color: constants.ACTOR_COLORS[Math.floor(Math.random() * 
                                          constants.ACTOR_COLORS.length)],
            attributes: selectAttributes(typeValue)
        }
        setActorId(prevState => prevState + 1)
        return actor
    }

    const selectName = (typeValue) => {
        let num;
        if (PRIMS.hasOwnProperty(typeValue)){
            num = actorNames.primitives[typeValue]
        } else if (LIGHTS.hasOwnProperty(typeValue)){
            num = actorNames.lights[typeValue]
        } else {
            throw new Error("Did not select actor name")
        }
        if (num === 0){
            return typeValue
        } else {
            return typeValue + '_' + String(num).padStart(2, '0')
        }
    }

    const selectAttributes = (typeValue) => {
        let attrs;
        if (PRIMS.hasOwnProperty(typeValue)){
            attrs = PRIMS[typeValue]
        } else if (LIGHTS.hasOwnProperty(typeValue)){
            attrs = LIGHTS[typeValue]
        } else {
            throw new Error("Did not select actor name")
        }
        return attrs;
    }

    const handleDropdownChange = (e) => {
        switch (e.target.id) {
            case "select-prim":
                setSelectedPrimValue(e.target.value)
                break
            case "select-light":
                setSelectedLightValue(e.target.value)
                break
            default:
                throw new Error("Did not set dropdown value")
        }
    }

    const handleDropdownClick = (e) => {
        switch (e.target.id) {
            case "add-prim":
                if (selectedPrimValue){
                    setActors(prevState => prevState.concat(makePrim(selectedPrimValue)))
                }
                break
            case "add-light":
                if (selectedLightValue){
                    setActors(prevState => prevState.concat(makeLight(selectedLightValue)))
                }
                break
            default:
                throw new Error("Did not add dropdown value")
        }
    }
    return (
        <div id="app-state">
            <div id="layout">
                <GUILayout actors={actors}
                           handleDropdownChange={handleDropdownChange}
                           handleDropdownClick={handleDropdownClick} 
                />
                <ThreeContainer actors={actors}
                />
            </div>
        </div>
    )
}

export default AppState