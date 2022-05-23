import * as ACTORS from "actors/actors"
import * as CONSTS from "constants/constants"

// get classes in which actor is direct ancestor
const categoriesClasses = Object.values(ACTORS).filter(x => Object.getPrototypeOf(x) === ACTORS.Actor)
const categoriesKeys = categoriesClasses.map(x => x.categoryType + 's')

// get nested classes in which category is direct ancestor
const categoryActorClassMap = nestedMapHelper()

// get flattened concrete class map
const actorClasses = Object.fromEntries(Object.keys(categoryActorClassMap).reduce((acc, x) =>
    acc.concat(Object.keys(categoryActorClassMap[x]).map(y => [y, categoryActorClassMap[x][y]])), []
))

const initialActorNames = nestedMapHelper(0)

/*------------------------------------------------------------------------------------------*/

// build initial app state helpers //

const categoryTypes = categoriesKeys
const actorTypes = Object.fromEntries(categoriesClasses.map(x => 
    [x.categoryType + 's', Object.values(ACTORS).filter(y => 
        Object.getPrototypeOf(y) === x).map(z => z.actorType)
    ]
))
 

function categoryMapHelper(initialValue){ return Object.fromEntries(categoryTypes.map(x => [x, initialValue]))}

function nestedMapHelper(value) {
    return Object.fromEntries(categoriesClasses.map(x => 
        [x.categoryType + 's', Object.fromEntries(Object.values(ACTORS).filter(y => 
            Object.getPrototypeOf(y) === x).map(z => [z.actorType, (value == undefined) ? z : value]))
        ]
    ))
} 

/*------------------------------------------------------------------------------------------*/

function actorColorHelper(){
    return CONSTS.ACTOR_COLORS[Math.floor(Math.random() * CONSTS.ACTOR_COLORS.length)]
}

/*------------------------------------------------------------------------------------------*/

export { categoryTypes, actorTypes, actorClasses, initialActorNames, actorColorHelper, categoryMapHelper }