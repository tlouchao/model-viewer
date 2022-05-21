import * as ACTORS from "actors/actors"
import * as CONSTS from "constants/constants"

describe("matrix instance properties", () => {
    const m = new ACTORS.Matrix();
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
    test('actor', () => {
         expect(() => new ACTORS.Actor()).toThrow(TypeError)
    })
    test('light', () => {
        expect(() => new ACTORS.Light()).toThrow(TypeError)
    })
})

describe("light properties", () => {
    const a = new ACTORS.AmbientLight()
    test('ambient', () => {
         expect(a.actorName).toEqual('ambient')
         expect(a.actorType).toEqual('ambient')
         expect(Object.keys(a.attributes).length).not.toEqual(0)
         expect(a.attributes.intensity).toEqual(CONSTS.AMBIENT_DEF_INTENSITY)
    })
})

describe("prim properties", () => {
    const c = new ACTORS.CylinderPrimitive()
    test('cylinder', () => {
         expect(c.actorName).toEqual('cylinder')
         expect(c.actorType).toEqual('cylinder')
         expect(Object.keys(c.attributes).length).not.toEqual(0)
         expect(c.attributes.radius).toEqual(CONSTS.CYLINDER_DEF_RADIUS)
         expect(c.attributes.height).toEqual(CONSTS.CYLINDER_DEF_HEIGHT)
    })
})

describe("stringify & parse", () => {
    test('default params', () => {
        const b_ins = new ACTORS.BoxPrimitive()
        const b_obj = JSON.parse(JSON.stringify(b_ins))
        b_obj.matrix.translate.x = 50
        expect(b_obj.matrix.translate.x).toEqual(50)
    })
    test('provide params', () => {
        const t = new ACTORS.Vector(3, 5, 8)
        const r = new ACTORS.Vector(4, 6, 10)
        const s = new ACTORS.Vector(7, 7, 7)
        const m = new ACTORS.Matrix(t, r, s)

        const b_ins_m = new ACTORS.BoxPrimitive(m)
        const b_obj_m = JSON.parse(JSON.stringify(b_ins_m))

        expect(b_obj_m.color).toEqual(CONSTS.PRIM_COLOR)
        expect(b_obj_m.matrix.scale.z).toEqual(7)

        const other_color = "#123456"
        const b_ins_mc = new ACTORS.BoxPrimitive(m, color)
        const b_obj_mc = JSON.parse(JSON.stringify(b_ins_mc))
        
        expect(b_obj_mc.color).toEqual(other_color)
        expect(b_obj_mc.matrix.scale.z).toEqual(7)
    })
})