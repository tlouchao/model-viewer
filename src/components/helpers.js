import * as ACTORS from "actors/actors"
import * as CONSTS from "constants/constants"

// get classes in which actor is direct ancestor
const categoriesClasses = Object.values(ACTORS).filter(x => Object.getPrototypeOf(x) === ACTORS.Actor)

// key names for nested maps
const categoryTypes = categoriesClasses.map(x => x.categoryType + "s")

// nested classes in which category is direct ancestor
const categoryActorClassMap = nestedMapHelper()

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

const initialActorNames = nestedMapHelper(0)

// max lights in scene = 8, max prims in scene = 32
let categoryCapacity = categoryMapHelper(0)
categoryCapacity["lights"] = CONSTS.MAX_SCENE_LIGHTS // these are hardcoded
categoryCapacity["primitives"] = CONSTS.MAX_SCENE_PRIMS // these are hardcoded

/*------------------------------------------------------------------------------------------*/

// initial app state helpers //

function categoryMapHelper(initialValue){ return Object.fromEntries(categoryTypes.map(x => [x, initialValue]))}

function nestedMapHelper(value) {
    return Object.fromEntries(categoriesClasses.map(x => 
        [x.categoryType + "s", Object.fromEntries(Object.values(ACTORS).filter(y => 
            Object.getPrototypeOf(y) === x).map(z => [z.actorType, (value == undefined) ? z : value]))
        ]
    ))
} 

/*------------------------------------------------------------------------------------------*/

function actorColorHelper(){
    return CONSTS.ACTOR_COLORS[Math.floor(Math.random() * CONSTS.ACTOR_COLORS.length)]
}

/*------------------------------------------------------------------------------------------*/

export { categoryTypes, actorTypes, categoryCapacity, actorClasses, initialActorNames, actorColorHelper, categoryMapHelper }