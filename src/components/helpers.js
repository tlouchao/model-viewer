import * as ACTORS from "actors/actors"
import * as CONSTS from "constants/constants"

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
const categoryCapacity = Object.fromEntries(categoryTypes.map((x, i) => [x, [].concat(CONSTS.MAX_SCENE_LIGHTS, CONSTS.MAX_SCENE_PRIMS)[i]]))

// toggle options, remember insertion order
const initialToggleOptions = new Map()
CONSTS.TOGGLE_OPTIONS.map(x => initialToggleOptions.set(x, false))

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
    const delta = (CONSTS.MAX_TRANSLATE - CONSTS.MIN_TRANSLATE)
    const factor = delta / CONSTS.MAT_STEP
    const randTranslateX = (Math.floor(Math.random() * factor) * CONSTS.MAT_STEP) + CONSTS.MIN_TRANSLATE
    const randTranslateY = (Math.floor(Math.random() * factor) * CONSTS.MAT_STEP) + CONSTS.MIN_TRANSLATE
    return new ACTORS.Matrix(new ACTORS.Vector(randTranslateX, randTranslateY, CONSTS.DEF_TRANSLATE),
                             new ACTORS.Vector(CONSTS.DEF_ROTATE, CONSTS.DEF_ROTATE, CONSTS.DEF_ROTATE),
                             new ACTORS.Vector(CONSTS.DEF_SCALE, CONSTS.DEF_SCALE, CONSTS.DEF_SCALE),
    )
}

/*------------------------------------------------------------------------------------------*/

export {categoryTypes, 
        actorTypes, 
        categoryCapacity, 
        actorClasses, 
        initialActorNames,
        initialToggleOptions, 
        actorColorHelper, 
        actorMatrixHelper,
        categoryMapHelper }