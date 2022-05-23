import * as ACTORS from "actors/actors"
import * as CONSTS from "constants/constants"

describe("matrix instance properties", () => {
    const m = new ACTORS.Matrix()
    test("translate", () => {
        expect(m.translate.x).toEqual(CONSTS.DEF_TRANSLATE)
    })
    test("rotate", () => {
        expect(m.rotate.y).toEqual(CONSTS.DEF_ROTATE)
    })
    test("scale", () => {
        expect(m.scale.z).toEqual(CONSTS.DEF_SCALE)
    })
})

describe("do not instantiate abstract class", () => {
    test("actor", () => {
         expect(() => new ACTORS.Actor()).toThrow(TypeError)
    })
    test("light", () => {
        expect(() => new ACTORS.Light()).toThrow(TypeError)
    })
})

describe("light properties", () => {
    const a = new ACTORS.AmbientLight()
    test("ambient", () => {
         expect(a.actorName).toEqual("ambient")
         expect(a.constructor.actorType).toEqual("ambient")
         expect(Object.keys(a.attributes).length).not.toEqual(0)
         expect(a.attributes.intensity).toEqual(CONSTS.AMBIENT_DEF_INTENSITY)
    })
})

describe("prim properties", () => {
    const c = new ACTORS.CylinderPrimitive()
    test("cylinder", () => {
         expect(c.actorName).toEqual("cylinder")
         expect(c.constructor.actorType).toEqual("cylinder")
         expect(Object.keys(c.attributes).length).not.toEqual(0)
         expect(c.attributes.radius).toEqual(CONSTS.CYLINDER_DEF_RADIUS)
         expect(c.attributes.height).toEqual(CONSTS.CYLINDER_DEF_HEIGHT)
    })
})

describe("stringify & parse static properties", () => {
    test("box", () => {
        const b1 = new ACTORS.BoxPrimitive()
        const b2 = JSON.parse(JSON.stringify(b1))
        expect(b1.constructor.actorType).toEqual("box")
        expect(b2.hasOwnProperty("actorType")).toEqual(false)
    })
})

describe("stringify & parse", () => {
    const t = new ACTORS.Vector(3, 5, 8)
    const r = new ACTORS.Vector(4, 6, 10)
    const s = new ACTORS.Vector(7, 7, 7)
    const m = new ACTORS.Matrix(t, r, s)
    test("default params", () => {
        const b1 = new ACTORS.BoxPrimitive()
        const b2 = JSON.parse(JSON.stringify(b1))
        b2.matrix.translate.x = 50
        expect(b2.matrix.translate.x).toEqual(50)
    })
    test("provide matrix param", () => {
        const b1 = new ACTORS.BoxPrimitive(m)
        const b2 = JSON.parse(JSON.stringify(b1))

        expect(b2.color).toEqual(CONSTS.PRIM_COLOR)
        expect(b2.matrix.scale.z).toEqual(7)
    })
    test("provide matrix & color param", () => {
        const other_color = "#123456"
        const b1 = new ACTORS.BoxPrimitive(m, other_color)
        const b2= JSON.parse(JSON.stringify(b1))
        
        expect(b2.color).toEqual(other_color)
        expect(b2.matrix.scale.z).toEqual(7)
    })
})