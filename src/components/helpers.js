import * as ACTORS from "actors/actors"
import * as CONSTS from "constants/constants"
import { BoxGeometry, CylinderGeometry, TorusGeometry, AmbientLight, PointLight } from "three"

// get classes in which actor is direct ancestor
const categoriesClasses = Object.values(ACTORS).filter(x => Object.getPrototypeOf(x) === ACTORS.Actor)

// key names for nested maps
const categoryTypes = categoriesClasses.map(x => x.categoryType + "s")

// nested classes in which category is direct ancestor
const categoryActorClassMap = nestedMapHelper()

// initial state for unique actor names
const initialActorNames = nestedMapHelper(0)

// flattened concrete class map
const actorClasses = Object.fromEntries(Object.keys(categoryActorClassMap).reduce((acc, x) =>
    acc.concat(Object.keys(categoryActorClassMap[x]).map(y => [y, categoryActorClassMap[x][y]])), []
))

// nested actor types
const actorTypes = Object.fromEntries(categoriesClasses.map(x => 
    [x.categoryType + "s", Object.values(ACTORS).filter(y => 
        Object.getPrototypeOf(y) === x).map(z => z.actorType)
    ]
))

// max lights in scene = 8, max prims in scene = 16. HARDCODED AND ORDER DEPENDENT.
const categoryCapacity = Object.fromEntries(categoryTypes.map((x, i) => 
    [x, [].concat(CONSTS.MAX_SCENE_LIGHTS, CONSTS.MAX_SCENE_PRIMS)[i]]))

// toggle options, remember insertion order
const initialToggleOptions = new Map()
CONSTS.TOGGLE_OPTIONS.map(x => initialToggleOptions.set(x, false))

// three class constructors also hardcoded
const threeClasses = nestedMapHelper()
threeClasses["primitives"]["box"] = BoxGeometry
threeClasses["primitives"]["cylinder"] = CylinderGeometry
threeClasses["primitives"]["torus"] = TorusGeometry
threeClasses["lights"]["ambient"] = AmbientLight
threeClasses["lights"]["point"] = PointLight

/*------------------------------------------------------------------------------------------*/

// initial app state helpers //

function categoryMapHelper(initialValue){ return Object.fromEntries(categoryTypes.map(x => [x, initialValue]))}

function nestedMapHelper(value) {
    return Object.fromEntries(categoriesClasses.map(x => 
        [x.categoryType + "s", Object.fromEntries(Object.values(ACTORS).filter(y => 
            Object.getPrototypeOf(y) === x).map(z => [z.actorType, (value === undefined) ? z : value]))
        ]
    ))
} 

/*------------------------------------------------------------------------------------------*/

// build actor helper //

function actorColorHelper(){
    return CONSTS.ACTOR_COLORS[Math.floor(Math.random() * CONSTS.ACTOR_COLORS.length)]
}

function actorMatrixHelper(){

    // translate
    const delta = (CONSTS.MAX_TRANSLATE - CONSTS.MIN_TRANSLATE)
    const factor = delta / CONSTS.STEP
    const randTranslateX = (Math.floor(Math.random() * factor) * CONSTS.STEP) + CONSTS.MIN_TRANSLATE
    const randTranslateY = (Math.floor(Math.random() * factor) * .5 * CONSTS.STEP) + (CONSTS.MIN_TRANSLATE * .5)
    const randTranslateZ = (Math.floor(Math.random() * factor) * CONSTS.STEP) + CONSTS.MIN_TRANSLATE

    // rotate
    const negPos = [1, -1]
    const rotArr = [90, 180, 270, 360]
    const randRotateX = rotArr[Math.floor(Math.random() * rotArr.length)] * negPos[Math.floor(Math.random() * negPos.length)]
    const randRotateY = rotArr[Math.floor(Math.random() * rotArr.length)] * negPos[Math.floor(Math.random() * negPos.length)]
    const randRotateZ = rotArr[Math.floor(Math.random() * rotArr.length)] * negPos[Math.floor(Math.random() * negPos.length)]
    return new ACTORS.Matrix(new ACTORS.Vector(randTranslateX, randTranslateY, randTranslateZ),
                             new ACTORS.Vector(randRotateX, randRotateY, randRotateZ),
                             new ACTORS.Vector(CONSTS.DEF_SCALE, CONSTS.DEF_SCALE, CONSTS.DEF_SCALE),
    )
}

/*------------------------------------------------------------------------------------------*/

export {categoryTypes, 
        actorTypes, 
        categoryCapacity, 
        actorClasses, 
        threeClasses,
        initialActorNames,
        initialToggleOptions, 
        actorColorHelper, 
        actorMatrixHelper,
        categoryMapHelper }