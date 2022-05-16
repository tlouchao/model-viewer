export const THREE_SCENE_COLOR = 0x888888;
export const MAT_ROW_LEN = 3;

export const DEF_TRANSLATE = 0;
export const DEF_ROTATE = 0;
export const DEF_SCALE= 1;

export const MAX_TRANSLATE = 50;
export const MAX_ROTATE = 360;
export const MAX_SCALE= 10;

export const MIN_TRANSLATE = -50;
export const MIN_ROTATE = -360;
export const MIN_SCALE= 0;

export const BOX_DEF_WIDTH = 1;
export const BOX_DEF_HEIGHT = 1;
export const BOX_DEF_LENGTH = 1;

export const CYLINDER_DEF_RADIUS = 1;
export const CYLINDER_DEF_HEIGHT = 1;

export const TORUS_DEF_RADIUS = 1;
export const TORUS_DEF_TUBE = .5;
export const TORUS_DEF_RADIUS_SEG = 8;
export const TORUS_DEF_TUBE_SEG = 16;

export const ARR_DEF_TRANSLATE = 
    [...Array(MAT_ROW_LEN)].fill(DEF_TRANSLATE)
export const ARR_DEF_ROTATE = 
    [...Array(MAT_ROW_LEN)].fill(DEF_ROTATE)
export const ARR_DEF_SCALE = 
    [...Array(MAT_ROW_LEN)].fill(DEF_SCALE)

export const ACTOR_COLORS = 
    ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"]