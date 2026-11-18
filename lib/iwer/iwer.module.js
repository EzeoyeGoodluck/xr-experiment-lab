var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../../glm/src/common.js
var EPSILON = 1e-6;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
var ANGLE_ORDER = "zyx";
function round(a) {
  if (a >= 0)
    return Math.round(a);
  return a % 0.5 === 0 ? Math.floor(a) : Math.round(a);
}
var degree = Math.PI / 180;
var radian = 180 / Math.PI;

// ../../../glm/src/mat3.js
function create() {
  let out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}

// ../../../glm/src/mat4.js
var mat4_exports = {};
__export(mat4_exports, {
  add: () => add,
  adjoint: () => adjoint,
  clone: () => clone,
  copy: () => copy,
  create: () => create2,
  decompose: () => decompose,
  determinant: () => determinant,
  equals: () => equals,
  exactEquals: () => exactEquals,
  frob: () => frob,
  fromQuat: () => fromQuat,
  fromQuat2: () => fromQuat2,
  fromRotation: () => fromRotation,
  fromRotationTranslation: () => fromRotationTranslation,
  fromRotationTranslationScale: () => fromRotationTranslationScale,
  fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
  fromScaling: () => fromScaling,
  fromTranslation: () => fromTranslation,
  fromValues: () => fromValues,
  fromXRotation: () => fromXRotation,
  fromYRotation: () => fromYRotation,
  fromZRotation: () => fromZRotation,
  frustum: () => frustum,
  getRotation: () => getRotation,
  getScaling: () => getScaling,
  getTranslation: () => getTranslation,
  identity: () => identity,
  invert: () => invert,
  lookAt: () => lookAt,
  mul: () => mul,
  multiply: () => multiply,
  multiplyScalar: () => multiplyScalar,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd,
  ortho: () => ortho,
  orthoNO: () => orthoNO,
  orthoZO: () => orthoZO,
  perspective: () => perspective,
  perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
  perspectiveNO: () => perspectiveNO,
  perspectiveZO: () => perspectiveZO,
  rotate: () => rotate,
  rotateX: () => rotateX,
  rotateY: () => rotateY,
  rotateZ: () => rotateZ,
  scale: () => scale,
  set: () => set,
  str: () => str,
  sub: () => sub,
  subtract: () => subtract,
  targetTo: () => targetTo,
  translate: () => translate,
  transpose: () => transpose
});
function create2() {
  let out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
function clone(a) {
  let out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  let out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function transpose(out, a) {
  if (out === a) {
    let a01 = a[1], a02 = a[2], a03 = a[3];
    let a12 = a[6], a13 = a[7];
    let a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }
  return out;
}
function invert(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;
  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
function adjoint(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;
  out[0] = a11 * b11 - a12 * b10 + a13 * b09;
  out[1] = a02 * b10 - a01 * b11 - a03 * b09;
  out[2] = a31 * b05 - a32 * b04 + a33 * b03;
  out[3] = a22 * b04 - a21 * b05 - a23 * b03;
  out[4] = a12 * b08 - a10 * b11 - a13 * b07;
  out[5] = a00 * b11 - a02 * b08 + a03 * b07;
  out[6] = a32 * b02 - a30 * b05 - a33 * b01;
  out[7] = a20 * b05 - a22 * b02 + a23 * b01;
  out[8] = a10 * b10 - a11 * b08 + a13 * b06;
  out[9] = a01 * b08 - a00 * b10 - a03 * b06;
  out[10] = a30 * b04 - a31 * b02 + a33 * b00;
  out[11] = a21 * b02 - a20 * b04 - a23 * b00;
  out[12] = a11 * b07 - a10 * b09 - a12 * b06;
  out[13] = a00 * b09 - a01 * b07 + a02 * b06;
  out[14] = a31 * b01 - a30 * b03 - a32 * b00;
  out[15] = a20 * b03 - a21 * b01 + a22 * b00;
  return out;
}
function determinant(a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  let b0 = a00 * a11 - a01 * a10;
  let b1 = a00 * a12 - a02 * a10;
  let b2 = a01 * a12 - a02 * a11;
  let b3 = a20 * a31 - a21 * a30;
  let b4 = a20 * a32 - a22 * a30;
  let b5 = a21 * a32 - a22 * a31;
  let b6 = a00 * b5 - a01 * b4 + a02 * b3;
  let b7 = a10 * b5 - a11 * b4 + a12 * b3;
  let b8 = a20 * b2 - a21 * b1 + a22 * b0;
  let b9 = a30 * b2 - a31 * b1 + a32 * b0;
  return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
}
function multiply(out, a, b) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
function translate(out, a, v) {
  let x = v[0], y = v[1], z = v[2];
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}
function scale(out, a, v) {
  let x = v[0], y = v[1], z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function rotate(out, a, rad, axis) {
  let x = axis[0], y = axis[1], z = axis[2];
  let len4 = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  let b00, b01, b02;
  let b10, b11, b12;
  let b20, b21, b22;
  if (len4 < EPSILON) {
    return null;
  }
  len4 = 1 / len4;
  x *= len4;
  y *= len4;
  z *= len4;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}
function rotateX(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];
  if (a !== out) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
function rotateY(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];
  if (a !== out) {
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
function rotateZ(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];
  if (a !== out) {
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotation(out, rad, axis) {
  let x = axis[0], y = axis[1], z = axis[2];
  let len4 = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;
  if (len4 < EPSILON) {
    return null;
  }
  len4 = 1 / len4;
  x *= len4;
  y *= len4;
  z *= len4;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromXRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromYRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromZRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotationTranslation(out, q, v) {
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromQuat2(out, a) {
  let translation = new ARRAY_TYPE(3);
  let bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
  let magnitude = bx * bx + by * by + bz * bz + bw * bw;
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
function getScaling(out, mat) {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];
  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
  return out;
}
function getRotation(out, mat) {
  let scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  let is1 = 1 / scaling[0];
  let is2 = 1 / scaling[1];
  let is3 = 1 / scaling[2];
  let sm11 = mat[0] * is1;
  let sm12 = mat[1] * is1;
  let sm13 = mat[2] * is1;
  let sm21 = mat[4] * is2;
  let sm22 = mat[5] * is2;
  let sm23 = mat[6] * is2;
  let sm31 = mat[8] * is3;
  let sm32 = mat[9] * is3;
  let sm33 = mat[10] * is3;
  let trace = sm11 + sm22 + sm33;
  let S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }
  return out;
}
function decompose(out_r, out_t, out_s, mat) {
  out_t[0] = mat[12];
  out_t[1] = mat[13];
  out_t[2] = mat[14];
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];
  out_s[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out_s[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out_s[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
  let is1 = 1 / out_s[0];
  let is2 = 1 / out_s[1];
  let is3 = 1 / out_s[2];
  let sm11 = m11 * is1;
  let sm12 = m12 * is1;
  let sm13 = m13 * is1;
  let sm21 = m21 * is2;
  let sm22 = m22 * is2;
  let sm23 = m23 * is2;
  let sm31 = m31 * is3;
  let sm32 = m32 * is3;
  let sm33 = m33 * is3;
  let trace = sm11 + sm22 + sm33;
  let S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out_r[3] = 0.25 * S;
    out_r[0] = (sm23 - sm32) / S;
    out_r[1] = (sm31 - sm13) / S;
    out_r[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out_r[3] = (sm23 - sm32) / S;
    out_r[0] = 0.25 * S;
    out_r[1] = (sm12 + sm21) / S;
    out_r[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out_r[3] = (sm31 - sm13) / S;
    out_r[0] = (sm12 + sm21) / S;
    out_r[1] = 0.25 * S;
    out_r[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out_r[3] = (sm12 - sm21) / S;
    out_r[0] = (sm31 + sm13) / S;
    out_r[1] = (sm23 + sm32) / S;
    out_r[2] = 0.25 * S;
  }
  return out_r;
}
function fromRotationTranslationScale(out, q, v, s) {
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  let sx = s[0];
  let sy = s[1];
  let sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  let sx = s[0];
  let sy = s[1];
  let sz = s[2];
  let ox = o[0];
  let oy = o[1];
  let oz = o[2];
  let out0 = (1 - (yy + zz)) * sx;
  let out1 = (xy + wz) * sx;
  let out2 = (xz - wy) * sx;
  let out4 = (xy - wz) * sy;
  let out5 = (1 - (xx + zz)) * sy;
  let out6 = (yz + wx) * sy;
  let out8 = (xz + wy) * sz;
  let out9 = (yz - wx) * sz;
  let out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
function fromQuat(out, q) {
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function frustum(out, left, right, bottom, top, near, far) {
  let rl = 1 / (right - left);
  let tb = 1 / (top - bottom);
  let nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
function perspectiveNO(out, fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    const nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}
var perspective = perspectiveNO;
function perspectiveZO(out, fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    const nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}
function perspectiveFromFieldOfView(out, fov, near, far) {
  let upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  let downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  let leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  let rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  let xScale = 2 / (leftTan + rightTan);
  let yScale = 2 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = yScale;
  out[6] = 0;
  out[7] = 0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near / (near - far);
  out[15] = 0;
  return out;
}
function orthoNO(out, left, right, bottom, top, near, far) {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
var ortho = orthoNO;
function orthoZO(out, left, right, bottom, top, near, far) {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}
function lookAt(out, eye, center, up) {
  let x0, x1, x2, y0, y1, y2, z0, z1, z2, len4;
  let eyex = eye[0];
  let eyey = eye[1];
  let eyez = eye[2];
  let upx = up[0];
  let upy = up[1];
  let upz = up[2];
  let centerx = center[0];
  let centery = center[1];
  let centerz = center[2];
  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len4 = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len4;
  z1 *= len4;
  z2 *= len4;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len4 = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
  if (!len4) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len4 = 1 / len4;
    x0 *= len4;
    x1 *= len4;
    x2 *= len4;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len4 = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
  if (!len4) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len4 = 1 / len4;
    y0 *= len4;
    y1 *= len4;
    y2 *= len4;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
function targetTo(out, eye, target, up) {
  let eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  let z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  let len4 = z0 * z0 + z1 * z1 + z2 * z2;
  if (len4 > 0) {
    len4 = 1 / Math.sqrt(len4);
    z0 *= len4;
    z1 *= len4;
    z2 *= len4;
  }
  let x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
  len4 = x0 * x0 + x1 * x1 + x2 * x2;
  if (len4 > 0) {
    len4 = 1 / Math.sqrt(len4);
    x0 *= len4;
    x1 *= len4;
    x2 *= len4;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob(a) {
  return Math.sqrt(
    a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + a[6] * a[6] + a[7] * a[7] + a[8] * a[8] + a[9] * a[9] + a[10] * a[10] + a[11] * a[11] + a[12] * a[12] + a[13] * a[13] + a[14] * a[14] + a[15] * a[15]
  );
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
function multiplyScalarAndAdd(out, a, b, scale5) {
  out[0] = a[0] + b[0] * scale5;
  out[1] = a[1] + b[1] * scale5;
  out[2] = a[2] + b[2] * scale5;
  out[3] = a[3] + b[3] * scale5;
  out[4] = a[4] + b[4] * scale5;
  out[5] = a[5] + b[5] * scale5;
  out[6] = a[6] + b[6] * scale5;
  out[7] = a[7] + b[7] * scale5;
  out[8] = a[8] + b[8] * scale5;
  out[9] = a[9] + b[9] * scale5;
  out[10] = a[10] + b[10] * scale5;
  out[11] = a[11] + b[11] * scale5;
  out[12] = a[12] + b[12] * scale5;
  out[13] = a[13] + b[13] * scale5;
  out[14] = a[14] + b[14] * scale5;
  out[15] = a[15] + b[15] * scale5;
  return out;
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  let a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
  let a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  let b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  let b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
  let b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
var mul = multiply;
var sub = subtract;

// ../../../glm/src/quat.js
var quat_exports = {};
__export(quat_exports, {
  add: () => add4,
  calculateW: () => calculateW,
  clone: () => clone4,
  conjugate: () => conjugate,
  copy: () => copy4,
  create: () => create5,
  dot: () => dot3,
  equals: () => equals4,
  exactEquals: () => exactEquals4,
  exp: () => exp,
  fromEuler: () => fromEuler,
  fromMat3: () => fromMat3,
  fromValues: () => fromValues4,
  getAngle: () => getAngle,
  getAxisAngle: () => getAxisAngle,
  identity: () => identity2,
  invert: () => invert2,
  len: () => len3,
  length: () => length3,
  lerp: () => lerp3,
  ln: () => ln,
  mul: () => mul4,
  multiply: () => multiply4,
  normalize: () => normalize3,
  pow: () => pow,
  random: () => random3,
  rotateX: () => rotateX3,
  rotateY: () => rotateY3,
  rotateZ: () => rotateZ3,
  rotationTo: () => rotationTo,
  scale: () => scale4,
  set: () => set4,
  setAxes: () => setAxes,
  setAxisAngle: () => setAxisAngle,
  slerp: () => slerp2,
  sqlerp: () => sqlerp,
  sqrLen: () => sqrLen3,
  squaredLength: () => squaredLength3,
  str: () => str4
});

// ../../../glm/src/vec3.js
var vec3_exports = {};
__export(vec3_exports, {
  add: () => add2,
  angle: () => angle,
  bezier: () => bezier,
  ceil: () => ceil,
  clone: () => clone2,
  copy: () => copy2,
  create: () => create3,
  cross: () => cross,
  dist: () => dist,
  distance: () => distance,
  div: () => div,
  divide: () => divide,
  dot: () => dot,
  equals: () => equals2,
  exactEquals: () => exactEquals2,
  floor: () => floor,
  forEach: () => forEach,
  fromValues: () => fromValues2,
  hermite: () => hermite,
  inverse: () => inverse,
  len: () => len,
  length: () => length,
  lerp: () => lerp,
  max: () => max,
  min: () => min,
  mul: () => mul2,
  multiply: () => multiply2,
  negate: () => negate,
  normalize: () => normalize,
  random: () => random,
  rotateX: () => rotateX2,
  rotateY: () => rotateY2,
  rotateZ: () => rotateZ2,
  round: () => round2,
  scale: () => scale2,
  scaleAndAdd: () => scaleAndAdd,
  set: () => set2,
  slerp: () => slerp,
  sqrDist: () => sqrDist,
  sqrLen: () => sqrLen,
  squaredDistance: () => squaredDistance,
  squaredLength: () => squaredLength,
  str: () => str2,
  sub: () => sub2,
  subtract: () => subtract2,
  transformMat3: () => transformMat3,
  transformMat4: () => transformMat4,
  transformQuat: () => transformQuat,
  zero: () => zero
});
function create3() {
  let out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
function clone2(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function length(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
function fromValues2(x, y, z) {
  let out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set2(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add2(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply2(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
function round2(out, a) {
  out[0] = round(a[0]);
  out[1] = round(a[1]);
  out[2] = round(a[2]);
  return out;
}
function scale2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale5) {
  out[0] = a[0] + b[0] * scale5;
  out[1] = a[1] + b[1] * scale5;
  out[2] = a[2] + b[2] * scale5;
  return out;
}
function distance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
function squaredDistance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return x * x + y * y + z * z;
}
function squaredLength(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return x * x + y * y + z * z;
}
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
function inverse(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  return out;
}
function normalize(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let len4 = x * x + y * y + z * z;
  if (len4 > 0) {
    len4 = 1 / Math.sqrt(len4);
  }
  out[0] = a[0] * len4;
  out[1] = a[1] * len4;
  out[2] = a[2] * len4;
  return out;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(out, a, b) {
  let ax = a[0], ay = a[1], az = a[2];
  let bx = b[0], by = b[1], bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
function lerp(out, a, b, t) {
  let ax = a[0];
  let ay = a[1];
  let az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
function slerp(out, a, b, t) {
  let angle2 = Math.acos(Math.min(Math.max(dot(a, b), -1), 1));
  let sinTotal = Math.sin(angle2);
  let ratioA = sinTotal > EPSILON ? Math.sin((1 - t) * angle2) / sinTotal : 1 - t;
  let ratioB = sinTotal > EPSILON ? Math.sin(t * angle2) / sinTotal : t;
  out[0] = ratioA * a[0] + ratioB * b[0];
  out[1] = ratioA * a[1] + ratioB * b[1];
  out[2] = ratioA * a[2] + ratioB * b[2];
  return out;
}
function hermite(out, a, b, c, d, t) {
  let factorTimes2 = t * t;
  let factor1 = factorTimes2 * (2 * t - 3) + 1;
  let factor2 = factorTimes2 * (t - 2) + t;
  let factor3 = factorTimes2 * (t - 1);
  let factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function bezier(out, a, b, c, d, t) {
  let inverseFactor = 1 - t;
  let inverseFactorTimesTwo = inverseFactor * inverseFactor;
  let factorTimes2 = t * t;
  let factor1 = inverseFactorTimesTwo * inverseFactor;
  let factor2 = 3 * t * inverseFactorTimesTwo;
  let factor3 = 3 * factorTimes2 * inverseFactor;
  let factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function random(out, scale5) {
  scale5 = scale5 === void 0 ? 1 : scale5;
  let r = RANDOM() * 2 * Math.PI;
  let z = RANDOM() * 2 - 1;
  let zScale = Math.sqrt(1 - z * z) * scale5;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale5;
  return out;
}
function transformMat4(out, a, m) {
  let x = a[0], y = a[1], z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
function transformMat3(out, a, m) {
  let x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
function transformQuat(out, a, q) {
  const qx2 = q[0], qy2 = q[1], qz2 = q[2], qw = q[3];
  const vx = a[0], vy = a[1], vz = a[2];
  let tx = qy2 * vz - qz2 * vy;
  let ty = qz2 * vx - qx2 * vz;
  let tz = qx2 * vy - qy2 * vx;
  tx = tx + tx;
  ty = ty + ty;
  tz = tz + tz;
  out[0] = vx + qw * tx + qy2 * tz - qz2 * ty;
  out[1] = vy + qw * ty + qz2 * tx - qx2 * tz;
  out[2] = vz + qw * tz + qx2 * ty - qy2 * tx;
  return out;
}
function rotateX2(out, a, b, rad) {
  let p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateY2(out, a, b, rad) {
  let p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateZ2(out, a, b, rad) {
  let p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function angle(a, b) {
  let ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)), cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
function str2(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals2(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals2(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2];
  let b0 = b[0], b1 = b[1], b2 = b[2];
  return (a0 === b0 || Math.abs(a0 - b0) <= EPSILON * Math.min(Number.MAX_VALUE, Math.max(1, Math.abs(a0), Math.abs(b0)))) && (a1 === b1 || Math.abs(a1 - b1) <= EPSILON * Math.min(Number.MAX_VALUE, Math.max(1, Math.abs(a1), Math.abs(b1)))) && (a2 === b2 || Math.abs(a2 - b2) <= EPSILON * Math.min(Number.MAX_VALUE, Math.max(1, Math.abs(a2), Math.abs(b2))));
}
var sub2 = subtract2;
var mul2 = multiply2;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = (function() {
  let vec = create3();
  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
})();

// ../../../glm/src/vec4.js
var vec4_exports = {};
__export(vec4_exports, {
  add: () => add3,
  ceil: () => ceil2,
  clone: () => clone3,
  copy: () => copy3,
  create: () => create4,
  cross: () => cross2,
  dist: () => dist2,
  distance: () => distance2,
  div: () => div2,
  divide: () => divide2,
  dot: () => dot2,
  equals: () => equals3,
  exactEquals: () => exactEquals3,
  floor: () => floor2,
  forEach: () => forEach2,
  fromValues: () => fromValues3,
  inverse: () => inverse2,
  len: () => len2,
  length: () => length2,
  lerp: () => lerp2,
  max: () => max2,
  min: () => min2,
  mul: () => mul3,
  multiply: () => multiply3,
  negate: () => negate2,
  normalize: () => normalize2,
  random: () => random2,
  round: () => round3,
  scale: () => scale3,
  scaleAndAdd: () => scaleAndAdd2,
  set: () => set3,
  sqrDist: () => sqrDist2,
  sqrLen: () => sqrLen2,
  squaredDistance: () => squaredDistance2,
  squaredLength: () => squaredLength2,
  str: () => str3,
  sub: () => sub3,
  subtract: () => subtract3,
  transformMat4: () => transformMat42,
  transformQuat: () => transformQuat2,
  zero: () => zero2
});
function create4() {
  let out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}
function clone3(a) {
  let out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function fromValues3(x, y, z, w) {
  let out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function copy3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function set3(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function add3(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function subtract3(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
function multiply3(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
function divide2(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
function ceil2(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
function floor2(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
function min2(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
function max2(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
function round3(out, a) {
  out[0] = round(a[0]);
  out[1] = round(a[1]);
  out[2] = round(a[2]);
  out[3] = round(a[3]);
  return out;
}
function scale3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function scaleAndAdd2(out, a, b, scale5) {
  out[0] = a[0] + b[0] * scale5;
  out[1] = a[1] + b[1] * scale5;
  out[2] = a[2] + b[2] * scale5;
  out[3] = a[3] + b[3] * scale5;
  return out;
}
function distance2(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  let w = b[3] - a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}
function squaredDistance2(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  let w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
function length2(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}
function squaredLength2(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  return x * x + y * y + z * z + w * w;
}
function negate2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
function inverse2(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  out[3] = 1 / a[3];
  return out;
}
function normalize2(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  let len4 = x * x + y * y + z * z + w * w;
  if (len4 > 0) {
    len4 = 1 / Math.sqrt(len4);
  }
  out[0] = x * len4;
  out[1] = y * len4;
  out[2] = z * len4;
  out[3] = w * len4;
  return out;
}
function dot2(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function cross2(out, u, v, w) {
  let A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
  let G = u[0];
  let H = u[1];
  let I = u[2];
  let J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
function lerp2(out, a, b, t) {
  let ax = a[0];
  let ay = a[1];
  let az = a[2];
  let aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
function random2(out, scale5) {
  scale5 = scale5 === void 0 ? 1 : scale5;
  var v1, v2, v3, v4;
  var s1, s2;
  var rand;
  rand = RANDOM();
  v1 = rand * 2 - 1;
  v2 = (4 * RANDOM() - 2) * Math.sqrt(rand * -rand + rand);
  s1 = v1 * v1 + v2 * v2;
  rand = RANDOM();
  v3 = rand * 2 - 1;
  v4 = (4 * RANDOM() - 2) * Math.sqrt(rand * -rand + rand);
  s2 = v3 * v3 + v4 * v4;
  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale5 * v1;
  out[1] = scale5 * v2;
  out[2] = scale5 * v3 * d;
  out[3] = scale5 * v4 * d;
  return out;
}
function transformMat42(out, a, m) {
  let x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
function transformQuat2(out, a, q) {
  const qx2 = q[0], qy2 = q[1], qz2 = q[2], qw = q[3];
  const vx = a[0], vy = a[1], vz = a[2];
  let tx = qy2 * vz - qz2 * vy;
  let ty = qz2 * vx - qx2 * vz;
  let tz = qx2 * vy - qy2 * vx;
  tx = tx + tx;
  ty = ty + ty;
  tz = tz + tz;
  out[0] = vx + qw * tx + qy2 * tz - qz2 * ty;
  out[1] = vy + qw * ty + qz2 * tx - qx2 * tz;
  out[2] = vz + qw * tz + qx2 * ty - qy2 * tx;
  out[3] = a[3];
  return out;
}
function zero2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}
function str3(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals3(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return (a0 === b0 || Math.abs(a0 - b0) <= EPSILON * Math.min(Number.MAX_VALUE, Math.max(1, Math.abs(a0), Math.abs(b0)))) && (a1 === b1 || Math.abs(a1 - b1) <= EPSILON * Math.min(Number.MAX_VALUE, Math.max(1, Math.abs(a1), Math.abs(b1)))) && (a2 === b2 || Math.abs(a2 - b2) <= EPSILON * Math.min(Number.MAX_VALUE, Math.max(1, Math.abs(a2), Math.abs(b2)))) && (a3 === b3 || Math.abs(a3 - b3) <= EPSILON * Math.min(Number.MAX_VALUE, Math.max(1, Math.abs(a3), Math.abs(b3))));
}
var sub3 = subtract3;
var mul3 = multiply3;
var div2 = divide2;
var dist2 = distance2;
var sqrDist2 = squaredDistance2;
var len2 = length2;
var sqrLen2 = squaredLength2;
var forEach2 = (function() {
  let vec = create4();
  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if (!stride) {
      stride = 4;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }
    return a;
  };
})();

// ../../../glm/src/quat.js
function create5() {
  let out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}
function identity2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  let s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
function getAxisAngle(out_axis, q) {
  let rad = Math.acos(Math.min(Math.max(q[3], -1), 1)) * 2;
  let s = Math.sin(rad / 2);
  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}
function getAngle(a, b) {
  let dotproduct = dot3(a, b);
  return Math.acos(Math.min(Math.max(2 * dotproduct * dotproduct - 1, -1), 1));
}
function multiply4(out, a, b) {
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = b[0], by = b[1], bz = b[2], bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
function rotateX3(out, a, rad) {
  rad *= 0.5;
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
function rotateY3(out, a, rad) {
  rad *= 0.5;
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let by = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
function rotateZ3(out, a, rad) {
  rad *= 0.5;
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bz = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
function calculateW(out, a) {
  let x = a[0], y = a[1], z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
  return out;
}
function exp(out, a) {
  let x = a[0], y = a[1], z = a[2], w = a[3];
  let r = Math.sqrt(x * x + y * y + z * z);
  let et = Math.exp(w);
  let s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
function ln(out, a) {
  let x = a[0], y = a[1], z = a[2], w = a[3];
  let r = Math.sqrt(x * x + y * y + z * z);
  let t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
function pow(out, a, b) {
  ln(out, a);
  scale4(out, out, b);
  exp(out, out);
  return out;
}
function slerp2(out, a, b, t) {
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = b[0], by = b[1], bz = b[2], bw = b[3];
  let omega, cosom, sinom, scale0, scale1;
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  if (cosom < 0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if (1 - cosom > EPSILON) {
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    scale0 = 1 - t;
    scale1 = t;
  }
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
function random3(out) {
  let u1 = RANDOM();
  let u2 = RANDOM();
  let u3 = RANDOM();
  let sqrt1MinusU1 = Math.sqrt(1 - u1);
  let sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
  return out;
}
function invert2(out, a) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let dot4 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  let invDot = dot4 ? 1 / dot4 : 0;
  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
function fromMat3(out, m) {
  let fTrace = m[0] + m[4] + m[8];
  let fRoot;
  if (fTrace > 0) {
    fRoot = Math.sqrt(fTrace + 1);
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    let i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    let j = (i + 1) % 3;
    let k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }
  return out;
}
function fromEuler(out, x, y, z, order = ANGLE_ORDER) {
  let halfToRad = Math.PI / 360;
  x *= halfToRad;
  z *= halfToRad;
  y *= halfToRad;
  let sx = Math.sin(x);
  let cx = Math.cos(x);
  let sy = Math.sin(y);
  let cy = Math.cos(y);
  let sz = Math.sin(z);
  let cz = Math.cos(z);
  switch (order) {
    case "xyz":
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;
    case "xzy":
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
    case "yxz":
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
    case "yzx":
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;
    case "zxy":
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;
    case "zyx":
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
    default:
      throw new Error("Unknown angle order " + order);
  }
  return out;
}
function str4(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
var clone4 = clone3;
var fromValues4 = fromValues3;
var copy4 = copy3;
var set4 = set3;
var add4 = add3;
var mul4 = multiply4;
var scale4 = scale3;
var dot3 = dot2;
var lerp3 = lerp2;
var length3 = length2;
var len3 = length3;
var squaredLength3 = squaredLength2;
var sqrLen3 = squaredLength3;
var normalize3 = normalize2;
var exactEquals4 = exactEquals3;
function equals4(a, b) {
  return Math.abs(dot2(a, b)) >= 1 - EPSILON;
}
var rotationTo = (function() {
  let tmpvec3 = create3();
  let xUnitVec3 = fromValues2(1, 0, 0);
  let yUnitVec3 = fromValues2(0, 1, 0);
  return function(out, a, b) {
    let dot4 = dot(a, b);
    if (dot4 < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 1e-6) cross(tmpvec3, yUnitVec3, a);
      normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot4 > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot4;
      return normalize3(out, out);
    }
  };
})();
var sqlerp = (function() {
  let temp1 = create5();
  let temp2 = create5();
  return function(out, a, b, c, d, t) {
    slerp2(temp1, a, d, t);
    slerp2(temp2, b, c, t);
    slerp2(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
})();
var setAxes = (function() {
  let matr = create();
  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize3(out, fromMat3(out, matr));
  };
})();

// src/private.ts
var P_ACTION_PLAYER = /* @__PURE__ */ Symbol("@iwer/action-player");
var P_ACTION_RECORDER = /* @__PURE__ */ Symbol("@iwer/action-recorder");
var P_ANCHOR = /* @__PURE__ */ Symbol("@iwer/xr-anchor");
var P_CONTROLLER = /* @__PURE__ */ Symbol("@iwer/xr-controller");
var P_DEVICE = /* @__PURE__ */ Symbol("@iwer/xr-device");
var P_HAND_INPUT = /* @__PURE__ */ Symbol("@iwer/xr-hand-input");
var P_TRACKED_INPUT = /* @__PURE__ */ Symbol("@iwer/xr-tracked-input");
var P_FRAME = /* @__PURE__ */ Symbol("@iwer/xr-frame");
var P_GAMEPAD = /* @__PURE__ */ Symbol("@iwer/gamepad");
var P_SYSTEM = /* @__PURE__ */ Symbol("@iwer/xr-system");
var P_INPUT_SOURCE = /* @__PURE__ */ Symbol("@iwer/xr-input-source");
var P_WEBGL_LAYER = /* @__PURE__ */ Symbol("@iwer/xr-webgl-layer");
var P_MESH = /* @__PURE__ */ Symbol("@iwer/xr-mesh");
var P_PLANE = /* @__PURE__ */ Symbol("@iwer/xr-plane");
var P_JOINT_POSE = /* @__PURE__ */ Symbol("@iwer/xr-joint-pose");
var P_POSE = /* @__PURE__ */ Symbol("@iwer/xr-pose");
var P_VIEWER_POSE = /* @__PURE__ */ Symbol("@iwer/xr-viewer-pose");
var P_RIGID_TRANSFORM = /* @__PURE__ */ Symbol("@iwer/xr-rigid-transform");
var P_RENDER_STATE = /* @__PURE__ */ Symbol("@iwer/xr-render-state");
var P_SESSION = /* @__PURE__ */ Symbol("@iwer/xr-session");
var P_JOINT_SPACE = /* @__PURE__ */ Symbol("@iwer/xr-joint-space");
var P_REF_SPACE = /* @__PURE__ */ Symbol("@iwer/xr-reference-space");
var P_SPACE = /* @__PURE__ */ Symbol("@iwer/xr-space");
var P_VIEW = /* @__PURE__ */ Symbol("@iwer/xr-view");
var P_VIEWPORT = /* @__PURE__ */ Symbol("@iwer/xr-viewport");
var P_RAY = /* @__PURE__ */ Symbol("@iwer/xr-ray");
var P_DEPTH_INFO = /* @__PURE__ */ Symbol("@iwer/xr-depth-info");
var P_HIT_TEST = /* @__PURE__ */ Symbol("@iwer/xr-hit-test");
var P_COMPOSITION_LAYER = /* @__PURE__ */ Symbol("@iwer/xr-composition-layer");
var P_PROJECTION_LAYER = /* @__PURE__ */ Symbol("@iwer/xr-projection-layer");
var P_WEBGL_BINDING = /* @__PURE__ */ Symbol("@iwer/xr-webgl-binding");
var P_HOST_INPUT = /* @__PURE__ */ Symbol("@iwer/xr-host-input");
var P_BOUNDED_REF_SPACE = /* @__PURE__ */ Symbol("@iwer/xr-bounded-reference-space");

// src/spaces/XRSpace.ts
var scratchTranslation = vec3_exports.create();
var _a;
var XRSpace = class extends (_a = EventTarget, P_SPACE, _a) {
  constructor(parentSpace, offsetMatrix) {
    super();
    const state = {
      parentSpace,
      offsetMatrix: offsetMatrix ? mat4_exports.clone(offsetMatrix) : mat4_exports.create(),
      emulated: true,
      tracked: true,
      // host mode's per-frame pose cache (host/frame.ts), made on first use;
      // present from the start so every space record keeps one shape
      hostPose: null
    };
    this[P_SPACE] = state;
  }
};
var GlobalSpace = class extends XRSpace {
  constructor() {
    super(void 0, mat4_exports.create());
  }
};
var XRSpaceUtils = class {
  // Update the position component of the offsetMatrix of a given XRSpace
  static updateOffsetPosition(space, position) {
    const offsetMatrix = space[P_SPACE].offsetMatrix;
    mat4_exports.fromTranslation(offsetMatrix, position);
  }
  // Update the rotation component of the offsetMatrix of a given XRSpace using a quaternion
  static updateOffsetQuaternion(space, quaternion) {
    const offsetMatrix = space[P_SPACE].offsetMatrix;
    mat4_exports.getTranslation(scratchTranslation, offsetMatrix);
    mat4_exports.fromRotationTranslation(offsetMatrix, quaternion, scratchTranslation);
  }
  // Update the offsetMatrix of a given XRSpace directly
  static updateOffsetMatrix(space, matrix) {
    const offsetMatrix = space[P_SPACE].offsetMatrix;
    mat4_exports.copy(offsetMatrix, matrix);
  }
  // Calculate the global offset matrix for a given XRSpace.
  //
  // Walks up the parent chain iteratively and folds each ancestor's offset
  // matrix into `globalOffset` (root-first). The previous recursive form
  // allocated a throwaway mat4 for every level of the hierarchy on every call,
  // which is hot: getPose -> getOffsetMatrix calls this twice per pose, many
  // times per frame. This version allocates nothing beyond the (small) chain
  // array and never shares module scratch, so callers that pass two distinct
  // output matrices (see getOffsetMatrix) stay correct.
  static calculateGlobalOffsetMatrix(space, globalOffset = mat4_exports.create()) {
    const chain = [];
    let current = space;
    while (current) {
      chain.push(current);
      current = current[P_SPACE].parentSpace;
    }
    mat4_exports.identity(globalOffset);
    for (let i = chain.length - 1; i >= 0; i--) {
      mat4_exports.multiply(globalOffset, globalOffset, chain[i][P_SPACE].offsetMatrix);
    }
    return globalOffset;
  }
  /**
   * Host mode: the global offset matrix into `out`, folding ancestors in from
   * the space upwards (no chain array). False when the space or an ancestor
   * is untracked this frame.
   */
  static calculateTrackedGlobalOffsetMatrix(space, out) {
    if (space[P_SPACE].tracked === false) {
      return false;
    }
    mat4_exports.copy(out, space[P_SPACE].offsetMatrix);
    let current = space[P_SPACE].parentSpace;
    while (current) {
      if (current[P_SPACE].tracked === false) {
        return false;
      }
      mat4_exports.multiply(out, current[P_SPACE].offsetMatrix, out);
      current = current[P_SPACE].parentSpace;
    }
    return true;
  }
};

// src/gamepad/Gamepad.ts
var GamepadMappingType = /* @__PURE__ */ ((GamepadMappingType2) => {
  GamepadMappingType2["None"] = "";
  GamepadMappingType2["Standard"] = "standard";
  GamepadMappingType2["XRStandard"] = "xr-standard";
  return GamepadMappingType2;
})(GamepadMappingType || {});
P_GAMEPAD;
var GamepadButton = class {
  constructor(type, eventTrigger) {
    this[P_GAMEPAD] = {
      type,
      eventTrigger,
      pressed: false,
      touched: false,
      value: 0,
      lastFrameValue: 0,
      lastFramePressed: false,
      pendingValue: null,
      thresholds: null,
      cancelRequested: false,
      cancelGeneration: 0
    };
  }
  get pressed() {
    return this[P_GAMEPAD].pressed;
  }
  get touched() {
    if (this[P_GAMEPAD].type === "manual") {
      return this[P_GAMEPAD].touched;
    } else {
      return this[P_GAMEPAD].touched || this.pressed;
    }
  }
  get value() {
    return this[P_GAMEPAD].value;
  }
};
var EmptyGamepadButton = class {
  constructor() {
    this.pressed = false;
    this.touched = false;
    this.value = 0;
  }
};
P_GAMEPAD;
var GamepadHapticActuator = class {
  constructor(type = "vibration") {
    this[P_GAMEPAD] = {
      type,
      lastPulse: null,
      onPulse: null
    };
  }
  get type() {
    return this[P_GAMEPAD].type;
  }
  pulse(value, duration) {
    this[P_GAMEPAD].lastPulse = {
      value,
      duration,
      startTime: performance.now()
    };
    const hook = this[P_GAMEPAD].onPulse;
    if (!hook) {
      return Promise.resolve(true);
    }
    const strength = Number(value);
    const length4 = Number(duration);
    const outcome = hook(
      strength >= 1 ? 1 : strength > 0 ? strength : 0,
      length4 > 0 ? length4 : 0
    );
    return outcome ?? Promise.resolve(true);
  }
  /**
   * Gamepad haptics `playEffect`. Both effect types become one pulse; its
   * strength is the stronger of the two rumble magnitudes, or full strength
   * when the page gives neither.
   */
  playEffect(type, params = {}) {
    if (type !== "dual-rumble" && type !== "trigger-rumble") {
      return Promise.reject(
        new DOMException(
          `'${type}' is not a haptic effect this actuator can play.`,
          "NotSupportedError"
        )
      );
    }
    const { strongMagnitude, weakMagnitude } = params;
    const strength = strongMagnitude === void 0 && weakMagnitude === void 0 ? 1 : Math.max(strongMagnitude ?? 0, weakMagnitude ?? 0);
    const done = "complete";
    return this.pulse(strength, params.duration ?? 0).then(() => done);
  }
  /** Stops any effect: a zero-length, zero-strength pulse to the hook. */
  reset() {
    const hook = this[P_GAMEPAD].onPulse;
    if (hook) {
      hook(0, 0);
    }
    return Promise.resolve("complete");
  }
};
P_GAMEPAD;
var Gamepad = class {
  constructor(gamepadConfig2, id = "", index = -1, numHapticActuators = 0) {
    this[P_GAMEPAD] = {
      id,
      index,
      connected: false,
      timestamp: performance.now(),
      mapping: gamepadConfig2.mapping,
      buttonsMap: {},
      buttonsSequence: [],
      axesMap: {},
      axesSequence: [],
      hapticActuators: Array.from(
        { length: Math.max(0, numHapticActuators) },
        () => new GamepadHapticActuator("vibration")
      ),
      buttonsView: [],
      axesView: [],
      axesResolvers: []
    };
    gamepadConfig2.buttons.forEach((buttonConfig) => {
      if (buttonConfig === null) {
        this[P_GAMEPAD].buttonsSequence.push(null);
      } else {
        this[P_GAMEPAD].buttonsSequence.push(buttonConfig.id);
        this[P_GAMEPAD].buttonsMap[buttonConfig.id] = new GamepadButton(
          buttonConfig.type,
          buttonConfig.eventTrigger ?? null
        );
      }
    });
    gamepadConfig2.axes.forEach((axisConfig) => {
      if (axisConfig === null) {
        this[P_GAMEPAD].axesSequence.push(null);
      } else {
        this[P_GAMEPAD].axesSequence.push(axisConfig.id + axisConfig.type);
        if (!this[P_GAMEPAD].axesMap[axisConfig.id]) {
          this[P_GAMEPAD].axesMap[axisConfig.id] = { x: 0, y: 0 };
        }
      }
    });
    this[P_GAMEPAD].buttonsView = this[P_GAMEPAD].buttonsSequence.map(
      (id2) => id2 === null ? new EmptyGamepadButton() : this[P_GAMEPAD].buttonsMap[id2]
    );
    const resolvers = this[P_GAMEPAD].axesSequence.map(
      (id2) => id2 === null ? null : {
        axisId: id2.substring(0, id2.length - 6),
        isY: id2.substring(id2.length - 6) === "y-axis"
      }
    );
    this[P_GAMEPAD].axesResolvers = resolvers;
    this[P_GAMEPAD].axesView = resolvers.includes(null) ? resolvers.map(() => null) : resolvers.map(() => 0.5).fill(0);
  }
  get id() {
    return this[P_GAMEPAD].id;
  }
  get index() {
    return this[P_GAMEPAD].index;
  }
  get connected() {
    return this[P_GAMEPAD].connected;
  }
  get timestamp() {
    return this[P_GAMEPAD].timestamp;
  }
  get mapping() {
    return this[P_GAMEPAD].mapping;
  }
  get axes() {
    const { axesView, axesResolvers, axesMap } = this[P_GAMEPAD];
    for (let i = 0; i < axesResolvers.length; i++) {
      const resolver = axesResolvers[i];
      if (resolver === null) {
        axesView[i] = null;
      } else {
        const axis = axesMap[resolver.axisId];
        axesView[i] = resolver.isY ? axis.y : axis.x;
      }
    }
    return axesView;
  }
  get buttons() {
    return this[P_GAMEPAD].buttonsView;
  }
  get hapticActuators() {
    return this[P_GAMEPAD].hapticActuators;
  }
  get vibrationActuator() {
    return this[P_GAMEPAD].hapticActuators[0] ?? null;
  }
};

// src/gamepad/button-edges.ts
var edgeLists = (trigger) => Object.freeze({
  press: Object.freeze([`${trigger}start`]),
  release: Object.freeze([trigger, `${trigger}end`]),
  cancel: Object.freeze([`${trigger}end`])
});
var SELECT_EVENT_TYPES = edgeLists("select");
var SQUEEZE_EVENT_TYPES = edgeLists("squeeze");
var NO_EVENT_TYPES = Object.freeze([]);
var edgeEventTypes = (edge, trigger) => {
  const lists = trigger === "select" ? SELECT_EVENT_TYPES : trigger === "squeeze" ? SQUEEZE_EVENT_TYPES : null;
  switch (edge) {
    case "press":
      return lists ? lists.press : [`${trigger}start`];
    case "release":
      return lists ? lists.release : [trigger, `${trigger}end`];
    case "cancel":
      return lists ? lists.cancel : [`${trigger}end`];
    default:
      return NO_EVENT_TYPES;
  }
};
var nextPressed = (button, pressed, value) => {
  const thresholds = button[P_GAMEPAD].thresholds;
  if (!thresholds) {
    return value > 0;
  }
  return pressed ? value > thresholds.release : value >= thresholds.press;
};
var writePendingValue = (button, value) => {
  button[P_GAMEPAD].pendingValue = value;
};
var cancelButton = (button) => {
  const state = button[P_GAMEPAD];
  if (state.lastFramePressed) {
    state.cancelRequested = true;
  }
  state.value = 0;
  state.pendingValue = null;
  state.pressed = false;
  state.cancelGeneration++;
};
var resetButton = (button) => {
  cancelButton(button);
  const state = button[P_GAMEPAD];
  state.cancelRequested = false;
  state.lastFramePressed = false;
  state.lastFrameValue = 0;
};
var writeImmediateValue = (button, value) => {
  const state = button[P_GAMEPAD];
  if (state.cancelRequested) {
    state.pendingValue = value;
    return;
  }
  const held = state.pressed || state.lastFramePressed;
  if (held && !nextPressed(button, true, value)) {
    cancelButton(button);
    state.value = value;
    return;
  }
  state.value = value;
  state.pendingValue = null;
  if (state.type !== "manual") {
    state.pressed = nextPressed(button, state.pressed, value);
  }
};
var advanceButton = (button) => {
  const state = button[P_GAMEPAD];
  const was = state.lastFramePressed;
  state.lastFrameValue = state.value;
  if (state.cancelRequested) {
    state.cancelRequested = false;
    state.lastFramePressed = false;
    return was ? "cancel" : null;
  }
  if (state.pendingValue !== null) {
    state.value = state.pendingValue;
    state.pendingValue = null;
  }
  if (state.type !== "manual") {
    state.pressed = nextPressed(button, state.pressed, state.value);
  }
  state.lastFramePressed = state.pressed;
  if (!was && state.pressed) {
    return "press";
  }
  if (was && !state.pressed) {
    return "release";
  }
  return null;
};

// src/utils/Math.ts
var Vector3 = class _Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.vec3 = vec3_exports.fromValues(x, y, z);
    this.tempVec3 = vec3_exports.create();
  }
  get x() {
    return this.vec3[0];
  }
  set x(value) {
    this.vec3[0] = value;
  }
  get y() {
    return this.vec3[1];
  }
  set y(value) {
    this.vec3[1] = value;
  }
  get z() {
    return this.vec3[2];
  }
  set z(value) {
    this.vec3[2] = value;
  }
  set(x, y, z) {
    vec3_exports.set(this.vec3, x, y, z);
    return this;
  }
  clone() {
    return new _Vector3(this.x, this.y, this.z);
  }
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }
  normalize() {
    vec3_exports.copy(this.tempVec3, this.vec3);
    vec3_exports.normalize(this.vec3, this.tempVec3);
    return this;
  }
  add(v) {
    vec3_exports.copy(this.tempVec3, this.vec3);
    vec3_exports.add(this.vec3, this.tempVec3, v.vec3);
    return this;
  }
  applyQuaternion(q) {
    vec3_exports.copy(this.tempVec3, this.vec3);
    vec3_exports.transformQuat(this.vec3, this.tempVec3, q.quat);
    return this;
  }
};
var Quaternion = class _Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.quat = quat_exports.fromValues(x, y, z, w);
    this.tempQuat = quat_exports.create();
  }
  get x() {
    return this.quat[0];
  }
  set x(value) {
    this.quat[0] = value;
  }
  get y() {
    return this.quat[1];
  }
  set y(value) {
    this.quat[1] = value;
  }
  get z() {
    return this.quat[2];
  }
  set z(value) {
    this.quat[2] = value;
  }
  get w() {
    return this.quat[3];
  }
  set w(value) {
    this.quat[3] = value;
  }
  set(x, y, z, w) {
    quat_exports.set(this.quat, x, y, z, w);
    return this;
  }
  clone() {
    return new _Quaternion(this.x, this.y, this.z, this.w);
  }
  copy(q) {
    quat_exports.set(this.quat, q.x, q.y, q.z, q.w);
    return this;
  }
  normalize() {
    quat_exports.copy(this.tempQuat, this.quat);
    quat_exports.normalize(this.quat, this.tempQuat);
    return this;
  }
  invert() {
    quat_exports.copy(this.tempQuat, this.quat);
    quat_exports.conjugate(this.quat, this.tempQuat);
    return this;
  }
  multiply(q) {
    quat_exports.copy(this.tempQuat, this.quat);
    quat_exports.multiply(this.quat, this.tempQuat, q.quat);
    return this;
  }
  setFromAxisAngle(axis, angle2) {
    quat_exports.setAxisAngle(this.quat, axis.vec3, angle2);
    return this;
  }
};

// src/input/XRInputSource.ts
var XRHandedness = /* @__PURE__ */ ((XRHandedness4) => {
  XRHandedness4["None"] = "none";
  XRHandedness4["Left"] = "left";
  XRHandedness4["Right"] = "right";
  return XRHandedness4;
})(XRHandedness || {});
var XRInputSourceArray = class extends Array {
};
P_INPUT_SOURCE;
var XRInputSource = class {
  constructor(handedness, targetRayMode, profiles, targetRaySpace, gamepad, gripSpace, hand) {
    this[P_INPUT_SOURCE] = {
      handedness,
      targetRayMode,
      targetRaySpace,
      gripSpace,
      profiles,
      gamepad,
      hand
    };
  }
  get handedness() {
    return this[P_INPUT_SOURCE].handedness;
  }
  get targetRayMode() {
    return this[P_INPUT_SOURCE].targetRayMode;
  }
  get targetRaySpace() {
    return this[P_INPUT_SOURCE].targetRaySpace;
  }
  get gripSpace() {
    return this[P_INPUT_SOURCE].gripSpace;
  }
  get profiles() {
    return this[P_INPUT_SOURCE].profiles;
  }
  get gamepad() {
    return this[P_INPUT_SOURCE].gamepad;
  }
  get hand() {
    return this[P_INPUT_SOURCE].hand;
  }
};

// src/events/XRInputSourceEvent.ts
var XRInputSourceEvent = class extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    if (!eventInitDict.frame) {
      throw new Error("XRInputSourceEventInit.frame is required");
    }
    if (!eventInitDict.inputSource) {
      throw new Error("XRInputSourceEventInit.inputSource is required");
    }
    this.frame = eventInitDict.frame;
    this.inputSource = eventInitDict.inputSource;
  }
};

// src/device/XRTrackedInput.ts
var DEFAULT_TRANSFORM = {
  ["left" /* Left */]: {
    position: new Vector3(-0.25, 1.5, -0.4),
    quaternion: new Quaternion()
  },
  ["right" /* Right */]: {
    position: new Vector3(0.25, 1.5, -0.4),
    quaternion: new Quaternion()
  },
  ["none" /* None */]: {
    position: new Vector3(0.25, 1.5, -0.4),
    quaternion: new Quaternion()
  }
};
var dispatchButtonEdge = (session, frame, inputSource, button) => {
  const edge = advanceButton(button);
  const trigger = button[P_GAMEPAD].eventTrigger;
  if (edge && trigger) {
    const types = edgeEventTypes(edge, trigger);
    for (let i = 0; i < types.length; i++) {
      session.dispatchEvent(
        new XRInputSourceEvent(types[i], { frame, inputSource })
      );
    }
  }
};
P_TRACKED_INPUT;
var XRTrackedInput = class {
  constructor(inputSource) {
    this[P_TRACKED_INPUT] = {
      inputSource,
      position: DEFAULT_TRANSFORM[inputSource.handedness].position.clone(),
      quaternion: DEFAULT_TRANSFORM[inputSource.handedness].quaternion.clone(),
      connected: true,
      lastFrameConnected: false,
      inputSourceChanged: true
    };
  }
  get position() {
    return this[P_TRACKED_INPUT].position;
  }
  get quaternion() {
    return this[P_TRACKED_INPUT].quaternion;
  }
  get inputSource() {
    return this[P_TRACKED_INPUT].inputSource;
  }
  get connected() {
    return this[P_TRACKED_INPUT].connected;
  }
  set connected(value) {
    this[P_TRACKED_INPUT].connected = value;
    const gamepad = this[P_TRACKED_INPUT].inputSource.gamepad;
    if (gamepad) {
      gamepad[P_GAMEPAD].connected = value;
    }
  }
  updateTargetRaySpace() {
    const targetRaySpace = this[P_TRACKED_INPUT].inputSource.targetRaySpace;
    mat4_exports.fromRotationTranslation(
      targetRaySpace[P_SPACE].offsetMatrix,
      this[P_TRACKED_INPUT].quaternion.quat,
      this[P_TRACKED_INPUT].position.vec3
    );
  }
  onFrameStart(frame) {
    this.updateTargetRaySpace();
    const session = frame.session;
    const inputSource = this[P_TRACKED_INPUT].inputSource;
    const buttons = inputSource.gamepad?.buttons;
    if (buttons) {
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button instanceof GamepadButton) {
          dispatchButtonEdge(session, frame, inputSource, button);
        }
      }
    }
    this[P_TRACKED_INPUT].inputSourceChanged = this.connected !== this[P_TRACKED_INPUT].lastFrameConnected;
    this[P_TRACKED_INPUT].lastFrameConnected = this.connected;
  }
};

// src/device/XRController.ts
var _a2;
var XRController = class extends (_a2 = XRTrackedInput, P_CONTROLLER, _a2) {
  constructor(controllerConfig, handedness, globalSpace) {
    if (!controllerConfig.layout[handedness]) {
      throw new DOMException("Handedness not supported", "InvalidStateError");
    }
    const targetRaySpace = new XRSpace(globalSpace);
    const gripSpace = controllerConfig.layout[handedness].gripOffsetMatrix ? new XRSpace(
      targetRaySpace,
      controllerConfig.layout[handedness].gripOffsetMatrix
    ) : void 0;
    const profiles = [
      controllerConfig.profileId,
      ...controllerConfig.fallbackProfileIds
    ];
    const inputSource = new XRInputSource(
      handedness,
      "tracked-pointer" /* TrackedPointer */,
      profiles,
      targetRaySpace,
      new Gamepad(
        controllerConfig.layout[handedness].gamepad,
        "",
        -1,
        controllerConfig.layout[handedness].numHapticActuators
      ),
      gripSpace
    );
    super(inputSource);
    this[P_CONTROLLER] = {
      profileId: controllerConfig.profileId,
      gamepadConfig: controllerConfig.layout[handedness].gamepad
    };
  }
  get gamepadConfig() {
    return this[P_CONTROLLER].gamepadConfig;
  }
  get profileId() {
    return this[P_CONTROLLER].profileId;
  }
  updateButtonValue(id, value) {
    if (!(value >= 0 && value <= 1)) {
      console.warn(`Out-of-range value ${value} provided for button ${id}.`);
      return;
    }
    const gamepadButton = this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap[id];
    if (gamepadButton) {
      if (gamepadButton[P_GAMEPAD].type === "binary" && value != 1 && value != 0) {
        console.warn(
          `Non-binary value ${value} provided for binary button ${id}.`
        );
        return;
      }
      writePendingValue(gamepadButton, value);
    } else {
      console.warn(`Current controller does not have button ${id}.`);
    }
  }
  /**
   * Set button value immediately (bypasses pending mechanism).
   * Use this for programmatic control where value should be readable
   * immediately. Releasing a pressed button this way cancels its action
   * (`selectend`/`squeezeend` without `select`/`squeeze`).
   */
  setButtonValueImmediate(id, value) {
    if (!(value >= 0 && value <= 1)) {
      console.warn(`Out-of-range value ${value} provided for button ${id}.`);
      return;
    }
    const gamepadButton = this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap[id];
    if (gamepadButton) {
      if (gamepadButton[P_GAMEPAD].type === "binary" && value != 1 && value != 0) {
        console.warn(
          `Non-binary value ${value} provided for binary button ${id}.`
        );
        return;
      }
      writeImmediateValue(gamepadButton, value);
    } else {
      console.warn(`Current controller does not have button ${id}.`);
    }
  }
  updateButtonTouch(id, touched) {
    const gamepadButton = this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap[id];
    if (gamepadButton) {
      gamepadButton[P_GAMEPAD].touched = touched;
    } else {
      console.warn(`Current controller does not have button ${id}.`);
    }
  }
  updateAxis(id, type, value) {
    if (value > 1 || value < -1) {
      console.warn(`Out-of-range value ${value} provided for ${id} axes.`);
      return;
    }
    const axesById = this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].axesMap[id];
    if (axesById) {
      if (type === "x-axis") {
        axesById.x = value;
      } else if (type === "y-axis") {
        axesById.y = value;
      }
    } else {
      console.warn(`Current controller does not have ${id} axes.`);
    }
  }
  updateAxes(id, x, y) {
    if (x > 1 || x < -1 || y > 1 || y < -1) {
      console.warn(
        `Out-of-range value x:${x}, y:${y} provided for ${id} axes.`
      );
      return;
    }
    const axesById = this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].axesMap[id];
    if (axesById) {
      axesById.x = x;
      axesById.y = y;
    } else {
      console.warn(`Current controller does not have ${id} axes.`);
    }
  }
  /**
   * Whether a button is pressed, including a value written this frame that
   * the next frame will apply (matching getButtonValue).
   */
  getButtonPressed(id) {
    const gamepadButton = this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap[id];
    if (!gamepadButton) {
      return false;
    }
    const pending = gamepadButton[P_GAMEPAD].pendingValue;
    return pending === null ? gamepadButton.pressed : nextPressed(gamepadButton, gamepadButton.pressed, pending);
  }
  /**
   * Get the current value of a button by id
   */
  getButtonValue(id) {
    const gamepadButton = this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap[id];
    if (gamepadButton) {
      return gamepadButton[P_GAMEPAD].pendingValue ?? gamepadButton.value;
    }
    return 0;
  }
  /**
   * Get the touched state of a button by id
   */
  getButtonTouched(id) {
    const gamepadButton = this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap[id];
    if (gamepadButton) {
      return gamepadButton.touched;
    }
    return false;
  }
  /**
   * Get the current axes values for a given id (e.g., 'thumbstick')
   */
  getAxes(id = "thumbstick") {
    const axesById = this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].axesMap[id];
    if (axesById) {
      return { x: axesById.x, y: axesById.y };
    }
    return { x: 0, y: 0 };
  }
};

// src/meshes/XRMesh.ts
P_MESH;
var XRMesh = class {
  constructor(nativeMesh, meshSpace, vertices, indices, semanticLabel) {
    this[P_MESH] = {
      nativeMesh,
      frame: void 0,
      meshSpace,
      vertices,
      indices,
      lastChangedTime: performance.now(),
      semanticLabel
    };
  }
  get meshSpace() {
    return this[P_MESH].meshSpace;
  }
  get vertices() {
    return this[P_MESH].vertices;
  }
  get indices() {
    return this[P_MESH].indices;
  }
  get lastChangedTime() {
    return this[P_MESH].lastChangedTime;
  }
  get semanticLabel() {
    return this[P_MESH].semanticLabel;
  }
};
var XRMeshSet = class extends Set {
};
var NativeMesh = class {
  constructor(transform, vertices, indices, semanticLabel) {
    this.transform = transform;
    this.vertices = vertices;
    this.indices = indices;
    this.semanticLabel = semanticLabel;
  }
};

// src/labels/labels.ts
var XRSemanticLabels = /* @__PURE__ */ ((XRSemanticLabels2) => {
  XRSemanticLabels2["Desk"] = "desk";
  XRSemanticLabels2["Couch"] = "couch";
  XRSemanticLabels2["Floor"] = "floor";
  XRSemanticLabels2["Ceiling"] = "ceiling";
  XRSemanticLabels2["Wall"] = "wall";
  XRSemanticLabels2["Door"] = "door";
  XRSemanticLabels2["Window"] = "window";
  XRSemanticLabels2["Table"] = "table";
  XRSemanticLabels2["Shelf"] = "shelf";
  XRSemanticLabels2["Bed"] = "bed";
  XRSemanticLabels2["Screen"] = "screen";
  XRSemanticLabels2["Lamp"] = "lamp";
  XRSemanticLabels2["Plant"] = "plant";
  XRSemanticLabels2["WallArt"] = "wall art";
  XRSemanticLabels2["GlobalMesh"] = "global mesh";
  XRSemanticLabels2["Other"] = "other";
  return XRSemanticLabels2;
})(XRSemanticLabels || {});

// src/planes/XRPlane.ts
var XREntityOrientation = {
  ["desk" /* Desk */]: "horizontal" /* Horizontal */,
  ["couch" /* Couch */]: "horizontal" /* Horizontal */,
  ["floor" /* Floor */]: "horizontal" /* Horizontal */,
  ["ceiling" /* Ceiling */]: "horizontal" /* Horizontal */,
  ["wall" /* Wall */]: "vertical" /* Vertical */,
  ["door" /* Door */]: "vertical" /* Vertical */,
  ["window" /* Window */]: "vertical" /* Vertical */,
  ["table" /* Table */]: "horizontal" /* Horizontal */,
  ["shelf" /* Shelf */]: "horizontal" /* Horizontal */,
  ["bed" /* Bed */]: "horizontal" /* Horizontal */,
  ["screen" /* Screen */]: "vertical" /* Vertical */,
  ["lamp" /* Lamp */]: "horizontal" /* Horizontal */,
  ["plant" /* Plant */]: "horizontal" /* Horizontal */,
  ["wall art" /* WallArt */]: "vertical" /* Vertical */
};
function planeOrientation(nativePlane, semanticLabel) {
  const q = nativePlane.transform?.orientation;
  if (q) {
    const normalY = 1 - 2 * (q.x * q.x + q.z * q.z);
    return Math.abs(normalY) >= Math.SQRT1_2 ? "horizontal" /* Horizontal */ : "vertical" /* Vertical */;
  }
  return semanticLabel ? XREntityOrientation[semanticLabel] : void 0;
}
P_PLANE;
var XRPlane = class {
  constructor(nativePlane, planeSpace, polygon, semanticLabel) {
    this[P_PLANE] = {
      nativePlane,
      frame: void 0,
      planeSpace,
      polygon,
      lastChangedTime: performance.now(),
      semanticLabel,
      orientation: planeOrientation(nativePlane, semanticLabel)
    };
  }
  get planeSpace() {
    return this[P_PLANE].planeSpace;
  }
  get polygon() {
    return this[P_PLANE].polygon;
  }
  get orientation() {
    return this[P_PLANE].orientation;
  }
  get lastChangedTime() {
    return this[P_PLANE].lastChangedTime;
  }
  get semanticLabel() {
    return this[P_PLANE].semanticLabel;
  }
};
var XRPlaneSet = class extends Set {
};
var NativePlane = class {
  constructor(transform, polygon, semanticLabel) {
    this.transform = transform;
    this.polygon = polygon;
    this.semanticLabel = semanticLabel;
  }
};

// src/depth/XRDepthInformation.ts
P_DEPTH_INFO;
var XRCPUDepthInformation = class {
  constructor(data, width, height, normDepthBufferFromNormView, rawValueToMeters, dataFormat) {
    this[P_DEPTH_INFO] = {
      data,
      width,
      height,
      normDepthBufferFromNormView,
      rawValueToMeters,
      dataFormat,
      view: dataFormat === "float32" ? new Float32Array(data) : new Uint8Array(data)
    };
  }
  get data() {
    return this[P_DEPTH_INFO].data;
  }
  get width() {
    return this[P_DEPTH_INFO].width;
  }
  get height() {
    return this[P_DEPTH_INFO].height;
  }
  get normDepthBufferFromNormView() {
    return this[P_DEPTH_INFO].normDepthBufferFromNormView;
  }
  get rawValueToMeters() {
    return this[P_DEPTH_INFO].rawValueToMeters;
  }
  get dataFormat() {
    return this[P_DEPTH_INFO].dataFormat;
  }
  getDepthInMeters(x, y) {
    const { width, height, rawValueToMeters, dataFormat, view } = this[P_DEPTH_INFO];
    if (x < 0 || x >= 1 || y < 0 || y >= 1) {
      throw new RangeError("Normalized coordinates must be in [0, 1) range.");
    }
    const col = Math.floor(x * width);
    const row = Math.floor(y * height);
    if (dataFormat === "float32") {
      const floatView = view;
      const index = row * width + col;
      return floatView[index] * rawValueToMeters;
    } else {
      const byteView = view;
      const index = (row * width + col) * 2;
      const rawValue = byteView[index] + byteView[index + 1] * 256;
      return rawValue * rawValueToMeters;
    }
  }
};

// src/depth/XRWebGLBinding.ts
var XRWebGLDepthInformation = class {
  constructor(texture, width, height, normDepthBufferFromNormView, rawValueToMeters, depthNear, depthFar, textureType, imageIndex) {
    this.texture = texture;
    this.width = width;
    this.height = height;
    this.normDepthBufferFromNormView = normDepthBufferFromNormView;
    this.rawValueToMeters = rawValueToMeters;
    this.depthNear = depthNear;
    this.depthFar = depthFar;
    this.textureType = textureType;
    this.imageIndex = imageIndex;
    this.isValid = true;
  }
};
var XRWebGLBinding = class {
  constructor(session, _context) {
    this._session = session;
  }
  getDepthInformation(view) {
    const frame = this._session[P_SESSION].activeFrame;
    if (!frame || !frame[P_FRAME].active) {
      throw new DOMException(
        "XRFrame access outside the callback that produced it is invalid.",
        "InvalidStateError"
      );
    }
    if (!this._session[P_SESSION].enabledFeatures.includes("depth-sensing")) {
      throw new DOMException(
        "depth-sensing feature is not enabled on this session.",
        "InvalidStateError"
      );
    }
    if (this._session[P_SESSION].depthSensingUsage !== "gpu-optimized") {
      throw new DOMException(
        "getDepthInformation on XRWebGLBinding requires gpu-optimized depth sensing usage.",
        "InvalidStateError"
      );
    }
    const eye = view[P_VIEW].eye;
    return frame[P_FRAME].gpuDepthDataMap.get(eye) ?? null;
  }
};

// src/anchors/XRAnchor.ts
P_ANCHOR;
var XRAnchor = class {
  constructor(anchorSpace, session) {
    this[P_ANCHOR] = {
      anchorSpace,
      session,
      deleted: false
    };
    session[P_SESSION].trackedAnchors.add(this);
  }
  get anchorSpace() {
    if (this[P_ANCHOR].deleted) {
      throw new DOMException(
        "XRAnchor has already been deleted.",
        "InvalidStateError"
      );
    }
    return this[P_ANCHOR].anchorSpace;
  }
  requestPersistentHandle() {
    return new Promise((resolve, reject) => {
      if (this[P_ANCHOR].deleted) {
        reject(
          new DOMException(
            "XRAnchor has already been deleted.",
            "InvalidStateError"
          )
        );
      } else {
        const persistentAnchors = this[P_ANCHOR].session[P_SESSION].persistentAnchors;
        for (const [uuid2, anchor] of persistentAnchors.entries()) {
          if (anchor === this) {
            resolve(uuid2);
            return;
          }
        }
        const uuid = crypto.randomUUID();
        XRAnchorUtils.createPersistentAnchor(
          this[P_ANCHOR].session,
          this,
          uuid
        );
        resolve(uuid);
      }
    });
  }
  delete() {
    if (this[P_ANCHOR].deleted) {
      return;
    }
    this[P_ANCHOR].anchorSpace = null;
    this[P_ANCHOR].deleted = true;
    this[P_ANCHOR].session[P_SESSION].trackedAnchors.delete(this);
  }
};
var XRAnchorSet = class extends Set {
};
var PersistentAnchorsStorageKey = "@immersive-web-emulation-runtime/persistent-anchors";
var XRAnchorUtils = class {
  static recoverPersistentAnchorsFromStorage(session) {
    const persistentAnchors = JSON.parse(
      localStorage.getItem(PersistentAnchorsStorageKey) || "{}"
    );
    const globalSpace = session[P_SESSION].device[P_DEVICE].globalSpace;
    Object.entries(persistentAnchors).forEach(([uuid, offsetMatrix]) => {
      const anchorSpace = new XRSpace(globalSpace, offsetMatrix);
      const anchor = new XRAnchor(anchorSpace, session);
      session[P_SESSION].persistentAnchors.set(uuid, anchor);
    });
  }
  static createPersistentAnchor(session, anchor, uuid) {
    session[P_SESSION].trackedAnchors.add(anchor);
    session[P_SESSION].persistentAnchors.set(uuid, anchor);
    const persistentAnchors = JSON.parse(
      localStorage.getItem(PersistentAnchorsStorageKey) || "{}"
    );
    persistentAnchors[uuid] = Array.from(
      anchor[P_ANCHOR].anchorSpace[P_SPACE].offsetMatrix
    );
    localStorage.setItem(
      PersistentAnchorsStorageKey,
      JSON.stringify(persistentAnchors)
    );
  }
};

// src/primitives/XRRigidTransform.ts
P_RIGID_TRANSFORM;
var _XRRigidTransform = class _XRRigidTransform {
  constructor(position, orientation) {
    const defaultPosition = vec3_exports.fromValues(0, 0, 0);
    const defaultOrientation = quat_exports.create();
    const resolvedPosition = position ? vec3_exports.fromValues(position.x, position.y, position.z) : defaultPosition;
    const resolvedOrientation = orientation ? quat_exports.normalize(
      quat_exports.create(),
      quat_exports.fromValues(
        orientation.x,
        orientation.y,
        orientation.z,
        orientation.w
      )
    ) : defaultOrientation;
    this[P_RIGID_TRANSFORM] = {
      matrix: mat4_exports.create(),
      position: resolvedPosition,
      orientation: resolvedOrientation,
      positionPoint: new DOMPointReadOnly(
        resolvedPosition[0],
        resolvedPosition[1],
        resolvedPosition[2],
        1
      ),
      orientationPoint: new DOMPointReadOnly(
        resolvedOrientation[0],
        resolvedOrientation[1],
        resolvedOrientation[2],
        resolvedOrientation[3]
      ),
      inverse: null,
      version: 0,
      positionVersion: 0,
      orientationVersion: 0,
      inverseVersion: 0
    };
    this.updateMatrix();
  }
  updateMatrix() {
    mat4_exports.fromRotationTranslation(
      this[P_RIGID_TRANSFORM].matrix,
      this[P_RIGID_TRANSFORM].orientation,
      this[P_RIGID_TRANSFORM].position
    );
  }
  get matrix() {
    return this[P_RIGID_TRANSFORM].matrix;
  }
  get position() {
    const state = this[P_RIGID_TRANSFORM];
    if (state.positionVersion !== state.version) {
      const p = mat4_exports.getTranslation(state.position, state.matrix);
      state.positionPoint = new DOMPointReadOnly(p[0], p[1], p[2], 1);
      state.positionVersion = state.version;
    }
    return state.positionPoint;
  }
  get orientation() {
    const state = this[P_RIGID_TRANSFORM];
    if (state.orientationVersion !== state.version) {
      const q = mat4_exports.getRotation(state.orientation, state.matrix);
      state.orientationPoint = new DOMPointReadOnly(q[0], q[1], q[2], q[3]);
      state.orientationVersion = state.version;
    }
    return state.orientationPoint;
  }
  get inverse() {
    const state = this[P_RIGID_TRANSFORM];
    if (state.inverse && state.inverseVersion !== state.version) {
      const target = state.inverse;
      if (!mat4_exports.invert(target[P_RIGID_TRANSFORM].matrix, state.matrix)) {
        throw new Error("Matrix is not invertible.");
      }
      const targetState = target[P_RIGID_TRANSFORM];
      targetState.version++;
      targetState.inverseVersion = targetState.version;
      state.inverseVersion = state.version;
    }
    if (!state.inverse) {
      const invMatrix = mat4_exports.create();
      if (!mat4_exports.invert(invMatrix, state.matrix)) {
        throw new Error("Matrix is not invertible.");
      }
      let invPosition = vec3_exports.create();
      mat4_exports.getTranslation(invPosition, invMatrix);
      let invOrientation = quat_exports.create();
      mat4_exports.getRotation(invOrientation, invMatrix);
      state.inverse = new _XRRigidTransform(
        new DOMPointReadOnly(invPosition[0], invPosition[1], invPosition[2], 1),
        new DOMPointReadOnly(
          invOrientation[0],
          invOrientation[1],
          invOrientation[2],
          invOrientation[3]
        )
      );
      state.inverse[P_RIGID_TRANSFORM].inverse = this;
      state.inverseVersion = state.version;
    }
    return state.inverse;
  }
};
var XRRigidTransform = _XRRigidTransform;

// src/hittest/XRRay.ts
var DOMPointReadOnly2 = class {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
};
P_RAY;
var XRRay = class {
  constructor(origin, direction) {
    const _origin = { x: 0, y: 0, z: 0, w: 1 };
    const _direction = { x: 0, y: 0, z: -1, w: 0 };
    if (origin instanceof XRRigidTransform) {
      const transform = origin;
      const matrix = transform.matrix;
      const originVec4 = vec4_exports.set(
        vec4_exports.create(),
        _origin.x,
        _origin.y,
        _origin.z,
        _origin.w
      );
      const directionVec4 = vec4_exports.set(
        vec4_exports.create(),
        _direction.x,
        _direction.y,
        _direction.z,
        _direction.w
      );
      vec4_exports.transformMat4(originVec4, originVec4, matrix);
      vec4_exports.transformMat4(directionVec4, directionVec4, matrix);
      _origin.x = originVec4[0];
      _origin.y = originVec4[1];
      _origin.z = originVec4[2];
      _origin.w = originVec4[3];
      _direction.x = directionVec4[0];
      _direction.y = directionVec4[1];
      _direction.z = directionVec4[2];
      _direction.w = directionVec4[3];
    } else {
      if (origin) {
        _origin.x = origin.x;
        _origin.y = origin.y;
        _origin.z = origin.z;
        _origin.w = origin.w;
      }
      if (direction) {
        if (direction.x === 0 && direction.y === 0 && direction.z === 0 || direction.w !== 0) {
          throw new DOMException(
            "Invalid direction value to construct XRRay",
            "TypeError"
          );
        }
        _direction.x = direction.x;
        _direction.y = direction.y;
        _direction.z = direction.z;
        _direction.w = direction.w;
      }
    }
    const length4 = Math.sqrt(
      _direction.x * _direction.x + _direction.y * _direction.y + _direction.z * _direction.z
    ) || 1;
    _direction.x = _direction.x / length4;
    _direction.y = _direction.y / length4;
    _direction.z = _direction.z / length4;
    this[P_RAY] = {
      origin: new DOMPointReadOnly2(
        _origin.x,
        _origin.y,
        _origin.z,
        _origin.w
      ),
      direction: new DOMPointReadOnly2(
        _direction.x,
        _direction.y,
        _direction.z,
        _direction.w
      ),
      matrix: null
    };
  }
  get origin() {
    return this[P_RAY].origin;
  }
  get direction() {
    return this[P_RAY].direction;
  }
  get matrix() {
    if (this[P_RAY].matrix) {
      return this[P_RAY].matrix;
    }
    const z = vec3_exports.set(vec3_exports.create(), 0, 0, -1);
    const origin = vec3_exports.set(
      vec3_exports.create(),
      this[P_RAY].origin.x,
      this[P_RAY].origin.y,
      this[P_RAY].origin.z
    );
    const direction = vec3_exports.set(
      vec3_exports.create(),
      this[P_RAY].direction.x,
      this[P_RAY].direction.y,
      this[P_RAY].direction.z
    );
    const axis = vec3_exports.cross(vec3_exports.create(), direction, z);
    const cosAngle = vec3_exports.dot(direction, z);
    const rotation = mat4_exports.create();
    if (cosAngle > -1 && cosAngle < 1) {
      mat4_exports.fromRotation(rotation, Math.acos(cosAngle), axis);
    } else if (cosAngle === -1) {
      mat4_exports.fromRotation(
        rotation,
        Math.acos(cosAngle),
        vec3_exports.set(vec3_exports.create(), 1, 0, 0)
      );
    } else {
      mat4_exports.identity(rotation);
    }
    const translation = mat4_exports.fromTranslation(mat4_exports.create(), origin);
    const matrix = mat4_exports.multiply(mat4_exports.create(), translation, rotation);
    this[P_RAY].matrix = new Float32Array(matrix);
    return this[P_RAY].matrix;
  }
};

// src/hittest/XRHitTest.ts
P_HIT_TEST;
var XRHitTestSource = class {
  constructor(session, options) {
    this[P_HIT_TEST] = {
      session,
      space: options.space,
      offsetRay: options.offsetRay ?? new XRRay(),
      entityTypes: options.entityTypes
    };
  }
  cancel() {
    this[P_HIT_TEST].session[P_SESSION].hitTestSources.delete(this);
  }
};
P_HIT_TEST;
var XRHitTestResult = class {
  constructor(frame, offsetSpace) {
    this[P_HIT_TEST] = { frame, offsetSpace };
  }
  getPose(baseSpace) {
    return this[P_HIT_TEST].frame.getPose(this[P_HIT_TEST].offsetSpace, baseSpace) ?? void 0;
  }
  createAnchor() {
    return this[P_HIT_TEST].frame.createAnchor(
      new XRRigidTransform(),
      this[P_HIT_TEST].offsetSpace
    );
  }
};

// src/events/XRInputSourcesChangeEvent.ts
var XRInputSourcesChangeEvent = class extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    if (!eventInitDict.session) {
      throw new Error("XRInputSourcesChangeEventInit.session is required");
    }
    if (!eventInitDict.added) {
      throw new Error("XRInputSourcesChangeEventInit.added is required");
    }
    if (!eventInitDict.removed) {
      throw new Error("XRInputSourcesChangeEventInit.removed is required");
    }
    this.session = eventInitDict.session;
    this.added = eventInitDict.added;
    this.removed = eventInitDict.removed;
  }
};

// src/spaces/XRReferenceSpace.ts
var XRReferenceSpaceType = /* @__PURE__ */ ((XRReferenceSpaceType2) => {
  XRReferenceSpaceType2["Viewer"] = "viewer";
  XRReferenceSpaceType2["Local"] = "local";
  XRReferenceSpaceType2["LocalFloor"] = "local-floor";
  XRReferenceSpaceType2["BoundedFloor"] = "bounded-floor";
  XRReferenceSpaceType2["Unbounded"] = "unbounded";
  return XRReferenceSpaceType2;
})(XRReferenceSpaceType || {});
var _a3, _b;
var XRReferenceSpace = class _XRReferenceSpace extends (_b = XRSpace, _a3 = P_REF_SPACE, _b) {
  constructor(type, parentSpace, offsetMatrix) {
    super(parentSpace, offsetMatrix);
    this[_a3] = {
      type: null,
      onreset: null,
      onOffsetSpace: null
    };
    this[P_REF_SPACE].type = type;
  }
  get onreset() {
    return this[P_REF_SPACE].onreset;
  }
  set onreset(callback) {
    if (this[P_REF_SPACE].onreset) {
      this.removeEventListener(
        "reset",
        this[P_REF_SPACE].onreset
      );
    }
    this[P_REF_SPACE].onreset = callback;
    if (callback) {
      this.addEventListener("reset", callback);
    }
  }
  // Create a new XRReferenceSpace with an offset from the current space
  getOffsetReferenceSpace(originOffset) {
    const offsetMatrix = originOffset instanceof XRRigidTransform ? originOffset.matrix : originOffset;
    return linkOffsetSpace(
      this,
      new _XRReferenceSpace(this[P_REF_SPACE].type, this, offsetMatrix)
    );
  }
};
function linkOffsetSpace(parent, offsetSpace) {
  const watcher = parent[P_REF_SPACE].onOffsetSpace;
  if (watcher) {
    offsetSpace[P_REF_SPACE].onOffsetSpace = watcher;
    watcher(offsetSpace);
  }
  return offsetSpace;
}

// src/session/XRRenderState.ts
var NO_LAYERS = Object.freeze([]);
P_RENDER_STATE;
var XRRenderState = class {
  constructor(init = {}, oldState) {
    const previous = oldState?.[P_RENDER_STATE];
    let baseLayer = init.baseLayer ?? oldState?.baseLayer ?? null;
    let layers = previous?.layers;
    if (init.layers) {
      layers = Object.freeze([...init.layers]);
      if (layers.length > 0 && init.baseLayer === void 0) {
        baseLayer = null;
      }
    } else if (init.layers === void 0 && init.baseLayer && layers !== void 0) {
      layers = NO_LAYERS;
    }
    this[P_RENDER_STATE] = {
      // Use nullish coalescing so a legitimate 0 (e.g.
      // inlineVerticalFieldOfView=0) is not replaced by the default.
      depthNear: init.depthNear ?? oldState?.depthNear ?? 0.1,
      depthFar: init.depthFar ?? oldState?.depthFar ?? 1e3,
      inlineVerticalFieldOfView: init.inlineVerticalFieldOfView ?? oldState?.inlineVerticalFieldOfView ?? null,
      baseLayer,
      layers,
      // carried over from the previous state until a new value is given
      passthroughFullyObscured: init.passthroughFullyObscured ?? previous?.passthroughFullyObscured
    };
  }
  get depthNear() {
    return this[P_RENDER_STATE].depthNear;
  }
  get depthFar() {
    return this[P_RENDER_STATE].depthFar;
  }
  get inlineVerticalFieldOfView() {
    return this[P_RENDER_STATE].inlineVerticalFieldOfView;
  }
  get baseLayer() {
    return this[P_RENDER_STATE].baseLayer;
  }
  get layers() {
    return this[P_RENDER_STATE].layers;
  }
  get passthroughFullyObscured() {
    return this[P_RENDER_STATE].passthroughFullyObscured;
  }
};

// src/events/XRSessionEvent.ts
var XRSessionEvent = class extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    if (!eventInitDict.session) {
      throw new Error("XRSessionEventInit.session is required");
    }
    this.session = eventInitDict.session;
  }
};

// src/views/XRView.ts
P_VIEW;
var XRView = class {
  constructor(eye, projectionMatrix, transform, session) {
    this[P_VIEW] = {
      eye,
      projectionMatrix,
      transform,
      recommendedViewportScale: null,
      requestedViewportScale: 1,
      session
    };
  }
  get eye() {
    return this[P_VIEW].eye;
  }
  get projectionMatrix() {
    return this[P_VIEW].projectionMatrix;
  }
  get transform() {
    return this[P_VIEW].transform;
  }
  get recommendedViewportScale() {
    return this[P_VIEW].recommendedViewportScale;
  }
  requestViewportScale(scale5) {
    if (scale5 === null || scale5 <= 0 || scale5 > 1) {
      console.warn("Invalid scale value. Scale must be > 0 and <= 1.");
      return;
    }
    this[P_VIEW].requestedViewportScale = scale5;
  }
};

// src/pose/XRPose.ts
P_POSE;
var XRPose = class {
  constructor(transform, emulatedPosition = false, linearVelocity = void 0, angularVelocity = void 0) {
    this[P_POSE] = {
      transform,
      emulatedPosition,
      linearVelocity,
      angularVelocity
    };
  }
  get transform() {
    return this[P_POSE].transform;
  }
  get emulatedPosition() {
    return this[P_POSE].emulatedPosition;
  }
  get linearVelocity() {
    return this[P_POSE].linearVelocity;
  }
  get angularVelocity() {
    return this[P_POSE].angularVelocity;
  }
};

// src/pose/XRJointPose.ts
var _a4;
var XRJointPose = class extends (_a4 = XRPose, P_JOINT_POSE, _a4) {
  constructor(transform, radius, emulatedPosition = false, linearVelocity = void 0, angularVelocity = void 0) {
    super(transform, emulatedPosition, linearVelocity, angularVelocity);
    this[P_JOINT_POSE] = { radius };
  }
  get radius() {
    return this[P_JOINT_POSE].radius;
  }
};

// src/pose/XRViewerPose.ts
var _a5;
var XRViewerPose = class extends (_a5 = XRPose, P_VIEWER_POSE, _a5) {
  constructor(transform, views, emulatedPosition = false, linearVelocity = void 0, angularVelocity = void 0) {
    super(transform, emulatedPosition, linearVelocity, angularVelocity);
    this[P_VIEWER_POSE] = {
      views: Object.freeze(views)
    };
  }
  get views() {
    return this[P_VIEWER_POSE].views;
  }
};

// src/host/affine.ts
function finite(x) {
  return x - x === 0;
}
function isAffine(m) {
  return m[3] === 0 && m[7] === 0 && m[11] === 0 && m[15] === 1;
}
function multiplyInto(out, at, a, b) {
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[4];
  const a11 = a[5];
  const a12 = a[6];
  const a13 = a[7];
  const a20 = a[8];
  const a21 = a[9];
  const a22 = a[10];
  const a23 = a[11];
  const a30 = a[12];
  const a31 = a[13];
  const a32 = a[14];
  const a33 = a[15];
  if (a03 === 0 && a13 === 0 && a23 === 0 && a33 === 1 && b[3] === 0 && b[7] === 0 && b[11] === 0 && b[15] === 1 && // written in place below, so `out` must not be an input (the general
  // product reads each column of `b` before writing it)
  out !== a && out !== b) {
    let sum = 0;
    for (let c = 0; c < 12; c += 4) {
      const b02 = b[c];
      const b12 = b[c + 1];
      const b22 = b[c + 2];
      const x2 = b02 * a00 + b12 * a10 + b22 * a20;
      const y2 = b02 * a01 + b12 * a11 + b22 * a21;
      const z2 = b02 * a02 + b12 * a12 + b22 * a22;
      out[at + c] = x2;
      out[at + c + 1] = y2;
      out[at + c + 2] = z2;
      out[at + c + 3] = 0;
      sum += x2 + y2 + z2;
    }
    const b0 = b[12];
    const b1 = b[13];
    const b2 = b[14];
    const x = b0 * a00 + b1 * a10 + b2 * a20 + a30;
    const y = b0 * a01 + b1 * a11 + b2 * a21 + a31;
    const z = b0 * a02 + b1 * a12 + b2 * a22 + a32;
    out[at + 12] = x;
    out[at + 13] = y;
    out[at + 14] = z;
    out[at + 15] = 1;
    if (finite(sum + x + y + z)) {
      return;
    }
  }
  generalMultiply(out, at, a, b);
}
function generalMultiply(out, at, a, b) {
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[4];
  const a11 = a[5];
  const a12 = a[6];
  const a13 = a[7];
  const a20 = a[8];
  const a21 = a[9];
  const a22 = a[10];
  const a23 = a[11];
  const a30 = a[12];
  const a31 = a[13];
  const a32 = a[14];
  const a33 = a[15];
  for (let c = 0; c < 16; c += 4) {
    const b0 = b[c];
    const b1 = b[c + 1];
    const b2 = b[c + 2];
    const b3 = b[c + 3];
    out[at + c] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[at + c + 1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[at + c + 2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[at + c + 3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  }
}
function invertAffine(out, m) {
  if (!isAffine(m)) {
    return mat4_exports.invert(out, m) !== null;
  }
  const a00 = m[0];
  const a01 = m[1];
  const a02 = m[2];
  const a10 = m[4];
  const a11 = m[5];
  const a12 = m[6];
  const a20 = m[8];
  const a21 = m[9];
  const a22 = m[10];
  const tx = m[12];
  const ty = m[13];
  const tz = m[14];
  const c00 = a22 * a11 - a12 * a21;
  const c10 = -a22 * a10 + a12 * a20;
  const c20 = a21 * a10 - a11 * a20;
  let det = a00 * c00 + a01 * c10 + a02 * c20;
  if (!det) {
    return false;
  }
  det = 1 / det;
  const r00 = c00 * det;
  const r01 = (-a22 * a01 + a02 * a21) * det;
  const r02 = (a12 * a01 - a02 * a11) * det;
  const r10 = c10 * det;
  const r11 = (a22 * a00 - a02 * a20) * det;
  const r12 = (-a12 * a00 + a02 * a10) * det;
  const r20 = c20 * det;
  const r21 = (-a21 * a00 + a01 * a20) * det;
  const r22 = (a11 * a00 - a01 * a10) * det;
  const t0 = -(r00 * tx + r10 * ty + r20 * tz);
  const t1 = -(r01 * tx + r11 * ty + r21 * tz);
  const t2 = -(r02 * tx + r12 * ty + r22 * tz);
  if (!finite(t0 + t1 + t2)) {
    return mat4_exports.invert(out, m) !== null;
  }
  out[0] = r00;
  out[1] = r01;
  out[2] = r02;
  out[3] = 0;
  out[4] = r10;
  out[5] = r11;
  out[6] = r12;
  out[7] = 0;
  out[8] = r20;
  out[9] = r21;
  out[10] = r22;
  out[11] = 0;
  out[12] = t0;
  out[13] = t1;
  out[14] = t2;
  out[15] = 1;
  return true;
}

// src/host/frame.ts
function stocked(pose) {
  return { pose, rigid: pose.transform[P_RIGID_TRANSFORM], writtenIn: -1 };
}
var PoseBook = class {
  constructor() {
    /** Pose epoch the answers belong to. */
    this.epoch = -1;
    /** Base spaces asked about in `epoch`, and the answer for each. */
    this.bases = [];
    this.answers = [];
    this.count = 0;
    this.stock = [];
  }
};
function answerIndex(book, base, epoch) {
  const count = book.count;
  if (book.epoch !== epoch) {
    for (let i = 0; i < count; i++) {
      book.bases[i] = null;
      book.answers[i] = null;
    }
    book.count = 0;
    book.epoch = epoch;
    return -1;
  }
  const bases = book.bases;
  for (let i = 0; i < count; i++) {
    if (bases[i] === base) {
      return i;
    }
  }
  return -1;
}
function recordAnswer(book, base, answer) {
  const at = book.count++;
  book.bases[at] = base;
  book.answers[at] = answer;
}
var ViewerBook = class {
  constructor() {
    this.answeredEpoch = -1;
    this.answer = null;
    this.session = null;
    this.stock = [];
  }
};
var SpacePoseCache = class {
  constructor() {
    /** Pose epoch `world` was computed for. */
    this.worldEpoch = -1;
    /** False when the space (or an ancestor) is untracked in `worldEpoch`. */
    this.worldOk = false;
    /** `world` is the identity (a root space that was never moved). */
    this.worldIsIdentity = false;
    /** Pose epoch `inverse` was computed for (as a base space). */
    this.inverseEpoch = -1;
    this.inverseOk = false;
    this.inverse = mat4_exports.create();
    /** The parent space and its cache, as last resolved. */
    this.parent = null;
    this.parentCache = null;
    // results of getPose / getJointPose for this space, and of
    // getViewerPose(this reference space); made on first use
    this.poses = null;
    this.joints = null;
    this.viewer = null;
    this.own = mat4_exports.create();
    this.world = this.own;
  }
};
function cacheOf(space) {
  return cacheIn(space[P_SPACE]);
}
function cacheIn(state) {
  let cache = state.hostPose;
  if (cache === null || cache === void 0) {
    cache = new SpacePoseCache();
    state.hostPose = cache;
  }
  return cache;
}
function reusable(stock, frameId) {
  for (let i = 0; i < stock.length; i++) {
    if (stock[i].writtenIn <= frameId - 2) {
      return stock[i];
    }
  }
  return null;
}
function isIdentity(m) {
  return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 0 && m[4] === 0 && m[5] === 1 && m[6] === 0 && m[7] === 0 && m[8] === 0 && m[9] === 0 && m[10] === 1 && m[11] === 0 && m[12] === 0 && m[13] === 0 && m[14] === 0 && m[15] === 1;
}
var poseEpoch = 0;
function invalidateHostPoses() {
  poseEpoch++;
}
function worldOf(space, epoch) {
  const state = space[P_SPACE];
  return currentWorld(state, cacheIn(state), epoch);
}
function currentWorld(state, cache, epoch) {
  if (cache.worldEpoch === epoch) {
    return cache.worldOk ? cache : null;
  }
  return resolveWorld(state, cache, epoch);
}
function parentCacheOf(cache, parent) {
  let parentCache = cache.parentCache;
  if (cache.parent !== parent || parentCache === null) {
    parentCache = cacheOf(parent);
    cache.parent = parent;
    cache.parentCache = parentCache;
  }
  return parentCache;
}
function settle(state, cache, above, epoch) {
  cache.worldEpoch = epoch;
  const ok = (above === null || above.worldOk) && state.tracked !== false;
  cache.worldOk = ok;
  if (ok) {
    const offset = state.offsetMatrix;
    if (above === null) {
      cache.world = offset;
      cache.worldIsIdentity = isIdentity(offset);
    } else {
      if (above.worldIsIdentity) {
        cache.world = offset;
      } else {
        multiplyInto(cache.own, 0, above.world, offset);
        cache.world = cache.own;
      }
      cache.worldIsIdentity = false;
    }
  }
  return ok;
}
function resolveWorld(state, cache, epoch) {
  const parent = state.parentSpace;
  let above = null;
  if (parent !== void 0) {
    above = parentCacheOf(cache, parent);
    if (above.worldEpoch !== epoch) {
      const parentState = parent[P_SPACE];
      if (parentState.parentSpace !== void 0) {
        return resolveChain(state, cache, epoch);
      }
      settle(parentState, above, null, epoch);
    }
  }
  return settle(state, cache, above, epoch) ? cache : null;
}
var pendingStates = [];
var pendingCaches = [];
function resolveChain(state, cache, epoch) {
  let count = 0;
  let s = state;
  let c = cache;
  let above = null;
  for (; ; ) {
    pendingStates[count] = s;
    pendingCaches[count] = c;
    count++;
    const parent = s.parentSpace;
    if (parent === void 0) {
      break;
    }
    const parentCache = parentCacheOf(c, parent);
    if (parentCache.worldEpoch === epoch) {
      above = parentCache;
      break;
    }
    s = parent[P_SPACE];
    c = parentCache;
  }
  for (let i = count - 1; i >= 0; i--) {
    const ch = pendingCaches[i];
    settle(pendingStates[i], ch, above, epoch);
    pendingStates[i] = null;
    pendingCaches[i] = null;
    above = ch;
  }
  return cache.worldOk ? cache : null;
}
function inverseOf(base, epoch) {
  const cache = cacheOf(base);
  if (cache.inverseEpoch !== epoch) {
    cache.inverseEpoch = epoch;
    cache.inverseOk = worldOf(base, epoch) !== null && invertAffine(cache.inverse, cache.world);
  }
  return cache.inverseOk ? cache.inverse : null;
}
function writeTransform(rigid, a, b) {
  multiplyInto(rigid.matrix, 0, a, b);
  rigid.version++;
}
function hostGetPose(frame, space, baseSpace) {
  const frameId = frame[P_FRAME].id;
  const state = space[P_SPACE];
  const cache = cacheIn(state);
  let book = cache.poses;
  if (book === null) {
    book = cache.poses = new PoseBook();
  }
  const epoch = poseEpoch;
  const asked = answerIndex(book, baseSpace, epoch);
  if (asked >= 0) {
    return book.answers[asked];
  }
  const toBase = inverseOf(baseSpace, epoch);
  if (toBase === null || currentWorld(state, cache, epoch) === null) {
    recordAnswer(book, baseSpace, null);
    return null;
  }
  let entry = reusable(book.stock, frameId);
  if (entry === null) {
    entry = stocked(new XRPose(new XRRigidTransform(), false));
    book.stock.push(entry);
  }
  writeTransform(entry.rigid, toBase, cache.world);
  entry.writtenIn = frameId;
  recordAnswer(book, baseSpace, entry.pose);
  return entry.pose;
}
function hostGetJointPose(frame, joint, baseSpace) {
  const frameId = frame[P_FRAME].id;
  const state = joint[P_SPACE];
  const cache = cacheIn(state);
  let book = cache.joints;
  if (book === null) {
    book = cache.joints = new PoseBook();
  }
  const epoch = poseEpoch;
  const asked = answerIndex(book, baseSpace, epoch);
  if (asked >= 0) {
    return book.answers[asked];
  }
  const toBase = inverseOf(baseSpace, epoch);
  if (toBase === null || currentWorld(state, cache, epoch) === null) {
    recordAnswer(book, baseSpace, null);
    return null;
  }
  let entry = reusable(book.stock, frameId);
  if (entry === null) {
    entry = stocked(new XRJointPose(new XRRigidTransform(), 0, false));
    book.stock.push(entry);
  }
  const pose = entry.pose;
  writeTransform(entry.rigid, toBase, cache.world);
  pose[P_JOINT_POSE].radius = joint[P_JOINT_SPACE].radius;
  entry.writtenIn = frameId;
  recordAnswer(book, baseSpace, pose);
  return pose;
}
function eyeFor(index, count) {
  if (count === 1) {
    return "none" /* None */;
  }
  return index === 0 ? "left" /* Left */ : "right" /* Right */;
}
function reusableViewerPose(stock, frameId, viewCount) {
  for (let i = 0; i < stock.length; i++) {
    const entry = stock[i];
    if (entry.writtenIn <= frameId - 2 && entry.pose[P_VIEWER_POSE].views.length === viewCount) {
      return entry;
    }
  }
  return null;
}
function hostGetViewerPose(frame, referenceSpace) {
  const frameState = frame[P_FRAME];
  const session = frameState.session;
  const sessionState = session[P_SESSION];
  const views = sessionState.host.views;
  const frameId = frameState.id;
  const viewCount = views.count;
  const epoch = poseEpoch;
  const refCache = cacheOf(referenceSpace);
  let book = refCache.viewer;
  if (book === null) {
    book = refCache.viewer = new ViewerBook();
  }
  if (book.session !== session) {
    book.session = session;
    book.answeredEpoch = -1;
    book.answer = null;
    const stock = book.stock;
    while (stock.length > 0) {
      stock.pop();
    }
  }
  const answer = book.answer;
  if (book.answeredEpoch === epoch && (answer === null || answer[P_VIEWER_POSE].views.length === viewCount)) {
    return answer;
  }
  book.answeredEpoch = epoch;
  book.answer = null;
  const toBase = inverseOf(referenceSpace, epoch);
  if (toBase === null) {
    return null;
  }
  const viewer = worldOf(sessionState.device.viewerSpace, epoch);
  if (viewer === null) {
    return null;
  }
  let entry = reusableViewerPose(book.stock, frameId, viewCount);
  if (entry === null) {
    const made = [];
    for (let i = 0; i < viewCount; i++) {
      made.push(
        new XRView(
          eyeFor(i, viewCount),
          views.projection[i],
          new XRRigidTransform(),
          session
        )
      );
    }
    entry = stocked(new XRViewerPose(new XRRigidTransform(), made, false));
    book.stock.push(entry);
  }
  const pose = entry.pose;
  writeTransform(entry.rigid, toBase, viewer.world);
  const poseViews = pose[P_VIEWER_POSE].views;
  for (let i = 0; i < viewCount; i++) {
    const viewState = poseViews[i][P_VIEW];
    writeTransform(
      viewState.transform[P_RIGID_TRANSFORM],
      toBase,
      views.world[i]
    );
    viewState.projectionMatrix = views.projection[i];
  }
  entry.writtenIn = frameId;
  book.answer = pose;
  return pose;
}
function hostFillPoses(spaces, baseSpace, transforms) {
  const epoch = poseEpoch;
  const toBase = inverseOf(baseSpace, epoch);
  let complete = true;
  for (let i = 0, at = 0; i < spaces.length; i++, at += 16) {
    const located = toBase === null ? null : worldOf(spaces[i], epoch);
    if (located === null) {
      transforms.fill(NaN, at, at + 16);
      complete = false;
    } else {
      multiplyInto(transforms, at, toBase, located.world);
    }
  }
  return complete;
}

// src/frameloop/XRFrame.ts
var spaceGlobalMatrix = mat4_exports.create();
var baseSpaceGlobalMatrix = mat4_exports.create();
var baseSpaceGlobalMatrixInverse = mat4_exports.create();
var scratchPosition = vec3_exports.create();
var scratchOrientation = quat_exports.create();
var INLINE_EYES = ["none" /* None */];
var STEREO_EYES = ["left" /* Left */, "right" /* Right */];
var getOffsetMatrix = (offsetMatrix, space, baseSpace) => {
  XRSpaceUtils.calculateGlobalOffsetMatrix(space, spaceGlobalMatrix);
  XRSpaceUtils.calculateGlobalOffsetMatrix(baseSpace, baseSpaceGlobalMatrix);
  mat4_exports.invert(baseSpaceGlobalMatrixInverse, baseSpaceGlobalMatrix);
  mat4_exports.multiply(offsetMatrix, baseSpaceGlobalMatrixInverse, spaceGlobalMatrix);
};
var isUntracked = (space) => space[P_SPACE]?.tracked === false;
P_FRAME;
var XRFrame = class {
  constructor(session, id, active, animationFrame, predictedDisplayTime) {
    this[P_FRAME] = {
      session,
      id,
      active,
      animationFrame,
      predictedDisplayTime,
      tempMat4: mat4_exports.create(),
      detectedPlanes: new XRPlaneSet(),
      detectedMeshes: new XRMeshSet(),
      trackedAnchors: session[P_SESSION].frameTrackedAnchors,
      hitTestResultsMap: /* @__PURE__ */ new Map(),
      depthDataMap: /* @__PURE__ */ new Map(),
      gpuDepthDataMap: /* @__PURE__ */ new Map()
    };
  }
  get session() {
    return this[P_FRAME].session;
  }
  get predictedDisplayTime() {
    return this[P_FRAME].predictedDisplayTime;
  }
  getPose(space, baseSpace) {
    if (!this[P_FRAME].active) {
      throw new DOMException(
        "XRFrame access outside the callback that produced it is invalid.",
        "InvalidStateError"
      );
    }
    if (this[P_FRAME].session[P_SESSION].host) {
      return hostGetPose(this, space, baseSpace);
    }
    if (isUntracked(space) || isUntracked(baseSpace)) {
      return null;
    }
    getOffsetMatrix(this[P_FRAME].tempMat4, space, baseSpace);
    mat4_exports.getTranslation(scratchPosition, this[P_FRAME].tempMat4);
    mat4_exports.getRotation(scratchOrientation, this[P_FRAME].tempMat4);
    return new XRPose(
      new XRRigidTransform(
        {
          x: scratchPosition[0],
          y: scratchPosition[1],
          z: scratchPosition[2],
          w: 1
        },
        {
          x: scratchOrientation[0],
          y: scratchOrientation[1],
          z: scratchOrientation[2],
          w: scratchOrientation[3]
        }
      ),
      space[P_SPACE].emulated
    );
  }
  // Host mode answers null when the viewer pose is unknown this frame; the
  // declared type stays non-null for existing callers.
  getViewerPose(referenceSpace) {
    if (!this[P_FRAME].animationFrame) {
      throw new DOMException(
        "getViewerPose can only be called on XRFrame objects passed to XRSession.requestAnimationFrame callbacks.",
        "InvalidStateError"
      );
    }
    const session = this[P_FRAME].session;
    if (session[P_SESSION].host) {
      if (!this[P_FRAME].active) {
        throw new DOMException(
          "XRFrame access outside the callback that produced it is invalid.",
          "InvalidStateError"
        );
      }
      return hostGetViewerPose(this, referenceSpace);
    }
    const device = session[P_SESSION].device;
    const pose = this.getPose(device.viewerSpace, referenceSpace);
    const eyes = session[P_SESSION].mode === "inline" ? INLINE_EYES : STEREO_EYES;
    const views = [];
    for (let i = 0; i < eyes.length; i++) {
      const eye = eyes[i];
      const viewSpace = device.viewSpaces[eye];
      const viewPose = this.getPose(viewSpace, referenceSpace);
      const projectionMatrix = session[P_SESSION].getProjectionMatrix(eye);
      const view = new XRView(
        eye,
        new Float32Array(projectionMatrix),
        viewPose.transform,
        session
      );
      views.push(view);
    }
    return new XRViewerPose(pose.transform, views, false);
  }
  getJointPose(joint, baseSpace) {
    if (this[P_FRAME].session[P_SESSION].host) {
      if (!this[P_FRAME].active) {
        throw new DOMException(
          "XRFrame access outside the callback that produced it is invalid.",
          "InvalidStateError"
        );
      }
      return hostGetJointPose(this, joint, baseSpace);
    }
    const xrPose = this.getPose(joint, baseSpace);
    if (!xrPose) {
      return null;
    }
    const radius = joint[P_JOINT_SPACE].radius;
    return new XRJointPose(xrPose.transform, radius, false);
  }
  fillJointRadii(jointSpaces, radii) {
    if (!Array.isArray(jointSpaces)) {
      jointSpaces = Array.from(jointSpaces);
    }
    if (!this[P_FRAME].active) {
      throw new DOMException(
        "XRFrame access outside the callback that produced it is invalid.",
        "InvalidStateError"
      );
    }
    if (jointSpaces.length > radii.length) {
      throw new DOMException(
        "The length of jointSpaces is larger than the number of elements in radii",
        "TypeError"
      );
    }
    let allValid = true;
    for (let offset = 0; offset < jointSpaces.length; offset++) {
      if (!jointSpaces[offset][P_JOINT_SPACE].radius || isUntracked(jointSpaces[offset])) {
        radii[offset] = NaN;
        allValid = false;
      } else {
        radii[offset] = jointSpaces[offset][P_JOINT_SPACE].radius;
      }
    }
    return allValid;
  }
  fillPoses(spaces, baseSpace, transforms) {
    if (this[P_FRAME].session[P_SESSION].host && Array.isArray(spaces)) {
      if (!this[P_FRAME].active) {
        throw new DOMException(
          "XRFrame access outside the callback that produced it is invalid.",
          "InvalidStateError"
        );
      }
      if (spaces.length * 16 > transforms.length) {
        throw new DOMException(
          "The length of spaces multiplied by 16 is larger than the number of elements in transforms",
          "TypeError"
        );
      }
      return hostFillPoses(spaces, baseSpace, transforms);
    }
    spaces = Array.from(spaces);
    if (!this[P_FRAME].active) {
      throw new DOMException(
        "XRFrame access outside the callback that produced it is invalid.",
        "InvalidStateError"
      );
    }
    if (spaces.length * 16 > transforms.length) {
      throw new DOMException(
        "The length of spaces multiplied by 16 is larger than the number of elements in transforms",
        "TypeError"
      );
    }
    if (this[P_FRAME].session[P_SESSION].host) {
      return hostFillPoses(spaces, baseSpace, transforms);
    }
    let allValid = true;
    const baseUntracked = isUntracked(baseSpace);
    const tempMat4 = this[P_FRAME].tempMat4;
    for (let i = 0; i < spaces.length; i++) {
      const space = spaces[i];
      if (baseUntracked || isUntracked(space)) {
        transforms.fill(NaN, i * 16, i * 16 + 16);
        allValid = false;
        continue;
      }
      getOffsetMatrix(tempMat4, space, baseSpace);
      transforms.set(tempMat4, i * 16);
    }
    return allValid;
  }
  get detectedPlanes() {
    if (!this[P_FRAME].active) {
      throw new DOMException(
        "XRFrame access outside the callback that produced it is invalid.",
        "InvalidStateError"
      );
    }
    return this[P_FRAME].detectedPlanes;
  }
  get detectedMeshes() {
    if (!this[P_FRAME].active) {
      throw new DOMException(
        "XRFrame access outside the callback that produced it is invalid.",
        "InvalidStateError"
      );
    }
    return this[P_FRAME].detectedMeshes;
  }
  get trackedAnchors() {
    if (!this[P_FRAME].active) {
      throw new DOMException(
        "XRFrame access outside the callback that produced it is invalid.",
        "InvalidStateError"
      );
    }
    return this[P_FRAME].trackedAnchors;
  }
  createAnchor(pose, space) {
    return new Promise((resolve, reject) => {
      if (!this[P_FRAME].active) {
        reject(
          new DOMException(
            "XRFrame access outside the callback that produced it is invalid.",
            "InvalidStateError"
          )
        );
      } else {
        const globalSpace = this[P_FRAME].session[P_SESSION].device[P_DEVICE].globalSpace;
        const tempSpace = new XRSpace(space, pose.matrix);
        const globalOffsetMatrix = XRSpaceUtils.calculateGlobalOffsetMatrix(tempSpace);
        const anchorSpace = new XRSpace(globalSpace, globalOffsetMatrix);
        const anchor = new XRAnchor(anchorSpace, this[P_FRAME].session);
        this[P_FRAME].session[P_SESSION].trackedAnchors.add(anchor);
        this[P_FRAME].session[P_SESSION].newAnchors.set(anchor, {
          resolve,
          reject
        });
      }
    });
  }
  getHitTestResults(hitTestSource) {
    if (!this[P_FRAME].active) {
      throw new DOMException(
        "XRFrame access outside the callback that produced it is invalid.",
        "InvalidStateError"
      );
    } else if (!this[P_FRAME].hitTestResultsMap.has(hitTestSource)) {
      throw new DOMException(
        "Requested hit test results are not available for current frame.",
        "InvalidStateError"
      );
    } else {
      return [...this[P_FRAME].hitTestResultsMap.get(hitTestSource)];
    }
  }
  getDepthInformation(view) {
    if (!this[P_FRAME].active) {
      throw new DOMException(
        "XRFrame access outside the callback that produced it is invalid.",
        "InvalidStateError"
      );
    }
    if (!this[P_FRAME].session[P_SESSION].enabledFeatures.includes(
      "depth-sensing"
    )) {
      throw new DOMException(
        "depth-sensing feature is not enabled on this session.",
        "InvalidStateError"
      );
    }
    return this[P_FRAME].depthDataMap.get(view[P_VIEW].eye) ?? null;
  }
};

// src/utils/arrays.ts
function truncateArray(list, length4) {
  while (list.length > length4) {
    list.pop();
  }
}

// src/host/frame-loop.ts
var idle = () => {
};
var XRHostFrameLoop = class {
  constructor(session) {
    // XRFrame objects with the frame id each was last handed out for
    this.frames = [];
    // registrations whose callbacks have run, ready for requestAnimationFrame
    this.freeRequests = [];
    // the registrations taken for the frame being run
    this.running = [];
    this.session = session;
  }
  /** A registration for requestAnimationFrame, recycled when possible. */
  request(handle, callback) {
    const recycled = this.freeRequests.pop();
    if (!recycled) {
      return { handle, callback, cancelled: false };
    }
    recycled.handle = handle;
    recycled.callback = callback;
    recycled.cancelled = false;
    return recycled;
  }
  /**
   * An inactive XRFrame for frame `frameId`. A page may keep the XRFrame of
   * one frame and compare it with the next one, so the object used for the
   * previous frame is never handed out again right away.
   */
  frameFor(frameId, time) {
    let frame;
    for (let i = 0; i < this.frames.length; i++) {
      if (this.frames[i][P_FRAME].id < frameId - 1) {
        frame = this.frames[i];
        break;
      }
    }
    if (!frame) {
      frame = new XRFrame(this.session, frameId, false, true, time);
      this.frames.push(frame);
    }
    const state = frame[P_FRAME];
    state.id = frameId;
    state.predictedDisplayTime = time;
    return frame;
  }
  /**
   * Makes `frame` the session's active frame. It stays active until
   * `runCallbacks` returns (WebXR: an XRFrame is only usable while the
   * callbacks it was made for run). Input sources are updated in between.
   */
  activate(frame) {
    frame[P_FRAME].active = true;
    this.session[P_SESSION].activeFrame = frame;
  }
  /**
   * Runs the callbacks registered before this point, in registration order,
   * passing each the (already activated) `frame`, then deactivates it.
   * Callbacks registered while they run wait for the next frame; cancelled
   * ones are skipped; an exception from one goes to `report` and the others
   * still run.
   */
  runCallbacks(frame, time, report) {
    const s = this.session[P_SESSION];
    const pending = s.frameCallbacks;
    const running = this.running;
    for (let i = 0; i < pending.length; i++) {
      running.push(pending[i]);
    }
    truncateArray(pending, 0);
    s.currentFrameCallbacks = running;
    try {
      for (let i = 0; i < running.length; i++) {
        const request = running[i];
        if (request.cancelled) {
          continue;
        }
        try {
          request.callback(time, frame);
        } catch (error) {
          report(error);
        }
      }
    } finally {
      frame[P_FRAME].active = false;
      s.activeFrame = null;
      s.currentFrameCallbacks = null;
      for (let i = 0; i < running.length; i++) {
        running[i].callback = idle;
        this.freeRequests.push(running[i]);
      }
      truncateArray(running, 0);
    }
  }
};

// src/host/frame-rate.ts
var RATE_CONFIRMATION_FRAME_LIMIT = 90;
var XRHostFrameRate = class {
  constructor(backend) {
    /** Current rate in Hz, 0 while unknown. */
    this.current = 0;
    /** Rates the page may request (empty: any rate may be tried). */
    this.supported = new Float32Array(0);
    this.waiting = [];
    this.framesWaited = 0;
    this.backend = backend;
  }
  /** Takes the rates and the current rate from the swapchain answer. */
  adopt(supported, current) {
    if (supported.length > 0) {
      this.supported = supported;
    }
    if (current > 0) {
      this.current = current;
    }
  }
  /**
   * The page's request. `ended` is the session's ended flag. Resolves once a
   * new rate has been observed (see `observe`), or after
   * RATE_CONFIRMATION_FRAME_LIMIT frames without one.
   */
  request(rate, ended) {
    if (ended) {
      return Promise.reject(
        new DOMException("XRSession has already ended.", "InvalidStateError")
      );
    }
    const target = Number(rate);
    if (this.supported.length > 0 && !this.supported.includes(target)) {
      return Promise.reject(
        new DOMException(
          "Requested frame rate not supported.",
          "InvalidStateError"
        )
      );
    }
    if (target === this.current) {
      return Promise.resolve();
    }
    let accepted;
    try {
      accepted = Boolean(this.backend.requestFrameRate?.(target));
    } catch (error) {
      console.warn(
        "updateTargetFrameRate: the host threw while switching rates",
        error
      );
      accepted = false;
    }
    if (!accepted) {
      return Promise.reject(
        new DOMException(
          `The host did not switch the display to ${target} Hz.`,
          "InvalidStateError"
        )
      );
    }
    return new Promise((resolve, reject) => {
      if (this.waiting.length === 0) {
        this.framesWaited = 0;
      }
      this.waiting.push({ resolve, reject });
    });
  }
  /**
   * Records a rate reported by the host (in a frame or an event). Returns
   * true when it differs from the known rate; the caller must then dispatch
   * `frameratechange` and call `settle()`, in that order.
   */
  observe(rate) {
    if (!(rate > 0) || rate === this.current) {
      return false;
    }
    this.current = rate;
    return true;
  }
  /** Resolves every outstanding request. */
  settle() {
    if (this.waiting.length === 0) {
      return;
    }
    const waiting = this.waiting;
    this.waiting = [];
    for (const request of waiting) {
      request.resolve();
    }
  }
  /** Counts one host frame against outstanding requests. */
  countFrame() {
    if (this.waiting.length > 0 && ++this.framesWaited > RATE_CONFIRMATION_FRAME_LIMIT) {
      this.settle();
    }
  }
  /**
   * The session ended: WebXR's "shut down the session" rejects promises
   * still outstanding with InvalidStateError.
   */
  abandon() {
    const waiting = this.waiting;
    this.waiting = [];
    for (const request of waiting) {
      request.reject(
        new DOMException(
          "The XRSession ended before the frame rate changed.",
          "InvalidStateError"
        )
      );
    }
  }
};

// src/host/output.ts
var RGBA8 = 32856;
var STARTUP_FOVEATION = [
  ["high-fixed-foveation-level", 1],
  ["medium-fixed-foveation-level", 2 / 3],
  ["low-fixed-foveation-level", 1 / 3]
];
var NO_BOUNDS = Object.freeze([]);
function stageOutline(answer) {
  if (answer.hasStage !== true) {
    return NO_BOUNDS;
  }
  const width = Number(answer.stageWidth);
  const depth = Number(answer.stageDepth);
  if (!(width > 0) || !(depth > 0)) {
    return NO_BOUNDS;
  }
  const right = width * 0.5;
  const back = depth * 0.5;
  const corner = (x, z) => new DOMPointReadOnly(x, 0, z, 1);
  return Object.freeze([
    corner(right, back),
    corner(-right, back),
    corner(-right, -back),
    corner(right, -back)
  ]);
}
function premultipliesAlpha(context) {
  if (!context || typeof context.getContextAttributes !== "function") {
    return true;
  }
  try {
    const attributes = context.getContextAttributes();
    return !attributes || attributes.premultipliedAlpha !== false;
  } catch {
    return true;
  }
}
var XRHostOutput = class {
  constructor(backend, config) {
    /** Null until the first layer creates it, and again after the session ends. */
    this.swapchain = null;
    /** Current fixed foveation, 0..1. */
    this.foveation = 0;
    /** Refresh rates the swapchain answer listed (empty until then). */
    this.offeredRates = new Float32Array(0);
    /** Refresh rate the swapchain answer reported, 0 if none. */
    this.initialRate = 0;
    this.passthroughVisible = true;
    this.colorTexture = null;
    this.colorTextureFetched = false;
    this.outline = NO_BOUNDS;
    this.backend = backend;
    this.config = config;
  }
  /** The startup foveation the session's features ask for, or null. */
  startupFoveation() {
    const features = this.config.enabledFeatures;
    for (const [feature, level] of STARTUP_FOVEATION) {
      if (features.includes(feature)) {
        return level;
      }
    }
    return null;
  }
  /**
   * Returns the session's swapchain, asking the host for it if this is the
   * first layer. A later layer always gets the existing swapchain, even if it
   * would have asked for a different texture type.
   */
  acquire(request) {
    if (this.swapchain) {
      if (this.swapchain.arraySize !== request.arraySize) {
        console.warn(
          `IWER host mode: this session already presents through a ${this.swapchain.arraySize}-layer swapchain; the new layer (${request.arraySize} layer(s) requested) will share it.`
        );
      }
      return this.swapchain;
    }
    const scale5 = Number(request.scale);
    const options = {
      arraySize: request.arraySize,
      scale: scale5 > 0 ? scale5 : 1,
      format: request.colorFormat || RGBA8
    };
    if (this.config.immersiveAR) {
      options.passthrough = true;
      if (!premultipliesAlpha(request.context)) {
        options.unpremultiplied = true;
      }
    }
    if (this.config.wantsScene) {
      options.scene = true;
    }
    const startup = this.startupFoveation();
    if (startup !== null) {
      options.foveation = startup;
    }
    const created = this.backend.beginSwapchain(options);
    if (!created) {
      throw new DOMException(
        "IWER host mode: the host could not create a swapchain for this layer.",
        "OperationError"
      );
    }
    this.swapchain = created;
    this.outline = stageOutline(created);
    if (created.rates && created.rates.length > 0) {
      this.offeredRates = Float32Array.from(created.rates);
    }
    if (created.rate !== void 0 && created.rate > 0) {
      this.initialRate = created.rate;
    }
    if (typeof created.foveation === "number") {
      this.foveation = created.foveation;
    } else if (startup !== null) {
      this.foveation = startup;
    }
    return created;
  }
  /** Sets fixed foveation: clamped to 0..1, NaN treated as 0. */
  setFoveation(level) {
    const value = Number(level);
    const clamped = value > 1 ? 1 : value > 0 ? value : 0;
    this.foveation = clamped;
    this.backend.setFixedFoveation?.(clamped);
  }
  /** The one colour texture projection sub-images report (fetched lazily). */
  opaqueColorTexture() {
    if (!this.colorTextureFetched) {
      this.colorTextureFetched = true;
      this.colorTexture = this.backend.getOpaqueColorTexture?.() ?? null;
    }
    return this.colorTexture;
  }
  /** immersive-ar: tells the host about a passthrough change, only on change. */
  syncPassthrough(fullyObscured) {
    if (!this.config.immersiveAR) {
      return;
    }
    const visible = fullyObscured !== true;
    if (visible !== this.passthroughVisible) {
      this.passthroughVisible = visible;
      this.backend.setPassthroughVisible?.(visible);
    }
  }
  /** Whether the host said it has no stage (unknown before the first layer). */
  get lacksStage() {
    return this.swapchain !== null && this.swapchain.hasStage === false;
  }
  /**
   * `boundsGeometry` of bounded-floor (see `stageOutline`). Nothing before
   * the first layer has brought the host's answer, nor after the session;
   * the same frozen array in between.
   */
  stageBounds() {
    return this.outline;
  }
  /** Forgets the swapchain once the session is over. */
  release() {
    this.swapchain = null;
    this.outline = NO_BOUNDS;
  }
};

// src/host/math.ts
var HOST_VIEW_STRIDE = 11;
function hostPerspective(out, angleLeft, angleRight, angleUp, angleDown, near, far) {
  const xMin = Math.tan(angleLeft);
  const xMax = Math.tan(angleRight);
  const yMin = Math.tan(angleDown);
  const yMax = Math.tan(angleUp);
  const invSpanX = 1 / (xMax - xMin);
  const invSpanY = 1 / (yMax - yMin);
  for (let i = 0; i < 16; i++) {
    out[i] = 0;
  }
  out[0] = 2 * invSpanX;
  out[5] = 2 * invSpanY;
  out[8] = (xMax + xMin) * invSpanX;
  out[9] = (yMax + yMin) * invSpanY;
  out[11] = -1;
  if (far === Infinity) {
    out[10] = -1;
    out[14] = -2 * near;
  } else {
    const invDepth = 1 / (near - far);
    out[10] = (far + near) * invDepth;
    out[14] = 2 * far * near * invDepth;
  }
  return out;
}
function hostPoseMatrix(out, src, offset) {
  let qx2 = src[offset + 3];
  let qy2 = src[offset + 4];
  let qz2 = src[offset + 5];
  let qw = src[offset + 6];
  let len4 = qx2 * qx2 + qy2 * qy2 + qz2 * qz2 + qw * qw;
  if (len4 > 0 && Math.abs(len4 - 1) > 1e-6) {
    len4 = 1 / Math.sqrt(len4);
    qx2 *= len4;
    qy2 *= len4;
    qz2 *= len4;
    qw *= len4;
  } else if (len4 === 0) {
    qw = 1;
  }
  const x2 = qx2 + qx2;
  const y2 = qy2 + qy2;
  const z2 = qz2 + qz2;
  const xx = qx2 * x2;
  const xy = qx2 * y2;
  const xz = qx2 * z2;
  const yy = qy2 * y2;
  const yz = qy2 * z2;
  const zz = qz2 * z2;
  const wx = qw * x2;
  const wy = qw * y2;
  const wz = qw * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = src[offset];
  out[13] = src[offset + 1];
  out[14] = src[offset + 2];
  out[15] = 1;
  return out;
}

// src/spaces/XRBoundedReferenceSpace.ts
var NO_BOUNDS2 = Object.freeze([]);
var _a6;
var XRBoundedReferenceSpace = class _XRBoundedReferenceSpace extends (_a6 = XRReferenceSpace, P_BOUNDED_REF_SPACE, _a6) {
  constructor(parentSpace, offsetMatrix, bounds) {
    super("bounded-floor" /* BoundedFloor */, parentSpace, offsetMatrix);
    this[P_BOUNDED_REF_SPACE] = { bounds: bounds ?? (() => NO_BOUNDS2) };
  }
  /** The boundary polygon on the floor (y = 0), wound as the WebXR spec defines. */
  get boundsGeometry() {
    return this[P_BOUNDED_REF_SPACE].bounds();
  }
  getOffsetReferenceSpace(originOffset) {
    const offsetMatrix = originOffset instanceof XRRigidTransform ? originOffset.matrix : originOffset;
    return linkOffsetSpace(
      this,
      new _XRBoundedReferenceSpace(
        this,
        offsetMatrix,
        this[P_BOUNDED_REF_SPACE].bounds
      )
    );
  }
};

// src/events/XRReferenceSpaceEvent.ts
var XRReferenceSpaceEvent = class extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    if (!eventInitDict.referenceSpace) {
      throw new Error("XRReferenceSpaceEventInit.referenceSpace is required");
    }
    this.referenceSpace = eventInitDict.referenceSpace;
    this.transform = eventInitDict.transform;
  }
};

// src/host/reference-spaces.ts
var ASSUMED_EYE_HEIGHT = 1.6;
var WeakHandleImpl = globalThis.WeakRef;
var OFFSET_SWEEP_MIN = 64;
function liveSpace(entry) {
  return entry instanceof XRReferenceSpace ? entry : entry.deref();
}
var XRHostReferenceSpaces = class {
  constructor(globalSpace, output) {
    this.roots = [];
    this.offsets = [];
    /** List length at which dead weak entries are swept out next. */
    this.sweepAt = OFFSET_SWEEP_MIN;
    this.closed = false;
    this.watchOffsets = (space) => {
      if (this.closed) {
        return;
      }
      this.offsets.push(WeakHandleImpl ? new WeakHandleImpl(space) : space);
      if (this.offsets.length >= this.sweepAt) {
        this.sweep(this.offsets.length);
        this.sweepAt = Math.max(OFFSET_SWEEP_MIN, this.offsets.length * 2);
      }
    };
    this.globalSpace = globalSpace;
    this.output = output;
  }
  /**
   * Makes a root space of the given type, or returns null for types a host
   * session does not offer (unbounded, or bounded-floor when the host said
   * it has no stage). `viewer` is handled by the caller. `frame` is the host
   * frame being run, if any, so a space made inside a frame is placed at
   * once.
   */
  create(type, frame) {
    let root;
    if (type === "local" /* Local */) {
      root = {
        space: new XRReferenceSpace(type, this.globalSpace),
        anchoring: "local"
      };
    } else if (type === "local-floor" /* LocalFloor */) {
      root = {
        space: new XRReferenceSpace(type, this.globalSpace),
        anchoring: "local-floor"
      };
    } else if (type === "bounded-floor" /* BoundedFloor */) {
      if (this.output.lacksStage) {
        return null;
      }
      root = {
        space: new XRBoundedReferenceSpace(
          this.globalSpace,
          void 0,
          () => this.output.stageBounds()
        ),
        anchoring: "stage"
      };
    } else {
      return null;
    }
    root.space[P_REF_SPACE].onOffsetSpace = this.watchOffsets;
    this.roots.push(root);
    if (frame) {
      this.place(root, frame);
    }
    return root.space;
  }
  /** Re-anchors every root space to this frame's tracking. */
  update(frame) {
    for (let i = 0; i < this.roots.length; i++) {
      this.place(this.roots[i], frame);
    }
  }
  place(root, frame) {
    const offset = root.space[P_SPACE].offsetMatrix;
    switch (root.anchoring) {
      case "stage":
        mat4_exports.identity(offset);
        return;
      case "local":
        hostPoseMatrix(offset, frame.localPose, 0);
        return;
      case "local-floor":
        hostPoseMatrix(offset, frame.localPose, 0);
        offset[13] = frame.baseIsStage ? 0 : offset[13] - ASSUMED_EYE_HEIGHT;
        return;
    }
  }
  /** How many offset spaces are on record; take it before a recentre. */
  get offsetCount() {
    return this.offsets.length;
  }
  /**
   * After a recentre: fires `reset` at the offset spaces derived from a root
   * space that were on record when the recentre happened (pass `offsetCount`
   * read before any `reset` was dispatched). WebXR queues one reset per space
   * that exists at that moment, so spaces made by `reset` handlers are left
   * alone; otherwise a handler that derives a new offset space on reset would
   * never let this return. (The caller fires `reset` at the spaces the page
   * requested.)
   */
  resetOffsets(count) {
    const targets = [];
    const end = Math.min(count, this.offsets.length);
    for (let i = 0; i < end; i++) {
      const space = liveSpace(this.offsets[i]);
      if (space) {
        targets.push(space);
      }
    }
    this.sweep(this.offsets.length);
    for (let i = 0; i < targets.length; i++) {
      targets[i].dispatchEvent(
        new XRReferenceSpaceEvent("reset", { referenceSpace: targets[i] })
      );
    }
  }
  /** Drops dead weak entries among the first `count`, keeping order. */
  sweep(count) {
    const list = this.offsets;
    let kept = 0;
    for (let i = 0; i < list.length; i++) {
      if (i >= count || liveSpace(list[i])) {
        list[kept++] = list[i];
      }
    }
    list.length = kept;
  }
  /** Forgets everything when the session ends. */
  clear() {
    this.closed = true;
    for (const root of this.roots) {
      root.space[P_REF_SPACE].onOffsetSpace = null;
    }
    this.roots.length = 0;
    this.offsets.length = 0;
  }
};

// src/host/scene.ts
var XRHostScene = class {
  constructor(globalSpace, planes, meshes) {
    // frame id each tracked object was last listed in
    this.listedIn = /* @__PURE__ */ new WeakMap();
    // state of the pass in progress, read by the persistent callbacks below
    this.frame = null;
    this.frameId = 0;
    this.time = 0;
    this.visitPlane = (native) => {
      const frame = this.frame;
      let plane = this.planes.get(native);
      if (!plane) {
        plane = new XRPlane(
          native,
          new XRSpace(this.globalSpace, native.transform.matrix),
          native.polygon,
          native.semanticLabel
        );
        plane[P_PLANE].lastChangedTime = this.time;
        this.planes.set(native, plane);
      } else {
        const state = plane[P_PLANE];
        XRSpaceUtils.updateOffsetMatrix(
          plane.planeSpace,
          native.transform.matrix
        );
        let changed = false;
        if (state.polygon !== native.polygon) {
          state.polygon = native.polygon;
          changed = true;
        }
        if (state.semanticLabel !== native.semanticLabel) {
          state.semanticLabel = native.semanticLabel;
          changed = true;
        }
        const orientation = planeOrientation(native, native.semanticLabel);
        if (state.orientation !== orientation) {
          state.orientation = orientation;
          changed = true;
        }
        if (changed) {
          state.lastChangedTime = this.time;
        }
      }
      plane[P_PLANE].frame = frame;
      this.listedIn.set(plane, this.frameId);
      frame[P_FRAME].detectedPlanes.add(plane);
    };
    this.prunePlane = (plane, native) => {
      if (this.listedIn.get(plane) !== this.frameId) {
        this.planes.delete(native);
      }
    };
    // The frame's set is brought up to date in place rather than cleared and
    // refilled: V8 gives a Set a new table on clear() and grows it again on
    // the adds, while a steady room changes nothing here. (Deleting during
    // Set.prototype.forEach is well defined.)
    this.unlistPlane = (plane) => {
      if (this.listedIn.get(plane) !== this.frameId) {
        this.frame[P_FRAME].detectedPlanes.delete(plane);
      }
    };
    this.visitMesh = (native) => {
      const frame = this.frame;
      let mesh = this.meshes.get(native);
      if (!mesh) {
        mesh = new XRMesh(
          native,
          new XRSpace(this.globalSpace, native.transform.matrix),
          native.vertices,
          native.indices,
          native.semanticLabel
        );
        mesh[P_MESH].lastChangedTime = this.time;
        this.meshes.set(native, mesh);
      } else {
        const state = mesh[P_MESH];
        XRSpaceUtils.updateOffsetMatrix(mesh.meshSpace, native.transform.matrix);
        let changed = false;
        if (state.vertices !== native.vertices) {
          state.vertices = native.vertices;
          changed = true;
        }
        if (state.indices !== native.indices) {
          state.indices = native.indices;
          changed = true;
        }
        if (state.semanticLabel !== native.semanticLabel) {
          state.semanticLabel = native.semanticLabel;
          changed = true;
        }
        if (changed) {
          state.lastChangedTime = this.time;
        }
      }
      mesh[P_MESH].frame = frame;
      this.listedIn.set(mesh, this.frameId);
      frame[P_FRAME].detectedMeshes.add(mesh);
    };
    this.pruneMesh = (mesh, native) => {
      if (this.listedIn.get(mesh) !== this.frameId) {
        this.meshes.delete(native);
      }
    };
    this.unlistMesh = (mesh) => {
      if (this.listedIn.get(mesh) !== this.frameId) {
        this.frame[P_FRAME].detectedMeshes.delete(mesh);
      }
    };
    this.globalSpace = globalSpace;
    this.planes = planes;
    this.meshes = meshes;
  }
  /** Brings the session's planes and `frame.detectedPlanes` up to date. */
  syncPlanes(frame, source) {
    this.begin(frame);
    this.visit(source, this.visitPlane);
    this.planes.forEach(this.prunePlane);
    frame[P_FRAME].detectedPlanes.forEach(this.unlistPlane);
    this.frame = null;
  }
  /** Brings the session's meshes and `frame.detectedMeshes` up to date. */
  syncMeshes(frame, source) {
    this.begin(frame);
    this.visit(source, this.visitMesh);
    this.meshes.forEach(this.pruneMesh);
    frame[P_FRAME].detectedMeshes.forEach(this.unlistMesh);
    this.frame = null;
  }
  /**
   * When the host's plane list could not be read this frame: the frame
   * reports the planes already tracked, unchanged, instead of none.
   */
  keepPlanes(frame) {
    this.frame = null;
    const detected = frame[P_FRAME].detectedPlanes;
    detected.clear();
    this.planes.forEach((plane) => {
      plane[P_PLANE].frame = frame;
      detected.add(plane);
    });
  }
  /** Like `keepPlanes`, for meshes. */
  keepMeshes(frame) {
    this.frame = null;
    const detected = frame[P_FRAME].detectedMeshes;
    detected.clear();
    this.meshes.forEach((mesh) => {
      mesh[P_MESH].frame = frame;
      detected.add(mesh);
    });
  }
  begin(frame) {
    this.frame = frame;
    this.frameId = frame[P_FRAME].id;
    this.time = frame[P_FRAME].predictedDisplayTime;
  }
  visit(source, visitor) {
    if (!source) {
      return;
    }
    if (Array.isArray(source)) {
      for (let i = 0; i < source.length; i++) {
        visitor(source[i]);
      }
    } else {
      source.forEach(visitor);
    }
  }
};

// src/host/views.ts
var FOV_OFFSET = 7;
var headInverse = mat4_exports.create();
var XRHostViews = class {
  constructor() {
    /** Views in the current frame, 1 or 2. */
    this.count = 2;
    /** Each eye's pose in the base (global) space. */
    this.world = [mat4_exports.create(), mat4_exports.create()];
    /**
     * Each eye's projection matrix. `XRView.projectionMatrix` hands these
     * arrays out directly, so they are only ever rewritten in place.
     */
    this.projection = [
      new Float32Array(16),
      new Float32Array(16)
    ];
    /** The head (viewer) pose in the base space. */
    this.head = mat4_exports.create();
    /**
     * The inputs each projection was last built from (4 FOV angles, near,
     * far per view) and the result. The FOV rarely changes during a session,
     * so most frames copy the stored matrix instead of rebuilding it; the
     * copy still runs every frame so the handed-out arrays are always fresh.
     */
    this.projectionInputs = new Float64Array(12).fill(NaN);
    this.projectionBuilt = [
      new Float32Array(16),
      new Float32Array(16)
    ];
  }
  /**
   * Reads the eye poses from the host frame and writes them into IWER's
   * space graph: the device's viewer space becomes the head pose, and its
   * view spaces become each eye relative to the head.
   */
  readPoses(frame, device) {
    const requested = frame.viewCount | 0;
    const count = requested >= 2 ? 2 : 1;
    this.count = count;
    const data = frame.views;
    hostPoseMatrix(this.world[0], data, 0);
    if (count === 2) {
      hostPoseMatrix(this.world[1], data, HOST_VIEW_STRIDE);
    }
    const head = this.head;
    mat4_exports.copy(head, this.world[0]);
    if (count === 2) {
      const right = this.world[1];
      head[12] = 0.5 * (head[12] + right[12]);
      head[13] = 0.5 * (head[13] + right[13]);
      head[14] = 0.5 * (head[14] + right[14]);
    }
    const state = device[P_DEVICE];
    mat4_exports.copy(state.viewerSpace[P_SPACE].offsetMatrix, head);
    invertAffine(headInverse, head);
    const eyeSpaces = state.viewSpaces;
    const leftOffset = eyeSpaces["left" /* Left */][P_SPACE].offsetMatrix;
    const rightOffset = eyeSpaces["right" /* Right */][P_SPACE].offsetMatrix;
    multiplyInto(leftOffset, 0, headInverse, this.world[0]);
    if (count === 2) {
      multiplyInto(rightOffset, 0, headInverse, this.world[1]);
    } else {
      mat4_exports.copy(rightOffset, leftOffset);
    }
    mat4_exports.copy(eyeSpaces["none" /* None */][P_SPACE].offsetMatrix, leftOffset);
  }
  /**
   * Writes each view's projection for its FOV angles and the render state's
   * clip planes, rebuilding it only when one of them changed.
   */
  writeProjections(frame, renderState) {
    const data = frame.views;
    const near = renderState.depthNear;
    const far = renderState.depthFar;
    const inputs = this.projectionInputs;
    for (let view = 0; view < this.count; view++) {
      const at = view * HOST_VIEW_STRIDE + FOV_OFFSET;
      const angleLeft = data[at];
      const angleRight = data[at + 1];
      const angleUp = data[at + 2];
      const angleDown = data[at + 3];
      const out = this.projectionBuilt[view];
      const memo = view * 6;
      if (inputs[memo] !== angleLeft || inputs[memo + 1] !== angleRight || inputs[memo + 2] !== angleUp || inputs[memo + 3] !== angleDown || inputs[memo + 4] !== near || inputs[memo + 5] !== far) {
        inputs[memo] = angleLeft;
        inputs[memo + 1] = angleRight;
        inputs[memo + 2] = angleUp;
        inputs[memo + 3] = angleDown;
        inputs[memo + 4] = near;
        inputs[memo + 5] = far;
        hostPerspective(
          out,
          angleLeft,
          angleRight,
          angleUp,
          angleDown,
          near,
          far
        );
      }
      this.projection[view].set(out);
    }
  }
};

// src/host/XRHostSession.ts
var hostFrameSerial = 0;
function visibilityOf(visible, focused) {
  if (!visible) {
    return "hidden";
  }
  return focused ? "visible" : "visible-blurred";
}
var XRHostSession = class {
  constructor(session, backend) {
    this.views = new XRHostViews();
    /** The host frame being run; null outside `runFrame`. */
    this.current = null;
    /** `end()` was called during a frame; it completes once the frame returns. */
    this.endAfterFrame = false;
    /** The end has been carried out (teardown done, `end` dispatched). */
    this.closed = false;
    this.endWaiters = [];
    // Made once: an arrow function written inside runFrame would make V8
    // allocate a context for `this` on every frame.
    this.reportCallbackError = (error) => this.report(error, "xr-frame-callback");
    this.closeAfterFrame = () => this.close(false);
    this.session = session;
    this.backend = backend;
    const s = session[P_SESSION];
    this.output = new XRHostOutput(backend, {
      immersiveAR: s.mode === "immersive-ar",
      wantsScene: s.hasPlanes || s.hasMeshes,
      enabledFeatures: s.enabledFeatures
    });
    this.rate = new XRHostFrameRate(backend);
    const globalSpace = s.device[P_DEVICE].globalSpace;
    this.spaces = new XRHostReferenceSpaces(globalSpace, this.output);
    this.scene = new XRHostScene(globalSpace, s.trackedPlanes, s.trackedMeshes);
    this.loop = new XRHostFrameLoop(session);
  }
  // -- used by XRSession, XRFrame and the layer classes ------------------------
  get frameRate() {
    return this.rate.current;
  }
  get supportedFrameRates() {
    return this.rate.supported;
  }
  get foveation() {
    return this.output.foveation;
  }
  setFoveation(level) {
    this.output.setFoveation(level);
  }
  getOpaqueColorTexture() {
    return this.output.opaqueColorTexture();
  }
  /**
   * Called by a layer constructor: the session's swapchain, created by the
   * first layer. Throws InvalidStateError once the session has ended.
   */
  acquireSwapchain(request) {
    if (this.session[P_SESSION].ended) {
      throw new DOMException(
        "Cannot create a layer for an XRSession that has ended.",
        "InvalidStateError"
      );
    }
    const hadSwapchain = this.output.swapchain !== null;
    const swapchain = this.output.acquire(request);
    if (!hadSwapchain) {
      this.rate.adopt(this.output.offeredRates, this.output.initialRate);
    }
    return swapchain;
  }
  /** A pooled registration for `XRSession.requestAnimationFrame`. */
  frameRequest(handle, callback) {
    return this.loop.request(handle, callback);
  }
  updateTargetFrameRate(rate) {
    return this.rate.request(rate, this.session[P_SESSION].ended);
  }
  /** `requestReferenceSpace` in host mode; null for unsupported types. */
  createReferenceSpace(type) {
    if (type === "viewer" /* Viewer */) {
      return this.session[P_SESSION].device.viewerSpace;
    }
    return this.spaces.create(type, this.current);
  }
  // -- the frame -----------------------------------------------------------------
  /**
   * Runs one host frame (`XRDevice.runHostFrame`). Returns after the page's
   * XR callbacks, the window frame and the layer's end-of-frame work.
   */
  runFrame(frame) {
    const session = this.session;
    const s = session[P_SESSION];
    if (s.ended) {
      return;
    }
    const device = s.device[P_DEVICE];
    const frameId = ++hostFrameSerial;
    const time = frame.predictedDisplayTime;
    this.current = frame;
    try {
      if (s.pendingRenderState !== null) {
        s.renderState = s.pendingRenderState;
        s.pendingRenderState = null;
      }
      const renderState = s.renderState;
      this.views.readPoses(frame, s.device);
      this.spaces.update(frame);
      try {
        this.output.syncPassthrough(renderState.passthroughFullyObscured);
      } catch (error) {
        this.report(error, "host-hook");
      }
      if (this.rate.observe(frame.frameRate)) {
        this.announceRate();
      } else {
        this.rate.countFrame();
      }
      const visible = device.visibilityState !== "hidden";
      const baseLayer = renderState.baseLayer;
      if (visible) {
        this.views.writeProjections(frame, renderState);
        if (baseLayer) {
          try {
            baseLayer.hostBindFrame(frame.colorTexture);
          } catch (error) {
            this.report(error, "layer");
          }
        }
        const xrFrame = this.loop.frameFor(frameId, time);
        if (s.hasPlanes) {
          try {
            this.scene.syncPlanes(xrFrame, this.backend.getPlanes?.());
          } catch (error) {
            this.report(error, "host-hook");
            this.scene.keepPlanes(xrFrame);
          }
        }
        if (s.hasMeshes) {
          try {
            this.scene.syncMeshes(xrFrame, this.backend.getMeshes?.());
          } catch (error) {
            this.report(error, "host-hook");
            this.scene.keepMeshes(xrFrame);
          }
        }
        invalidateHostPoses();
        this.loop.activate(xrFrame);
        try {
          device.onHostFrameStart(xrFrame);
        } catch (error) {
          this.report(error, "host-hook");
        }
        invalidateHostPoses();
        s.updateActiveInputSources();
        this.loop.runCallbacks(xrFrame, time, this.reportCallbackError);
      }
      if (this.backend.runWindowFrame) {
        try {
          this.backend.runWindowFrame(time);
        } catch (error) {
          this.report(error, "window-frame");
        }
      }
      if (visible && baseLayer && !s.ended) {
        try {
          baseLayer.hostEndFrame();
        } catch (error) {
          this.report(error, "layer");
        }
      }
    } finally {
      this.current = null;
    }
    if (this.endAfterFrame) {
      this.endAfterFrame = false;
      this.afterFrame(this.closeAfterFrame);
    }
  }
  /** Routes an exception caught during a frame (WebXR: "report the exception"). */
  report(error, source) {
    const reporter = this.backend.reportError;
    if (reporter) {
      try {
        reporter.call(this.backend, error, source);
        return;
      } catch (reporterError) {
        console.error(reporterError);
      }
    }
    console.error(error);
  }
  afterFrame(task) {
    if (this.backend.postTask) {
      this.backend.postTask(task);
    } else {
      setTimeout(task, 0);
    }
  }
  /** Dispatches `frameratechange` for a new rate, then settles waiting requests. */
  announceRate() {
    const session = this.session;
    session.dispatchEvent(new XRSessionEvent("frameratechange", { session }));
    this.rate.settle();
  }
  // -- host events and the end of the session ---------------------------------
  /** `XRDevice.dispatchHostEvent`. */
  onEvent(event) {
    if (this.closed) {
      return;
    }
    const session = this.session;
    const s = session[P_SESSION];
    if (event.type === "visibilitychange") {
      const device = s.device[P_DEVICE];
      const next = visibilityOf(event.visible, event.focused);
      if (next !== device.visibilityState) {
        device.visibilityState = next;
        device.pendingVisibilityState = null;
        session.dispatchEvent(
          new XRSessionEvent("visibilitychange", { session })
        );
      }
    } else if (event.type === "frameratechange") {
      if (this.rate.observe(event.rate)) {
        this.announceRate();
      }
    } else if (event.type === "referencespacereset") {
      const requested = s.referenceSpaces.slice();
      const offsetCount = this.spaces.offsetCount;
      for (let i = 0; i < requested.length; i++) {
        const space = requested[i];
        if (space[P_REF_SPACE].type !== "viewer" /* Viewer */) {
          space.dispatchEvent(
            new XRReferenceSpaceEvent("reset", { referenceSpace: space })
          );
        }
      }
      this.spaces.resetOffsets(offsetCount);
    } else if (event.type === "end") {
      s.ended = true;
      this.close(true);
    }
  }
  /** `XRSession.end()` in host mode. */
  end() {
    const s = this.session[P_SESSION];
    if (s.ended) {
      return Promise.reject(
        new DOMException("XRSession has already ended.", "InvalidStateError")
      );
    }
    s.ended = true;
    const done = new Promise((resolve) => this.endWaiters.push(resolve));
    if (this.current) {
      this.endAfterFrame = true;
    } else {
      this.close(false);
    }
    return done;
  }
  /**
   * Shuts the session down once. `byHost`: the host ended it, so it is not
   * asked to end it again.
   */
  close(byHost) {
    if (this.closed) {
      return;
    }
    this.closed = true;
    const session = this.session;
    session[P_SESSION].ended = true;
    session[P_SESSION].teardown();
    this.rate.abandon();
    this.spaces.clear();
    if (!byHost) {
      try {
        this.backend.endSession();
      } catch (error) {
        console.error(
          "XRSession.end(): XRHostBackend.endSession() threw",
          error
        );
      }
    }
    this.output.release();
    session.dispatchEvent(new XRSessionEvent("end", { session }));
    const waiters = this.endWaiters;
    this.endWaiters = [];
    for (const resolve of waiters) {
      resolve();
    }
  }
};

// src/views/XRViewport.ts
P_VIEWPORT;
var XRViewport = class {
  constructor(x, y, width, height) {
    this[P_VIEWPORT] = { x, y, width, height };
  }
  get x() {
    return this[P_VIEWPORT].x;
  }
  get y() {
    return this[P_VIEWPORT].y;
  }
  get width() {
    return this[P_VIEWPORT].width;
  }
  get height() {
    return this[P_VIEWPORT].height;
  }
};

// src/host/layer-target.ts
var FRAMEBUFFER = 36160;
var DRAW_FRAMEBUFFER = 36009;
var FRAMEBUFFER_BINDING = 36006;
var RENDERBUFFER = 36161;
var RENDERBUFFER_BINDING = 36007;
var COLOR_ATTACHMENT0 = 36064;
var DEPTH_ATTACHMENT = 36096;
var DEPTH_STENCIL_ATTACHMENT = 33306;
var TEXTURE_2D = 3553;
var DEPTH_COMPONENT24 = 33190;
var DEPTH24_STENCIL8 = 35056;
function isWebGL2(gl) {
  if (typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext) {
    return true;
  }
  const members = gl;
  return members.DRAW_FRAMEBUFFER === DRAW_FRAMEBUFFER || typeof members.blitFramebuffer === "function" || typeof members.invalidateFramebuffer === "function";
}
var XRHostLayerTarget = class {
  constructor(gl, options) {
    // what to discard after the last draw of a frame; allocated once
    this.discardList = null;
    this.wrappers = /* @__PURE__ */ new Map();
    this.attached = void 0;
    this.gl = gl;
    this.wrapTexture = options.wrapTexture;
    this.width = options.width;
    this.height = options.height;
    const leftWidth = Math.floor(options.width / 2);
    this.viewports = [
      new XRViewport(0, 0, leftWidth, options.height),
      new XRViewport(leftWidth, 0, options.width - leftWidth, options.height)
    ];
    const webgl2 = isWebGL2(gl);
    this.target = webgl2 ? DRAW_FRAMEBUFFER : FRAMEBUFFER;
    this.framebuffer = gl.createFramebuffer();
    if (options.depth || options.stencil) {
      const attachment = options.stencil ? DEPTH_STENCIL_ATTACHMENT : DEPTH_ATTACHMENT;
      const storage = gl.createRenderbuffer();
      const previousRenderbuffer = gl.getParameter(RENDERBUFFER_BINDING);
      gl.bindRenderbuffer(RENDERBUFFER, storage);
      gl.renderbufferStorage(
        RENDERBUFFER,
        options.stencil ? DEPTH24_STENCIL8 : DEPTH_COMPONENT24,
        options.width,
        options.height
      );
      gl.bindRenderbuffer(RENDERBUFFER, previousRenderbuffer);
      const pageBinding = this.bindOwn();
      gl.framebufferRenderbuffer(
        this.target,
        attachment,
        RENDERBUFFER,
        storage
      );
      this.restore(pageBinding);
      if (options.discardDepth && webgl2 && typeof gl.invalidateFramebuffer === "function") {
        this.discardList = [attachment];
      }
    }
  }
  /** Binds the layer's framebuffer and returns the page's binding. */
  bindOwn() {
    const pageBinding = this.gl.getParameter(FRAMEBUFFER_BINDING);
    this.gl.bindFramebuffer(this.target, this.framebuffer);
    return pageBinding;
  }
  restore(pageBinding) {
    this.gl.bindFramebuffer(this.target, pageBinding);
  }
  /** Before the frame's callbacks: render into swapchain image `name`. */
  beginFrame(name) {
    let texture = this.wrappers.get(name);
    if (texture === void 0) {
      texture = this.wrapTexture(name);
      this.wrappers.set(name, texture);
    }
    if (texture === this.attached) {
      return;
    }
    this.attached = texture;
    const pageBinding = this.bindOwn();
    this.gl.framebufferTexture2D(
      this.target,
      COLOR_ATTACHMENT0,
      TEXTURE_2D,
      texture,
      0
    );
    this.restore(pageBinding);
  }
  /**
   * After the frame's last draw. The layer reports `ignoreDepthValues`, so
   * the host never hands its depth to the compositor; OpenGL ES 3.0's
   * glInvalidateFramebuffer lets the driver treat that content as undefined
   * and skip writing it back to memory, which saves bandwidth on tiled GPUs.
   * Colour is never discarded: the compositor reads it.
   */
  endFrame() {
    const list = this.discardList;
    if (list === null) {
      return;
    }
    const pageBinding = this.bindOwn();
    this.gl.invalidateFramebuffer(
      this.target,
      list
    );
    this.restore(pageBinding);
  }
};

// src/layers/XRWebGLLayer.ts
var XRLayer = class extends EventTarget {
};
var defaultLayerInit = {
  antialias: true,
  depth: true,
  stencil: false,
  alpha: true,
  ignoreDepthValues: false,
  framebufferScaleFactor: 1
};
var _a7;
var XRWebGLLayer = class extends (_a7 = XRLayer, P_WEBGL_LAYER, _a7) {
  constructor(session, context, layerInit = {}) {
    super();
    if (session[P_SESSION].ended) {
      throw new DOMException("Session has ended", "InvalidStateError");
    }
    const config = { ...defaultLayerInit, ...layerInit };
    this[P_WEBGL_LAYER] = {
      session,
      context,
      antialias: config.antialias,
      host: null
    };
    const host = session[P_SESSION].host;
    if (host) {
      const swapchain = host.acquireSwapchain({
        arraySize: 1,
        scale: config.framebufferScaleFactor ?? 1,
        colorFormat: void 0,
        context
      });
      const backend = host.backend;
      this[P_WEBGL_LAYER].host = new XRHostLayerTarget(context, {
        width: swapchain.width,
        height: swapchain.height,
        depth: config.depth ?? true,
        stencil: config.stencil ?? false,
        discardDepth: backend.invalidateDepth !== false,
        wrapTexture: (name) => backend.wrapTexture?.(name) ?? null
      });
    }
  }
  /** Host mode, before the frame's callbacks: target swapchain image `name`. */
  hostBindFrame(name) {
    this[P_WEBGL_LAYER].host?.beginFrame(name);
  }
  /** Host mode, after the frame's last draw (see XRHostLayerTarget.endFrame). */
  hostEndFrame() {
    this[P_WEBGL_LAYER].host?.endFrame();
  }
  get context() {
    return this[P_WEBGL_LAYER].context;
  }
  get antialias() {
    return this[P_WEBGL_LAYER].antialias;
  }
  get ignoreDepthValues() {
    return true;
  }
  get framebuffer() {
    return this[P_WEBGL_LAYER].host?.framebuffer ?? null;
  }
  get framebufferWidth() {
    return this[P_WEBGL_LAYER].host?.width ?? this[P_WEBGL_LAYER].context.drawingBufferWidth;
  }
  get framebufferHeight() {
    return this[P_WEBGL_LAYER].host?.height ?? this[P_WEBGL_LAYER].context.drawingBufferHeight;
  }
  // host mode only; undefined when emulating (three.js checks for that)
  get fixedFoveation() {
    return this[P_WEBGL_LAYER].session[P_SESSION].host?.foveation;
  }
  set fixedFoveation(value) {
    if (value === void 0 || value === null) return;
    this[P_WEBGL_LAYER].session[P_SESSION].host?.setFoveation(value);
  }
  getViewport(view) {
    if (view[P_VIEW].session !== this[P_WEBGL_LAYER].session) {
      throw new DOMException(
        "View's session differs from Layer's session",
        "InvalidStateError"
      );
    }
    const host = this[P_WEBGL_LAYER].host;
    if (host) {
      return host.viewports[view[P_VIEW].eye === "right" /* Right */ ? 1 : 0];
    }
    return this[P_WEBGL_LAYER].session[P_SESSION].device[P_DEVICE].getViewport(
      this,
      view
    );
  }
  static getNativeFramebufferScaleFactor(session) {
    if (!(session instanceof XRSession)) {
      throw new TypeError(
        "getNativeFramebufferScaleFactor must be passed a session."
      );
    }
    if (session[P_SESSION].ended) {
      return 0;
    }
    return 1;
  }
};

// src/layers/XRProjectionLayer.ts
var GL_RGBA8 = 32856;
var GL_DEPTH_COMPONENT24 = 33190;
var LAYOUT_OF = {
  "texture-array": "default",
  texture: "stereo"
};
var XRWebGLSubImage = class {
  constructor(region) {
    this.colorTexture = null;
    /** Depth is never handed to the host compositor, so none is exposed. */
    this.depthStencilTexture = null;
    this.motionVectorTexture = null;
    const { textureSize } = region;
    this.colorTextureWidth = textureSize.width;
    this.colorTextureHeight = textureSize.height;
    this.imageIndex = region.arrayLayer;
    this.viewport = region.viewport;
  }
  /** Name used for the colour texture size by older Layers drafts. */
  get textureWidth() {
    return this.colorTextureWidth;
  }
  get textureHeight() {
    return this.colorTextureHeight;
  }
  get depthStencilTextureWidth() {
    return null;
  }
  get depthStencilTextureHeight() {
    return null;
  }
};
var FIXED_ATTRIBUTES = [
  ["blendTextureSourceAlpha", false, true],
  ["forceMonoPresentation", false, true],
  ["opacity", 1, true],
  ["quality", "default", true],
  // only some Layers drafts have it; null leaves the choice to the UA
  ["chromaticAberrationCorrection", null, true],
  ["mipLevels", 1, false],
  ["needsRedraw", false, false]
];
var ignoreWrite = () => {
};
var _a8;
var XRCompositionLayer = class extends (_a8 = XRLayer, P_COMPOSITION_LAYER, _a8) {
  constructor(owner) {
    super();
    this[P_COMPOSITION_LAYER] = {
      layout: owner.layout,
      session: owner.session
    };
  }
  get layout() {
    return this[P_COMPOSITION_LAYER].layout;
  }
  destroy() {
  }
};
for (const [name, value, writable] of FIXED_ATTRIBUTES) {
  Object.defineProperty(XRCompositionLayer.prototype, name, {
    configurable: true,
    enumerable: false,
    get: () => value,
    set: writable ? ignoreWrite : void 0
  });
}
function eyeRegions(textureType, size) {
  const textureSize = { width: size.width, height: size.height };
  const arrayed = textureType === "texture-array";
  const split = Math.floor(size.width / 2);
  const regionFor = (eye) => {
    const x = arrayed || eye === 0 ? 0 : split;
    const columns = arrayed ? size.width : eye === 0 ? split : size.width - split;
    return new XRWebGLSubImage({
      viewport: new XRViewport(x, 0, columns, size.height),
      arrayLayer: arrayed ? eye : 0,
      textureSize
    });
  };
  return [regionFor(0), regionFor(1)];
}
var _a9;
var XRProjectionLayer = class extends (_a9 = XRCompositionLayer, P_PROJECTION_LAYER, _a9) {
  constructor(session, init, swapchain, textureType) {
    super({ session, layout: LAYOUT_OF[textureType] });
    const size = {
      arraySize: swapchain.arraySize,
      height: swapchain.height,
      width: swapchain.width
    };
    const depthFormat = init.depthFormat === void 0 ? GL_DEPTH_COMPONENT24 : init.depthFormat;
    this[P_PROJECTION_LAYER] = {
      subImages: eyeRegions(textureType, size),
      colorFormat: init.colorFormat ?? GL_RGBA8,
      depthFormat,
      textureType,
      size
    };
  }
  get textureType() {
    return this[P_PROJECTION_LAYER].textureType;
  }
  get textureWidth() {
    return this[P_PROJECTION_LAYER].size.width;
  }
  get textureHeight() {
    return this[P_PROJECTION_LAYER].size.height;
  }
  get textureArrayLength() {
    return this[P_PROJECTION_LAYER].size.arraySize;
  }
  /** True: the host compositor never receives depth. */
  get ignoreDepthValues() {
    return true;
  }
  get colorFormat() {
    return this[P_PROJECTION_LAYER].colorFormat;
  }
  get depthFormat() {
    return this[P_PROJECTION_LAYER].depthFormat;
  }
  /**
   * Fixed foveation. Every layer draws into the session's single swapchain,
   * so the level is shared session wide; null outside host mode.
   */
  get fixedFoveation() {
    const host = this[P_COMPOSITION_LAYER].session[P_SESSION].host;
    return host === null || host === void 0 ? null : host.foveation;
  }
  set fixedFoveation(level) {
    if (level === null) {
      return;
    }
    this[P_COMPOSITION_LAYER].session[P_SESSION].host?.setFoveation(level);
  }
  get deltaPose() {
    return null;
  }
  set deltaPose(_ignored) {
  }
};

// src/session/XRSession.ts
function diffActiveInputSources(session) {
  const handTrackingOn = session[P_SESSION].enabledFeatures.includes("hand-tracking");
  const gazeTrackingOn = session[P_SESSION].hasGazeTracking;
  const prevInputs = session[P_SESSION].activeInputSources;
  const currInputs = session[P_SESSION].device.inputSources.filter(
    (inputSource) => (!inputSource.hand || handTrackingOn) && (inputSource.targetRayMode !== "gaze" || gazeTrackingOn)
  );
  const added = currInputs.filter((item) => !prevInputs.includes(item));
  const removed = prevInputs.filter((item) => !currInputs.includes(item));
  session[P_SESSION].activeInputSources = currInputs;
  const visible = session[P_SESSION].device[P_DEVICE].visibilityState === "visible";
  for (const inputSource of removed) {
    for (const button of inputSource.gamepad?.buttons ?? []) {
      if (!(button instanceof GamepadButton)) {
        continue;
      }
      const trigger = button[P_GAMEPAD].eventTrigger;
      const frame = session[P_SESSION].activeFrame;
      if (visible && trigger && frame && button[P_GAMEPAD].lastFramePressed) {
        for (const type of edgeEventTypes("cancel", trigger)) {
          session.dispatchEvent(
            new XRInputSourceEvent(type, { frame, inputSource })
          );
        }
      }
      resetButton(button);
    }
  }
  if (added.length > 0 || removed.length > 0) {
    session.dispatchEvent(
      new XRInputSourcesChangeEvent("inputsourceschange", {
        session,
        added,
        removed
      })
    );
  }
}
var _a10;
var XRSession = class extends (_a10 = EventTarget, P_SESSION, _a10) {
  constructor(device, mode, enabledFeatures, _depthSensing) {
    super();
    this[P_SESSION] = {
      device,
      mode,
      renderState: new XRRenderState(),
      pendingRenderState: null,
      enabledFeatures,
      hasAnchors: enabledFeatures.includes("anchors"),
      hasPlanes: enabledFeatures.includes("plane-detection"),
      hasMeshes: enabledFeatures.includes("mesh-detection"),
      hasDepth: enabledFeatures.includes("depth-sensing"),
      hasHitTest: enabledFeatures.includes("hit-test"),
      hasGazeTracking: enabledFeatures.includes("gaze-tracking") || enabledFeatures.includes("eye-tracking"),
      supportedFrameRates: new Float32Array(device.supportedFrameRates),
      isSystemKeyboardSupported: false,
      ended: false,
      projectionMatrices: {
        ["left" /* Left */]: mat4_exports.create(),
        ["right" /* Right */]: mat4_exports.create(),
        ["none" /* None */]: mat4_exports.create()
      },
      getProjectionMatrix: (eye) => {
        return this[P_SESSION].projectionMatrices[eye];
      },
      referenceSpaceIsSupported: (referenceSpaceType) => {
        if (!this[P_SESSION].enabledFeatures.includes(referenceSpaceType)) {
          return false;
        }
        switch (referenceSpaceType) {
          case "viewer" /* Viewer */:
            return true;
          case "local" /* Local */:
          case "local-floor" /* LocalFloor */:
          case "bounded-floor" /* BoundedFloor */:
          case "unbounded" /* Unbounded */:
            return this[P_SESSION].mode != "inline";
        }
      },
      frameHandle: 0,
      frameCallbacks: [],
      currentFrameCallbacks: null,
      onDeviceFrame: () => {
        if (this[P_SESSION].ended) {
          return;
        }
        this[P_SESSION].deviceFrameHandle = globalThis.requestAnimationFrame(
          this[P_SESSION].onDeviceFrame
        );
        if (this[P_SESSION].pendingRenderState != null) {
          this[P_SESSION].renderState = this[P_SESSION].pendingRenderState;
          this[P_SESSION].pendingRenderState = null;
          this[P_SESSION].device[P_DEVICE].onBaseLayerSet(
            this[P_SESSION].renderState.baseLayer
          );
        }
        const baseLayer = this[P_SESSION].renderState.baseLayer;
        if (baseLayer === null) {
          return;
        }
        const context = baseLayer.context;
        const canvas = context.canvas;
        if (this[P_SESSION].mode != "inline" && this[P_SESSION].device.frameClearEnabled) {
          const currentClearColor = context.getParameter(
            context.COLOR_CLEAR_VALUE
          );
          const currentClearDepth = context.getParameter(
            context.DEPTH_CLEAR_VALUE
          );
          const currentClearStencil = context.getParameter(
            context.STENCIL_CLEAR_VALUE
          );
          context.clearColor(0, 0, 0, 0);
          context.clearDepth(1);
          context.clearStencil(0);
          context.clear(
            context.DEPTH_BUFFER_BIT | context.COLOR_BUFFER_BIT | context.STENCIL_BUFFER_BIT
          );
          context.clearColor(
            currentClearColor[0],
            currentClearColor[1],
            currentClearColor[2],
            currentClearColor[3]
          );
          context.clearDepth(currentClearDepth);
          context.clearStencil(currentClearStencil);
        }
        const { depthNear, depthFar } = this[P_SESSION].renderState;
        const { width, height } = canvas;
        if (this[P_SESSION].mode !== "inline") {
          const aspect = width * (this[P_SESSION].device.stereoEnabled ? 0.5 : 1) / height;
          mat4_exports.perspective(
            this[P_SESSION].projectionMatrices["left" /* Left */],
            this[P_SESSION].device.fovy,
            aspect,
            depthNear,
            depthFar
          );
          mat4_exports.copy(
            this[P_SESSION].projectionMatrices["right" /* Right */],
            this[P_SESSION].projectionMatrices["left" /* Left */]
          );
        } else {
          const aspect = width / height;
          mat4_exports.perspective(
            this[P_SESSION].projectionMatrices["none" /* None */],
            this[P_SESSION].renderState.inlineVerticalFieldOfView,
            aspect,
            depthNear,
            depthFar
          );
        }
        const now = performance.now();
        const frame = new XRFrame(
          this,
          this[P_SESSION].frameHandle,
          true,
          true,
          now
        );
        const devui = this[P_SESSION].device[P_DEVICE].devui;
        if (devui) {
          devui.render(now);
        }
        const sem = this[P_SESSION].mode === "immersive-ar" ? this[P_SESSION].device[P_DEVICE].sem : void 0;
        const drawSemAfterCallbacks = !!sem?.update && !!sem.draw;
        if (sem) {
          if (drawSemAfterCallbacks) {
            sem.update(now);
          } else {
            sem.render(now);
          }
        }
        if (this[P_SESSION].hasAnchors) {
          this[P_SESSION].updateTrackedAnchors();
        }
        if (this[P_SESSION].hasPlanes) {
          this[P_SESSION].updateTrackedPlanes(frame);
        }
        if (this[P_SESSION].hasMeshes) {
          this[P_SESSION].updateTrackedMeshes(frame);
        }
        if (this[P_SESSION].hasDepth) {
          this[P_SESSION].computeDepthSensing(frame);
        }
        if (this[P_SESSION].hasHitTest) {
          this[P_SESSION].computeHitTestResults(frame);
        }
        this[P_SESSION].activeFrame = frame;
        this[P_SESSION].device[P_DEVICE].onFrameStart(frame);
        this[P_SESSION].updateActiveInputSources();
        const callbacks = this[P_SESSION].currentFrameCallbacks = this[P_SESSION].frameCallbacks;
        this[P_SESSION].frameCallbacks = [];
        for (let i = 0; i < callbacks.length; i++) {
          try {
            if (!callbacks[i].cancelled) {
              callbacks[i].callback(now, frame);
            }
          } catch (err) {
            console.error(err);
          }
        }
        this[P_SESSION].currentFrameCallbacks = null;
        if (drawSemAfterCallbacks && this[P_SESSION].shouldDrawEnvironment()) {
          sem.draw();
        }
        frame[P_FRAME].active = false;
        this[P_SESSION].activeFrame = null;
      },
      shouldDrawEnvironment: () => {
        if (this[P_SESSION].ended) {
          return false;
        }
        const shouldDraw = this[P_SESSION].device.shouldDrawEnvironment;
        if (!shouldDraw) {
          return true;
        }
        try {
          return shouldDraw() !== false;
        } catch (err) {
          console.error(err);
          return true;
        }
      },
      nominalFrameRate: device.internalNominalFrameRate,
      referenceSpaces: [],
      inputSourceArray: new XRInputSourceArray(),
      activeInputSources: [],
      updateActiveInputSources: () => {
        const hostInput = this[P_SESSION].device[P_DEVICE].hostInput;
        if (hostInput && hostInput[P_HOST_INPUT].unchangedFor(this)) {
          return;
        }
        diffActiveInputSources(this);
      },
      trackedAnchors: new XRAnchorSet(),
      persistentAnchors: /* @__PURE__ */ new Map(),
      newAnchors: /* @__PURE__ */ new Map(),
      frameTrackedAnchors: new XRAnchorSet(),
      updateTrackedAnchors: () => {
        if (this[P_SESSION].enabledFeatures.includes("anchors")) {
          this[P_SESSION].frameTrackedAnchors.clear();
          Array.from(this[P_SESSION].trackedAnchors).forEach((anchor) => {
            if (anchor[P_ANCHOR].deleted) {
              this[P_SESSION].trackedAnchors.delete(anchor);
              if (this[P_SESSION].newAnchors.has(anchor)) {
                const { reject } = this[P_SESSION].newAnchors.get(anchor);
                reject(
                  new DOMException(
                    "Anchor is no longer tracked",
                    "InvalidStateError"
                  )
                );
              }
            } else {
              this[P_SESSION].frameTrackedAnchors.add(anchor);
              if (this[P_SESSION].newAnchors.has(anchor)) {
                const { resolve } = this[P_SESSION].newAnchors.get(anchor);
                resolve(anchor);
                this[P_SESSION].newAnchors.delete(anchor);
              }
            }
          });
        }
      },
      trackedPlanes: /* @__PURE__ */ new Map(),
      updateTrackedPlanes: (frame) => {
        const sem = this[P_SESSION].device[P_DEVICE].sem;
        if (!sem) {
          return;
        }
        const trackedPlanes = Array.from(this[P_SESSION].trackedPlanes.keys());
        trackedPlanes.forEach((plane) => {
          if (!sem.trackedPlanes.has(plane)) {
            this[P_SESSION].trackedPlanes.delete(plane);
          }
        });
        sem.trackedPlanes.forEach((plane) => {
          let xrPlane = this[P_SESSION].trackedPlanes.get(plane);
          if (!xrPlane) {
            const planeSpace = new XRSpace(
              this[P_SESSION].device[P_DEVICE].globalSpace,
              plane.transform.matrix
            );
            xrPlane = new XRPlane(
              plane,
              planeSpace,
              plane.polygon,
              plane.semanticLabel
            );
            xrPlane[P_PLANE].lastChangedTime = frame.predictedDisplayTime;
            this[P_SESSION].trackedPlanes.set(plane, xrPlane);
          } else {
            XRSpaceUtils.updateOffsetMatrix(
              xrPlane.planeSpace,
              plane.transform.matrix
            );
            const orientation = planeOrientation(plane, plane.semanticLabel);
            if (orientation !== xrPlane[P_PLANE].orientation) {
              xrPlane[P_PLANE].orientation = orientation;
              xrPlane[P_PLANE].lastChangedTime = frame.predictedDisplayTime;
            }
          }
          xrPlane[P_PLANE].frame = frame;
          frame[P_FRAME].detectedPlanes.add(xrPlane);
        });
      },
      trackedMeshes: /* @__PURE__ */ new Map(),
      updateTrackedMeshes: (frame) => {
        const sem = this[P_SESSION].device[P_DEVICE].sem;
        if (!sem) {
          return;
        }
        const trackedMeshes = Array.from(this[P_SESSION].trackedMeshes.keys());
        trackedMeshes.forEach((mesh) => {
          if (!sem.trackedMeshes.has(mesh)) {
            this[P_SESSION].trackedMeshes.delete(mesh);
          }
        });
        sem.trackedMeshes.forEach((mesh) => {
          let xrMesh = this[P_SESSION].trackedMeshes.get(mesh);
          if (!xrMesh) {
            const meshSpace = new XRSpace(
              this[P_SESSION].device[P_DEVICE].globalSpace,
              mesh.transform.matrix
            );
            xrMesh = new XRMesh(
              mesh,
              meshSpace,
              mesh.vertices,
              mesh.indices,
              mesh.semanticLabel
            );
            xrMesh[P_MESH].lastChangedTime = frame.predictedDisplayTime;
            this[P_SESSION].trackedMeshes.set(mesh, xrMesh);
          } else {
            XRSpaceUtils.updateOffsetMatrix(
              xrMesh.meshSpace,
              mesh.transform.matrix
            );
          }
          xrMesh[P_MESH].frame = frame;
          frame[P_FRAME].detectedMeshes.add(xrMesh);
        });
      },
      depthSensingUsage: _depthSensing?.usagePreference?.[0] ?? "cpu-optimized",
      depthSensingDataFormat: "float32",
      depthTexture: null,
      depthTextureWidth: 0,
      depthTextureHeight: 0,
      depthFlipScratch: null,
      depthFlipScratchSize: 0,
      activeFrame: null,
      computeDepthSensing: (frame) => {
        const sem = this[P_SESSION].device[P_DEVICE].sem;
        if (!sem) return;
        const { depthNear, depthFar } = this[P_SESSION].renderState;
        const baseLayer = this[P_SESSION].renderState.baseLayer;
        if (!baseLayer) return;
        const canvas = baseLayer.context.canvas;
        const depthWidth = Math.max(1, Math.floor(canvas.width / 4));
        const depthHeight = Math.max(1, Math.floor(canvas.height / 4));
        const eyes = this[P_SESSION].mode === "inline" ? ["none" /* None */] : ["left" /* Left */, "right" /* Right */];
        const isGpuOptimized = this[P_SESSION].depthSensingUsage === "gpu-optimized";
        for (const eye of eyes) {
          const projectionMatrix = this[P_SESSION].getProjectionMatrix(eye);
          const viewSpace = this[P_SESSION].device.viewSpaces[eye];
          const viewGlobalMatrix = XRSpaceUtils.calculateGlobalOffsetMatrix(viewSpace);
          const viewMatrix = mat4_exports.create();
          mat4_exports.invert(viewMatrix, viewGlobalMatrix);
          const result = sem.computeDepthBuffer(
            viewMatrix,
            projectionMatrix,
            depthWidth,
            depthHeight,
            depthNear,
            depthFar
          );
          if (result) {
            if (isGpuOptimized) {
              const gl = baseLayer.context;
              const { width: dw, height: dh } = result;
              const numLayers = 2;
              if (!this[P_SESSION].depthTexture || this[P_SESSION].depthTextureWidth !== dw || this[P_SESSION].depthTextureHeight !== dh) {
                if (this[P_SESSION].depthTexture) {
                  gl.deleteTexture(this[P_SESSION].depthTexture);
                }
                this[P_SESSION].depthTexture = gl.createTexture();
                gl.bindTexture(
                  gl.TEXTURE_2D_ARRAY,
                  this[P_SESSION].depthTexture
                );
                gl.texStorage3D(
                  gl.TEXTURE_2D_ARRAY,
                  1,
                  gl.R32F,
                  dw,
                  dh,
                  numLayers
                );
                gl.texParameteri(
                  gl.TEXTURE_2D_ARRAY,
                  gl.TEXTURE_MIN_FILTER,
                  gl.NEAREST
                );
                gl.texParameteri(
                  gl.TEXTURE_2D_ARRAY,
                  gl.TEXTURE_MAG_FILTER,
                  gl.NEAREST
                );
                gl.texParameteri(
                  gl.TEXTURE_2D_ARRAY,
                  gl.TEXTURE_WRAP_S,
                  gl.CLAMP_TO_EDGE
                );
                gl.texParameteri(
                  gl.TEXTURE_2D_ARRAY,
                  gl.TEXTURE_WRAP_T,
                  gl.CLAMP_TO_EDGE
                );
                this[P_SESSION].depthTextureWidth = dw;
                this[P_SESSION].depthTextureHeight = dh;
              } else {
                gl.bindTexture(
                  gl.TEXTURE_2D_ARRAY,
                  this[P_SESSION].depthTexture
                );
              }
              const srcData = new Float32Array(result.data);
              const flipSize = dw * dh;
              if (!this[P_SESSION].depthFlipScratch || this[P_SESSION].depthFlipScratchSize !== flipSize) {
                this[P_SESSION].depthFlipScratch = new Float32Array(flipSize);
                this[P_SESSION].depthFlipScratchSize = flipSize;
              }
              const flippedData = this[P_SESSION].depthFlipScratch;
              for (let row = 0; row < dh; row++) {
                const srcRow = dh - 1 - row;
                for (let col = 0; col < dw; col++) {
                  const depthM = srcData[srcRow * dw + col];
                  flippedData[row * dw + col] = depthM > 0 ? 1 - depthNear / depthM : 0;
                }
              }
              const prevFlipY = gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL);
              const prevPremultiply = gl.getParameter(
                gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL
              );
              gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
              gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
              const layerIndex = eye === "right" /* Right */ ? 1 : 0;
              gl.texSubImage3D(
                gl.TEXTURE_2D_ARRAY,
                0,
                0,
                0,
                layerIndex,
                dw,
                dh,
                1,
                gl.RED,
                gl.FLOAT,
                flippedData
              );
              gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, prevFlipY);
              gl.pixelStorei(
                gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                prevPremultiply
              );
              const gpuDepthInfo = new XRWebGLDepthInformation(
                this[P_SESSION].depthTexture,
                dw,
                dh,
                new XRRigidTransform(),
                result.rawValueToMeters,
                depthNear,
                depthFar,
                "texture-array",
                layerIndex
              );
              frame[P_FRAME].gpuDepthDataMap.set(eye, gpuDepthInfo);
            } else {
              const cpuDepthInfo = new XRCPUDepthInformation(
                result.data,
                result.width,
                result.height,
                new XRRigidTransform(),
                result.rawValueToMeters,
                this[P_SESSION].depthSensingDataFormat
              );
              frame[P_FRAME].depthDataMap.set(eye, cpuDepthInfo);
            }
          }
        }
      },
      hitTestSources: /* @__PURE__ */ new Set(),
      computeHitTestResults: (frame) => {
        const sem = this[P_SESSION].device[P_DEVICE].sem;
        if (!sem) return;
        const globalSpace = this[P_SESSION].device[P_DEVICE].globalSpace;
        this[P_SESSION].hitTestSources.forEach((hitTestSource) => {
          const sourceSpace = hitTestSource[P_HIT_TEST].space;
          const sourceGlobalOffset = XRSpaceUtils.calculateGlobalOffsetMatrix(sourceSpace);
          const rayLocalOffset = hitTestSource[P_HIT_TEST].offsetRay.matrix;
          const rayGlobalOffset = mat4_exports.create();
          mat4_exports.multiply(rayGlobalOffset, sourceGlobalOffset, rayLocalOffset);
          const hitTestResults = [];
          sem.computeHitTestResults(rayGlobalOffset).forEach((matrix) => {
            const offsetSpace = new XRSpace(globalSpace, matrix);
            const hitTestResult = new XRHitTestResult(frame, offsetSpace);
            hitTestResults.push(hitTestResult);
          });
          frame[P_FRAME].hitTestResultsMap.set(hitTestSource, hitTestResults);
        });
      },
      onend: null,
      oninputsourceschange: null,
      onselect: null,
      onselectstart: null,
      onselectend: null,
      onsqueeze: null,
      onsqueezestart: null,
      onsqueezeend: null,
      onvisibilitychange: null,
      onframeratechange: null,
      host: null,
      teardown: () => {
        const session = this[P_SESSION];
        session.device[P_DEVICE].onSessionEnd();
        session.frameCallbacks.length = 0;
        session.currentFrameCallbacks = null;
        session.activeFrame = null;
        session.referenceSpaces.length = 0;
        session.hitTestSources.clear();
        session.trackedPlanes.clear();
        session.trackedMeshes.clear();
        session.trackedAnchors.clear();
        session.frameTrackedAnchors.clear();
        session.newAnchors.forEach(({ reject: rejectAnchor }) => {
          rejectAnchor(
            new DOMException(
              "XRSession has ended before the anchor was resolved.",
              "InvalidStateError"
            )
          );
        });
        session.newAnchors.clear();
        if (session.depthTexture) {
          const depthContext = session.renderState.baseLayer?.context;
          depthContext?.deleteTexture(session.depthTexture);
          session.depthTexture = null;
        }
      }
    };
    const hostBackend = device[P_DEVICE].host;
    if (hostBackend) {
      this[P_SESSION].host = new XRHostSession(this, hostBackend);
      this[P_SESSION].renderState = new XRRenderState({ layers: [] });
      return;
    }
    XRAnchorUtils.recoverPersistentAnchorsFromStorage(this);
    this[P_SESSION].onDeviceFrame();
  }
  get visibilityState() {
    return this[P_SESSION].device.visibilityState;
  }
  get frameRate() {
    const host = this[P_SESSION].host;
    if (host) {
      return host.frameRate > 0 ? host.frameRate : void 0;
    }
    return this[P_SESSION].nominalFrameRate;
  }
  get supportedFrameRates() {
    return this[P_SESSION].host ? this[P_SESSION].host.supportedFrameRates : this[P_SESSION].supportedFrameRates;
  }
  get renderState() {
    return this[P_SESSION].renderState;
  }
  get inputSources() {
    const state = this[P_SESSION];
    const array = state.inputSourceArray;
    if (state.ended || state.mode === "inline") {
      truncateArray(array, 0);
      return array;
    }
    const active = state.activeInputSources;
    const count = active.length;
    for (let i = 0; i < count; i++) {
      array[i] = active[i];
    }
    truncateArray(array, count);
    return array;
  }
  // all tracked sources (the input sources here: one per hand)
  get trackedSources() {
    return this.inputSources;
  }
  get enabledFeatures() {
    return this[P_SESSION].enabledFeatures;
  }
  get isSystemKeyboardSupported() {
    return this[P_SESSION].isSystemKeyboardSupported;
  }
  get environmentBlendMode() {
    return this[P_SESSION].device[P_DEVICE].environmentBlendModes[this[P_SESSION].mode] ?? "opaque" /* Opaque */;
  }
  get interactionMode() {
    return this[P_SESSION].device[P_DEVICE].interactionMode;
  }
  get depthUsage() {
    return this[P_SESSION].depthSensingUsage;
  }
  get depthDataFormat() {
    return this[P_SESSION].depthSensingDataFormat;
  }
  updateRenderState(state = {}) {
    if (this[P_SESSION].ended) {
      throw new DOMException(
        "XRSession has already ended.",
        "InvalidStateError"
      );
    }
    if (state.baseLayer && state.baseLayer[P_WEBGL_LAYER].session !== this) {
      throw new DOMException(
        "Base layer was created by a different XRSession",
        "InvalidStateError"
      );
    }
    if (state.inlineVerticalFieldOfView != null && this[P_SESSION].mode !== "inline") {
      throw new DOMException(
        "InlineVerticalFieldOfView must not be set for an immersive session",
        "InvalidStateError"
      );
    }
    if (this[P_SESSION].host) {
      this.updateHostRenderState(state);
      return;
    }
    const compoundStateInit = {
      // Use nullish coalescing so legitimate 0 values (e.g.
      // inlineVerticalFieldOfView=0) are preserved instead of being dropped.
      baseLayer: state.baseLayer ?? this[P_SESSION].pendingRenderState?.baseLayer ?? void 0,
      depthFar: state.depthFar ?? this[P_SESSION].pendingRenderState?.depthFar ?? void 0,
      depthNear: state.depthNear ?? this[P_SESSION].pendingRenderState?.depthNear ?? void 0,
      inlineVerticalFieldOfView: state.inlineVerticalFieldOfView ?? this[P_SESSION].pendingRenderState?.inlineVerticalFieldOfView ?? void 0
    };
    this[P_SESSION].pendingRenderState = new XRRenderState(
      compoundStateInit,
      this[P_SESSION].renderState
    );
  }
  // Host mode. Checks the WebXR Layers rules for `layers`, then queues the
  // new state on top of any state already queued; it becomes the active
  // render state when the next host frame starts.
  updateHostRenderState(state) {
    const requestedLayers = state.layers;
    if (requestedLayers != null) {
      if (state.baseLayer) {
        throw new TypeError(
          "updateRenderState: set either baseLayer or layers, not both."
        );
      }
      for (let i = 0; i < requestedLayers.length; i++) {
        const candidate = requestedLayers[i];
        if (!(candidate instanceof XRCompositionLayer)) {
          throw new TypeError(
            `updateRenderState: layers[${i}] is not an XRCompositionLayer.`
          );
        }
        if (candidate[P_COMPOSITION_LAYER].session !== this) {
          throw new DOMException(
            `updateRenderState: layers[${i}] belongs to another XRSession.`,
            "InvalidStateError"
          );
        }
      }
    }
    const queued2 = {
      depthNear: state.depthNear,
      depthFar: state.depthFar
    };
    if (state.passthroughFullyObscured !== void 0) {
      queued2.passthroughFullyObscured = !!state.passthroughFullyObscured;
    }
    if (requestedLayers !== void 0) {
      queued2.layers = requestedLayers || [];
    }
    if (state.baseLayer !== void 0) {
      queued2.baseLayer = state.baseLayer;
    }
    this[P_SESSION].pendingRenderState = new XRRenderState(
      queued2,
      this[P_SESSION].pendingRenderState ?? this[P_SESSION].renderState
    );
  }
  // the nominal frame rate updates are emulated, no actual update to the
  // display frame rate of the device will be executed
  async updateTargetFrameRate(rate) {
    if (this[P_SESSION].host) {
      return this[P_SESSION].host.updateTargetFrameRate(rate);
    }
    return new Promise((resolve, reject) => {
      if (this[P_SESSION].ended) {
        reject(
          new DOMException("XRSession has already ended.", "InvalidStateError")
        );
      } else if (!this[P_SESSION].device.supportedFrameRates.includes(rate)) {
        reject(
          new DOMException(
            "Requested frame rate not supported.",
            "InvalidStateError"
          )
        );
      } else {
        if (this[P_SESSION].nominalFrameRate === rate) {
          console.log(
            `Requested frame rate is the same as the current nominal frame rate, no update made`
          );
        } else {
          this[P_SESSION].nominalFrameRate = rate;
          this.dispatchEvent(
            new XRSessionEvent("frameratechange", { session: this })
          );
          console.log(`Nominal frame rate updated to ${rate}`);
        }
        resolve();
      }
    });
  }
  async requestReferenceSpace(type) {
    return new Promise((resolve, reject) => {
      if (this[P_SESSION].ended || !this[P_SESSION].referenceSpaceIsSupported(type)) {
        reject(
          new DOMException(
            "The requested reference space type is not supported.",
            "NotSupportedError"
          )
        );
        return;
      }
      let referenceSpace;
      const host = this[P_SESSION].host;
      if (host) {
        const hostSpace = host.createReferenceSpace(type);
        if (!hostSpace) {
          reject(
            new DOMException(
              "The requested reference space type is not supported.",
              "NotSupportedError"
            )
          );
          return;
        }
        this[P_SESSION].referenceSpaces.push(hostSpace);
        resolve(hostSpace);
        return;
      }
      switch (type) {
        case "viewer" /* Viewer */:
          referenceSpace = this[P_SESSION].device.viewerSpace;
          break;
        case "local" /* Local */:
          referenceSpace = new XRReferenceSpace(
            type,
            this[P_SESSION].device[P_DEVICE].globalSpace,
            this[P_SESSION].device.viewerSpace[P_SPACE].offsetMatrix
          );
          break;
        case "local-floor" /* LocalFloor */:
        case "bounded-floor" /* BoundedFloor */:
        case "unbounded" /* Unbounded */:
          referenceSpace = new XRReferenceSpace(
            type,
            this[P_SESSION].device[P_DEVICE].globalSpace
          );
          break;
      }
      this[P_SESSION].referenceSpaces.push(referenceSpace);
      resolve(referenceSpace);
    });
  }
  requestAnimationFrame(callback) {
    if (this[P_SESSION].ended) {
      return 0;
    }
    const frameHandle = ++this[P_SESSION].frameHandle;
    const host = this[P_SESSION].host;
    this[P_SESSION].frameCallbacks.push(
      host ? (
        // host mode recycles registrations, so steady frames allocate nothing
        host.frameRequest(frameHandle, callback)
      ) : {
        handle: frameHandle,
        callback,
        cancelled: false
      }
    );
    return frameHandle;
  }
  cancelAnimationFrame(handle) {
    let callbacks = this[P_SESSION].frameCallbacks;
    let index = callbacks.findIndex((d) => d && d.handle === handle);
    if (index > -1) {
      callbacks[index].cancelled = true;
      callbacks.splice(index, 1);
    }
    callbacks = this[P_SESSION].currentFrameCallbacks;
    if (callbacks) {
      index = callbacks.findIndex((d) => d && d.handle === handle);
      if (index > -1) {
        callbacks[index].cancelled = true;
      }
    }
  }
  async end() {
    if (this[P_SESSION].host) {
      return this[P_SESSION].host.end();
    }
    return new Promise((resolve, reject) => {
      if (this[P_SESSION].ended) {
        reject(
          new DOMException("XRSession has already ended.", "InvalidStateError")
        );
      } else {
        this[P_SESSION].ended = true;
        globalThis.cancelAnimationFrame(this[P_SESSION].deviceFrameHandle);
        this[P_SESSION].deviceFrameHandle = void 0;
        this[P_SESSION].teardown();
        this.dispatchEvent(new XRSessionEvent("end", { session: this }));
        resolve();
      }
    });
  }
  // anchors
  get persistentAnchors() {
    return Array.from(this[P_SESSION].persistentAnchors.keys());
  }
  restorePersistentAnchor(uuid) {
    return new Promise((resolve, reject) => {
      if (!this[P_SESSION].persistentAnchors.has(uuid)) {
        reject(
          new DOMException(
            `Persistent anchor with uuid ${uuid} not found.`,
            "InvalidStateError"
          )
        );
      } else if (this[P_SESSION].ended) {
        reject(
          new DOMException("XRSession has already ended.", "InvalidStateError")
        );
      } else {
        const anchor = this[P_SESSION].persistentAnchors.get(uuid);
        if (this[P_SESSION].newAnchors.has(anchor)) {
          reject(
            new DOMException(
              `Multiple concurrent attempts detected to restore the anchor with UUID: ${uuid}.`,
              "InvalidStateError"
            )
          );
        } else {
          this[P_SESSION].trackedAnchors.add(anchor);
          this[P_SESSION].newAnchors.set(anchor, { resolve, reject });
        }
      }
    });
  }
  deletePersistentAnchor(uuid) {
    return new Promise((resolve, reject) => {
      if (!this[P_SESSION].persistentAnchors.has(uuid)) {
        reject(
          new DOMException(
            `Persistent anchor with uuid ${uuid} not found.`,
            "InvalidStateError"
          )
        );
      } else {
        const anchor = this[P_SESSION].persistentAnchors.get(uuid);
        this[P_SESSION].persistentAnchors.delete(uuid);
        anchor.delete();
        resolve(void 0);
      }
    });
  }
  requestHitTestSource(options) {
    return new Promise((resolve, reject) => {
      if (!this[P_SESSION].enabledFeatures.includes("hit-test")) {
        reject(
          new DOMException(
            `WebXR feature "hit-test" is not supported by current session`,
            "NotSupportedError"
          )
        );
      } else if (this[P_SESSION].ended) {
        reject(
          new DOMException("XRSession has already ended.", "InvalidStateError")
        );
      } else if (!this[P_SESSION].device[P_DEVICE].sem) {
        reject(
          new DOMException(
            "Synthethic Environment Module required for emulating hit-test",
            "OperationError"
          )
        );
      } else {
        const xrHitTestSource = new XRHitTestSource(this, options);
        this[P_SESSION].hitTestSources.add(xrHitTestSource);
        resolve(xrHitTestSource);
      }
    });
  }
  // events
  get onend() {
    return this[P_SESSION].onend;
  }
  set onend(callback) {
    if (this[P_SESSION].onend) {
      this.removeEventListener("end", this[P_SESSION].onend);
    }
    this[P_SESSION].onend = callback;
    if (callback) {
      this.addEventListener("end", callback);
    }
  }
  get oninputsourceschange() {
    return this[P_SESSION].oninputsourceschange;
  }
  set oninputsourceschange(callback) {
    if (this[P_SESSION].oninputsourceschange) {
      this.removeEventListener(
        "inputsourceschange",
        this[P_SESSION].oninputsourceschange
      );
    }
    this[P_SESSION].oninputsourceschange = callback;
    if (callback) {
      this.addEventListener("inputsourceschange", callback);
    }
  }
  get onselect() {
    return this[P_SESSION].onselect;
  }
  set onselect(callback) {
    if (this[P_SESSION].onselect) {
      this.removeEventListener(
        "select",
        this[P_SESSION].onselect
      );
    }
    this[P_SESSION].onselect = callback;
    if (callback) {
      this.addEventListener("select", callback);
    }
  }
  get onselectstart() {
    return this[P_SESSION].onselectstart;
  }
  set onselectstart(callback) {
    if (this[P_SESSION].onselectstart) {
      this.removeEventListener(
        "selectstart",
        this[P_SESSION].onselectstart
      );
    }
    this[P_SESSION].onselectstart = callback;
    if (callback) {
      this.addEventListener("selectstart", callback);
    }
  }
  get onselectend() {
    return this[P_SESSION].onselectend;
  }
  set onselectend(callback) {
    if (this[P_SESSION].onselectend) {
      this.removeEventListener(
        "selectend",
        this[P_SESSION].onselectend
      );
    }
    this[P_SESSION].onselectend = callback;
    if (callback) {
      this.addEventListener("selectend", callback);
    }
  }
  get onsqueeze() {
    return this[P_SESSION].onsqueeze;
  }
  set onsqueeze(callback) {
    if (this[P_SESSION].onsqueeze) {
      this.removeEventListener(
        "squeeze",
        this[P_SESSION].onsqueeze
      );
    }
    this[P_SESSION].onsqueeze = callback;
    if (callback) {
      this.addEventListener("squeeze", callback);
    }
  }
  get onsqueezestart() {
    return this[P_SESSION].onsqueezestart;
  }
  set onsqueezestart(callback) {
    if (this[P_SESSION].onsqueezestart) {
      this.removeEventListener(
        "squeezestart",
        this[P_SESSION].onsqueezestart
      );
    }
    this[P_SESSION].onsqueezestart = callback;
    if (callback) {
      this.addEventListener("squeezestart", callback);
    }
  }
  get onsqueezeend() {
    return this[P_SESSION].onsqueezeend;
  }
  set onsqueezeend(callback) {
    if (this[P_SESSION].onsqueezeend) {
      this.removeEventListener(
        "squeezeend",
        this[P_SESSION].onsqueezeend
      );
    }
    this[P_SESSION].onsqueezeend = callback;
    if (callback) {
      this.addEventListener("squeezeend", callback);
    }
  }
  get onvisibilitychange() {
    return this[P_SESSION].onvisibilitychange;
  }
  set onvisibilitychange(callback) {
    if (this[P_SESSION].onvisibilitychange) {
      this.removeEventListener(
        "visibilitychange",
        this[P_SESSION].onvisibilitychange
      );
    }
    this[P_SESSION].onvisibilitychange = callback;
    if (callback) {
      this.addEventListener("visibilitychange", callback);
    }
  }
  get onframeratechange() {
    return this[P_SESSION].onframeratechange;
  }
  set onframeratechange(callback) {
    if (this[P_SESSION].onframeratechange) {
      this.removeEventListener(
        "frameratechange",
        this[P_SESSION].onframeratechange
      );
    }
    this[P_SESSION].onframeratechange = callback;
    if (callback) {
      this.addEventListener("frameratechange", callback);
    }
  }
};

// src/input/XRHand.ts
var XRHandJoint = /* @__PURE__ */ ((XRHandJoint2) => {
  XRHandJoint2["Wrist"] = "wrist";
  XRHandJoint2["ThumbMetacarpal"] = "thumb-metacarpal";
  XRHandJoint2["ThumbPhalanxProximal"] = "thumb-phalanx-proximal";
  XRHandJoint2["ThumbPhalanxDistal"] = "thumb-phalanx-distal";
  XRHandJoint2["ThumbTip"] = "thumb-tip";
  XRHandJoint2["IndexFingerMetacarpal"] = "index-finger-metacarpal";
  XRHandJoint2["IndexFingerPhalanxProximal"] = "index-finger-phalanx-proximal";
  XRHandJoint2["IndexFingerPhalanxIntermediate"] = "index-finger-phalanx-intermediate";
  XRHandJoint2["IndexFingerPhalanxDistal"] = "index-finger-phalanx-distal";
  XRHandJoint2["IndexFingerTip"] = "index-finger-tip";
  XRHandJoint2["MiddleFingerMetacarpal"] = "middle-finger-metacarpal";
  XRHandJoint2["MiddleFingerPhalanxProximal"] = "middle-finger-phalanx-proximal";
  XRHandJoint2["MiddleFingerPhalanxIntermediate"] = "middle-finger-phalanx-intermediate";
  XRHandJoint2["MiddleFingerPhalanxDistal"] = "middle-finger-phalanx-distal";
  XRHandJoint2["MiddleFingerTip"] = "middle-finger-tip";
  XRHandJoint2["RingFingerMetacarpal"] = "ring-finger-metacarpal";
  XRHandJoint2["RingFingerPhalanxProximal"] = "ring-finger-phalanx-proximal";
  XRHandJoint2["RingFingerPhalanxIntermediate"] = "ring-finger-phalanx-intermediate";
  XRHandJoint2["RingFingerPhalanxDistal"] = "ring-finger-phalanx-distal";
  XRHandJoint2["RingFingerTip"] = "ring-finger-tip";
  XRHandJoint2["PinkyFingerMetacarpal"] = "pinky-finger-metacarpal";
  XRHandJoint2["PinkyFingerPhalanxProximal"] = "pinky-finger-phalanx-proximal";
  XRHandJoint2["PinkyFingerPhalanxIntermediate"] = "pinky-finger-phalanx-intermediate";
  XRHandJoint2["PinkyFingerPhalanxDistal"] = "pinky-finger-phalanx-distal";
  XRHandJoint2["PinkyFingerTip"] = "pinky-finger-tip";
  return XRHandJoint2;
})(XRHandJoint || {});
var XRHand = class extends Map {
};

// src/spaces/XRJointSpace.ts
var _a11;
var XRJointSpace = class extends (_a11 = XRSpace, P_JOINT_SPACE, _a11) {
  constructor(jointName, parentSpace, offsetMatrix) {
    super(parentSpace, offsetMatrix);
    this[P_JOINT_SPACE] = { jointName, radius: 0 };
  }
  get jointName() {
    return this[P_JOINT_SPACE].jointName;
  }
};

// src/device/configs/hand/builder.ts
var LONG_FINGER_CHAINS = {
  index: [
    "index-finger-metacarpal" /* IndexFingerMetacarpal */,
    "index-finger-phalanx-proximal" /* IndexFingerPhalanxProximal */,
    "index-finger-phalanx-intermediate" /* IndexFingerPhalanxIntermediate */,
    "index-finger-phalanx-distal" /* IndexFingerPhalanxDistal */,
    "index-finger-tip" /* IndexFingerTip */
  ],
  middle: [
    "middle-finger-metacarpal" /* MiddleFingerMetacarpal */,
    "middle-finger-phalanx-proximal" /* MiddleFingerPhalanxProximal */,
    "middle-finger-phalanx-intermediate" /* MiddleFingerPhalanxIntermediate */,
    "middle-finger-phalanx-distal" /* MiddleFingerPhalanxDistal */,
    "middle-finger-tip" /* MiddleFingerTip */
  ],
  ring: [
    "ring-finger-metacarpal" /* RingFingerMetacarpal */,
    "ring-finger-phalanx-proximal" /* RingFingerPhalanxProximal */,
    "ring-finger-phalanx-intermediate" /* RingFingerPhalanxIntermediate */,
    "ring-finger-phalanx-distal" /* RingFingerPhalanxDistal */,
    "ring-finger-tip" /* RingFingerTip */
  ],
  pinky: [
    "pinky-finger-metacarpal" /* PinkyFingerMetacarpal */,
    "pinky-finger-phalanx-proximal" /* PinkyFingerPhalanxProximal */,
    "pinky-finger-phalanx-intermediate" /* PinkyFingerPhalanxIntermediate */,
    "pinky-finger-phalanx-distal" /* PinkyFingerPhalanxDistal */,
    "pinky-finger-tip" /* PinkyFingerTip */
  ]
};
var THUMB_CHAIN = [
  "thumb-metacarpal" /* ThumbMetacarpal */,
  "thumb-phalanx-proximal" /* ThumbPhalanxProximal */,
  "thumb-phalanx-distal" /* ThumbPhalanxDistal */,
  "thumb-tip" /* ThumbTip */
];
var R2D = 180 / Math.PI;
var D2R = Math.PI / 180;
var parentOf = (joint) => {
  for (const chain of [THUMB_CHAIN, ...Object.values(LONG_FINGER_CHAINS)]) {
    const i = chain.indexOf(joint);
    if (i >= 0) return i === 0 ? "wrist" /* Wrist */ : chain[i - 1];
  }
  throw new Error(`No parent for ${joint}`);
};
var localTransform = (pose, joint) => {
  const local = mat4_exports.create();
  mat4_exports.invert(local, pose.jointTransforms[parentOf(joint)].offsetMatrix);
  mat4_exports.multiply(local, local, pose.jointTransforms[joint].offsetMatrix);
  const m21 = local[1];
  const m22 = local[5];
  const m13 = local[8];
  const m23 = local[9];
  const m33 = local[10];
  const pitch = Math.asin(-Math.min(Math.max(m23, -1), 1));
  const gimbal = Math.abs(m23) >= 0.9999999;
  return {
    translation: mat4_exports.getTranslation(vec3_exports.create(), local),
    rotation: mat4_exports.getRotation(quat_exports.create(), local),
    yaw: (gimbal ? Math.atan2(-local[2], local[0]) : Math.atan2(m13, m33)) * R2D,
    pitch: pitch * R2D,
    roll: gimbal ? 0 : Math.atan2(m21, m22) * R2D
  };
};
var qx = quat_exports.create();
var qy = quat_exports.create();
var qz = quat_exports.create();
var fromYawPitchRoll = (yaw, pitch, roll) => {
  quat_exports.setAxisAngle(qy, [0, 1, 0], yaw * D2R);
  quat_exports.setAxisAngle(qx, [1, 0, 0], pitch * D2R);
  quat_exports.setAxisAngle(qz, [0, 0, 1], roll * D2R);
  const out = quat_exports.multiply(quat_exports.create(), qy, qx);
  return quat_exports.multiply(out, out, qz);
};
var buildHandPose = (angles, rest, opposed) => {
  const restLocal = {};
  for (const joint of Object.values(XRHandJoint)) {
    if (joint !== "wrist" /* Wrist */) {
      restLocal[joint] = localTransform(rest, joint);
    }
  }
  const locals = {};
  const set5 = (joint, rotation, translation) => {
    locals[joint] = mat4_exports.fromRotationTranslation(
      mat4_exports.create(),
      rotation,
      translation ?? restLocal[joint].translation
    );
  };
  const [cmc, proximal, distal, tip] = THUMB_CHAIN;
  const thumb = angles.thumb ?? {};
  const cmcRest = restLocal[cmc];
  set5(
    cmc,
    fromYawPitchRoll(
      ...thumb.cmc ?? [cmcRest.yaw, cmcRest.pitch, cmcRest.roll]
    ),
    vec3_exports.lerp(
      vec3_exports.create(),
      cmcRest.translation,
      localTransform(opposed, cmc).translation,
      thumb.shift ?? 0
    )
  );
  set5(
    proximal,
    fromYawPitchRoll(
      thumb.mcpYaw ?? restLocal[proximal].yaw,
      thumb.mcp !== void 0 ? -thumb.mcp : restLocal[proximal].pitch,
      thumb.mcpRoll ?? restLocal[proximal].roll
    )
  );
  set5(
    distal,
    fromYawPitchRoll(
      thumb.ipYaw ?? restLocal[distal].yaw,
      thumb.ip !== void 0 ? -thumb.ip : restLocal[distal].pitch,
      thumb.ipRoll ?? restLocal[distal].roll
    )
  );
  set5(tip, restLocal[tip].rotation);
  for (const [finger, chain] of Object.entries(LONG_FINGER_CHAINS)) {
    const [metacarpal, prox, intermediate, dist3, fingerTip] = chain;
    const a = angles[finger] ?? {};
    const straight = finger === "pinky" ? restLocal[prox].pitch : 0;
    set5(metacarpal, restLocal[metacarpal].rotation);
    set5(
      prox,
      fromYawPitchRoll(
        a.yaw ?? restLocal[prox].yaw,
        a.mcp !== void 0 ? straight - a.mcp : restLocal[prox].pitch,
        a.roll ?? restLocal[prox].roll
      )
    );
    set5(
      intermediate,
      fromYawPitchRoll(
        a.pipYaw ?? restLocal[intermediate].yaw,
        a.pip !== void 0 ? -a.pip : restLocal[intermediate].pitch,
        a.pipRoll ?? restLocal[intermediate].roll
      )
    );
    set5(
      dist3,
      fromYawPitchRoll(
        restLocal[dist3].yaw,
        a.dip !== void 0 ? -a.dip : restLocal[dist3].pitch,
        restLocal[dist3].roll
      )
    );
    set5(fingerTip, restLocal[fingerTip].rotation);
  }
  const jointTransforms = {};
  for (const joint of Object.values(XRHandJoint)) {
    const offsetMatrix = joint === "wrist" /* Wrist */ ? mat4_exports.clone(rest.jointTransforms[joint].offsetMatrix) : mat4_exports.multiply(
      mat4_exports.create(),
      jointTransforms[parentOf(joint)].offsetMatrix,
      locals[joint]
    );
    jointTransforms[joint] = {
      offsetMatrix,
      radius: rest.jointTransforms[joint].radius
    };
  }
  return {
    jointTransforms,
    gripOffsetMatrix: rest.gripOffsetMatrix ? mat4_exports.clone(rest.gripOffsetMatrix) : void 0
  };
};

// src/device/configs/hand/pinch.ts
var pinchHandPose = {
  jointTransforms: {
    wrist: {
      offsetMatrix: [
        0.9060805439949036,
        -0.1844543218612671,
        0.3807799518108368,
        0,
        -0.08027800172567368,
        0.8086723685264587,
        0.5827555656433105,
        0,
        -0.4154181182384491,
        -0.5585917234420776,
        0.7179155349731445,
        0,
        -0.06867414712905884,
        -0.009423808194696903,
        0.10627774149179459,
        1
      ],
      radius: 0.021460847929120064
    },
    "thumb-metacarpal": {
      offsetMatrix: [
        -0.5012241005897522,
        -0.8650535345077515,
        -0.0213695727288723,
        0,
        0.7415963411331177,
        -0.4421543478965759,
        0.5045139193534851,
        0,
        -0.44587990641593933,
        0.23702676594257355,
        0.8631392121315002,
        0,
        -0.032122574746608734,
        -0.01196830440312624,
        0.07194234430789948,
        1
      ],
      radius: 0.019382517784833908
    },
    "thumb-phalanx-proximal": {
      offsetMatrix: [
        -0.3175753057003021,
        -0.9460570216178894,
        -0.06419729441404343,
        0,
        0.8958902955055237,
        -0.32153913378715515,
        0.30658137798309326,
        0,
        -0.3106854259967804,
        0.03984907269477844,
        0.9496771097183228,
        0,
        -0.017625702545046806,
        -0.01967475935816765,
        0.04387917369604111,
        1
      ],
      radius: 0.01228295173496008
    },
    "thumb-phalanx-distal": {
      offsetMatrix: [
        -0.4944636821746826,
        -0.8691971898078918,
        0.001086252392269671,
        0,
        0.8307800889015198,
        -0.4722411036491394,
        0.2946045398712158,
        0,
        -0.25555649399757385,
        0.14657381176948547,
        0.9556186199188232,
        0,
        -0.007126678712666035,
        -0.021021386608481407,
        0.011786630377173424,
        1
      ],
      radius: 0.009768804535269737
    },
    "thumb-tip": {
      offsetMatrix: [
        -0.4944636821746826,
        -0.8691971898078918,
        0.001086252392269671,
        0,
        0.8307800889015198,
        -0.4722411036491394,
        0.2946045398712158,
        0,
        -0.25555649399757385,
        0.14657381176948547,
        0.9556186199188232,
        0,
        3423091256991029e-19,
        -0.024528030306100845,
        -0.011410919018089771,
        1
      ],
      radius: 0.008768804371356964
    },
    "index-finger-metacarpal": {
      offsetMatrix: [
        0.9060805439949036,
        -0.1844543218612671,
        0.3807799518108368,
        0,
        -0.08027800172567368,
        0.8086723685264587,
        0.5827555656433105,
        0,
        -0.4154181182384491,
        -0.5585917234420776,
        0.7179155349731445,
        0,
        -0.038037415593862534,
        -0.0020236473064869642,
        0.07626739144325256,
        1
      ],
      radius: 0.021228281781077385
    },
    "index-finger-phalanx-proximal": {
      offsetMatrix: [
        0.7986818552017212,
        -0.35985732078552246,
        0.48229536414146423,
        0,
        0.538311243057251,
        0.7854709625244141,
        -0.30537736415863037,
        0,
        -0.2689369022846222,
        0.5035246014595032,
        0.8210577368736267,
        0,
        -0.006869405973702669,
        0.033938243985176086,
        0.04206443578004837,
        1
      ],
      radius: 0.010295259766280651
    },
    "index-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.8285930156707764,
        -0.32672837376594543,
        0.4546217918395996,
        0,
        0.5577570199966431,
        0.4116027057170868,
        -0.7207564115524292,
        0,
        0.04836784675717354,
        0.8507823944091797,
        0.5232869386672974,
        0,
        0.0033306588884443045,
        0.014840902760624886,
        0.010923954658210278,
        1
      ],
      radius: 0.00853810179978609
    },
    "index-finger-phalanx-distal": {
      offsetMatrix: [
        0.8412464261054993,
        -0.35794928669929504,
        0.4051857888698578,
        0,
        0.5139996409416199,
        0.29711154103279114,
        -0.8046918511390686,
        0,
        0.16765329241752625,
        0.8852096796035767,
        0.4339304566383362,
        0,
        0.0021551470272243023,
        -0.0058362227864563465,
        -0.0017938464879989624,
        1
      ],
      radius: 0.007636196445673704
    },
    "index-finger-tip": {
      offsetMatrix: [
        0.8412464261054993,
        -0.35794928669929504,
        0.4051857888698578,
        0,
        0.5139996409416199,
        0.29711154103279114,
        -0.8046918511390686,
        0,
        0.16765329241752625,
        0.8852096796035767,
        0.4339304566383362,
        0,
        -0.00131594471167773,
        -0.025222131982445717,
        -0.012442642822861671,
        1
      ],
      radius: 0.006636196281760931
    },
    "middle-finger-metacarpal": {
      offsetMatrix: [
        0.9060805439949036,
        -0.1844543218612671,
        0.3807799518108368,
        0,
        -0.08027800172567368,
        0.8086723685264587,
        0.5827555656433105,
        0,
        -0.4154181182384491,
        -0.5585917234420776,
        0.7179155349731445,
        0,
        -0.05395089089870453,
        0.003063359996303916,
        0.07402937114238739,
        1
      ],
      radius: 0.021231964230537415
    },
    "middle-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9187911748886108,
        -0.1530158370733261,
        0.36387869715690613,
        0,
        0.038666240870952606,
        0.9522662162780762,
        0.302808940410614,
        0,
        -0.3928440511226654,
        -0.26414817571640015,
        0.8808513283729553,
        0,
        -0.02717282809317112,
        0.04162866622209549,
        0.03678669035434723,
        1
      ],
      radius: 0.01117393933236599
    },
    "middle-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9228746294975281,
        -0.12856416404247284,
        0.36300456523895264,
        0,
        0.14524033665657043,
        0.9892153143882751,
        -0.01890045404434204,
        0,
        -0.3566599190235138,
        0.07016586512327194,
        0.9315956234931946,
        0,
        -0.01030921470373869,
        0.05296773463487625,
        -0.0010256498353555799,
        1
      ],
      radius: 0.008030958473682404
    },
    "middle-finger-phalanx-distal": {
      offsetMatrix: [
        0.9325166344642639,
        -0.040404170751571655,
        0.35885775089263916,
        0,
        0.06836572289466858,
        0.995502769947052,
        -0.0655682161450386,
        0,
        -0.3545948565006256,
        0.08567725121974945,
        0.9310863614082336,
        0,
        -4833847051486373e-19,
        0.05103470757603645,
        -0.026690717786550522,
        1
      ],
      radius: 0.007629410829395056
    },
    "middle-finger-tip": {
      offsetMatrix: [
        0.9325166344642639,
        -0.040404170751571655,
        0.35885775089263916,
        0,
        0.06836572289466858,
        0.995502769947052,
        -0.0655682161450386,
        0,
        -0.3545948565006256,
        0.08567725121974945,
        0.9310863614082336,
        0,
        0.008158999495208263,
        0.05004044249653816,
        -0.050120558589696884,
        1
      ],
      radius: 0.006629410665482283
    },
    "ring-finger-metacarpal": {
      offsetMatrix: [
        0.9060805439949036,
        -0.1844543218612671,
        0.3807799518108368,
        0,
        -0.08027800172567368,
        0.8086723685264587,
        0.5827555656433105,
        0,
        -0.4154181182384491,
        -0.5585917234420776,
        0.7179155349731445,
        0,
        -0.06732909381389618,
        0.007902119308710098,
        0.07209732383489609,
        1
      ],
      radius: 0.019088275730609894
    },
    "ring-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9391821026802063,
        -0.027994679287075996,
        0.34227466583251953,
        0,
        -0.18282271921634674,
        0.8029410243034363,
        0.5673282742500305,
        0,
        -0.2907087206840515,
        -0.5954000353813171,
        0.7489906549453735,
        0,
        -0.047129884362220764,
        0.03806127607822418,
        0.032147664576768875,
        1
      ],
      radius: 0.00992213748395443
    },
    "ring-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9249380826950073,
        0.03699534013867378,
        0.3783116042613983,
        0,
        -0.12898847460746765,
        0.9667453765869141,
        0.2208271026611328,
        0,
        -0.3575615882873535,
        -0.25304901599884033,
        0.8989526629447937,
        0,
        -0.03579339757561684,
        0.06127955764532089,
        0.002939916681498289,
        1
      ],
      radius: 0.007611672393977642
    },
    "ring-finger-phalanx-distal": {
      offsetMatrix: [
        0.9001164436340332,
        0.03983335196971893,
        0.4338230490684509,
        0,
        -0.09662467986345291,
        0.9892624020576477,
        0.10964841395616531,
        0,
        -0.4247973561286926,
        -0.14061418175697327,
        0.8943013548851013,
        0,
        -0.026291755959391594,
        0.06800390034914017,
        -0.02094830758869648,
        1
      ],
      radius: 0.007231088820844889
    },
    "ring-finger-tip": {
      offsetMatrix: [
        0.9001164436340332,
        0.03983335196971893,
        0.4338230490684509,
        0,
        -0.09662467986345291,
        0.9892624020576477,
        0.10964841395616531,
        0,
        -0.4247973561286926,
        -0.14061418175697327,
        0.8943013548851013,
        0,
        -0.016345610842108727,
        0.07300511747598648,
        -0.04263874143362045,
        1
      ],
      radius: 0.0062310886569321156
    },
    "pinky-finger-metacarpal": {
      offsetMatrix: [
        0.8769711852073669,
        0.31462907791137695,
        0.36322021484375,
        0,
        -0.4506046175956726,
        0.801031768321991,
        0.39408499002456665,
        0,
        -0.16696058213710785,
        -0.5092697143554688,
        0.8442559838294983,
        0,
        -0.07460174709558487,
        0.0062340241856873035,
        0.06756893545389175,
        1
      ],
      radius: 0.01808827556669712
    },
    "pinky-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9498357176780701,
        0.1553308218717575,
        0.2714462876319885,
        0,
        -0.3019258379936218,
        0.6817675232887268,
        0.6663586497306824,
        0,
        -0.08155745267868042,
        -0.7148879170417786,
        0.694466233253479,
        0,
        -0.06697750836610794,
        0.029482364654541016,
        0.02902858518064022,
        1
      ],
      radius: 0.008483353070914745
    },
    "pinky-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9214097261428833,
        0.27928245067596436,
        0.2701927423477173,
        0,
        -0.3670244514942169,
        0.8538867831230164,
        0.36901235580444336,
        0,
        -0.12765564024448395,
        -0.43917882442474365,
        0.8892839550971985,
        0,
        -0.06447203457355499,
        0.05144399777054787,
        0.0076942890882492065,
        1
      ],
      radius: 0.0067641944624483585
    },
    "pinky-finger-phalanx-distal": {
      offsetMatrix: [
        0.9038633704185486,
        0.23618005216121674,
        0.3567195236682892,
        0,
        -0.3532794713973999,
        0.8823202252388,
        0.3109731376171112,
        0,
        -0.24129553139209747,
        -0.4070987403392792,
        0.8809353709220886,
        0,
        -0.06187915802001953,
        0.060364335775375366,
        -0.010368337854743004,
        1
      ],
      radius: 0.0064259846694767475
    },
    "pinky-finger-tip": {
      offsetMatrix: [
        0.9038633704185486,
        0.23618005216121674,
        0.3567195236682892,
        0,
        -0.3532794713973999,
        0.8823202252388,
        0.3109731376171112,
        0,
        -0.24129553139209747,
        -0.4070987403392792,
        0.8809353709220886,
        0,
        -0.056796226650476456,
        0.07042007893323898,
        -0.02921444922685623,
        1
      ],
      radius: 0.005425984505563974
    }
  },
  gripOffsetMatrix: [
    0.08027800917625427,
    -0.8086723685264587,
    -0.5827556252479553,
    0,
    -0.4154181480407715,
    -0.5585916638374329,
    0.7179154753684998,
    0,
    -0.9060805439949036,
    0.1844543218612671,
    -0.3807799518108368,
    0,
    -0.038054611533880234,
    -0.002910431008785963,
    0.03720742464065552,
    1
  ]
};

// src/device/configs/hand/relaxed.ts
var relaxedHandPose = {
  jointTransforms: {
    wrist: {
      offsetMatrix: [
        0.9616971015930176,
        -0.13805118203163147,
        0.2368120402097702,
        0,
        5348679260350764e-19,
        0.8648636937141418,
        0.5020061135292053,
        0,
        -0.2741127610206604,
        -0.48265108466148376,
        0.8318111300468445,
        0,
        -0.04913589730858803,
        0.0021463718730956316,
        0.11701996624469757,
        1
      ],
      radius: 0.021460847929120064
    },
    "thumb-metacarpal": {
      offsetMatrix: [
        -0.07536252588033676,
        -0.9959676265716553,
        -0.04867160692811012,
        0,
        0.5877083539962769,
        -0.08379616588354111,
        0.8047218918800354,
        0,
        -0.8055551648139954,
        0.032041035592556,
        0.5916536450386047,
        0,
        -0.010643752291798592,
        6936835707165301e-19,
        0.08736639469861984,
        1
      ],
      radius: 0.019382517784833908
    },
    "thumb-phalanx-proximal": {
      offsetMatrix: [
        0.1374533325433731,
        -0.9904957413673401,
        0.004982374142855406,
        0,
        0.5534393787384033,
        0.08097179979085922,
        0.8289443850517273,
        0,
        -0.8214688897132874,
        -0.11118389666080475,
        0.559309184551239,
        0,
        0.015547193586826324,
        -3480653394944966e-19,
        0.0681300163269043,
        1
      ],
      radius: 0.01228295173496008
    },
    "thumb-phalanx-distal": {
      offsetMatrix: [
        -0.04659227654337883,
        -0.9974699020385742,
        -0.05369402840733528,
        0,
        0.6812446117401123,
        -0.07104194164276123,
        0.728600800037384,
        0,
        -0.7305715084075928,
        -0.002631746232509613,
        0.6828309893608093,
        0,
        0.04330715537071228,
        0.003409178927540779,
        0.0492292083799839,
        1
      ],
      radius: 0.009768804535269737
    },
    "thumb-tip": {
      offsetMatrix: [
        -0.04659227654337883,
        -0.9974699020385742,
        -0.05369402840733528,
        0,
        0.6812446117401123,
        -0.07104194164276123,
        0.728600800037384,
        0,
        -0.7305715084075928,
        -0.002631746232509613,
        0.6828309893608093,
        0,
        0.062003348022699356,
        0.004069602582603693,
        0.03322213143110275,
        1
      ],
      radius: 0.008768804371356964
    },
    "index-finger-metacarpal": {
      offsetMatrix: [
        0.9616971015930176,
        -0.13805118203163147,
        0.2368120402097702,
        0,
        5348679260350764e-19,
        0.8648636937141418,
        0.5020061135292053,
        0,
        -0.2741127610206604,
        -0.48265108466148376,
        0.8318111300468445,
        0,
        -0.02009812369942665,
        0.008770795539021492,
        0.08660387247800827,
        1
      ],
      radius: 0.021228281781077385
    },
    "index-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9001791477203369,
        -0.2598813474178314,
        0.3494834005832672,
        0,
        0.06073702871799469,
        0.8695210218429565,
        0.490146666765213,
        0,
        -0.4312632381916046,
        -0.41999316215515137,
        0.7985095381736755,
        0,
        -17739279428496957e-20,
        0.03890012577176094,
        0.039073407649993896,
        1
      ],
      radius: 0.010295259766280651
    },
    "index-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9082008600234985,
        -0.20898112654685974,
        0.36262574791908264,
        0,
        0.11045389622449875,
        0.9553793668746948,
        0.27395179867744446,
        0,
        -0.40369608998298645,
        -0.20874978601932526,
        0.8907597661018372,
        0,
        0.01617925800383091,
        0.05482936650514603,
        0.008788082748651505,
        1
      ],
      radius: 0.00853810179978609
    },
    "index-finger-phalanx-distal": {
      offsetMatrix: [
        0.9309692978858948,
        -0.16783711314201355,
        0.32423174381256104,
        0,
        0.1080828532576561,
        0.9749603867530823,
        0.1943446695804596,
        0,
        -0.34873148798942566,
        -0.14588497579097748,
        0.9257990717887878,
        0,
        0.02599053829908371,
        0.059902746230363846,
        -0.012860597111284733,
        1
      ],
      radius: 0.007636196445673704
    },
    "index-finger-tip": {
      offsetMatrix: [
        0.9309692978858948,
        -0.16783711314201355,
        0.32423174381256104,
        0,
        0.1080828532576561,
        0.9749603867530823,
        0.1943446695804596,
        0,
        -0.34873148798942566,
        -0.14588497579097748,
        0.9257990717887878,
        0,
        0.03362493962049484,
        0.06421422213315964,
        -0.033461250364780426,
        1
      ],
      radius: 0.006636196281760931
    },
    "middle-finger-metacarpal": {
      offsetMatrix: [
        0.9616971015930176,
        -0.13805118203163147,
        0.2368120402097702,
        0,
        5348679260350764e-19,
        0.8648636937141418,
        0.5020061135292053,
        0,
        -0.2741127610206604,
        -0.48265108466148376,
        0.8318111300468445,
        0,
        -0.03627845644950867,
        0.011579737067222595,
        0.08550142496824265,
        1
      ],
      radius: 0.021231964230537415
    },
    "middle-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9876697659492493,
        -0.06786545366048813,
        0.1410750150680542,
        0,
        -0.015095947310328484,
        0.855663537979126,
        0.5173118710517883,
        0,
        -0.15582047402858734,
        -0.5130629539489746,
        0.8440889716148376,
        0,
        -0.021259509027004242,
        0.04587256908416748,
        0.03659208118915558,
        1
      ],
      radius: 0.01117393933236599
    },
    "middle-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.988391637802124,
        -0.04354291781783104,
        0.14555205404758453,
        0,
        0.008894841186702251,
        0.9729899168014526,
        0.23067504167556763,
        0,
        -0.15166506171226501,
        -0.22670257091522217,
        0.9620829224586487,
        0,
        -0.014570588245987892,
        0.06789684295654297,
        3578895702958107e-19,
        1
      ],
      radius: 0.008030958473682404
    },
    "middle-finger-phalanx-distal": {
      offsetMatrix: [
        0.9853697419166565,
        0.044260796159505844,
        0.16458062827587128,
        0,
        -0.0757969319820404,
        0.9787378311157227,
        0.19059516489505768,
        0,
        -0.1526455283164978,
        -0.20028135180473328,
        0.9677740931510925,
        0,
        -0.010392282158136368,
        0.07414241135120392,
        -0.026147106662392616,
        1
      ],
      radius: 0.007629410829395056
    },
    "middle-finger-tip": {
      offsetMatrix: [
        0.9853697419166565,
        0.044260796159505844,
        0.16458062827587128,
        0,
        -0.0757969319820404,
        0.9787378311157227,
        0.19059516489505768,
        0,
        -0.1526455283164978,
        -0.20028135180473328,
        0.9677740931510925,
        0,
        -0.0069718430750072,
        0.08024183660745621,
        -0.05014154314994812,
        1
      ],
      radius: 0.006629410665482283
    },
    "ring-finger-metacarpal": {
      offsetMatrix: [
        0.9616971015930176,
        -0.13805118203163147,
        0.2368120402097702,
        0,
        5348679260350764e-19,
        0.8648636937141418,
        0.5020061135292053,
        0,
        -0.2741127610206604,
        -0.48265108466148376,
        0.8318111300468445,
        0,
        -0.05402477830648422,
        0.015797706320881844,
        0.08152295649051666,
        1
      ],
      radius: 0.019088275730609894
    },
    "ring-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9940828680992126,
        0.05735103040933609,
        0.09224652498960495,
        0,
        -0.10022822767496109,
        0.8116500377655029,
        0.5754809379577637,
        0,
        -0.041867565363645554,
        -0.5813214182853699,
        0.8125960826873779,
        0,
        -0.041623555123806,
        0.04171867296099663,
        0.03582974523305893,
        1
      ],
      radius: 0.00992213748395443
    },
    "ring-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9843675494194031,
        0.12044742703437805,
        0.12850022315979004,
        0,
        -0.15629759430885315,
        0.9337108135223389,
        0.3221098482608795,
        0,
        -0.08118485659360886,
        -0.3371586799621582,
        0.937940776348114,
        0,
        -0.039990875869989395,
        0.06438793987035751,
        0.004141641780734062,
        1
      ],
      radius: 0.007611672393977642
    },
    "ring-finger-phalanx-distal": {
      offsetMatrix: [
        0.9748351573944092,
        0.11857274919748306,
        0.18877571821212769,
        0,
        -0.15575434267520905,
        0.9681083559989929,
        0.19623035192489624,
        0,
        -0.15948788821697235,
        -0.22069483995437622,
        0.9622148275375366,
        0,
        -0.03783353418111801,
        0.07334739714860916,
        -0.020782606676220894,
        1
      ],
      radius: 0.007231088820844889
    },
    "ring-finger-tip": {
      offsetMatrix: [
        0.9748351573944092,
        0.11857274919748306,
        0.18877571821212769,
        0,
        -0.15575434267520905,
        0.9681083559989929,
        0.19623035192489624,
        0,
        -0.15948788821697235,
        -0.22069483995437622,
        0.9622148275375366,
        0,
        -0.03445569798350334,
        0.0802423357963562,
        -0.04392268508672714,
        1
      ],
      radius: 0.0062310886569321156
    },
    "pinky-finger-metacarpal": {
      offsetMatrix: [
        0.9181402921676636,
        0.35625091195106506,
        0.17350243031978607,
        0,
        -0.39615097641944885,
        0.8352503180503845,
        0.38134080171585083,
        0,
        -0.009065053425729275,
        -0.41885748505592346,
        0.9080066680908203,
        0,
        -0.06191859766840935,
        0.013620133511722088,
        0.07850203663110733,
        1
      ],
      radius: 0.01808827556669712
    },
    "pinky-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9714386463165283,
        0.236698180437088,
        -0.016745081171393394,
        0,
        -0.18462024629116058,
        0.7982627749443054,
        0.5733163952827454,
        0,
        0.14906984567642212,
        -0.5538501739501953,
        0.8191629648208618,
        0,
        -0.061502378433942795,
        0.032741155475378036,
        0.03705105185508728,
        1
      ],
      radius: 0.008483353070914745
    },
    "pinky-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9337416291236877,
        0.35620439052581787,
        -0.03527557849884033,
        0,
        -0.33203884959220886,
        0.8987522721290588,
        0.28634607791900635,
        0,
        0.13370157778263092,
        -0.2556603252887726,
        0.9574766755104065,
        0,
        -0.06608185172080994,
        0.049755651503801346,
        0.011886020191013813,
        1
      ],
      radius: 0.0067641944624483585
    },
    "pinky-finger-phalanx-distal": {
      offsetMatrix: [
        0.9419984817504883,
        0.3303581774234772,
        0.059175245463848114,
        0,
        -0.33483216166496277,
        0.9130291938781738,
        0.23294763267040253,
        0,
        0.02292730286717415,
        -0.2392500638961792,
        0.970687210559845,
        0,
        -0.0687975287437439,
        0.054948460310697556,
        -0.007561664097011089,
        1
      ],
      radius: 0.0064259846694767475
    },
    "pinky-finger-tip": {
      offsetMatrix: [
        0.9419984817504883,
        0.3303581774234772,
        0.059175245463848114,
        0,
        -0.33483216166496277,
        0.9130291938781738,
        0.23294763267040253,
        0,
        0.02292730286717415,
        -0.2392500638961792,
        0.970687210559845,
        0,
        -0.06947512179613113,
        0.0613851435482502,
        -0.028543535619974136,
        1
      ],
      radius: 0.005425984505563974
    }
  },
  gripOffsetMatrix: [
    -5348679260350764e-19,
    -0.8648636937141418,
    -0.5020061135292053,
    0,
    -0.2741127908229828,
    -0.48265108466148376,
    0.8318111896514893,
    0,
    -0.9616971015930176,
    0.13805119693279266,
    -0.2368120402097702,
    0,
    -0.02878567762672901,
    0.0017147823236882687,
    0.04536811262369156,
    1
  ]
};

// src/device/configs/hand/library.ts
var handPoseAngles = {
  // All five digits fully extended and spread wide (high five).
  open: {
    thumb: { cmc: [-72, 3, -48], mcp: 5, ip: 2 },
    index: { mcp: -4, pip: 2, dip: 4, yaw: -17 },
    middle: { mcp: -3, pip: 3, dip: 5, yaw: 3 },
    ring: { mcp: -2, pip: 6, dip: 8, yaw: 21.5 },
    pinky: { mcp: 1, pip: 8, dip: 8, yaw: 18.5 }
  },
  // Fingers straight and pressed together, thumb alongside the index (blade / karate chop).
  flat: {
    thumb: {
      cmc: [-16.5, -4.8, -67.7],
      mcp: 10,
      ip: 6,
      mcpYaw: 14,
      mcpRoll: 2,
      ipYaw: 0,
      ipRoll: -2
    },
    index: {
      mcp: 2.7,
      pip: 3,
      dip: 2,
      yaw: 8.2,
      roll: -7,
      pipYaw: -1.8,
      pipRoll: 1
    },
    middle: {
      mcp: 4,
      pip: 3,
      dip: 2,
      yaw: -0.1,
      roll: -2.2,
      pipYaw: -0.1,
      pipRoll: 3.5
    },
    ring: {
      mcp: 2.1,
      pip: 4,
      dip: 2.5,
      yaw: -4.9,
      roll: 1,
      pipYaw: -0.8,
      pipRoll: 2.5
    },
    pinky: {
      mcp: 15,
      pip: 5,
      dip: 3,
      yaw: -25.6,
      roll: -8,
      pipYaw: 0.8,
      pipRoll: 7.5
    }
  },
  // All fingers tightly curled into the palm, thumb wrapped across the index and middle fingers.
  fist: {
    thumb: {
      cmc: [-25.4, -63, -118.6],
      shift: 1,
      mcp: 55,
      ip: 73.4,
      mcpYaw: 21.2,
      mcpRoll: 20.8,
      ipYaw: -7.2,
      ipRoll: -4.4
    },
    index: { mcp: 88, pip: 100, dip: 62, yaw: -4.2, roll: -8.8 },
    middle: { mcp: 86, pip: 102, dip: 64, yaw: 5, roll: 0 },
    ring: { mcp: 82, pip: 106, dip: 74, yaw: 12.9, roll: 7.3 },
    pinky: { mcp: 74, pip: 108, dip: 70, yaw: 19.7, roll: -17.7 }
  },
  // Fist with the thumb extended straight up.
  "thumbs-up": {
    thumb: { cmc: [-77, -12, -58], mcp: 0, ip: -6 },
    index: { mcp: 88, pip: 100, dip: 62, yaw: -2.5, roll: -6.9 },
    middle: { mcp: 86, pip: 102, dip: 64, yaw: 5, roll: 0 },
    ring: { mcp: 88, pip: 102, dip: 66, yaw: 9.8, roll: 10.5 },
    pinky: { mcp: 90, pip: 100, dip: 66, yaw: 27, roll: -24 }
  },
  // Index straight, thumb up, other fingers curled (finger gun / L).
  "finger-gun": {
    thumb: { cmc: [-84, -2, -66], mcp: 13, ip: 13, mcpYaw: -2, shift: 0.6 },
    index: { mcp: 3, pip: 13, dip: 9, yaw: -7 },
    middle: { mcp: 83, pip: 103, dip: 63, yaw: 5.5, roll: 0 },
    ring: { mcp: 86, pip: 104, dip: 68, yaw: 8.5, roll: 10.5 },
    pinky: { mcp: 87, pip: 101, dip: 67, yaw: 23.5, roll: -22 }
  },
  // Index and middle extended in a V, thumb holding down the curled ring and pinky.
  peace: {
    thumb: {
      cmc: [-16.2, -53.8, -93.4],
      shift: 0.9,
      mcp: 60.8,
      ip: 52,
      mcpRoll: -10,
      ipRoll: -25
    },
    index: { mcp: 0, pip: 12, dip: 9, yaw: -20 },
    middle: { mcp: -3, pip: 13, dip: 9, yaw: 14 },
    ring: { mcp: 83, pip: 104, dip: 76, yaw: 5, roll: 12 },
    pinky: { mcp: 87, pip: 102, dip: 68, yaw: 27, roll: -27 }
  },
  // Index, middle and ring extended, thumb holding down the curled pinky.
  three: {
    thumb: { cmc: [3.5, -49.3, -109.2], shift: 1, mcp: 49.5, ip: 63.3 },
    index: { mcp: 3, pip: 8, dip: 8, yaw: -5 },
    middle: { mcp: 2, pip: 7, dip: 7, yaw: 5 },
    ring: { mcp: 4, pip: 10, dip: 9, yaw: 14 },
    pinky: { mcp: 90, pip: 95, dip: 68, yaw: -2 }
  },
  // Four fingers extended, thumb folded across the palm.
  four: {
    thumb: { cmc: [10.8, -20.1, -125.2], shift: 1, mcp: 46, ip: 48 },
    index: { mcp: 2, pip: 8, dip: 8, yaw: -7 },
    middle: { mcp: 1, pip: 10, dip: 9, yaw: 5 },
    ring: { mcp: 8, pip: 12, dip: 11, yaw: 15 },
    pinky: { mcp: 11, pip: 14, dip: 12, yaw: 8 }
  },
  // Thumb and index tips touching in a round circle, other three fingers extended.
  ok: {
    thumb: { cmc: [-51.3, -48.4, -94], shift: 0.6, mcp: 29, ip: 42.6 },
    index: { mcp: 54, pip: 58.2, dip: 36.5, yaw: -26, roll: 21 },
    middle: { mcp: 4, pip: 15, dip: 12, yaw: 4 },
    ring: { mcp: 11, pip: 21, dip: 16, yaw: 12 },
    pinky: { mcp: 19, pip: 26, dip: 20, yaw: 9 }
  },
  // Index and pinky extended (horns), thumb holding the curled middle and ring.
  rock: {
    thumb: { cmc: [-13.7, -54.4, -104.1], shift: 0.9, mcp: 56.1, ip: 53 },
    index: { mcp: 3, pip: 12, dip: 11, yaw: -8 },
    middle: { mcp: 86, pip: 102, dip: 58, yaw: 5, roll: 0 },
    ring: { mcp: 86, pip: 102, dip: 66, yaw: 9.8, roll: 10.5 },
    pinky: { mcp: 11, pip: 7, dip: 8, yaw: 3 }
  },
  // Thumb and pinky extended, other fingers curled (call me / shaka).
  call: {
    thumb: { cmc: [-64, -14, -67], mcp: 5, ip: -10 },
    index: { mcp: 86, pip: 102, dip: 56, yaw: -5.7, roll: 3 },
    middle: { mcp: 82, pip: 108, dip: 54, yaw: 4.9, roll: 8 },
    ring: { mcp: 78, pip: 104, dip: 58, yaw: 12.4, roll: 14.3 },
    pinky: { mcp: -2, pip: 12, dip: 9, yaw: 10 }
  },
  // Thumb tip pinching the middle fingertip; other fingers relaxed.
  "pinch-middle": {
    thumb: { cmc: [-6.9, -58.7, -127.3], shift: 1, mcp: 20.3, ip: 43.6 },
    index: { mcp: 28, pip: 44, dip: 24, yaw: -9, pipYaw: 12 },
    middle: { mcp: 49.9, pip: 61.6, dip: 35, yaw: 4 },
    ring: { mcp: 50, pip: 64, dip: 38, yaw: 9 },
    pinky: { mcp: 60, pip: 66, dip: 40, yaw: 7 }
  },
  // Thumb tip pinching the ring fingertip; other fingers relaxed.
  "pinch-ring": {
    thumb: { cmc: [3.1, -63.5, -131.4], shift: 1, mcp: 29.7, ip: 34 },
    index: { mcp: 26, pip: 36, dip: 22, yaw: 5.5 },
    middle: { mcp: 33, pip: 45, dip: 27, yaw: -2.4 },
    ring: { mcp: 52.1, pip: 54.8, dip: 33.5, yaw: 4 },
    pinky: { mcp: 54, pip: 50, dip: 30, yaw: 4 }
  },
  // Thumb tip pinching the pinky fingertip; other fingers relaxed.
  "pinch-pinky": {
    thumb: { cmc: [24, -57.9, -142], shift: 1, mcp: 31.6, ip: 30.1 },
    index: { mcp: 26, pip: 36, dip: 25, yaw: 4 },
    middle: { mcp: 32, pip: 44, dip: 30, yaw: -3.2 },
    ring: { mcp: 50, pip: 47.5, dip: 31.6, yaw: 1 },
    pinky: { mcp: 45.8, pip: 58.9, dip: 30.4, yaw: -0.4 }
  },
  // Thumb, index and middle fingertips meeting (three-finger precision grip).
  tripod: {
    thumb: { cmc: [-7.3, -50.9, -118.2], shift: 1, mcp: 14.8, ip: 27.2 },
    index: { mcp: 50, pip: 45.9, dip: 27.5, yaw: 0.5, roll: -9, pipYaw: 3.7 },
    middle: { mcp: 44, pip: 54.4, dip: 32.6, yaw: 0.9, roll: 5, pipYaw: 0.1 },
    ring: { mcp: 63, pip: 76, dip: 44, yaw: 5 },
    pinky: { mcp: 75, pip: 82, dip: 48, yaw: 1 }
  },
  // Thumb pad pressed against the side of the curled index finger (lateral / key pinch).
  "key-pinch": {
    thumb: {
      cmc: [-30.4, -8.9, -59],
      shift: 1,
      mcp: 25.5,
      ip: 20.9,
      mcpYaw: 2.6,
      mcpRoll: 3.2,
      ipYaw: -11.5,
      ipRoll: -12.3
    },
    index: { mcp: 56, pip: 66, dip: 42, yaw: -10, roll: -3.2 },
    middle: { mcp: 74, pip: 96, dip: 60, yaw: 3.6, roll: 0 },
    ring: { mcp: 80, pip: 99, dip: 63, yaw: 8.1, roll: 12 },
    pinky: { mcp: 85, pip: 101, dip: 65, yaw: 21.9, roll: -19.5 }
  },
  // Fingers loosely curled (the index's middle bone square to the hand), the
  // thumb hovering just off its side: ready for microgestures.
  microgesture: {
    thumb: {
      cmc: [-49.1, 6.9, -62],
      shift: 1,
      mcp: 37.9,
      ip: 40.1,
      mcpYaw: 2.6,
      mcpRoll: 3.2,
      ipYaw: -15.3,
      ipRoll: -12.3
    },
    index: { mcp: 40, pip: 50, dip: 30, yaw: -10, roll: -3.2 },
    middle: { mcp: 58, pip: 72, dip: 44, yaw: 3.6, roll: 0 },
    ring: { mcp: 62, pip: 74, dip: 46, yaw: 8.1, roll: 12 },
    pinky: { mcp: 66, pip: 76, dip: 46, yaw: 21.9, roll: -19.5 }
  },
  // Power grip wrapped around a 4 cm handle.
  grip: {
    thumb: {
      cmc: [-27.6, -65.9, -128.5],
      shift: 1,
      mcp: 41.3,
      ip: 48.5,
      mcpYaw: -1.6,
      mcpRoll: -4.5
    },
    index: { mcp: 49.4, pip: 72.5, dip: 45.6, yaw: 34.9, roll: -12.6 },
    middle: { mcp: 71.4, pip: 61.5, dip: 37.7, yaw: 20.2, roll: -0.8 },
    ring: { mcp: 70, pip: 59.2, dip: 37.5, yaw: -2.1, roll: 16 },
    pinky: { mcp: 67.8, pip: 55.4, dip: 35.8, yaw: -3.4, roll: -19.5 }
  },
  // Spread, curved fingers and opposed thumb as if holding a ball (spherical grasp).
  claw: {
    thumb: { cmc: [-41.2, -68.8, -71.2], shift: 0, mcp: 30.8, ip: 31.5 },
    index: { mcp: 22.8, pip: 44.5, dip: 33, yaw: -12 },
    middle: { mcp: 22.9, pip: 42.2, dip: 33, yaw: 3 },
    ring: { mcp: 25, pip: 42.4, dip: 33, yaw: 14 },
    pinky: { mcp: 47.1, pip: 52.1, dip: 33, yaw: 22 }
  },
  // Fingers hooked at the middle knuckles with straight base knuckles (carrying a bag handle).
  hook: {
    thumb: { cmc: [-25.8, 1.3, -92.6], mcp: 24, ip: 32 },
    index: { mcp: 0, pip: 90, dip: 56, yaw: 9.3, roll: -6.4 },
    middle: { mcp: 0, pip: 94, dip: 60, yaw: 2.5, roll: -2 },
    ring: { mcp: 4, pip: 98, dip: 66, yaw: -3.5, roll: 5 },
    pinky: { mcp: 19, pip: 100, dip: 68, yaw: -22, roll: -12 }
  },
  // Fingers together and gently curved, palm hollowed (scooping water).
  cup: {
    thumb: { cmc: [-11.8, -11.5, -98.7], shift: 0.2, mcp: 13.5, ip: 14.2 },
    index: {
      mcp: 36.2,
      pip: 31.1,
      dip: 21.7,
      yaw: 16.1,
      roll: -4.4,
      pipYaw: 3.3,
      pipRoll: 3.7
    },
    middle: {
      mcp: 38.8,
      pip: 35.5,
      dip: 22.7,
      yaw: 3,
      roll: -7.3,
      pipYaw: 5,
      pipRoll: -0.2
    },
    ring: {
      mcp: 39.5,
      pip: 30.1,
      dip: 21.1,
      yaw: 2.7,
      roll: 10.5,
      pipYaw: -6.2,
      pipRoll: 4.3
    },
    pinky: {
      mcp: 42.7,
      pip: 28.5,
      dip: 18.4,
      yaw: -11.7,
      roll: -7.5,
      pipYaw: 1,
      pipRoll: 6.3
    }
  }
};
var libraryHandPoses = {};
for (const [id, angles] of Object.entries(handPoseAngles)) {
  libraryHandPoses[id] = buildHandPose(angles, relaxedHandPose, pinchHandPose);
}
var microgestureThumbAngles = {
  touch: {
    cmc: [-42.1, 4.7, -62.6],
    mcp: 35.1,
    ip: 35.5,
    mcpYaw: 4,
    ipYaw: -13.7
  },
  "tip-mid": {
    cmc: [-39.3, -0.9, -61],
    mcp: 32.4,
    ip: 31.5,
    mcpYaw: 2.6,
    ipYaw: -13.4
  },
  tip: {
    cmc: [-35.4, -7.3, -59.8],
    mcp: 27.9,
    ip: 25.9,
    mcpYaw: 1.4,
    ipYaw: -12.4
  },
  "knuckle-mid": {
    cmc: [-45.6, 8.2, -67.7],
    mcp: 35.5,
    ip: 39.9,
    mcpYaw: 5.1,
    ipYaw: -13.6
  },
  knuckle: {
    cmc: [-47.1, 11.5, -71],
    mcp: 34.1,
    ip: 41.7,
    mcpYaw: 7.5,
    ipYaw: -12.1
  },
  "forward-start": {
    cmc: [-46.1, 7.7, -64],
    mcp: 43.2,
    ip: 45.7,
    mcpYaw: 3.8,
    ipYaw: -15
  },
  "forward-mid": {
    cmc: [-42, 3.2, -63.4],
    mcp: 33.7,
    ip: 35.1,
    mcpYaw: 5.1,
    ipYaw: -13.1
  },
  forward: {
    cmc: [-30.6, -2.4, -60.3],
    mcp: 20.2,
    ip: 16.6,
    mcpYaw: 4.3,
    ipYaw: -9.5
  },
  "backward-start": {
    cmc: [-38.1, 1.9, -62.3],
    mcp: 29.2,
    ip: 28.5,
    mcpYaw: 4,
    ipYaw: -12.1
  },
  "backward-mid": {
    cmc: [-45.1, 8.2, -62.2],
    mcp: 41.9,
    ip: 43.2,
    mcpYaw: 3.5,
    ipYaw: -14.6
  },
  backward: {
    cmc: [-44.8, 10.2, -63.7],
    mcp: 48.5,
    ip: 49.5,
    mcpYaw: 3.6,
    ipYaw: -14.8
  }
};
var microgestureThumbPoses = {};
for (const [id, thumb] of Object.entries(microgestureThumbAngles)) {
  const rest = handPoseAngles.microgesture;
  microgestureThumbPoses[id] = buildHandPose(
    { ...rest, thumb: { ...rest.thumb, ...thumb } },
    relaxedHandPose,
    pinchHandPose
  );
}

// src/device/configs/hand/point.ts
var pointHandPose = {
  jointTransforms: {
    wrist: {
      offsetMatrix: [
        0.9340395331382751,
        -0.13936476409435272,
        0.32885703444480896,
        0,
        -0.005510995630174875,
        0.914999783039093,
        0.40341612696647644,
        0,
        -0.3571262061595917,
        -0.37861889600753784,
        0.8538784384727478,
        0,
        -0.05789132043719292,
        0.01670890860259533,
        0.11183350533246994,
        1
      ],
      radius: 0.021460847929120064
    },
    "thumb-metacarpal": {
      offsetMatrix: [
        0.02145560085773468,
        -0.9978390336036682,
        0.0621047280728817,
        0,
        0.41311800479888916,
        0.06541631370782852,
        0.9083252549171448,
        0,
        -0.9104245901107788,
        0.006167683284729719,
        0.4136286973953247,
        0,
        -0.016488194465637207,
        0.012708572670817375,
        0.08862338215112686,
        1
      ],
      radius: 0.019382517784833908
    },
    "thumb-phalanx-proximal": {
      offsetMatrix: [
        0.21270370483398438,
        -0.966137707233429,
        0.14606566727161407,
        0,
        0.49890995025634766,
        0.2359165996313095,
        0.8339261412620544,
        0,
        -0.8401462435722351,
        -0.10450579971075058,
        0.5321959853172302,
        0,
        0.013112368993461132,
        0.012508046813309193,
        0.07517509907484055,
        1
      ],
      radius: 0.01228295173496008
    },
    "thumb-phalanx-distal": {
      offsetMatrix: [
        0.01653280481696129,
        -0.9986647963523865,
        0.048943229019641876,
        0,
        0.26313456892967224,
        0.051570065319538116,
        0.9633802771568298,
        0,
        -0.9646173715591431,
        -0.0030490627977997065,
        0.26363563537597656,
        0,
        0.04150351136922836,
        0.016039609909057617,
        0.05719054117798805,
        1
      ],
      radius: 0.009768804535269737
    },
    "thumb-tip": {
      offsetMatrix: [
        0.01653280481696129,
        -0.9986647963523865,
        0.048943229019641876,
        0,
        0.26313456892967224,
        0.051570065319538116,
        0.9633802771568298,
        0,
        -0.9646173715591431,
        -0.0030490627977997065,
        0.26363563537597656,
        0,
        0.06548332422971725,
        0.01683700829744339,
        0.0516640841960907,
        1
      ],
      radius: 0.008768804371356964
    },
    "index-finger-metacarpal": {
      offsetMatrix: [
        0.9340395331382751,
        -0.13936476409435272,
        0.32885703444480896,
        0,
        -0.005510995630174875,
        0.914999783039093,
        0.40341612696647644,
        0,
        -0.3571262061595917,
        -0.37861889600753784,
        0.8538784384727478,
        0,
        -0.02592567168176174,
        0.019982583820819855,
        0.08479326963424683,
        1
      ],
      radius: 0.021228281781077385
    },
    "index-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9063700437545776,
        -0.21756279468536377,
        0.3621589243412018,
        0,
        0.0970839336514473,
        0.9415287375450134,
        0.3226419687271118,
        0,
        -0.41117796301841736,
        -0.2572731077671051,
        0.8744958639144897,
        0,
        -0.0015709538711234927,
        0.043078210204839706,
        0.034657616168260574,
        1
      ],
      radius: 0.010295259766280651
    },
    "index-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9159826040267944,
        -0.1651475727558136,
        0.36565208435058594,
        0,
        0.09755707532167435,
        0.9756820797920227,
        0.1962820291519165,
        0,
        -0.3891757130622864,
        -0.14411886036396027,
        0.9098196625709534,
        0,
        0.014023927971720695,
        0.052835866808891296,
        0.0014903299743309617,
        1
      ],
      radius: 0.00853810179978609
    },
    "index-finger-phalanx-distal": {
      offsetMatrix: [
        0.9378057718276978,
        -0.12329639494419098,
        0.3245268166065216,
        0,
        0.032558172941207886,
        0.9619227051734924,
        0.2713746726512909,
        0,
        -0.3456292748451233,
        -0.2439306229352951,
        0.9061115384101868,
        0,
        0.023482320830225945,
        0.05633850023150444,
        -0.020621655508875847,
        1
      ],
      radius: 0.007636196445673704
    },
    "index-finger-tip": {
      offsetMatrix: [
        0.9378057718276978,
        -0.12329639494419098,
        0.3245268166065216,
        0,
        0.032558172941207886,
        0.9619227051734924,
        0.2713746726512909,
        0,
        -0.3456292748451233,
        -0.2439306229352951,
        0.9061115384101868,
        0,
        0.03096788562834263,
        0.06281610578298569,
        -0.040703095495700836,
        1
      ],
      radius: 0.006636196281760931
    },
    "middle-finger-metacarpal": {
      offsetMatrix: [
        0.9340395331382751,
        -0.13936476409435272,
        0.32885703444480896,
        0,
        -0.005510995630174875,
        0.914999783039093,
        0.40341612696647644,
        0,
        -0.3571262061595917,
        -0.37861889600753784,
        0.8538784384727478,
        0,
        -0.04184452444314957,
        0.022474845871329308,
        0.08177298307418823,
        1
      ],
      radius: 0.021231964230537415
    },
    "middle-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9720265865325928,
        -0.08313076198101044,
        0.21966552734375,
        0,
        0.20477405190467834,
        0.7580050826072693,
        -0.6192700862884521,
        0,
        -0.11502730846405029,
        0.6469289064407349,
        0.7538246512413025,
        0,
        -0.022107340395450592,
        0.05035499855875969,
        0.02970452979207039,
        1
      ],
      radius: 0.01117393933236599
    },
    "middle-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9779140949249268,
        -0.07129573822021484,
        0.19646917283535004,
        0,
        0.1287083923816681,
        -0.5352076292037964,
        -0.8348574042320251,
        0,
        0.1646735966205597,
        0.8417060971260071,
        -0.5142109394073486,
        0,
        -0.017169542610645294,
        0.022584279999136925,
        -0.00265491777099669,
        1
      ],
      radius: 0.008030958473682404
    },
    "middle-finger-phalanx-distal": {
      offsetMatrix: [
        0.9774913787841797,
        -0.19657190144062042,
        0.07661263644695282,
        0,
        -0.1924918293952942,
        -0.9796126484870911,
        -0.05749811604619026,
        0,
        0.08635343611240387,
        0.041456472128629684,
        -0.995401918888092,
        0,
        -0.02170622907578945,
        -6043742760084569e-19,
        0.011511396616697311,
        1
      ],
      radius: 0.007629410829395056
    },
    "middle-finger-tip": {
      offsetMatrix: [
        0.9774913787841797,
        -0.19657190144062042,
        0.07661263644695282,
        0,
        -0.1924918293952942,
        -0.9796126484870911,
        -0.05749811604619026,
        0,
        0.08635343611240387,
        0.041456472128629684,
        -0.995401918888092,
        0,
        -0.02438267692923546,
        -0.0026927536819130182,
        0.03627248480916023,
        1
      ],
      radius: 0.006629410665482283
    },
    "ring-finger-metacarpal": {
      offsetMatrix: [
        0.9340395331382751,
        -0.13936476409435272,
        0.32885703444480896,
        0,
        -0.005510995630174875,
        0.914999783039093,
        0.40341612696647644,
        0,
        -0.3571262061595917,
        -0.37861889600753784,
        0.8538784384727478,
        0,
        -0.05944233387708664,
        0.0264605600386858,
        0.07478221505880356,
        1
      ],
      radius: 0.019088275730609894
    },
    "ring-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9842101335525513,
        0.024470895528793335,
        0.1753024309873581,
        0,
        0.12200043350458145,
        0.6237703561782837,
        -0.7720272541046143,
        0,
        -0.12824076414108276,
        0.7812241315841675,
        0.610936164855957,
        0,
        -0.04249368980526924,
        0.0467497780919075,
        0.027722163125872612,
        1
      ],
      radius: 0.00992213748395443
    },
    "ring-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9941774606704712,
        0.05949164181947708,
        0.08983955532312393,
        0,
        0.10504482686519623,
        -0.7208291888237,
        -0.6851072907447815,
        0,
        0.024001073092222214,
        0.6905553936958313,
        -0.7228817939758301,
        0,
        -0.0374927744269371,
        0.016285063698887825,
        0.0038980208337306976,
        1
      ],
      radius: 0.007611672393977642
    },
    "ring-finger-phalanx-distal": {
      offsetMatrix: [
        0.9995742440223694,
        0.01638498157262802,
        0.02412819117307663,
        0,
        0.007813597097992897,
        -0.9474818110466003,
        0.31971633434295654,
        0,
        0.028100071474909782,
        -0.31939181685447693,
        -0.9472070932388306,
        0,
        -0.038130562752485275,
        -0.0020653479732573032,
        0.02310742810368538,
        1
      ],
      radius: 0.007231088820844889
    },
    "ring-finger-tip": {
      offsetMatrix: [
        0.9995742440223694,
        0.01638498157262802,
        0.02412819117307663,
        0,
        0.007813597097992897,
        -0.9474818110466003,
        0.31971633434295654,
        0,
        0.028100071474909782,
        -0.31939181685447693,
        -0.9472070932388306,
        0,
        -0.0390593595802784,
        0.004176302347332239,
        0.0466572530567646,
        1
      ],
      radius: 0.0062310886569321156
    },
    "pinky-finger-metacarpal": {
      offsetMatrix: [
        0.9147363901138306,
        0.3458845317363739,
        0.20885537564754486,
        0,
        -0.3923271894454956,
        0.8839452862739563,
        0.2544005811214447,
        0,
        -0.09662359952926636,
        -0.3146490156650543,
        0.9442773461341858,
        0,
        -0.06715242564678192,
        0.024195827543735504,
        0.07137546688318253,
        1
      ],
      radius: 0.01808827556669712
    },
    "pinky-finger-phalanx-proximal": {
      offsetMatrix: [
        0.9613109827041626,
        0.22439135611057281,
        0.15977802872657776,
        0,
        0.01002211682498455,
        0.5511574745178223,
        -0.8343409299850464,
        0,
        -0.27528178691864014,
        0.8036624789237976,
        0.5275853276252747,
        0,
        -0.06273911893367767,
        0.038559623062610626,
        0.028268879279494286,
        1
      ],
      radius: 0.008483353070914745
    },
    "pinky-finger-phalanx-intermediate": {
      offsetMatrix: [
        0.9820972084999084,
        0.18811029195785522,
        -0.00995189044624567,
        0,
        0.14063723385334015,
        -0.7673450708389282,
        -0.6256227493286133,
        0,
        -0.12532226741313934,
        0.6130226850509644,
        -0.7800630927085876,
        0,
        -0.05428232625126839,
        0.013870777562260628,
        0.012061242014169693,
        1
      ],
      radius: 0.0067641944624483585
    },
    "pinky-finger-phalanx-distal": {
      offsetMatrix: [
        0.9744614362716675,
        0.20454788208007812,
        -0.09265263378620148,
        0,
        0.22429193556308746,
        -0.9065253138542175,
        0.35764020681381226,
        0,
        -0.010836843401193619,
        -0.3692878782749176,
        -0.9292529225349426,
        0,
        -0.05173685774207115,
        0.0014194445684552193,
        0.02790539152920246,
        1
      ],
      radius: 0.0064259846694767475
    },
    "pinky-finger-tip": {
      offsetMatrix: [
        0.9744614362716675,
        0.20454788208007812,
        -0.09265263378620148,
        0,
        0.22429193556308746,
        -0.9065253138542175,
        0.35764020681381226,
        0,
        -0.010836843401193619,
        -0.3692878782749176,
        -0.9292529225349426,
        0,
        -0.05098633095622063,
        0.008463085629045963,
        0.048688892275094986,
        1
      ],
      radius: 0.005425984505563974
    }
  },
  gripOffsetMatrix: [
    0.005510995630174875,
    -0.9149997234344482,
    -0.40341615676879883,
    0,
    -0.3571262061595917,
    -0.37861889600753784,
    0.8538784384727478,
    0,
    -0.9340395331382751,
    0.13936474919319153,
    -0.32885703444480896,
    0,
    -0.031803809106349945,
    0.007837686687707901,
    0.04313928261399269,
    1
  ]
};

// src/device/XRHandInput.ts
var DEFAULT_PINCH_THRESHOLDS = {
  press: 0.9,
  release: 0.7
};
var handFingerJoints = {
  thumb: [
    "thumb-metacarpal" /* ThumbMetacarpal */,
    "thumb-phalanx-proximal" /* ThumbPhalanxProximal */,
    "thumb-phalanx-distal" /* ThumbPhalanxDistal */,
    "thumb-tip" /* ThumbTip */
  ],
  index: [
    "index-finger-metacarpal" /* IndexFingerMetacarpal */,
    "index-finger-phalanx-proximal" /* IndexFingerPhalanxProximal */,
    "index-finger-phalanx-intermediate" /* IndexFingerPhalanxIntermediate */,
    "index-finger-phalanx-distal" /* IndexFingerPhalanxDistal */,
    "index-finger-tip" /* IndexFingerTip */
  ],
  middle: [
    "middle-finger-metacarpal" /* MiddleFingerMetacarpal */,
    "middle-finger-phalanx-proximal" /* MiddleFingerPhalanxProximal */,
    "middle-finger-phalanx-intermediate" /* MiddleFingerPhalanxIntermediate */,
    "middle-finger-phalanx-distal" /* MiddleFingerPhalanxDistal */,
    "middle-finger-tip" /* MiddleFingerTip */
  ],
  ring: [
    "ring-finger-metacarpal" /* RingFingerMetacarpal */,
    "ring-finger-phalanx-proximal" /* RingFingerPhalanxProximal */,
    "ring-finger-phalanx-intermediate" /* RingFingerPhalanxIntermediate */,
    "ring-finger-phalanx-distal" /* RingFingerPhalanxDistal */,
    "ring-finger-tip" /* RingFingerTip */
  ],
  pinky: [
    "pinky-finger-metacarpal" /* PinkyFingerMetacarpal */,
    "pinky-finger-phalanx-proximal" /* PinkyFingerPhalanxProximal */,
    "pinky-finger-phalanx-intermediate" /* PinkyFingerPhalanxIntermediate */,
    "pinky-finger-phalanx-distal" /* PinkyFingerPhalanxDistal */,
    "pinky-finger-tip" /* PinkyFingerTip */
  ]
};
var handFingers = Object.keys(handFingerJoints);
var handJoints = Object.values(XRHandJoint);
var hasOwn = (object, key) => typeof key === "string" && Object.prototype.hasOwnProperty.call(object, key);
var oculusHandConfig = {
  profileId: "oculus-hand",
  fallbackProfileIds: [
    "generic-hand",
    "generic-hand-select",
    "generic-trigger"
  ],
  poses: {
    default: relaxedHandPose,
    pinch: pinchHandPose,
    point: pointHandPose,
    ...libraryHandPoses
  }
};
var HAND_GESTURE_BUTTONS = [
  "menu",
  "swipe-left",
  "swipe-right",
  "swipe-forward",
  "swipe-backward",
  "tap"
];
var XRHandGamepadConfig = {
  mapping: "xr-standard" /* XRStandard */,
  buttons: [
    { id: "pinch", type: "analog", eventTrigger: "select" },
    null,
    null,
    null,
    ...HAND_GESTURE_BUTTONS.map((id) => ({ id, type: "binary" }))
  ],
  axes: []
};
var fromPosition = vec3_exports.create();
var fromQuaternion = quat_exports.create();
var fromScale = vec3_exports.create();
var toPosition = vec3_exports.create();
var toQuaternion = quat_exports.create();
var toScale = vec3_exports.create();
var interpolatedPosition = vec3_exports.create();
var interpolatedQuaternion = quat_exports.create();
var interpolatedScale = vec3_exports.create();
var interpolateMatrix = (out, fromMatrix, toMatrix, alpha) => {
  mat4_exports.getTranslation(fromPosition, fromMatrix);
  mat4_exports.getRotation(fromQuaternion, fromMatrix);
  mat4_exports.getScaling(fromScale, fromMatrix);
  mat4_exports.getTranslation(toPosition, toMatrix);
  mat4_exports.getRotation(toQuaternion, toMatrix);
  mat4_exports.getScaling(toScale, toMatrix);
  vec3_exports.lerp(interpolatedPosition, fromPosition, toPosition, alpha);
  quat_exports.slerp(interpolatedQuaternion, fromQuaternion, toQuaternion, alpha);
  vec3_exports.lerp(interpolatedScale, fromScale, toScale, alpha);
  mat4_exports.fromRotationTranslationScale(
    out,
    interpolatedQuaternion,
    interpolatedPosition,
    interpolatedScale
  );
  return out;
};
var parentMatrix = mat4_exports.create();
var baseLocal = mat4_exports.create();
var blendLocal = mat4_exports.create();
var blendedLocal = mat4_exports.create();
var fromBone = vec3_exports.create();
var toBone = vec3_exports.create();
var boneRotation = quat_exports.create();
var noRotation = quat_exports.create();
var interpolateBone = (out, from, to, alpha) => {
  mat4_exports.getTranslation(fromBone, from);
  mat4_exports.getTranslation(toBone, to);
  const fromLength = vec3_exports.length(fromBone);
  const toLength = vec3_exports.length(toBone);
  if (fromLength < 1e-9 || toLength < 1e-9) return;
  vec3_exports.scale(fromBone, fromBone, 1 / fromLength);
  vec3_exports.scale(toBone, toBone, 1 / toLength);
  quat_exports.rotationTo(boneRotation, fromBone, toBone);
  quat_exports.slerp(boneRotation, noRotation, boneRotation, alpha);
  vec3_exports.transformQuat(fromBone, fromBone, boneRotation);
  vec3_exports.scale(fromBone, fromBone, (1 - alpha) * fromLength + alpha * toLength);
  out[12] = fromBone[0];
  out[13] = fromBone[1];
  out[14] = fromBone[2];
};
var mirrorMultiplierMatrix = [
  1,
  -1,
  -1,
  0,
  -1,
  1,
  1,
  0,
  -1,
  1,
  1,
  0,
  -1,
  1,
  1,
  1
];
var mirrorMatrixToRight = (matrixLeft) => {
  for (let i = 0; i < 16; i++) {
    matrixLeft[i] *= mirrorMultiplierMatrix[i];
  }
};
var createPose = () => {
  const pose = {
    jointTransforms: {},
    gripOffsetMatrix: mat4_exports.create()
  };
  for (const jointName of Object.values(XRHandJoint)) {
    pose.jointTransforms[jointName] = {
      offsetMatrix: mat4_exports.create(),
      radius: 0
    };
  }
  return pose;
};
var copyPose = (out, source) => {
  for (const jointName of Object.values(XRHandJoint)) {
    mat4_exports.copy(
      out.jointTransforms[jointName].offsetMatrix,
      source.jointTransforms[jointName].offsetMatrix
    );
    out.jointTransforms[jointName].radius = source.jointTransforms[jointName].radius;
  }
  if (source.gripOffsetMatrix) {
    mat4_exports.copy(out.gripOffsetMatrix, source.gripOffsetMatrix);
  }
};
var lerp4 = (a, b, t) => (1 - t) * a + t * b;
var blendChain = (out, base, other, chain, weight) => {
  let parent = "wrist" /* Wrist */;
  for (const jointName of chain) {
    mat4_exports.invert(parentMatrix, base.jointTransforms[parent].offsetMatrix);
    mat4_exports.multiply(
      baseLocal,
      parentMatrix,
      base.jointTransforms[jointName].offsetMatrix
    );
    mat4_exports.invert(parentMatrix, other.jointTransforms[parent].offsetMatrix);
    mat4_exports.multiply(
      blendLocal,
      parentMatrix,
      other.jointTransforms[jointName].offsetMatrix
    );
    interpolateMatrix(blendedLocal, baseLocal, blendLocal, weight);
    interpolateBone(blendedLocal, baseLocal, blendLocal, weight);
    mat4_exports.multiply(
      out.jointTransforms[jointName].offsetMatrix,
      out.jointTransforms[parent].offsetMatrix,
      blendedLocal
    );
    out.jointTransforms[jointName].radius = lerp4(
      base.jointTransforms[jointName].radius,
      other.jointTransforms[jointName].radius,
      weight
    );
    parent = jointName;
  }
};
var blendHand = (out, a, b, weight) => {
  interpolateMatrix(
    out.jointTransforms["wrist" /* Wrist */].offsetMatrix,
    a.jointTransforms["wrist" /* Wrist */].offsetMatrix,
    b.jointTransforms["wrist" /* Wrist */].offsetMatrix,
    weight
  );
  out.jointTransforms["wrist" /* Wrist */].radius = lerp4(
    a.jointTransforms["wrist" /* Wrist */].radius,
    b.jointTransforms["wrist" /* Wrist */].radius,
    weight
  );
  for (const finger of handFingers) {
    blendChain(out, a, b, handFingerJoints[finger], weight);
  }
  if (a.gripOffsetMatrix && b.gripOffsetMatrix) {
    interpolateMatrix(
      out.gripOffsetMatrix,
      a.gripOffsetMatrix,
      b.gripOffsetMatrix,
      weight
    );
  }
};
var PINCH_FINGERS = ["thumb", "index"];
var ANCHOR_JOINTS = {
  wrist: "wrist" /* Wrist */,
  "index-tip": "index-finger-tip" /* IndexFingerTip */,
  "thumb-tip": "thumb-tip" /* ThumbTip */
};
var isHandAnchor = (value) => typeof value === "string" && (value === "target-ray" || value === "grip" || value === "grasp" || hasOwn(ANCHOR_JOINTS, value) || handJoints.includes(value));
var wristRotationFromDirections = (directions, handedness, out = quat_exports.create()) => {
  const z = vec3_exports.normalize(
    vec3_exports.create(),
    vec3_exports.negate(vec3_exports.create(), directions.fingers)
  );
  const y = vec3_exports.create();
  if (directions.palm) {
    vec3_exports.negate(y, directions.palm);
  } else if (directions.thumb) {
    vec3_exports.cross(y, directions.thumb, directions.fingers);
    if (handedness === "right" /* Right */) {
      vec3_exports.negate(y, y);
    }
  } else {
    return null;
  }
  vec3_exports.scaleAndAdd(y, y, z, -vec3_exports.dot(y, z));
  if (vec3_exports.length(y) < 1e-6) {
    return null;
  }
  vec3_exports.normalize(y, y);
  const x = vec3_exports.cross(vec3_exports.create(), y, z);
  const m = mat4_exports.fromValues(
    x[0],
    x[1],
    x[2],
    0,
    y[0],
    y[1],
    y[2],
    0,
    z[0],
    z[1],
    z[2],
    0,
    0,
    0,
    0,
    1
  );
  return quat_exports.normalize(out, mat4_exports.getRotation(out, m));
};
var anchorScratch = vec3_exports.create();
var anchorPartScratch = vec3_exports.create();
var pinchedScratch = createPose();
var thumbScratch = createPose();
var wristLocalScratch = quat_exports.create();
var desiredRotation = quat_exports.create();
var radialScratch = vec3_exports.create();
var _a12;
var XRHandInput = class extends (_a12 = XRTrackedInput, P_HAND_INPUT, _a12) {
  constructor(handInputConfig, handedness, globalSpace) {
    if (handedness !== "left" /* Left */ && handedness !== "right" /* Right */) {
      throw new DOMException(
        'handedness for XRHandInput must be either "left" or "right"',
        "InvalidStateError"
      );
    }
    if (!handInputConfig.poses.default || !handInputConfig.poses.pinch) {
      throw new DOMException(
        '"default" and "pinch" hand pose configs are required',
        "InvalidStateError"
      );
    }
    const pinchThresholds = handInputConfig.pinchThresholds ?? DEFAULT_PINCH_THRESHOLDS;
    if (!(pinchThresholds.release > 0 && pinchThresholds.release < pinchThresholds.press && pinchThresholds.press <= 1)) {
      throw new DOMException(
        "pinchThresholds need 0 < release < press <= 1",
        "InvalidStateError"
      );
    }
    const targetRaySpace = new XRSpace(globalSpace);
    const gripSpace = new XRSpace(targetRaySpace);
    const profiles = [
      handInputConfig.profileId,
      ...handInputConfig.fallbackProfileIds
    ];
    const hand = new XRHand();
    Object.values(XRHandJoint).forEach((jointName) => {
      hand.set(jointName, new XRJointSpace(jointName, targetRaySpace));
    });
    const inputSource = new XRInputSource(
      handedness,
      "tracked-pointer" /* TrackedPointer */,
      profiles,
      targetRaySpace,
      new Gamepad(XRHandGamepadConfig),
      gripSpace,
      hand
    );
    super(inputSource);
    const pinchButton = inputSource.gamepad[P_GAMEPAD].buttonsMap.pinch;
    pinchButton[P_GAMEPAD].thresholds = { ...pinchThresholds };
    const blendedPose = createPose();
    this[P_HAND_INPUT] = {
      poseId: "default",
      poses: handInputConfig.poses,
      fingerPoses: {},
      blendedPose,
      blendedPoseStale: false,
      fingersBlended: false,
      transitionFrom: createPose(),
      transitionFromId: "default",
      transitionProgress: null,
      displayedPose: createPose(),
      thumbMotion: null,
      pin: null
    };
    this.updateHandPose();
  }
  get poseId() {
    return this[P_HAND_INPUT].poseId;
  }
  /**
   * Sets the whole hand to a pose and clears any finger blends. A pose change
   * in progress (beginPoseTransition) stops and the hand snaps to the pose.
   */
  set poseId(poseId) {
    if (!hasOwn(this[P_HAND_INPUT].poses, poseId)) {
      console.warn(`Pose config ${poseId} not found`);
      return;
    }
    this[P_HAND_INPUT].poseId = poseId;
    this[P_HAND_INPUT].fingerPoses = {};
    this[P_HAND_INPUT].blendedPoseStale = true;
    this[P_HAND_INPUT].transitionProgress = null;
  }
  /** Ids of every pose this hand can take. */
  get poseIds() {
    return Object.keys(this[P_HAND_INPUT].poses);
  }
  /** Fingers currently taken from other poses, on top of `poseId` (a copy). */
  get fingerPoses() {
    const fingerPoses = {};
    for (const finger of handFingers) {
      const blend = this[P_HAND_INPUT].fingerPoses[finger];
      if (blend) fingerPoses[finger] = { ...blend };
    }
    return fingerPoses;
  }
  /**
   * Takes one finger from another pose while the rest of the hand keeps
   * `poseId`, e.g. curl the middle, ring and pinky of `open` from `fist`.
   * `weight` blends between the base pose's finger (0) and `poseId`'s (1).
   * Each joint blends relative to its parent joint and keeps a bone length
   * between the two poses' lengths. The 21 generated poses are built on the
   * captured relaxed skeleton, so between them each finger's bones keep
   * exactly the same lengths.
   */
  setFingerPose(finger, poseId, weight = 1) {
    if (!hasOwn(handFingerJoints, finger)) {
      console.warn(`Unknown finger ${finger}`);
      return;
    }
    if (!hasOwn(this[P_HAND_INPUT].poses, poseId)) {
      console.warn(`Pose config ${poseId} not found`);
      return;
    }
    if (typeof weight !== "number" || !(weight >= 0 && weight <= 1)) {
      console.warn(`Out-of-range weight ${weight} provided for ${finger}`);
      return;
    }
    this[P_HAND_INPUT].fingerPoses[finger] = { poseId, weight };
    this[P_HAND_INPUT].blendedPoseStale = true;
  }
  /** Clears the blend for one finger, or for every finger if omitted. */
  clearFingerPoses(finger) {
    if (finger === void 0) {
      this[P_HAND_INPUT].fingerPoses = {};
    } else if (hasOwn(handFingerJoints, finger)) {
      delete this[P_HAND_INPUT].fingerPoses[finger];
    } else {
      console.warn(`Unknown finger ${finger}`);
      return;
    }
    this[P_HAND_INPUT].blendedPoseStale = true;
  }
  /** Rebuilds `blendedPose`; returns false when no finger is blended. */
  blendFingers(basePose) {
    const { poses, fingerPoses, blendedPose } = this[P_HAND_INPUT];
    if (!handFingers.some((finger) => fingerPoses[finger])) {
      return false;
    }
    copyPose(blendedPose, basePose);
    for (const finger of handFingers) {
      const blend = fingerPoses[finger];
      if (blend) {
        blendChain(
          blendedPose,
          basePose,
          poses[blend.poseId],
          handFingerJoints[finger],
          blend.weight
        );
      }
    }
    return true;
  }
  /**
   * Starts a timed change to `poseId` (and finger blends): the hand fades
   * from what it shows now (before pinch, mid-fade included) as
   * `poseTransitionProgress` goes from 0 to 1. `poseId` and `fingerPoses`
   * report the new pose right away.
   */
  beginPoseTransition(poseId, fingers = {}) {
    const state = this[P_HAND_INPUT];
    if (!hasOwn(state.poses, poseId)) {
      console.warn(`Pose config ${poseId} not found`);
      return false;
    }
    this.updateDisplayedPose();
    copyPose(state.transitionFrom, state.displayedPose);
    state.transitionFromId = state.poseId;
    state.poseId = poseId;
    state.fingerPoses = {};
    for (const finger of handFingers) {
      const blend = fingers[finger];
      if (blend) state.fingerPoses[finger] = { ...blend };
    }
    state.blendedPoseStale = true;
    state.transitionProgress = 0;
    return true;
  }
  /** Progress (0 to 1) of the pose change begun by beginPoseTransition, or null. */
  get poseTransitionProgress() {
    return this[P_HAND_INPUT].transitionProgress;
  }
  set poseTransitionProgress(progress) {
    this[P_HAND_INPUT].transitionProgress = progress === null || progress >= 1 ? null : Math.max(0, progress);
  }
  /**
   * The pose a change in progress fades from (the pose set before it), or
   * null when no change is in progress.
   */
  get poseTransitionFrom() {
    const state = this[P_HAND_INPUT];
    return state.transitionProgress === null ? null : state.transitionFromId;
  }
  /** Where remote control holds this hand, or null. */
  get pin() {
    return this[P_HAND_INPUT].pin;
  }
  /**
   * Holds `anchor` at `target` (GlobalSpace) from now on, re-solved every frame
   * after the hand's shape updates, optionally with a fixed wrist rotation.
   * Applies right away, to the hand's current shape. Pass null to let go.
   */
  setPin(pin) {
    this[P_HAND_INPUT].pin = pin ? {
      anchor: pin.anchor,
      target: vec3_exports.clone(pin.target),
      wristRotation: pin.wristRotation && quat_exports.clone(pin.wristRotation),
      graspPinch: pin.graspPinch
    } : null;
    this.updateHandPose();
  }
  /** The wrist's rotation in GlobalSpace for the hand as shown now. */
  wristRotation(out = quat_exports.create()) {
    mat4_exports.getRotation(
      out,
      this.inputSource.hand.get("wrist" /* Wrist */)[P_SPACE].offsetMatrix
    );
    quat_exports.multiply(out, this.quaternion.quat, out);
    return quat_exports.normalize(out, out);
  }
  /**
   * An anchor's position in the target-ray frame for the hand as shown now
   * (pinch included); `grasp` is fixed for the current pose.
   */
  anchorOffset(anchor, out = vec3_exports.create(), graspPinch = 1) {
    if (anchor === "target-ray") {
      return vec3_exports.set(out, 0, 0, 0);
    }
    if (anchor === "grip") {
      return mat4_exports.getTranslation(
        out,
        this.inputSource.gripSpace[P_SPACE].offsetMatrix
      );
    }
    if (anchor === "grasp") {
      const state = this[P_HAND_INPUT];
      copyPose(pinchedScratch, state.displayedPose);
      for (const finger of PINCH_FINGERS) {
        blendChain(
          pinchedScratch,
          state.displayedPose,
          state.poses.pinch,
          handFingerJoints[finger],
          graspPinch
        );
      }
      mat4_exports.getTranslation(
        out,
        pinchedScratch.jointTransforms["thumb-tip" /* ThumbTip */].offsetMatrix
      );
      mat4_exports.getTranslation(
        anchorPartScratch,
        pinchedScratch.jointTransforms["index-finger-tip" /* IndexFingerTip */].offsetMatrix
      );
      vec3_exports.lerp(out, out, anchorPartScratch, 0.5);
      if (this.inputSource.handedness === "right" /* Right */) {
        out[0] = -out[0];
      }
      return out;
    }
    const jointName = ANCHOR_JOINTS[anchor] ?? anchor;
    return mat4_exports.getTranslation(
      out,
      this.inputSource.hand.get(jointName)[P_SPACE].offsetMatrix
    );
  }
  /**
   * The hand's axes in the target-ray frame, from the displayed wrist:
   * fingers (wrist -Z), palm (wrist -Y) and the thumb side. Mirror-safe.
   */
  handAxes() {
    const wrist = this.inputSource.hand.get("wrist" /* Wrist */)[P_SPACE].offsetMatrix;
    const fingers = vec3_exports.fromValues(-wrist[8], -wrist[9], -wrist[10]);
    const palm = vec3_exports.fromValues(-wrist[4], -wrist[5], -wrist[6]);
    const thumb = vec3_exports.cross(vec3_exports.create(), palm, fingers);
    const index = this.inputSource.hand.get(
      "index-finger-metacarpal" /* IndexFingerMetacarpal */
    )[P_SPACE].offsetMatrix;
    const pinky = this.inputSource.hand.get(
      "pinky-finger-metacarpal" /* PinkyFingerMetacarpal */
    )[P_SPACE].offsetMatrix;
    vec3_exports.set(
      radialScratch,
      index[12] - pinky[12],
      index[13] - pinky[13],
      index[14] - pinky[14]
    );
    if (vec3_exports.dot(thumb, radialScratch) < 0) {
      vec3_exports.negate(thumb, thumb);
    }
    return { fingers, palm, thumb: vec3_exports.normalize(thumb, thumb) };
  }
  /** Re-applies the pin, if any, to the target-ray pose. */
  solvePin() {
    const pin = this[P_HAND_INPUT].pin;
    if (!pin) {
      return;
    }
    if (pin.wristRotation) {
      mat4_exports.getRotation(
        wristLocalScratch,
        this.inputSource.hand.get("wrist" /* Wrist */)[P_SPACE].offsetMatrix
      );
      quat_exports.invert(wristLocalScratch, wristLocalScratch);
      quat_exports.multiply(desiredRotation, pin.wristRotation, wristLocalScratch);
      quat_exports.normalize(desiredRotation, desiredRotation);
      this.quaternion.set(
        desiredRotation[0],
        desiredRotation[1],
        desiredRotation[2],
        desiredRotation[3]
      );
    }
    this.anchorOffset(pin.anchor, anchorScratch, pin.graspPinch);
    vec3_exports.transformQuat(anchorScratch, anchorScratch, this.quaternion.quat);
    this.position.set(
      pin.target[0] - anchorScratch[0],
      pin.target[1] - anchorScratch[1],
      pin.target[2] - anchorScratch[2]
    );
    this.updateTargetRaySpace();
  }
  /** Rebuilds `displayedPose`: the pose, finger blends and any pose change. */
  updateDisplayedPose() {
    const state = this[P_HAND_INPUT];
    const basePose = state.poses[state.poseId];
    if (state.blendedPoseStale) {
      state.fingersBlended = this.blendFingers(basePose);
      state.blendedPoseStale = false;
    }
    const targetPose = state.fingersBlended ? state.blendedPose : basePose;
    if (state.transitionProgress !== null) {
      blendHand(
        state.displayedPose,
        state.transitionFrom,
        targetPose,
        state.transitionProgress
      );
    } else {
      copyPose(state.displayedPose, targetPose);
    }
  }
  /**
   * Updates the joints and grip from the pose, finger blends, any pose change,
   * any thumb movement and the pinch, then re-solves the pin. Runs every
   * frame.
   */
  updateHandPose() {
    const state = this[P_HAND_INPUT];
    const basePose = state.poses[state.poseId];
    this.updateDisplayedPose();
    const displayed = state.displayedPose;
    let shown = displayed;
    const motion = state.thumbMotion;
    if (motion) {
      copyPose(thumbScratch, displayed);
      blendChain(
        thumbScratch,
        motion.from,
        motion.to,
        handFingerJoints.thumb,
        motion.weight
      );
      shown = thumbScratch;
    }
    const pinchValue = this.pinchValue;
    if (pinchValue > 0) {
      copyPose(pinchedScratch, shown);
      for (const finger of PINCH_FINGERS) {
        blendChain(
          pinchedScratch,
          shown,
          state.poses.pinch,
          handFingerJoints[finger],
          pinchValue
        );
      }
      shown = pinchedScratch;
    }
    const right = this.inputSource.handedness === "right" /* Right */;
    for (const jointName of handJoints) {
      const jointSpace = this.inputSource.hand.get(jointName);
      mat4_exports.copy(
        jointSpace[P_SPACE].offsetMatrix,
        shown.jointTransforms[jointName].offsetMatrix
      );
      if (right) {
        mirrorMatrixToRight(jointSpace[P_SPACE].offsetMatrix);
      }
      jointSpace[P_JOINT_SPACE].radius = shown.jointTransforms[jointName].radius;
    }
    if (basePose.gripOffsetMatrix) {
      mat4_exports.copy(
        this.inputSource.gripSpace[P_SPACE].offsetMatrix,
        displayed.gripOffsetMatrix
      );
      if (right) {
        mirrorMatrixToRight(this.inputSource.gripSpace[P_SPACE].offsetMatrix);
      }
    }
    this.solvePin();
  }
  get pinchValue() {
    return this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap["pinch"].value;
  }
  updatePinchValue(value) {
    if (!(value >= 0 && value <= 1)) {
      console.warn(`Out-of-range value ${value} provided for pinch`);
      return;
    }
    writePendingValue(
      this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap.pinch,
      value
    );
  }
  /**
   * Set pinch synchronously. Releasing a held pinch this way cancels the
   * select (`selectend` without `select`), for interaction cancellation.
   */
  setPinchValueImmediate(value) {
    if (!(value >= 0 && value <= 1)) {
      console.warn(`Out-of-range value ${value} provided for pinch`);
      return;
    }
    writeImmediateValue(
      this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap.pinch,
      value
    );
  }
  /**
   * The thumb movement shown on top of the pose (microgestures), or null.
   * Applies from the next pose update (every frame).
   */
  get thumbMotion() {
    return this[P_HAND_INPUT].thumbMotion;
  }
  set thumbMotion(motion) {
    this[P_HAND_INPUT].thumbMotion = motion;
  }
  /**
   * Writes a gesture button (menu, or a microgesture) for the next frame:
   * 1 pressed, 0 released. These buttons fire no session events; apps read
   * them from the hand's gamepad.
   */
  updateGestureButton(id, value) {
    if (!HAND_GESTURE_BUTTONS.includes(id) || value !== 0 && value !== 1) {
      console.warn(`Invalid value ${value} provided for gesture button ${id}`);
      return;
    }
    writePendingValue(
      this[P_TRACKED_INPUT].inputSource.gamepad[P_GAMEPAD].buttonsMap[id],
      value
    );
  }
  onFrameStart(frame) {
    super.onFrameStart(frame);
    this.updateHandPose();
  }
};

// src/version.ts
var VERSION = "2.8.0";

// src/device/XRGazeInput.ts
var GAZE_TRACKING_FEATURES = [
  "gaze-tracking",
  "eye-tracking"
];
var isGazeTrackingFeature = (feature) => GAZE_TRACKING_FEATURES.includes(feature);
var supportsGazeTracking = (supportedFeatures) => supportedFeatures.some(isGazeTrackingFeature);
var XRGazeInput = class extends XRTrackedInput {
  constructor(viewerSpace) {
    const inputSource = new XRInputSource(
      "none" /* None */,
      "gaze" /* Gaze */,
      ["eye-gaze"],
      new XRSpace(viewerSpace)
    );
    super(inputSource);
    this.position.set(0, 0, 0);
  }
  updateTargetRaySpace() {
    this.position.set(0, 0, 0);
    super.updateTargetRaySpace();
  }
};

// src/initialization/XRSystem.ts
var _a13;
var XRSystem = class extends (_a13 = EventTarget, P_SYSTEM, _a13) {
  constructor(device) {
    super();
    this[P_SYSTEM] = {
      device,
      grantSession: ({ resolve, reject, mode, options }) => {
        if (this[P_SYSTEM].activeSession) {
          reject(
            new DOMException(
              "An active XRSession already exists.",
              "InvalidStateError"
            )
          );
          return;
        }
        const { requiredFeatures = [], optionalFeatures = [] } = options;
        const { supportedFeatures } = this[P_SYSTEM].device;
        const isFeatureSupported = (feature) => isGazeTrackingFeature(feature) ? supportsGazeTracking(supportedFeatures) : supportedFeatures.includes(feature);
        const allRequiredSupported = requiredFeatures.every(isFeatureSupported);
        if (!allRequiredSupported) {
          reject(
            new DOMException(
              "One or more required features are not supported by the device.",
              "NotSupportedError"
            )
          );
          return;
        }
        const supportedOptionalFeatures = optionalFeatures.filter(isFeatureSupported);
        const enabledFeatures = Array.from(
          /* @__PURE__ */ new Set([
            ...requiredFeatures,
            ...supportedOptionalFeatures,
            "viewer",
            "local"
          ])
        );
        const session = new XRSession(
          this[P_SYSTEM].device,
          mode,
          enabledFeatures,
          options.depthSensing
        );
        this[P_SYSTEM].activeSession = session;
        session.addEventListener(
          "end",
          () => {
            this[P_SYSTEM].activeSession = void 0;
          },
          { once: true }
        );
        resolve(session);
      }
    };
  }
  isSessionSupported(mode) {
    return new Promise((resolve, _reject) => {
      if (mode === "inline") {
        const device = this[P_SYSTEM].device;
        resolve(
          !device[P_DEVICE].host || device.supportedSessionModes.includes("inline")
        );
      } else {
        resolve(this[P_SYSTEM].device.supportedSessionModes.includes(mode));
      }
    });
  }
  requestSession(mode, options = {}) {
    return new Promise((resolve, reject) => {
      this.isSessionSupported(mode).then((isSupported) => {
        if (!isSupported) {
          reject(
            new DOMException(
              "The requested XRSession mode is not supported.",
              "NotSupportedError"
            )
          );
          return;
        }
        const sessionGrantConfig = {
          resolve,
          reject,
          mode,
          options
        };
        this[P_SYSTEM].grantSession(sessionGrantConfig);
      }).catch(reject);
    });
  }
  offerSession(mode, options = {}) {
    return new Promise((resolve, reject) => {
      this.isSessionSupported(mode).then((isSupported) => {
        if (!isSupported) {
          reject(
            new DOMException(
              "The requested XRSession mode is not supported.",
              "NotSupportedError"
            )
          );
          return;
        }
        this[P_SYSTEM].offeredSessionConfig?.reject(
          new Error("Offer superseded by a new offerSession call.")
        );
        this[P_SYSTEM].offeredSessionConfig = {
          resolve,
          reject,
          mode,
          options
        };
        if (this[P_SYSTEM].device[P_DEVICE].host?.autoGrantOfferedSession) {
          this[P_SYSTEM].device.grantOfferedSession();
        }
      }).catch(reject);
    });
  }
};

// src/device/configs/controller/meta.ts
var gamepadConfigLeft = {
  mapping: "xr-standard" /* XRStandard */,
  buttons: [
    { id: "trigger", type: "analog", eventTrigger: "select" },
    { id: "squeeze", type: "analog", eventTrigger: "squeeze" },
    null,
    { id: "thumbstick", type: "binary" },
    { id: "x-button", type: "binary" },
    { id: "y-button", type: "binary" },
    { id: "thumbrest", type: "binary" }
  ],
  axes: [
    null,
    null,
    { id: "thumbstick", type: "x-axis" },
    { id: "thumbstick", type: "y-axis" }
  ]
};
var gamepadConfigRight = {
  mapping: "xr-standard" /* XRStandard */,
  buttons: [
    { id: "trigger", type: "analog", eventTrigger: "select" },
    { id: "squeeze", type: "analog", eventTrigger: "squeeze" },
    null,
    { id: "thumbstick", type: "binary" },
    { id: "a-button", type: "binary" },
    { id: "b-button", type: "binary" },
    { id: "thumbrest", type: "binary" }
  ],
  axes: [
    null,
    null,
    { id: "thumbstick", type: "x-axis" },
    { id: "thumbstick", type: "y-axis" }
  ]
};
var oculusTouchV2 = {
  profileId: "oculus-touch-v2",
  fallbackProfileIds: ["oculus-touch", "generic-trigger-squeeze-thumbstick"],
  layout: {
    left: {
      gamepad: gamepadConfigLeft,
      gripOffsetMatrix: [
        0.9925461411476135,
        4673031295254759e-24,
        -0.12186938524246216,
        0,
        0.08617470413446426,
        0.7071065306663513,
        0.7018362283706665,
        0,
        0.0861746296286583,
        -0.70710688829422,
        0.7018358707427979,
        0,
        -0.003979847766458988,
        -0.01585787907242775,
        0.04964185878634453,
        1
      ],
      numHapticActuators: 1
    },
    right: {
      gamepad: gamepadConfigRight,
      gripOffsetMatrix: [
        0.9925461411476135,
        3688163374704345e-23,
        0.12186937034130096,
        0,
        -0.08617469668388367,
        0.7071066498756409,
        0.7018361687660217,
        0,
        -0.0861746147274971,
        -0.7071068286895752,
        0.7018359899520874,
        0,
        0.003979853354394436,
        -0.01585787907242775,
        0.04964182525873184,
        1
      ],
      numHapticActuators: 1
    }
  }
};
var oculusTouchV3 = {
  profileId: "oculus-touch-v3",
  fallbackProfileIds: ["oculus-touch", "generic-trigger-squeeze-thumbstick"],
  layout: {
    left: {
      gamepad: gamepadConfigLeft,
      gripOffsetMatrix: [
        0.9925461411476135,
        20823669899527886e-24,
        -0.12186937034130096,
        0,
        0.08617465198040009,
        0.7071067094802856,
        0.701836109161377,
        0,
        0.08617466688156128,
        -0.7071067690849304,
        0.7018360495567322,
        0,
        -0.003979838453233242,
        -0.015857907012104988,
        0.04964181408286095,
        1
      ],
      numHapticActuators: 1
    },
    right: {
      gamepad: gamepadConfigRight,
      gripOffsetMatrix: [
        0.9925461411476135,
        -8329467959811154e-23,
        0.12186941504478455,
        0,
        -0.08617465943098068,
        0.7071066498756409,
        0.7018361687660217,
        0,
        -0.08617471158504486,
        -0.7071068286895752,
        0.7018359303474426,
        0,
        0.003979798872023821,
        -0.015857888385653496,
        0.049641866236925125,
        1
      ],
      numHapticActuators: 1
    }
  }
};
var metaQuestTouchPro = {
  profileId: "meta-quest-touch-pro",
  fallbackProfileIds: [
    "oculus-touch-v2",
    "oculus-touch",
    "generic-trigger-squeeze-thumbstick"
  ],
  layout: {
    left: {
      gamepad: gamepadConfigLeft,
      gripOffsetMatrix: [
        0.9925461411476135,
        -15779937356796836e-24,
        -0.12186935544013977,
        0,
        0.08617467433214188,
        0.7071067094802856,
        0.701836109161377,
        0,
        0.0861746296286583,
        -0.7071067690849304,
        0.7018360495567322,
        0,
        -0.003979836590588093,
        -0.015857847407460213,
        0.049641840159893036,
        1
      ],
      numHapticActuators: 3
    },
    right: {
      gamepad: gamepadConfigRight,
      gripOffsetMatrix: [
        0.9925461411476135,
        9267653311439972e-26,
        0.12186937034130096,
        0,
        -0.08617467433214188,
        0.7071067094802856,
        0.7018361687660217,
        0,
        -0.08617464452981949,
        -0.7071067690849304,
        0.7018360495567322,
        0,
        0.003979847766458988,
        -0.01585782691836357,
        0.04964186251163483,
        1
      ],
      numHapticActuators: 3
    }
  }
};
var metaQuestTouchPlus = {
  profileId: "meta-quest-touch-plus",
  fallbackProfileIds: [
    "oculus-touch-v3",
    "oculus-touch",
    "generic-trigger-squeeze-thumbstick"
  ],
  layout: {
    left: {
      gamepad: gamepadConfigLeft,
      gripOffsetMatrix: [
        0.9925461411476135,
        10736208366779465e-24,
        -0.12186933308839798,
        0,
        0.08617459982633591,
        0.70710688829422,
        0.7018360495567322,
        0,
        0.08617466688156128,
        -0.7071067094802856,
        0.7018362283706665,
        0,
        -0.003979803062975407,
        -0.015857873484492302,
        0.04964187368750572,
        1
      ],
      numHapticActuators: 1
    },
    right: {
      gamepad: gamepadConfigRight,
      gripOffsetMatrix: [
        0.9925461411476135,
        -26238110351073374e-24,
        0.12186934053897858,
        0,
        -0.0861746147274971,
        0.7071067690849304,
        0.7018360495567322,
        0,
        -0.08617465943098068,
        -0.7071067094802856,
        0.701836109161377,
        0,
        0.003979838453233242,
        -0.015857869759202003,
        0.04964182525873184,
        1
      ],
      numHapticActuators: 1
    }
  }
};

// src/device/host-input-frame.ts
var deferring = false;
var queued = [];
function deferEdges(source) {
  if (!deferring) {
    return false;
  }
  queued.push(source);
  return true;
}
function runHostInputFrame(inputs, frame) {
  if (inputs.length === 0) {
    return;
  }
  deferring = true;
  try {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].onFrameStart(frame);
    }
    deferring = false;
    for (let i = 0; i < queued.length; i++) {
      const source = queued[i];
      queued[i] = null;
      if (source.connected) {
        source.applyEdges(frame);
      }
    }
  } finally {
    deferring = false;
    while (queued.length > 0) {
      queued.pop();
    }
  }
}

// src/device/XRHostInput.ts
var XRHostInputMode = /* @__PURE__ */ ((XRHostInputMode2) => {
  XRHostInputMode2[XRHostInputMode2["None"] = 0] = "None";
  XRHostInputMode2[XRHostInputMode2["Controller"] = 1] = "Controller";
  XRHostInputMode2[XRHostInputMode2["Hand"] = 2] = "Hand";
  return XRHostInputMode2;
})(XRHostInputMode || {});
var HOST_INPUT_BUTTONS = 10;
var HOST_INPUT_JOINTS = 25;
var HOST_INPUT_JOINT_STRIDE = 8;
var HOST_INPUT_POSE_STRIDE = 7;
var AXES = 4;
var JOINT_NAMES = Object.values(XRHandJoint);
var WRIST_JOINT = JOINT_NAMES.indexOf("wrist" /* Wrist */);
var XRHostInputState = class {
  constructor(handedness) {
    this.mode = 0 /* None */;
    /** Target ray (aim) pose: px py pz qx qy qz qw. */
    this.targetRay = new Float32Array(HOST_INPUT_POSE_STRIDE);
    this.targetRayValid = false;
    /** Grip pose: px py pz qx qy qz qw. */
    this.grip = new Float32Array(HOST_INPUT_POSE_STRIDE);
    this.gripValid = false;
    /** Palm pose (hands only), the grip of a hand whose grip is not valid. */
    this.palm = new Float32Array(HOST_INPUT_POSE_STRIDE);
    this.palmValid = false;
    /** Button values, gamepad index order. */
    this.buttonValues = new Float32Array(HOST_INPUT_BUTTONS);
    /** 1 pressed. The host decides; IWER applies no threshold. */
    this.buttonPressed = new Uint8Array(HOST_INPUT_BUTTONS);
    /** 1 touched. Pressed implies touched. */
    this.buttonTouched = new Uint8Array(HOST_INPUT_BUTTONS);
    /** Gamepad axes (controllers): touchpad x, y, thumbstick x, y. */
    this.axes = new Float32Array(AXES);
    /** WebXR joints, `XRHandJoint` order: px py pz qx qy qz qw radius. */
    this.joints = new Float32Array(
      HOST_INPUT_JOINTS * HOST_INPUT_JOINT_STRIDE
    );
    /** 1 tracked, per joint. */
    this.jointValid = new Uint8Array(HOST_INPUT_JOINTS);
    this.handedness = handedness;
    this.targetRay[6] = 1;
    this.grip[6] = 1;
    this.palm[6] = 1;
    for (let j = 0; j < HOST_INPUT_JOINTS; j++) {
      this.joints[j * HOST_INPUT_JOINT_STRIDE + 6] = 1;
    }
  }
};
var poseToMatrix = (out, src, offset) => {
  const x = src[offset + 3];
  const y = src[offset + 4];
  const z = src[offset + 5];
  const w = src[offset + 6];
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = src[offset];
  out[13] = src[offset + 1];
  out[14] = src[offset + 2];
  out[15] = 1;
};
var writePose = (space, src, offset, valid) => {
  space[P_SPACE].tracked = valid;
  if (valid) {
    poseToMatrix(space[P_SPACE].offsetMatrix, src, offset);
  }
};
var createHostSpace = (globalSpace) => {
  const space = new XRSpace(globalSpace);
  space[P_SPACE].emulated = false;
  space[P_SPACE].tracked = false;
  return space;
};
var toManualButton = (button) => button && {
  id: button.id,
  type: "manual",
  ...button.eventTrigger ? { eventTrigger: button.eventTrigger } : {}
};
var TOUCHPAD_AXES = [
  { id: "touchpad", type: "x-axis" },
  { id: "touchpad", type: "y-axis" }
];
var hostControllerGamepadConfig = (config, menuButton) => {
  const buttons = config.buttons.map(toManualButton);
  if (menuButton && buttons.length <= 7) {
    while (buttons.length < 7) {
      buttons.push(null);
    }
    buttons.push({ id: "menu", type: "manual" });
  }
  const axes = [];
  for (let i = 0; i < AXES; i++) {
    axes.push(config.axes[i] ?? (i < 2 ? TOUCHPAD_AXES[i] : null));
  }
  return { mapping: config.mapping, buttons, axes };
};
var hostHandGamepadConfig = {
  mapping: XRHandGamepadConfig.mapping,
  buttons: XRHandGamepadConfig.buttons.map(toManualButton),
  axes: []
};
var XRHostSource = class extends XRTrackedInput {
  constructor(inputSource, state) {
    super(inputSource);
    // A source primes on the frame it is listed: its buttons take their state
    // without reporting an edge, so a held trigger reports `selectstart` on
    // the next frame, after `inputsourceschange` announced the source.
    this.primed = false;
    this.state = state;
    this.connected = false;
    this.buttons = inputSource.gamepad.buttons.map(
      (button) => button instanceof GamepadButton ? button : null
    );
  }
  applyButtons() {
    const { buttonValues, buttonPressed, buttonTouched } = this.state;
    const buttons = this.buttons;
    const count = Math.min(buttons.length, HOST_INPUT_BUTTONS);
    for (let i = 0; i < count; i++) {
      const button = buttons[i];
      if (button) {
        const s = button[P_GAMEPAD];
        s.value = buttonValues[i];
        s.pressed = buttonPressed[i] !== 0;
        s.touched = s.pressed || buttonTouched[i] !== 0;
      }
    }
  }
  applyEdges(frame) {
    if (deferEdges(this)) {
      return;
    }
    const buttons = this.buttons;
    if (!this.primed) {
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button) {
          const s = button[P_GAMEPAD];
          s.lastFramePressed = false;
          s.lastFrameValue = 0;
        }
      }
      this.primed = true;
      return;
    }
    const session = frame.session;
    const inputSource = this.inputSource;
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      if (button) {
        dispatchButtonEdge(session, frame, inputSource, button);
      }
    }
  }
  applyTimestamp(frame) {
    this.inputSource.gamepad[P_GAMEPAD].timestamp = frame.predictedDisplayTime;
  }
};
var XRHostController = class extends XRHostSource {
  constructor(state, globalSpace, profiles, gamepadConfig2, numHapticActuators, onPulse) {
    const gamepad = new Gamepad(gamepadConfig2, "", -1, numHapticActuators);
    for (const actuator of gamepad.hapticActuators) {
      actuator[P_GAMEPAD].onPulse = onPulse;
    }
    super(
      new XRInputSource(
        state.handedness,
        "tracked-pointer" /* TrackedPointer */,
        profiles,
        createHostSpace(globalSpace),
        gamepad,
        createHostSpace(globalSpace)
      ),
      state
    );
    this.axisTargets = gamepadConfig2.axes.map(
      (axis) => axis ? gamepad[P_GAMEPAD].axesMap[axis.id] : null
    );
    this.axisIsY = gamepadConfig2.axes.map((axis) => axis?.type === "y-axis");
  }
  onFrameStart(frame) {
    const state = this.state;
    const inputSource = this.inputSource;
    writePose(
      inputSource.targetRaySpace,
      state.targetRay,
      0,
      state.targetRayValid
    );
    writePose(inputSource.gripSpace, state.grip, 0, state.gripValid);
    this.applyButtons();
    const targets = this.axisTargets;
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (target) {
        if (this.axisIsY[i]) {
          target.y = state.axes[i];
        } else {
          target.x = state.axes[i];
        }
      }
    }
    this.applyTimestamp(frame);
    this.applyEdges(frame);
  }
};
var XRHostHand = class extends XRHostSource {
  constructor(state, globalSpace) {
    const hand = new XRHand();
    const jointSpaces = [];
    for (const jointName of JOINT_NAMES) {
      const jointSpace = new XRJointSpace(jointName, globalSpace);
      jointSpace[P_SPACE].emulated = false;
      jointSpace[P_SPACE].tracked = false;
      hand.set(jointName, jointSpace);
      jointSpaces.push(jointSpace);
    }
    super(
      new XRInputSource(
        state.handedness,
        "tracked-pointer" /* TrackedPointer */,
        [oculusHandConfig.profileId, ...oculusHandConfig.fallbackProfileIds],
        createHostSpace(globalSpace),
        new Gamepad(hostHandGamepadConfig),
        createHostSpace(globalSpace),
        hand
      ),
      state
    );
    this.jointSpaces = jointSpaces;
  }
  onFrameStart(frame) {
    const state = this.state;
    const inputSource = this.inputSource;
    writePose(
      inputSource.targetRaySpace,
      state.targetRay,
      0,
      state.targetRayValid
    );
    if (state.gripValid) {
      writePose(inputSource.gripSpace, state.grip, 0, true);
    } else {
      writePose(inputSource.gripSpace, state.palm, 0, state.palmValid);
    }
    const { joints, jointValid } = state;
    const jointSpaces = this.jointSpaces;
    for (let j = 0; j < HOST_INPUT_JOINTS; j++) {
      const jointSpace = jointSpaces[j];
      const valid = jointValid[j] !== 0;
      const offset = j * HOST_INPUT_JOINT_STRIDE;
      writePose(jointSpace, joints, offset, valid);
      jointSpace[P_JOINT_SPACE].radius = valid ? joints[offset + 7] : 0;
    }
    this.applyButtons();
    this.applyTimestamp(frame);
    this.applyEdges(frame);
  }
};
var HANDEDNESSES = [
  "left" /* Left */,
  "right" /* Right */
];
P_HOST_INPUT;
var XRHostInput = class {
  constructor(device, options = {}) {
    const globalSpace = device[P_DEVICE].globalSpace;
    const leftMenuButton = options.leftMenuButton ?? true;
    this.onHaptic = options.onHaptic ?? null;
    const states = {
      ["left" /* Left */]: new XRHostInputState("left" /* Left */),
      ["right" /* Right */]: new XRHostInputState("right" /* Right */)
    };
    const makeController = (handedness) => {
      let profiles;
      let gamepadConfig2;
      let numHapticActuators = 1;
      const config = options.controllerConfig;
      const emulated = device.controllers[handedness];
      if (config?.layout[handedness]) {
        profiles = [config.profileId, ...config.fallbackProfileIds];
        gamepadConfig2 = config.layout[handedness].gamepad;
        numHapticActuators = config.layout[handedness].numHapticActuators;
      } else if (emulated) {
        profiles = emulated.inputSource.profiles;
        gamepadConfig2 = emulated.gamepadConfig;
        numHapticActuators = emulated.inputSource.gamepad.hapticActuators.length;
      } else {
        profiles = [
          oculusTouchV3.profileId,
          ...oculusTouchV3.fallbackProfileIds
        ];
        gamepadConfig2 = oculusTouchV3.layout[handedness].gamepad;
      }
      return new XRHostController(
        states[handedness],
        globalSpace,
        profiles,
        hostControllerGamepadConfig(
          gamepadConfig2,
          leftMenuButton && handedness === "left" /* Left */
        ),
        numHapticActuators,
        (intensity, durationMs) => this.onHaptic?.(handedness, intensity, durationMs, 0)
      );
    };
    const internal = {
      device,
      states,
      controllers: {
        ["left" /* Left */]: makeController("left" /* Left */),
        ["right" /* Right */]: makeController("right" /* Right */)
      },
      hands: {
        ["left" /* Left */]: new XRHostHand(states.left, globalSpace),
        ["right" /* Right */]: new XRHostHand(states.right, globalSpace)
      },
      listed: [null, null],
      activeInputs: [],
      inputSources: [],
      version: 0,
      seenVersions: /* @__PURE__ */ new WeakMap(),
      session: null,
      handTracking: false,
      sync: (frame) => {
        const session = frame.session;
        let reprime = false;
        if (session !== internal.session) {
          internal.session = session;
          internal.handTracking = session[P_SESSION].enabledFeatures.includes("hand-tracking");
          reprime = true;
        }
        const visible = device[P_DEVICE].visibilityState === "visible";
        let changed = false;
        for (let i = 0; i < HANDEDNESSES.length; i++) {
          const handedness = HANDEDNESSES[i];
          const state = internal.states[handedness];
          const mode = state.mode;
          let next = null;
          if (visible) {
            if (mode === 1 /* Controller */) {
              next = internal.controllers[handedness];
            } else if (mode === 2 /* Hand */ && internal.handTracking && state.jointValid[WRIST_JOINT] !== 0) {
              next = internal.hands[handedness];
            }
          }
          const prev = internal.listed[i];
          if (next !== prev) {
            changed = true;
            if (prev) {
              prev.connected = false;
            }
            if (next) {
              next.connected = true;
              next.primed = false;
            }
            internal.listed[i] = next;
          } else if (reprime && next) {
            next.primed = false;
          }
        }
        if (changed) {
          truncateArray(internal.activeInputs, 0);
          truncateArray(internal.inputSources, 0);
          for (const source of internal.listed) {
            if (source) {
              internal.activeInputs.push(source);
              internal.inputSources.push(source.inputSource);
            }
          }
          internal.version++;
        }
      },
      unchangedFor: (session) => {
        if (internal.seenVersions.get(session) === internal.version) {
          return true;
        }
        internal.seenVersions.set(session, internal.version);
        return false;
      },
      endSession: () => {
        for (let i = 0; i < internal.listed.length; i++) {
          const source = internal.listed[i];
          if (source) {
            source.connected = false;
          }
          internal.listed[i] = null;
        }
        truncateArray(internal.activeInputs, 0);
        truncateArray(internal.inputSources, 0);
        internal.session = null;
        internal.version++;
      }
    };
    this[P_HOST_INPUT] = internal;
  }
  get left() {
    return this[P_HOST_INPUT].states.left;
  }
  get right() {
    return this[P_HOST_INPUT].states.right;
  }
  get(handedness) {
    return this[P_HOST_INPUT].states[handedness];
  }
  /** The controller source for a hand (listed while its mode is Controller). */
  getController(handedness) {
    return this[P_HOST_INPUT].controllers[handedness];
  }
  /** The hand source for a hand (listed while its mode is Hand). */
  getHand(handedness) {
    return this[P_HOST_INPUT].hands[handedness];
  }
  /** The sources listed now, in a stable array rewritten when they change. */
  get activeInputs() {
    return this[P_HOST_INPUT].activeInputs;
  }
};

// src/host/XRHostWebGLBinding.ts
var ARRAY_SIZE_FOR = {
  texture: 1,
  "texture-array": 2
};
function isTextureType(value) {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(ARRAY_SIZE_FOR, value);
}
function assertLive(session) {
  if (session[P_SESSION].ended) {
    throw new DOMException(
      "The XRSession of this XRWebGLBinding has already ended.",
      "InvalidStateError"
    );
  }
}
var _a14;
var XRHostWebGLBinding = class extends (_a14 = XRWebGLBinding, P_WEBGL_BINDING, _a14) {
  constructor(session, context) {
    if (!(session instanceof XRSession)) {
      throw new TypeError(
        "XRWebGLBinding needs an XRSession as its first argument."
      );
    }
    assertLive(session);
    super(session, context);
    this[P_WEBGL_BINDING] = { context, session };
  }
  /** 1: the host already sizes swapchains at the runtime's recommendation. */
  get nativeProjectionScaleFactor() {
    return 1;
  }
  /** False: depth never reaches the host compositor. */
  get usesDepthValues() {
    return false;
  }
  /** The host side of the session, or NotSupportedError for an emulated one. */
  hostSession() {
    const host = this[P_WEBGL_BINDING].session[P_SESSION].host;
    if (host === null || host === void 0) {
      throw new DOMException(
        "createProjectionLayer needs a session driven by an IWER host.",
        "NotSupportedError"
      );
    }
    return host;
  }
  createProjectionLayer(init = {}) {
    const binding = this[P_WEBGL_BINDING];
    assertLive(binding.session);
    const host = this.hostSession();
    const requested = init.textureType ?? "texture";
    if (!isTextureType(requested)) {
      throw new TypeError(
        `XRTextureType '${String(requested)}' is not supported by createProjectionLayer.`
      );
    }
    const swapchain = host.acquireSwapchain({
      context: binding.context,
      arraySize: ARRAY_SIZE_FOR[requested],
      colorFormat: init.colorFormat,
      scale: init.scaleFactor ?? 1
    });
    return new XRProjectionLayer(binding.session, init, swapchain, requested);
  }
  /**
   * One eye's sub-image of `layer`: the right eye gets the second region,
   * any other view the first. The object is the same every frame; its
   * `colorTexture` is the session's single opaque texture, which the host
   * re-points at each frame's swapchain image.
   */
  getViewSubImage(layer, view) {
    if (!(layer instanceof XRProjectionLayer)) {
      throw new TypeError("getViewSubImage expects an XRProjectionLayer.");
    }
    if (!(view instanceof XRView)) {
      throw new TypeError("getViewSubImage expects an XRView.");
    }
    const regions = layer[P_PROJECTION_LAYER].subImages;
    const subImage = regions[view[P_VIEW].eye === "right" /* Right */ ? 1 : 0];
    const host = this[P_WEBGL_BINDING].session[P_SESSION].host;
    subImage.colorTexture = host?.getOpaqueColorTexture() ?? null;
    return subImage;
  }
};

// src/device/XRVisibilityMask.ts
var clamp = (value, min3, max3) => Math.min(max3, Math.max(min3, value));
function calculateVisibilityMaskBounds(fieldOfView, previewFovY, viewportWidth, viewportHeight) {
  if (!Number.isFinite(previewFovY) || previewFovY <= 0 || previewFovY >= Math.PI || !Number.isFinite(viewportWidth) || !Number.isFinite(viewportHeight) || viewportWidth <= 0 || viewportHeight <= 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  const previewTanY = Math.tan(previewFovY / 2);
  const previewTanX = previewTanY * (viewportWidth / viewportHeight);
  const leftNdc = clamp(-Math.tan(fieldOfView.angleLeft) / previewTanX, -1, 1);
  const rightNdc = clamp(Math.tan(fieldOfView.angleRight) / previewTanX, -1, 1);
  const bottomNdc = clamp(
    -Math.tan(fieldOfView.angleDown) / previewTanY,
    -1,
    1
  );
  const topNdc = clamp(Math.tan(fieldOfView.angleUp) / previewTanY, -1, 1);
  const x = (leftNdc + 1) / 2 * viewportWidth;
  const right = (rightNdc + 1) / 2 * viewportWidth;
  const y = (1 - topNdc) / 2 * viewportHeight;
  const bottom = (1 - bottomNdc) / 2 * viewportHeight;
  return {
    x,
    y,
    width: Math.max(0, right - x),
    height: Math.max(0, bottom - y)
  };
}

// src/device/XRDeviceBase.ts
var DEFAULTS = {
  ipd: 0.063,
  fovy: Math.PI / 2,
  headsetPosition: new Vector3(0, 1.6, 0),
  headsetQuaternion: new Quaternion(),
  stereoEnabled: false,
  frameClearEnabled: true,
  shouldDrawEnvironment: null
};
var MAX_REMOTE_FRAME_MS = 100;
var Z_INDEX_SEM_CANVAS = 1;
var Z_INDEX_APP_CANVAS = 2;
var Z_INDEX_DEVUI_CANVAS = 3;
var Z_INDEX_VISIBILITY_MASK = 4;
var Z_INDEX_DEVUI_CONTAINER = 5;
var leftViewOffsetScratch = vec3_exports.create();
var rightViewOffsetScratch = vec3_exports.create();
P_DEVICE;
var XRDeviceBase = class {
  constructor(deviceConfig, deviceOptions = {}, extensions = {}) {
    this.version = VERSION;
    const globalSpace = new GlobalSpace();
    const viewerSpace = new XRReferenceSpace(
      "viewer" /* Viewer */,
      globalSpace
    );
    const viewSpaces = {
      ["left" /* Left */]: new XRSpace(viewerSpace),
      ["right" /* Right */]: new XRSpace(viewerSpace),
      ["none" /* None */]: new XRSpace(viewerSpace)
    };
    const controllerConfig = deviceConfig.controllerConfig;
    const controllers = {};
    if (controllerConfig) {
      Object.values(XRHandedness).forEach((handedness) => {
        if (controllerConfig.layout[handedness]) {
          controllers[handedness] = new XRController(
            controllerConfig,
            handedness,
            globalSpace
          );
        }
      });
    }
    const hands = {
      ["left" /* Left */]: new XRHandInput(
        oculusHandConfig,
        "left" /* Left */,
        globalSpace
      ),
      ["right" /* Right */]: new XRHandInput(
        oculusHandConfig,
        "right" /* Right */,
        globalSpace
      )
    };
    const gaze = supportsGazeTracking(deviceConfig.supportedFeatures) ? new XRGazeInput(viewerSpace) : void 0;
    const host = deviceOptions.host ?? null;
    const canvasContainer = host ? void 0 : deviceOptions.canvasContainer ?? document.createElement("div");
    if (!host) {
      canvasContainer.dataset.webxr_runtime = `Immersive Web Emulation Runtime v${VERSION}`;
      canvasContainer.style.position = "fixed";
      canvasContainer.style.width = "100%";
      canvasContainer.style.height = "100%";
      canvasContainer.style.top = "0";
      canvasContainer.style.left = "0";
      canvasContainer.style.display = "flex";
      canvasContainer.style.justifyContent = "center";
      canvasContainer.style.alignItems = "center";
      canvasContainer.style.overflow = "hidden";
      canvasContainer.style.zIndex = "999";
    }
    const visibilityMask = deviceOptions.visibilityMask === null || host ? void 0 : deviceOptions.visibilityMask ?? deviceConfig.visibilityMask;
    const visibilityMaskCanvas = visibilityMask ? document.createElement("canvas") : void 0;
    if (visibilityMaskCanvas) {
      visibilityMaskCanvas.dataset.webxrVisibilityMask = deviceConfig.name;
      visibilityMaskCanvas.style.position = "absolute";
      visibilityMaskCanvas.style.inset = "0";
      visibilityMaskCanvas.style.width = "100%";
      visibilityMaskCanvas.style.height = "100%";
      visibilityMaskCanvas.style.pointerEvents = "none";
      visibilityMaskCanvas.style.zIndex = Z_INDEX_VISIBILITY_MASK.toString();
    }
    this[P_DEVICE] = {
      name: deviceConfig.name,
      supportedSessionModes: deviceConfig.supportedSessionModes,
      supportedFeatures: deviceConfig.supportedFeatures,
      supportedFrameRates: deviceConfig.supportedFrameRates,
      isSystemKeyboardSupported: deviceConfig.isSystemKeyboardSupported,
      internalNominalFrameRate: deviceConfig.internalNominalFrameRate,
      environmentBlendModes: deviceConfig.environmentBlendModes,
      interactionMode: deviceConfig.interactionMode,
      userAgent: deviceConfig.userAgent,
      position: deviceOptions.headsetPosition ?? DEFAULTS.headsetPosition.clone(),
      quaternion: deviceOptions.headsetQuaternion ?? DEFAULTS.headsetQuaternion.clone(),
      stereoEnabled: deviceOptions.stereoEnabled ?? DEFAULTS.stereoEnabled,
      frameClearEnabled: deviceOptions.frameClearEnabled ?? DEFAULTS.frameClearEnabled,
      shouldDrawEnvironment: deviceOptions.shouldDrawEnvironment ?? DEFAULTS.shouldDrawEnvironment,
      ipd: deviceOptions.ipd ?? DEFAULTS.ipd,
      fovy: deviceOptions.fovy ?? DEFAULTS.fovy,
      visibilityMask,
      visibilityMaskEnabled: Boolean(visibilityMask) && (deviceOptions.visibilityMaskEnabled ?? true),
      visibilityMaskCanvas,
      controllers,
      hands,
      gaze,
      primaryInputMode: "controller",
      hostInput: null,
      pendingReferenceSpaceReset: false,
      visibilityState: "visible",
      pendingVisibilityState: null,
      xrSystem: null,
      installedGlobalObject: null,
      previousNavigatorXRDescriptor: null,
      previousUserAgentDescriptor: null,
      previousGlobals: null,
      previousMakeXRCompatible: null,
      matrix: mat4_exports.create(),
      globalSpace,
      viewerSpace,
      viewSpaces,
      canvasContainer,
      getViewport: (layer, view) => {
        const canvas = layer.context.canvas;
        const { width, height } = canvas;
        const stereoEnabled = this[P_DEVICE].stereoEnabled;
        const eye = view.eye;
        let x;
        let y;
        let vpWidth;
        let vpHeight;
        switch (eye) {
          case "none" /* None */:
            x = 0;
            y = 0;
            vpWidth = width;
            vpHeight = height;
            break;
          case "left" /* Left */:
            x = 0;
            y = 0;
            vpWidth = stereoEnabled ? width / 2 : width;
            vpHeight = height;
            break;
          case "right" /* Right */:
            x = width / 2;
            y = 0;
            vpWidth = stereoEnabled ? width / 2 : 0;
            vpHeight = height;
            break;
        }
        const cached = this[P_DEVICE].viewportCache[eye];
        if (cached && cached.x === x && cached.y === y && cached.width === vpWidth && cached.height === vpHeight) {
          return cached;
        }
        const viewport = new XRViewport(x, y, vpWidth, vpHeight);
        this[P_DEVICE].viewportCache[eye] = viewport;
        return viewport;
      },
      viewportCache: {},
      updateViews: () => {
        const viewerSpace2 = this[P_DEVICE].viewerSpace;
        mat4_exports.fromRotationTranslation(
          viewerSpace2[P_SPACE].offsetMatrix,
          this[P_DEVICE].quaternion.quat,
          this[P_DEVICE].position.vec3
        );
        vec3_exports.set(leftViewOffsetScratch, -this[P_DEVICE].ipd / 2, 0, 0);
        mat4_exports.fromTranslation(
          this[P_DEVICE].viewSpaces["left" /* Left */][P_SPACE].offsetMatrix,
          leftViewOffsetScratch
        );
        vec3_exports.set(rightViewOffsetScratch, this[P_DEVICE].ipd / 2, 0, 0);
        mat4_exports.fromTranslation(
          this[P_DEVICE].viewSpaces["right" /* Right */][P_SPACE].offsetMatrix,
          rightViewOffsetScratch
        );
      },
      onBaseLayerSet: (baseLayer) => {
        if (!baseLayer || this[P_DEVICE].host) return;
        const canvas = baseLayer.context.canvas;
        if (canvas.parentElement !== this[P_DEVICE].canvasContainer) {
          const devui = this[P_DEVICE].devui;
          if (devui) {
            const { devUICanvas, devUIContainer } = devui;
            devUICanvas.style.zIndex = Z_INDEX_DEVUI_CANVAS.toString();
            devUIContainer.style.zIndex = Z_INDEX_DEVUI_CONTAINER.toString();
            this[P_DEVICE].canvasContainer.appendChild(devui.devUICanvas);
            this[P_DEVICE].canvasContainer.appendChild(devui.devUIContainer);
          }
          const sem = this[P_DEVICE].sem;
          if (sem) {
            sem.environmentCanvas.style.zIndex = Z_INDEX_SEM_CANVAS.toString();
            this[P_DEVICE].canvasContainer.appendChild(sem.environmentCanvas);
          }
          this[P_DEVICE].canvasData = {
            canvas,
            parent: canvas.parentElement,
            width: canvas.width,
            height: canvas.height,
            zIndex: canvas.style.zIndex
          };
          canvas.style.zIndex = Z_INDEX_APP_CANVAS.toString();
          this[P_DEVICE].canvasContainer.appendChild(canvas);
          if (this[P_DEVICE].visibilityMaskCanvas) {
            this[P_DEVICE].canvasContainer.appendChild(
              this[P_DEVICE].visibilityMaskCanvas
            );
          }
          document.body.appendChild(this[P_DEVICE].canvasContainer);
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      },
      onSessionEnd: () => {
        this[P_DEVICE].remote?.onSessionEnd();
        this[P_DEVICE].hostInput?.[P_HOST_INPUT].endSession();
        this[P_DEVICE].devui?.onSessionEnd?.();
        for (const input of [
          ...Object.values(this[P_DEVICE].controllers),
          ...Object.values(this[P_DEVICE].hands)
        ]) {
          for (const button of input.inputSource.gamepad?.buttons ?? []) {
            if (button instanceof GamepadButton) {
              resetButton(button);
            }
          }
        }
        if (this[P_DEVICE].canvasData) {
          const { canvas, parent, width, height, zIndex } = this[P_DEVICE].canvasData;
          canvas.width = width;
          canvas.height = height;
          canvas.style.zIndex = zIndex;
          if (parent) {
            parent.appendChild(canvas);
          } else {
            this[P_DEVICE].canvasContainer.removeChild(canvas);
          }
          const devui = this[P_DEVICE].devui;
          if (devui) {
            this[P_DEVICE].canvasContainer.removeChild(devui.devUICanvas);
            this[P_DEVICE].canvasContainer.removeChild(devui.devUIContainer);
          }
          const sem = this[P_DEVICE].sem;
          if (sem) {
            this[P_DEVICE].canvasContainer.removeChild(sem.environmentCanvas);
          }
          const visibilityMaskCanvas2 = this[P_DEVICE].visibilityMaskCanvas;
          if (visibilityMaskCanvas2?.parentElement === this[P_DEVICE].canvasContainer) {
            this[P_DEVICE].canvasContainer.removeChild(visibilityMaskCanvas2);
          }
          document.body.removeChild(this[P_DEVICE].canvasContainer);
          this[P_DEVICE].canvasData = void 0;
          window.dispatchEvent(new Event("resize"));
        }
      },
      onFrameStart: (frame) => {
        const now = performance.now();
        const deltaTimeMs = this[P_DEVICE].lastFrameTime > 0 ? Math.min(now - this[P_DEVICE].lastFrameTime, MAX_REMOTE_FRAME_MS) : 16.67;
        this[P_DEVICE].lastFrameTime = now;
        if (this[P_DEVICE].remote) {
          this[P_DEVICE].remote.update(deltaTimeMs);
        }
        if (this[P_DEVICE].actionPlayer?.playing) {
          this[P_DEVICE].actionPlayer.playFrame();
        } else {
          const session = frame.session;
          if (this[P_DEVICE].pendingVisibilityState) {
            this[P_DEVICE].visibilityState = this[P_DEVICE].pendingVisibilityState;
            this[P_DEVICE].pendingVisibilityState = null;
            session.dispatchEvent(
              new XRSessionEvent("visibilitychange", { session })
            );
          }
          const hostInput = this[P_DEVICE].hostInput;
          hostInput?.[P_HOST_INPUT].sync(frame);
          if (this[P_DEVICE].visibilityState === "visible") {
            if (hostInput) {
              runHostInputFrame(this.activeInputs, frame);
            } else {
              const activeInputs = this.activeInputs;
              for (let i = 0; i < activeInputs.length; i++) {
                activeInputs[i].onFrameStart(frame);
              }
            }
          }
          if (this[P_DEVICE].pendingReferenceSpaceReset) {
            session[P_SESSION].referenceSpaces.forEach((referenceSpace) => {
              switch (referenceSpace[P_REF_SPACE].type) {
                case "local" /* Local */:
                case "local-floor" /* LocalFloor */:
                case "bounded-floor" /* BoundedFloor */:
                case "unbounded" /* Unbounded */:
                  referenceSpace.dispatchEvent(
                    new XRReferenceSpaceEvent("reset", { referenceSpace })
                  );
                  break;
              }
            });
            this[P_DEVICE].pendingReferenceSpaceReset = false;
          }
        }
        this[P_DEVICE].updateViews();
        this.drawVisibilityMask();
      },
      // control mode for programmatic access
      controlMode: "manual",
      controlModeListeners: /* @__PURE__ */ new Set(),
      stateChangeListeners: /* @__PURE__ */ new Set(),
      // remote control interface - initialized after this object
      remote: null,
      extensions,
      runtime: null,
      // frame timing for remote update
      lastFrameTime: 0,
      host,
      onHostFrameStart: (frame) => {
        const state = this[P_DEVICE];
        const remote = state.remote;
        if (remote) {
          const now = performance.now();
          const deltaTimeMs = state.lastFrameTime > 0 ? Math.min(now - state.lastFrameTime, MAX_REMOTE_FRAME_MS) : 16.67;
          state.lastFrameTime = now;
          remote.update(deltaTimeMs);
        }
        const hostInput = state.hostInput;
        if (hostInput) {
          hostInput[P_HOST_INPUT].sync(frame);
        }
        if (state.visibilityState === "visible") {
          if (hostInput) {
            runHostInputFrame(this.activeInputs, frame);
          } else {
            const inputs = this.activeInputs;
            for (let i = 0; i < inputs.length; i++) {
              inputs[i].onFrameStart(frame);
            }
          }
        }
      }
    };
    this[P_DEVICE].runtime = {
      kind: "emulated",
      getSession: () => {
        const session = this.activeSession;
        if (!session) {
          return null;
        }
        const sessionState = session[P_SESSION];
        const structuralSession = session;
        const primaryReferenceSpace = sessionState?.referenceSpaces?.find(
          (space) => space[P_REF_SPACE]?.type !== "viewer" /* Viewer */
        );
        return {
          mode: sessionState?.mode ?? structuralSession.mode ?? "immersive-vr",
          enabledFeatures: structuralSession.enabledFeatures ?? [],
          visibilityState: structuralSession.visibilityState ?? this.visibilityState,
          originOffsetMatrix: primaryReferenceSpace?.[P_SPACE].offsetMatrix ?? null,
          end: () => structuralSession.end?.()
        };
      }
    };
    this[P_DEVICE].remote = extensions.createRemoteControl?.(this) ?? null;
    this[P_DEVICE].updateViews();
    globalThis;
  }
  drawVisibilityMask() {
    const mask = this[P_DEVICE].visibilityMask;
    const maskCanvas = this[P_DEVICE].visibilityMaskCanvas;
    const appCanvas = this[P_DEVICE].canvasData?.canvas;
    if (!this[P_DEVICE].visibilityMaskEnabled || !mask || !maskCanvas || !appCanvas) {
      return;
    }
    const width = appCanvas.width;
    const height = appCanvas.height;
    if (width <= 0 || height <= 0) return;
    if (maskCanvas.width !== width || maskCanvas.height !== height) {
      maskCanvas.width = width;
      maskCanvas.height = height;
    }
    const context = maskCanvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#000";
    const eyes = this[P_DEVICE].stereoEnabled ? ["left", "right"] : ["left"];
    const eyeWidth = width / eyes.length;
    eyes.forEach((eye, index) => {
      const eyeX = index * eyeWidth;
      const bounds = calculateVisibilityMaskBounds(
        mask[eye],
        this[P_DEVICE].fovy,
        eyeWidth,
        height
      );
      context.fillRect(eyeX, 0, eyeWidth, height);
      context.clearRect(eyeX + bounds.x, bounds.y, bounds.width, bounds.height);
    });
  }
  /**
   * Whether a native (non-emulated) WebXR runtime is already present on
   * `navigator.xr`. installRuntime uses this to avoid clobbering a real
   * runtime unless `forceInstall` is set.
   */
  isNativeXRAvailable() {
    const nativeXR = globalThis.navigator?.xr;
    return Boolean(nativeXR) && !(nativeXR instanceof XRSystem);
  }
  installRuntime(options) {
    if (this[P_DEVICE].runtime.kind === "native") {
      throw new DOMException(
        "Cannot install the emulated runtime while a native override is installed.",
        "InvalidStateError"
      );
    }
    const globalObject = options?.globalObject ?? globalThis;
    const polyfillLayers = options?.polyfillLayers;
    if (this.isNativeXRAvailable() && !options?.forceInstall) {
      console.warn(
        "IWER: a native WebXR runtime is already available on navigator.xr; skipping installRuntime. Pass { forceInstall: true } to override."
      );
      return;
    }
    const previousGlobals = /* @__PURE__ */ new Map();
    const previousMakeXRCompatible = /* @__PURE__ */ new Map();
    this[P_DEVICE].installedGlobalObject = globalObject;
    this[P_DEVICE].previousGlobals = previousGlobals;
    this[P_DEVICE].previousMakeXRCompatible = previousMakeXRCompatible;
    const defineMakeXRCompatible = (proto) => {
      if (!proto) return;
      previousMakeXRCompatible.set(proto, {
        existed: "makeXRCompatible" in proto,
        descriptor: Object.getOwnPropertyDescriptor(proto, "makeXRCompatible")
      });
      Object.defineProperty(proto, "makeXRCompatible", {
        value: function() {
          return new Promise((resolve, _reject) => {
            resolve(true);
          });
        },
        configurable: true
      });
    };
    defineMakeXRCompatible(
      globalThis.WebGL2RenderingContext?.prototype
    );
    defineMakeXRCompatible(
      globalThis.WebGLRenderingContext?.prototype
    );
    this[P_DEVICE].xrSystem = new XRSystem(this);
    this[P_DEVICE].previousNavigatorXRDescriptor = Object.getOwnPropertyDescriptor(globalThis.navigator, "xr") ?? null;
    this[P_DEVICE].previousUserAgentDescriptor = Object.getOwnPropertyDescriptor(navigator, "userAgent") ?? null;
    Object.defineProperty(globalThis.navigator, "xr", {
      value: this[P_DEVICE].xrSystem,
      configurable: true
    });
    if (!this[P_DEVICE].host) {
      Object.defineProperty(navigator, "userAgent", {
        value: this[P_DEVICE].userAgent,
        writable: false,
        configurable: true,
        enumerable: true
      });
    }
    const setGlobal = (name, value) => {
      previousGlobals.set(name, {
        existed: name in globalObject,
        value: globalObject[name]
      });
      globalObject[name] = value;
    };
    setGlobal("XRSystem", XRSystem);
    setGlobal("XRSession", XRSession);
    setGlobal("XRRenderState", XRRenderState);
    setGlobal("XRFrame", XRFrame);
    setGlobal("XRSpace", XRSpace);
    setGlobal("XRReferenceSpace", XRReferenceSpace);
    setGlobal("XRJointSpace", XRJointSpace);
    setGlobal("XRView", XRView);
    setGlobal("XRViewport", XRViewport);
    setGlobal("XRRigidTransform", XRRigidTransform);
    setGlobal("XRPose", XRPose);
    setGlobal("XRViewerPose", XRViewerPose);
    setGlobal("XRJointPose", XRJointPose);
    setGlobal("XRInputSource", XRInputSource);
    setGlobal("XRInputSourceArray", XRInputSourceArray);
    setGlobal("XRHand", XRHand);
    setGlobal("XRLayer", XRLayer);
    setGlobal("XRWebGLLayer", XRWebGLLayer);
    setGlobal("XRSessionEvent", XRSessionEvent);
    setGlobal("XRInputSourceEvent", XRInputSourceEvent);
    setGlobal("XRInputSourcesChangeEvent", XRInputSourcesChangeEvent);
    setGlobal("XRReferenceSpaceEvent", XRReferenceSpaceEvent);
    if (this[P_DEVICE].host) {
      setGlobal("XRWebGLBinding", XRHostWebGLBinding);
      setGlobal("XRCompositionLayer", XRCompositionLayer);
      setGlobal("XRProjectionLayer", XRProjectionLayer);
      setGlobal("XRBoundedReferenceSpace", XRBoundedReferenceSpace);
      setGlobal("XRWebGLSubImage", XRWebGLSubImage);
      return;
    }
    if (polyfillLayers) {
      const installPolyfill = this[P_DEVICE].extensions.installLayersPolyfill;
      if (installPolyfill) {
        installPolyfill();
      } else {
        console.warn(
          "IWER: polyfillLayers needs the full iwer entry; this build does not include the layers polyfill."
        );
      }
    } else {
      setGlobal("XRMediaBinding", void 0);
    }
    setGlobal("XRWebGLBinding", XRWebGLBinding);
  }
  /** The host backend in host mode, undefined when emulating. */
  get hostBackend() {
    return this[P_DEVICE].host ?? void 0;
  }
  /**
   * Host mode: runs one XR frame of the active session (see host/types.ts).
   * Call it between xrBeginFrame and xrEndFrame; it returns once the page's
   * animation frame callbacks (and the window's) have run.
   */
  runHostFrame(frame) {
    this.activeSession?.[P_SESSION].host?.runFrame(frame);
  }
  /** Host mode: forwards a runtime event to the active session. */
  dispatchHostEvent(event) {
    this.activeSession?.[P_SESSION].host?.onEvent(event);
  }
  /**
   * Best-effort reversal of installRuntime: restores the previous
   * navigator.xr / navigator.userAgent descriptors, the WebGL makeXRCompatible
   * methods, and the overwritten global constructors. Safe to call even if
   * installRuntime was never invoked (no-op in that case).
   */
  uninstallRuntime() {
    const previousGlobals = this[P_DEVICE].previousGlobals;
    const globalObject = this[P_DEVICE].installedGlobalObject;
    if (previousGlobals && globalObject) {
      previousGlobals.forEach(({ existed, value }, name) => {
        if (existed) {
          globalObject[name] = value;
        } else {
          delete globalObject[name];
        }
      });
    }
    const navXrDescriptor = this[P_DEVICE].previousNavigatorXRDescriptor;
    if (navXrDescriptor) {
      Object.defineProperty(globalThis.navigator, "xr", navXrDescriptor);
    } else if (Object.getOwnPropertyDescriptor(globalThis.navigator, "xr")?.configurable) {
      delete globalThis.navigator.xr;
    }
    const userAgentDescriptor = this[P_DEVICE].previousUserAgentDescriptor;
    if (userAgentDescriptor && Object.getOwnPropertyDescriptor(navigator, "userAgent")?.configurable) {
      Object.defineProperty(navigator, "userAgent", userAgentDescriptor);
    }
    this[P_DEVICE].previousMakeXRCompatible?.forEach(
      ({ existed, descriptor }, proto) => {
        if (existed && descriptor) {
          Object.defineProperty(proto, "makeXRCompatible", descriptor);
        } else {
          delete proto.makeXRCompatible;
        }
      }
    );
    this[P_DEVICE].xrSystem = null;
    this[P_DEVICE].installedGlobalObject = null;
    this[P_DEVICE].previousGlobals = null;
    this[P_DEVICE].previousMakeXRCompatible = null;
    this[P_DEVICE].previousNavigatorXRDescriptor = null;
    this[P_DEVICE].previousUserAgentDescriptor = null;
  }
  installDevUI(devUIConstructor) {
    this[P_DEVICE].devui = new devUIConstructor(this);
  }
  installSEM(semConstructor) {
    this[P_DEVICE].sem = new semConstructor(this);
  }
  get supportedSessionModes() {
    return this[P_DEVICE].supportedSessionModes;
  }
  get supportedFeatures() {
    return this[P_DEVICE].supportedFeatures;
  }
  get supportedFrameRates() {
    return this[P_DEVICE].supportedFrameRates;
  }
  get isSystemKeyboardSupported() {
    return this[P_DEVICE].isSystemKeyboardSupported;
  }
  get internalNominalFrameRate() {
    return this[P_DEVICE].internalNominalFrameRate;
  }
  get stereoEnabled() {
    return this[P_DEVICE].stereoEnabled;
  }
  set stereoEnabled(value) {
    this[P_DEVICE].stereoEnabled = value;
  }
  /**
   * Whether immersive sessions clear the base layer's color, depth and stencil
   * buffers at the start of every frame, as the WebXR opaque framebuffer
   * requires. Defaults to `true`; changes apply from the next frame.
   *
   * Turning it off is for automation hosts that skip drawing on purpose (for
   * example a headless browser that renders on demand under software GL),
   * where clearing a canvas nobody draws to is the dominant per-frame cost.
   * It is safe for apps that clear before they draw, such as three.js with
   * `renderer.autoClear` (the default): every drawn frame starts clean anyway.
   * When a frame is not drawn, the page keeps showing the last drawn image;
   * the drawing buffer itself is not readable later unless the context uses
   * `preserveDrawingBuffer`, so capture at page level or in the same task as
   * the draw. Inline sessions never clear, whatever this is set to. The
   * setting is owned by the host page and is not part of remote-control
   * device state.
   */
  get frameClearEnabled() {
    return this[P_DEVICE].frameClearEnabled;
  }
  set frameClearEnabled(value) {
    this[P_DEVICE].frameClearEnabled = value;
  }
  /**
   * Decides whether the synthetic environment (SEM) is drawn in an
   * immersive-ar frame. Called once per frame, after the app's frame
   * callbacks; returning `false` skips that frame's environment draw. The
   * environment still updates every frame, so scene logic, tracked planes and
   * meshes, hit tests and depth sensing are unaffected. Defaults to `null`,
   * which draws every frame. If the function throws, the environment is drawn.
   *
   * This is the environment's counterpart to {@link frameClearEnabled}, for
   * hosts that render on demand: answer whether the app drew this frame, and
   * the room behind the app's canvas is drawn exactly when the app is, from
   * the same pose. A skipped frame leaves the last drawn room on the page. It
   * only applies to modules that implement `update` and `draw` (`@iwer/sem`
   * does); others render every frame. Like {@link frameClearEnabled}, it is
   * owned by the host page and is not part of remote-control device state.
   */
  get shouldDrawEnvironment() {
    return this[P_DEVICE].shouldDrawEnvironment;
  }
  set shouldDrawEnvironment(value) {
    this[P_DEVICE].shouldDrawEnvironment = value;
  }
  get ipd() {
    return this[P_DEVICE].ipd;
  }
  set ipd(value) {
    this[P_DEVICE].ipd = value;
  }
  get fovy() {
    return this[P_DEVICE].fovy;
  }
  set fovy(value) {
    this[P_DEVICE].fovy = value;
  }
  get visibilityMask() {
    return this[P_DEVICE].visibilityMask;
  }
  /**
   * Whether this device's configured visibility mask is currently displayed.
   * Profiles without a visibility mask always remain disabled.
   */
  get visibilityMaskEnabled() {
    return this[P_DEVICE].visibilityMaskEnabled;
  }
  set visibilityMaskEnabled(value) {
    const enabled = Boolean(this[P_DEVICE].visibilityMask) && value;
    this[P_DEVICE].visibilityMaskEnabled = enabled;
    if (this[P_DEVICE].visibilityMaskCanvas) {
      this[P_DEVICE].visibilityMaskCanvas.style.display = enabled ? "" : "none";
    }
  }
  get position() {
    return this[P_DEVICE].position;
  }
  get quaternion() {
    return this[P_DEVICE].quaternion;
  }
  get viewerSpace() {
    if (this[P_DEVICE].actionPlayer?.playing) {
      return this[P_DEVICE].actionPlayer.viewerSpace;
    } else {
      return this[P_DEVICE].viewerSpace;
    }
  }
  get viewSpaces() {
    if (this[P_DEVICE].actionPlayer?.playing) {
      return this[P_DEVICE].actionPlayer.viewSpaces;
    } else {
      return this[P_DEVICE].viewSpaces;
    }
  }
  get controllers() {
    return this[P_DEVICE].controllers;
  }
  get hands() {
    return this[P_DEVICE].hands;
  }
  get gaze() {
    return this[P_DEVICE].gaze;
  }
  get primaryInputMode() {
    return this[P_DEVICE].primaryInputMode;
  }
  set primaryInputMode(mode) {
    if (mode !== "controller" && mode !== "hand") {
      console.warn('primary input mode can only be "controller" or "hand"');
      return;
    }
    this[P_DEVICE].primaryInputMode = mode;
  }
  /**
   * Drives the input sources from real tracking (see HOST-INPUT.md): the
   * returned object holds one state per hand that the host rewrites every
   * frame. Calling it again returns the same object (a new `onHaptic`
   * replaces the old one).
   */
  enableHostInput(options = {}) {
    let hostInput = this[P_DEVICE].hostInput;
    if (!hostInput) {
      hostInput = new XRHostInput(this, options);
      this[P_DEVICE].hostInput = hostInput;
    } else if (options.onHaptic !== void 0) {
      hostInput.onHaptic = options.onHaptic;
    }
    return hostInput;
  }
  /** Returns the device to its emulated controllers and hands. */
  disableHostInput() {
    const hostInput = this[P_DEVICE].hostInput;
    if (!hostInput) {
      return;
    }
    for (const input of hostInput[P_HOST_INPUT].activeInputs) {
      input.connected = false;
    }
    this[P_DEVICE].hostInput = null;
  }
  get hostInput() {
    return this[P_DEVICE].hostInput;
  }
  get activeInputs() {
    const hostInput = this[P_DEVICE].hostInput;
    if (hostInput) {
      return hostInput[P_HOST_INPUT].activeInputs;
    }
    if (this[P_DEVICE].visibilityState !== "visible") {
      return [];
    }
    const primaryInputs = this[P_DEVICE].primaryInputMode === "controller" ? Object.values(this[P_DEVICE].controllers) : Object.values(this[P_DEVICE].hands);
    const activeInputs = this[P_DEVICE].gaze ? [...primaryInputs, this[P_DEVICE].gaze] : primaryInputs;
    return activeInputs.filter((input) => input.connected);
  }
  get inputSources() {
    const hostInput = this[P_DEVICE].hostInput;
    if (hostInput) {
      return hostInput[P_HOST_INPUT].inputSources;
    }
    if (this[P_DEVICE].actionPlayer?.playing) {
      return this[P_DEVICE].actionPlayer.inputSources;
    } else {
      return this.activeInputs.map((input) => input.inputSource);
    }
  }
  get canvasContainer() {
    return this[P_DEVICE].canvasContainer;
  }
  get canvasDimensions() {
    if (this[P_DEVICE].canvasData) {
      const { width, height } = this[P_DEVICE].canvasData.canvas;
      return { width, height };
    }
    return;
  }
  /**
   * Get the app canvas when an XR session is active.
   * Returns undefined if no session is active or no canvas is available.
   */
  get appCanvas() {
    return this[P_DEVICE].canvasData?.canvas;
  }
  get activeSession() {
    return this[P_DEVICE].xrSystem?.[P_SYSTEM].activeSession;
  }
  get sessionOffered() {
    return Boolean(this[P_DEVICE].xrSystem?.[P_SYSTEM].offeredSessionConfig);
  }
  get name() {
    return this[P_DEVICE].name;
  }
  grantOfferedSession() {
    const xrSystem = this[P_DEVICE].xrSystem;
    const pSystem = xrSystem?.[P_SYSTEM];
    if (pSystem && pSystem.offeredSessionConfig) {
      const { resolve, reject, mode, options } = pSystem.offeredSessionConfig;
      pSystem.offeredSessionConfig = void 0;
      xrSystem.requestSession(mode, options).then(resolve).catch(reject);
    }
  }
  recenter() {
    const deltaVec = new Vector3(-this.position.x, 0, -this.position.z);
    const forward = new Vector3(0, 0, -1).applyQuaternion(this.quaternion);
    forward.y = 0;
    forward.normalize();
    const angle2 = Math.atan2(forward.x, -forward.z);
    const deltaQuat = new Quaternion().setFromAxisAngle(
      new Vector3(0, 1, 0),
      angle2
    );
    this.position.add(deltaVec);
    this.quaternion.multiply(deltaQuat);
    [
      ...Object.values(this[P_DEVICE].controllers),
      ...Object.values(this[P_DEVICE].hands)
    ].forEach((activeInput) => {
      activeInput.position.add(deltaVec);
      activeInput.quaternion.multiply(deltaQuat);
      activeInput.position.applyQuaternion(deltaQuat);
    });
    this[P_DEVICE].pendingReferenceSpaceReset = true;
  }
  get visibilityState() {
    return this[P_DEVICE].visibilityState;
  }
  // visibility state updates are queued until the XRSession produces frames
  updateVisibilityState(state) {
    if (!Object.values(["visible", "visible-blurred", "hidden"]).includes(state)) {
      throw new DOMException(
        "Invalid XRVisibilityState value",
        "NotSupportedError"
      );
    }
    if (state !== this[P_DEVICE].visibilityState) {
      this[P_DEVICE].pendingVisibilityState = state;
    }
  }
  createActionPlayer(refSpace, recording, options = {}) {
    const create7 = this[P_DEVICE].extensions.createActionPlayer;
    if (!create7) {
      throw new DOMException(
        "ActionPlayer is not part of this IWER build; use the full iwer entry.",
        "NotSupportedError"
      );
    }
    const player = create7(refSpace, recording, this[P_DEVICE].ipd, options);
    this[P_DEVICE].actionPlayer = player;
    this[P_DEVICE].runtime.onActionPlayerCreated?.(player);
    return player;
  }
  get devui() {
    return this[P_DEVICE].devui;
  }
  get sem() {
    return this[P_DEVICE].sem;
  }
  /** Remote control; null for devices built without it (the `iwer/host` entry). */
  get remote() {
    return this[P_DEVICE].remote ?? null;
  }
  // =============================================================================
  // Control Mode API
  // =============================================================================
  /**
   * Get the current control mode
   * - 'manual': User controls device via DevUI (default)
   * - 'programmatic': External API controls device
   */
  get controlMode() {
    return this[P_DEVICE].controlMode;
  }
  /**
   * Set the control mode
   * Notifies all registered listeners of the change
   */
  set controlMode(mode) {
    if (mode !== "manual" && mode !== "programmatic") {
      console.warn('control mode can only be "manual" or "programmatic"');
      return;
    }
    const prevMode = this[P_DEVICE].controlMode;
    if (prevMode !== mode) {
      this[P_DEVICE].controlMode = mode;
      this[P_DEVICE].controlModeListeners.forEach((listener) => listener(mode));
    }
  }
  /**
   * Register a listener to be notified when control mode changes
   * @param listener - Callback function that receives the new mode
   * @returns Unsubscribe function to remove the listener
   */
  onControlModeChange(listener) {
    this[P_DEVICE].controlModeListeners.add(listener);
    return () => {
      this[P_DEVICE].controlModeListeners.delete(listener);
    };
  }
  /**
   * Register a listener to be notified when device state changes
   * Called after programmatic state modifications
   * @param listener - Callback function
   * @returns Unsubscribe function to remove the listener
   */
  onStateChange(listener) {
    this[P_DEVICE].stateChangeListeners.add(listener);
    return () => {
      this[P_DEVICE].stateChangeListeners.delete(listener);
    };
  }
  /**
   * Notify all state change listeners that device state has been modified
   * Should be called after programmatic state modifications
   */
  notifyStateChange() {
    this[P_DEVICE].stateChangeListeners.forEach((listener) => listener());
  }
};

// src/action/ActionPlayer.ts
P_ACTION_PLAYER;
var ActionPlayer = class {
  constructor(refSpace, recording, ipd, options = {}) {
    const { schema, frames } = recording;
    if (!frames || !schema || frames.length === 0) {
      throw new DOMException("wrong recording format", "NotSupportedError");
    }
    const viewerSpace = new XRReferenceSpace(
      "viewer" /* Viewer */,
      refSpace
    );
    const viewSpaces = {
      ["left" /* Left */]: new XRSpace(viewerSpace),
      ["right" /* Right */]: new XRSpace(viewerSpace),
      ["none" /* None */]: new XRSpace(viewerSpace)
    };
    this[P_ACTION_PLAYER] = {
      refSpace,
      inputSources: /* @__PURE__ */ new Map(),
      inputSchemas: /* @__PURE__ */ new Map(),
      frames,
      recordedFramePointer: 0,
      startingTimeStamp: frames[0][0],
      endingTimeStamp: frames[frames.length - 1][0],
      playbackTime: frames[0][0],
      playing: false,
      autoAdvance: true,
      manualFrameActive: false,
      viewerSpace,
      viewSpaces,
      vec3: vec3_exports.create(),
      quat: quat_exports.create(),
      f1p: vec3_exports.create(),
      f1q: quat_exports.create(),
      f2p: vec3_exports.create(),
      f2q: quat_exports.create(),
      lastFrameInputs: /* @__PURE__ */ new Map(),
      nextFrameInputs: /* @__PURE__ */ new Map(),
      loop: options.loop ?? false,
      playbackRate: options.playbackRate != null && options.playbackRate > 0 ? options.playbackRate : 1,
      eventContext: options.eventContext,
      lastEventFramePointer: -1,
      startedActions: /* @__PURE__ */ new Map(),
      cancelPending: false
    };
    mat4_exports.fromTranslation(
      this[P_ACTION_PLAYER].viewSpaces["left" /* Left */][P_SPACE].offsetMatrix,
      vec3_exports.fromValues(-ipd / 2, 0, 0)
    );
    mat4_exports.fromTranslation(
      this[P_ACTION_PLAYER].viewSpaces["right" /* Right */][P_SPACE].offsetMatrix,
      vec3_exports.fromValues(ipd / 2, 0, 0)
    );
    schema.forEach((schemaEntry) => {
      const index = schemaEntry[0];
      const schema2 = schemaEntry[1];
      let gamepad;
      if (schema2.hasGamepad) {
        const buttons = [];
        for (let i = 0; i < schema2.numButtons; i++) {
          buttons.push({ id: i.toString(), type: "manual" });
        }
        const axes = [];
        for (let i = 0; i < schema2.numAxes; i++) {
          axes.push({ id: i.toString(), type: "manual" });
        }
        gamepad = new Gamepad({
          mapping: schema2.mapping,
          buttons,
          axes
        });
      }
      const targetRaySpace = new XRSpace(refSpace);
      let hand = void 0;
      if (schema2.hasHand) {
        hand = new XRHand();
        Object.values(XRHandJoint).forEach((jointName) => {
          hand.set(jointName, new XRJointSpace(jointName, targetRaySpace));
        });
      }
      const inputSource = new XRInputSource(
        schema2.handedness,
        schema2.targetRayMode,
        schema2.profiles,
        targetRaySpace,
        gamepad,
        schema2.hasGrip ? new XRSpace(refSpace) : void 0,
        schema2.hasHand ? hand : void 0
      );
      this[P_ACTION_PLAYER].inputSources.set(index, {
        active: false,
        source: inputSource
      });
      this[P_ACTION_PLAYER].inputSchemas.set(index, schema2);
    });
    frames.forEach((frame, frameIndex) => {
      for (let i = 8; i < frame.length; i++) {
        const inputDataRaw = frame[i];
        const index = inputDataRaw[0];
        const schema2 = this[P_ACTION_PLAYER].inputSchemas.get(index);
        if (!schema2) {
          throw new DOMException(
            `recording frame ${frameIndex} references unknown input source ${index}`,
            "NotSupportedError"
          );
        }
        if (schema2.hasGamepad) {
          let dataCounter = 8;
          if (schema2.hasGrip) dataCounter++;
          if (schema2.hasHand) dataCounter++;
          const gamepadData = inputDataRaw[dataCounter];
          const expectedLength = schema2.numButtons + schema2.numAxes;
          if (!Array.isArray(gamepadData) || gamepadData.length !== expectedLength) {
            const actualLength = Array.isArray(gamepadData) ? gamepadData.length : "no";
            throw new DOMException(
              `recording frame ${frameIndex} input source ${index} has ${actualLength} gamepad entries, expected ${expectedLength} (${schema2.numButtons} buttons + ${schema2.numAxes} axes)`,
              "NotSupportedError"
            );
          }
        }
      }
    });
  }
  play() {
    this[P_ACTION_PLAYER].eventContext?.onDiscontinuity?.();
    this[P_ACTION_PLAYER].recordedFramePointer = 0;
    this[P_ACTION_PLAYER].playbackTime = this[P_ACTION_PLAYER].startingTimeStamp;
    this[P_ACTION_PLAYER].playing = true;
    this[P_ACTION_PLAYER].autoAdvance = true;
    this[P_ACTION_PLAYER].manualFrameActive = false;
    this[P_ACTION_PLAYER].actualTimeStamp = performance.now();
    this.markDiscontinuity();
  }
  stop() {
    this.cancelStartedActions();
    this[P_ACTION_PLAYER].playing = false;
    this[P_ACTION_PLAYER].autoAdvance = true;
    this[P_ACTION_PLAYER].manualFrameActive = false;
  }
  get playing() {
    return this[P_ACTION_PLAYER].playing;
  }
  get viewerSpace() {
    return this[P_ACTION_PLAYER].viewerSpace;
  }
  get viewSpaces() {
    return this[P_ACTION_PLAYER].viewSpaces;
  }
  get inputSources() {
    return Array.from(this[P_ACTION_PLAYER].inputSources.values()).filter((wrapper) => wrapper.active).map((wrapper) => wrapper.source);
  }
  get loop() {
    return this[P_ACTION_PLAYER].loop;
  }
  set loop(value) {
    this[P_ACTION_PLAYER].loop = value;
  }
  get playbackRate() {
    return this[P_ACTION_PLAYER].playbackRate;
  }
  set playbackRate(value) {
    if (value > 0) {
      this[P_ACTION_PLAYER].playbackRate = value;
    }
  }
  /**
   * Attach (or clear) the event context used to dispatch select/squeeze events
   * during playback. Passing undefined disables event dispatch.
   */
  setEventContext(context) {
    this[P_ACTION_PLAYER].eventContext = context;
  }
  /**
   * Total length of the recording in milliseconds (last frame timestamp minus
   * first). 0 for a single-frame recording.
   */
  get duration() {
    return this[P_ACTION_PLAYER].endingTimeStamp - this[P_ACTION_PLAYER].startingTimeStamp;
  }
  /**
   * Current playback position in milliseconds, relative to the start of the
   * recording (0 at the first frame).
   */
  get currentTime() {
    return this[P_ACTION_PLAYER].playbackTime - this[P_ACTION_PLAYER].startingTimeStamp;
  }
  /**
   * Jump playback to an absolute position, expressed in milliseconds relative to
   * the start of the recording. The time is clamped to [0, duration]. The frame
   * pointer is resolved with a binary search over the frames (sorted ascending
   * by timestamp at frame[0]), so backward seeks work correctly. Does not render
   * a frame on its own; the next playFrame()/stepFrames() call samples the new
   * position. The wall-clock anchor is reset so a subsequent playFrame() doesn't
   * fast-forward across the jump.
   */
  seek(timeMs) {
    const state = this[P_ACTION_PLAYER];
    const clamped = Math.max(0, Math.min(timeMs, this.duration));
    const absolute = state.startingTimeStamp + clamped;
    const nextFramePointer = this.findFramePointer(absolute);
    if (nextFramePointer !== state.recordedFramePointer) {
      state.eventContext?.onDiscontinuity?.();
      this.markDiscontinuity();
    }
    state.playbackTime = absolute;
    state.recordedFramePointer = nextFramePointer;
    state.actualTimeStamp = performance.now();
  }
  /**
   * Binary search for the index of the last frame whose timestamp is <= the
   * given absolute time. Returns 0 when the time precedes the first frame.
   */
  findFramePointer(absoluteTime) {
    const frames = this[P_ACTION_PLAYER].frames;
    let lo = 0;
    let hi = frames.length - 1;
    let result = 0;
    while (lo <= hi) {
      const mid = lo + hi >> 1;
      if (frames[mid][0] <= absoluteTime) {
        result = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return result;
  }
  /**
   * Advance playback by exactly n recorded frames (default 1), deterministically
   * and independent of wall-clock time, for headless/agent driving. Each step
   * samples the recording at a frame boundary (alpha == 0, no interpolation) and
   * dispatches any select/squeeze edges between consecutive frames. When loop is
   * enabled, stepping past the final frame wraps to the start; otherwise it
   * clamps to the final frame and stops playback. Sets playing to true on entry
   * so the surrounding pose getters report this player's spaces.
   */
  stepFrames(n = 1) {
    const state = this[P_ACTION_PLAYER];
    const frames = state.frames;
    state.playing = true;
    state.autoAdvance = false;
    state.manualFrameActive = true;
    for (let step = 0; step < n; step++) {
      if (state.recordedFramePointer + 1 >= frames.length) {
        if (state.loop) {
          state.eventContext?.onDiscontinuity?.();
          state.recordedFramePointer = 0;
          state.playbackTime = state.startingTimeStamp;
          this.markDiscontinuity();
        } else {
          state.playbackTime = state.endingTimeStamp;
          this.applyFrameAtPointer(0);
          this.cancelStartedActions();
          state.playing = false;
          return;
        }
      } else {
        state.recordedFramePointer++;
        state.playbackTime = frames[state.recordedFramePointer][0];
      }
      this.applyFrameAtPointer(0);
    }
    state.actualTimeStamp = performance.now();
  }
  playFrame() {
    const now = performance.now();
    const delta = (now - this[P_ACTION_PLAYER].actualTimeStamp) * this[P_ACTION_PLAYER].playbackRate;
    this[P_ACTION_PLAYER].actualTimeStamp = now;
    this[P_ACTION_PLAYER].playbackTime += delta;
    const frames = this[P_ACTION_PLAYER].frames;
    let reachedEnd = false;
    if (this[P_ACTION_PLAYER].playbackTime > this[P_ACTION_PLAYER].endingTimeStamp) {
      if (this[P_ACTION_PLAYER].loop) {
        this[P_ACTION_PLAYER].eventContext?.onDiscontinuity?.();
        const overshoot = this[P_ACTION_PLAYER].playbackTime - this[P_ACTION_PLAYER].endingTimeStamp;
        const wrapped = this.duration > 0 ? this[P_ACTION_PLAYER].startingTimeStamp + overshoot % this.duration : this[P_ACTION_PLAYER].startingTimeStamp;
        this[P_ACTION_PLAYER].playbackTime = wrapped;
        this[P_ACTION_PLAYER].recordedFramePointer = this.findFramePointer(wrapped);
        this.markDiscontinuity();
      } else {
        this[P_ACTION_PLAYER].playbackTime = this[P_ACTION_PLAYER].endingTimeStamp;
        reachedEnd = true;
      }
    }
    while (this[P_ACTION_PLAYER].recordedFramePointer + 1 < frames.length && frames[this[P_ACTION_PLAYER].recordedFramePointer + 1][0] < this[P_ACTION_PLAYER].playbackTime) {
      this[P_ACTION_PLAYER].recordedFramePointer++;
    }
    const hasNextFrame = this[P_ACTION_PLAYER].recordedFramePointer + 1 < frames.length;
    const lastFrameData = frames[this[P_ACTION_PLAYER].recordedFramePointer];
    const nextFrameData = hasNextFrame ? frames[this[P_ACTION_PLAYER].recordedFramePointer + 1] : lastFrameData;
    const alpha = hasNextFrame ? (this[P_ACTION_PLAYER].playbackTime - lastFrameData[0]) / (nextFrameData[0] - lastFrameData[0]) : 0;
    this.applyFrameAtPointer(alpha);
    if (reachedEnd) {
      this.stop();
    }
  }
  /**
   * Sample the recording at the current frame pointer, applying poses, hands,
   * gamepad state, and active flags, and dispatch any select/squeeze edges
   * crossed since the previous applied frame. `alpha` is the interpolation
   * factor toward the next frame (0 snaps exactly to the pointer's frame, as the
   * deterministic stepFrames path uses). When there is no next frame the pointer
   * frame is used for both ends.
   */
  applyFrameAtPointer(alpha) {
    const frames = this[P_ACTION_PLAYER].frames;
    const hasNextFrame = this[P_ACTION_PLAYER].recordedFramePointer + 1 < frames.length;
    const lastFrameData = frames[this[P_ACTION_PLAYER].recordedFramePointer];
    const nextFrameData = hasNextFrame ? frames[this[P_ACTION_PLAYER].recordedFramePointer + 1] : lastFrameData;
    this.updateXRSpaceFromMergedFrames(
      this[P_ACTION_PLAYER].viewerSpace,
      lastFrameData.slice(1, 8),
      nextFrameData.slice(1, 8),
      alpha
    );
    const lastFrameInputs = this[P_ACTION_PLAYER].lastFrameInputs;
    lastFrameInputs.clear();
    for (let i = 8; i < lastFrameData.length; i++) {
      const { index, inputData } = this.processRawInputData(
        lastFrameData[i]
      );
      lastFrameInputs.set(index, inputData);
    }
    const nextFrameInputs = this[P_ACTION_PLAYER].nextFrameInputs;
    nextFrameInputs.clear();
    for (let i = 8; i < nextFrameData.length; i++) {
      const { index, inputData } = this.processRawInputData(
        nextFrameData[i]
      );
      nextFrameInputs.set(index, inputData);
    }
    this[P_ACTION_PLAYER].inputSources.forEach((sourceWrapper) => {
      sourceWrapper.active = false;
    });
    nextFrameInputs.forEach((inputData, index) => {
      this[P_ACTION_PLAYER].inputSources.get(index).active = true;
      const inputSource = this[P_ACTION_PLAYER].inputSources.get(index).source;
      const schema = this[P_ACTION_PLAYER].inputSchemas.get(index);
      this.updateInputSource(
        inputSource,
        schema,
        lastFrameInputs.has(index) ? lastFrameInputs.get(index) : inputData,
        inputData,
        alpha
      );
    });
    this.dispatchSelectSqueezeEdges();
  }
  /**
   * Detect rising/falling edges of select/squeeze-triggering buttons between the
   * previously applied frame and the one at the current pointer, then dispatch
   * the corresponding XRInputSourceEvents on the session — mirroring
   * XRTrackedInput.onFrameStart's edge logic (lastValue 0 -> >0 fires
   * <trigger>+<trigger>start; >0 -> 0 fires <trigger>end). All frame boundaries
   * skipped since the last applied frame are scanned so no edge is missed when
   * the pointer advances by more than one frame. No-ops unless an event context
   * is attached and yields a frame. The recording format does not persist
   * per-button eventTrigger, so the xr-standard convention is used: button 0 ->
   * 'select', button 1 -> 'squeeze'.
   */
  dispatchSelectSqueezeEdges() {
    const state = this[P_ACTION_PLAYER];
    const context = state.eventContext;
    const pointer = state.recordedFramePointer;
    if (!context) {
      state.lastEventFramePointer = pointer;
      return;
    }
    const baseline = state.lastEventFramePointer;
    if (state.cancelPending) {
      state.cancelPending = false;
      this.cancelStartedActions();
    }
    if (baseline < 0 || baseline === pointer) {
      state.lastEventFramePointer = pointer;
      return;
    }
    const frame = context.getFrame();
    if (!frame) {
      state.lastEventFramePointer = pointer;
      return;
    }
    const frames = state.frames;
    const step = pointer > baseline ? 1 : -1;
    for (let from = baseline; from !== pointer; from += step) {
      const a = step > 0 ? from : from - 1;
      const b = a + 1;
      this.dispatchEdgesBetweenFrames(frames[a], frames[b], context, frame);
    }
    state.lastEventFramePointer = pointer;
  }
  /**
   * Compare the recorded button values of two adjacent frames and dispatch the
   * select/squeeze edges between them on the given session/frame.
   */
  dispatchEdgesBetweenFrames(fromFrame, toFrame, context, frame) {
    const fromInputs = /* @__PURE__ */ new Map();
    for (let i = 8; i < fromFrame.length; i++) {
      const { index, inputData } = this.processRawInputData(
        fromFrame[i]
      );
      fromInputs.set(index, inputData);
    }
    for (let i = 8; i < toFrame.length; i++) {
      const { index, inputData } = this.processRawInputData(
        toFrame[i]
      );
      const schema = this[P_ACTION_PLAYER].inputSchemas.get(index);
      if (!schema || !schema.hasGamepad || !inputData.buttons) {
        continue;
      }
      const fromData = fromInputs.get(index);
      if (!fromData || !fromData.buttons) {
        continue;
      }
      const inputSource = this[P_ACTION_PLAYER].inputSources.get(index)?.source;
      if (!inputSource) {
        continue;
      }
      inputData.buttons.forEach((states, buttonIndex) => {
        const eventTrigger = this.eventTriggerForButton(schema, buttonIndex);
        if (eventTrigger == null) {
          return;
        }
        const wasPressed = fromData.buttons[buttonIndex]?.[0] === 1;
        const isPressed = states[0] === 1;
        const key = `${index}:${eventTrigger}`;
        const started = this[P_ACTION_PLAYER].startedActions;
        let edge = null;
        if (!wasPressed && isPressed) {
          edge = "press";
          started.set(key, { index, trigger: eventTrigger });
        } else if (wasPressed && !isPressed && started.delete(key)) {
          edge = "release";
        }
        for (const type of edgeEventTypes(edge, eventTrigger)) {
          context.session.dispatchEvent(
            new XRInputSourceEvent(type, { frame, inputSource })
          );
        }
      });
    }
  }
  /** Mark a jump in playback: started actions are cancelled on the next dispatch. */
  markDiscontinuity() {
    const state = this[P_ACTION_PLAYER];
    if (state.startedActions.size > 0) {
      state.cancelPending = true;
    }
    state.lastEventFramePointer = -1;
  }
  /**
   * Ends every started action without completing it (`<trigger>end` alone),
   * or forgets them when there is no frame to deliver on.
   */
  cancelStartedActions() {
    const state = this[P_ACTION_PLAYER];
    const context = state.eventContext;
    const frame = context?.getFrame();
    if (context && frame) {
      for (const { index, trigger } of state.startedActions.values()) {
        const inputSource = state.inputSources.get(index)?.source;
        if (!inputSource) continue;
        for (const type of edgeEventTypes("cancel", trigger)) {
          context.session.dispatchEvent(
            new XRInputSourceEvent(type, { frame, inputSource })
          );
        }
      }
    }
    state.startedActions.clear();
    state.cancelPending = false;
  }
  /**
   * Map a recorded button index to its event trigger: for xr-standard mappings
   * button 0 -> 'select' and button 1 -> 'squeeze' (a hand's button 1 is an
   * empty slot, and its gesture buttons, 4 to 9, have no trigger); for hands
   * recorded before the hand gamepad had a mapping, button 0, the pinch,
   * -> 'select'. Other buttons have no trigger.
   */
  eventTriggerForButton(schema, buttonIndex) {
    if (schema.hasHand && schema.mapping !== "xr-standard" /* XRStandard */) {
      return buttonIndex === 0 ? "select" : null;
    }
    if (schema.mapping !== "xr-standard" /* XRStandard */) {
      return null;
    }
    if (buttonIndex === 0) {
      return "select";
    }
    if (buttonIndex === 1) {
      return "squeeze";
    }
    return null;
  }
  updateInputSource(inputSource, schema, lastInputData, nextInputData, alpha) {
    this.updateXRSpaceFromMergedFrames(
      inputSource.targetRaySpace,
      lastInputData.targetRayTransform,
      nextInputData.targetRayTransform,
      alpha
    );
    if (schema.hasGrip) {
      this.updateXRSpaceFromMergedFrames(
        inputSource.gripSpace,
        lastInputData.gripTransform,
        nextInputData.gripTransform,
        alpha
      );
    }
    if (schema.hasHand) {
      for (let i = 0; i < 25; i++) {
        const lastTransformArray = lastInputData.handTransforms.slice(
          i * 8,
          i * 8 + 7
        );
        const nextTransformArray = nextInputData.handTransforms.slice(
          i * 8,
          i * 8 + 7
        );
        const lastRadius = lastInputData.handTransforms[i * 8 + 7];
        const nextRadius = nextInputData.handTransforms[i * 8 + 7];
        const jointSpace = inputSource.hand.get(
          schema.jointSequence[i]
        );
        this.updateXRSpaceFromMergedFrames(
          jointSpace,
          lastTransformArray,
          nextTransformArray,
          alpha
        );
        jointSpace[P_JOINT_SPACE].radius = (nextRadius - lastRadius) * alpha + lastRadius;
      }
    }
    if (schema.hasGamepad) {
      const gamepad = inputSource.gamepad;
      nextInputData.buttons.forEach((states, index) => {
        const gamepadButton = gamepad.buttons[index];
        gamepadButton[P_GAMEPAD].pressed = lastInputData.buttons[index][0] === 1;
        gamepadButton[P_GAMEPAD].touched = states[1] === 1 ? true : false;
        const lastValue = lastInputData.buttons[index][2];
        const nextValue = states[2];
        gamepadButton[P_GAMEPAD].value = (nextValue - lastValue) * alpha + lastValue;
      });
      nextInputData.axes.forEach((nextValue, index) => {
        const lastValue = lastInputData.axes[index];
        gamepad[P_GAMEPAD].axesMap[index.toString()].x = (nextValue - lastValue) * alpha + lastValue;
      });
    }
  }
  updateXRSpaceFromMergedFrames(space, lastTransform, nextTransform, alpha) {
    const f1p = vec3_exports.set(
      this[P_ACTION_PLAYER].f1p,
      lastTransform[0],
      lastTransform[1],
      lastTransform[2]
    );
    const f1q = quat_exports.set(
      this[P_ACTION_PLAYER].f1q,
      lastTransform[3],
      lastTransform[4],
      lastTransform[5],
      lastTransform[6]
    );
    const f2p = vec3_exports.set(
      this[P_ACTION_PLAYER].f2p,
      nextTransform[0],
      nextTransform[1],
      nextTransform[2]
    );
    const f2q = quat_exports.set(
      this[P_ACTION_PLAYER].f2q,
      nextTransform[3],
      nextTransform[4],
      nextTransform[5],
      nextTransform[6]
    );
    vec3_exports.lerp(this[P_ACTION_PLAYER].vec3, f1p, f2p, alpha);
    quat_exports.slerp(this[P_ACTION_PLAYER].quat, f1q, f2q, alpha);
    mat4_exports.fromRotationTranslation(
      space[P_SPACE].offsetMatrix,
      this[P_ACTION_PLAYER].quat,
      this[P_ACTION_PLAYER].vec3
    );
  }
  processRawInputData(inputDataRaw) {
    const index = inputDataRaw[0];
    const schema = this[P_ACTION_PLAYER].inputSchemas.get(index);
    const targetRayTransform = inputDataRaw.slice(1, 8);
    const inputData = { targetRayTransform };
    let dataCounter = 8;
    if (schema.hasGrip) {
      inputData.gripTransform = inputDataRaw[dataCounter++];
    }
    if (schema.hasHand) {
      inputData.handTransforms = inputDataRaw[dataCounter++];
    }
    if (schema.hasGamepad) {
      const gamepadData = inputDataRaw[dataCounter];
      inputData.buttons = gamepadData.slice(0, schema.numButtons);
      inputData.axes = gamepadData.slice(schema.numButtons);
    }
    return { index, inputData };
  }
};

// src/remote/hand-motion.ts
var EASINGS = ["linear", "minimum-jerk"];
var REACH_SKEW = Math.log(0.5) / Math.log(0.4);
var ease = (easing, t) => {
  let c = Math.min(1, Math.max(0, t));
  if (easing === "reach") c = Math.pow(c, REACH_SKEW);
  const eased = easing === "linear" ? c : c * c * c * (10 + c * (-15 + 6 * c));
  return Math.min(1, Math.max(0, eased));
};
var NAMED_DIRECTIONS = [
  "up",
  "down",
  "forward",
  "back",
  "left",
  "right",
  "toward-head",
  "away-from-head"
];
var UP = vec3_exports.fromValues(0, 1, 0);
var bodyFrameFromHead = (head, headRotation) => {
  const forward = vec3_exports.transformQuat(
    vec3_exports.create(),
    vec3_exports.fromValues(0, 0, -1),
    headRotation
  );
  forward[1] = 0;
  if (vec3_exports.length(forward) < 1e-6) {
    vec3_exports.transformQuat(forward, vec3_exports.fromValues(0, 1, 0), headRotation);
    forward[1] = 0;
  }
  vec3_exports.normalize(forward, forward);
  const right = vec3_exports.cross(vec3_exports.create(), forward, UP);
  return { head: vec3_exports.clone(head), forward, right };
};
var resolveDirection = (value, body, from) => {
  const out = vec3_exports.create();
  if (typeof value !== "string") {
    return vec3_exports.normalize(out, value);
  }
  switch (value) {
    case "up":
      return vec3_exports.set(out, 0, 1, 0);
    case "down":
      return vec3_exports.set(out, 0, -1, 0);
    case "forward":
      return vec3_exports.copy(out, body.forward);
    case "back":
      return vec3_exports.negate(out, body.forward);
    case "right":
      return vec3_exports.copy(out, body.right);
    case "left":
      return vec3_exports.negate(out, body.right);
    case "toward-head":
    case "away-from-head": {
      vec3_exports.subtract(out, body.head, from ?? body.head);
      if (vec3_exports.length(out) < 1e-6) {
        vec3_exports.negate(out, body.forward);
      }
      vec3_exports.normalize(out, out);
      return value === "toward-head" ? out : vec3_exports.negate(out, out);
    }
  }
};
var shoulderPosition = (body, handedness) => {
  const out = vec3_exports.clone(body.head);
  const side = handedness === "left" /* Left */ ? -0.18 : 0.18;
  vec3_exports.scaleAndAdd(out, out, body.right, side);
  out[1] -= 0.25;
  vec3_exports.scaleAndAdd(out, out, body.forward, -0.05);
  return out;
};
var PRONATION = Math.tan(15 * Math.PI / 180);
var autoDirections = (shoulder, target, handedness, body) => {
  const elbow = vec3_exports.clone(shoulder);
  elbow[1] -= 0.25;
  vec3_exports.scaleAndAdd(elbow, elbow, body.forward, 0.12);
  const fingers = vec3_exports.subtract(vec3_exports.create(), target, elbow);
  if (vec3_exports.length(fingers) < 1e-6) {
    vec3_exports.copy(fingers, body.forward);
  }
  vec3_exports.normalize(fingers, fingers);
  const pitch = fingers[1];
  const horizontal = vec3_exports.fromValues(fingers[0], 0, fingers[2]);
  if (vec3_exports.length(horizontal) > 1e-6) {
    vec3_exports.normalize(horizontal, horizontal);
    vec3_exports.lerp(horizontal, horizontal, body.forward, 0.3);
    vec3_exports.normalize(horizontal, horizontal);
    const h = Math.sqrt(Math.max(0, 1 - pitch * pitch));
    vec3_exports.set(fingers, horizontal[0] * h, pitch, horizontal[2] * h);
  }
  const palm = vec3_exports.fromValues(0, -1, 0);
  vec3_exports.scaleAndAdd(palm, palm, fingers, -vec3_exports.dot(palm, fingers));
  if (vec3_exports.length(palm) < 1e-6) {
    vec3_exports.negate(palm, body.forward);
  }
  vec3_exports.normalize(palm, palm);
  const medial = vec3_exports.scale(
    vec3_exports.create(),
    body.right,
    handedness === "left" /* Left */ ? 1 : -1
  );
  vec3_exports.scaleAndAdd(medial, medial, fingers, -vec3_exports.dot(medial, fingers));
  if (vec3_exports.length(medial) > 1e-6) {
    vec3_exports.normalize(medial, medial);
    vec3_exports.scaleAndAdd(palm, palm, medial, PRONATION);
    vec3_exports.normalize(palm, palm);
  }
  return { fingers, palm };
};

// src/remote/channels.ts
var channelKey = (channel) => `${channel.device}:${channel.kind}`;
var ChannelRun = class {
  constructor(engine, channels) {
    this.engine = engine;
    this.elapsed = 0;
    this.stoppedEarly = false;
    this.states = channels.map((channel) => ({
      channel,
      begun: false,
      done: false
    }));
    this.endMs = Math.max(
      0,
      ...channels.map((c) => (c.delayMs ?? 0) + c.durationMs)
    );
  }
  /** Milliseconds this run has advanced. */
  get elapsedMs() {
    return this.elapsed;
  }
  /** True once every channel has finished or been stopped. */
  get done() {
    return this.states.every((state) => state.done);
  }
  /**
   * True when a channel was stopped before it finished (by `stop()`, by the
   * engine, or by a later run taking its slot).
   */
  get interrupted() {
    return this.stoppedEarly;
  }
  /**
   * Advances every channel by `deltaMs`. Returns the time left over once all
   * of them have finished (for whatever runs next), or -1 while any is still
   * running. A channel replaced by a later run stops where it is.
   */
  advance(deltaMs) {
    this.elapsed += deltaMs;
    for (const state of this.states) {
      if (state.done) continue;
      const { channel } = state;
      if (!this.engine.owns(this, channel)) {
        state.done = true;
        this.stoppedEarly = true;
        continue;
      }
      const startMs = channel.delayMs ?? 0;
      if (this.elapsed < startMs) continue;
      if (!state.begun) {
        state.begun = true;
        channel.begin?.();
      }
      const t = channel.durationMs > 0 ? (this.elapsed - startMs) / channel.durationMs : 1;
      channel.apply(t >= 1 ? 1 : ease(channel.easing, t));
      if (t >= 1) {
        state.done = true;
        this.engine.release(this, channel);
      }
    }
    return this.done ? Math.max(0, this.elapsed - this.endMs) : -1;
  }
  /** Stops every channel of this run where it is. */
  stop() {
    for (const state of this.states) {
      if (!state.done) {
        state.done = true;
        this.stoppedEarly = true;
        if (this.engine.owns(this, state.channel)) {
          this.engine.release(this, state.channel);
          state.channel.cancel?.();
        }
      }
    }
  }
};
var ChannelEngine = class {
  constructor() {
    this.owners = /* @__PURE__ */ new Map();
  }
  /** Starts `channels` together; nothing moves until the run advances. */
  run(channels) {
    const run = new ChannelRun(this, channels);
    for (const channel of channels) {
      const key = channelKey(channel);
      const replaced = this.owners.get(key);
      if (replaced && replaced.run !== run) replaced.channel.cancel?.();
      this.owners.set(key, { run, channel });
    }
    return run;
  }
  /** True while any channel (of `device`, when given) is running. */
  isActive(device) {
    if (device === void 0) {
      return this.owners.size > 0;
    }
    for (const key of this.owners.keys()) {
      if (key.startsWith(`${device}:`)) return true;
    }
    return false;
  }
  /** Stops every channel, or every channel of `device`, where it is. */
  stop(device) {
    for (const [key, owner] of [...this.owners]) {
      if (device === void 0 || key.startsWith(`${device}:`)) {
        this.owners.delete(key);
        owner.channel.cancel?.();
      }
    }
  }
  /** @internal Whether `run` still owns `channel`'s slot. */
  owns(run, channel) {
    return this.owners.get(channelKey(channel))?.run === run;
  }
  /** @internal Frees `channel`'s slot if `run` still owns it. */
  release(run, channel) {
    if (this.owns(run, channel)) {
      this.owners.delete(channelKey(channel));
    }
  }
};

// src/remote/microgesture.ts
var MICROGESTURES = [
  "swipe-left",
  "swipe-right",
  "swipe-forward",
  "swipe-backward",
  "tap"
];
var isMicrogesture = (value) => MICROGESTURES.includes(value);
var microgestureButton = (gesture) => 5 + MICROGESTURES.indexOf(gesture);
var MICROGESTURE_POSE = "microgesture";
var MICROGESTURE_READY_S = 0.25;
var readyForMicrogesture = (hand, pinch) => hand.poseId === MICROGESTURE_POSE && Object.keys(hand.fingerPoses).length === 0 && hand.poseTransitionProgress === null && pinch === 0;
var PULSE_S = 0.035;
var TOUCH_S = 0.07;
var SLIDE_S = 0.11;
var TAP_HOLD_S = 0.02;
var RETURN_S = 0.14;
var microgestureSeconds = (gesture) => TOUCH_S + (gesture === "tap" ? TAP_HOLD_S : SLIDE_S) + RETURN_S;
var slideOf = (gesture, handedness) => {
  const right = handedness === "right" /* Right */;
  switch (gesture) {
    case "swipe-left":
      return right ? ["touch", "tip-mid", "tip"] : ["touch", "knuckle-mid", "knuckle"];
    case "swipe-right":
      return right ? ["touch", "knuckle-mid", "knuckle"] : ["touch", "tip-mid", "tip"];
    case "swipe-forward":
      return ["forward-start", "forward-mid", "forward"];
    case "swipe-backward":
      return ["backward-start", "backward-mid", "backward"];
    case "tap":
      return ["touch"];
  }
};
var MicrogesturePlayer = class {
  constructor(hand, gesture) {
    this.hand = hand;
    this.gesture = gesture;
    this.pressed = null;
    this.released = false;
    // The press was written by the latest apply(): the app has not seen it.
    this.pressUnseen = false;
    this.holding = false;
    this.rest = libraryHandPoses[MICROGESTURE_POSE];
    this.slide = slideOf(gesture, hand.inputSource.handedness).map(
      (id) => microgestureThumbPoses[id]
    );
    this.duration = microgestureSeconds(gesture);
    this.slideEnd = this.duration - RETURN_S;
    this.registerAt = this.slideEnd + 0.4 * RETURN_S;
    this.button = microgestureButton(gesture);
  }
  /** Seconds from the start at which the button was pressed, or null. */
  get pressedAt() {
    return this.pressed;
  }
  /**
   * True when finish() kept the button down because it was pressed on the
   * same frame: call finish() again on the next frame.
   */
  get releasePending() {
    return this.holding;
  }
  /** Shows the thumb `elapsed` seconds in. */
  showThumb(elapsed) {
    const { slide } = this;
    const last = slide.length - 1;
    if (elapsed < TOUCH_S) {
      this.hand.thumbMotion = {
        from: this.rest,
        to: slide[0],
        weight: ease("minimum-jerk", elapsed / TOUCH_S)
      };
    } else if (elapsed < this.slideEnd) {
      const u = last > 0 ? ease(
        "minimum-jerk",
        (elapsed - TOUCH_S) / (this.slideEnd - TOUCH_S)
      ) * last : 0;
      const i = Math.max(0, Math.min(last - 1, Math.floor(u)));
      this.hand.thumbMotion = last > 0 ? { from: slide[i], to: slide[i + 1], weight: u - i } : { from: slide[0], to: slide[0], weight: 0 };
    } else {
      this.hand.thumbMotion = {
        from: slide[last],
        to: this.rest,
        weight: ease(
          "minimum-jerk",
          Math.min(1, (elapsed - this.slideEnd) / RETURN_S)
        )
      };
    }
  }
  writeButton(value) {
    this.hand.updateGestureButton(this.gesture, value);
  }
  /**
   * Shows the thumb `elapsed` seconds into the gesture and writes the button.
   * Call once per frame; returns 'press' on the frame the gesture registers.
   */
  apply(elapsed) {
    this.pressUnseen = false;
    this.showThumb(elapsed);
    if (this.pressed === null && elapsed >= this.registerAt) {
      this.pressed = elapsed;
      this.pressUnseen = true;
      this.writeButton(1);
      return "press";
    }
    if (this.pressed !== null && !this.released && elapsed >= this.pressed + PULSE_S) {
      this.released = true;
      this.writeButton(0);
    }
    return null;
  }
  /**
   * Ends the gesture: the thumb back at rest and the button up. A button
   * pressed on this very frame stays down for it (`releasePending`); call
   * finish() again on the next frame to release it.
   */
  finish() {
    this.hand.thumbMotion = null;
    if (this.pressed === null || this.released) {
      this.holding = false;
      return;
    }
    if (this.pressUnseen) {
      this.pressUnseen = false;
      this.holding = true;
      return;
    }
    this.holding = false;
    this.released = true;
    this.writeButton(0);
  }
  /** Stops the gesture now: the thumb at rest, the button up. */
  cancel() {
    this.hand.thumbMotion = null;
    this.holding = false;
    if (this.pressed !== null && !this.released) {
      this.released = true;
      this.writeButton(0);
    }
  }
  /**
   * The gesture as a `thumb` channel of `device`, starting `delayMs` into its
   * run. Its last frame calls finish(); stopping it early cancels.
   */
  channel(device, delayMs = 0) {
    return {
      device,
      kind: "thumb",
      delayMs,
      durationMs: this.duration * 1e3,
      easing: "linear",
      apply: (progress) => {
        this.apply(progress * this.duration);
        if (progress >= 1) this.finish();
      },
      cancel: () => this.cancel()
    };
  }
};

// src/remote/sequence.ts
var REACH = {
  "index-tip": [0.62, 0.72],
  grasp: [0.58, 0.66],
  wrist: [0.48, 0.55]
};
var DEFAULT_REACH = [0.58, 0.68];
var WALK_MARGIN_M = 0.06;
var LEAN_BELOW_Y = 1.1;
var PINCH_CLOSE_S = 0.28;
var PINCH_HOLD_S = 0.06;
var PRESHAPE_PINCH = 0.5;
var GAZE_HEAD_SHARE = 0.7;
var HEAD_LEAD_S = 0.22;
var PRESS_DEFAULTS = { depth: 8e-3, hold: 0.03, retract: 0.06 };
var MAX_PRESS_DEPTH = 0.015;
var TOUCH_M = 0.02;
var MAX_CONTACT_S = 0.35;
var HAND_SWAY_M = 6e-3;
var HEAD_SWAY_RAD = 1.2 * Math.PI / 180;
var HEAD_SWAY_M = 3e-3;
var IDLE_HAND_SWAY_M = 6e-3;
var OTHER_HAND_M = 0.1;
var SEQUENCE_BUDGET_S = 25;
var STEP_KEYS = [
  "label",
  "duration",
  "position",
  "target",
  "offset",
  "approach",
  "depart",
  "press",
  "anchor",
  "orientation",
  "poseId",
  "fingers",
  "pinch",
  "body",
  "microgesture"
];
var SEQUENCE_KEYS = ["device", "steps", "idleHand", "body", "gaze", "dryRun"];
var UP2 = vec3_exports.fromValues(0, 1, 0);
var isNum = (n) => typeof n === "number" && Number.isFinite(n);
var vecOf = (value, what) => {
  if (Array.isArray(value) && value.length === 3 && value.every(isNum)) {
    return vec3_exports.fromValues(value[0], value[1], value[2]);
  }
  const v = value;
  if (v && isNum(v.x) && isNum(v.y) && isNum(v.z)) {
    return vec3_exports.fromValues(v.x, v.y, v.z);
  }
  throw new Error(
    `${what} must be {x, y, z} or [x, y, z] with finite numbers (got ${JSON.stringify(value)}).`
  );
};
var isObject = (value) => !!value && typeof value === "object" && !Array.isArray(value);
var strictKeys = (value, allowed, what) => {
  if (!isObject(value)) {
    throw new Error(`${what} must be an object.`);
  }
  const extra = Object.keys(value).filter((key) => !allowed.includes(key));
  if (extra.length > 0) {
    throw new Error(
      `${what} has unknown key${extra.length > 1 ? "s" : ""} ${extra.map((k) => `'${k}'`).join(", ")}. Allowed: ${allowed.join(", ")}.`
    );
  }
};
var ArcPath = class {
  constructor(start, end, startTangent, endTangent) {
    this.samples = [];
    this.lengths = [];
    const chord = vec3_exports.distance(start, end);
    const handle = (t) => t ? Math.min(
      Math.max(t.distance * 1.25, chord * 0.25),
      chord * 0.6 + t.distance
    ) : 0;
    const p1 = startTangent ? vec3_exports.scaleAndAdd(
      vec3_exports.create(),
      start,
      startTangent.direction,
      handle(startTangent)
    ) : vec3_exports.lerp(vec3_exports.create(), start, end, 1 / 3);
    const p2 = endTangent ? vec3_exports.scaleAndAdd(
      vec3_exports.create(),
      end,
      endTangent.direction,
      handle(endTangent)
    ) : vec3_exports.lerp(vec3_exports.create(), start, end, 2 / 3);
    const n = chord < 1e-5 && !startTangent && !endTangent ? 1 : 96;
    let total = 0;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const u = 1 - t;
      const p = vec3_exports.create();
      vec3_exports.scale(p, start, u * u * u);
      vec3_exports.scaleAndAdd(p, p, p1, 3 * u * u * t);
      vec3_exports.scaleAndAdd(p, p, p2, 3 * u * t * t);
      vec3_exports.scaleAndAdd(p, p, end, t * t * t);
      if (i > 0) total += vec3_exports.distance(this.samples[i - 1], p);
      this.samples.push(p);
      this.lengths.push(total);
    }
    this.length = total;
  }
  /** The point at fraction `s` (0 to 1) of the path's length. */
  at(out, s) {
    if (this.length === 0) {
      return vec3_exports.copy(out, this.samples[0]);
    }
    const d = Math.min(1, Math.max(0, s)) * this.length;
    let lo = 0;
    let hi = this.lengths.length - 1;
    while (hi - lo > 1) {
      const mid = lo + hi >> 1;
      if (this.lengths[mid] <= d) lo = mid;
      else hi = mid;
    }
    const span = this.lengths[hi] - this.lengths[lo];
    const f = span > 0 ? (d - this.lengths[lo]) / span : 0;
    return vec3_exports.lerp(out, this.samples[lo], this.samples[hi], f);
  }
};
var autoMoveSeconds = (pathLength, turnDeg, poseChange) => Math.min(
  1.8,
  Math.max(
    0.45 + 1.1 * pathLength,
    2.1 * pathLength,
    turnDeg > 1 ? 0.3 + turnDeg / 220 : 0,
    poseChange ? 0.4 : 0
  )
);
var walkSeconds = (distance3, turn) => Math.max(
  distance3 > 0.01 ? 0.5 + 0.9 * distance3 : 0,
  Math.abs(turn) > 0.01 ? 0.3 + Math.abs(turn) / Math.PI : 0
);
var angleBetween = (a, b) => 2 * Math.acos(Math.min(1, Math.abs(quat_exports.dot(a, b)))) * 180 / Math.PI;
var lookRotation = (from, to, out) => {
  const d = vec3_exports.sub(vec3_exports.create(), to, from);
  if (vec3_exports.length(d) < 1e-6) return out;
  vec3_exports.normalize(d, d);
  const yaw = Math.atan2(-d[0], -d[2]);
  const pitch = Math.max(
    -60 * Math.PI / 180,
    Math.min(20 * Math.PI / 180, Math.asin(Math.max(-1, Math.min(1, d[1]))))
  );
  const qy2 = quat_exports.setAxisAngle(quat_exports.create(), [0, 1, 0], yaw);
  const qx2 = quat_exports.setAxisAngle(quat_exports.create(), [1, 0, 0], pitch);
  return quat_exports.normalize(out, quat_exports.multiply(out, qy2, qx2));
};
var yawRotation = (angle2, out = quat_exports.create()) => quat_exports.setAxisAngle(out, UP2, angle2);
var where = (index, step) => `Step ${index}${isObject(step) && typeof step.label === "string" ? ` ('${step.label}')` : ""}`;
var timedOf = (value, duration, fallbackEasing) => {
  if (value === void 0) return void 0;
  if (isObject(value) && "value" in value) {
    const v = value;
    const start = Math.min(1, Math.max(0, v.start ?? 0));
    const end = Math.min(1, Math.max(start, v.end ?? 1));
    return {
      value: v.value,
      start: start * duration,
      end: end * duration,
      easing: v.easing ?? fallbackEasing
    };
  }
  return { value, start: 0, end: duration, easing: fallbackEasing };
};
var pinchValueOf = (pinch) => typeof pinch === "number" ? pinch : pinch?.value ?? 0;
var stepClosesPinch = (step) => step.pinch !== void 0 && pinchValueOf(step.pinch) >= 0.9;
var stepOpensPinch = (step) => step.pinch !== void 0 && pinchValueOf(step.pinch) < 0.7;
var stepPlaces = (step) => step.position !== void 0 || step.target !== void 0 || step.offset !== void 0;
var planSequence = (host, params) => {
  strictKeys(params, SEQUENCE_KEYS, "run_sequence");
  if (params.device !== "hand-left" && params.device !== "hand-right") {
    throw new Error(
      `run_sequence drives one hand: device must be 'hand-left' or 'hand-right' (got '${String(params.device)}').`
    );
  }
  if (!Array.isArray(params.steps) || params.steps.length === 0) {
    throw new Error("run_sequence needs a non-empty steps array.");
  }
  for (const [key, allowed] of [
    ["idleHand", ["keep", "rest"]],
    ["body", ["auto", "fixed"]],
    ["gaze", ["follow", "fixed"]]
  ]) {
    const value = params[key];
    if (value !== void 0 && !allowed.includes(value)) {
      throw new Error(`${key} must be one of ${allowed.join(", ")}.`);
    }
  }
  if (params.dryRun !== void 0 && typeof params.dryRun !== "boolean") {
    throw new Error("dryRun must be true or false.");
  }
  const segments = [];
  let anchorSeen = false;
  params.steps.forEach((original, index) => {
    const at = where(index, original);
    strictKeys(original, STEP_KEYS, at);
    let step = original;
    try {
      validateStep(host, params, step);
    } catch (error) {
      throw new Error(`${at}: ${error.message}`);
    }
    if (step.press) {
      if (step.anchor !== void 0 && step.anchor !== "index-tip") {
        throw new Error(`${at}: press is made with anchor 'index-tip'.`);
      }
      step = {
        ...step,
        anchor: "index-tip",
        poseId: step.poseId ?? { value: "point", start: 0, end: 0.5 },
        // A pointing hand tucks its thumb against the curled fingers.
        fingers: step.fingers ?? (step.poseId === void 0 ? { thumb: { poseId: "fist", weight: 0.6 } } : void 0)
      };
    } else if (stepClosesPinch(step) && step.anchor === void 0 && (step.target !== void 0 || step.position !== void 0)) {
      step = { ...step, anchor: "grasp" };
    }
    const places = stepPlaces(step);
    if (step.anchor !== void 0) {
      host.requireAnchor(step.anchor);
      anchorSeen = true;
    }
    if (places && !anchorSeen) {
      throw new Error(
        `${at} places the hand but no anchor has been named yet. Add "anchor" (e.g. "index-tip" to touch, "grasp" to pinch, "wrist" for gestures).`
      );
    }
    const label = step.label ?? `step ${index}`;
    const following = params.steps[index + 1];
    const nextPlaces = following !== void 0 && stepPlaces(following);
    if (step.microgesture !== void 0) {
      segments.push(microgestureSegment(index, label, step.microgesture));
    } else if (step.press) {
      segments.push(...pressSegments(index, label, step, nextPlaces));
    } else {
      const next = params.steps.slice(index + 1).find(stepPlaces);
      const segment = stepSegment(index, label, step, places, next);
      segment.nextPlaces = nextPlaces;
      segments.push(segment);
    }
  });
  return segments;
};
var validatePosition = (value, what) => {
  if (Array.isArray(value)) {
    vecOf(value, what);
    return;
  }
  if (isObject(value) && "relativeTo" in value) {
    strictKeys(value, ["relativeTo", "x", "y", "z"], what);
    if (value.relativeTo !== "head" && value.relativeTo !== "body") {
      throw new Error(`${what}.relativeTo must be 'head' or 'body'.`);
    }
  } else {
    strictKeys(value, ["x", "y", "z", "normal"], what);
  }
  vecOf(value, what);
};
var validateTarget = (host, value, what) => {
  if (isObject(value)) {
    strictKeys(value, ["name", "face"], what);
    if (typeof value.name !== "string") {
      throw new Error(`${what}.name must be a string.`);
    }
    if (value.face !== void 0 && !["front", "back", "top", "bottom", "left", "right"].includes(
      value.face
    )) {
      throw new Error(
        `${what}.face must be front, back, top, bottom, left or right.`
      );
    }
  } else if (typeof value !== "string") {
    throw new Error(`${what} must be a name or { name, face }.`);
  }
  if (!host.resolver()) {
    throw new Error(
      "targets need a target resolver; the page registers one with remote.setTargetResolver(). Use position instead."
    );
  }
};
var validateTimedKeys = (value, what) => {
  if (isObject(value)) {
    strictKeys(value, ["value", "start", "end", "easing"], what);
    for (const key of ["start", "end"]) {
      const f = value[key];
      if (f !== void 0 && !(isNum(f) && f >= 0 && f <= 1)) {
        throw new Error(`${what}.${key} must be a fraction of the step, 0\u20131.`);
      }
    }
    if (value.easing !== void 0 && value.easing !== "linear" && value.easing !== "minimum-jerk") {
      throw new Error(`${what}.easing must be linear or minimum-jerk.`);
    }
  }
};
var validateStep = (host, params, step) => {
  const hand = host.hand(params.device);
  if (step.microgesture !== void 0) {
    if (!isMicrogesture(step.microgesture)) {
      throw new Error(
        `microgesture must be one of ${MICROGESTURES.join(", ")}.`
      );
    }
    const others = Object.keys(step).filter(
      (key) => key !== "label" && key !== "microgesture"
    );
    if (others.length > 0) {
      throw new Error(
        `a microgesture step takes only a label (got ${others.join(", ")}); move or pose the hand in a step before it.`
      );
    }
    if (!hand.poseIds.includes(MICROGESTURE_POSE)) {
      throw new Error(
        `the hand has no '${MICROGESTURE_POSE}' pose to make microgestures from.`
      );
    }
  }
  if (step.duration !== void 0 && step.duration !== "auto" && !(isNum(step.duration) && step.duration >= 0)) {
    throw new Error(`duration must be seconds \u2265 0 or 'auto'.`);
  }
  if (step.label !== void 0 && typeof step.label !== "string") {
    throw new Error("label must be a string.");
  }
  if (step.position !== void 0 && step.target !== void 0) {
    throw new Error("give either position or target, not both.");
  }
  if (step.position !== void 0) {
    validatePosition(step.position, "position");
    const normal = step.position.normal;
    if (normal !== void 0) {
      host.directionToGlobal(normal, "position.normal");
    }
  }
  if (step.target !== void 0) {
    validateTarget(host, step.target, "target");
  }
  if (step.offset !== void 0) {
    if (isObject(step.offset) && "normal" in step.offset) {
      strictKeys(step.offset, ["normal"], "offset");
      if (!isNum(step.offset.normal)) {
        throw new Error("offset.normal must be a number of metres.");
      }
    } else {
      strictKeys(step.offset, ["x", "y", "z"], "offset");
      vecOf(step.offset, "offset");
    }
  }
  for (const key of ["approach", "depart"]) {
    const v = step[key];
    if (v !== void 0) {
      strictKeys(v, ["distance", "normal"], key);
      if (!isNum(v.distance) || v.distance < 0) {
        throw new Error(`${key}.distance must be metres \u2265 0.`);
      }
      if (v.normal !== void 0) {
        host.directionToGlobal(v.normal, `${key}.normal`);
      }
    }
  }
  if (step.press !== void 0) {
    strictKeys(step.press, ["depth", "hold", "retract"], "press");
    const {
      depth = PRESS_DEFAULTS.depth,
      hold = PRESS_DEFAULTS.hold,
      retract = PRESS_DEFAULTS.retract
    } = step.press;
    if (!isNum(depth) || depth < 0 || depth > MAX_PRESS_DEPTH) {
      throw new Error(
        `press.depth must be 0\u2013${MAX_PRESS_DEPTH} m (a finger press travels 5\u201315 mm; deeper passes through thin panels).`
      );
    }
    if (!isNum(hold) || hold < 0 || hold > 0.2) {
      throw new Error("press.hold must be 0\u20130.2 s.");
    }
    if (!isNum(retract) || retract < 0.05) {
      throw new Error(
        "press.retract must be at least 0.05 m (a touch lets go beyond 2 cm)."
      );
    }
    if (step.target === void 0 && step.position === void 0) {
      throw new Error("press needs a target or position to press.");
    }
    if (step.pinch !== void 0) {
      throw new Error("press and pinch can not share a step.");
    }
  }
  if (step.poseId !== void 0) {
    validateTimedKeys(step.poseId, "poseId");
    const poseId = isObject(step.poseId) ? step.poseId.value : step.poseId;
    if (poseId === "pinch") {
      throw new Error(
        `poseId 'pinch' only shapes the hand and never selects; use "pinch": 1 to pinch.`
      );
    }
    host.parsePose(hand, poseId, step.fingers);
  } else if (step.fingers !== void 0) {
    throw new Error("fingers needs a poseId in the same step.");
  }
  if (step.pinch !== void 0) {
    const p = step.pinch;
    if (isObject(p) && "at" in p) {
      strictKeys(p, ["value", "at"], "pinch");
      if (p.at !== "arrival") {
        throw new Error(`pinch.at must be 'arrival'.`);
      }
      if (!stepPlaces(step)) {
        throw new Error(`pinch.at 'arrival' needs a placement to arrive at.`);
      }
    } else {
      validateTimedKeys(p, "pinch");
    }
    const value = isObject(p) ? p.value : p;
    if (!isNum(value) || value < 0 || value > 1) {
      throw new Error("pinch must be 0\u20131 (1 = fingertips together).");
    }
  }
  if (step.body !== void 0) {
    strictKeys(step.body, ["position", "stepTo", "facing"], "body");
    if (step.body.position !== void 0 && step.body.stepTo !== void 0) {
      throw new Error("body takes position or stepTo, not both.");
    }
    if (step.body.position !== void 0) {
      validatePosition(step.body.position, "body.position");
    }
    if (step.body.stepTo !== void 0) {
      validateTarget(host, step.body.stepTo, "body.stepTo");
    }
    if (step.body.facing !== void 0) {
      const facing = host.directionToGlobal(step.body.facing, "body.facing");
      if (Math.hypot(facing[0], facing[2]) < 1e-3) {
        throw new Error("body.facing must not point straight up or down.");
      }
    }
  }
  if (step.orientation !== void 0 && step.orientation !== "auto") {
    host.resolveOrientation(hand, step.orientation, vec3_exports.create());
  }
};
var closestNames = (known, name) => known.map((k) => ({ k, d: editDistance(k.toLowerCase(), name.toLowerCase()) })).sort((a, b) => a.d - b.d).map((x) => x.k);
var editDistance = (a, b) => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [
    i,
    ...Array(b.length).fill(0)
  ]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
};
var resolveTarget = (ctx, target, anchor, intent) => {
  const { host } = ctx;
  const resolver = host.resolver();
  const name = typeof target === "string" ? target : target.name;
  if (!resolver) {
    throw new Error(
      `target '${name}' needs a target resolver (remote.setTargetResolver()).`
    );
  }
  const from = host.globalToOrigin(shoulderOf(ctx));
  const resolved = resolver.resolve(target, {
    device: ctx.params.device,
    anchor,
    intent,
    from: { x: from[0], y: from[1], z: from[2] }
  });
  if (!resolved) {
    const known = closestNames(
      resolver.list?.().map((t) => t.name) ?? [],
      name
    );
    throw new Error(
      `Unknown target '${name}'.${known.length ? ` Known targets: ${known.slice(0, 8).join(", ")}.` : ""}`
    );
  }
  const point = host.originToGlobal(
    vecOf(resolved.position, "resolved position")
  );
  const normal = resolved.normal ? vec3_exports.normalize(
    vec3_exports.create(),
    host.originDirectionToGlobal(vecOf(resolved.normal, "resolved normal"))
  ) : null;
  let graspToBottom;
  if (intent === "grasp" && resolved.box) {
    const min3 = host.originToGlobal(vecOf(resolved.box.min, "box.min"));
    graspToBottom = Math.max(0, point[1] - min3[1]);
  }
  return { point, normal, name, graspToBottom };
};
var positionOf = (ctx, value) => {
  const v = vecOf(value, "position");
  if (isObject(value) && value.relativeTo) {
    const b = ctx.body;
    const head = vec3_exports.add(vec3_exports.create(), ctx.standingHead, ctx.walk);
    if (value.relativeTo === "body") head[1] = 0;
    const point = vec3_exports.scaleAndAdd(vec3_exports.create(), head, b.right, v[0]);
    point[1] += v[1];
    return vec3_exports.scaleAndAdd(point, point, b.forward, -v[2]);
  }
  return ctx.host.originToGlobal(v);
};
var resolvePlacement = (ctx, step, anchor, intent) => {
  const { host } = ctx;
  let point = null;
  let normal = null;
  let name;
  let graspToBottom;
  const placing = intent === "place" && ctx.held !== null;
  if (step.target !== void 0) {
    ({ point, normal, name, graspToBottom } = resolveTarget(
      ctx,
      step.target,
      anchor,
      intent
    ));
  } else if (step.position !== void 0) {
    point = positionOf(ctx, step.position);
    const n = step.position.normal;
    if (n !== void 0) {
      normal = host.directionToGlobal(
        n,
        "position.normal",
        point,
        bodyNow(ctx)
      );
    }
  }
  if (placing && point) {
    const n = normal ?? UP2;
    const clearance = step.offset && "normal" in step.offset ? step.offset.normal : 5e-4;
    point = vec3_exports.scaleAndAdd(
      vec3_exports.create(),
      point,
      n,
      clearance + ctx.held.graspToBottom
    );
    return { point, normal, name };
  }
  if (step.offset !== void 0) {
    const base = point ?? currentTarget(ctx, anchor);
    if ("normal" in step.offset) {
      point = vec3_exports.scaleAndAdd(
        vec3_exports.create(),
        base,
        normal ?? UP2,
        step.offset.normal
      );
    } else {
      point = vec3_exports.add(
        vec3_exports.create(),
        base,
        host.originDirectionToGlobal(vecOf(step.offset, "offset"))
      );
    }
  }
  return point ? { point, normal, name, graspToBottom } : null;
};
var shoulderAt = (ctx, walk, lean) => {
  const b = ctx.body;
  const out = vec3_exports.add(vec3_exports.create(), ctx.standingHead, walk);
  vec3_exports.add(out, out, lean);
  vec3_exports.scaleAndAdd(
    out,
    out,
    b.right,
    ctx.params.device === "hand-left" ? -0.18 : 0.18
  );
  out[1] -= 0.25;
  vec3_exports.scaleAndAdd(out, out, b.forward, -0.05);
  return out;
};
var shoulderOf = (ctx) => shoulderAt(ctx, ctx.walk, ctx.lean);
var bodyNow = (ctx) => {
  const head = vec3_exports.add(vec3_exports.create(), ctx.standingHead, ctx.walk);
  return {
    head: vec3_exports.add(head, head, ctx.lean),
    forward: vec3_exports.clone(ctx.body.forward),
    right: vec3_exports.clone(ctx.body.right)
  };
};
var reachFor = (anchor) => REACH[anchor] ?? DEFAULT_REACH;
var walkToward = (ctx, point, anchor, lean, margin) => {
  const walk = vec3_exports.clone(ctx.walk);
  const [comfortable] = reachFor(anchor);
  const shoulder = shoulderAt(ctx, walk, lean);
  if (vec3_exports.distance(shoulder, point) > comfortable + margin) {
    const horizontal = vec3_exports.fromValues(
      point[0] - shoulder[0],
      0,
      point[2] - shoulder[2]
    );
    const h = vec3_exports.length(horizontal);
    if (h > 1e-6) {
      const dy = point[1] - shoulder[1];
      const neededH = Math.sqrt(
        Math.max(0, comfortable * comfortable - dy * dy)
      );
      vec3_exports.scaleAndAdd(
        walk,
        walk,
        vec3_exports.normalize(horizontal, horizontal),
        Math.max(0, h - neededH)
      );
    }
  }
  return walk;
};
var explicitWalk = (ctx, step, anchor) => {
  const explicit = step.body;
  if (explicit?.position !== void 0) {
    const p = positionOf(ctx, explicit.position);
    return vec3_exports.fromValues(
      p[0] - ctx.standingHead[0],
      0,
      p[2] - ctx.standingHead[2]
    );
  }
  if (explicit?.stepTo !== void 0) {
    const { point } = resolveTarget(ctx, explicit.stepTo, anchor, "touch");
    return walkToward(ctx, point, anchor, ctx.lean, 0);
  }
  return null;
};
var autoBody = (ctx, point, anchor, walked) => {
  if (!point || ctx.params.body === "fixed") {
    return { walk: vec3_exports.clone(ctx.walk), lean: vec3_exports.clone(ctx.lean) };
  }
  const lean = vec3_exports.create();
  const standingShoulder = shoulderAt(ctx, ctx.walk, lean);
  const ahead = (point[0] - standingShoulder[0]) * ctx.body.forward[0] + (point[2] - standingShoulder[2]) * ctx.body.forward[2];
  if (point[1] < LEAN_BELOW_Y && ahead > 0.25) {
    const amount = Math.min(0.1, (LEAN_BELOW_Y - point[1]) * 0.4);
    lean[1] = -amount;
    vec3_exports.scaleAndAdd(lean, lean, ctx.body.forward, amount * 0.6);
  }
  const walk = walked ? vec3_exports.clone(ctx.walk) : walkToward(ctx, point, anchor, lean, WALK_MARGIN_M);
  return { walk, lean };
};
var carry = (move, p, f, out = vec3_exports.create()) => {
  vec3_exports.sub(out, p, move.pivot);
  vec3_exports.transformQuat(out, out, yawRotation(move.turn * f));
  vec3_exports.add(out, out, move.pivot);
  return vec3_exports.scaleAndAdd(out, out, move.shift, f);
};
var reverseOf = (move) => ({
  ...move,
  shift: vec3_exports.negate(vec3_exports.create(), move.shift),
  turn: -move.turn,
  pivot: vec3_exports.add(vec3_exports.create(), move.pivot, move.shift)
});
var carryRotation = (move, q, f, out = quat_exports.create()) => quat_exports.multiply(out, yawRotation(move.turn * f), q);
var handProbe = (ctx, anchor) => {
  const { hand } = ctx;
  const joints = hand.inputSource.hand;
  const toWrist = mat4_exports.create();
  mat4_exports.invert(toWrist, joints.get("wrist" /* Wrist */)[P_SPACE].offsetMatrix);
  const anchorLocal = vec3_exports.transformMat4(
    vec3_exports.create(),
    hand.anchorOffset(anchor, vec3_exports.create(), ctx.graspPinch),
    toWrist
  );
  const points = [
    "wrist" /* Wrist */,
    "thumb-tip" /* ThumbTip */,
    "index-finger-tip" /* IndexFingerTip */,
    "middle-finger-tip" /* MiddleFingerTip */,
    "ring-finger-tip" /* RingFingerTip */,
    "pinky-finger-tip" /* PinkyFingerTip */,
    "index-finger-phalanx-proximal" /* IndexFingerPhalanxProximal */,
    "pinky-finger-phalanx-proximal" /* PinkyFingerPhalanxProximal */
  ].map(
    (joint) => vec3_exports.transformMat4(
      vec3_exports.create(),
      mat4_exports.getTranslation(
        vec3_exports.create(),
        joints.get(joint)[P_SPACE].offsetMatrix
      ),
      toWrist
    )
  );
  points.push(vec3_exports.fromValues(0, 0, -0.17));
  return points.map((point) => vec3_exports.sub(point, point, anchorLocal));
};
var HAND_SKIN_M = 0.012;
var obstaclesOnPath = (ctx, path, ignore, probe, wristFrom, wristTo) => {
  const list = ctx.host.resolver()?.list?.() ?? [];
  const hits = [];
  const anchor = vec3_exports.create();
  const point = vec3_exports.create();
  const rotation = quat_exports.create();
  for (const box of list) {
    if (!box.size || box.name === ignore || box.name === ctx.held?.name) {
      continue;
    }
    const center = ctx.host.originToGlobal(
      vecOf(box.position, "list position")
    );
    const half = vecOf(box.size, "list size");
    vec3_exports.scale(half, half, 0.5);
    const top = center[1] + half[1];
    const near = (q, margin) => Math.abs(q[0] - center[0]) < half[0] + margin && Math.abs(q[1] - center[1]) < half[1] + margin && Math.abs(q[2] - center[2]) < half[2] + margin;
    const restsOn = near(path.at(anchor, 0), 0.06) || near(path.at(anchor, 1), 0.06);
    let depth = 0;
    for (let i = 2; i <= 18; i++) {
      const f = i / 20;
      path.at(anchor, f);
      quat_exports.slerp(rotation, wristFrom, wristTo, f);
      for (const offset of probe) {
        vec3_exports.transformQuat(point, offset, rotation);
        vec3_exports.add(point, point, anchor);
        const m = HAND_SKIN_M;
        if (Math.abs(point[0] - center[0]) < half[0] + m && Math.abs(point[2] - center[2]) < half[2] + m && point[1] > center[1] - half[1] - m && point[1] < top + (restsOn ? 0 : m)) {
          depth = Math.max(depth, top + m - point[1]);
        }
      }
    }
    if (depth > 0) hits.push({ name: box.name, top, depth });
  }
  return hits;
};
var stepSegment = (index, label, step, places, next) => {
  const segment = {
    step: index,
    label,
    kind: places ? "move" : "hold",
    duration: isNum(step.duration) ? step.duration : places ? 0.8 : 0.3,
    stallAfter: true,
    prepare: (ctx) => prepareMove(ctx, segment, step, places)
  };
  if (!places && next) {
    segment.lookAhead = (ctx) => {
      try {
        const anchor = next.press ? "index-tip" : next.anchor ?? ctx.anchor;
        return resolvePlacement(ctx, next, anchor, next.press ? "press" : "touch")?.point ?? null;
      } catch {
        return null;
      }
    };
  }
  return segment;
};
var microgestureSegment = (index, label, gesture) => {
  const segment = {
    step: index,
    label,
    kind: "microgesture",
    duration: MICROGESTURE_READY_S + microgestureSeconds(gesture),
    stallAfter: true,
    prepare: (ctx) => {
      const { hand, host, planned } = ctx;
      const pinching = "the hand is pinching (select is pressed); open the pinch (pinch: 0) in a step before the microgesture.";
      if (planned) {
        if (planned.pinch >= 0.9) {
          ctx.warnings.push(
            `${where(segment.step, ctx.params.steps[segment.step])}: ${pinching}`
          );
        }
      } else if (hand.inputSource.gamepad.buttons[0].pressed) {
        throw new Error(pinching);
      }
      prepareMove(ctx, segment, { duration: 0 }, false);
      const pinch = planned?.pinch ?? host.latestPinch(ctx.params.device);
      const ready = planned ? planned.poseId === MICROGESTURE_POSE && !planned.blended && pinch === 0 : readyForMicrogesture(hand, pinch);
      const lead = ready ? 0 : MICROGESTURE_READY_S;
      if (lead > 0) {
        segment.pose = {
          value: host.parsePose(hand, MICROGESTURE_POSE, void 0),
          start: 0,
          end: lead,
          easing: "minimum-jerk"
        };
        if (pinch > 0) {
          segment.pinch = {
            value: 0,
            start: 0,
            end: lead,
            easing: "minimum-jerk",
            from: pinch
          };
        }
      }
      const player = new MicrogesturePlayer(hand, gesture);
      segment.micro = { player, start: lead };
      segment.duration = lead + player.duration;
    }
  };
  return segment;
};
var touchSeconds = (path, easing, seconds, point, normal, fromEnd) => {
  const p = vec3_exports.create();
  const n = 200;
  for (let i = 0; i <= n; i++) {
    const t = fromEnd ? 1 - i / n : i / n;
    path.at(p, ease(easing, t));
    vec3_exports.sub(p, p, point);
    if (vec3_exports.dot(p, normal) > TOUCH_M) {
      return i / n * seconds;
    }
  }
  return seconds;
};
var pressSegments = (index, label, step, followedByPlacement) => {
  const press = { ...PRESS_DEFAULTS, ...step.press };
  const shared = {};
  const reach = {
    step: index,
    label,
    kind: "press",
    duration: 0.8,
    stallAfter: false,
    prepare: (ctx) => {
      ctx.anchor = "index-tip";
      const placement = resolvePlacement(ctx, step, "index-tip", "press");
      if (!placement) throw new Error("press needs a target or position.");
      if (!placement.normal) {
        throw new Error(
          "press needs the surface normal: use a target (the resolver gives it) or position with a normal."
        );
      }
      vec3_exports.add(
        placement.point,
        placement.point,
        aimJitter(index, 2e-3, placement.normal)
      );
      shared.point = placement.point;
      shared.normal = placement.normal;
      const tipRadius = ctx.hand.inputSource.hand.get("index-finger-tip" /* IndexFingerTip */)[P_JOINT_SPACE].radius || 7e-3;
      const depth = vec3_exports.scaleAndAdd(
        vec3_exports.create(),
        placement.point,
        placement.normal,
        tipRadius - press.depth
      );
      prepareMove(
        ctx,
        reach,
        {
          ...step,
          target: void 0,
          position: void 0,
          offset: void 0,
          press: void 0,
          orientation: step.orientation ?? pressDirections(ctx, depth, placement.normal)
        },
        true,
        {
          point: depth,
          normal: placement.normal,
          approachDistance: press.retract + press.depth,
          name: typeof step.target === "string" ? step.target : step.target?.name,
          intent: "press"
        }
      );
      reach.press = { point: placement.point, normal: placement.normal };
      const budget = MAX_CONTACT_S - press.hold - (followedByPlacement ? DEPART_EXIT_S : RETRACT_EXIT_S);
      const moveS = reach.pathEnd - reach.pathStart;
      const tail = (easing, seconds) => touchSeconds(
        reach.path,
        easing,
        seconds,
        placement.point,
        placement.normal,
        true
      );
      if (tail("reach", moveS) > budget) {
        reach.pathEasing = "minimum-jerk";
        const slow = tail("minimum-jerk", moveS);
        if (slow > budget) {
          const quicker = moveS * Math.max(0.5, budget / slow);
          reach.pathEnd = reach.pathStart + quicker;
          if (reach.pose) {
            reach.pose.end = Math.min(
              reach.pose.end,
              reach.pathStart + quicker * 0.6
            );
            reach.pose.start = Math.min(reach.pose.start, reach.pose.end);
          }
          reach.duration = Math.max(
            reach.pathEnd,
            reach.walk ? reach.walk.start + reach.walk.seconds : 0
          );
        }
      }
      shared.contact = tail(
        reach.pathEasing,
        reach.pathEnd - reach.pathStart
      );
    }
  };
  const hold = {
    step: index,
    label,
    kind: "press-hold",
    duration: press.hold,
    stallAfter: !followedByPlacement,
    prepare: (ctx) => {
      hold.press = { point: shared.point, normal: shared.normal };
      const exit = followedByPlacement ? DEPART_EXIT_S : RETRACT_EXIT_S;
      hold.duration = Math.max(
        0,
        Math.min(press.hold, MAX_CONTACT_S - shared.contact - exit)
      );
      holdStill(ctx, hold);
      if (followedByPlacement) {
        ctx.autoDepart = {
          normal: vec3_exports.clone(shared.normal),
          distance: press.retract + press.depth + 0.04,
          fromPress: true
        };
        ctx.lastNormal = vec3_exports.clone(shared.normal);
      }
    }
  };
  if (followedByPlacement) {
    return [reach, hold];
  }
  const retract = {
    step: index,
    label,
    kind: "retract",
    duration: RETRACT_S,
    stallAfter: true,
    prepare: (ctx) => {
      const end = vec3_exports.scaleAndAdd(
        vec3_exports.create(),
        shared.point,
        shared.normal,
        press.retract
      );
      straightMove(ctx, retract, end, RETRACT_S);
      retract.press = { point: shared.point, normal: shared.normal };
      ctx.autoDepart = { normal: vec3_exports.clone(shared.normal), distance: 0.04 };
      ctx.lastNormal = vec3_exports.clone(shared.normal);
    }
  };
  return [reach, hold, retract];
};
var RETRACT_S = 0.25;
var RETRACT_EXIT_S = 0.1;
var DEPART_EXIT_S = 0.12;
var aimJitter = (step, radius, normal) => {
  const a = Math.sin(step * 12.9898 + 78.233) * 43758.5453;
  const b = Math.sin(step * 39.3468 + 11.135) * 24634.6345;
  const u = a - Math.floor(a);
  const v = b - Math.floor(b);
  const helper = Math.abs(normal[1]) < 0.9 ? vec3_exports.fromValues(0, 1, 0) : vec3_exports.fromValues(1, 0, 0);
  const t1 = vec3_exports.normalize(
    vec3_exports.create(),
    vec3_exports.cross(vec3_exports.create(), normal, helper)
  );
  const t2 = vec3_exports.cross(vec3_exports.create(), normal, t1);
  const angle2 = u * 2 * Math.PI;
  const r = radius * Math.sqrt(v);
  const out = vec3_exports.scale(vec3_exports.create(), t1, Math.cos(angle2) * r);
  return vec3_exports.scaleAndAdd(out, out, t2, Math.sin(angle2) * r);
};
var pressDirections = (ctx, target, normal) => {
  const elbow = shoulderOf(ctx);
  elbow[1] -= 0.25;
  vec3_exports.scaleAndAdd(elbow, elbow, ctx.body.forward, 0.12);
  const along = vec3_exports.normalize(
    vec3_exports.create(),
    vec3_exports.sub(vec3_exports.create(), target, elbow)
  );
  const fingers = vec3_exports.normalize(
    vec3_exports.create(),
    vec3_exports.scaleAndAdd(vec3_exports.create(), along, normal, -0.45)
  );
  const palm = vec3_exports.negate(vec3_exports.create(), normal);
  const toOrigin = (v) => {
    const o = ctx.host.globalDirectionToOrigin(v);
    return [o[0], o[1], o[2]];
  };
  return { fingers: toOrigin(fingers), palm: toOrigin(palm) };
};
var currentTarget = (ctx, anchor) => {
  const pin = ctx.hand.pin;
  return pin && pin.anchor === anchor && (anchor !== "grasp" || (pin.graspPinch ?? 1) === ctx.graspPinch) ? vec3_exports.clone(pin.target) : ctx.host.anchorPosition(ctx.hand, anchor, ctx.graspPinch);
};
var holdStill = (ctx, segment) => {
  const here = currentTarget(ctx, ctx.anchor);
  segment.path = new ArcPath(here, here);
  segment.pathStart = 0;
  segment.pathEnd = segment.duration;
  segment.target = here;
  segment.wristFrom = ctx.hand.wristRotation();
  segment.wristTo = ctx.hand.pin?.wristRotation ? quat_exports.clone(ctx.hand.pin.wristRotation) : segment.wristFrom;
};
var straightMove = (ctx, segment, end, seconds) => {
  const start = currentTarget(ctx, ctx.anchor);
  segment.path = new ArcPath(start, end);
  segment.pathEasing = "minimum-jerk";
  segment.duration = seconds;
  segment.pathStart = 0;
  segment.pathEnd = seconds;
  segment.target = end;
  segment.wristFrom = ctx.hand.wristRotation();
  segment.wristTo = ctx.hand.pin?.wristRotation ? quat_exports.clone(ctx.hand.pin.wristRotation) : segment.wristFrom;
};
var PINCH_CURL = {
  middle: 0.35,
  ring: 0.45,
  pinky: 0.55
};
var pinchCurlFingers = () => {
  const out = {};
  for (const [finger, weight] of Object.entries(PINCH_CURL)) {
    out[finger] = { poseId: "fist", weight };
  }
  return out;
};
var checkOtherHand = (ctx, segment, point) => {
  if (ctx.restsOtherHand) return;
  const other = ctx.host.otherHand(ctx.params.device);
  if (!other) return;
  const near = ["wrist", "grasp", "index-tip", "thumb-tip"].some(
    (anchor) => vec3_exports.distance(ctx.host.anchorPosition(other, anchor), point) < OTHER_HAND_M
  );
  if (near) {
    ctx.warnings.push(
      `${where(segment.step, ctx.params.steps[segment.step])}: the other hand is within 10 cm of where this hand goes and may touch it first; rest it (idleHand: 'rest') or move it away.`
    );
  }
};
var prepareMove = (ctx, segment, step, places, override) => {
  const { host, hand } = ctx;
  if (step.anchor !== void 0) ctx.anchor = host.requireAnchor(step.anchor);
  const anchor = ctx.anchor;
  const closes = stepClosesPinch(step);
  if (closes) {
    ctx.graspPinch = pinchValueOf(step.pinch);
  }
  const pinchNow = host.latestPinch(ctx.params.device);
  const pinchedNow = pinchNow >= 0.5;
  const releases = stepOpensPinch(step) && pinchedNow;
  const start = currentTarget(ctx, anchor);
  let end = start;
  let normal = null;
  let targetName = override?.name;
  let startTangent;
  let endTangent;
  let leavingPress = false;
  const pivot = vec3_exports.add(vec3_exports.create(), ctx.standingHead, ctx.walk);
  const walkFrom = vec3_exports.clone(ctx.walk);
  const leanFrom = vec3_exports.clone(ctx.lean);
  let turn = 0;
  if (step.body?.facing !== void 0) {
    const facing = host.directionToGlobal(
      step.body.facing,
      "body.facing",
      void 0,
      bodyNow(ctx)
    );
    turn = Math.atan2(-facing[0], -facing[2]) - Math.atan2(-ctx.body.forward[0], -ctx.body.forward[2]);
    turn = Math.atan2(Math.sin(turn), Math.cos(turn));
    const q = yawRotation(turn);
    vec3_exports.transformQuat(ctx.body.forward, ctx.body.forward, q);
    vec3_exports.transformQuat(ctx.body.right, ctx.body.right, q);
  }
  const walked = explicitWalk(ctx, step, anchor);
  if (walked) ctx.walk = walked;
  let placement = null;
  if (places) {
    const intent = override?.intent ?? (closes ? "grasp" : ctx.held && pinchedNow ? "place" : "touch");
    placement = override ?? resolvePlacement(ctx, step, anchor, intent);
  }
  const body = autoBody(ctx, placement?.point ?? null, anchor, !!walked);
  ctx.walk = body.walk;
  ctx.lean = body.lean;
  const walkShift = vec3_exports.sub(vec3_exports.create(), ctx.walk, walkFrom);
  const leanShift = vec3_exports.sub(vec3_exports.create(), ctx.lean, leanFrom);
  const walkS = walkSeconds(vec3_exports.length(walkShift), turn);
  if (walkS > 0) {
    segment.walk = {
      shift: walkShift,
      turn,
      pivot,
      start: 0,
      seconds: walkS,
      carriesHand: !places
    };
  }
  const walkFirst = segment.walk?.carriesHand ? walkS : 0;
  if (vec3_exports.length(leanShift) > 1e-4) segment.lean = leanShift;
  const carried = segment.walk?.carriesHand ? carry(segment.walk, start, 1) : start;
  end = carried;
  if (placement) {
    end = placement.point;
    normal = placement.normal;
    targetName = placement.name ?? targetName;
    if (closes && !override) {
      vec3_exports.add(end, end, aimJitter(segment.step, 15e-4, normal ?? UP2));
    }
    if (closes && targetName) {
      ctx.held = {
        name: targetName,
        graspToBottom: placement.graspToBottom ?? 0
      };
    }
    const depart = step.depart !== void 0 ? {
      distance: step.depart.distance,
      direction: step.depart.normal !== void 0 ? host.directionToGlobal(
        step.depart.normal,
        "depart.normal",
        start,
        bodyNow(ctx)
      ) : pinchedNow || !ctx.lastNormal ? vec3_exports.clone(UP2) : ctx.lastNormal
    } : ctx.autoDepart ? {
      distance: ctx.autoDepart.distance,
      direction: ctx.autoDepart.normal
    } : void 0;
    leavingPress = step.depart === void 0 && (ctx.autoDepart?.fromPress === true || ctx.autoDepart?.fromRelease === true);
    ctx.autoDepart = null;
    if (depart && depart.distance > 0) startTangent = depart;
    const approachDistance = step.approach?.distance ?? override?.approachDistance ?? 0;
    if (approachDistance > 0) {
      endTangent = {
        distance: approachDistance,
        direction: step.approach?.normal !== void 0 ? host.directionToGlobal(
          step.approach.normal,
          "approach.normal",
          end,
          bodyNow(ctx)
        ) : pinchedNow ? vec3_exports.clone(UP2) : normal ?? vec3_exports.normalize(
          vec3_exports.create(),
          vec3_exports.sub(vec3_exports.create(), shoulderOf(ctx), end)
        )
      };
    }
    ctx.lastNormal = normal;
    const [, max3] = reachFor(anchor);
    const reachDistance = vec3_exports.distance(shoulderOf(ctx), end);
    if (reachDistance > max3 + 1e-3) {
      const message = `${where(segment.step, ctx.params.steps[segment.step])}: the ${anchor} target is ${reachDistance.toFixed(2)} m from the shoulder (max ${max3} m).`;
      if (ctx.params.body === "fixed") {
        throw new Error(
          `${message} Use body: 'auto', or move the body with body.stepTo.`
        );
      }
      ctx.warnings.push(message);
    }
    checkOtherHand(ctx, segment, end);
  } else if (releases) {
    if (!segment.nextPlaces) {
      end = vec3_exports.scaleAndAdd(vec3_exports.create(), carried, UP2, 0.035);
    }
    ctx.autoDepart = {
      normal: vec3_exports.clone(UP2),
      distance: 0.03,
      fromRelease: true
    };
  }
  let path = new ArcPath(carried, end, startTangent, endTangent);
  const wristNow = hand.wristRotation();
  const pinnedWrist = hand.pin?.wristRotation ? quat_exports.clone(hand.pin.wristRotation) : null;
  const wristFrom = segment.walk?.carriesHand ? carryRotation(segment.walk, wristNow, 1) : wristNow;
  let wristTo;
  const orientation = step.orientation ?? (places && !pinchedNow ? "auto" : void 0);
  if (orientation !== void 0) {
    const resolved = host.resolveOrientation(
      hand,
      orientation,
      end,
      bodyNow(ctx)
    );
    if (resolved.wristRotation) wristTo = resolved.wristRotation;
    else if (resolved.rayRotation) {
      const r = resolved.rayRotation;
      const wristLocal = quat_exports.multiply(
        quat_exports.create(),
        quat_exports.invert(quat_exports.create(), hand.quaternion.quat),
        wristNow
      );
      wristTo = quat_exports.multiply(
        quat_exports.create(),
        quat_exports.fromValues(r.x, r.y, r.z, r.w),
        wristLocal
      );
    }
  } else if (places && pinchedNow) {
    const shoulder = shoulderOf(ctx);
    const yawOf = (p) => Math.atan2(-(p[0] - shoulder[0]), -(p[2] - shoulder[2]));
    const turnWith = (yawOf(end) - yawOf(carried)) * 0.6;
    wristTo = quat_exports.multiply(
      quat_exports.create(),
      yawRotation(turnWith),
      pinnedWrist ?? wristFrom
    );
  }
  segment.wristFrom = wristFrom;
  segment.wristTo = wristTo ?? (pinnedWrist ? segment.walk?.carriesHand ? carryRotation(segment.walk, pinnedWrist, 1) : pinnedWrist : wristFrom);
  if (places) {
    const radius = anchor === "index-tip" ? 0.02 : anchor === "grasp" ? 0.04 : anchor === "wrist" ? 0.11 : 0.06;
    const probe = handProbe(ctx, anchor);
    const check = () => obstaclesOnPath(
      ctx,
      path,
      targetName,
      probe,
      segment.wristFrom,
      segment.wristTo
    );
    let hits = check();
    let extra = 0;
    for (let attempt = 0; attempt < 4 && hits.length > 0; attempt++) {
      const top = Math.max(...hits.map((hit) => hit.top));
      extra += Math.max(...hits.map((hit) => hit.depth)) + 0.02;
      const clear = top + radius + extra;
      const lift = (from, tangent) => {
        const need = Math.max(0, clear - from[1]);
        if (need <= 0) return tangent;
        if (!tangent) return { direction: UP2, distance: need };
        const blended = vec3_exports.normalize(
          vec3_exports.create(),
          vec3_exports.scaleAndAdd(vec3_exports.create(), tangent.direction, UP2, 1)
        );
        return {
          direction: blended,
          distance: Math.max(tangent.distance, need)
        };
      };
      path = new ArcPath(
        carried,
        end,
        lift(carried, startTangent),
        lift(end, endTangent)
      );
      hits = check();
    }
    if (hits.length > 0) {
      ctx.warnings.push(
        `${where(segment.step, ctx.params.steps[segment.step])}: the hand passes through ${hits.map((hit) => hit.name).join(", ")}; add depart/approach distance or a step around it.`
      );
    }
  }
  segment.path = path;
  segment.target = vec3_exports.clone(end);
  if (places) {
    ctx.restNormal = endTangent ? vec3_exports.clone(endTangent.direction) : null;
  } else if (ctx.restNormal) {
    segment.restNormal = ctx.restNormal;
  }
  let poseChange = false;
  if (step.poseId !== void 0) {
    const raw = isObject(step.poseId) ? step.poseId : { value: step.poseId };
    const fingers = step.fingers ?? (closes ? pinchCurlFingers() : void 0);
    const parsed = host.parsePose(hand, raw.value, fingers);
    poseChange = parsed.poseId !== hand.poseId || JSON.stringify(parsed.fingers) !== JSON.stringify(hand.fingerPoses);
    if (poseChange) {
      segment.pose = {
        ...timedOf(raw, 1, "minimum-jerk"),
        value: parsed
      };
    }
  } else if (closes) {
    const parsed = host.parsePose(hand, hand.poseId, pinchCurlFingers());
    if (JSON.stringify(parsed.fingers) !== JSON.stringify(hand.fingerPoses)) {
      poseChange = true;
      segment.pose = {
        value: parsed,
        start: 0.1,
        end: 0.7,
        easing: "minimum-jerk"
      };
    }
  }
  const head = {
    position: vec3_exports.clone(ctx.head.position),
    rotation: quat_exports.clone(ctx.head.rotation)
  };
  const headPosTo = segment.walk ? carry(segment.walk, head.position, 1) : vec3_exports.clone(head.position);
  vec3_exports.add(headPosTo, headPosTo, leanShift);
  const headRotationWalked = segment.walk ? carryRotation(segment.walk, head.rotation, 1) : head.rotation;
  segment.headFrom = head;
  segment.headTo = { position: headPosTo, rotation: headRotationWalked };
  segment.headStart = walkFirst;
  let lead = 0;
  const below = (p) => {
    const d = vec3_exports.sub(vec3_exports.create(), p, headPosTo);
    return Math.asin(
      Math.max(-1, Math.min(1, d[1] / Math.max(1e-6, vec3_exports.length(d))))
    );
  };
  const lookAtTarget = places ? end : carried;
  const worthLooking = below(lookAtTarget) > -65 * Math.PI / 180;
  if (ctx.params.gaze !== "fixed" && places && !worthLooking) {
    const neutral = vec3_exports.scaleAndAdd(
      vec3_exports.create(),
      headPosTo,
      ctx.body.forward,
      1
    );
    neutral[1] -= Math.tan(30 * Math.PI / 180);
    segment.headTo.rotation = lookRotation(headPosTo, neutral, quat_exports.create());
    segment.headEnd = 0.5;
  } else if (ctx.params.gaze !== "fixed" && (places || releases && !segment.nextPlaces) && worthLooking) {
    const full = lookRotation(headPosTo, lookAtTarget, quat_exports.create());
    const toRotation = quat_exports.slerp(
      quat_exports.create(),
      headRotationWalked,
      full,
      GAZE_HEAD_SHARE
    );
    const headTurn = angleBetween(headRotationWalked, toRotation);
    lead = places && headTurn > 8 && !leavingPress && !pinchedNow ? HEAD_LEAD_S : 0;
    segment.headTo.rotation = toRotation;
    segment.headEnd = Math.min(0.55, Math.max(0.3, 0.25 + headTurn / 100));
  }
  const rotation = angleBetween(segment.wristFrom, segment.wristTo);
  const moveSeconds = step.duration === void 0 || step.duration === "auto" ? places || poseChange || rotation > 1 || releases ? autoMoveSeconds(path.length, rotation, poseChange) : 0.3 : step.duration;
  const reachStart = walkFirst + lead;
  segment.pathEasing = places ? "reach" : "minimum-jerk";
  segment.pathStart = reachStart;
  segment.pathEnd = reachStart + moveSeconds;
  if (releases && !segment.nextPlaces) {
    segment.pathStart = reachStart + moveSeconds * 0.6;
    segment.pathEnd = reachStart + moveSeconds + 0.15;
  }
  if (segment.headEnd === void 0) segment.headEnd = lead + moveSeconds;
  let total = reachStart + moveSeconds;
  if (segment.walk && !segment.walk.carriesHand) {
    segment.walk.start = reachStart;
    segment.walk.seconds = Math.max(walkS, moveSeconds);
    total = reachStart + segment.walk.seconds;
  }
  if (step.pinch !== void 0) {
    const p = step.pinch;
    const from = pinchNow;
    if (isObject(p) && "at" in p) {
      const close = Math.min(PINCH_CLOSE_S, Math.max(0.15, moveSeconds * 0.45));
      const arrival = reachStart + moveSeconds;
      const closeStart = Math.max(reachStart, arrival - close * 0.7);
      segment.pinch = {
        value: p.value,
        start: closeStart,
        end: closeStart + close,
        easing: "minimum-jerk",
        from,
        // A hand already open wider than the grip skips the pre-shape (it
        // would let go of whatever it holds).
        preshape: from < PRESHAPE_PINCH ? {
          value: PRESHAPE_PINCH,
          start: reachStart + moveSeconds * 0.25,
          end: Math.max(reachStart + moveSeconds * 0.25, closeStart)
        } : void 0
      };
      total = segment.pinch.end + PINCH_HOLD_S;
    } else {
      const t = timedOf(p, moveSeconds, "minimum-jerk");
      if (moveSeconds === 0) {
        t.end = 0.15;
        total = Math.max(total, reachStart + 0.15);
      }
      segment.pinch = {
        ...t,
        start: t.start + reachStart,
        end: t.end + reachStart,
        from
      };
    }
    if (releases) {
      ctx.held = null;
    }
  }
  if (segment.pose) {
    segment.pose.start = reachStart + segment.pose.start * moveSeconds;
    segment.pose.end = reachStart + segment.pose.end * moveSeconds;
    if (segment.kind === "press") {
      segment.pose.end = Math.min(
        segment.pose.end,
        reachStart + moveSeconds * 0.6
      );
      segment.pose.start = Math.min(segment.pose.start, segment.pose.end);
    }
    if (segment.pose.end - segment.pose.start < 0.2 && segment.kind !== "press" && step.duration !== 0) {
      segment.pose.end = Math.max(segment.pose.end, segment.pose.start + 0.2);
      total = Math.max(total, segment.pose.end);
    }
  }
  segment.duration = Math.max(total, segment.pathEnd);
  if (!places && !releases && !segment.walk && segment.lookAhead && ctx.params.gaze !== "fixed") {
    const ahead = segment.lookAhead(ctx);
    if (ahead && below(ahead) > -65 * Math.PI / 180) {
      const full = lookRotation(head.position, ahead, quat_exports.create());
      segment.headTo.rotation = quat_exports.slerp(
        quat_exports.create(),
        head.rotation,
        full,
        GAZE_HEAD_SHARE
      );
      segment.headEnd = Math.min(Math.max(0.3, total * 0.7), 0.5);
    }
  }
};
var createContext = (host, params, warnings, dry) => {
  const hand = dry ? host.hand(params.device) : host.liveHand(params.device);
  const head = host.headPose();
  const body = bodyFrameFromHead(head.position, head.rotation);
  let standingHead = vec3_exports.clone(head.position);
  let lean = vec3_exports.create();
  const stored = host.bodyState();
  if (stored && vec3_exports.distance(stored.standing, head.position) < 0.15) {
    vec3_exports.copy(body.forward, stored.forward);
    vec3_exports.cross(body.right, body.forward, UP2);
    vec3_exports.normalize(body.right, body.right);
    standingHead = vec3_exports.clone(stored.standing);
    lean = vec3_exports.sub(vec3_exports.create(), head.position, standingHead);
  }
  const other = host.otherHand(params.device);
  const restsOtherHand = other !== void 0 && (params.idleHand === "rest" || params.idleHand === void 0 && other.pinchValue < 0.5);
  return {
    host,
    params,
    planned: dry ? {
      poseId: hand.poseId,
      blended: Object.keys(hand.fingerPoses).length > 0 || hand.poseTransitionProgress !== null,
      pinch: host.latestPinch(params.device)
    } : null,
    hand,
    anchor: hand.pin?.anchor ?? "target-ray",
    body,
    warnings,
    head: {
      position: vec3_exports.clone(head.position),
      rotation: quat_exports.clone(head.rotation)
    },
    restsOtherHand,
    lastNormal: null,
    autoDepart: null,
    held: null,
    graspPinch: 1,
    restNormal: null,
    walk: vec3_exports.create(),
    lean,
    standingHead,
    contacts: []
  };
};
var headAfter = (segment, head) => {
  if (segment.headTo) {
    vec3_exports.copy(head.position, segment.headTo.position);
    quat_exports.copy(head.rotation, segment.headTo.rotation);
  }
};
var scratch = vec3_exports.create();
var scratchQuat = quat_exports.create();
var swayScratch = vec3_exports.create();
var sway = (t, seed, amplitude, out) => {
  for (let i = 0; i < 3; i++) {
    const k = seed * 3 + i;
    out[i] = amplitude * (Math.sin(2 * Math.PI * 0.23 * t + k * 1.7) + 0.6 * Math.sin(2 * Math.PI * 0.37 * t + k * 2.3) + 0.3 * Math.sin(2 * Math.PI * 0.61 * t + k * 0.9)) / 1.9;
  }
  return out;
};
var SequenceRunner = class {
  constructor(host, params, segments, deadlinePerf) {
    this.host = host;
    this.params = params;
    this.segments = segments;
    this.deadlinePerf = deadlinePerf;
    this.index = -1;
    this.run = null;
    this.clock = 0;
    // sequence seconds
    this.segmentStart = 0;
    // sequence seconds when the segment began
    this.carryS = 0;
    // seconds left over from a frame that ended a segment
    this.stall = false;
    this.ending = false;
    this.finished = null;
    this.events = [];
    this.steps = [];
    this.openPress = null;
    this.idle = null;
    // The latest microgesture, until its button is up.
    this.micro = null;
    this.ctx = createContext(host, params, [], false);
    const button = host.pinchButton(params.device)[P_GAMEPAD];
    this.seenPressed = button.lastFramePressed;
    this.seenCancels = button.cancelGeneration;
    this.seenGestures = MICROGESTURES.map(
      (gesture) => host.gestureButton(params.device, gesture)[P_GAMEPAD].lastFramePressed
    );
  }
  get done() {
    return this.finished !== null;
  }
  /** Called on the first frame: lowers the other hand and starts step 0. */
  start() {
    const other = this.host.otherHand(this.params.device);
    if (this.ctx.restsOtherHand && other) {
      const b = this.ctx.body;
      const side = this.params.device === "hand-right" ? -1 : 1;
      const target = vec3_exports.clone(this.ctx.standingHead);
      vec3_exports.scaleAndAdd(target, target, b.right, 0.24 * side);
      target[1] -= 0.8;
      vec3_exports.scaleAndAdd(target, target, b.forward, 0.03);
      const fingers = vec3_exports.fromValues(0, -1, 0);
      vec3_exports.scaleAndAdd(fingers, fingers, b.forward, 0.2);
      const palm = vec3_exports.scale(vec3_exports.create(), b.right, -side);
      const toOrigin = (v) => {
        const o = this.host.globalDirectionToOrigin(v);
        return [o[0], o[1], o[2]];
      };
      const resolved = this.host.resolveOrientation(
        other,
        { fingers: toOrigin(fingers), palm: toOrigin(palm) },
        target,
        bodyNow(this.ctx)
      );
      const curl = this.host.parsePose(other, "default", {
        thumb: { poseId: "flat", weight: 0.6 },
        index: { poseId: "fist", weight: 0.42 },
        middle: { poseId: "fist", weight: 0.45 },
        ring: { poseId: "fist", weight: 0.48 },
        pinky: { poseId: "fist", weight: 0.5 }
      });
      other.beginPoseTransition(curl.poseId, curl.fingers);
      this.idle = {
        hand: other,
        device: this.params.device === "hand-right" ? "hand-left" : "hand-right",
        from: this.host.anchorPosition(other, "wrist"),
        fromWrist: other.wristRotation(),
        to: target,
        toWrist: resolved.wristRotation ?? other.wristRotation(),
        seconds: 0.8
      };
    }
    this.advanceSegment();
    if (this.idle && !this.finished) {
      this.idle.seconds = Math.min(
        1.5,
        Math.max(0.6, this.segments[0].duration)
      );
    }
  }
  /** Advances by `deltaMs`; returns leftover ms when finished, else -1. */
  tick(deltaMs) {
    if (this.finished) return deltaMs;
    this.observeEdges();
    if (this.micro?.releasePending) {
      this.micro.finish();
    }
    let remaining = deltaMs / 1e3 + this.carryS;
    this.carryS = 0;
    if (this.ending) {
      this.finish(true);
      return remaining * 1e3;
    }
    if (performance.now() > this.deadlinePerf) {
      this.finish(false, "deadline");
      return 0;
    }
    if (this.stall) {
      this.stall = false;
      this.advanceSegment();
      if (this.finished) return 0;
    }
    for (; ; ) {
      const segment = this.segments[this.index];
      const run = this.run;
      let leftover;
      try {
        leftover = run.advance(remaining * 1e3);
      } catch (error) {
        run.stop();
        this.finish(false, error.message, segment.step);
        return 0;
      }
      if (run.interrupted) {
        this.finish(false, "released", segment.step);
        return 0;
      }
      const used = leftover < 0 ? remaining : remaining - leftover / 1e3;
      this.clock += used;
      remaining -= used;
      this.measureContact(segment);
      if (leftover < 0) {
        return -1;
      }
      this.closeStep(segment);
      if (this.index === this.segments.length - 1) {
        this.ending = true;
        this.carryS = remaining;
        return -1;
      }
      if (segment.stallAfter) {
        this.stall = true;
        this.carryS = remaining;
        return -1;
      }
      this.advanceSegment();
      if (this.finished) return 0;
    }
  }
  /** Records the select edges and microgestures the app saw on the last frame. */
  observeEdges() {
    const state = this.host.pinchButton(this.params.device)[P_GAMEPAD];
    const pressed = state.lastFramePressed;
    if (pressed !== this.seenPressed) {
      const edge = pressed ? "press" : state.cancelGeneration !== this.seenCancels ? "cancel" : "release";
      for (const type of edgeEventTypes(edge, "select")) {
        this.events.push({ t: +this.clock.toFixed(3), type });
      }
    }
    this.seenPressed = pressed;
    this.seenCancels = state.cancelGeneration;
    MICROGESTURES.forEach((gesture, i) => {
      const down = this.host.gestureButton(this.params.device, gesture)[P_GAMEPAD].lastFramePressed;
      if (down && !this.seenGestures[i]) {
        this.events.push({ t: +this.clock.toFixed(3), type: gesture });
      }
      this.seenGestures[i] = down;
    });
  }
  advanceSegment() {
    this.index++;
    const segment = this.segments[this.index];
    try {
      segment.prepare(this.ctx);
    } catch (error) {
      this.finish(false, error.message, segment.step);
      return;
    }
    if (this.idle && segment.walk) {
      const move = segment.walk;
      const { idle: idle2 } = this;
      for (const point of [idle2.from, idle2.to]) {
        carry(move, vec3_exports.clone(point), 1, point);
      }
      for (const rotation of [idle2.fromWrist, idle2.toWrist]) {
        carryRotation(move, quat_exports.clone(rotation), 1, rotation);
      }
    }
    this.segmentStart = this.clock;
    if (segment.micro) this.micro = segment.micro.player;
    this.run = this.host.channels.run(this.channelsFor(segment));
    const last = this.steps[this.steps.length - 1];
    if (!last || last.index !== segment.step) {
      const now = performance.now();
      this.steps.push({
        index: segment.step,
        label: segment.label,
        start: this.clock,
        end: this.clock,
        startPerf: now,
        endPerf: now
      });
    }
  }
  closeStep(segment) {
    const last = this.steps[this.steps.length - 1];
    if (last && last.index === segment.step) {
      last.end = this.clock;
      last.endPerf = performance.now();
    }
  }
  /** The channels a segment runs, in the order they apply each frame. */
  channelsFor(segment) {
    const durationMs = segment.duration * 1e3;
    const at = (progress) => progress * segment.duration;
    const device = this.params.device;
    const { hand } = this.ctx;
    const channels = [
      {
        device: "headset",
        kind: "transform",
        durationMs,
        easing: "linear",
        apply: (progress) => this.applyHead(segment, at(progress))
      }
    ];
    if (segment.pose) {
      const { start, end, easing, value } = segment.pose;
      channels.push({
        device,
        kind: "pose",
        delayMs: start * 1e3,
        durationMs: (end - start) * 1e3,
        easing,
        begin: () => {
          hand.beginPoseTransition(value.poseId, value.fingers);
        },
        apply: (progress) => {
          if (hand.poseTransitionProgress !== null) {
            hand.poseTransitionProgress = progress;
          }
        }
      });
    }
    if (segment.pinch) {
      const { start, end, preshape } = segment.pinch;
      const from = Math.min(start, preshape?.start ?? start);
      channels.push({
        device,
        kind: "pinch",
        delayMs: from * 1e3,
        durationMs: (end - from) * 1e3,
        easing: "linear",
        apply: (progress) => this.applyPinch(segment, from + progress * (end - from))
      });
    }
    channels.push({
      device,
      kind: "transform",
      durationMs,
      easing: "linear",
      apply: (progress) => this.applyPlacement(segment, at(progress))
    });
    if (segment.micro) {
      const { player, start } = segment.micro;
      channels.push(player.channel(device, start * 1e3));
    }
    if (this.idle) {
      channels.push({
        device: this.idle.device,
        kind: "transform",
        durationMs,
        easing: "linear",
        apply: (progress) => this.applyIdleHand(segment, at(progress))
      });
    }
    return channels;
  }
  /** How far a segment's walk has gone at `t` (0 to 1). */
  walkProgress(segment, t) {
    const move = segment.walk;
    return move ? ease("minimum-jerk", (t - move.start) / move.seconds) : 1;
  }
  /** How far a segment's path has gone at `t` (0 to 1, eased). */
  pathProgress(segment, t, easing) {
    const start = segment.pathStart ?? 0;
    const end = segment.pathEnd ?? segment.duration;
    if (end <= start) return t >= start ? 1 : 0;
    return t <= start ? 0 : ease(easing, Math.min(1, (t - start) / (end - start)));
  }
  /**
   * The head: carried by the walk, then turned toward the work (from
   * `headStart` over `headEnd` seconds) and leaned with the reach, plus a
   * slight, slow sway.
   */
  applyHead(segment, t) {
    const base = this.ctx.head;
    if (segment.headFrom && segment.headTo) {
      const fw = this.walkProgress(segment, t);
      const fl = this.pathProgress(segment, t, "minimum-jerk");
      const headEnd = segment.headEnd ?? 0;
      const fg = ease(
        "minimum-jerk",
        headEnd > 0 ? (t - (segment.headStart ?? 0)) / headEnd : 1
      );
      const { position: position2, rotation: rotation2 } = segment.headFrom;
      if (segment.walk) {
        carry(segment.walk, position2, fw, base.position);
        carryRotation(segment.walk, rotation2, fw, base.rotation);
      } else {
        vec3_exports.copy(base.position, position2);
        quat_exports.copy(base.rotation, rotation2);
      }
      if (segment.lean) {
        vec3_exports.scaleAndAdd(base.position, base.position, segment.lean, fl);
      }
      quat_exports.slerp(base.rotation, base.rotation, segment.headTo.rotation, fg);
    }
    sway(this.segmentStart + t, 2, HEAD_SWAY_RAD, swayScratch);
    const rotation = quat_exports.clone(base.rotation);
    const yaw = quat_exports.setAxisAngle(quat_exports.create(), UP2, swayScratch[0]);
    const pitch = quat_exports.setAxisAngle(quat_exports.create(), [1, 0, 0], swayScratch[1]);
    quat_exports.multiply(rotation, yaw, rotation);
    quat_exports.multiply(rotation, rotation, pitch);
    sway(this.segmentStart + t, 4, HEAD_SWAY_M, swayScratch);
    const position = vec3_exports.add(vec3_exports.create(), base.position, swayScratch);
    this.host.setHeadPose(position, rotation);
  }
  /** Pinch: an optional pre-shape (open to a grip aperture), then the pinch itself. */
  applyPinch(segment, t) {
    const { start, end, easing, value, from, preshape } = segment.pinch;
    const window2 = (a, b) => b <= a ? t >= a ? 1 : 0 : t <= a ? 0 : ease(easing, Math.min(1, (t - a) / (b - a)));
    let pinch;
    if (preshape && t < start) {
      pinch = from + (preshape.value - from) * window2(preshape.start, preshape.end);
    } else {
      const base = preshape ? preshape.value : from;
      pinch = base + (value - base) * window2(start, end);
    }
    this.host.setPinch(this.params.device, Math.min(1, Math.max(0, pinch)));
  }
  /** The hand along the path (carried by any walk first), the wrist turning alongside. */
  applyPlacement(segment, t) {
    const { hand } = this.ctx;
    if (!segment.path) return;
    const f = this.pathProgress(
      segment,
      t,
      segment.pathEasing ?? "minimum-jerk"
    );
    segment.path.at(scratch, f);
    let wrist = segment.wristFrom && segment.wristTo ? quat_exports.slerp(scratchQuat, segment.wristFrom, segment.wristTo, f) : void 0;
    const move = segment.walk;
    if (move?.carriesHand && t < move.start + move.seconds) {
      const fw = this.walkProgress(segment, t);
      const back = reverseOf(move);
      carry(back, scratch, 1 - fw, scratch);
      if (wrist) wrist = carryRotation(back, wrist, 1 - fw, scratchQuat);
    }
    if ((segment.kind === "hold" || segment.kind === "microgesture") && !segment.pinch && hand.pinchValue < 0.5) {
      sway(this.segmentStart + t, 1, HAND_SWAY_M, swayScratch);
      if (segment.restNormal) {
        vec3_exports.scaleAndAdd(
          swayScratch,
          swayScratch,
          segment.restNormal,
          -vec3_exports.dot(swayScratch, segment.restNormal)
        );
      }
      vec3_exports.scaleAndAdd(scratch, scratch, swayScratch, Math.min(1, t / 0.5));
    }
    hand.setPin({
      anchor: this.ctx.anchor,
      target: scratch,
      wristRotation: wrist,
      graspPinch: this.ctx.graspPinch
    });
  }
  /**
   * The resting hand: lowered to the hip over the first step (its pose fading
   * to a loose curl), carried by walks, swaying slightly once it is there.
   */
  applyIdleHand(segment, t) {
    const idle2 = this.idle;
    const f = ease("minimum-jerk", (this.segmentStart + t) / idle2.seconds);
    const target = vec3_exports.lerp(vec3_exports.create(), idle2.from, idle2.to, f);
    const wrist = quat_exports.slerp(quat_exports.create(), idle2.fromWrist, idle2.toWrist, f);
    const move = segment.walk;
    if (move && t < move.start + move.seconds) {
      const back = reverseOf(move);
      const fw = this.walkProgress(segment, t);
      carry(back, target, 1 - fw, target);
      carryRotation(back, wrist, 1 - fw, wrist);
    }
    if (idle2.hand.poseTransitionProgress !== null) {
      idle2.hand.poseTransitionProgress = f;
    }
    sway(this.segmentStart + t, 3, IDLE_HAND_SWAY_M, swayScratch);
    vec3_exports.scaleAndAdd(target, target, swayScratch, f);
    idle2.hand.setPin({ anchor: "wrist", target, wristRotation: wrist });
  }
  /**
   * Wall-clock contact: the fingertip within 2 cm of the pressed surface,
   * followed into the next step when the pull-back is its lift-off.
   */
  measureContact(segment) {
    const press = segment.press ?? this.openPress;
    if (!press) return;
    const tip = this.host.anchorPosition(this.ctx.hand, "index-tip");
    const offset = vec3_exports.sub(vec3_exports.create(), tip, press.point);
    const d = vec3_exports.dot(offset, press.normal);
    vec3_exports.scaleAndAdd(offset, offset, press.normal, -d);
    const over = vec3_exports.length(offset) <= 0.04;
    const contacts = this.ctx.contacts;
    let current = contacts[contacts.length - 1];
    if (d <= TOUCH_M && over) {
      if (!current || current.endPerf !== void 0) {
        current = { label: segment.label, startPerf: performance.now() };
        contacts.push(current);
        this.openPress = press;
      }
    } else if (current && current.endPerf === void 0 && current.startPerf !== void 0) {
      current.endPerf = performance.now();
      this.openPress = null;
      const ms = current.endPerf - current.startPerf;
      if (ms > 800) {
        this.ctx.warnings.push(
          `${segment.label}: the press touched for ${ms.toFixed(0)} ms of real time; frames are slow enough that an 800 ms click window may be missed.`
        );
      }
    }
  }
  finish(completed, reason, failedStep) {
    if (this.finished) return;
    if (!completed) {
      this.run?.stop();
      this.micro?.cancel();
      for (const hand of [this.ctx.hand, this.idle?.hand]) {
        if (hand && hand.poseTransitionProgress !== null) {
          hand.poseTransitionProgress = null;
        }
      }
    } else if (this.idle && this.clock < this.idle.seconds) {
      this.idle.hand.poseTransitionProgress = null;
      this.idle.hand.setPin({
        anchor: "wrist",
        target: this.idle.to,
        wristRotation: this.idle.toWrist
      });
    }
    if (completed) {
      this.host.setBodyState({
        forward: vec3_exports.clone(this.ctx.body.forward),
        standing: vec3_exports.add(vec3_exports.create(), this.ctx.standingHead, this.ctx.walk)
      });
      if (this.ctx.hand.pinchValue < 0.5) {
        const gap = vec3_exports.distance(
          this.host.anchorPosition(this.ctx.hand, "thumb-tip"),
          this.host.anchorPosition(this.ctx.hand, "index-tip")
        );
        if (gap < 0.02) {
          this.ctx.warnings.push(
            `The hand ends with its thumb and index tips ${(gap * 100).toFixed(1)} cm apart and the pinch open; apps that detect pinches from joints will see a pinch. Leave the thumb further from the index tip.`
          );
        }
      }
    }
    const last = this.steps[this.steps.length - 1];
    if (last && !completed) {
      last.end = this.clock;
      last.endPerf = performance.now();
    }
    this.finished = {
      completed,
      cancelled: false,
      ...reason ? { reason } : {},
      ...failedStep !== void 0 ? { failedStep } : {},
      steps: this.steps.map((s) => ({
        label: s.label,
        start: +s.start.toFixed(3),
        end: +s.end.toFixed(3),
        startPerf: +s.startPerf.toFixed(1),
        endPerf: +s.endPerf.toFixed(1)
      })),
      events: this.events,
      presses: this.ctx.contacts.map((c) => ({
        label: c.label,
        contactMs: c.startPerf !== void 0 && c.endPerf !== void 0 ? +(c.endPerf - c.startPerf).toFixed(1) : null
      })),
      warnings: this.ctx.warnings,
      pinchValue: this.host.latestPinch(this.params.device)
    };
  }
  /**
   * Stops now (cancel, release, watchdog, session end): the current channels
   * stop where they are; the pinch is left as it is.
   */
  abort(reason) {
    this.run?.stop();
    if (!this.finished) {
      this.finish(false, reason);
      this.finished.cancelled = true;
    }
    return this.result();
  }
  result() {
    const result = this.finished;
    try {
      result.final = this.host.handState(this.params.device);
    } catch {
    }
    return result;
  }
  /**
   * The planned segments with estimated durations (dry run and time budget),
   * from the current state. Prepares every segment against a scratch copy of
   * the hand's pin, then puts the hand and head back.
   */
  static describe(host, params, segments, warnings) {
    const ctx = createContext(host, params, warnings, true);
    const hand = ctx.hand;
    const savedPin = hand.pin;
    const savedPosition = vec3_exports.clone(hand.position.vec3);
    const savedRotation = quat_exports.clone(hand.quaternion.quat);
    const head = host.headPose();
    const out = [];
    let total = 0;
    const toOrigin = (p) => {
      const o = host.globalToOrigin(p);
      return { x: +o[0].toFixed(4), y: +o[1].toFixed(4), z: +o[2].toFixed(4) };
    };
    try {
      for (const segment of segments) {
        try {
          segment.prepare(ctx);
        } catch (error) {
          const message = error.message;
          throw new Error(
            message.startsWith("Step ") ? message : `${where(segment.step, params.steps[segment.step])}: ${message}`
          );
        }
        total += segment.duration;
        const planned = ctx.planned;
        if (segment.pose) {
          planned.poseId = segment.pose.value.poseId;
          planned.blended = Object.keys(segment.pose.value.fingers).length > 0;
        }
        if (segment.pinch) planned.pinch = segment.pinch.value;
        if (segment.target) {
          hand.setPin({
            anchor: ctx.anchor,
            target: segment.target,
            wristRotation: segment.wristTo,
            graspPinch: ctx.graspPinch
          });
        }
        headAfter(segment, ctx.head);
        out.push({
          step: segment.step,
          label: segment.label,
          kind: segment.kind,
          duration: +segment.duration.toFixed(3),
          ...segment.target ? { target: toOrigin(segment.target) } : {},
          ...segment.walk && vec3_exports.length(segment.walk.shift) > 0.01 ? { walk: +vec3_exports.length(segment.walk.shift).toFixed(3) } : {}
        });
      }
    } finally {
      hand.position.set(savedPosition[0], savedPosition[1], savedPosition[2]);
      hand.quaternion.set(
        savedRotation[0],
        savedRotation[1],
        savedRotation[2],
        savedRotation[3]
      );
      hand.setPin(savedPin);
      hand.updateTargetRaySpace();
      host.setHeadPose(head.position, head.rotation);
    }
    return {
      device: params.device,
      segments: out,
      duration: +total.toFixed(3),
      warnings
    };
  }
};

// src/utils/control-math.ts
function vec3ToObj(v) {
  return { x: v.x, y: v.y, z: v.z };
}
function quatToObj(q) {
  return { x: q.x, y: q.y, z: q.z, w: q.w };
}
function quatToEuler(q) {
  const { x, y, z, w } = q;
  const RAD_TO_DEG = 180 / Math.PI;
  const sinp = Math.max(-1, Math.min(1, 2 * (w * x - y * z)));
  let pitch;
  if (Math.abs(sinp) >= 1) {
    pitch = Math.sign(sinp) * Math.PI / 2;
  } else {
    pitch = Math.asin(sinp);
  }
  const siny_cosp = 2 * (w * y + x * z);
  const cosy_cosp = 1 - 2 * (x * x + y * y);
  const yaw = Math.atan2(siny_cosp, cosy_cosp);
  const sinr_cosp = 2 * (w * z + x * y);
  const cosr_cosp = 1 - 2 * (x * x + z * z);
  const roll = Math.atan2(sinr_cosp, cosr_cosp);
  return {
    pitch: pitch * RAD_TO_DEG,
    yaw: yaw * RAD_TO_DEG,
    roll: roll * RAD_TO_DEG
  };
}
function eulerToQuat(euler) {
  const DEG_TO_RAD = Math.PI / 180;
  const pitch = (euler.pitch ?? 0) * DEG_TO_RAD;
  const yaw = (euler.yaw ?? 0) * DEG_TO_RAD;
  const roll = (euler.roll ?? 0) * DEG_TO_RAD;
  const cx = Math.cos(pitch * 0.5);
  const sx = Math.sin(pitch * 0.5);
  const cy = Math.cos(yaw * 0.5);
  const sy = Math.sin(yaw * 0.5);
  const cz = Math.cos(roll * 0.5);
  const sz = Math.sin(roll * 0.5);
  return {
    w: cx * cy * cz + sx * sy * sz,
    x: sx * cy * cz + cx * sy * sz,
    y: cx * sy * cz - sx * cy * sz,
    z: cx * cy * sz - sx * sy * cz
  };
}
function directionTo(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dz = to.z - from.z;
  const length4 = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (length4 === 0) {
    return { x: 0, y: 0, z: -1 };
  }
  return {
    x: dx / length4,
    y: dy / length4,
    z: dz / length4
  };
}
function lookRotationGimbal(direction) {
  const horizontalDist = Math.sqrt(
    direction.x * direction.x + direction.z * direction.z
  );
  let yaw = 0;
  if (horizontalDist > 1e-4) {
    yaw = Math.atan2(-direction.x, -direction.z);
  }
  const pitch = Math.atan2(direction.y, horizontalDist);
  const cx = Math.cos(pitch * 0.5);
  const sx = Math.sin(pitch * 0.5);
  const cy = Math.cos(yaw * 0.5);
  const sy = Math.sin(yaw * 0.5);
  return {
    w: cx * cy,
    x: sx * cy,
    y: cx * sy,
    z: -sx * sy
  };
}
function lookRotation2(direction, up = { x: 0, y: 1, z: 0 }) {
  const dirLen = Math.sqrt(
    direction.x * direction.x + direction.y * direction.y + direction.z * direction.z
  );
  if (dirLen === 0) {
    return { x: 0, y: 0, z: 0, w: 1 };
  }
  const forward = {
    x: direction.x / dirLen,
    y: direction.y / dirLen,
    z: direction.z / dirLen
  };
  const right = {
    x: forward.y * up.z - forward.z * up.y,
    y: forward.z * up.x - forward.x * up.z,
    z: forward.x * up.y - forward.y * up.x
  };
  const rightLen = Math.sqrt(
    right.x * right.x + right.y * right.y + right.z * right.z
  );
  if (rightLen === 0) {
    const altUp = { x: 1, y: 0, z: 0 };
    right.x = forward.y * altUp.z - forward.z * altUp.y;
    right.y = forward.z * altUp.x - forward.x * altUp.z;
    right.z = forward.x * altUp.y - forward.y * altUp.x;
    const altRightLen = Math.sqrt(
      right.x * right.x + right.y * right.y + right.z * right.z
    );
    right.x /= altRightLen;
    right.y /= altRightLen;
    right.z /= altRightLen;
  } else {
    right.x /= rightLen;
    right.y /= rightLen;
    right.z /= rightLen;
  }
  const newUp = {
    x: right.y * forward.z - right.z * forward.y,
    y: right.z * forward.x - right.x * forward.z,
    z: right.x * forward.y - right.y * forward.x
  };
  const m00 = right.x, m01 = newUp.x, m02 = -forward.x;
  const m10 = right.y, m11 = newUp.y, m12 = -forward.y;
  const m20 = right.z, m21 = newUp.z, m22 = -forward.z;
  const trace = m00 + m11 + m22;
  let qw, qx2, qy2, qz2;
  if (trace > 0) {
    const s = 0.5 / Math.sqrt(trace + 1);
    qw = 0.25 / s;
    qx2 = (m21 - m12) * s;
    qy2 = (m02 - m20) * s;
    qz2 = (m10 - m01) * s;
  } else if (m00 > m11 && m00 > m22) {
    const s = 2 * Math.sqrt(1 + m00 - m11 - m22);
    qw = (m21 - m12) / s;
    qx2 = 0.25 * s;
    qy2 = (m01 + m10) / s;
    qz2 = (m02 + m20) / s;
  } else if (m11 > m22) {
    const s = 2 * Math.sqrt(1 + m11 - m00 - m22);
    qw = (m02 - m20) / s;
    qx2 = (m01 + m10) / s;
    qy2 = 0.25 * s;
    qz2 = (m12 + m21) / s;
  } else {
    const s = 2 * Math.sqrt(1 + m22 - m00 - m11);
    qw = (m10 - m01) / s;
    qx2 = (m02 + m20) / s;
    qy2 = (m12 + m21) / s;
    qz2 = 0.25 * s;
  }
  const len4 = Math.sqrt(qx2 * qx2 + qy2 * qy2 + qz2 * qz2 + qw * qw);
  if (len4 > 0) {
    qx2 /= len4;
    qy2 /= len4;
    qz2 /= len4;
    qw /= len4;
  }
  return { x: qx2, y: qy2, z: qz2, w: qw };
}
function waitForCondition(condition, timeoutMs = 5e3) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const check = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeoutMs) {
        reject(new Error("Timeout waiting for condition"));
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}

// src/remote/RemoteControlInterface.ts
function isEulerRotation(orientation) {
  return "pitch" in orientation || "yaw" in orientation || "roll" in orientation;
}
function normalizeOrientation(orientation) {
  if (isEulerRotation(orientation)) {
    return eulerToQuat(orientation);
  }
  return orientation;
}
var quatFromGl = (q) => ({ x: q[0], y: q[1], z: q[2], w: q[3] });
var vec3FromGl = (v) => ({ x: v[0], y: v[1], z: v[2] });
function lerp5(a, b, t) {
  return a + (b - a) * t;
}
function lerpVec3(a, b, t) {
  return {
    x: lerp5(a.x, b.x, t),
    y: lerp5(a.y, b.y, t),
    z: lerp5(a.z, b.z, t)
  };
}
function slerpQuat(a, b, t) {
  let dot4 = a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  let bx = b.x, by = b.y, bz = b.z, bw = b.w;
  if (dot4 < 0) {
    dot4 = -dot4;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if (dot4 > 0.9995) {
    const result = {
      x: lerp5(a.x, bx, t),
      y: lerp5(a.y, by, t),
      z: lerp5(a.z, bz, t),
      w: lerp5(a.w, bw, t)
    };
    const len4 = Math.sqrt(
      result.x * result.x + result.y * result.y + result.z * result.z + result.w * result.w
    );
    return {
      x: result.x / len4,
      y: result.y / len4,
      z: result.z / len4,
      w: result.w / len4
    };
  }
  const theta0 = Math.acos(dot4);
  const theta = theta0 * t;
  const sinTheta = Math.sin(theta);
  const sinTheta0 = Math.sin(theta0);
  const s0 = Math.cos(theta) - dot4 * sinTheta / sinTheta0;
  const s1 = sinTheta / sinTheta0;
  return {
    x: s0 * a.x + s1 * bx,
    y: s0 * a.y + s1 * by,
    z: s0 * a.z + s1 * bz,
    w: s0 * a.w + s1 * bw
  };
}
var DEVICE_ID_ALIASES = {
  right: "controller-right",
  left: "controller-left",
  "right-controller": "controller-right",
  "left-controller": "controller-left",
  "controllers.right": "controller-right",
  "controllers.left": "controller-left",
  rightController: "controller-right",
  leftController: "controller-left",
  "right-hand": "hand-right",
  "left-hand": "hand-left",
  "hands.right": "hand-right",
  "hands.left": "hand-left",
  rightHand: "hand-right",
  leftHand: "hand-left"
};
function resolveDeviceId(id) {
  return DEVICE_ID_ALIASES[id] ?? id;
}
var DEFAULT_SELECT_DURATION_S = 0.15;
var HAND_PINCH_RAMP_S = 0.1;
function requireSelectableDeviceId(value) {
  switch (value) {
    case "controller-left":
    case "controller-right":
    case "hand-left":
    case "hand-right":
      return value;
    default:
      throw new Error(`Unsupported select device: ${String(value)}`);
  }
}
var gazeWorldOrientation = quat_exports.create();
var gazeViewerInverse = quat_exports.create();
var gazeLocalOrientation = quat_exports.create();
function isFiniteNumber(n) {
  return typeof n === "number" && Number.isFinite(n);
}
function clamp2(value, min3, max3) {
  return Math.min(max3, Math.max(min3, value));
}
function validatePosition2(p) {
  if (!isFiniteNumber(p.x) || !isFiniteNumber(p.y) || !isFiniteNumber(p.z)) {
    throw new Error(
      `Invalid position: x, y, z must be finite numbers (got ${JSON.stringify(
        p
      )}).`
    );
  }
}
function validateAndNormalizeQuat(q) {
  if (!isFiniteNumber(q.x) || !isFiniteNumber(q.y) || !isFiniteNumber(q.z) || !isFiniteNumber(q.w)) {
    throw new Error(
      `Invalid orientation: x, y, z, w must be finite numbers (got ${JSON.stringify(
        q
      )}).`
    );
  }
  const len4 = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
  if (len4 < 1e-6) {
    throw new Error("Invalid orientation: quaternion has near-zero length.");
  }
  return { x: q.x / len4, y: q.y / len4, z: q.z / len4, w: q.w / len4 };
}
var _RemoteControlInterface = class _RemoteControlInterface {
  constructor(device) {
    this.commandQueue = [];
    this._isCaptured = false;
    this.releaseTimer = null;
    this.actionIdCounter = 0;
    /** Release timeout in milliseconds (default: 30000 = 30 seconds) */
    this.RELEASE_TIMEOUT_MS = 3e4;
    /**
     * Queue watchdog in milliseconds. Queued actions are rejected when no frame
     * arrives for this long, so callers don't hang forever when the XR render
     * loop is paused. Frames that keep arriving keep the queue alive, however
     * long the actions ahead of it run.
     */
    this.ACTION_TIMEOUT_MS = 1e4;
    this.watchdog = null;
    /** Per-device channels (transform, pose, pinch) that timed commands run. */
    this.channels = new ChannelEngine();
    this.targetResolver = null;
    // The body's facing and standing head position between sequences (null
    // until a sequence completes; cleared when the headset is placed).
    this.sequenceBody = null;
    /** A run_sequence gives up this long after dispatch, under the 30 s bridge timeout. */
    this.SEQUENCE_DEADLINE_MS = 28e3;
    this.device = device;
    device.onControlModeChange((mode) => {
      if (mode === "manual") {
        this.releaseHands();
      }
    });
  }
  generateActionId() {
    return `action_${++this.actionIdCounter}`;
  }
  // =============================================================================
  // Public Properties
  // =============================================================================
  /**
   * Whether the device is currently captured for programmatic control.
   * When true, DevUI should go into passive mode (sync FROM device only).
   */
  get isCaptured() {
    return this._isCaptured;
  }
  /**
   * Number of pending actions in the queue
   */
  get queueLength() {
    return this.commandQueue.length;
  }
  // =============================================================================
  // Queue Management
  // =============================================================================
  /**
   * Enqueue a discrete action for processing
   */
  enqueueDiscrete(method, params) {
    return new Promise((resolve, reject) => {
      const action = {
        type: "discrete",
        id: this.generateActionId(),
        method,
        params,
        resolve,
        reject
      };
      this.commandQueue.push(action);
      this.armWatchdog();
    });
  }
  /**
   * Enqueue a timed action: `start` runs on its first frame, `tick` advances
   * it until it reports the time left over, then it resolves with `result`.
   */
  enqueueTick(method, params, spec) {
    return new Promise((resolve, reject) => {
      const action = {
        type: "tick",
        id: this.generateActionId(),
        method,
        params,
        started: false,
        ...spec,
        resolve,
        reject
      };
      this.commandQueue.push(action);
      this.armWatchdog();
    });
  }
  /**
   * Enqueue channels that run together as one timed action. `build` runs when
   * the action reaches the head of the queue (so channels capture their start
   * state, and hands are checked, then); the action holds the head until
   * every channel finishes and resolves with `result(elapsedMs)`. Timed
   * commands run one channel each; run_sequence and tests drive several.
   */
  enqueueChannels(method, params, build, result, estimateMs) {
    let run;
    return this.enqueueTick(method, params, {
      estimateMs,
      start: () => {
        run = this.channels.run(build());
      },
      tick: (deltaMs) => {
        try {
          return run.advance(deltaMs);
        } catch (error) {
          run.stop();
          throw error;
        }
      },
      result: () => result(run.elapsedMs)
    });
  }
  /**
   * Settles every queued action after an interruption: a started action that
   * can report partial progress (a sequence) resolves with it, the rest
   * reject with `message(method)`.
   */
  interruptQueue(reason, message) {
    const pending = this.commandQueue;
    this.commandQueue = [];
    this.armWatchdog();
    for (const action of pending) {
      if (action.type === "tick" && action.started && action.abort) {
        action.resolve(action.abort(reason));
      } else {
        action.reject(new Error(message(action.method)));
      }
    }
  }
  /** Roughly how long the queued commands still run, in milliseconds. */
  queuedMs() {
    let total = 0;
    for (const action of this.commandQueue) {
      if (action.type === "tick") {
        total += Math.max(
          0,
          (action.estimateMs ?? 0) - (action.elapsedMs ?? 0)
        );
      }
    }
    return total;
  }
  /**
   * (Re)arm the queue watchdog. Called on every enqueue and every frame, so it
   * only fires when frames stop arriving while actions are waiting.
   */
  armWatchdog() {
    if (this.watchdog !== null) {
      clearTimeout(this.watchdog);
      this.watchdog = null;
    }
    if (this.commandQueue.length === 0) {
      return;
    }
    this.watchdog = setTimeout(() => {
      this.watchdog = null;
      this.cancelHeldInputs();
      this.releaseHands();
      this.interruptQueue(
        "stalled",
        (method) => `RemoteControlInterface: action '${method}' timed out after ${this.ACTION_TIMEOUT_MS}ms with no frame processing the queue (is the XR render loop running?).`
      );
      this.startReleaseTimer();
    }, this.ACTION_TIMEOUT_MS);
  }
  /**
   * Update method called each frame by XRDevice.
   * Processes the command queue and handles duration-based animations.
   *
   * @param deltaTimeMs - Time since last frame in milliseconds
   */
  update(deltaTimeMs) {
    if (this.commandQueue.length === 0) {
      return;
    }
    this.cancelReleaseTimer();
    if (!this._isCaptured) {
      this._isCaptured = true;
      this.device.controlMode = "programmatic";
    }
    let remainingMs = deltaTimeMs;
    const written = /* @__PURE__ */ new Set();
    while (this.commandQueue.length > 0) {
      const action = this.commandQueue[0];
      const writes = _RemoteControlInterface.INPUT_WRITE_METHODS.has(
        action.method
      );
      if (writes && written.has(action.params.device)) {
        break;
      }
      if (action.type === "discrete") {
        try {
          const result = this.executeDiscreteAction(action);
          action.resolve(result);
        } catch (error) {
          action.reject(error);
        }
        this.commandQueue.shift();
        if (writes) {
          written.add(action.params.device);
        }
        if (_RemoteControlInterface.FRAME_ENDING_METHODS.has(action.method)) {
          break;
        }
      } else {
        try {
          if (!action.started) {
            action.started = true;
            action.start();
          }
          const leftover = action.tick(remainingMs);
          action.elapsedMs = (action.elapsedMs ?? 0) + (leftover < 0 ? remainingMs : remainingMs - leftover);
          if (leftover < 0) {
            break;
          }
          remainingMs = leftover;
          action.resolve(action.result());
        } catch (error) {
          action.reject(error);
        }
        this.commandQueue.shift();
        if (writes) {
          written.add(action.params.device);
        }
      }
    }
    this.device.notifyStateChange();
    this.armWatchdog();
    if (this.commandQueue.length === 0 && !this.channels.isActive()) {
      this.startReleaseTimer();
    }
  }
  startReleaseTimer() {
    this.cancelReleaseTimer();
    this.releaseTimer = setTimeout(() => {
      this._isCaptured = false;
      this.releaseTimer = null;
      this.device.controlMode = "manual";
    }, this.RELEASE_TIMEOUT_MS);
  }
  cancelReleaseTimer() {
    if (this.releaseTimer !== null) {
      clearTimeout(this.releaseTimer);
      this.releaseTimer = null;
    }
  }
  // =============================================================================
  // Device Resolution
  // =============================================================================
  /**
   * Get the transform (position, quaternion) for a device
   */
  getDeviceTransform(deviceId) {
    switch (deviceId) {
      case "headset":
        return {
          position: vec3ToObj(this.device.position),
          orientation: quatToObj(this.device.quaternion)
        };
      case "controller-left": {
        const controller = this.device.controllers.left;
        if (!controller) throw new Error("Left controller not available");
        return {
          position: vec3ToObj(controller.position),
          orientation: quatToObj(controller.quaternion)
        };
      }
      case "controller-right": {
        const controller = this.device.controllers.right;
        if (!controller) throw new Error("Right controller not available");
        return {
          position: vec3ToObj(controller.position),
          orientation: quatToObj(controller.quaternion)
        };
      }
      case "hand-left": {
        const hand = this.device.hands.left;
        if (!hand) throw new Error("Left hand not available");
        return {
          position: vec3ToObj(hand.position),
          orientation: quatToObj(hand.quaternion)
        };
      }
      case "hand-right": {
        const hand = this.device.hands.right;
        if (!hand) throw new Error("Right hand not available");
        return {
          position: vec3ToObj(hand.position),
          orientation: quatToObj(hand.quaternion)
        };
      }
      case "gaze": {
        const gaze = this.device.gaze;
        if (!gaze) throw new Error("Gaze input not available");
        quat_exports.multiply(
          gazeWorldOrientation,
          this.device.quaternion.quat,
          gaze.quaternion.quat
        );
        return {
          position: vec3ToObj(this.device.position),
          orientation: {
            x: gazeWorldOrientation[0],
            y: gazeWorldOrientation[1],
            z: gazeWorldOrientation[2],
            w: gazeWorldOrientation[3]
          }
        };
      }
      default:
        throw new Error(`Unknown device: ${deviceId}`);
    }
  }
  /**
   * Set the transform for a device
   */
  setDeviceTransform(deviceId, position, orientation) {
    if (deviceId === "gaze" && position) {
      throw new Error(
        "Gaze position is derived from the headset. Move the headset transform instead."
      );
    }
    if (position) {
      validatePosition2(position);
    }
    const orient = orientation ? validateAndNormalizeQuat(orientation) : void 0;
    switch (deviceId) {
      case "headset":
        this.sequenceBody = null;
        if (position) {
          this.device.position.set(position.x, position.y, position.z);
        }
        if (orient) {
          this.device.quaternion.set(orient.x, orient.y, orient.z, orient.w);
        }
        break;
      case "controller-left": {
        const controller = this.device.controllers.left;
        if (!controller) throw new Error("Left controller not available");
        if (position) {
          controller.position.set(position.x, position.y, position.z);
        }
        if (orient) {
          controller.quaternion.set(orient.x, orient.y, orient.z, orient.w);
        }
        break;
      }
      case "controller-right": {
        const controller = this.device.controllers.right;
        if (!controller) throw new Error("Right controller not available");
        if (position) {
          controller.position.set(position.x, position.y, position.z);
        }
        if (orient) {
          controller.quaternion.set(orient.x, orient.y, orient.z, orient.w);
        }
        break;
      }
      case "hand-left": {
        const hand = this.device.hands.left;
        if (!hand) throw new Error("Left hand not available");
        if (position) {
          hand.position.set(position.x, position.y, position.z);
        }
        if (orient) {
          hand.quaternion.set(orient.x, orient.y, orient.z, orient.w);
        }
        break;
      }
      case "hand-right": {
        const hand = this.device.hands.right;
        if (!hand) throw new Error("Right hand not available");
        if (position) {
          hand.position.set(position.x, position.y, position.z);
        }
        if (orient) {
          hand.quaternion.set(orient.x, orient.y, orient.z, orient.w);
        }
        break;
      }
      case "gaze": {
        const gaze = this.device.gaze;
        if (!gaze) throw new Error("Gaze input not available");
        if (orient) {
          quat_exports.invert(gazeViewerInverse, this.device.quaternion.quat);
          quat_exports.set(
            gazeWorldOrientation,
            orient.x,
            orient.y,
            orient.z,
            orient.w
          );
          quat_exports.multiply(
            gazeLocalOrientation,
            gazeViewerInverse,
            gazeWorldOrientation
          );
          gaze.quaternion.set(
            gazeLocalOrientation[0],
            gazeLocalOrientation[1],
            gazeLocalOrientation[2],
            gazeLocalOrientation[3]
          );
        }
        break;
      }
      default:
        throw new Error(`Unknown device: ${deviceId}`);
    }
  }
  // =============================================================================
  // XR origin
  // =============================================================================
  /**
   * The XR origin in GlobalSpace: the app's first non-viewer reference space,
   * or null (identity) without one. Remote positions, orientations and
   * directions are all relative to it.
   */
  originMatrix() {
    const session = this.device[P_DEVICE].runtime.getSession();
    return session?.originOffsetMatrix ?? null;
  }
  /** Transform a position from XR-origin coordinates to GlobalSpace. */
  transformXROriginToGlobal(position) {
    const offsetMatrix = this.originMatrix();
    if (!offsetMatrix) {
      return position;
    }
    const posVec = vec3_exports.fromValues(position.x, position.y, position.z);
    vec3_exports.transformMat4(posVec, posVec, offsetMatrix);
    return { x: posVec[0], y: posVec[1], z: posVec[2] };
  }
  /** Transform a position from GlobalSpace to XR-origin coordinates. */
  transformGlobalToXROrigin(position) {
    const offsetMatrix = this.originMatrix();
    if (!offsetMatrix) {
      return position;
    }
    const inverse3 = mat4_exports.invert(mat4_exports.create(), offsetMatrix) ?? mat4_exports.create();
    const posVec = vec3_exports.fromValues(position.x, position.y, position.z);
    vec3_exports.transformMat4(posVec, posVec, inverse3);
    return { x: posVec[0], y: posVec[1], z: posVec[2] };
  }
  originRotation() {
    const offsetMatrix = this.originMatrix();
    const rotation = quat_exports.create();
    if (offsetMatrix) {
      mat4_exports.getRotation(rotation, offsetMatrix);
      quat_exports.normalize(rotation, rotation);
    }
    return rotation;
  }
  /** Transform an orientation from XR-origin coordinates to GlobalSpace. */
  orientationToGlobal(orientation) {
    const q = quat_exports.fromValues(
      orientation.x,
      orientation.y,
      orientation.z,
      orientation.w
    );
    quat_exports.multiply(q, this.originRotation(), q);
    return quatFromGl(quat_exports.normalize(q, q));
  }
  /** Transform an orientation from GlobalSpace to XR-origin coordinates. */
  orientationToXROrigin(orientation) {
    const q = quat_exports.fromValues(
      orientation.x,
      orientation.y,
      orientation.z,
      orientation.w
    );
    const inverse3 = quat_exports.invert(quat_exports.create(), this.originRotation());
    quat_exports.multiply(q, inverse3, q);
    return quatFromGl(quat_exports.normalize(q, q));
  }
  /** A device transform in XR-origin coordinates. */
  getDeviceTransformInOrigin(deviceId) {
    const transform = this.getDeviceTransform(deviceId);
    return {
      position: this.transformGlobalToXROrigin(transform.position),
      orientation: this.orientationToXROrigin(transform.orientation)
    };
  }
  /** Set a device transform given in XR-origin coordinates. */
  setDeviceTransformInOrigin(deviceId, position, orientation) {
    if (position) {
      validatePosition2(position);
    }
    this.setDeviceTransform(
      deviceId,
      position ? this.transformXROriginToGlobal(position) : void 0,
      orientation ? this.orientationToGlobal(validateAndNormalizeQuat(orientation)) : void 0
    );
  }
  // =============================================================================
  // Hands
  // =============================================================================
  handFor(deviceId) {
    const side = deviceId === "hand-left" ? "left" : deviceId === "hand-right" ? "right" : null;
    if (!side) {
      throw new Error(
        `Expected device 'hand-left' or 'hand-right', got '${deviceId}'.`
      );
    }
    const hand = this.device.hands[side];
    if (!hand) {
      throw new Error(`Hand ${side} not available`);
    }
    return hand;
  }
  /**
   * Throws unless the hand is what the app currently sees: hand input mode,
   * connected, and hand tracking enabled on the session.
   */
  requireLiveHand(deviceId) {
    const hand = this.handFor(deviceId);
    const session = this.device[P_DEVICE].runtime.getSession();
    if (this.device.primaryInputMode !== "hand") {
      throw new Error(
        `${deviceId} is not live: the input mode is controllers. Call set_input_mode with mode 'hand' first.`
      );
    }
    if (!hand.connected) {
      throw new Error(`${deviceId} is disconnected. Call set_connected first.`);
    }
    if (session?.enabledFeatures && session.enabledFeatures.length > 0 && !session.enabledFeatures.includes("hand-tracking")) {
      throw new Error(
        `${deviceId} is not live: the app's session did not enable 'hand-tracking'.`
      );
    }
    return hand;
  }
  /**
   * Lets go of both hands: every channel (moves, pose fades, pinch ramps)
   * stops where it is, a pose fade snaps to its pose, and pins are dropped.
   * Hands stay where they are.
   */
  releaseHands() {
    this.channels.stop();
    for (const side of ["left", "right"]) {
      const hand = this.device.hands[side];
      if (hand) {
        hand.poseTransitionProgress = null;
        hand.setPin(null);
      }
    }
  }
  /** The body frame from the headset (its position and yaw), in GlobalSpace. */
  bodyFrame() {
    return bodyFrameFromHead(
      this.device.position.vec3,
      this.device.quaternion.quat
    );
  }
  toVec3(value, what) {
    if (Array.isArray(value)) {
      if (value.length === 3 && value.every(isFiniteNumber)) {
        return vec3_exports.fromValues(value[0], value[1], value[2]);
      }
    } else if (value && typeof value === "object") {
      const v = value;
      if (isFiniteNumber(v.x) && isFiniteNumber(v.y) && isFiniteNumber(v.z)) {
        return vec3_exports.fromValues(v.x, v.y, v.z);
      }
    }
    throw new Error(
      `${what} must be {x, y, z} or [x, y, z] with finite numbers (got ${JSON.stringify(value)}).`
    );
  }
  /**
   * A direction input (XR-origin vector, or a name relative to the headset's
   * yaw, or to `body` when given) as a GlobalSpace unit vector. `from`
   * (GlobalSpace) is the point toward-head / away-from-head start at.
   */
  directionToGlobal(value, what, from, body = this.bodyFrame()) {
    if (typeof value === "string") {
      if (!NAMED_DIRECTIONS.includes(value)) {
        throw new Error(
          `Unknown direction '${value}' for ${what}. Use a vector or one of: ${NAMED_DIRECTIONS.join(", ")}.`
        );
      }
      return resolveDirection(value, body, from);
    }
    const v = this.toVec3(value, what);
    if (vec3_exports.length(v) < 1e-6) {
      throw new Error(`${what} must not be a zero vector.`);
    }
    vec3_exports.transformQuat(v, v, this.originRotation());
    return vec3_exports.normalize(v, v);
  }
  /**
   * Resolves a placement orientation for a hand. Returns the wanted wrist
   * rotation (hand directions or 'auto'), or the target-ray rotation
   * (quaternion / euler), in GlobalSpace.
   */
  resolveHandOrientation(hand, orientation, targetGlobal, body = this.bodyFrame()) {
    if (orientation === void 0) {
      return {};
    }
    if (orientation === "auto") {
      if (!targetGlobal) {
        throw new Error(`orientation 'auto' needs a position to reach toward.`);
      }
      const directions = autoDirections(
        shoulderPosition(body, hand.inputSource.handedness),
        targetGlobal,
        hand.inputSource.handedness,
        body
      );
      return { wristRotation: this.wristFromDirections(hand, directions) };
    }
    if (orientation && typeof orientation === "object" && "fingers" in orientation) {
      const input = orientation;
      const extra = Object.keys(input).filter(
        (key) => !["fingers", "palm", "thumb"].includes(key)
      );
      if (extra.length > 0) {
        throw new Error(`Unknown hand orientation keys: ${extra.join(", ")}.`);
      }
      if (input.palm === void 0 === (input.thumb === void 0)) {
        throw new Error(
          "A hand orientation takes fingers plus exactly one of palm or thumb."
        );
      }
      const from = targetGlobal ?? void 0;
      const directions = {
        fingers: this.directionToGlobal(input.fingers, "fingers", from, body),
        palm: input.palm !== void 0 ? this.directionToGlobal(input.palm, "palm", from, body) : void 0,
        thumb: input.thumb !== void 0 ? this.directionToGlobal(input.thumb, "thumb", from, body) : void 0
      };
      return { wristRotation: this.wristFromDirections(hand, directions) };
    }
    return {
      rayRotation: this.orientationToGlobal(
        validateAndNormalizeQuat(
          normalizeOrientation(orientation)
        )
      )
    };
  }
  wristFromDirections(hand, directions) {
    const rotation = wristRotationFromDirections(
      directions,
      hand.inputSource.handedness
    );
    if (!rotation) {
      throw new Error(
        "The two hand directions are parallel; give directions at an angle."
      );
    }
    return rotation;
  }
  /**
   * Where an anchor of the hand is now, in GlobalSpace (a grasp point at
   * `graspPinch`, else at the pin's).
   */
  anchorPosition(hand, anchor, graspPinch = hand.pin?.graspPinch) {
    const offset = hand.anchorOffset(anchor, vec3_exports.create(), graspPinch);
    vec3_exports.transformQuat(offset, offset, hand.quaternion.quat);
    return vec3_exports.add(offset, offset, hand.position.vec3);
  }
  requireAnchor(anchor) {
    if (!isHandAnchor(anchor)) {
      throw new Error(
        `Unknown anchor '${String(anchor)}'. Use target-ray, wrist, grip, grasp, index-tip, thumb-tip, or a WebXR joint name.`
      );
    }
    return anchor;
  }
  requireEasing(easing, fallback) {
    if (easing === void 0) {
      return fallback;
    }
    if (!EASINGS.includes(easing)) {
      throw new Error(
        `Unknown easing '${String(easing)}'. Use ${EASINGS.join(" or ")}.`
      );
    }
    return easing;
  }
  requireDuration(duration, what) {
    if (duration === void 0) {
      return 0;
    }
    if (!isFiniteNumber(duration) || duration < 0) {
      throw new Error(`${what} duration must be a number of seconds \u2265 0.`);
    }
    return duration;
  }
  /** True when a placement for a hand needs the anchor/pin path. */
  isHandPlacement(deviceId, anchor, orientation) {
    if (deviceId !== "hand-left" && deviceId !== "hand-right") {
      return false;
    }
    return anchor !== void 0 && anchor !== "target-ray" || orientation === "auto" || !!orientation && typeof orientation === "object" && "fingers" in orientation;
  }
  /**
   * Get the select value for an input device (trigger for controller, pinch for hand)
   */
  getDeviceSelectValue(deviceId) {
    switch (deviceId) {
      case "controller-left":
        return this.device.controllers.left?.getButtonValue("trigger") ?? 0;
      case "controller-right":
        return this.device.controllers.right?.getButtonValue("trigger") ?? 0;
      case "hand-left":
        return this.device.hands.left?.pinchValue ?? 0;
      case "hand-right":
        return this.device.hands.right?.pinchValue ?? 0;
      default:
        throw new Error(`Unknown input device: ${deviceId}`);
    }
  }
  /**
   * Set the select value for an input device
   */
  setDeviceSelectValue(deviceId, value) {
    if (typeof value !== "number" || !(value >= 0 && value <= 1)) {
      throw new Error(`Select value must be within [0, 1], got ${value}.`);
    }
    switch (deviceId) {
      case "controller-left":
        this.device.controllers.left?.updateButtonValue("trigger", value);
        break;
      case "controller-right":
        this.device.controllers.right?.updateButtonValue("trigger", value);
        break;
      case "hand-left":
        this.device.hands.left?.updatePinchValue(value);
        break;
      case "hand-right":
        this.device.hands.right?.updatePinchValue(value);
        break;
      default:
        throw new Error(`Unknown input device: ${deviceId}`);
    }
  }
  /**
   * Set connected state for an input device
   */
  setDeviceConnected(deviceId, connected) {
    switch (deviceId) {
      case "controller-left":
        if (this.device.controllers.left) {
          this.device.controllers.left.connected = connected;
        }
        break;
      case "controller-right":
        if (this.device.controllers.right) {
          this.device.controllers.right.connected = connected;
        }
        break;
      case "hand-left":
        if (this.device.hands.left) {
          this.device.hands.left.connected = connected;
        }
        break;
      case "hand-right":
        if (this.device.hands.right) {
          this.device.hands.right.connected = connected;
        }
        break;
      case "gaze":
        if (!this.device.gaze) {
          throw new Error("Gaze input not available");
        }
        this.device.gaze.connected = connected;
        break;
      default:
        throw new Error(`Unknown input device: ${deviceId}`);
    }
  }
  // =============================================================================
  // Discrete Action Execution
  // =============================================================================
  executeDiscreteAction(action) {
    const { method, params } = action;
    switch (method) {
      // Session tools
      case "get_session_status":
        return this.executeGetSessionStatus();
      case "accept_session":
        return this.executeAcceptSession();
      case "end_session":
        return this.executeEndSession();
      // Transform tools
      case "get_transform":
        return this.executeGetTransform(
          params
        );
      case "set_transform":
        return this.executeSetTransform(
          params
        );
      case "look_at":
        return this.executeLookAt(params);
      // Input tools
      case "set_input_mode":
        return this.executeSetInputMode(
          params
        );
      case "set_connected":
        return this.executeSetConnected(
          params
        );
      case "get_select_value":
        return this.executeGetSelectValue(
          params
        );
      case "set_select_value":
        return this.executeSetSelectValue(
          params
        );
      case "set_hand_pose":
        return this.executeSetHandPose(params);
      // Gamepad tools
      case "get_gamepad_state":
        return this.executeGetGamepadState(
          params
        );
      case "set_gamepad_state":
        return this.executeSetGamepadState(
          params
        );
      // State tools
      case "get_device_state":
        return this.executeGetDeviceState();
      case "set_device_state":
        return this.executeSetDeviceState(
          params
        );
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }
  // =============================================================================
  // Session Tool Implementations
  // =============================================================================
  executeGetSessionStatus() {
    const runtime = this.device[P_DEVICE].runtime;
    const session = runtime.getSession();
    return {
      deviceName: this.device.name,
      isRuntimeInstalled: true,
      sessionActive: !!session,
      sessionOffered: runtime.kind === "emulated" && this.device.sessionOffered,
      sessionMode: session?.mode ?? null,
      enabledFeatures: session ? Array.from(session.enabledFeatures) : [],
      visibilityState: session?.visibilityState ?? this.device.visibilityState,
      runtimeKind: runtime.kind
    };
  }
  executeAcceptSession() {
    if (this.device[P_DEVICE].runtime.kind === "native") {
      throw new Error(
        "Session start is app-driven in native override mode; immersive sessions require a user gesture."
      );
    }
    if (!this.device.sessionOffered) {
      throw new Error("No session has been offered");
    }
    this.device.grantOfferedSession();
    return { success: true };
  }
  executeEndSession() {
    const session = this.device[P_DEVICE].runtime.getSession();
    if (!session) {
      throw new Error("No active session");
    }
    session.end();
    return { success: true };
  }
  // =============================================================================
  // Transform Tool Implementations
  // =============================================================================
  executeGetTransform(params) {
    const { device: deviceId } = params;
    const transform = this.getDeviceTransformInOrigin(deviceId);
    return {
      device: deviceId,
      position: transform.position,
      orientation: transform.orientation,
      euler: quatToEuler(transform.orientation)
    };
  }
  executeSetTransform(params) {
    const { device: deviceId, position, orientation, anchor } = params;
    if (this.isHandPlacement(deviceId, anchor, orientation)) {
      this.placeHand(deviceId, position, orientation, anchor);
    } else {
      if (anchor !== void 0) {
        this.requireAnchor(anchor);
      }
      this.setDeviceTransformInOrigin(
        deviceId,
        position,
        orientation ? normalizeOrientation(orientation) : void 0
      );
      if (deviceId === "hand-left" || deviceId === "hand-right") {
        this.handFor(deviceId).setPin(null);
      }
    }
    const newTransform = this.getDeviceTransformInOrigin(deviceId);
    return {
      device: deviceId,
      position: newTransform.position,
      orientation: newTransform.orientation
    };
  }
  /**
   * Places a hand by an anchor and/or a hand orientation, and pins it there:
   * the anchor stays put (and the wrist keeps its rotation) while the hand's
   * shape changes.
   */
  placeHand(deviceId, position, orientation, anchorInput) {
    const hand = this.requireLiveHand(deviceId);
    const anchor = this.requireAnchor(anchorInput ?? "target-ray");
    const target = position ? this.toVec3(this.transformXROriginToGlobal(position), "position") : this.anchorPosition(hand, anchor);
    const { wristRotation, rayRotation } = this.resolveHandOrientation(
      hand,
      orientation,
      target
    );
    if (rayRotation) {
      hand.quaternion.set(
        rayRotation.x,
        rayRotation.y,
        rayRotation.z,
        rayRotation.w
      );
    }
    hand.setPin({
      anchor,
      target,
      wristRotation: wristRotation ?? (rayRotation ? void 0 : hand.pin?.wristRotation)
    });
  }
  executeLookAt(params) {
    const { device: deviceId, target, moveToDistance } = params;
    if (deviceId === "gaze" && moveToDistance !== void 0) {
      throw new Error(
        "Gaze origin is derived from the headset; moveToDistance is not supported for gaze."
      );
    }
    const currentTransform = this.getDeviceTransform(deviceId);
    const targetInGlobal = this.transformXROriginToGlobal(target);
    const direction = directionTo(currentTransform.position, targetInGlobal);
    const lookQuat = deviceId === "headset" ? lookRotationGimbal(direction) : lookRotation2(direction);
    let newPosition;
    if (moveToDistance !== void 0) {
      newPosition = {
        x: targetInGlobal.x - direction.x * moveToDistance,
        y: targetInGlobal.y - direction.y * moveToDistance,
        z: targetInGlobal.z - direction.z * moveToDistance
      };
    }
    if (deviceId === "hand-left" || deviceId === "hand-right") {
      this.handFor(deviceId).setPin(null);
    }
    this.setDeviceTransform(deviceId, newPosition, lookQuat);
    const newTransform = this.getDeviceTransformInOrigin(deviceId);
    return {
      device: deviceId,
      position: newTransform.position,
      orientation: newTransform.orientation
    };
  }
  // =============================================================================
  // Input Tool Implementations
  // =============================================================================
  executeSetInputMode(params) {
    const { mode } = params;
    if (mode !== this.device.primaryInputMode) {
      this.releaseHands();
    }
    this.device.primaryInputMode = mode;
    const activeDevices = [];
    if (mode === "controller") {
      if (this.device.controllers.left?.connected) {
        activeDevices.push("controller-left");
      }
      if (this.device.controllers.right?.connected) {
        activeDevices.push("controller-right");
      }
    } else {
      if (this.device.hands.left?.connected) {
        activeDevices.push("hand-left");
      }
      if (this.device.hands.right?.connected) {
        activeDevices.push("hand-right");
      }
    }
    if (this.device.gaze?.connected) {
      activeDevices.push("gaze");
    }
    return { mode, activeDevices };
  }
  executeSetConnected(params) {
    const { device: deviceId, connected } = params;
    if (!connected && (deviceId === "hand-left" || deviceId === "hand-right")) {
      this.handFor(deviceId).setPin(null);
    }
    this.setDeviceConnected(deviceId, connected);
    return { device: deviceId, connected };
  }
  executeGetSelectValue(params) {
    const { device: deviceId } = params;
    const value = this.getDeviceSelectValue(deviceId);
    return { device: deviceId, value };
  }
  executeSetSelectValue(params) {
    const { device: deviceId, value } = params;
    this.setDeviceSelectValue(deviceId, value);
    return { device: deviceId, value };
  }
  executeSetHandPose(params) {
    const handInput = this.handFor(params.device);
    const { poseId, fingers } = this.parseHandPose(handInput, params);
    handInput.poseId = poseId;
    for (const finger of Object.keys(fingers)) {
      handInput.setFingerPose(
        finger,
        fingers[finger].poseId,
        fingers[finger].weight
      );
    }
    return { device: params.device, poseId, fingers: handInput.fingerPoses };
  }
  /** Validates set_hand_pose's pose and finger blends against the hand's poses. */
  parseHandPose(handInput, params) {
    const { poseId, fingers } = params;
    const available = handInput.poseIds;
    const requireKnown = (id) => {
      if (typeof id !== "string" || !available.includes(id)) {
        throw new Error(
          `Unknown hand pose '${id}'. Available poses: ${available.join(", ")}.`
        );
      }
      return id;
    };
    requireKnown(poseId);
    if (fingers !== void 0 && (fingers === null || typeof fingers !== "object" || Array.isArray(fingers))) {
      throw new Error("fingers must map finger names to poses.");
    }
    const fingerNames = Object.keys(handFingerJoints);
    const blends = {};
    for (const [finger, blend] of Object.entries(fingers ?? {})) {
      if (!fingerNames.includes(finger)) {
        throw new Error(
          `Unknown finger '${finger}'. Fingers: ${fingerNames.join(", ")}.`
        );
      }
      if (typeof blend !== "string" && (!blend || typeof blend !== "object")) {
        throw new Error(
          `Finger '${finger}' takes a pose id or { poseId, weight }.`
        );
      }
      const { poseId: fingerPoseId, weight = 1 } = typeof blend === "string" ? { poseId: blend } : blend;
      if (typeof weight !== "number" || !(weight >= 0 && weight <= 1)) {
        throw new Error(`Finger weight must be within [0, 1], got ${weight}.`);
      }
      blends[finger] = {
        poseId: requireKnown(fingerPoseId),
        weight
      };
    }
    return { poseId, fingers: blends };
  }
  executeGetHandState(params) {
    const hand = this.handFor(params.device);
    const toOrigin = (v) => this.transformGlobalToXROrigin(vec3FromGl(v));
    const rotateToOrigin = (v) => {
      const r = quat_exports.invert(quat_exports.create(), this.originRotation());
      const out = vec3_exports.transformQuat(
        vec3_exports.create(),
        v,
        quat_exports.multiply(r, r, hand.quaternion.quat)
      );
      return vec3FromGl(out);
    };
    const anchors = {};
    for (const name of [
      "wrist",
      "grip",
      "grasp",
      "index-tip",
      "thumb-tip"
    ]) {
      anchors[name] = toOrigin(this.anchorPosition(hand, name));
    }
    const axes = hand.handAxes();
    const transform = this.getDeviceTransformInOrigin(params.device);
    const pin = hand.pin;
    const state = {
      device: params.device,
      connected: hand.connected,
      poseId: hand.poseId,
      fingers: hand.fingerPoses,
      transition: hand.poseTransitionProgress === null ? null : {
        from: hand.poseTransitionFrom,
        progress: hand.poseTransitionProgress
      },
      pinchValue: hand.pinchValue,
      pressed: hand.inputSource.gamepad.buttons[0].pressed,
      position: transform.position,
      orientation: transform.orientation,
      pin: pin ? { anchor: pin.anchor, target: toOrigin(pin.target) } : null,
      anchors,
      axes: {
        fingers: rotateToOrigin(axes.fingers),
        palm: rotateToOrigin(axes.palm),
        thumb: rotateToOrigin(axes.thumb)
      }
    };
    if (params.joints === "all") {
      state.joints = {};
      for (const jointName of Object.values(XRHandJoint)) {
        state.joints[jointName] = {
          position: toOrigin(this.anchorPosition(hand, jointName)),
          radius: hand.inputSource.hand.get(jointName)[P_JOINT_SPACE].radius
        };
      }
    }
    return state;
  }
  // =============================================================================
  // World / scene queries (require the synthetic environment module, SEM)
  // =============================================================================
  requireSem() {
    const sem = this.device.sem;
    if (!sem) {
      throw new Error(
        "Scene understanding (SEM) is not installed on this device. Install @iwer/sem to query the emulated world."
      );
    }
    return sem;
  }
  executeGetObjects() {
    const sem = this.requireSem();
    const objects = [];
    sem.trackedPlanes.forEach((plane) => {
      objects.push({
        type: "plane",
        semanticLabel: plane.semanticLabel ?? null
      });
    });
    sem.trackedMeshes.forEach((mesh) => {
      objects.push({ type: "mesh", semanticLabel: mesh.semanticLabel ?? null });
    });
    return { objects };
  }
  executeGetWorldState() {
    const sem = this.requireSem();
    return {
      planeCount: sem.trackedPlanes.size,
      meshCount: sem.trackedMeshes.size,
      objects: this.executeGetObjects().objects
    };
  }
  // =============================================================================
  // Capability discovery & transport
  // =============================================================================
  /**
   * Describe the methods this interface exposes so an agent (or an MCP bridge)
   * can discover capabilities at runtime rather than relying on hard-coded
   * strings. `immediate` methods run synchronously; `requiresSession` methods
   * are queued and need an active, rendering XR session.
   */
  listMethods() {
    const methods = [];
    _RemoteControlInterface.IMMEDIATE_METHODS.forEach((method) => {
      methods.push({ method, immediate: true, requiresSession: false });
    });
    _RemoteControlInterface.SESSION_REQUIRED_METHODS.forEach((method) => {
      methods.push({ method, immediate: false, requiresSession: true });
    });
    return methods;
  }
  /** Alias for {@link listMethods}; returns the capability manifest. */
  describe() {
    return this.listMethods();
  }
  /**
   * Opt-in transport bridge. Connect a message port (a MessagePort, Worker, or
   * WebSocket-like object) so a remote agent can drive the device by posting
   * `{ id, method, params }` envelopes and receiving `{ id, result }` or
   * `{ id, error }` replies. Kept out of the constructor to preserve the
   * dependency-light, in-process default.
   */
  connectTransport(port) {
    port.addEventListener("message", (event) => {
      const envelope = event.data;
      if (!envelope || typeof envelope.method !== "string") {
        return;
      }
      const { id, method, params } = envelope;
      this.dispatch(method, params ?? {}).then((result) => port.postMessage({ id, result })).catch(
        (error) => port.postMessage({
          id,
          error: error instanceof Error ? error.message : String(error)
        })
      );
    });
  }
  // =============================================================================
  // Gamepad Tool Implementations
  // =============================================================================
  executeGetGamepadState(params) {
    const { device: deviceId } = params;
    const hand = deviceId === "controller-left" ? "left" : "right";
    const controller = this.device.controllers[hand];
    if (!controller) {
      throw new Error(`Controller ${hand} not available`);
    }
    const buttonInternalNames = [
      "trigger",
      "squeeze",
      "thumbstick",
      hand === "left" ? "x-button" : "a-button",
      hand === "left" ? "y-button" : "b-button",
      "thumbrest"
    ];
    const buttons = buttonInternalNames.map((name, index) => ({
      index,
      name: name.replace("x-button", "x").replace("y-button", "y").replace("a-button", "a").replace("b-button", "b"),
      value: controller.getButtonValue(name),
      touched: controller.getButtonTouched(name),
      pressed: controller.getButtonPressed(name)
    }));
    const axesData = controller.getAxes();
    const axes = [
      { index: 0, name: "thumbstick-x", value: axesData.x },
      { index: 1, name: "thumbstick-y", value: axesData.y }
    ];
    return {
      device: deviceId,
      connected: controller.connected,
      buttons,
      axes
    };
  }
  executeSetGamepadState(params) {
    const { device: deviceId, buttons, axes } = params;
    const hand = deviceId === "controller-left" ? "left" : "right";
    const controller = this.device.controllers[hand];
    if (!controller) {
      throw new Error(`Controller ${hand} not available`);
    }
    let buttonsSet = 0;
    let axesSet = 0;
    const buttonIndexToName = [
      "trigger",
      "squeeze",
      "thumbstick",
      hand === "left" ? "x-button" : "a-button",
      hand === "left" ? "y-button" : "b-button",
      "thumbrest"
    ];
    if (buttons) {
      for (const btn of buttons) {
        const buttonName = buttonIndexToName[btn.index];
        if (buttonName && isFiniteNumber(btn.value)) {
          controller.updateButtonValue(buttonName, clamp2(btn.value, 0, 1));
          if (btn.touched !== void 0) {
            controller.updateButtonTouch(buttonName, btn.touched);
          }
          buttonsSet++;
        }
      }
    }
    if (axes) {
      let xValue;
      let yValue;
      for (const axis of axes) {
        if (!isFiniteNumber(axis.value)) {
          continue;
        }
        if (axis.index === 0) {
          xValue = clamp2(axis.value, -1, 1);
          axesSet++;
        } else if (axis.index === 1) {
          yValue = clamp2(axis.value, -1, 1);
          axesSet++;
        }
      }
      if (xValue !== void 0 || yValue !== void 0) {
        const currentAxes = controller.getAxes();
        controller.updateAxes(
          "thumbstick",
          xValue ?? currentAxes.x,
          yValue ?? currentAxes.y
        );
      }
    }
    return { device: deviceId, buttonsSet, axesSet };
  }
  // =============================================================================
  // State Tool Implementations
  // =============================================================================
  executeGetDeviceState() {
    const identity3 = {
      position: { x: 0, y: 0, z: 0 },
      orientation: { x: 0, y: 0, z: 0, w: 1 }
    };
    const inOrigin = (deviceId, present) => present ? this.getDeviceTransformInOrigin(deviceId) : identity3;
    const controller = (side) => {
      const input = this.device.controllers[side];
      return {
        connected: input?.connected ?? false,
        ...inOrigin(`controller-${side}`, !!input)
      };
    };
    const hand = (side) => {
      const input = this.device.hands[side];
      return {
        connected: input?.connected ?? false,
        ...inOrigin(`hand-${side}`, !!input),
        ...input ? { poseId: input.poseId, pinchValue: input.pinchValue } : {}
      };
    };
    return {
      headset: this.getDeviceTransformInOrigin("headset"),
      inputMode: this.device.primaryInputMode,
      controllers: { left: controller("left"), right: controller("right") },
      hands: { left: hand("left"), right: hand("right") },
      ...this.device.gaze ? {
        gaze: {
          connected: this.device.gaze.connected,
          orientation: this.getDeviceTransformInOrigin("gaze").orientation
        }
      } : {},
      stereoEnabled: this.device.stereoEnabled,
      fov: this.device.fovy * (180 / Math.PI)
      // Convert to degrees
    };
  }
  executeSetDeviceState(params) {
    const { state } = params;
    this.releaseHands();
    if (!state) {
      this.cancelHeldInputs();
      this.sequenceBody = null;
      this.device.position.set(0, 1.6, 0);
      this.device.quaternion.set(0, 0, 0, 1);
      this.device.primaryInputMode = "controller";
      this.device.stereoEnabled = false;
      if (this.device.controllers.left) {
        this.device.controllers.left.position.set(-0.2, 1.4, -0.3);
        this.device.controllers.left.quaternion.set(0, 0, 0, 1);
        this.device.controllers.left.connected = true;
      }
      if (this.device.controllers.right) {
        this.device.controllers.right.position.set(0.2, 1.4, -0.3);
        this.device.controllers.right.quaternion.set(0, 0, 0, 1);
        this.device.controllers.right.connected = true;
      }
      if (this.device.hands.left) {
        this.device.hands.left.position.set(-0.15, 1.3, -0.4);
        this.device.hands.left.quaternion.set(0, 0, 0, 1);
        this.device.hands.left.connected = true;
      }
      if (this.device.hands.right) {
        this.device.hands.right.position.set(0.15, 1.3, -0.4);
        this.device.hands.right.quaternion.set(0, 0, 0, 1);
        this.device.hands.right.connected = true;
      }
      if (this.device.gaze) {
        this.device.gaze.quaternion.set(0, 0, 0, 1);
        this.device.gaze.connected = true;
      }
    } else {
      if (state.headset) {
        this.setDeviceTransformInOrigin(
          "headset",
          state.headset.position,
          state.headset.orientation
        );
      }
      if (state.inputMode !== void 0) {
        this.device.primaryInputMode = state.inputMode;
      }
      if (state.stereoEnabled !== void 0) {
        this.device.stereoEnabled = state.stereoEnabled;
      }
      if (state.fov !== void 0) {
        this.device.fovy = state.fov * (Math.PI / 180);
      }
      if (state.controllers) {
        this.applyInputState("controller-left", state.controllers.left);
        this.applyInputState("controller-right", state.controllers.right);
      }
      if (state.hands) {
        for (const side of ["left", "right"]) {
          const handState = state.hands[side];
          this.applyInputState(`hand-${side}`, handState);
          const hand = this.device.hands[side];
          if (hand && handState?.poseId !== void 0) {
            this.parseHandPose(hand, {
              device: `hand-${side}`,
              poseId: handState.poseId
            });
            hand.poseId = handState.poseId;
          }
          if (hand && handState?.pinchValue !== void 0) {
            this.setDeviceSelectValue(`hand-${side}`, handState.pinchValue);
          }
        }
      }
      if (state.gaze) {
        this.applyInputState("gaze", state.gaze);
      }
    }
    return { state: this.executeGetDeviceState() };
  }
  applyInputState(deviceId, state) {
    if (!state) return;
    if (state.connected !== void 0) {
      this.setDeviceConnected(deviceId, state.connected);
    }
    if (state.position || state.orientation) {
      this.setDeviceTransformInOrigin(
        deviceId,
        state.position,
        state.orientation
      );
    }
  }
  /**
   * Activate capture mode for programmatic control.
   * Called when active methods are executed.
   */
  activateCaptureMode() {
    if (!this._isCaptured) {
      this._isCaptured = true;
      this.cancelReleaseTimer();
      this.device.controlMode = "programmatic";
    }
    this.startReleaseTimer();
  }
  /**
   * Dispatch a method call.
   *
   * Immediate methods (queries, session management) execute synchronously.
   * State-modifying methods require an active session and are queued for frame-synchronized execution.
   *
   * @param method - The method name (e.g., 'get_transform', 'animate_to')
   * @param params - The method parameters
   * @returns Promise that resolves with the method result
   */
  async dispatch(method, params = {}) {
    const normalizedParams = typeof params.device === "string" ? { ...params, device: resolveDeviceId(params.device) } : params;
    if (_RemoteControlInterface.IMMEDIATE_METHODS.has(method)) {
      if (_RemoteControlInterface.ACTIVE_IMMEDIATE_METHODS.has(method)) {
        this.activateCaptureMode();
      }
      return this.executeImmediateMethod(method, normalizedParams);
    }
    if (_RemoteControlInterface.SESSION_REQUIRED_METHODS.has(method)) {
      if (!this.device[P_DEVICE].runtime.getSession()) {
        const guidance = this.device[P_DEVICE].runtime.kind === "native" ? "The application must start its native immersive session first." : `Use 'get_session_status' to check session state, and 'accept_session' to start a session.`;
        throw new Error(
          `Cannot execute '${method}': No active XR session. ` + guidance
        );
      }
    }
    if (method === "animate_to") {
      return this.enqueueAnimateTo(
        normalizedParams,
        normalizedParams
      );
    }
    if (method === "set_select_value" && normalizedParams.duration !== void 0) {
      return this.enqueueSelectRamp(
        normalizedParams,
        normalizedParams
      );
    }
    if (method === "set_hand_pose" && normalizedParams.duration !== void 0) {
      return this.enqueuePoseFade(
        normalizedParams,
        normalizedParams
      );
    }
    if (method === "microgesture") {
      return this.enqueueMicrogesture(
        normalizedParams,
        normalizedParams
      );
    }
    if (method === "run_sequence") {
      return this.enqueueSequence(
        normalizedParams,
        normalizedParams
      );
    }
    if (method === "select") {
      const selectParams = normalizedParams;
      return this.executeSelectSequence(selectParams);
    }
    return this.enqueueDiscrete(method, normalizedParams);
  }
  /**
   * Execute an immediate method synchronously (not queued).
   * Used for queries and session management that must work outside XR frames.
   */
  executeImmediateMethod(method, params) {
    switch (method) {
      case "get_session_status":
        return this.executeGetSessionStatus();
      case "accept_session":
        return this.executeAcceptSession();
      case "end_session":
        return this.executeEndSession();
      case "get_transform":
        return this.executeGetTransform(
          params
        );
      case "get_select_value":
        return this.executeGetSelectValue(
          params
        );
      case "get_gamepad_state":
        return this.executeGetGamepadState(
          params
        );
      case "get_device_state":
        return this.executeGetDeviceState();
      case "get_hand_state":
        return this.executeGetHandState(
          params
        );
      case "list_targets":
        return this.executeListTargets();
      case "cancel_sequence":
        return this.executeCancelSequence();
      case "get_world_state":
        return this.executeGetWorldState();
      case "get_objects":
        return this.executeGetObjects();
      default:
        throw new Error(`Unknown immediate method: ${method}`);
    }
  }
  // =============================================================================
  // Timed commands
  // =============================================================================
  /**
   * The select value last written for a device: the one waiting for the next
   * frame, else the current one.
   */
  latestSelectValue(deviceId) {
    const side = deviceId.endsWith("left") ? "left" : "right";
    const isHand = deviceId.startsWith("hand");
    const input = isHand ? this.device.hands[side] : this.device.controllers[side];
    const button = input?.inputSource.gamepad?.[P_GAMEPAD].buttonsMap[isHand ? "pinch" : "trigger"];
    return button?.[P_GAMEPAD].pendingValue ?? this.getDeviceSelectValue(deviceId);
  }
  /** A pinch (or trigger) ramp from the value it starts at to `value`. */
  pinchChannel(deviceId, value, durationMs, easing) {
    let from = 0;
    return {
      device: deviceId,
      kind: "pinch",
      durationMs,
      easing,
      begin: () => {
        from = this.latestSelectValue(deviceId);
      },
      apply: (progress) => {
        this.setDeviceSelectValue(deviceId, from + (value - from) * progress);
      }
    };
  }
  /** A pose fade from the hand as shown when it starts. */
  poseChannel(hand, deviceId, pose, durationMs, easing) {
    return {
      device: deviceId,
      kind: "pose",
      durationMs,
      easing,
      begin: () => {
        const { poseId, fingers } = this.parseHandPose(hand, {
          device: deviceId,
          ...pose
        });
        hand.beginPoseTransition(poseId, fingers);
      },
      apply: (progress) => {
        if (hand.poseTransitionProgress !== null) {
          hand.poseTransitionProgress = progress;
        }
      }
    };
  }
  /**
   * The transform channel of animate_to. A hand placed by an anchor or by hand
   * directions moves its pin (the anchor's path, and the wrist's rotation);
   * anything else moves the device pose as before. Start and target are
   * taken when the channel starts.
   */
  moveChannel(params, durationMs, easing) {
    const { device: deviceId, position, orientation, anchor } = params;
    if (this.isHandPlacement(deviceId, anchor, orientation)) {
      let hand;
      let handAnchor;
      const fromTarget = vec3_exports.create();
      const toTarget = vec3_exports.create();
      const fromWrist = quat_exports.create();
      let toWrist;
      let fromRay;
      let toRay;
      const target = vec3_exports.create();
      const rotation = quat_exports.create();
      return {
        device: deviceId,
        kind: "transform",
        durationMs,
        easing,
        begin: () => {
          hand = this.requireLiveHand(deviceId);
          handAnchor = this.requireAnchor(anchor ?? "target-ray");
          vec3_exports.copy(fromTarget, this.anchorPosition(hand, handAnchor));
          vec3_exports.copy(
            toTarget,
            position ? this.toVec3(
              this.transformXROriginToGlobal(position),
              "position"
            ) : fromTarget
          );
          hand.wristRotation(fromWrist);
          const resolved = this.resolveHandOrientation(
            hand,
            orientation,
            toTarget
          );
          toWrist = resolved.wristRotation;
          if (resolved.rayRotation) {
            fromRay = quat_exports.clone(hand.quaternion.quat);
            const r = resolved.rayRotation;
            toRay = quat_exports.fromValues(r.x, r.y, r.z, r.w);
          } else if (!toWrist && hand.pin?.wristRotation) {
            toWrist = quat_exports.clone(hand.pin.wristRotation);
          }
        },
        apply: (progress) => {
          vec3_exports.lerp(target, fromTarget, toTarget, progress);
          if (fromRay && toRay) {
            quat_exports.slerp(rotation, fromRay, toRay, progress);
            hand.quaternion.set(
              rotation[0],
              rotation[1],
              rotation[2],
              rotation[3]
            );
          }
          if (toWrist) {
            quat_exports.slerp(rotation, fromWrist, toWrist, progress);
          }
          hand.setPin({
            anchor: handAnchor,
            target,
            wristRotation: toWrist ? rotation : void 0
          });
        }
      };
    }
    if (anchor !== void 0 && anchor !== "target-ray") {
      this.requireAnchor(anchor);
    }
    let from;
    let toPosition2;
    let toOrientation;
    return {
      device: deviceId,
      kind: "transform",
      durationMs,
      easing,
      begin: () => {
        from = this.getDeviceTransform(deviceId);
        toPosition2 = position ? this.transformXROriginToGlobal(position) : void 0;
        toOrientation = orientation ? this.orientationToGlobal(
          validateAndNormalizeQuat(
            normalizeOrientation(orientation)
          )
        ) : void 0;
        if (deviceId === "hand-left" || deviceId === "hand-right") {
          this.handFor(deviceId).setPin(null);
        }
      },
      apply: (progress) => {
        this.setDeviceTransform(
          deviceId,
          toPosition2 ? lerpVec3(from.position, toPosition2, progress) : void 0,
          toOrientation ? slerpQuat(from.orientation, toOrientation, progress) : void 0
        );
      }
    };
  }
  /** animate_to: one transform channel; the start pose is taken when it starts. */
  enqueueAnimateTo(params, rawParams) {
    const { device: deviceId, position } = params;
    if (deviceId === "gaze" && position) {
      throw new Error(
        "Gaze position is derived from the headset. Move the headset transform instead."
      );
    }
    const durationMs = (params.duration ?? 0.5) * 1e3;
    const easing = this.requireEasing(params.easing, "linear");
    const channel = this.moveChannel(params, durationMs, easing);
    return this.enqueueChannels(
      "animate_to",
      rawParams,
      () => [channel],
      (elapsedMs) => {
        const transform = this.getDeviceTransformInOrigin(deviceId);
        return {
          device: deviceId,
          position: transform.position,
          orientation: transform.orientation,
          actualDuration: elapsedMs / 1e3
        };
      },
      durationMs
    );
  }
  /** set_select_value with a duration: ramps from the current value. */
  enqueueSelectRamp(params, rawParams) {
    const deviceId = requireSelectableDeviceId(params.device);
    const { value } = params;
    const durationMs = this.requireDuration(params.duration, "Select") * 1e3;
    const easing = this.requireEasing(params.easing, "minimum-jerk");
    if (typeof value !== "number" || !(value >= 0 && value <= 1)) {
      throw new Error(`Select value must be within [0, 1], got ${value}.`);
    }
    return this.enqueueChannels(
      "set_select_value",
      rawParams,
      () => {
        if (deviceId === "hand-left" || deviceId === "hand-right") {
          this.requireLiveHand(deviceId);
        }
        return [this.pinchChannel(deviceId, value, durationMs, easing)];
      },
      () => ({ device: deviceId, value }),
      durationMs
    );
  }
  /** set_hand_pose with a duration: fades from the hand as shown. */
  enqueuePoseFade(params, rawParams) {
    const hand = this.handFor(params.device);
    const durationMs = this.requireDuration(params.duration, "Pose") * 1e3;
    const easing = this.requireEasing(params.easing, "minimum-jerk");
    return this.enqueueChannels(
      "set_hand_pose",
      rawParams,
      () => {
        this.requireLiveHand(params.device);
        return [
          this.poseChannel(hand, params.device, params, durationMs, easing)
        ];
      },
      () => ({
        device: params.device,
        poseId: hand.poseId,
        fingers: hand.fingerPoses
      }),
      durationMs
    );
  }
  /**
   * @internal Runs a move, a pose fade and a pinch ramp of one hand together,
   * as one queued action (each takes the params of animate_to, set_hand_pose
   * or set_select_value, without the device). Resolves with get_hand_state
   * once all of them finish. Not a remote method: the channel engine's entry
   * point for hand sequences and tests.
   */
  runHandMotion(deviceId, motion) {
    const hand = this.handFor(deviceId);
    const channels = [];
    if (motion.move) {
      channels.push(
        this.moveChannel(
          { ...motion.move, device: deviceId },
          (motion.move.duration ?? 0.5) * 1e3,
          this.requireEasing(motion.move.easing, "linear")
        )
      );
    }
    if (motion.pose) {
      channels.push(
        this.poseChannel(
          hand,
          deviceId,
          motion.pose,
          this.requireDuration(motion.pose.duration, "Pose") * 1e3,
          this.requireEasing(motion.pose.easing, "minimum-jerk")
        )
      );
    }
    if (motion.pinch) {
      channels.push(
        this.pinchChannel(
          deviceId,
          motion.pinch.value,
          this.requireDuration(motion.pinch.duration, "Select") * 1e3,
          this.requireEasing(motion.pinch.easing, "minimum-jerk")
        )
      );
    }
    return this.enqueueChannels(
      "_hand_motion",
      { device: deviceId },
      () => {
        this.requireLiveHand(deviceId);
        return channels;
      },
      () => this.executeGetHandState({ device: deviceId }),
      Math.max(0, ...channels.map((c) => (c.delayMs ?? 0) + c.durationMs))
    );
  }
  /**
   * Execute select action: press, hold `duration`, release, on the device's
   * pinch channel. A hand closes its pinch over 0.1 s and opens it over 0.1 s
   * around the hold; a controller steps its trigger. Each edge lands on its
   * own frame.
   */
  executeSelectSequence(params) {
    const { device: deviceId, duration = DEFAULT_SELECT_DURATION_S } = params;
    this.getDeviceSelectValue(deviceId);
    const holdMs = Math.max(0, duration) * 1e3;
    const isHand = deviceId === "hand-left" || deviceId === "hand-right";
    const rampMs = isHand ? HAND_PINCH_RAMP_S * 1e3 : 0;
    const phases = [
      () => this.pinchChannel(deviceId, 1, rampMs, "minimum-jerk"),
      () => this.pinchChannel(deviceId, 1, holdMs, "linear"),
      () => this.pinchChannel(deviceId, 0, rampMs, "minimum-jerk")
    ];
    let phase = 0;
    let run;
    return this.enqueueTick(
      "select",
      params,
      {
        estimateMs: holdMs + 2 * rampMs,
        start: () => {
          run = this.channels.run([phases[0]()]);
        },
        tick: (deltaMs) => {
          let leftover = run.advance(deltaMs);
          while (leftover >= 0) {
            phase++;
            if (phase === phases.length) {
              return leftover;
            }
            run = this.channels.run([phases[phase]()]);
            if (phase === 1) {
              run.advance(Math.min(leftover, holdMs));
              return -1;
            }
            leftover = run.advance(leftover);
          }
          return -1;
        },
        result: () => ({ device: deviceId, duration })
      }
    );
  }
  /**
   * microgesture: the thumb swipes or taps on the side of the index finger
   * and the gesture's hand gamepad button pulses for 35 ms, as on Quest. A
   * hand not in the microgesture pose takes it first (0.25 s), letting go of
   * a light pinch; a hand that is selecting must let go first. Runs the
   * pose, pinch and thumb channels of the hand as one queued action.
   */
  enqueueMicrogesture(params, rawParams) {
    const { device: deviceId, gesture } = params;
    const hand = this.handFor(deviceId);
    if (!isMicrogesture(gesture)) {
      throw new Error(
        `gesture must be one of ${MICROGESTURES.join(", ")} (got ${JSON.stringify(gesture)}).`
      );
    }
    if (!hand.poseIds.includes(MICROGESTURE_POSE)) {
      throw new Error(
        `${deviceId} has no '${MICROGESTURE_POSE}' pose to make microgestures from.`
      );
    }
    let run;
    let player;
    let lead = 0;
    return this.enqueueTick("microgesture", rawParams, {
      estimateMs: (MICROGESTURE_READY_S + microgestureSeconds(gesture)) * 1e3,
      start: () => {
        this.requireLiveHand(deviceId);
        if (hand.inputSource.gamepad.buttons[0].pressed) {
          throw new Error(
            `${deviceId} is pinching (select is pressed); let go first (set_select_value 0) before a microgesture.`
          );
        }
        const pinch = this.latestSelectValue(deviceId);
        const channels = [];
        if (!readyForMicrogesture(hand, pinch)) {
          lead = MICROGESTURE_READY_S;
          channels.push(
            this.poseChannel(
              hand,
              deviceId,
              { poseId: MICROGESTURE_POSE },
              lead * 1e3,
              "minimum-jerk"
            )
          );
          if (pinch > 0) {
            channels.push(
              this.pinchChannel(deviceId, 0, lead * 1e3, "minimum-jerk")
            );
          }
        }
        player = new MicrogesturePlayer(hand, gesture);
        channels.push(player.channel(deviceId, lead * 1e3));
        run = this.channels.run(channels);
      },
      tick: (deltaMs) => {
        if (player.releasePending) {
          player.finish();
          return deltaMs;
        }
        let leftover;
        try {
          leftover = run.advance(deltaMs);
        } catch (error) {
          run.stop();
          throw error;
        }
        if (run.interrupted) {
          throw new Error(
            `${deviceId}'s microgesture stopped: remote control let go of the hand.`
          );
        }
        return leftover < 0 || player.releasePending ? -1 : leftover;
      },
      result: () => ({
        device: deviceId,
        gesture,
        button: player.button,
        registeredAtMs: Math.round((lead + (player.pressedAt ?? 0)) * 1e3)
      })
    });
  }
  // =============================================================================
  // Hand sequences
  // =============================================================================
  /**
   * Registers how run_sequence steps turn `target` names into points in the
   * scene: an app framework knows its objects, IWER doesn't. Pass null to
   * remove it.
   */
  setTargetResolver(resolver) {
    this.targetResolver = resolver;
  }
  /** Runs a hand sequence; same as `dispatch('run_sequence', params)`. */
  runSequence(params) {
    return this.dispatch(
      "run_sequence",
      params
    );
  }
  /** What the sequence runner needs from remote control. */
  sequenceHost() {
    return {
      hand: (deviceId) => this.handFor(deviceId),
      liveHand: (deviceId) => this.requireLiveHand(deviceId),
      otherHand: (deviceId) => {
        const other = this.device.hands[deviceId === "hand-left" ? "right" : "left"];
        return other?.connected ? other : void 0;
      },
      headPose: () => ({
        position: vec3_exports.clone(this.device.position.vec3),
        rotation: quat_exports.clone(this.device.quaternion.quat)
      }),
      setHeadPose: (position, rotation) => {
        this.device.position.set(position[0], position[1], position[2]);
        this.device.quaternion.set(
          rotation[0],
          rotation[1],
          rotation[2],
          rotation[3]
        );
      },
      originToGlobal: (position) => this.toVec3(
        this.transformXROriginToGlobal(vec3FromGl(position)),
        "position"
      ),
      globalToOrigin: (position) => this.toVec3(
        this.transformGlobalToXROrigin(vec3FromGl(position)),
        "position"
      ),
      originDirectionToGlobal: (direction) => vec3_exports.transformQuat(vec3_exports.create(), direction, this.originRotation()),
      globalDirectionToOrigin: (direction) => vec3_exports.transformQuat(
        vec3_exports.create(),
        direction,
        quat_exports.invert(quat_exports.create(), this.originRotation())
      ),
      directionToGlobal: (value, what, from, body) => this.directionToGlobal(value, what, from, body),
      anchorPosition: (hand, anchor, graspPinch) => this.anchorPosition(hand, anchor, graspPinch),
      requireAnchor: (anchor) => this.requireAnchor(anchor),
      resolveOrientation: (hand, orientation, target, body) => this.resolveHandOrientation(hand, orientation, target, body),
      parsePose: (hand, poseId, fingers) => this.parseHandPose(hand, {
        device: hand.inputSource.handedness === "left" ? "hand-left" : "hand-right",
        poseId,
        fingers
      }),
      setPinch: (deviceId, value) => this.setDeviceSelectValue(deviceId, value),
      latestPinch: (deviceId) => this.latestSelectValue(deviceId),
      pinchButton: (deviceId) => this.handFor(deviceId).inputSource.gamepad[P_GAMEPAD].buttonsMap.pinch,
      gestureButton: (deviceId, gesture) => this.handFor(deviceId).inputSource.gamepad[P_GAMEPAD].buttonsMap[gesture],
      channels: this.channels,
      resolver: () => this.targetResolver,
      handState: (deviceId) => this.executeGetHandState({ device: deviceId }),
      bodyState: () => this.sequenceBody,
      setBodyState: (state) => {
        this.sequenceBody = {
          forward: vec3_exports.clone(state.forward),
          standing: vec3_exports.clone(state.standing)
        };
      }
    };
  }
  /**
   * run_sequence: validated and planned at dispatch (a dry run answers right
   * away), then run as one timed action holding the head of the queue.
   */
  enqueueSequence(params, rawParams) {
    const host = this.sequenceHost();
    const warnings = [];
    const plan = SequenceRunner.describe(
      host,
      params,
      planSequence(host, params),
      warnings
    );
    if (params.dryRun) {
      try {
        this.requireLiveHand(params.device);
      } catch (error) {
        warnings.push(error.message);
      }
      return Promise.resolve(plan);
    }
    const queuedS = this.queuedMs() / 1e3;
    if (plan.duration + queuedS > SEQUENCE_BUDGET_S) {
      throw new Error(
        `The sequence would take about ${plan.duration.toFixed(1)} s` + (queuedS > 0.05 ? `, after ${queuedS.toFixed(1)} s of commands queued ahead` : "") + `; keep it under ${SEQUENCE_BUDGET_S} s (split it into several run_sequence calls).`
      );
    }
    const segments = planSequence(host, params);
    const deadline = performance.now() + this.SEQUENCE_DEADLINE_MS;
    let runner;
    return this.enqueueTick("run_sequence", rawParams, {
      estimateMs: plan.duration * 1e3,
      start: () => {
        runner = new SequenceRunner(host, params, segments, deadline);
        runner.start();
      },
      tick: (deltaMs) => runner.done ? deltaMs : runner.tick(deltaMs),
      result: () => runner.result(),
      abort: (reason) => {
        this.releaseHands();
        return runner.abort(reason);
      }
    });
  }
  /**
   * cancel_sequence: stops a running sequence at the current frame. Fades,
   * ramps and pins are let go; the pinch stays as it is.
   */
  executeCancelSequence() {
    const head = this.commandQueue[0];
    if (head?.type !== "tick" || head.method !== "run_sequence" || !head.started || !head.abort) {
      return { cancelled: false };
    }
    this.commandQueue.shift();
    this.armWatchdog();
    const sequence = head.abort("cancelled");
    head.resolve(sequence);
    if (this.commandQueue.length === 0) {
      this.startReleaseTimer();
    }
    return { cancelled: true, sequence };
  }
  /** list_targets: what the page's target resolver knows. */
  executeListTargets() {
    if (!this.targetResolver) {
      return { resolver: false, targets: [] };
    }
    return { resolver: true, targets: this.targetResolver.list?.() ?? [] };
  }
  /**
   * Accept an offered XR session (async wrapper for proper session activation)
   */
  async acceptSession() {
    if (this.device[P_DEVICE].runtime.kind === "native") {
      throw new Error(
        "Session start is app-driven in native override mode; immersive sessions require a user gesture."
      );
    }
    if (!this.device.sessionOffered) {
      throw new Error("No session has been offered");
    }
    this.device.grantOfferedSession();
    await waitForCondition(() => !!this.device.activeSession, 5e3);
    return { success: true };
  }
  /**
   * Called when the XR session ends: queued commands can't run against a
   * session that is gone, so they are rejected instead of resuming in the
   * next session.
   */
  onSessionEnd() {
    this.releaseHands();
    this.interruptQueue("session-ended", () => "The XR session ended.");
    if (this._isCaptured) {
      this.startReleaseTimer();
    }
  }
  /**
   * Force release capture mode (for testing/cleanup)
   */
  forceRelease() {
    this.cancelReleaseTimer();
    this._isCaptured = false;
    this.device.controlMode = "manual";
    this.cancelHeldInputs();
    this.releaseHands();
    for (const hand of ["left", "right"]) {
      this.device.controllers[hand]?.updateAxes("thumbstick", 0, 0);
    }
    this.interruptQueue("released", () => "Capture released");
  }
  /**
   * Cancel every held button on both controllers and hands: values drop to 0
   * and a press the app saw ends with `selectend`/`squeezeend` alone.
   */
  cancelHeldInputs() {
    for (const hand of ["left", "right"]) {
      for (const input of [
        this.device.controllers[hand],
        this.device.hands[hand]
      ]) {
        for (const button of input?.inputSource.gamepad?.buttons ?? []) {
          if (button instanceof GamepadButton) {
            cancelButton(button);
          }
        }
      }
    }
  }
};
// =============================================================================
// Public API - Dispatch
// =============================================================================
/**
 * Set of methods that execute immediately (synchronously) without going through the queue.
 * These are queries and session management commands that need to work outside of XR frames.
 */
_RemoteControlInterface.IMMEDIATE_METHODS = /* @__PURE__ */ new Set([
  // Session management - must work before/after XR session
  "get_session_status",
  "accept_session",
  "end_session",
  // Pure queries - just read current state
  "get_transform",
  "get_select_value",
  "get_gamepad_state",
  "get_device_state",
  "get_hand_state",
  "list_targets",
  // Stops a running sequence; must not wait behind it
  "cancel_sequence",
  // World/scene introspection - reads the synthetic environment (SEM)
  "get_world_state",
  "get_objects"
]);
/**
 * Set of immediate methods that are "active" - they modify state and should trigger capture mode.
 * Passive methods (queries) should NOT trigger capture mode.
 */
_RemoteControlInterface.ACTIVE_IMMEDIATE_METHODS = /* @__PURE__ */ new Set([
  "accept_session",
  "end_session"
]);
/**
 * Queued methods that write a device's buttons. A second write to the same
 * device waits for the next frame, so a press and its release never land
 * in one frame (see update()).
 */
_RemoteControlInterface.INPUT_WRITE_METHODS = /* @__PURE__ */ new Set([
  "set_select_value",
  "set_gamepad_state",
  "select",
  "_hand_motion",
  "microgesture",
  "run_sequence"
]);
/**
 * Queued methods that end the queue's work for the frame: they change which
 * input sources exist, which the app hears about before any edge.
 */
_RemoteControlInterface.FRAME_ENDING_METHODS = /* @__PURE__ */ new Set([
  "set_input_mode",
  "set_connected",
  "set_device_state"
]);
/**
 * Set of methods that require an active XR session.
 * These are state-modifying methods that are processed during frame updates.
 */
_RemoteControlInterface.SESSION_REQUIRED_METHODS = /* @__PURE__ */ new Set([
  "set_transform",
  "look_at",
  "animate_to",
  "set_input_mode",
  "set_connected",
  "set_select_value",
  "select",
  "set_gamepad_state",
  "set_device_state",
  "set_hand_pose",
  "microgesture",
  "run_sequence"
]);
var RemoteControlInterface = _RemoteControlInterface;

// ../../../wlp/build/webxr-layers-polyfill.module.js
var XRTextureType2;
(function(XRTextureType3) {
  XRTextureType3["texture"] = "texture";
  XRTextureType3["texture-array"] = "texture-array";
})(XRTextureType2 || (XRTextureType2 = {}));
var XRLayerLayout;
(function(XRLayerLayout2) {
  XRLayerLayout2["default"] = "default";
  XRLayerLayout2["mono"] = "mono";
  XRLayerLayout2["stereo"] = "stereo";
  XRLayerLayout2["stereo-left-right"] = "stereo-left-right";
  XRLayerLayout2["stereo-top-bottom"] = "stereo-top-bottom";
})(XRLayerLayout || (XRLayerLayout = {}));
var isReferenceSpace = (arg) => {
  return arg && typeof arg.getOffsetReferenceSpace === "function";
};
var getGlobal = () => {
  return typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
};
var getFormatsFromInternalFormat = (context, providedFormat) => {
  switch (providedFormat) {
    case context.RGBA8:
    case context.RGB5_A1:
    case context.RGBA4:
    case context.SRGB8_ALPHA8:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA,
        type: context.UNSIGNED_BYTE
      };
    case context.RGBA8_SNORM:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA,
        type: context.BYTE
      };
    case context.RGB10_A2:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA,
        type: context.UNSIGNED_INT_2_10_10_10_REV
      };
    case context.RGBA16F:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA,
        type: context.HALF_FLOAT
      };
    case context.RGBA32F:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA,
        type: context.FLOAT
      };
    case context.RGBA8UI:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA_INTEGER,
        type: context.UNSIGNED_BYTE
      };
    case context.RGBA8I:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA_INTEGER,
        type: context.BYTE
      };
    case context.RGBA16UI:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA_INTEGER,
        type: context.UNSIGNED_SHORT
      };
    case context.RGBA16I:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA_INTEGER,
        type: context.SHORT
      };
    case context.RGBA32UI:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA_INTEGER,
        type: context.UNSIGNED_INT
      };
    case context.RGBA32I:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA_INTEGER,
        type: context.INT
      };
    case context.RGB10_A2UI:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGBA_INTEGER,
        type: context.UNSIGNED_INT_2_10_10_10_REV
      };
    case context.RGB8:
    case context.RGB565:
    case context.SRGB8:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB,
        type: context.UNSIGNED_BYTE
      };
    case context.RGB8_SNORM:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB,
        type: context.BYTE
      };
    case context.RGB16F:
    case context.R11F_G11F_B10F:
    case context.RGB9_E5:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB,
        type: context.HALF_FLOAT
      };
    case context.RGB32F:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB,
        type: context.FLOAT
      };
    case context.RGB8UI:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB_INTEGER,
        type: context.UNSIGNED_BYTE
      };
    case context.RGB8I:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB_INTEGER,
        type: context.BYTE
      };
    case context.RGB16UI:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB_INTEGER,
        type: context.UNSIGNED_SHORT
      };
    case context.RGB16I:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB_INTEGER,
        type: context.SHORT
      };
    case context.RGB32UI:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB_INTEGER,
        type: context.UNSIGNED_INT
      };
    case context.RGB32I:
      return {
        internalFormat: providedFormat,
        textureFormat: context.RGB_INTEGER,
        type: context.INT
      };
    case context.DEPTH_COMPONENT16:
      return {
        internalFormat: providedFormat,
        textureFormat: context.DEPTH_COMPONENT,
        type: context.UNSIGNED_SHORT
      };
    case context.DEPTH_COMPONENT24:
      return {
        internalFormat: providedFormat,
        textureFormat: context.DEPTH_COMPONENT,
        type: context.UNSIGNED_INT
      };
    case context.DEPTH_COMPONENT32F:
      return {
        internalFormat: providedFormat,
        textureFormat: context.DEPTH_COMPONENT,
        type: context.FLOAT
      };
    case context.DEPTH24_STENCIL8:
      return {
        internalFormat: providedFormat,
        textureFormat: context.DEPTH_STENCIL,
        type: context.UNSIGNED_INT_24_8
      };
    case context.DEPTH32F_STENCIL8:
      return {
        internalFormat: providedFormat,
        textureFormat: context.DEPTH_STENCIL,
        type: context.FLOAT_32_UNSIGNED_INT_24_8_REV
      };
    case context.DEPTH_COMPONENT:
      return getFormatsFromInternalFormat(context, context.DEPTH_COMPONENT24);
    case context.DEPTH_STENCIL:
      return getFormatsFromInternalFormat(context, context.DEPTH24_STENCIL8);
    case context.RGBA:
    case context.RGB:
    case context.LUMINANCE_ALPHA:
    case context.LUMINANCE:
    case context.ALPHA:
      return {
        internalFormat: providedFormat,
        textureFormat: providedFormat,
        type: context.UNSIGNED_BYTE
      };
    default:
      throw new Error("Attempted to create polyfill with unsupported format.");
  }
};
var XRCompositionLayerPolyfill = class {
  constructor() {
    this._hasRunDeferredInitialize = false;
    this._media = null;
  }
  initialize(session, context) {
    this.session = session;
    if (context) {
      this.context = context;
    }
    this.blendTextureSourceAlpha = true;
  }
  destroy() {
    this._colorTextures = [];
    this._depthStencilTextures = [];
  }
  addEventListener(type, listener, options) {
  }
  dispatchEvent(event) {
    return false;
  }
  removeEventListener(type, callback, options) {
  }
  getContext() {
    return this.context;
  }
  getTextureType() {
    throw new Error("Unimplemented");
  }
  get colorTextures() {
    return this._colorTextures;
  }
  get depthStencilTextures() {
    return this._depthStencilTextures;
  }
  get colorTexturesMeta() {
    return this._texturesMeta;
  }
  get media() {
    if (!this.isMediaLayer()) {
      console.warn("Attempted to retrieve media from a non-media layer");
    }
    return this._media;
  }
  determineLayoutAttribute(textureType, context, layout) {
    if (!(context instanceof WebGL2RenderingContext) && textureType === XRTextureType2["texture-array"]) {
      throw new TypeError();
    }
    if (layout === XRLayerLayout.mono) {
      return layout;
    }
    if (layout === XRLayerLayout.default) {
      if (this.session.internalViews && this.session.internalViews.length === 1) {
        return XRLayerLayout["mono"];
      }
      if (textureType === XRTextureType2["texture-array"]) {
        return layout;
      }
    }
    if (layout === XRLayerLayout.default || layout === XRLayerLayout.stereo) {
      return XRLayerLayout["stereo-left-right"];
    }
    return layout;
  }
  isMediaLayer() {
    return this._media !== null;
  }
  _deferredInitialize() {
  }
  initializeIfNeeded() {
    if (!this._hasRunDeferredInitialize) {
      this._hasRunDeferredInitialize = true;
      this._deferredInitialize();
    }
  }
  _allocateColorTexturesInternal(textureType, init) {
    let session = this.session;
    let views = session.internalViews;
    if (!views || views.length === 0) {
      console.warn("We can't allocate color textures without views");
      return;
    }
    this.initializeIfNeeded();
    if (this.layout === XRLayerLayout.mono) {
      if (textureType === XRTextureType2["texture-array"]) {
        const newTexture = this._createNewColorTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.colorFormat);
        this._texturesMeta = [newTexture];
        this._colorTextures = [newTexture.texture];
        return;
      } else {
        const newTexture = this._createNewColorTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.colorFormat);
        this._texturesMeta = [newTexture];
        this._colorTextures = [newTexture.texture];
        return;
      }
    } else if (this.layout === XRLayerLayout.stereo) {
      if (textureType === XRTextureType2["texture-array"]) {
        const newTexture = this._createNewColorTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.colorFormat, 2);
        this._texturesMeta = [newTexture];
        this._colorTextures = [newTexture.texture];
        return;
      } else {
        const texture1 = this._createNewColorTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.colorFormat);
        const texture2 = this._createNewColorTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.colorFormat);
        this._texturesMeta = [texture1, texture2];
        this._colorTextures = [texture1.texture, texture2.texture];
        return;
      }
    } else if (this.layout === XRLayerLayout["stereo-left-right"]) {
      const newTexture = this._createNewColorTexture(init.viewPixelWidth * 2, init.viewPixelHeight, textureType, init.colorFormat);
      this._texturesMeta = [newTexture];
      this._colorTextures = [newTexture.texture];
      return;
    } else if (this.layout === XRLayerLayout["stereo-top-bottom"]) {
      const newTexture = this._createNewColorTexture(init.viewPixelWidth, init.viewPixelHeight * 2, textureType, init.colorFormat);
      this._texturesMeta = [newTexture];
      this._colorTextures = [newTexture.texture];
      return;
    }
  }
  _allocateDepthStencilTexturesInternal(textureType, init) {
    if (!init.depthFormat) {
      this._depthStencilTextures = [];
      return;
    }
    if (this._getSupportedDepthFormats().indexOf(init.depthFormat) < 0) {
      throw new Error("Depth format provided is not supported in non-projection layers.");
    }
    if (init.mipLevels < 1) {
      throw new Error("Invalid miplevel. Miplevel needs to be >= 1");
    }
    if (this.layout === XRLayerLayout.mono) {
      if (textureType === XRTextureType2["texture-array"]) {
        const newTexture = this._createNewDepthStencilTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.depthFormat);
        this._depthStencilTextures = [newTexture.texture];
        return;
      } else {
        const newTexture = this._createNewColorTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.depthFormat);
        this._depthStencilTextures = [newTexture.texture];
        return;
      }
    } else if (this.layout === XRLayerLayout.stereo) {
      if (textureType === XRTextureType2["texture-array"]) {
        const newTexture = this._createNewDepthStencilTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.depthFormat, 2);
        this._depthStencilTextures = [newTexture.texture];
        return;
      } else {
        const texture1 = this._createNewDepthStencilTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.depthFormat);
        const texture2 = this._createNewDepthStencilTexture(init.viewPixelWidth, init.viewPixelHeight, textureType, init.depthFormat);
        this._depthStencilTextures = [texture1.texture, texture2.texture];
        return;
      }
    } else if (this.layout === XRLayerLayout["stereo-left-right"]) {
      const newTexture = this._createNewDepthStencilTexture(init.viewPixelWidth * 2, init.viewPixelHeight, textureType, init.depthFormat);
      this._depthStencilTextures = [newTexture.texture];
      return;
    } else if (this.layout === XRLayerLayout["stereo-top-bottom"]) {
      const newTexture = this._createNewDepthStencilTexture(init.viewPixelWidth, init.viewPixelHeight * 2, textureType, init.depthFormat);
      this._depthStencilTextures = [newTexture.texture];
      return;
    }
  }
  _createNewColorTexture(width, height, textureType, colorFormat, layers = 1) {
    return this._createGenericPolyfillTexture(textureType, width, height, colorFormat, 0, layers);
  }
  _createNewDepthStencilTexture(width, height, textureType, depthFormat, layers = 1) {
    return this._createGenericPolyfillTexture(textureType, width, height, depthFormat, 0, layers);
  }
  _createGenericPolyfillTexture(textureType, width, height, textureFormat, mipmapLevel = 0, numLayers = 1) {
    if (textureType === XRTextureType2["texture-array"] && numLayers <= 1) {
      console.warn("creating a texture array with a single layer...");
    }
    if (textureType === XRTextureType2["texture-array"] && this.context instanceof WebGLRenderingContext) {
      throw new Error("WebGL 1 does not support texture array");
    }
    let texture = this.context.createTexture();
    let textureMeta = {
      width,
      height,
      layers: numLayers,
      type: textureType,
      textureFormat,
      texture
    };
    let internalFormat = textureFormat;
    let texImageType = this.context.UNSIGNED_BYTE;
    if (this.context instanceof WebGL2RenderingContext) {
      const expectedFormats = getFormatsFromInternalFormat(this.context, textureFormat);
      internalFormat = expectedFormats.internalFormat;
      textureFormat = expectedFormats.textureFormat;
      texImageType = expectedFormats.type;
    } else {
      if (textureFormat === this.context.DEPTH_COMPONENT) {
        texImageType = this.context.UNSIGNED_INT;
      }
      if (textureFormat === this.context.DEPTH_STENCIL) {
        texImageType = this.context.UNSIGNED_INT_24_8_WEBGL;
      }
    }
    if (textureType === XRTextureType2["texture-array"] && this.context instanceof WebGL2RenderingContext) {
      console.warn("texture-array layers are supported...questionably in the polyfill at the moment. Use at your own risk.");
      const existingTextureBinding = this.context.getParameter(this.context.TEXTURE_BINDING_2D_ARRAY);
      this.context.bindTexture(this.context.TEXTURE_2D_ARRAY, texture);
      if (this._getSupportedDepthFormats().indexOf(textureFormat) >= 0) {
        this.context.texStorage3D(this.context.TEXTURE_2D_ARRAY, 1, internalFormat, width, height, numLayers);
      } else {
        this.context.texImage3D(this.context.TEXTURE_2D_ARRAY, 0, internalFormat, width, height, numLayers, 0, textureFormat, texImageType, null);
      }
      this.context.bindTexture(this.context.TEXTURE_2D_ARRAY, existingTextureBinding);
    } else {
      const existingTextureBinding = this.context.getParameter(this.context.TEXTURE_BINDING_2D);
      this.context.bindTexture(this.context.TEXTURE_2D, texture);
      this.context.texImage2D(this.context.TEXTURE_2D, 0, internalFormat, width, height, 0, textureFormat, texImageType, null);
      this.context.bindTexture(this.context.TEXTURE_2D, existingTextureBinding);
    }
    return textureMeta;
  }
  _getSupportedDepthFormats() {
    const supportedDepthFormats = [];
    if (this.context instanceof WebGLRenderingContext) {
      if (!this.context.getExtension("WEBGL_depth_texture")) {
        return supportedDepthFormats;
      }
    }
    supportedDepthFormats.push(this.context.DEPTH_COMPONENT, this.context.DEPTH_STENCIL);
    if (this.context instanceof WebGL2RenderingContext) {
      supportedDepthFormats.push(this.context.DEPTH_COMPONENT24, this.context.DEPTH24_STENCIL8);
    }
    return supportedDepthFormats;
  }
};
var defaultCylinderLayerInit = {
  colorFormat: 6408,
  mipLevels: 1,
  layout: XRLayerLayout.mono,
  isStatic: false,
  space: null,
  viewPixelHeight: 0,
  viewPixelWidth: 0,
  textureType: XRTextureType2.texture,
  radius: 2,
  centralAngle: 0.78539,
  aspectRatio: 2
};
var defaultMediaCylinderLayerInit = {
  layout: XRLayerLayout.mono,
  invertStereo: false,
  space: null,
  radius: 2,
  centralAngle: 0.78539
};
var XRCylinderLayer = class extends XRCompositionLayerPolyfill {
  constructor(init, media) {
    super();
    this._media = media !== null && media !== void 0 ? media : null;
    if (this.isMediaLayer()) {
      this.init = Object.assign(Object.assign({}, defaultMediaCylinderLayerInit), init);
    } else {
      this.init = Object.assign(Object.assign({}, defaultCylinderLayerInit), init);
    }
    this.radius = this.init.radius;
    this.centralAngle = this.init.centralAngle;
    this.aspectRatio = this.init.aspectRatio;
    this.space = this.init.space;
    this.layout = this.init.layout;
    const _global = getGlobal();
    if (this.init.transform) {
      this.transform = new _global.XRRigidTransform(init.transform.position, init.transform.orientation);
    } else {
      this.transform = new _global.XRRigidTransform({
        x: 0,
        y: 0,
        z: 0,
        w: 1
      });
    }
    if (!this.isMediaLayer()) {
      this.isStatic = init.isStatic;
    }
  }
  getTextureType() {
    if (this.isMediaLayer()) {
      return XRTextureType2.texture;
    }
    return this.init.textureType;
  }
  _deferredInitialize() {
    let layout = this.determineLayoutAttribute(this.init.textureType, this.context, this.init.layout);
    this.layout = layout;
    this.needsRedraw = true;
  }
  get colorTextures() {
    if (this.isMediaLayer()) {
      throw new Error("Media layers do not have associated textures");
    }
    if (!this._colorTextures || !this._colorTextures.length) {
      this._allocateColorTexturesInternal(this.getTextureType(), this.init);
    }
    return this._colorTextures;
  }
  get depthStencilTextures() {
    if (this.isMediaLayer()) {
      throw new Error("Media layers do not have associated textures");
    }
    if (!this._depthStencilTextures || !this._depthStencilTextures.length) {
      this._allocateDepthStencilTexturesInternal(this.getTextureType(), this.init);
    }
    return this._depthStencilTextures;
  }
  get colorTexturesMeta() {
    if (this.isMediaLayer()) {
      throw new Error("Media layers do not have associated textures");
    }
    if (!this._colorTextures || !this._colorTextures.length) {
      this._allocateColorTexturesInternal(this.getTextureType(), this.init);
    }
    return this._texturesMeta;
  }
  get width() {
    const circumference = 2 * this.radius * Math.PI;
    const percentage = this.centralAngle / (2 * Math.PI);
    return circumference * percentage;
  }
  get height() {
    return this.width / this.aspectRatio;
  }
};
var defaultEquirectLayerInit = {
  colorFormat: 6408,
  mipLevels: 1,
  layout: XRLayerLayout.mono,
  isStatic: false,
  space: null,
  viewPixelHeight: 0,
  viewPixelWidth: 0,
  textureType: XRTextureType2.texture,
  radius: 0,
  centralHorizontalAngle: 6.28318,
  upperVerticalAngle: 1.570795,
  lowerVerticalAngle: -1.570795
};
var defaultMediaEquirectLayerInit = {
  space: null,
  layout: XRLayerLayout.mono,
  invertStereo: false,
  radius: 0,
  centralHorizontalAngle: 6.28318,
  upperVerticalAngle: 1.570795,
  lowerVerticalAngle: -1.570795
};
var XREquirectLayer = class extends XRCompositionLayerPolyfill {
  constructor(init, media) {
    super();
    this._media = media !== null && media !== void 0 ? media : null;
    if (this.isMediaLayer()) {
      this.init = Object.assign(Object.assign({}, defaultMediaEquirectLayerInit), init);
    } else {
      this.init = Object.assign(Object.assign({}, defaultEquirectLayerInit), init);
    }
    if (!isReferenceSpace(this.init.space)) {
      throw new TypeError("Equirect layer's space needs to be an XRReferenceSpace");
    }
    this.radius = this.init.radius;
    this.centralHorizontalAngle = this.init.centralHorizontalAngle;
    this.upperVerticalAngle = this.init.upperVerticalAngle;
    this.lowerVerticalAngle = this.init.lowerVerticalAngle;
    this.space = this.init.space;
    this.layout = this.init.layout;
    const _global = getGlobal();
    if (init.transform) {
      this.transform = new _global.XRRigidTransform(init.transform.position, init.transform.orientation);
    } else {
      this.transform = new _global.XRRigidTransform({
        x: 0,
        y: 0,
        z: 0,
        w: 1
      });
    }
    if (!this.isMediaLayer()) {
      this.isStatic = init.isStatic;
    }
  }
  getTextureType() {
    if (this.isMediaLayer()) {
      return XRTextureType2.texture;
    }
    return this.init.textureType;
  }
  _deferredInitialize() {
    let layout = this.determineLayoutAttribute(this.init.textureType, this.context, this.init.layout);
    this.layout = layout;
    this.needsRedraw = true;
  }
  get colorTextures() {
    if (this.isMediaLayer()) {
      throw new Error("Media layers do not have associated textures");
    }
    if (!this._colorTextures || !this._colorTextures.length) {
      this._allocateColorTexturesInternal(this.getTextureType(), this.init);
    }
    return this._colorTextures;
  }
  get depthStencilTextures() {
    if (this.isMediaLayer()) {
      throw new Error("Media layers do not have associated textures");
    }
    if (!this._depthStencilTextures || !this._depthStencilTextures.length) {
      this._allocateDepthStencilTexturesInternal(this.getTextureType(), this.init);
    }
    return this._depthStencilTextures;
  }
  get colorTexturesMeta() {
    if (this.isMediaLayer()) {
      throw new Error("Media layers do not have associated textures");
    }
    if (!this._colorTextures || !this._colorTextures.length) {
      this._allocateColorTexturesInternal(this.getTextureType(), this.init);
    }
    return this._texturesMeta;
  }
};
var defaultQuadLayerInit = {
  colorFormat: 6408,
  mipLevels: 1,
  layout: XRLayerLayout.mono,
  isStatic: false,
  space: null,
  viewPixelHeight: 0,
  viewPixelWidth: 0,
  textureType: XRTextureType2.texture,
  width: 1,
  height: 1
};
var defaultMediaQuadLayerInit = {
  space: null,
  layout: XRLayerLayout.mono,
  invertStereo: false
};
var XRQuadLayer = class extends XRCompositionLayerPolyfill {
  constructor(init, media) {
    super();
    this._media = media !== null && media !== void 0 ? media : null;
    if (this.isMediaLayer()) {
      this.init = Object.assign(Object.assign({}, defaultMediaQuadLayerInit), init);
    } else {
      this.init = Object.assign(Object.assign({}, defaultQuadLayerInit), init);
    }
    this.width = this.init.width;
    this.height = this.init.height;
    this.space = this.init.space;
    this.layout = this.init.layout;
    const _global = getGlobal();
    if (this.init.transform) {
      this.transform = new _global.XRRigidTransform(init.transform.position, init.transform.orientation);
    } else {
      this.transform = new _global.XRRigidTransform({
        x: 0,
        y: 0,
        z: 0,
        w: 1
      });
    }
    if (!this.isMediaLayer()) {
      this.isStatic = init.isStatic;
    }
  }
  getTextureType() {
    if (this.isMediaLayer()) {
      return XRTextureType2.texture;
    }
    return this.init.textureType;
  }
  _deferredInitialize() {
    let layout = this.determineLayoutAttribute(this.init.textureType, this.context, this.init.layout);
    this.layout = layout;
    this.needsRedraw = true;
  }
  get colorTextures() {
    if (this.isMediaLayer()) {
      throw new Error("Media layers do not have associated textures");
    }
    if (!this._colorTextures || !this._colorTextures.length) {
      this._allocateColorTexturesInternal(this.getTextureType(), this.init);
    }
    return this._colorTextures;
  }
  get depthStencilTextures() {
    if (this.isMediaLayer()) {
      throw new Error("Media layers do not have associated textures");
    }
    if (!this._depthStencilTextures || !this._depthStencilTextures.length) {
      this._allocateDepthStencilTexturesInternal(this.getTextureType(), this.init);
    }
    return this._depthStencilTextures;
  }
  get colorTexturesMeta() {
    if (this.isMediaLayer()) {
      throw new Error("Media layers do not have associated textures");
    }
    if (!this._colorTextures || !this._colorTextures.length) {
      this._allocateColorTexturesInternal(this.getTextureType(), this.init);
    }
    return this._texturesMeta;
  }
};
var XRMediaBindingPolyfill = class {
  constructor(session) {
    this.session = session;
    if (this.session.ended) {
      throw new Error("Session has ended");
    }
  }
  createQuadLayer(video, init) {
    if (this.session.ended) {
      throw new Error("Session has ended");
    }
    if (init.layout === XRLayerLayout.default) {
      throw new TypeError("Media Quad layer cannot be created with layout of default");
    }
    let aspectRatio = this.calculateAspectRatio(video, init.layout);
    if (init.width === void 0 && init.height === void 0) {
      init.width = 1;
    }
    if (init.height === void 0) {
      init.height = init.width / aspectRatio;
    }
    if (init.width === void 0) {
      init.width = init.height / aspectRatio;
    }
    let layer = new XRQuadLayer(init, video);
    layer.needsRedraw = false;
    layer.initialize(this.session);
    return layer;
  }
  createCylinderLayer(video, init) {
    if (this.session.ended) {
      throw new Error("Session has ended");
    }
    if (init.layout === XRLayerLayout.default) {
      throw new TypeError("Media Cylinder layer cannot be created with layout of default");
    }
    let aspectRatio = this.calculateAspectRatio(video, init.layout);
    if (init.aspectRatio === void 0) {
      init.aspectRatio = aspectRatio;
    }
    let layer = new XRCylinderLayer(init, video);
    layer.needsRedraw = false;
    layer.initialize(this.session);
    return layer;
  }
  createEquirectLayer(video, init) {
    if (this.session.ended) {
      throw new Error("Session has ended");
    }
    if (init.layout === XRLayerLayout.default) {
      throw new TypeError("Media Equirect layer cannot be created with layout of default");
    }
    if (!isReferenceSpace(init.space)) {
      throw new Error("Media Equirect layer's space must be of type XRReferenceSpace");
    }
    let layer = new XREquirectLayer(init, video);
    layer.needsRedraw = false;
    layer.initialize(this.session);
    return layer;
  }
  calculateAspectRatio(video, layout) {
    let width = video.videoWidth;
    let height = video.videoHeight;
    if (layout === XRLayerLayout["stereo-left-right"]) {
      width /= 2;
    }
    if (layout === XRLayerLayout["stereo-top-bottom"]) {
      height /= 2;
    }
    return width / height;
  }
};
var defaultXRProjectionLayerInit = {
  textureType: XRTextureType2.texture,
  colorFormat: 6408,
  depthFormat: 6402,
  scaleFactor: 1
};
var XRProjectionLayer2 = class extends XRCompositionLayerPolyfill {
  constructor(init = defaultXRProjectionLayerInit) {
    super();
    this.init = Object.assign(Object.assign({}, defaultXRProjectionLayerInit), init);
  }
  initialize(session, context) {
    super.initialize(session, context);
    this.initializeIfNeeded();
    let baseLayer = session.getBaseLayer();
    this.textureWidth = baseLayer.framebufferWidth * this.init.scaleFactor;
    this.textureHeight = baseLayer.framebufferHeight * this.init.scaleFactor;
  }
  _allocateProjectionColorTextures() {
    let array = [];
    let polyFillArray = [];
    const createTextureArray = () => {
      array = [];
      for (let tex of polyFillArray) {
        array.push(tex.texture);
      }
    };
    let session = this.session;
    let views = session.internalViews;
    if (!views || views.length === 0) {
      console.warn("We can't allocate color textures without views");
      return;
    }
    let baseLayer = session.getBaseLayer();
    let numViews = views.length;
    let width = baseLayer.framebufferWidth * this.init.scaleFactor / views.length;
    let height = baseLayer.framebufferHeight * this.init.scaleFactor;
    if (this.layout === XRLayerLayout.mono || this.layout === XRLayerLayout.default) {
      if (this.init.textureType === XRTextureType2["texture-array"]) {
        let texture = this._createNewColorTexture(width, height, XRTextureType2["texture-array"], this.init.colorFormat, numViews);
        polyFillArray = [texture];
      } else {
        for (let view of views) {
          let texture = this._createNewColorTexture(width, height, XRTextureType2.texture, this.init.colorFormat);
          polyFillArray.push(texture);
        }
      }
      createTextureArray();
      this._colorTexturesMeta = polyFillArray;
      this._colorTextures = array;
      return;
    }
    if (this.layout === XRLayerLayout["stereo-left-right"]) {
      let texture = this._createNewColorTexture(width * numViews, height, this.init.textureType, this.init.colorFormat);
      polyFillArray = [texture];
    } else if (this.layout === XRLayerLayout["stereo-top-bottom"]) {
      let texture = this._createNewColorTexture(width, height * numViews, this.init.textureType, this.init.colorFormat);
      polyFillArray = [texture];
    }
    createTextureArray();
    this._colorTexturesMeta = polyFillArray;
    this._colorTextures = array;
    return;
  }
  _allocateProjectionDepthStencilTextures() {
    let session = this.session;
    let views = session.internalViews;
    if (!views || views.length === 0) {
      return;
    }
    if (this.init.depthFormat === 0) {
      this._depthStencilTextures = [];
      return;
    }
    if (this.context instanceof WebGLRenderingContext) {
      let depthExtension = this.context.getExtension("WEBGL_depth_texture");
      if (!depthExtension) {
        this._depthStencilTextures = [];
        return;
      }
    }
    let array = [];
    let polyFillArray = [];
    const createTextureArray = () => {
      array = [];
      for (let tex of polyFillArray) {
        array.push(tex.texture);
      }
    };
    this.initializeIfNeeded();
    let baseLayer = session.getBaseLayer();
    let numViews = views.length;
    let width = baseLayer.framebufferWidth * this.init.scaleFactor / views.length;
    let height = baseLayer.framebufferHeight * this.init.scaleFactor;
    if (this.layout === XRLayerLayout.mono || this.layout === XRLayerLayout.default) {
      if (this.init.textureType === XRTextureType2["texture-array"]) {
        let texture = this._createNewDepthStencilTexture(width, height, this.init.textureType, this.init.depthFormat, numViews);
        polyFillArray = [texture];
      } else {
        for (let view of views) {
          let texture = this._createNewDepthStencilTexture(width, height, this.init.textureType, this.init.depthFormat);
          polyFillArray.push(texture);
        }
      }
      createTextureArray();
      this._depthStencilTextures = array;
      return;
    }
    if (this.layout === XRLayerLayout["stereo-left-right"]) {
      let texture = this._createNewDepthStencilTexture(width * numViews, height, this.init.textureType, this.init.depthFormat);
      polyFillArray = [texture];
    } else if (this.layout === XRLayerLayout["stereo-top-bottom"]) {
      let texture = this._createNewDepthStencilTexture(width, height * numViews, this.init.textureType, this.init.depthFormat);
      polyFillArray = [texture];
    }
    createTextureArray();
    this._depthStencilTextures = array;
    return;
  }
  get colorTextures() {
    if (!this._colorTextures || !this._colorTextures.length) {
      this._allocateProjectionColorTextures();
    }
    return this._colorTextures;
  }
  get depthStencilTextures() {
    if (this._depthStencilTextures === void 0) {
      this._allocateProjectionDepthStencilTextures();
    }
    return this._depthStencilTextures || [];
  }
  get colorTexturesMeta() {
    if (!this._colorTextures || !this._colorTextures.length) {
      this._allocateProjectionColorTextures();
    }
    return this._colorTexturesMeta;
  }
  getTextureType() {
    return this.init.textureType;
  }
  _deferredInitialize() {
    this.isStatic = false;
    this.ignoreDepthValues = false;
    this.fixedFoveation = 0;
    let layout = this.determineLayoutAttribute(this.init.textureType, this.context, XRLayerLayout.default);
    this.layout = layout;
    this.needsRedraw = true;
    let maxScaleFactor = this.determineMaximumScaleFactor();
    let scaleFactor = Math.min(this.init.scaleFactor, maxScaleFactor);
    this.init.scaleFactor = scaleFactor;
  }
  determineMaximumScaleFactor() {
    let baseLayer = this.session.getBaseLayer(this.context);
    let largestWidth = baseLayer.framebufferWidth;
    let largestHeight = baseLayer.framebufferHeight;
    if (this.layout === XRLayerLayout["stereo-left-right"]) {
      largestWidth *= 2;
    }
    if (this.layout === XRLayerLayout["stereo-top-bottom"]) {
      largestHeight *= 2;
    }
    let largestViewDimension = Math.max(largestWidth, largestHeight);
    let largestTextureDimension = this.context.getParameter(this.context.MAX_TEXTURE_SIZE);
    return largestTextureDimension / largestViewDimension;
  }
};
var initializeViewport = (viewport, texture, layout, offset, numViews) => {
  let x = 0;
  let y = 0;
  let width = texture.width;
  let height = texture.height;
  if (layout === XRLayerLayout["stereo-left-right"]) {
    x = texture.width * offset / numViews;
    width = texture.width / numViews;
  } else if (layout === XRLayerLayout["stereo-top-bottom"]) {
    y = texture.height * offset / numViews;
    height = texture.height / numViews;
  }
  viewport.x = x;
  viewport.y = y;
  viewport.width = width;
  viewport.height = height;
};
var compileShader = (gl, shaderSource, shaderType) => {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    throw "could not compile shader:" + gl.getShaderInfoLog(shader);
  }
  return shader;
};
var createProgram = (gl, vertexShader2, fragmentShader2) => {
  const program = gl.createProgram();
  const compiledVS = compileShader(gl, vertexShader2, gl.VERTEX_SHADER);
  const compiledFS = compileShader(gl, fragmentShader2, gl.FRAGMENT_SHADER);
  gl.attachShader(program, compiledVS);
  gl.attachShader(program, compiledFS);
  gl.deleteShader(compiledVS);
  gl.deleteShader(compiledFS);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    throw "program failed to link:" + gl.getProgramInfoLog(program);
  }
  return program;
};
var setRectangle = (gl, x, y, width, height) => {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.DYNAMIC_DRAW);
};
var applyVAOExtension = (gl) => {
  if (gl instanceof WebGL2RenderingContext) {
    return gl;
  }
  const ext = gl.getExtension("OES_vertex_array_object");
  if (!ext) {
    throw new Error("Cannot use VAOs.");
  }
  return {
    VERTEX_ARRAY_BINDING: ext.VERTEX_ARRAY_BINDING_OES,
    bindVertexArray: ext.bindVertexArrayOES.bind(ext),
    createVertexArray: ext.createVertexArrayOES.bind(ext),
    deleteVertexArray: ext.deleteVertexArrayOES.bind(ext),
    isVertexArray: ext.isVertexArrayOES.bind(ext)
  };
};
var glsl = (x) => x;
var vertexShader = glsl`
attribute vec2 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;

void main() {
   // convert the rectangle from pixels to 0.0 to 1.0
   vec2 zeroToOne = a_position;

   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;

   gl_Position = vec4(clipSpace * vec2(1, 1), 0, 1);

   // pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
   v_texCoord = a_texCoord;
}
`;
var fragmentShader = glsl`
precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
   	vec4 tex = texture2D(u_image, v_texCoord);
	gl_FragColor = vec4(tex.rgb, tex.a);
}
`;
var ProjectionRenderer = class {
  constructor(layer, context) {
    this.gl = context;
    this.layer = layer;
    this.program = createProgram(this.gl, vertexShader, fragmentShader);
    this.programInfo = {
      attribLocations: {
        a_position: this.gl.getAttribLocation(this.program, "a_position"),
        a_texCoord: this.gl.getAttribLocation(this.program, "a_texCoord")
      }
    };
    this._createVAOs();
  }
  render(session) {
    let gl = this.gl;
    let baseLayer = session.getBaseLayer();
    gl.viewport(0, 0, baseLayer.framebufferWidth, baseLayer.framebufferHeight);
    const textureType = this.layer.getTextureType();
    const existingTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
    const existingActiveTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
    if (textureType === XRTextureType2.texture) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.layer.colorTextures[0]);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    } else {
      throw new Error(`Created a texture projection renderer instead of a texture-array projection renderer for a texture-array layer.
This is probably an error with the polyfill itself; please file an issue on Github if you run into this.`);
    }
    for (let view of session.internalViews) {
      let viewport = baseLayer.getViewport(view);
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      if (this._shouldUseStereoTexturePoints()) {
        this._renderInternalStereo(view);
      } else {
        this._renderInternal();
      }
    }
    gl.activeTexture(existingActiveTexture);
    gl.bindTexture(gl.TEXTURE_2D, existingTextureBinding);
  }
  _renderInternal() {
    let gl = this.gl;
    const existingProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this.program);
    this.vaoGl.bindVertexArray(this.vao);
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
    this.vaoGl.bindVertexArray(null);
    gl.useProgram(existingProgram);
  }
  _renderInternalStereo(view) {
    if (view.eye === "none") {
      return this._renderInternal();
    }
    let gl = this.gl;
    this.vaoGl.bindVertexArray(this.vao);
    const existingProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this.program);
    this._setStereoTextureBuffer(view.eye === "right" ? 1 : 0);
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
    this.vaoGl.bindVertexArray(null);
    gl.useProgram(existingProgram);
  }
  _createVAOs() {
    this._createTextureUVs();
    let gl = this.gl;
    this.vaoGl = applyVAOExtension(gl);
    let positionBuffer = gl.createBuffer();
    this.vao = this.vaoGl.createVertexArray();
    this.vaoGl.bindVertexArray(this.vao);
    gl.enableVertexAttribArray(this.programInfo.attribLocations.a_position);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRectangle(gl, 0, 0, 1, 1);
    let size = 2;
    let type = gl.FLOAT;
    let normalize4 = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(this.programInfo.attribLocations.a_position, size, type, normalize4, stride, offset);
    this.texcoordBuffer = gl.createBuffer();
    gl.enableVertexAttribArray(this.programInfo.attribLocations.a_texCoord);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.texturePoints, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(this.programInfo.attribLocations.a_texCoord, size, type, normalize4, stride, offset);
    this.vaoGl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  _setStereoTextureBuffer(index) {
    let gl = this.gl;
    gl.enableVertexAttribArray(this.programInfo.attribLocations.a_texCoord);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.stereoTexturePoints[index], gl.STATIC_DRAW);
    var size = 2;
    var type = gl.FLOAT;
    var normalize4 = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(this.programInfo.attribLocations.a_texCoord, size, type, normalize4, stride, offset);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  _createTextureUVs() {
    this.texturePoints = new Float32Array([
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      1
    ]);
    const viewport = {
      x: 0,
      y: 0,
      width: 1,
      height: 1
    };
    if (this._shouldUseStereoTexturePoints()) {
      this.stereoTexturePoints = [];
      initializeViewport(viewport, this.layer.colorTexturesMeta[0], this.layer.layout, 0, 2);
      this.stereoTexturePoints[0] = this._offsetTextureUVsByRect(this.layer.colorTexturesMeta[0], this.texturePoints, viewport);
      initializeViewport(viewport, this.layer.colorTexturesMeta[0], this.layer.layout, 1, 2);
      this.stereoTexturePoints[1] = this._offsetTextureUVsByRect(this.layer.colorTexturesMeta[0], this.texturePoints, viewport);
    }
  }
  _offsetTextureUVsByRect(texture, inArray, textureRect) {
    textureRect = textureRect !== null && textureRect !== void 0 ? textureRect : {
      x: 0,
      y: 0,
      width: texture.width,
      height: texture.height
    };
    const uX = textureRect.x / texture.width;
    const vY = textureRect.y / texture.height;
    const uW = textureRect.width / texture.width;
    const vH = textureRect.height / texture.height;
    const outArray = [];
    for (let i = 0; i < inArray.length; i += 2) {
      let u = inArray[i];
      let v = inArray[i + 1];
      let newU = u * uW + uX;
      let newV = v * vH + vY;
      outArray[i] = newU;
      outArray[i + 1] = newV;
    }
    return new Float32Array(outArray);
  }
  _shouldUseStereoTexturePoints() {
    return this.layer.layout === XRLayerLayout["stereo-left-right"] || this.layer.layout === XRLayerLayout["stereo-top-bottom"];
  }
};
var texArrayVertexShader = glsl`#version 300 es

in vec2 a_position;
in vec2 a_texCoord;

out vec2 v_texCoord;

void main() {
	// convert the rectangle from pixels to 0.0 to 1.0
	vec2 zeroToOne = a_position;

	// convert from 0->1 to 0->2
	vec2 zeroToTwo = zeroToOne * 2.0;

	// convert from 0->2 to -1->+1 (clipspace)
	vec2 clipSpace = zeroToTwo - 1.0;

	gl_Position = vec4(clipSpace * vec2(1, 1), 0, 1);

	// pass the texCoord to the fragment shader
	// The GPU will interpolate this value between points.
	v_texCoord = a_texCoord;
}
`;
var texArrayFragmentShader = glsl`#version 300 es
precision mediump float;
precision mediump int;
precision mediump sampler2DArray;

uniform sampler2DArray u_image;
uniform int u_layer;

in vec2 v_texCoord;

out vec4 fragColor;

void main() {
	vec4 tex = texture(u_image, vec3(v_texCoord.x, v_texCoord.y, u_layer));
 	fragColor = vec4(tex.rgb, tex.a);
}

`;
var ProjectionTextureArrayRenderer = class extends ProjectionRenderer {
  constructor(layer, context) {
    super(layer, context);
    this.program = createProgram(this.gl, texArrayVertexShader, texArrayFragmentShader);
    this._createVAOs();
    this.u_layerInfo = this.gl.getUniformLocation(this.program, "u_layer");
  }
  render(session) {
    let gl = this.gl;
    let textureType = this.layer.getTextureType();
    if (textureType === XRTextureType2.texture) {
      throw new Error("Using texture array projection renderer on a layer without texture array.");
    }
    let baseLayer = session.getBaseLayer();
    const existingTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D_ARRAY);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.layer.colorTextures[0]);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    for (let view of session.internalViews) {
      let index = session.getViewIndex(view);
      let viewport = baseLayer.getViewport(view);
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      this._renderInternal(index);
    }
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, existingTextureBinding);
  }
  _renderInternal(layer = 0) {
    let gl = this.gl;
    const existingProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);
    gl.uniform1i(this.u_layerInfo, layer);
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
    gl.bindVertexArray(null);
    gl.useProgram(existingProgram);
  }
};
var createProjectionRenderer = (layer, context) => {
  if (layer.getTextureType() === XRTextureType2["texture-array"]) {
    if (context instanceof WebGL2RenderingContext) {
      return new ProjectionTextureArrayRenderer(layer, context);
    }
  }
  return new ProjectionRenderer(layer, context);
};
var ARRAY_TYPE2 = typeof Float32Array !== "undefined" ? Float32Array : Array;
if (!Math.hypot) Math.hypot = function() {
  var y = 0, i = arguments.length;
  while (i--) {
    y += arguments[i] * arguments[i];
  }
  return Math.sqrt(y);
};
function create6() {
  var out = new ARRAY_TYPE2(16);
  if (ARRAY_TYPE2 != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
function multiply5(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
function fromQuat3(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function create$1() {
  var out = new ARRAY_TYPE2(2);
  if (ARRAY_TYPE2 != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
(function() {
  var vec = create$1();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 2;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }
    return a;
  };
})();
var glsl$1 = (x) => x;
var vertexShader$1 = glsl$1`
attribute vec4 a_position;
attribute vec2 a_texCoord;

uniform mat4 u_matrix;
uniform mat4 u_projectionMatrix;

varying vec2 v_texCoord;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_projectionMatrix * u_matrix * a_position;

   // pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
   v_texCoord = a_texCoord;
}
`;
var fragmentShader$1 = glsl$1`
precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
   	vec4 tex = texture2D(u_image, v_texCoord);
	gl_FragColor = vec4(tex.rgb, tex.a);
	// gl_FragColor = vec4(1.0, 0, 0, 1.0);
}
`;
var texArrayVertexShader$1 = glsl$1`#version 300 es

in vec4 a_position;
in vec2 a_texCoord;

uniform mat4 u_matrix;
uniform mat4 u_projectionMatrix;

out vec2 v_texCoord;

void main() {
	// Multiply the position by the matrix.
    gl_Position = u_projectionMatrix * u_matrix * a_position;

	// pass the texCoord to the fragment shader
	// The GPU will interpolate this value between points.
	v_texCoord = a_texCoord;
}
`;
var texArrayFragmentShader$1 = glsl$1`#version 300 es
precision mediump float;
precision mediump int;
precision mediump sampler2DArray;

uniform sampler2DArray u_image;
uniform int u_layer;

in vec2 v_texCoord;

out vec4 fragColor;

void main() {
	vec4 tex = texture(u_image, vec3(v_texCoord.x, v_texCoord.y, u_layer));
 	fragColor = vec4(tex.rgb, tex.a);
}

`;
var CompositionLayerRenderer = class {
  constructor(layer, context) {
    this.usesTextureArrayShaders = false;
    this.savedVaoState = { vao: null, arrayBuffer: null };
    this.hasMipmap = false;
    this.gl = context;
    this.layer = layer;
    let gl = this.gl;
    this.transformMatrix = create6();
    if (context instanceof WebGL2RenderingContext && this.layer.getTextureType() === XRTextureType2["texture-array"]) {
      this.usesTextureArrayShaders = true;
    }
    if (this.usesTextureArrayShaders) {
      this.program = createProgram(gl, texArrayVertexShader$1, texArrayFragmentShader$1);
    } else {
      this.program = createProgram(gl, vertexShader$1, fragmentShader$1);
    }
    this.programInfo = {
      attribLocations: {
        a_position: gl.getAttribLocation(this.program, "a_position"),
        a_texCoord: gl.getAttribLocation(this.program, "a_texCoord")
      },
      uniformLocations: {
        u_matrix: gl.getUniformLocation(this.program, "u_matrix"),
        u_projectionMatrix: gl.getUniformLocation(this.program, "u_projectionMatrix")
      }
    };
    if (this.usesTextureArrayShaders) {
      this.programInfo.uniformLocations.u_layer = gl.getUniformLocation(this.program, "u_layer");
    }
  }
  saveVaoState() {
    this.savedVaoState.vao = this.gl.getParameter(this.vaoGl.VERTEX_ARRAY_BINDING);
    this.savedVaoState.arrayBuffer = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
  }
  restoreVaoState() {
    this.vaoGl.bindVertexArray(this.savedVaoState.vao);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.savedVaoState.arrayBuffer);
    this.savedVaoState.vao = this.savedVaoState.arrayBuffer = null;
  }
  initialize() {
    let gl = this.gl;
    if (this.layer.isMediaLayer()) {
      this.mediaTexture = gl.createTexture();
      this.mediaTexturePolyfill = {
        texture: this.mediaTexture,
        textureFormat: gl.RGBA,
        width: this.layer.media.videoWidth,
        height: this.layer.media.videoHeight,
        type: XRTextureType2.texture
      };
      const existingTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
      gl.bindTexture(gl.TEXTURE_2D, this.mediaTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.layer.media.videoWidth, this.layer.media.videoHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindTexture(gl.TEXTURE_2D, existingTextureBinding);
    }
    this._createVAOs();
  }
  render(session, frame) {
    this.saveVaoState();
    let gl = this.gl;
    let baseLayer = session.getBaseLayer();
    let basePose = frame.getViewerPose(session.getReferenceSpace());
    const existingActiveTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
    for (let view of basePose.views) {
      let viewport = baseLayer.getViewport(view);
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      gl.activeTexture(gl.TEXTURE0);
      if (this.usesTextureArrayShaders) {
        if (gl instanceof WebGLRenderingContext) {
          throw new Error("This should never happen; texture-arrays only supported on WebGL2.");
        }
        if (this.layer.isMediaLayer()) {
          throw new Error("This should never happen. Media layers should never be created with texture-array");
        }
        const existingTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D_ARRAY);
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.layer.colorTextures[0]);
        if (this.layer.isStatic) {
          if (this.layer.needsRedraw === true) {
            gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
          }
          this.hasMipmap = true;
        } else {
          this.hasMipmap = this.layer.mipLevels > 0;
        }
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, this.hasMipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, this.hasMipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
        let layer = 0;
        if (this.layer.layout === XRLayerLayout.stereo) {
          switch (view.eye) {
            case "right":
              layer = 1;
              break;
          }
        }
        if (this._shouldUseStereoTexturePoints()) {
          this._renderInternalStereo(session, frame, view, layer);
        } else {
          this._renderInternal(session, frame, view, layer);
        }
        gl.activeTexture(existingActiveTexture);
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, existingTextureBinding);
      } else {
        const existingTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
        if (this.layer.isMediaLayer()) {
          gl.bindTexture(gl.TEXTURE_2D, this.mediaTexture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.layer.media.videoWidth, this.layer.media.videoHeight, gl.RGBA, gl.UNSIGNED_BYTE, this.layer.media);
        } else if (this.layer.layout === XRLayerLayout.stereo) {
          switch (view.eye) {
            case "right":
              gl.bindTexture(gl.TEXTURE_2D, this.layer.colorTextures[1]);
              break;
            default:
              gl.bindTexture(gl.TEXTURE_2D, this.layer.colorTextures[0]);
          }
        } else {
          gl.bindTexture(gl.TEXTURE_2D, this.layer.colorTextures[0]);
        }
        if (this.layer.isStatic) {
          if (this.layer.needsRedraw === true) {
            gl.generateMipmap(gl.TEXTURE_2D);
          }
          this.hasMipmap = true;
        } else {
          this.hasMipmap = this.layer.mipLevels > 0;
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.hasMipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.hasMipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
        if (this._shouldUseStereoTexturePoints()) {
          this._renderInternalStereo(session, frame, view);
        } else {
          this._renderInternal(session, frame, view);
        }
        gl.activeTexture(existingActiveTexture);
        gl.bindTexture(gl.TEXTURE_2D, existingTextureBinding);
      }
    }
    this.restoreVaoState();
  }
  createPositionPoints() {
    return new Float32Array([]);
  }
  createTextureUVs() {
    return new Float32Array([]);
  }
  _offsetTextureUVsByRect(texture, inArray, textureRect) {
    textureRect = textureRect !== null && textureRect !== void 0 ? textureRect : {
      x: 0,
      y: 0,
      width: texture.width,
      height: texture.height
    };
    const uX = textureRect.x / texture.width;
    const vY = textureRect.y / texture.height;
    const uW = textureRect.width / texture.width;
    const vH = textureRect.height / texture.height;
    const outArray = [];
    for (let i = 0; i < inArray.length; i += 2) {
      let u = inArray[i];
      let v = inArray[i + 1];
      let newU = u * uW + uX;
      let newV = v * vH + vY;
      outArray[i] = newU;
      outArray[i + 1] = newV;
    }
    return new Float32Array(outArray);
  }
  _shouldUseStereoTexturePoints() {
    return this.layer.layout === XRLayerLayout["stereo-left-right"] || this.layer.layout === XRLayerLayout["stereo-top-bottom"];
  }
  _setStereoTextureBuffer(index) {
    let gl = this.gl;
    gl.enableVertexAttribArray(this.programInfo.attribLocations.a_texCoord);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.stereoTexturePoints[index], gl.STATIC_DRAW);
    var size = 2;
    var type = gl.FLOAT;
    var normalize4 = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(this.programInfo.attribLocations.a_texCoord, size, type, normalize4, stride, offset);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  _recalculateVertices() {
    this.positionPoints = this.createPositionPoints();
    this.texturePoints = this.createTextureUVs();
    const viewport = {
      x: 0,
      y: 0,
      width: 1,
      height: 1
    };
    if (this._shouldUseStereoTexturePoints()) {
      this.stereoTexturePoints = [];
      if (this.layer.isMediaLayer()) {
        initializeViewport(viewport, this.mediaTexturePolyfill, this.layer.layout, 0, 2);
        this.stereoTexturePoints[0] = this._offsetTextureUVsByRect(this.mediaTexturePolyfill, this.texturePoints, viewport);
        initializeViewport(viewport, this.mediaTexturePolyfill, this.layer.layout, 1, 2);
        this.stereoTexturePoints[1] = this._offsetTextureUVsByRect(this.mediaTexturePolyfill, this.texturePoints, viewport);
        if (this.layer.layout === XRLayerLayout["stereo-top-bottom"]) {
          [this.stereoTexturePoints[0], this.stereoTexturePoints[1]] = [
            this.stereoTexturePoints[1],
            this.stereoTexturePoints[0]
          ];
        }
        return;
      }
      initializeViewport(viewport, this.layer.colorTexturesMeta[0], this.layer.layout, 0, 2);
      this.stereoTexturePoints[0] = this._offsetTextureUVsByRect(this.layer.colorTexturesMeta[0], this.texturePoints, viewport);
      initializeViewport(viewport, this.layer.colorTexturesMeta[0], this.layer.layout, 1, 2);
      this.stereoTexturePoints[1] = this._offsetTextureUVsByRect(this.layer.colorTexturesMeta[0], this.texturePoints, viewport);
      if (this.layer.layout === XRLayerLayout["stereo-top-bottom"]) {
        [this.stereoTexturePoints[0], this.stereoTexturePoints[1]] = [
          this.stereoTexturePoints[1],
          this.stereoTexturePoints[0]
        ];
      }
    }
  }
  _createVAOs() {
    this._recalculateVertices();
    let gl = this.gl;
    this.vaoGl = applyVAOExtension(gl);
    this.saveVaoState();
    let positionBuffer = gl.createBuffer();
    this.vao = this.vaoGl.createVertexArray();
    this.vaoGl.bindVertexArray(this.vao);
    gl.enableVertexAttribArray(this.programInfo.attribLocations.a_position);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = this.positionPoints;
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    var size = 3;
    var type = gl.FLOAT;
    var normalize4 = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(this.programInfo.attribLocations.a_position, size, type, normalize4, stride, offset);
    gl.enableVertexAttribArray(this.programInfo.attribLocations.a_texCoord);
    this.texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.texturePoints, gl.STATIC_DRAW);
    var size = 2;
    var type = gl.FLOAT;
    var normalize4 = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(this.programInfo.attribLocations.a_texCoord, size, type, normalize4, stride, offset);
    this.restoreVaoState();
  }
  _renderInternal(session, frame, view, layer) {
    let gl = this.gl;
    const existingProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this.program);
    this.vaoGl.bindVertexArray(this.vao);
    if (this.usesTextureArrayShaders) {
      gl.uniform1i(this.programInfo.uniformLocations.u_layer, layer);
    }
    this._setTransformMatrix(session, frame, view);
    gl.uniformMatrix4fv(this.programInfo.uniformLocations.u_matrix, false, this.transformMatrix);
    gl.uniformMatrix4fv(this.programInfo.uniformLocations.u_projectionMatrix, false, view.projectionMatrix);
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = this.positionPoints.length / 3;
    gl.drawArrays(primitiveType, offset, count);
    this.vaoGl.bindVertexArray(null);
    gl.useProgram(existingProgram);
  }
  _renderInternalStereo(session, frame, view, layer) {
    if (view.eye === "none") {
      return this._renderInternal(session, frame, view);
    }
    let gl = this.gl;
    this.vaoGl.bindVertexArray(this.vao);
    const existingProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this.program);
    this._setStereoTextureBuffer(view.eye === "right" ? 1 : 0);
    if (this.usesTextureArrayShaders) {
      gl.uniform1i(this.programInfo.uniformLocations.u_layer, layer);
    }
    this._setTransformMatrix(session, frame, view);
    gl.uniformMatrix4fv(this.programInfo.uniformLocations.u_matrix, false, this.transformMatrix);
    gl.uniformMatrix4fv(this.programInfo.uniformLocations.u_projectionMatrix, false, view.projectionMatrix);
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = this.positionPoints.length / 3;
    gl.drawArrays(primitiveType, offset, count);
    this.vaoGl.bindVertexArray(null);
    gl.useProgram(existingProgram);
  }
  _setTransformMatrix(session, frame, view) {
    let objPose = frame.getPose(this.layer.space, session.getReferenceSpace());
    multiply5(this.transformMatrix, objPose.transform.matrix, this.layer.transform.matrix);
    multiply5(this.transformMatrix, view.transform.inverse.matrix, this.transformMatrix);
  }
};
var QuadRenderer = class extends CompositionLayerRenderer {
  constructor(layer, context) {
    super(layer, context);
    this.initialize();
  }
  createPositionPoints() {
    const width = this.layer.width;
    const height = this.layer.height;
    const z = 0;
    const positions = [
      -width,
      -height,
      z,
      width,
      -height,
      z,
      -width,
      height,
      z,
      -width,
      height,
      z,
      width,
      -height,
      z,
      width,
      height,
      z
    ];
    return new Float32Array(positions);
  }
  createTextureUVs() {
    return new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
  }
};
var CylinderRenderer = class extends CompositionLayerRenderer {
  constructor(layer, context) {
    super(layer, context);
    this.segments = 16;
    this.initialize();
  }
  createPositionPoints() {
    const positions = [];
    const angle2 = this.layer.centralAngle;
    const height = this.layer.height;
    const radius = this.layer.radius;
    const radiansPerSegment = angle2 / this.segments;
    const theta = Math.PI / 2 - angle2 / 2;
    const unitCirclePositions = [];
    const firstUnitPoint = create$1();
    firstUnitPoint[0] = radius * Math.cos(theta);
    firstUnitPoint[1] = -radius * Math.sin(theta);
    unitCirclePositions.push(firstUnitPoint);
    for (let i = 0; i < this.segments; i++) {
      const nextPoint = create$1();
      nextPoint[0] = radius * Math.cos(theta + radiansPerSegment * (i + 1));
      nextPoint[1] = -radius * Math.sin(theta + radiansPerSegment * (i + 1));
      unitCirclePositions.push(nextPoint);
    }
    unitCirclePositions.reverse();
    for (let i = 0; i < this.segments; i++) {
      const u = unitCirclePositions[i];
      const v = unitCirclePositions[i + 1];
      positions.push(u[0], -height / 2, u[1]);
      positions.push(v[0], -height / 2, v[1]);
      positions.push(u[0], height / 2, u[1]);
      positions.push(u[0], height / 2, u[1]);
      positions.push(v[0], -height / 2, v[1]);
      positions.push(v[0], height / 2, v[1]);
    }
    return new Float32Array(positions);
  }
  createTextureUVs() {
    let textureUVs = [];
    const texturePercent = 1 / this.segments;
    for (let i = 0; i < this.segments; i++) {
      let leftX = texturePercent * i;
      let rightX = texturePercent * (i + 1);
      textureUVs.push(leftX, 0);
      textureUVs.push(rightX, 0);
      textureUVs.push(leftX, 1);
      textureUVs.push(leftX, 1);
      textureUVs.push(rightX, 0);
      textureUVs.push(rightX, 1);
    }
    return new Float32Array(textureUVs);
  }
};
var EquirectRenderer = class extends CompositionLayerRenderer {
  constructor(layer, context) {
    super(layer, context);
    this.segmentsPerAxis = 40;
    this.initialize();
  }
  createPositionPoints() {
    const positions = [];
    let radius = this.layer.radius;
    if (radius === 0) {
      radius = 25;
    }
    if (radius > 25) {
      radius = 25;
    }
    const horizAngle = this.layer.centralHorizontalAngle;
    const phi1 = this.layer.upperVerticalAngle + Math.PI / 2;
    const phi2 = this.layer.lowerVerticalAngle + Math.PI / 2;
    const startPhi = phi1;
    const endPhi = phi2;
    const startTheta = Math.PI / 2 - horizAngle / 2;
    const endTheta = startTheta + horizAngle;
    const phiRange = endPhi - startPhi;
    const thetaRange = endTheta - startTheta;
    const basePoints = [];
    for (let y = 0; y <= this.segmentsPerAxis; y++) {
      for (let x = 0; x <= this.segmentsPerAxis; x++) {
        const u = x / this.segmentsPerAxis;
        const v = y / this.segmentsPerAxis;
        let r = radius;
        let theta = endTheta - thetaRange * u;
        let phi = phiRange * v + startPhi;
        const ux = Math.cos(theta) * Math.sin(phi);
        const uy = Math.cos(phi);
        const uz = -Math.sin(theta) * Math.sin(phi);
        basePoints.push([r * ux, r * uy, r * uz]);
      }
    }
    const numVertsAround = this.segmentsPerAxis + 1;
    for (let x = 0; x < this.segmentsPerAxis; x++) {
      for (let y = 0; y < this.segmentsPerAxis; y++) {
        positions.push(...basePoints[y * numVertsAround + x]);
        positions.push(...basePoints[y * numVertsAround + x + 1]);
        positions.push(...basePoints[(y + 1) * numVertsAround + x]);
        positions.push(...basePoints[(y + 1) * numVertsAround + x]);
        positions.push(...basePoints[y * numVertsAround + x + 1]);
        positions.push(...basePoints[(y + 1) * numVertsAround + x + 1]);
      }
    }
    return new Float32Array(positions);
  }
  createTextureUVs() {
    const triUVs = [];
    const baseUVs = [];
    for (let y = 0; y <= this.segmentsPerAxis; y++) {
      for (let x = 0; x <= this.segmentsPerAxis; x++) {
        const u = x / this.segmentsPerAxis;
        const v = y / this.segmentsPerAxis;
        baseUVs.push([u, v]);
      }
    }
    const numVertsAround = this.segmentsPerAxis + 1;
    for (let x = 0; x < this.segmentsPerAxis; x++) {
      for (let y = 0; y < this.segmentsPerAxis; y++) {
        triUVs.push(...baseUVs[y * numVertsAround + x]);
        triUVs.push(...baseUVs[y * numVertsAround + x + 1]);
        triUVs.push(...baseUVs[(y + 1) * numVertsAround + x]);
        triUVs.push(...baseUVs[(y + 1) * numVertsAround + x]);
        triUVs.push(...baseUVs[y * numVertsAround + x + 1]);
        triUVs.push(...baseUVs[(y + 1) * numVertsAround + x + 1]);
      }
    }
    return new Float32Array(triUVs);
  }
};
var defaultCubeLayerInit = {
  colorFormat: 6408,
  mipLevels: 1,
  layout: XRLayerLayout.mono,
  isStatic: false,
  space: null,
  viewPixelHeight: 0,
  viewPixelWidth: 0
};
var XRCubeLayer = class extends XRCompositionLayerPolyfill {
  constructor(init = defaultCubeLayerInit) {
    super();
    if (!isReferenceSpace(init.space)) {
      throw new TypeError("XRCubeLayer's space needs to be an XRReferenceSpace");
    }
    this.init = Object.assign(Object.assign({}, defaultCubeLayerInit), init);
    this.space = this.init.space;
    this.isStatic = this.init.isStatic;
    if (this.init.orientation) {
      this.orientation = DOMPointReadOnly.fromPoint(this.init.orientation);
    } else {
      this.orientation = new DOMPointReadOnly();
    }
    switch (this.init.layout) {
      case XRLayerLayout.default:
      case XRLayerLayout["stereo-left-right"]:
      case XRLayerLayout["stereo-top-bottom"]:
        throw new TypeError("Invalid layout format for XRCubeLayer");
    }
    this.layout = this.init.layout;
    this.needsRedraw = true;
  }
  initialize(session, context) {
    super.initialize(session, context);
    this._allocateColorTexturesInternal();
    this._allocateDepthStencilTexturesInternal();
  }
  _allocateColorTexturesInternal() {
    this._colorTextures = [];
    this._texturesMeta = [];
    if (this.layout === XRLayerLayout.mono) {
      const colorTexture = this._createCubeColorTexture();
      this._texturesMeta.push(colorTexture);
      this._colorTextures.push(colorTexture.texture);
      return;
    } else {
      const texture1 = this._createCubeColorTexture();
      const texture2 = this._createCubeColorTexture();
      this._texturesMeta.push(texture1, texture2);
      this._colorTextures.push(texture1.texture, texture2.texture);
      return;
    }
  }
  _allocateDepthStencilTexturesInternal() {
    this._depthStencilTextures = [];
    if (!this.init.depthFormat) {
      return;
    }
    if (this.context instanceof WebGLRenderingContext) {
      let depthExtension = this.context.getExtension("WEBGL_depth_texture");
      if (!depthExtension) {
        throw new TypeError("Depth textures not supported in the current context");
      }
    }
    if (this.layout === XRLayerLayout.mono) {
      const depthTexture = this._createCubeDepthTexture();
      this._depthStencilTextures.push(depthTexture.texture);
      return;
    } else {
      const texture1 = this._createCubeDepthTexture();
      const texture2 = this._createCubeDepthTexture();
      this._depthStencilTextures.push(texture1.texture, texture2.texture);
      return;
    }
  }
  _createCubeColorTexture() {
    let texture = this.context.createTexture();
    let textureMeta = {
      width: this.init.viewPixelWidth,
      height: this.init.viewPixelHeight,
      layers: 1,
      type: XRTextureType2.texture,
      textureFormat: this.init.colorFormat,
      texture
    };
    const existingTextureBinding = this.context.getParameter(this.context.TEXTURE_BINDING_CUBE_MAP);
    this.context.bindTexture(this.context.TEXTURE_CUBE_MAP, texture);
    for (let i = 0; i < 6; i++) {
      this.context.texImage2D(this.context.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, textureMeta.textureFormat, textureMeta.width, textureMeta.height, 0, textureMeta.textureFormat, this.context.UNSIGNED_BYTE, null);
    }
    this.context.bindTexture(this.context.TEXTURE_CUBE_MAP, existingTextureBinding);
    return textureMeta;
  }
  _createCubeDepthTexture() {
    let texture = this.context.createTexture();
    let textureMeta = {
      width: this.init.viewPixelWidth,
      height: this.init.viewPixelHeight,
      layers: 1,
      type: XRTextureType2.texture,
      textureFormat: this.init.depthFormat,
      texture
    };
    const existingTextureBinding = this.context.getParameter(this.context.TEXTURE_BINDING_CUBE_MAP);
    this.context.bindTexture(this.context.TEXTURE_CUBE_MAP, texture);
    let internalFormat = this.init.depthFormat;
    if (this.context instanceof WebGL2RenderingContext) {
      if (internalFormat === this.context.DEPTH_COMPONENT) {
        internalFormat = this.context.DEPTH_COMPONENT24;
      }
      if (internalFormat === this.context.DEPTH_STENCIL) {
        internalFormat = this.context.DEPTH24_STENCIL8;
      }
    }
    for (let i = 0; i < 6; i++) {
      this.context.texImage2D(this.context.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, internalFormat, textureMeta.width, textureMeta.height, 0, textureMeta.textureFormat, this.context.UNSIGNED_INT, null);
    }
    this.context.bindTexture(this.context.TEXTURE_CUBE_MAP, existingTextureBinding);
    return textureMeta;
  }
  getTextureType() {
    return XRTextureType2.texture;
  }
};
var glsl$2 = (x) => x;
var vertexShader$2 = glsl$2`
attribute vec4 a_position;
uniform mat4 u_projectionMatrix;
uniform mat4 u_matrix;
varying vec3 v_normal;

void main() {
   gl_Position = u_projectionMatrix * u_matrix * a_position;

   v_normal = normalize(a_position.xyz);
}
`;
var fragmentShader$2 = glsl$2`
precision mediump float;

varying vec3 v_normal;

uniform samplerCube u_texture;

void main() {
   gl_FragColor = textureCube(u_texture, normalize(v_normal));
}
`;
var CubeRenderer = class {
  constructor(layer, gl) {
    this.savedVaoState = { vao: null, arrayBuffer: null };
    this.hasMipmap = false;
    this.layer = layer;
    this.gl = gl;
    this.transformMatrix = create6();
    this.program = createProgram(gl, vertexShader$2, fragmentShader$2);
    this.programInfo = {
      attribLocations: {
        a_position: gl.getAttribLocation(this.program, "a_position")
      },
      uniformLocations: {
        u_matrix: gl.getUniformLocation(this.program, "u_matrix"),
        u_texture: gl.getUniformLocation(this.program, "u_texture"),
        u_projectionMatrix: gl.getUniformLocation(this.program, "u_projectionMatrix")
      }
    };
    this._createVAOs();
  }
  saveVaoState() {
    this.savedVaoState.vao = this.gl.getParameter(this.vaoGl.VERTEX_ARRAY_BINDING);
    this.savedVaoState.arrayBuffer = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
  }
  restoreVaoState() {
    this.vaoGl.bindVertexArray(this.savedVaoState.vao);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.savedVaoState.arrayBuffer);
    this.savedVaoState.vao = this.savedVaoState.arrayBuffer = null;
  }
  render(session, frame) {
    this.saveVaoState();
    let gl = this.gl;
    let baseLayer = session.getBaseLayer();
    let basePose = frame.getViewerPose(session.getReferenceSpace());
    const existingActiveTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
    for (let view of basePose.views) {
      let viewport = baseLayer.getViewport(view);
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      gl.activeTexture(gl.TEXTURE0);
      const existingTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_CUBE_MAP);
      if (this.layer.layout === XRLayerLayout.stereo) {
        const index = view.eye === "right" ? 1 : 0;
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.layer.colorTextures[index]);
      } else {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.layer.colorTextures[0]);
      }
      if (this.layer.isStatic) {
        if (this.layer.needsRedraw === true) {
          gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        }
        this.hasMipmap = true;
      } else {
        this.hasMipmap = this.layer.mipLevels > 0;
      }
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.hasMipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.hasMipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
      this._renderInternal(this.layer.orientation, view);
      gl.activeTexture(existingActiveTexture);
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, existingTextureBinding);
    }
    this.restoreVaoState();
  }
  createPositionPoints() {
    const w = 0.5;
    const positions = [
      -w,
      -w,
      -w,
      -w,
      w,
      -w,
      w,
      -w,
      -w,
      -w,
      w,
      -w,
      w,
      w,
      -w,
      w,
      -w,
      -w,
      -w,
      -w,
      w,
      w,
      -w,
      w,
      -w,
      w,
      w,
      -w,
      w,
      w,
      w,
      -w,
      w,
      w,
      w,
      w,
      -w,
      w,
      -w,
      -w,
      w,
      w,
      w,
      w,
      -w,
      -w,
      w,
      w,
      w,
      w,
      w,
      w,
      w,
      -w,
      -w,
      -w,
      -w,
      w,
      -w,
      -w,
      -w,
      -w,
      w,
      -w,
      -w,
      w,
      w,
      -w,
      -w,
      w,
      -w,
      w,
      -w,
      -w,
      -w,
      -w,
      -w,
      w,
      -w,
      w,
      -w,
      -w,
      -w,
      w,
      -w,
      w,
      w,
      -w,
      w,
      -w,
      w,
      -w,
      -w,
      w,
      w,
      -w,
      w,
      -w,
      w,
      w,
      -w,
      w,
      w,
      w,
      -w,
      w,
      w,
      w
    ];
    return new Float32Array(positions);
  }
  _renderInternal(orientation, view) {
    let gl = this.gl;
    const existingProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this.program);
    this.vaoGl.bindVertexArray(this.vao);
    fromQuat3(this.transformMatrix, [
      orientation.x,
      orientation.y,
      orientation.z,
      orientation.w
    ]);
    if (!this._poseOrientationMatrix) {
      this._poseOrientationMatrix = create6();
    }
    fromQuat3(this._poseOrientationMatrix, [
      view.transform.inverse.orientation.x,
      view.transform.inverse.orientation.y,
      view.transform.inverse.orientation.z,
      view.transform.inverse.orientation.w
    ]);
    multiply5(this.transformMatrix, this.transformMatrix, this._poseOrientationMatrix);
    gl.uniformMatrix4fv(this.programInfo.uniformLocations.u_matrix, false, this.transformMatrix);
    gl.uniformMatrix4fv(this.programInfo.uniformLocations.u_projectionMatrix, false, view.projectionMatrix);
    gl.uniform1i(this.programInfo.uniformLocations.u_texture, 0);
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = this.positionPoints.length / 3;
    gl.drawArrays(primitiveType, offset, count);
    this.vaoGl.bindVertexArray(null);
    gl.useProgram(existingProgram);
  }
  _recalculateVertices() {
    this.positionPoints = this.createPositionPoints();
  }
  _createVAOs() {
    this._recalculateVertices();
    let gl = this.gl;
    this.vaoGl = applyVAOExtension(gl);
    this.saveVaoState();
    let positionBuffer = gl.createBuffer();
    this.vao = this.vaoGl.createVertexArray();
    this.vaoGl.bindVertexArray(this.vao);
    gl.enableVertexAttribArray(this.programInfo.attribLocations.a_position);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = this.positionPoints;
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    var size = 3;
    var type = gl.FLOAT;
    var normalize4 = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(this.programInfo.attribLocations.a_position, size, type, normalize4, stride, offset);
    this.restoreVaoState();
  }
};
var XRSessionWithLayer = class {
  constructor() {
    this.mode = "inline";
    this.layers = [];
    this.views = [];
    this.initializedViews = false;
    this.isPolyfillActive = false;
    this.taskQueue = [];
  }
  requestAnimationFrame(animationFrameCallback) {
    if (!this.injectedFrameCallback) {
      this.injectedFrameCallback = (time, frame) => {
        let gl = this.context;
        if (!this.initializedViews && this.referenceSpace) {
          let pose = frame.getViewerPose(this.referenceSpace);
          if (pose) {
            this.views = pose.views;
            this.initializedViews = true;
          }
        }
        if (this.isPolyfillActive && this.initializedViews) {
          if (!this.tempFramebuffer) {
            this.tempFramebuffer = gl.createFramebuffer();
          }
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.tempFramebuffer);
          const existingClearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
          const existingFrameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
          gl.clearColor(0, 0, 0, 0);
          for (let layer of this.layers) {
            if (!(layer instanceof XRProjectionLayer2)) {
              continue;
            }
            for (let i = 0; i < layer.colorTextures.length; i++) {
              let textureType = layer.colorTexturesMeta[i].type;
              if (textureType === XRTextureType2["texture-array"]) ;
              else {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, layer.colorTextures[i], 0);
                if (layer.depthStencilTextures && i < layer.depthStencilTextures.length) {
                  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, layer.depthStencilTextures[i], 0);
                } else {
                  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, null, 0);
                }
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
              }
            }
          }
          gl.bindFramebuffer(gl.FRAMEBUFFER, existingFrameBuffer);
          gl.clearColor(existingClearColor[0], existingClearColor[1], existingClearColor[2], existingClearColor[3]);
        }
        animationFrameCallback(time, frame);
        if (this.isPolyfillActive && this.initializedViews) {
          let prevBlend = gl.isEnabled(gl.BLEND);
          let prevDepthTest = gl.isEnabled(gl.DEPTH_TEST);
          let prevCullFace = gl.isEnabled(gl.CULL_FACE);
          const existingFrameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
          const existingClearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.getBaseLayer().framebuffer);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          gl.clearColor(existingClearColor[0], existingClearColor[1], existingClearColor[2], existingClearColor[3]);
          gl.enable(gl.BLEND);
          gl.disable(gl.DEPTH_TEST);
          gl.disable(gl.CULL_FACE);
          let prevBlendSrcRGB = gl.getParameter(gl.BLEND_SRC_RGB);
          let prevBlendSrcAlpha = gl.getParameter(gl.BLEND_SRC_ALPHA);
          let prevBlendDestRGB = gl.getParameter(gl.BLEND_DST_RGB);
          let prevBlendDestAlpha = gl.getParameter(gl.BLEND_DST_ALPHA);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          for (let layer of this.layers) {
            if (!this.renderers) {
              this.renderers = /* @__PURE__ */ new WeakMap();
            }
            if (layer instanceof XRProjectionLayer2) {
              if (!this.renderers.has(layer)) {
                this.renderers.set(layer, createProjectionRenderer(layer, this.context));
              }
              const renderer = this.renderers.get(layer);
              renderer.render(this);
            } else if (layer instanceof XRQuadLayer) {
              if (!this.renderers.has(layer)) {
                this.renderers.set(layer, new QuadRenderer(layer, this.context));
              }
              const renderer = this.renderers.get(layer);
              renderer.render(this, frame);
            } else if (layer instanceof XRCylinderLayer) {
              if (!this.renderers.has(layer)) {
                this.renderers.set(layer, new CylinderRenderer(layer, this.context));
              }
              const renderer = this.renderers.get(layer);
              renderer.render(this, frame);
            } else if (layer instanceof XREquirectLayer) {
              if (!this.renderers.has(layer)) {
                this.renderers.set(layer, new EquirectRenderer(layer, this.context));
              }
              const renderer = this.renderers.get(layer);
              renderer.render(this, frame);
            } else if (layer instanceof XRCubeLayer) {
              if (!this.renderers.has(layer)) {
                this.renderers.set(layer, new CubeRenderer(layer, this.context));
              }
              const renderer = this.renderers.get(layer);
              renderer.render(this, frame);
            } else {
              const webglLayer = layer;
              if (webglLayer.framebuffer === null) {
                continue;
              }
              if (gl instanceof WebGL2RenderingContext) {
                gl.bindFramebuffer(gl.READ_FRAMEBUFFER, webglLayer.framebuffer);
                gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.getBaseLayer().framebuffer);
                gl.blitFramebuffer(0, 0, webglLayer.framebufferWidth, webglLayer.framebufferHeight, 0, 0, this.getBaseLayer().framebufferWidth, this.getBaseLayer().framebufferHeight, gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, gl.LINEAR);
              } else {
                console.warn("GL blitFramebuffer is not supported on WebGL1, so XRWebGLLayers may not show up properly when polyfilled.");
              }
            }
          }
          if (!prevBlend) {
            gl.disable(gl.BLEND);
          }
          if (prevDepthTest) {
            gl.enable(gl.DEPTH_TEST);
          }
          if (prevCullFace) {
            gl.enable(gl.CULL_FACE);
          }
          gl.blendFuncSeparate(prevBlendSrcRGB, prevBlendDestRGB, prevBlendSrcAlpha, prevBlendDestAlpha);
          gl.bindFramebuffer(gl.FRAMEBUFFER, existingFrameBuffer);
          while (this.taskQueue.length > 0) {
            const task = this.taskQueue.shift();
            task();
          }
        }
      };
    }
    this._requestAnimationFrame(this.injectedFrameCallback);
  }
  updateRenderState(XRRenderStateInit2) {
    this.existingBaseLayer = XRRenderStateInit2.baseLayer;
    if (XRRenderStateInit2.layers) {
      this.layers = XRRenderStateInit2.layers;
    }
    if (!this.activeRenderState) {
      this.createActiveRenderState();
    }
    this.activeRenderState = Object.assign(Object.assign({}, this.activeRenderState), XRRenderStateInit2);
    if (!XRRenderStateInit2.layers) {
      this._updateRenderState(XRRenderStateInit2);
      return;
    }
    let layerRenderStateInit = Object.assign({}, XRRenderStateInit2);
    delete layerRenderStateInit.layers;
    let context = void 0;
    for (let layer of this.layers) {
      if (layer instanceof XRCompositionLayerPolyfill) {
        context = layer.getContext();
        break;
      }
    }
    if (!context && !this.context) {
      let onResize = function() {
        context.canvas.width = context.canvas.clientWidth * window.devicePixelRatio;
        context.canvas.height = context.canvas.clientHeight * window.devicePixelRatio;
      };
      console.log("No existing context! Have the session make one");
      const canvas = document.createElement("canvas");
      context = canvas.getContext("webgl2", { xrCompatible: true });
      if (!context) {
        context = canvas.getContext("webgl", { xrCompatible: true });
      }
      if (!context) {
        throw new Error("No webGL support detected.");
      }
      document.body.appendChild(context.canvas);
      window.addEventListener("resize", onResize);
      onResize();
    }
    this.createInternalLayer(context);
    this.isPolyfillActive = true;
    this._updateRenderState(Object.assign(Object.assign({}, layerRenderStateInit), { baseLayer: this.internalLayer }));
  }
  initializeSession(mode) {
    this.mode = mode;
    this.requestReferenceSpace("local").then((refSpace) => {
      this.referenceSpace = refSpace;
    }).catch((e) => {
    });
    this.requestReferenceSpace("viewer").then((viewerSpace) => {
      this.viewerSpace = viewerSpace;
    });
  }
  getBaseLayer(context) {
    if (!this.internalLayer && !this.existingBaseLayer && context) {
      this.createInternalLayer(context);
    }
    return this.internalLayer || this.existingBaseLayer;
  }
  getReferenceSpace() {
    return !this.referenceSpace ? this.viewerSpace : this.referenceSpace;
  }
  getViewerSpace() {
    return this.viewerSpace;
  }
  queueTask(task) {
    this.taskQueue.push(task);
  }
  get renderState() {
    if (!this.activeRenderState) {
      this.createActiveRenderState();
    }
    return this.activeRenderState;
  }
  get internalViews() {
    return this.views;
  }
  getViewIndex(view) {
    for (let i = 0; i < this.views.length; i++) {
      let testView = this.views[i];
      if (view.eye === testView.eye && view.recommendedViewportScale === testView.recommendedViewportScale) {
        return i;
      }
    }
    return -1;
  }
  createInternalLayer(context) {
    if (!context && this.internalLayer) {
      return this.internalLayer;
    }
    if (context === this.context && this.internalLayer) {
      return this.internalLayer;
    }
    const _global = getGlobal();
    this.internalLayer = new _global.XRWebGLLayer(this, context);
    this.setContext(context);
    return this.internalLayer;
  }
  setContext(context) {
    this.context = context;
    this.tempFramebuffer = context.createFramebuffer();
    this.renderers = /* @__PURE__ */ new WeakMap();
  }
  createActiveRenderState() {
    const _global = getGlobal();
    let prototypeNames = Object.getOwnPropertyNames(_global.XRRenderState.prototype);
    const renderStateClone = {};
    for (let item of prototypeNames) {
      renderStateClone[item] = this._renderState[item];
    }
    renderStateClone.layers = [];
    this.activeRenderState = renderStateClone;
  }
};
var XRWebGLSubImagePolyfill = class {
  constructor() {
    this.viewport = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
};
var XRWebGLBindingPolyfill = class {
  constructor(session, context) {
    this.session = session;
    this.context = context;
    this.subImageCache = new SubImageCache();
  }
  createProjectionLayer(init = defaultXRProjectionLayerInit) {
    const layer = new XRProjectionLayer2(init);
    if (this.session.ended) {
      throw new Error("Session has ended");
    }
    if (this.context.isContextLost()) {
      throw new Error("context is lost");
    }
    layer.initialize(this.session, this.context);
    return layer;
  }
  createQuadLayer(init = defaultQuadLayerInit) {
    if (this.session.ended) {
      throw new Error("Session has ended");
    }
    if (this.context.isContextLost()) {
      throw new Error("context is lost");
    }
    if (init.layout === XRLayerLayout.default) {
      throw new TypeError("Trying to create a quad layer with default layout");
    }
    const layer = new XRQuadLayer(init);
    layer.initialize(this.session, this.context);
    return layer;
  }
  createCylinderLayer(init = defaultCylinderLayerInit) {
    if (this.session.ended) {
      throw new Error("Session has ended");
    }
    if (this.context.isContextLost()) {
      throw new Error("context is lost");
    }
    if (init.layout === XRLayerLayout.default) {
      throw new TypeError("Cylinder Layer cannot have a default layout");
    }
    const layer = new XRCylinderLayer(init);
    layer.initialize(this.session, this.context);
    return layer;
  }
  createEquirectLayer(init = defaultEquirectLayerInit) {
    if (this.session.ended) {
      throw new Error("Session has ended");
    }
    if (this.context.isContextLost()) {
      throw new Error("context is lost");
    }
    if (init.layout === XRLayerLayout.default) {
      throw new TypeError("Equirect Layer cannot have a default layout");
    }
    if (!isReferenceSpace(init.space)) {
      throw new TypeError("Equirect layer requires an XRReferenceSpace");
    }
    let layer = new XREquirectLayer(init);
    layer.initialize(this.session, this.context);
    return layer;
  }
  createCubeLayer(init) {
    if (this.session.ended) {
      throw new Error("Session has ended");
    }
    if (this.context.isContextLost()) {
      throw new Error("context is lost");
    }
    if (!(this.context instanceof WebGL2RenderingContext)) {
      throw new Error("XRCubeLayer only work on WebGL2");
    }
    if (!isReferenceSpace(init.space)) {
      throw new TypeError("XRCubeLayer requires a space of type XRReferenceSpace");
    }
    let layer = new XRCubeLayer(init);
    layer.initialize(this.session, this.context);
    return layer;
  }
  getSubImage(layer, frame, eye = "none") {
    if (layer.isStatic && layer.needsRedraw === false) {
      throw new Error("Invalid state for subimage creation");
    }
    let existingSubImage = this.subImageCache.tryGetCachedSubImage(this.context, layer, eye);
    if (existingSubImage) {
      return existingSubImage;
    }
    let subimage = new XRWebGLSubImagePolyfill();
    if (layer instanceof XRProjectionLayer2) {
      throw new TypeError();
    }
    if (layer.layout === XRLayerLayout.default) {
      throw new TypeError();
    }
    if (!this.validateStateofSubImageCreation(layer, frame)) {
      throw new Error("Invalid state for subimage creation");
    }
    let index = 0;
    if (layer.layout === XRLayerLayout.stereo) {
      if (eye === "none") {
        throw new TypeError();
      }
      if (eye === "right") {
        index = 1;
      }
    }
    if (layer.getTextureType() === XRTextureType2["texture-array"]) {
      subimage.imageIndex = index;
    } else {
      subimage.imageIndex = 0;
    }
    let _textureIndex = 0;
    if (layer.getTextureType() === XRTextureType2.texture) {
      subimage.colorTexture = layer.colorTextures[index];
      _textureIndex = index;
    } else {
      subimage.colorTexture = layer.colorTextures[0];
      _textureIndex = 0;
    }
    if (!layer.depthStencilTextures || !layer.depthStencilTextures.length) {
      subimage.depthStencilTexture = null;
    } else if (layer.getTextureType() === XRTextureType2.texture) {
      subimage.depthStencilTexture = layer.depthStencilTextures[index];
    } else {
      subimage.depthStencilTexture = layer.depthStencilTextures[0];
    }
    const layerMeta = layer.colorTexturesMeta[_textureIndex];
    subimage.textureWidth = layerMeta.width;
    subimage.textureHeight = layerMeta.height;
    let viewsPerTexture = 1;
    if (layer.layout === XRLayerLayout["stereo-left-right"] || layer.layout === XRLayerLayout["stereo-top-bottom"]) {
      viewsPerTexture = 2;
    }
    initializeViewport(subimage.viewport, layerMeta, layer.layout, index, viewsPerTexture);
    this.session.queueTask(() => {
      layer.needsRedraw = false;
    });
    this.subImageCache.cacheSubImage(subimage, this.context, layer, eye);
    return subimage;
  }
  getViewSubImage(layer, view) {
    let existingSubImage = this.subImageCache.tryGetCachedViewSubImage(this.context, layer, view);
    if (existingSubImage) {
      return existingSubImage;
    }
    let subimage = new XRWebGLSubImagePolyfill();
    let session = this.session;
    if (!session.internalViews || !session.internalViews.length) {
      console.warn("Tried to get view sub image before we have any views");
      return subimage;
    }
    let index = session.getViewIndex(view);
    let _textureIndex = 0;
    if (layer.getTextureType() === XRTextureType2["texture-array"]) {
      subimage.imageIndex = index;
    } else {
      subimage.imageIndex = 0;
    }
    if (layer.layout === XRLayerLayout.default && layer.getTextureType() === XRTextureType2.texture) {
      subimage.colorTexture = layer.colorTextures[index];
      _textureIndex = index;
    } else {
      subimage.colorTexture = layer.colorTextures[0];
      _textureIndex = 0;
    }
    if (layer.depthStencilTextures.length === 0) {
      subimage.depthStencilTexture = null;
    } else if (layer.layout === XRLayerLayout.default && layer.getTextureType() === XRTextureType2.texture) {
      subimage.depthStencilTexture = layer.depthStencilTextures[index];
    } else {
      subimage.depthStencilTexture = layer.depthStencilTextures[0];
    }
    subimage.textureWidth = layer.colorTexturesMeta[_textureIndex].width;
    subimage.textureHeight = layer.colorTexturesMeta[_textureIndex].height;
    initializeViewport(subimage.viewport, layer.colorTexturesMeta[_textureIndex], layer.layout, index, session.internalViews.length);
    layer.needsRedraw = false;
    this.subImageCache.cacheViewSubImage(subimage, this.context, layer, view);
    return subimage;
  }
  validateStateofSubImageCreation(layer, frame) {
    if (frame.session !== layer.session) {
      return false;
    }
    if (this.session !== layer.session) {
      return false;
    }
    if (this.context !== layer.context) {
      return false;
    }
    if (!layer.colorTextures || !layer.colorTextures.length) {
      return false;
    }
    if (layer.isStatic && layer.needsRedraw === false) {
      return false;
    }
    return true;
  }
};
var SubImageCache = class {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.viewCache = /* @__PURE__ */ new Map();
  }
  cacheSubImage(subimage, context, layer, eye) {
    let eyeMap = /* @__PURE__ */ new Map();
    eyeMap.set(eye, subimage);
    let layerMap = /* @__PURE__ */ new Map();
    layerMap.set(layer, eyeMap);
    this.cache.set(context, layerMap);
  }
  tryGetCachedSubImage(context, layer, eye) {
    var _a15, _b2;
    return (_b2 = (_a15 = this.cache.get(context)) === null || _a15 === void 0 ? void 0 : _a15.get(layer)) === null || _b2 === void 0 ? void 0 : _b2.get(eye);
  }
  cacheViewSubImage(subimage, context, layer, view) {
    let viewMap = /* @__PURE__ */ new Map();
    viewMap.set(view, subimage);
    let layerMap = /* @__PURE__ */ new Map();
    layerMap.set(layer, viewMap);
    this.viewCache.set(context, layerMap);
  }
  tryGetCachedViewSubImage(context, layer, view) {
    var _a15, _b2;
    return (_b2 = (_a15 = this.viewCache.get(context)) === null || _a15 === void 0 ? void 0 : _a15.get(layer)) === null || _b2 === void 0 ? void 0 : _b2.get(view);
  }
};
var isLayersNativelySupported = (global2) => {
  if (!global2.navigator.xr) {
    return false;
  }
  if (global2.XRMediaBinding && global2.XRWebGLBinding) {
    return true;
  }
  return false;
};
var WebXRLayersPolyfill = class {
  constructor() {
    this.injected = false;
    const _global = getGlobal();
    this._injectPolyfill(_global);
  }
  _injectPolyfill(global2) {
    if (!("xr" in global2.navigator)) {
      throw new Error("WebXR Layers polyfill requires WebXR support.");
    }
    if (this.injected === true) {
      console.warn("Polyfill has already been injected...");
    }
    if (isLayersNativelySupported(global2)) {
      return;
    }
    this._polyfillRequiredLayersFeature(global2);
    this._polyfillXRSession(global2);
    global2.XRWebGLBinding = XRWebGLBindingPolyfill;
    global2.XRMediaBinding = XRMediaBindingPolyfill;
    this.injected = true;
    console.log("Injected Layers Polyfill");
  }
  _polyfillXRSession(global2) {
    global2.XRSession.prototype._updateRenderState = global2.XRSession.prototype.updateRenderState;
    global2.XRSession.prototype._requestAnimationFrame = global2.XRSession.prototype.requestAnimationFrame;
    let renderStateGetter = Object.getOwnPropertyDescriptor(global2.XRSession.prototype, "renderState");
    Object.defineProperty(global2.XRSession.prototype, "_renderState", renderStateGetter);
    let polyfillRenderStateGetter = Object.getOwnPropertyDescriptor(XRSessionWithLayer.prototype, "renderState");
    Object.defineProperty(global2.XRSession.prototype, "renderState", polyfillRenderStateGetter);
    let prototypeNames = Object.getOwnPropertyNames(XRSessionWithLayer.prototype);
    for (let item of prototypeNames) {
      let propertyDescriptor = Object.getOwnPropertyDescriptor(XRSessionWithLayer.prototype, item);
      Object.defineProperty(global2.XRSession.prototype, item, propertyDescriptor);
    }
  }
  _polyfillRequiredLayersFeature(global2) {
    const existingRequestSession = global2.navigator.xr.requestSession;
    Object.defineProperty(global2.navigator.xr, "requestSessionInternal", { writable: true });
    global2.navigator.xr.requestSessionInternal = existingRequestSession;
    const newRequestSession = (sessionMode, sessionInit) => {
      const modifiedSessionPromise = (mode, init) => {
        return global2.navigator.xr.requestSessionInternal(mode, init).then((session) => {
          Object.assign(session, new XRSessionWithLayer());
          let polyfilledSession = session;
          polyfilledSession.initializeSession(sessionMode);
          return Promise.resolve(polyfilledSession);
        });
      };
      if (sessionMode !== "immersive-vr") {
        return modifiedSessionPromise(sessionMode, sessionInit);
      }
      if (!sessionInit) {
        return modifiedSessionPromise(sessionMode, sessionInit);
      }
      if (sessionInit.requiredFeatures && sessionInit.requiredFeatures.indexOf("layers") > -1) {
        const sessionInitClone = Object.assign({}, sessionInit);
        const reqFeatures = [...sessionInit.requiredFeatures];
        const layersIndex = reqFeatures.indexOf("layers");
        reqFeatures.splice(layersIndex, 1);
        sessionInitClone.requiredFeatures = reqFeatures;
        return modifiedSessionPromise(sessionMode, sessionInitClone);
      }
      return modifiedSessionPromise(sessionMode, sessionInit);
    };
    Object.defineProperty(global2.navigator.xr, "requestSession", { writable: true });
    global2.navigator.xr.requestSession = newRequestSession;
  }
};
var webxr_layers_polyfill_module_default = WebXRLayersPolyfill;

// src/device/XRDevice.ts
var EMULATOR_EXTENSIONS = {
  createRemoteControl: (device) => new RemoteControlInterface(device),
  createActionPlayer: (refSpace, recording, ipd, options) => new ActionPlayer(refSpace, recording, ipd, options),
  installLayersPolyfill: () => {
    new webxr_layers_polyfill_module_default();
  }
};
var XRDevice = class extends XRDeviceBase {
  constructor(deviceConfig, deviceOptions = {}) {
    super(deviceConfig, deviceOptions, EMULATOR_EXTENSIONS);
  }
  /** Always present on the full entry's device. */
  get remote() {
    return super.remote;
  }
};

// src/device/configs/headset/meta.ts
var degrees = (value) => value * Math.PI / 180;
var metaVRGlassesVisibilityMask = {
  left: {
    angleLeft: degrees(37),
    angleRight: degrees(37),
    angleUp: degrees(25),
    angleDown: degrees(43)
  },
  right: {
    angleLeft: degrees(37),
    angleRight: degrees(37),
    angleUp: degrees(25),
    angleDown: degrees(43)
  }
};
var oculusQuest1 = {
  name: "Oculus Quest 1",
  controllerConfig: oculusTouchV2,
  supportedSessionModes: ["inline", "immersive-vr", "immersive-ar"],
  supportedFeatures: [
    "viewer",
    "local",
    "local-floor",
    "bounded-floor",
    "unbounded",
    "anchors",
    "plane-detection",
    "hand-tracking"
  ],
  supportedFrameRates: [72, 80, 90],
  isSystemKeyboardSupported: true,
  internalNominalFrameRate: 72,
  environmentBlendModes: {
    ["immersive-vr"]: "opaque" /* Opaque */,
    ["immersive-ar"]: "alpha-blend" /* AlphaBlend */
  },
  interactionMode: "world-space" /* WorldSpace */,
  userAgent: "Mozilla/5.0 (X11; Linux x86_64; Quest 1) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/33.0.0.x.x.x Chrome/126.0.6478.122 VR Safari/537.36"
};
var metaQuest2 = {
  name: "Meta Quest 2",
  controllerConfig: oculusTouchV3,
  supportedSessionModes: ["inline", "immersive-vr", "immersive-ar"],
  supportedFeatures: [
    "viewer",
    "local",
    "local-floor",
    "bounded-floor",
    "unbounded",
    "anchors",
    "plane-detection",
    "mesh-detection",
    "hit-test",
    "hand-tracking"
  ],
  supportedFrameRates: [72, 80, 90, 120],
  isSystemKeyboardSupported: true,
  internalNominalFrameRate: 72,
  environmentBlendModes: {
    ["immersive-vr"]: "opaque" /* Opaque */,
    ["immersive-ar"]: "alpha-blend" /* AlphaBlend */
  },
  interactionMode: "world-space" /* WorldSpace */,
  userAgent: "Mozilla/5.0 (X11; Linux x86_64; Quest 2) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/33.0.0.x.x.x Chrome/126.0.6478.122 VR Safari/537.36"
};
var metaQuestPro = {
  name: "Meta Quest Pro",
  controllerConfig: metaQuestTouchPro,
  supportedSessionModes: ["inline", "immersive-vr", "immersive-ar"],
  supportedFeatures: [
    "viewer",
    "local",
    "local-floor",
    "bounded-floor",
    "unbounded",
    "anchors",
    "plane-detection",
    "mesh-detection",
    "hit-test",
    "hand-tracking",
    "gaze-tracking",
    "eye-tracking"
  ],
  supportedFrameRates: [72, 80, 90, 120],
  isSystemKeyboardSupported: true,
  internalNominalFrameRate: 90,
  environmentBlendModes: {
    ["immersive-vr"]: "opaque" /* Opaque */,
    ["immersive-ar"]: "alpha-blend" /* AlphaBlend */
  },
  interactionMode: "world-space" /* WorldSpace */,
  userAgent: "Mozilla/5.0 (X11; Linux x86_64; Quest Pro) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/33.0.0.x.x.x Chrome/126.0.6478.122 VR Safari/537.36"
};
var metaQuest3 = {
  name: "Meta Quest 3",
  controllerConfig: metaQuestTouchPlus,
  supportedSessionModes: ["inline", "immersive-vr", "immersive-ar"],
  supportedFeatures: [
    "viewer",
    "local",
    "local-floor",
    "bounded-floor",
    "unbounded",
    "anchors",
    "plane-detection",
    "mesh-detection",
    "hit-test",
    "hand-tracking",
    "depth-sensing"
  ],
  supportedFrameRates: [72, 80, 90, 120],
  isSystemKeyboardSupported: true,
  internalNominalFrameRate: 90,
  environmentBlendModes: {
    ["immersive-vr"]: "opaque" /* Opaque */,
    ["immersive-ar"]: "alpha-blend" /* AlphaBlend */
  },
  interactionMode: "world-space" /* WorldSpace */,
  userAgent: "Mozilla/5.0 (X11; Linux x86_64; Quest 3) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/33.0.0.x.x.x Chrome/126.0.6478.122 VR Safari/537.36"
};
var metaVRGlasses = {
  ...metaQuest3,
  name: "Meta VR Glasses",
  supportedFrameRates: [72, 90, 96, 100, 120],
  visibilityMask: metaVRGlassesVisibilityMask
};

// src/device/configs/controller/generic.ts
var gamepadConfig = {
  mapping: "xr-standard" /* XRStandard */,
  buttons: [
    { id: "trigger", type: "analog", eventTrigger: "select" },
    { id: "squeeze", type: "analog", eventTrigger: "squeeze" },
    null,
    { id: "thumbstick", type: "binary" }
  ],
  axes: [
    null,
    null,
    { id: "thumbstick", type: "x-axis" },
    { id: "thumbstick", type: "y-axis" }
  ]
};
var generic = {
  profileId: "generic-trigger-squeeze-thumbstick",
  fallbackProfileIds: [],
  layout: {
    left: {
      gamepad: gamepadConfig,
      numHapticActuators: 1
    },
    right: {
      gamepad: gamepadConfig,
      numHapticActuators: 1
    },
    none: {
      gamepad: gamepadConfig,
      numHapticActuators: 1
    }
  }
};

// src/utils/PatchRegistry.ts
var PatchRegistry = class {
  constructor() {
    this.entries = [];
  }
  get size() {
    return this.entries.length;
  }
  define(target, key, descriptor) {
    const previous = Object.getOwnPropertyDescriptor(target, key);
    try {
      Object.defineProperty(target, key, descriptor);
      this.entries.push({ target, key, descriptor: previous });
      return true;
    } catch {
      return false;
    }
  }
  revert() {
    for (let index = this.entries.length - 1; index >= 0; index--) {
      const { target, key, descriptor } = this.entries[index];
      try {
        if (descriptor) {
          Object.defineProperty(target, key, descriptor);
        } else {
          Reflect.deleteProperty(target, key);
        }
      } catch {
      }
    }
    this.entries = [];
  }
};

// src/native/XRNativeOverride.ts
function clearedCapabilities() {
  return {
    requestSession: false,
    offerSession: false,
    inputSources: false,
    inputEvents: false,
    brandedInputEvents: false,
    enabledFeatures: false,
    viewerSpaceTagging: false,
    poseOverride: false,
    batchPoses: false,
    viewerPose: false,
    viewTransforms: false,
    handInput: false,
    jointPoses: false,
    actionPlayback: false,
    anchors: false,
    hitTest: false
  };
}
var NATIVE_OVERRIDE_KEY = /* @__PURE__ */ Symbol.for("@iwer/native-override");
var INPUT_EVENT_NAMES = [
  "select",
  "selectstart",
  "selectend",
  "squeeze",
  "squeezestart",
  "squeezeend"
];
var HAND_TRACKING_FEATURE = "hand-tracking";
var MAX_HIT_TEST_BACKOFF_FRAMES = 32;
var HIT_TEST_TRANSLATION_TOLERANCE_M = 5e-3;
var HIT_TEST_ROTATION_TOLERANCE_RAD = Math.PI / 180;
var MAX_PENDING_EVENTS = 256;
var FRAME_PREPARATION_FAILURE_THRESHOLD = 3;
var FRAME_PREPARATION_FINAL_DIAGNOSTIC_COUNT = 60;
var scratchViewerMatrix = mat4_exports.create();
var scratchTargetMatrix = mat4_exports.create();
var scratchAnchorToBase = mat4_exports.create();
var scratchBaseToAnchor = mat4_exports.create();
var scratchRelativeView = mat4_exports.create();
var scratchResultMatrix = mat4_exports.create();
var scratchControlledMatrix = mat4_exports.create();
var scratchHitTestMatrix = mat4_exports.create();
var scratchPosition2 = vec3_exports.create();
var scratchOrientation2 = quat_exports.create();
var scratchRadius = new Float32Array(1);
function findPropertyOwner(target, key) {
  let current = target;
  while (current) {
    if (Object.prototype.hasOwnProperty.call(current, key)) {
      return current;
    }
    current = Object.getPrototypeOf(current);
  }
  return null;
}
function installedOverride(xr) {
  try {
    const direct = Reflect.get(xr, NATIVE_OVERRIDE_KEY);
    const requestSession = Reflect.get(xr, "requestSession");
    const candidate = direct ?? (typeof requestSession === "function" ? Reflect.get(requestSession, NATIVE_OVERRIDE_KEY) : null);
    if (candidate !== null && typeof candidate === "object" && typeof candidate.installed === "boolean" && typeof candidate.uninstall === "function") {
      return candidate;
    }
  } catch {
  }
  return null;
}
function methodDescriptor(target, key) {
  const owner = findPropertyOwner(target, key);
  const descriptor = owner ? Object.getOwnPropertyDescriptor(owner, key) : void 0;
  return owner && descriptor ? { owner, descriptor } : null;
}
function matrixFromTransform(transform) {
  const output = mat4_exports.create();
  for (let index = 0; index < 16; index++) {
    output[index] = transform.matrix[index];
  }
  return output;
}
function copyMatrixToArray(matrix, output, offset) {
  for (let index = 0; index < 16; index++) {
    output[offset + index] = matrix[index];
  }
}
var toleranceLeftPosition = vec3_exports.create();
var toleranceRightPosition = vec3_exports.create();
var toleranceLeftRotation = quat_exports.create();
var toleranceRightRotation = quat_exports.create();
function poseWithinTolerance(left, right) {
  mat4_exports.getTranslation(toleranceLeftPosition, left);
  mat4_exports.getTranslation(toleranceRightPosition, right);
  if (vec3_exports.squaredDistance(toleranceLeftPosition, toleranceRightPosition) > HIT_TEST_TRANSLATION_TOLERANCE_M * HIT_TEST_TRANSLATION_TOLERANCE_M) {
    return false;
  }
  mat4_exports.getRotation(toleranceLeftRotation, left);
  mat4_exports.getRotation(toleranceRightRotation, right);
  const dot4 = Math.abs(quat_exports.dot(toleranceLeftRotation, toleranceRightRotation));
  return Math.min(dot4, 1) >= Math.cos(HIT_TEST_ROTATION_TOLERANCE_RAD / 2);
}
function isTrackedRadius(radius) {
  return Number.isFinite(radius) && radius > 0;
}
function invalidState(message) {
  return new DOMException(message, "InvalidStateError");
}
function notSupported(message) {
  return new DOMException(message, "NotSupportedError");
}
function isImmersiveMode(mode) {
  return mode === "immersive-vr" || mode === "immersive-ar";
}
function propertyCanBePatched(target, key) {
  const ownDescriptor = Object.getOwnPropertyDescriptor(target, key);
  if (ownDescriptor) {
    return ownDescriptor.configurable || ownDescriptor.writable === true;
  }
  if (Object.isExtensible(target)) {
    return true;
  }
  const inherited = methodDescriptor(Object.getPrototypeOf(target), key);
  return Boolean(
    inherited && (inherited.descriptor.configurable || inherited.descriptor.writable === true)
  );
}
function globalRecord(globalObject) {
  return globalObject;
}
function eventConstructor(globalObject) {
  const candidate = globalRecord(globalObject).Event;
  return typeof candidate === "function" ? candidate : void 0;
}
function resolveXRSystem(environment) {
  const globalObject = environment.globalObject ?? globalThis;
  return environment.xrSystem ?? globalRecord(globalObject).navigator?.xr;
}
function getNativeOverrideSupport(environment = {}) {
  const globalObject = environment.globalObject ?? globalThis;
  const xr = resolveXRSystem(environment);
  const notes = [];
  const requestSession = Boolean(
    xr && typeof xr.requestSession === "function" && propertyCanBePatched(xr, "requestSession")
  );
  if (!xr) {
    notes.push("navigator.xr is unavailable.");
  } else if (!requestSession) {
    notes.push("The native XRSystem.requestSession method cannot be patched.");
  }
  if (typeof globalRecord(globalObject).XRRigidTransform !== "function") {
    notes.push("The native XRRigidTransform constructor is unavailable.");
  }
  return {
    supported: requestSession && typeof globalRecord(globalObject).XRRigidTransform === "function",
    requestSession,
    notes
  };
}
function getNativeOverride(environment = {}) {
  const xr = resolveXRSystem(environment);
  return xr ? installedOverride(xr) : null;
}
var XRNativeOverride = class {
  constructor(device, options = {}) {
    this.patches = new PatchRegistry();
    this.sessionsByObject = /* @__PURE__ */ new WeakMap();
    this.liveSessions = /* @__PURE__ */ new Set();
    this.frameSessions = /* @__PURE__ */ new WeakMap();
    this.spaces = /* @__PURE__ */ new WeakMap();
    this.hitTestBindings = /* @__PURE__ */ new WeakMap();
    this.syntheticEvents = /* @__PURE__ */ new WeakSet();
    this.patchedFrameOwners = /* @__PURE__ */ new WeakSet();
    this.patchedViewerFrameOwners = /* @__PURE__ */ new WeakSet();
    this.patchedFillPosesOwners = /* @__PURE__ */ new WeakSet();
    this.patchedJointPoseOwners = /* @__PURE__ */ new WeakSet();
    this.patchedJointRadiiOwners = /* @__PURE__ */ new WeakSet();
    this.patchedReferenceSpaceOwners = /* @__PURE__ */ new WeakSet();
    this.patchedEnabledFeaturesOwners = /* @__PURE__ */ new WeakSet();
    this.patchedInputSourceOwners = /* @__PURE__ */ new WeakSet();
    this.patchedRafOwners = /* @__PURE__ */ new WeakSet();
    this.patchedRequestReferenceSpaceOwners = /* @__PURE__ */ new WeakSet();
    this.patchedHitTestOwners = /* @__PURE__ */ new WeakSet();
    this.patchedHitTestResultOwners = /* @__PURE__ */ new WeakSet();
    this.patchedCreateAnchorOwners = /* @__PURE__ */ new WeakSet();
    this.instancePatchedReferenceSpaces = /* @__PURE__ */ new WeakSet();
    this.rawGetPoseByOwner = /* @__PURE__ */ new WeakMap();
    this.rawGetPoseByFrame = /* @__PURE__ */ new WeakMap();
    this.rawRafByOwner = /* @__PURE__ */ new WeakMap();
    this.rawRequestReferenceSpaceByOwner = /* @__PURE__ */ new WeakMap();
    this.rawInputSourcesGetterByOwner = /* @__PURE__ */ new WeakMap();
    this.rawTransformGetters = /* @__PURE__ */ new WeakMap();
    this.transformReaders = /* @__PURE__ */ new WeakMap();
    this.transformOverrides = /* @__PURE__ */ new WeakMap();
    this.patchedTransformOwners = /* @__PURE__ */ new WeakSet();
    this.instancePatchedFrameEpochs = /* @__PURE__ */ new WeakMap();
    this.instancePatchedTransformEpochs = /* @__PURE__ */ new WeakMap();
    this.warned = /* @__PURE__ */ new Set();
    this.unhealthyFrameAdapters = /* @__PURE__ */ new Set();
    this.installedState = false;
    this.primarySession = null;
    this.previousRuntime = null;
    this.epoch = 0;
    this.wiredPlayer = null;
    // Recorded actions whose completion event (`select`/`squeeze`) arrived and
    // is waiting for its end event.
    this.playbackCompletions = /* @__PURE__ */ new WeakMap();
    /**
     * Set while a native frame samples a recording. It keeps the final sampled
     * frame observable to the application even though ActionPlayer.playFrame()
     * clears `playing` as it clamps to the end of the recording.
     */
    this.playbackFrame = null;
    /**
     * Handed to ActionPlayer when no session owns an active frame, so an
     * application-driven stepFrames()/playFrame() still runs the player's edge
     * detection. The override re-stamps every relayed event with a real frame
     * when it drains, so this token never reaches the application.
     */
    this.detachedPlaybackFrame = {};
    this.device = device;
    this.mode = options.mode ?? "full";
    this.options = {
      ...options,
      mode: this.mode,
      onUnsupported: options.onUnsupported ?? "warn"
    };
    this.globalObject = options.globalObject ?? globalThis;
    this.xrSystem = resolveXRSystem(options);
    const support = getNativeOverrideSupport({
      xrSystem: this.xrSystem,
      globalObject: this.globalObject
    });
    this.capabilityState = {
      phase: "uninstalled",
      supported: support.supported,
      ...clearedCapabilities(),
      notes: [...support.notes]
    };
  }
  get installed() {
    return this.installedState;
  }
  get capabilities() {
    return {
      ...this.capabilityState,
      notes: [...this.capabilityState.notes]
    };
  }
  get sessions() {
    return Array.from(this.liveSessions, (adapter) => ({
      session: adapter.session,
      mode: adapter.mode,
      primary: adapter === this.primarySession,
      anchorSpace: adapter.anchorSpace
    }));
  }
  install() {
    if (this.installedState) {
      return;
    }
    const xr = resolveXRSystem(this.options);
    this.xrSystem = xr;
    const support = getNativeOverrideSupport({
      xrSystem: xr,
      globalObject: this.globalObject
    });
    Object.assign(this.capabilityState, {
      phase: "uninstalled",
      supported: support.supported,
      ...clearedCapabilities(),
      notes: []
    });
    this.warned.clear();
    if (!xr || !support.supported) {
      const notes = support.notes.length > 0 ? support.notes : ["Native WebXR override prerequisites are unavailable."];
      this.capabilityState.supported = false;
      for (const note of notes) {
        this.note(note);
      }
      if (this.options.onUnsupported === "throw") {
        throw new Error(notes.join(" "));
      }
      return;
    }
    if (this.device[P_DEVICE].installedGlobalObject) {
      throw invalidState(
        "Cannot install a native override while the emulated IWER runtime is installed."
      );
    }
    const existing = installedOverride(xr);
    if (existing && existing !== this) {
      throw invalidState(
        "A native IWER override is already installed on this XRSystem."
      );
    }
    const override = this;
    const wrapSessionMethod = (nativeSessionMethod) => {
      const wrappedSessionMethod = async function(mode, options) {
        if (this !== xr || !isImmersiveMode(mode)) {
          return nativeSessionMethod.call(this, mode, options);
        }
        const request = override.prepareSessionRequest(options);
        const session = await nativeSessionMethod.call(
          this,
          mode,
          request.options
        );
        if (override.options.mode === "gaze-only" && request.gaze.enabled.length === 0) {
          return session;
        }
        try {
          await override.attachSession(session, mode, request.gaze.enabled);
        } catch (error) {
          override.detachSession(session);
          const failsRequest = request.gaze.required.length > 0 || request.gaze.enabled.length === 0 && override.options.onUnsupported === "throw";
          if (failsRequest) {
            await session.end().catch(() => {
            });
            if (request.gaze.required.length > 0 && (!(error instanceof DOMException) || error.name !== "NotSupportedError")) {
              throw notSupported(override.errorText(error));
            }
            throw error;
          }
          override.note(
            `Native session override was skipped: ${override.errorText(error)}`,
            "session-attach-failed"
          );
        }
        return session;
      };
      Object.defineProperty(wrappedSessionMethod, NATIVE_OVERRIDE_KEY, {
        value: this
      });
      return wrappedSessionMethod;
    };
    const patchSessionMethod = (key, wrappedSessionMethod) => {
      let patched = this.patches.define(xr, key, {
        configurable: true,
        writable: true,
        value: wrappedSessionMethod
      });
      if (!patched) {
        const found = methodDescriptor(xr, key);
        if (found && typeof found.descriptor.value === "function") {
          const descriptor = found.descriptor;
          patched = this.patches.define(found.owner, key, {
            ...descriptor,
            value: wrappedSessionMethod
          });
        }
      }
      return patched;
    };
    const nativeRequestSession = xr.requestSession;
    if (!patchSessionMethod(
      "requestSession",
      wrapSessionMethod(nativeRequestSession)
    )) {
      this.unsupported("Unable to patch native XRSystem.requestSession.");
      return;
    }
    const nativeOfferSession = Reflect.get(xr, "offerSession");
    if (typeof nativeOfferSession === "function") {
      if (patchSessionMethod(
        "offerSession",
        wrapSessionMethod(nativeOfferSession)
      )) {
        this.capabilityState.offerSession = true;
      } else {
        this.note(
          "The native XRSystem.offerSession method could not be patched; sessions created through it are not overridden."
        );
      }
    }
    this.patches.define(xr, NATIVE_OVERRIDE_KEY, {
      configurable: true,
      value: this
    });
    this.previousRuntime = this.device[P_DEVICE].runtime;
    this.device[P_DEVICE].runtime = {
      kind: "native",
      getSession: () => {
        const adapter = this.primarySession;
        if (!adapter || adapter.ended) {
          return null;
        }
        return {
          mode: adapter.mode,
          enabledFeatures: adapter.enabledFeatures,
          visibilityState: adapter.session.visibilityState,
          originOffsetMatrix: null,
          end: () => adapter.session.end()
        };
      },
      onActionPlayerCreated: this.options.mode === "full" ? (player) => this.wirePlayer(player) : void 0
    };
    this.installedState = true;
    this.capabilityState.phase = "installed";
    this.capabilityState.requestSession = true;
  }
  uninstall() {
    if (!this.installedState) {
      return;
    }
    this.installedState = false;
    for (const adapter of Array.from(this.liveSessions)) {
      this.detachAdapter(adapter, true);
    }
    this.unwirePlayer();
    this.patches.revert();
    if (this.previousRuntime) {
      this.device[P_DEVICE].runtime = this.previousRuntime;
      this.previousRuntime = null;
    }
    this.resetPatchTracking();
    this.playbackFrame = null;
    this.warned.clear();
    Object.assign(this.capabilityState, {
      phase: "uninstalled",
      ...clearedCapabilities(),
      notes: []
    });
  }
  /**
   * Splits a session request into what the browser is asked for and what IWER
   * answers itself. The caller's dictionary is never mutated: applications
   * legitimately reuse (and freeze) one options object across requests.
   */
  prepareSessionRequest(options) {
    const requiredFeatures = Array.from(options?.requiredFeatures ?? []);
    const optionalFeatures = Array.from(options?.optionalFeatures ?? []);
    const required = requiredFeatures.filter(isGazeTrackingFeature);
    const optional = optionalFeatures.filter(isGazeTrackingFeature);
    const supported = supportsGazeTracking(this.device.supportedFeatures);
    if (optional.length > 0 && !supported) {
      this.note(
        "Optional gaze tracking was not enabled because the selected IWER device profile does not advertise gaze support.",
        "unsupported-optional-gaze"
      );
    }
    if (required.length > 0 && !supported) {
      throw notSupported(
        `Required gaze tracking is unavailable because the selected IWER device profile "${this.device.name}" does not advertise gaze support. Select a gaze-capable profile such as metaQuestPro.`
      );
    }
    const enabled = supported ? Array.from(/* @__PURE__ */ new Set([...required, ...optional])) : [];
    if (!options) {
      return { options: void 0, gaze: { required, optional, enabled } };
    }
    const nativeOptions = { ...options };
    if (options.requiredFeatures) {
      nativeOptions.requiredFeatures = requiredFeatures.filter(
        (feature) => !isGazeTrackingFeature(feature)
      );
    }
    if (options.optionalFeatures) {
      nativeOptions.optionalFeatures = optionalFeatures.filter(
        (feature) => !isGazeTrackingFeature(feature)
      );
    }
    return { options: nativeOptions, gaze: { required, optional, enabled } };
  }
  /**
   * A session that asked for a gaze alias must never resolve without its gaze
   * source, so an override that went away mid-request fails the attach instead
   * of quietly handing back the unmodified native session.
   */
  failWhenGazeRequested(syntheticGazeFeatures) {
    if (syntheticGazeFeatures.length > 0) {
      throw notSupported(
        "Native override was uninstalled before the session could attach."
      );
    }
  }
  async attachSession(session, mode, syntheticGazeFeatures = []) {
    var _a15, _b2, _c, _d;
    if (!this.installedState) {
      this.failWhenGazeRequested(syntheticGazeFeatures);
      return;
    }
    if (this.sessionsByObject.has(session)) {
      return;
    }
    const nativeRequestReferenceSpace = this.captureNativeRequestReferenceSpace(session);
    const nativeRequestAnimationFrame = this.captureNativeRequestAnimationFrame(session);
    const nativeInputSources = this.options.mode === "gaze-only" ? this.captureNativeInputSources(session) : { read: () => [], live: false };
    let anchorSpace;
    let anchorType;
    for (const type of [
      "local-floor",
      "local",
      "unbounded"
    ]) {
      try {
        anchorSpace = await nativeRequestReferenceSpace.call(session, type);
        anchorType = type;
        break;
      } catch {
      }
    }
    if (!anchorSpace || !anchorType) {
      throw new Error(
        "No native local-floor, local, or unbounded reference space is available."
      );
    }
    if (anchorType !== "local-floor") {
      this.note(
        `Native local-floor is unavailable; poses are anchored to "${anchorType}" and are offset by the viewer's initial height.`
      );
    }
    if (!this.installedState) {
      this.failWhenGazeRequested(syntheticGazeFeatures);
      return;
    }
    const initialNativeSources = nativeInputSources.read();
    const adapter = {
      session,
      mode,
      anchorSpace,
      handTracking: this.sessionEnablesHandTracking(session),
      enabledFeatures: Object.freeze(
        Array.from(
          /* @__PURE__ */ new Set([
            ...Array.from(session.enabledFeatures ?? []),
            ...syntheticGazeFeatures
          ])
        )
      ),
      syntheticGazeFeatures: Object.freeze([...syntheticGazeFeatures]),
      nativeRequestAnimationFrame,
      nativeRequestReferenceSpace,
      nativeInputSources: nativeInputSources.read,
      nativeInputSourcesLive: nativeInputSources.live,
      nativeSources: Object.freeze([...initialNativeSources]),
      patches: new PatchRegistry(),
      instancePatches: new PatchRegistry(),
      cleanupListeners: [],
      sources: Object.freeze(
        this.options.mode === "gaze-only" ? Array.from(initialNativeSources) : []
      ),
      deviceBindings: [],
      playbackBindings: /* @__PURE__ */ new Map(),
      bindingByFacade: /* @__PURE__ */ new Map(),
      spaceTokens: /* @__PURE__ */ new Set([anchorSpace]),
      hitTests: /* @__PURE__ */ new Set(),
      baseSpaceCache: /* @__PURE__ */ new Map(),
      lastFrameTime: void 0,
      lastPreparedFrame: null,
      nativeViewerPoseValid: this.options.mode === "full",
      nativeViewerMatrix: mat4_exports.create(),
      framePreparationFailures: 0,
      activeFrame: null,
      framesInstrumented: false,
      pendingEvents: [],
      retainedSources: /* @__PURE__ */ new Set(),
      createAnchorAvailable: true,
      hitTestResultsAvailable: true,
      ended: false
    };
    this.sessionsByObject.set(session, adapter);
    this.liveSessions.add(adapter);
    this.primarySession ?? (this.primarySession = adapter);
    this.spaces.set(anchorSpace, {
      adapter,
      localOffset: mat4_exports.create()
    });
    const handInputBeforeAttach = this.capabilityState.handInput;
    try {
      if (this.options.mode === "full") {
        this.ensureReferenceSpacePatch(anchorSpace, adapter);
      }
      this.createDeviceBindings(adapter);
      const enabledFeaturesPatched = this.patchEnabledFeatures(adapter);
      const inputSourcesPatched = this.patchInputSources(adapter);
      const rafPatched = this.patchRequestAnimationFrame(adapter);
      adapter.framesInstrumented = rafPatched;
      const referenceSpacesPatched = this.options.mode === "full" ? this.patchRequestReferenceSpace(adapter) : false;
      if (this.options.mode === "full") {
        this.patchRequestHitTestSource(adapter);
      }
      this.installSessionListeners(adapter);
      if (!inputSourcesPatched) {
        if (syntheticGazeFeatures.length > 0) {
          throw notSupported(
            "Unable to expose the synthetic gaze input source."
          );
        }
        this.unsupportedForSession(
          adapter,
          "Unable to override XRSession.inputSources."
        );
      }
      if (!rafPatched) {
        if (syntheticGazeFeatures.length > 0) {
          throw notSupported(
            "Unable to update the synthetic gaze input on native frames."
          );
        }
        this.unsupportedForSession(
          adapter,
          "Unable to wrap XRSession.requestAnimationFrame."
        );
      }
      if (this.options.mode === "full" && !referenceSpacesPatched) {
        this.note(
          "XRReferenceSpace tagging is unavailable; viewer-relative offset spaces will use native behavior."
        );
      }
      if (!enabledFeaturesPatched && syntheticGazeFeatures.length > 0) {
        throw notSupported(
          "Unable to expose the synthetic gaze feature through XRSession.enabledFeatures."
        );
      }
      (_a15 = this.capabilityState).inputSources || (_a15.inputSources = inputSourcesPatched);
      (_b2 = this.capabilityState).inputEvents || (_b2.inputEvents = inputSourcesPatched && rafPatched);
      (_c = this.capabilityState).enabledFeatures || (_c.enabledFeatures = enabledFeaturesPatched);
      (_d = this.capabilityState).viewerSpaceTagging || (_d.viewerSpaceTagging = referenceSpacesPatched);
      if (this.capabilityState.phase === "installed") {
        this.capabilityState.phase = "attached";
      }
    } catch (error) {
      this.capabilityState.handInput = handInputBeforeAttach;
      this.detachAdapter(adapter);
      throw error;
    }
  }
  sessionEnablesHandTracking(session) {
    const features = session.enabledFeatures;
    if (features) {
      return Array.prototype.includes.call(features, HAND_TRACKING_FEATURE);
    }
    return this.device.supportedFeatures.includes(HAND_TRACKING_FEATURE);
  }
  // ===========================================================================
  // Input bindings
  // ===========================================================================
  createDeviceBindings(adapter) {
    if (this.options.mode === "full") {
      for (const controller of Object.values(this.device.controllers)) {
        adapter.deviceBindings.push(
          this.createInputBinding(
            adapter,
            "controller",
            controller.inputSource,
            {
              trackedInput: controller,
              exposeHand: false
            }
          )
        );
      }
      if (adapter.handTracking) {
        for (const hand of Object.values(this.device.hands)) {
          adapter.deviceBindings.push(
            this.createInputBinding(adapter, "hand", hand.inputSource, {
              trackedInput: hand,
              exposeHand: true
            })
          );
        }
      }
    }
    if (adapter.syntheticGazeFeatures.length > 0) {
      const gaze = this.device.gaze;
      if (!gaze) {
        throw new Error(
          "The selected device does not provide a synthetic gaze input."
        );
      }
      adapter.deviceBindings.push(
        this.createInputBinding(adapter, "gaze", gaze.inputSource, {
          trackedInput: gaze,
          exposeHand: false,
          available: this.options.mode === "gaze-only" ? () => adapter.nativeViewerPoseValid : void 0
        })
      );
    }
  }
  createInputBinding(adapter, kind, iwerSource, options) {
    const targetRaySpace = this.createSpaceToken(adapter);
    this.spaces.set(targetRaySpace, {
      adapter,
      origin: () => iwerSource.targetRaySpace,
      available: options.available,
      localOffset: mat4_exports.create()
    });
    let gripSpace;
    if (iwerSource.gripSpace) {
      gripSpace = this.createSpaceToken(adapter);
      this.spaces.set(gripSpace, {
        adapter,
        origin: () => iwerSource.gripSpace ?? null,
        available: options.available,
        localOffset: mat4_exports.create()
      });
    }
    const joints = [];
    if (options.exposeHand && iwerSource.hand) {
      for (const name of Object.values(XRHandJoint)) {
        const source = iwerSource.hand.get(name);
        if (!source) {
          continue;
        }
        const joint = {
          name,
          space: this.createJointSpaceFacade(name),
          source
        };
        this.spaces.set(joint.space, {
          adapter,
          origin: () => joint.source,
          available: options.available,
          localOffset: mat4_exports.create(),
          joint
        });
        joints.push(joint);
      }
    }
    const binding = {
      kind,
      iwerSource,
      trackedInput: options.trackedInput,
      inputSource: void 0,
      targetRaySpace,
      gripSpace,
      joints,
      eventButtons: this.eventButtons(iwerSource),
      previousButtonPressed: /* @__PURE__ */ new Map(),
      previousCancelGeneration: /* @__PURE__ */ new Map(),
      activeButtons: /* @__PURE__ */ new Set(),
      activeActions: /* @__PURE__ */ new Set(),
      pendingActions: /* @__PURE__ */ new Set()
    };
    binding.inputSource = this.createInputSourceFacade(binding, adapter);
    this.resetButtonBaseline(binding);
    adapter.bindingByFacade.set(binding.inputSource, binding);
    if (joints.length > 0) {
      this.capabilityState.handInput = true;
    }
    return binding;
  }
  /**
   * Returns the stable binding for a recorded playback source, creating it on
   * first use so the application always observes the same facade objects.
   */
  playbackBinding(adapter, source) {
    const existing = adapter.playbackBindings.get(source);
    if (existing) {
      return existing;
    }
    const exposeHand = Boolean(source.hand) && adapter.handTracking;
    if (source.hand && !adapter.handTracking) {
      this.note(
        `Recorded hand joints are hidden because the native session does not enable the "${HAND_TRACKING_FEATURE}" feature.`
      );
    }
    const binding = this.createInputBinding(adapter, "playback", source, {
      exposeHand
    });
    adapter.playbackBindings.set(source, binding);
    return binding;
  }
  /**
   * Allocates a distinct native reference space to use as a stable synthetic
   * space token. Browsers must return a fresh object for every call, otherwise
   * IWER cannot tell the target-ray and grip spaces apart.
   */
  createSpaceToken(adapter) {
    const identity3 = new (this.getRigidTransformConstructor())();
    const token = adapter.anchorSpace.getOffsetReferenceSpace(
      identity3
    );
    if (adapter.spaceTokens.has(token)) {
      throw new Error(
        "Native getOffsetReferenceSpace(identity) reused a space object; stable synthetic input tokens require distinct objects."
      );
    }
    adapter.spaceTokens.add(token);
    return token;
  }
  createInputSourceFacade(binding, adapter) {
    const inputPrototype = this.constructorPrototype("XRInputSource");
    const facade = Object.create(inputPrototype ?? Object.prototype);
    const iwerSource = binding.iwerSource;
    const gamepad = binding.joints.length > 0 || !iwerSource.gamepad ? null : this.createGamepadFacade(binding, adapter);
    Object.defineProperties(facade, {
      handedness: {
        configurable: true,
        enumerable: true,
        value: iwerSource.handedness
      },
      targetRayMode: {
        configurable: true,
        enumerable: true,
        value: iwerSource.targetRayMode
      },
      profiles: {
        configurable: true,
        enumerable: true,
        value: Object.freeze([...iwerSource.profiles])
      },
      targetRaySpace: {
        configurable: true,
        enumerable: true,
        value: binding.targetRaySpace
      },
      gripSpace: {
        configurable: true,
        enumerable: true,
        value: binding.gripSpace ?? null
      },
      gamepad: { configurable: true, enumerable: true, value: gamepad },
      hand: {
        configurable: true,
        enumerable: true,
        value: binding.joints.length > 0 ? this.createHandFacade(binding.joints) : null
      }
    });
    return facade;
  }
  /**
   * Builds an XRHand-shaped maplike facade. The prototype is borrowed from the
   * browser so branded checks succeed, while every maplike method is an own
   * property because native XRHand methods reject foreign receivers.
   */
  createHandFacade(joints) {
    const prototype = this.constructorPrototype("XRHand");
    const facade = Object.create(prototype ?? Object.prototype);
    const entries = new Map(
      joints.map((joint) => [joint.name, joint.space])
    );
    const define = (key, value) => {
      Object.defineProperty(facade, key, {
        configurable: true,
        writable: true,
        value
      });
    };
    Object.defineProperty(facade, "size", {
      configurable: true,
      enumerable: true,
      get: () => entries.size
    });
    define("get", (joint) => entries.get(joint));
    define("has", (joint) => entries.has(joint));
    define("keys", () => entries.keys());
    define("values", () => entries.values());
    define("entries", () => entries.entries());
    define(
      "forEach",
      function(callback, thisArg) {
        entries.forEach((value, key) => {
          callback.call(thisArg, value, key, facade);
        });
      }
    );
    define(Symbol.iterator, () => entries.entries());
    return facade;
  }
  /** Builds a stable XRJointSpace-shaped object for one hand joint. */
  createJointSpaceFacade(name) {
    const prototype = this.constructorPrototype("XRJointSpace") ?? this.constructorPrototype("XRSpace");
    const facade = Object.create(prototype ?? Object.prototype);
    Object.defineProperty(facade, "jointName", {
      configurable: true,
      enumerable: true,
      value: name
    });
    return facade;
  }
  createGamepadFacade(binding, adapter) {
    const prototype = this.constructorPrototype("Gamepad");
    const facade = Object.create(prototype ?? Object.prototype);
    const gamepad = binding.iwerSource.gamepad;
    let axes = Object.freeze(gamepad.axes.map((value) => value ?? 0));
    const buttons = Object.freeze(
      gamepad.buttons.map(
        (button) => Object.freeze({
          get pressed() {
            return button?.pressed ?? false;
          },
          get touched() {
            return button?.touched ?? false;
          },
          get value() {
            return button?.value ?? 0;
          }
        })
      )
    );
    const hapticActuators = Object.freeze([...gamepad.hapticActuators]);
    Object.defineProperties(facade, {
      id: {
        configurable: true,
        enumerable: true,
        value: ""
      },
      index: { configurable: true, enumerable: true, value: -1 },
      connected: {
        configurable: true,
        enumerable: true,
        get: () => (binding.trackedInput?.connected ?? true) && !adapter.ended
      },
      timestamp: {
        configurable: true,
        enumerable: true,
        get: () => adapter.lastFrameTime ?? 0
      },
      mapping: {
        configurable: true,
        enumerable: true,
        get: () => gamepad.mapping
      },
      axes: {
        configurable: true,
        enumerable: true,
        get: () => {
          const current = gamepad.axes.map((value) => value ?? 0);
          if (current.length !== axes.length || current.some((value, index) => value !== axes[index])) {
            axes = Object.freeze(current);
          }
          return axes;
        }
      },
      buttons: {
        configurable: true,
        enumerable: true,
        get: () => buttons
      },
      hapticActuators: {
        configurable: true,
        enumerable: true,
        get: () => hapticActuators
      },
      vibrationActuator: {
        configurable: true,
        enumerable: true,
        get: () => gamepad.vibrationActuator
      }
    });
    return facade;
  }
  eventButtons(iwerSource) {
    const gamepad = iwerSource.gamepad;
    if (!gamepad) {
      return [];
    }
    return Object.values(gamepad[P_GAMEPAD].buttonsMap).filter(
      (button) => button !== null
    );
  }
  resetButtonBaseline(binding) {
    for (const button of binding.eventButtons) {
      this.observeButton(binding, button);
    }
  }
  observeButton(binding, button) {
    binding.previousButtonPressed.set(button, button.pressed);
    binding.previousCancelGeneration.set(
      button,
      button[P_GAMEPAD].cancelGeneration
    );
  }
  /**
   * Forgets any in-progress action for a binding whose source just appeared or
   * disappeared, so a later removal cannot synthesize a duplicate end event.
   */
  clearActionState(binding) {
    binding.activeButtons.clear();
    binding.activeActions.clear();
    binding.pendingActions.clear();
  }
  // ===========================================================================
  // Session patches
  // ===========================================================================
  /**
   * Captures the browser method behind a prototype patch exactly once. A later
   * session otherwise sees IWER's wrapper as its "native" method and recurses.
   */
  captureNativeRequestAnimationFrame(session) {
    const found = methodDescriptor(session, "requestAnimationFrame");
    if (!found || typeof found.descriptor.value !== "function") {
      throw new Error("Native XRSession.requestAnimationFrame is unavailable.");
    }
    const cached = this.rawRafByOwner.get(found.owner);
    if (cached) {
      return cached;
    }
    const nativeMethod = found.descriptor.value;
    this.rawRafByOwner.set(found.owner, nativeMethod);
    return nativeMethod;
  }
  captureNativeRequestReferenceSpace(session) {
    const found = methodDescriptor(session, "requestReferenceSpace");
    if (!found || typeof found.descriptor.value !== "function") {
      throw new Error("Native XRSession.requestReferenceSpace is unavailable.");
    }
    const cached = this.rawRequestReferenceSpaceByOwner.get(found.owner);
    if (cached) {
      return cached;
    }
    const nativeMethod = found.descriptor.value;
    this.rawRequestReferenceSpaceByOwner.set(found.owner, nativeMethod);
    return nativeMethod;
  }
  /** Capture the browser's input-source getter before it is wrapped. */
  captureNativeInputSources(session) {
    const found = methodDescriptor(session, "inputSources");
    if (!found) {
      throw new Error("Native XRSession.inputSources is unavailable.");
    }
    let nativeGetter = this.rawInputSourcesGetterByOwner.get(found.owner);
    if (!nativeGetter && found.descriptor.get) {
      nativeGetter = found.descriptor.get;
      this.rawInputSourcesGetterByOwner.set(found.owner, nativeGetter);
    }
    if (nativeGetter) {
      return {
        read: () => Array.from(nativeGetter.call(session) ?? []),
        live: true
      };
    }
    if ("value" in found.descriptor) {
      const initialNativeSources = found.descriptor.value;
      return {
        read: () => {
          const current = Object.getOwnPropertyDescriptor(
            session,
            "inputSources"
          );
          const sources = current && "value" in current ? current.value : initialNativeSources;
          return Array.from(sources ?? []);
        },
        live: false
      };
    }
    throw new Error("Native XRSession.inputSources cannot be read.");
  }
  /**
   * Re-reports the aliases IWER answered itself through the session property
   * applications actually read. Only patched when there is something to add,
   * so a session without synthetic features keeps the browser's own array.
   */
  patchEnabledFeatures(adapter) {
    if (adapter.syntheticGazeFeatures.length === 0) {
      return false;
    }
    if (adapter.patches.define(adapter.session, "enabledFeatures", {
      configurable: true,
      enumerable: true,
      value: adapter.enabledFeatures
    })) {
      const exposed2 = Array.from(adapter.session.enabledFeatures ?? []);
      return adapter.syntheticGazeFeatures.every(
        (feature) => exposed2.includes(feature)
      );
    }
    const found = methodDescriptor(adapter.session, "enabledFeatures");
    const nativeGetter = found?.descriptor.get;
    if (!found || !nativeGetter) {
      return false;
    }
    if (!this.patchedEnabledFeaturesOwners.has(found.owner)) {
      const owner = this;
      const patched = this.patches.define(found.owner, "enabledFeatures", {
        ...found.descriptor,
        get() {
          return owner.sessionsByObject.get(this)?.enabledFeatures ?? nativeGetter.call(this);
        }
      });
      if (!patched) {
        return false;
      }
      this.patchedEnabledFeaturesOwners.add(found.owner);
    }
    const exposed = Array.from(adapter.session.enabledFeatures ?? []);
    return adapter.syntheticGazeFeatures.every(
      (feature) => exposed.includes(feature)
    );
  }
  patchInputSources(adapter) {
    if (adapter.patches.define(adapter.session, "inputSources", {
      configurable: true,
      enumerable: true,
      get: () => adapter.sources
    })) {
      return adapter.session.inputSources === adapter.sources;
    }
    const found = methodDescriptor(adapter.session, "inputSources");
    const nativeGetter = found?.descriptor.get;
    if (!found || !nativeGetter) {
      return false;
    }
    if (!this.patchedInputSourceOwners.has(found.owner)) {
      const owner = this;
      const patched = this.patches.define(found.owner, "inputSources", {
        ...found.descriptor,
        get() {
          return owner.sessionsByObject.get(this)?.sources ?? nativeGetter.call(this);
        }
      });
      if (!patched) {
        return false;
      }
      this.patchedInputSourceOwners.add(found.owner);
    }
    return adapter.session.inputSources === adapter.sources;
  }
  patchRequestAnimationFrame(adapter) {
    const owner = this;
    const wrapped = function(callback) {
      return adapter.nativeRequestAnimationFrame.call(this, (time, frame) => {
        owner.prepareFrameCallback(adapter, time, frame);
        try {
          callback(time, frame);
        } finally {
          owner.releaseFrameCallback(adapter, frame);
        }
      });
    };
    if (adapter.patches.define(adapter.session, "requestAnimationFrame", {
      configurable: true,
      writable: true,
      value: wrapped
    })) {
      return true;
    }
    const found = methodDescriptor(adapter.session, "requestAnimationFrame");
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return false;
    }
    if (!this.patchedRafOwners.has(found.owner)) {
      const patched = this.patches.define(
        found.owner,
        "requestAnimationFrame",
        {
          ...found.descriptor,
          value(callback) {
            const current = owner.sessionsByObject.get(this);
            if (!current) {
              return nativeMethod.call(this, callback);
            }
            return current.nativeRequestAnimationFrame.call(
              this,
              (time, frame) => {
                owner.prepareFrameCallback(current, time, frame);
                try {
                  callback(time, frame);
                } finally {
                  owner.releaseFrameCallback(current, frame);
                }
              }
            );
          }
        }
      );
      if (!patched) {
        return false;
      }
      this.patchedRafOwners.add(found.owner);
    }
    return true;
  }
  patchRequestReferenceSpace(adapter) {
    const owner = this;
    const wrapped = function(type) {
      return adapter.nativeRequestReferenceSpace.call(this, type).then((space) => {
        owner.tagRequestedReferenceSpace(adapter, space, type);
        owner.ensureReferenceSpacePatch(space, adapter);
        return space;
      });
    };
    if (adapter.patches.define(adapter.session, "requestReferenceSpace", {
      configurable: true,
      writable: true,
      value: wrapped
    })) {
      return true;
    }
    const found = methodDescriptor(adapter.session, "requestReferenceSpace");
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return false;
    }
    if (!this.patchedRequestReferenceSpaceOwners.has(found.owner)) {
      const patched = this.patches.define(
        found.owner,
        "requestReferenceSpace",
        {
          ...found.descriptor,
          value(type) {
            const current = owner.sessionsByObject.get(this);
            if (!current) {
              return nativeMethod.call(this, type);
            }
            return current.nativeRequestReferenceSpace.call(this, type).then((space) => {
              owner.tagRequestedReferenceSpace(current, space, type);
              owner.ensureReferenceSpacePatch(space, current);
              return space;
            });
          }
        }
      );
      if (!patched) {
        return false;
      }
      this.patchedRequestReferenceSpaceOwners.add(found.owner);
    }
    return true;
  }
  patchRequestHitTestSource(adapter) {
    const nativeMethod = adapter.session.requestHitTestSource;
    if (typeof nativeMethod !== "function") {
      return;
    }
    const owner = this;
    const wrapped = function(options) {
      return owner.handleRequestHitTestSource(this, nativeMethod, options);
    };
    if (adapter.patches.define(adapter.session, "requestHitTestSource", {
      configurable: true,
      writable: true,
      value: wrapped
    })) {
      return;
    }
    const found = methodDescriptor(adapter.session, "requestHitTestSource");
    if (!found || typeof found.descriptor.value !== "function" || this.patchedHitTestOwners.has(found.owner)) {
      return;
    }
    const prototypeMethod = found.descriptor.value;
    const patched = this.patches.define(found.owner, "requestHitTestSource", {
      ...found.descriptor,
      value(options) {
        return owner.handleRequestHitTestSource(this, prototypeMethod, options);
      }
    });
    if (patched) {
      this.patchedHitTestOwners.add(found.owner);
    }
  }
  tagRequestedReferenceSpace(adapter, space, type) {
    if (this.spaces.has(space)) {
      return;
    }
    if (type === "viewer") {
      this.spaces.set(space, {
        adapter,
        origin: () => this.currentViewerSpace(),
        localOffset: mat4_exports.create()
      });
    }
  }
  ensureReferenceSpacePatch(space, adapter) {
    if (this.instancePatchedReferenceSpaces.has(space)) {
      return;
    }
    const found = methodDescriptor(space, "getOffsetReferenceSpace");
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return;
    }
    const owner = this;
    const wrapper = function(originOffset) {
      const info = owner.spaces.get(this);
      if (!info || info.adapter.ended) {
        return nativeMethod.call(this, originOffset);
      }
      const derived = nativeMethod.call(this, originOffset);
      owner.propagateSpaceMetadata(this, derived, originOffset);
      owner.ensureReferenceSpacePatch(derived, info.adapter);
      return derived;
    };
    if (found.owner !== space && !this.patchedReferenceSpaceOwners.has(found.owner)) {
      const patched2 = this.patches.define(
        found.owner,
        "getOffsetReferenceSpace",
        {
          ...found.descriptor,
          value: wrapper
        }
      );
      if (patched2) {
        this.patchedReferenceSpaceOwners.add(found.owner);
        return;
      }
    } else if (found.owner !== space) {
      return;
    }
    const patched = adapter.patches.define(space, "getOffsetReferenceSpace", {
      configurable: true,
      writable: true,
      value: wrapper
    });
    if (patched) {
      this.instancePatchedReferenceSpaces.add(space);
    }
  }
  propagateSpaceMetadata(parent, derived, originOffset) {
    const info = this.spaces.get(parent);
    if (!info) {
      return;
    }
    const localOffset = mat4_exports.create();
    mat4_exports.multiply(
      localOffset,
      info.localOffset,
      matrixFromTransform(originOffset)
    );
    this.spaces.set(derived, {
      adapter: info.adapter,
      origin: info.origin,
      available: info.available,
      localOffset
    });
  }
  installSessionListeners(adapter) {
    const { session } = adapter;
    if (this.options.mode === "full") {
      const suppressNativeInput = (event) => {
        if (!this.syntheticEvents.has(event)) {
          event.stopImmediatePropagation();
        }
      };
      for (const type of ["inputsourceschange", ...INPUT_EVENT_NAMES]) {
        session.addEventListener(type, suppressNativeInput, true);
        adapter.cleanupListeners.push(
          () => session.removeEventListener(type, suppressNativeInput, true)
        );
      }
    } else {
      const syncNativeSources = (event) => {
        if (this.syntheticEvents.has(event)) {
          return;
        }
        try {
          if (!adapter.nativeInputSourcesLive) {
            const change = event;
            if (change.added == null || change.removed == null) {
              adapter.nativeSources = Object.freeze([
                ...adapter.nativeInputSources()
              ]);
            } else {
              const removed = new Set(Array.from(change.removed));
              const nativeSources = adapter.nativeSources.filter(
                (source) => !removed.has(source)
              );
              for (const source of Array.from(change.added)) {
                if (!nativeSources.includes(source)) {
                  nativeSources.push(source);
                }
              }
              adapter.nativeSources = Object.freeze(nativeSources);
            }
          }
        } catch (error) {
          try {
            adapter.nativeSources = Object.freeze([
              ...adapter.nativeInputSources()
            ]);
          } catch (readError) {
            this.note(
              `A native input-source change could not be reconciled; preserving the last known set: ${this.errorText(readError ?? error)}`,
              "gaze-only-native-input-change-failed"
            );
          }
        }
        this.refreshInputSources(adapter, true);
      };
      session.addEventListener("inputsourceschange", syncNativeSources, true);
      adapter.cleanupListeners.push(
        () => session.removeEventListener(
          "inputsourceschange",
          syncNativeSources,
          true
        )
      );
    }
    const onVisibilityChange = () => {
      const driver = this.sharedStateDriver();
      this.device[P_DEVICE].visibilityState = driver?.session.visibilityState ?? session.visibilityState;
      this.device[P_DEVICE].pendingVisibilityState = null;
      if (adapter.lastFrameTime !== void 0) {
        this.refreshInputSources(adapter, true);
      }
    };
    session.addEventListener("visibilitychange", onVisibilityChange);
    adapter.cleanupListeners.push(
      () => session.removeEventListener("visibilitychange", onVisibilityChange)
    );
    const onEnd = () => this.detachAdapter(adapter);
    session.addEventListener("end", onEnd, { once: true });
    adapter.cleanupListeners.push(
      () => session.removeEventListener("end", onEnd)
    );
  }
  // ===========================================================================
  // Frame loop
  // ===========================================================================
  tick(adapter, time, frame) {
    if (adapter.ended || adapter.lastFrameTime === time && adapter.lastPreparedFrame === frame) {
      return;
    }
    adapter.lastFrameTime = time;
    adapter.lastPreparedFrame = frame;
    adapter.baseSpaceCache.clear();
    if (this.options.mode === "gaze-only") {
      this.syncDeviceViewerFromNative(adapter, frame);
    }
    if (adapter === this.sharedStateDriver()) {
      this.advanceSharedState(adapter, time);
    }
    this.refreshInputSources(adapter, true);
    this.drainPendingEvents(adapter, frame);
    this.refreshInputSources(adapter, true);
    this.dispatchButtonTransitions(adapter, frame);
    this.updateHitTestSources(adapter);
  }
  /**
   * Keep the synthetic gaze origin coincident with the physical headset while
   * leaving the browser-owned viewer pose untouched.
   */
  syncDeviceViewerFromNative(adapter, frame) {
    adapter.nativeViewerPoseValid = false;
    const found = methodDescriptor(frame, "getViewerPose");
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      this.note(
        "The native XRFrame.getViewerPose implementation is unavailable; synthetic gaze is untracked for this frame.",
        "gaze-only-viewer-pose-unavailable"
      );
      return;
    }
    let pose;
    try {
      pose = nativeMethod.call(frame, adapter.anchorSpace);
    } catch {
      return;
    }
    if (!pose) {
      return;
    }
    const transform = this.readNativeTransform(pose);
    if (!transform) {
      return;
    }
    const matrix = matrixFromTransform(transform);
    mat4_exports.copy(adapter.nativeViewerMatrix, matrix);
    this.applyDeviceViewerMatrix(matrix);
    adapter.nativeViewerPoseValid = true;
  }
  applyDeviceViewerMatrix(matrix) {
    mat4_exports.getTranslation(scratchPosition2, matrix);
    mat4_exports.getRotation(scratchOrientation2, matrix);
    this.device.position.set(
      scratchPosition2[0],
      scratchPosition2[1],
      scratchPosition2[2]
    );
    this.device.quaternion.set(
      scratchOrientation2[0],
      scratchOrientation2[1],
      scratchOrientation2[2],
      scratchOrientation2[3]
    );
    this.device[P_DEVICE].updateViews();
  }
  /**
   * Uses the primary session while it is visible, otherwise the first visible
   * session. Native runtimes normally expose one immersive session, but this
   * keeps shared device state live in runtimes that permit concurrent sessions.
   */
  sharedStateDriver() {
    if (this.primarySession?.session.visibilityState === "visible") {
      return this.primarySession;
    }
    return Array.from(this.liveSessions).find(
      (adapter) => adapter.session.visibilityState === "visible"
    ) ?? this.primarySession;
  }
  advanceSharedState(adapter, time) {
    const previousTime = this.lastPrimaryTime;
    this.lastPrimaryTime = time;
    const delta = previousTime === void 0 ? 16.67 : Math.min(Math.max(0, time - previousTime), MAX_REMOTE_FRAME_MS);
    if (this.options.mode === "gaze-only") {
      this.device[P_DEVICE].remote?.update(delta);
      if (adapter.nativeViewerPoseValid) {
        this.applyDeviceViewerMatrix(adapter.nativeViewerMatrix);
      }
      this.device[P_DEVICE].visibilityState = adapter.session.visibilityState;
      this.device[P_DEVICE].pendingVisibilityState = null;
      this.device.gaze?.updateTargetRaySpace();
      return;
    }
    this.device[P_DEVICE].remote?.update(delta);
    this.device[P_DEVICE].visibilityState = adapter.session.visibilityState;
    this.device[P_DEVICE].pendingVisibilityState = null;
    const player = this.device[P_DEVICE].actionPlayer;
    if (player && (player.playing || player[P_ACTION_PLAYER].manualFrameActive)) {
      this.wirePlayer(player);
      this.playbackFrame = player;
      this.capabilityState.actionPlayback = true;
      if (player.playing && player[P_ACTION_PLAYER].autoAdvance) {
        player.playFrame();
      }
    } else {
      this.playbackFrame = null;
      if (this.wiredPlayer && this.wiredPlayer !== player) {
        this.unwirePlayer();
      }
      this.updateDeviceInputs();
    }
    this.device[P_DEVICE].updateViews();
  }
  /**
   * Mirrors XRTrackedInput.onFrameStart's state advance for the inputs the
   * device currently exposes: snapshot the target-ray pose, apply pending
   * gamepad values, and refresh interpolated hand joints.
   *
   * This reads the shared device rather than any one session's bindings, so a
   * session that cannot publish a given input kind (a session without
   * hand-tracking, say) never stalls that input for the other sessions.
   */
  updateDeviceInputs() {
    for (const input of this.device.activeInputs) {
      input.updateTargetRaySpace();
      for (const button of input.inputSource.gamepad?.buttons ?? []) {
        if (button instanceof GamepadButton) {
          advanceButton(button);
        }
      }
      input.updateHandPose?.();
    }
  }
  prepareFrameCallback(adapter, time, frame) {
    if (!this.installedState || adapter.ended) {
      return;
    }
    const isNewFrame = adapter.lastFrameTime !== time || adapter.lastPreparedFrame !== frame;
    if (this.options.mode === "gaze-only" && isNewFrame) {
      adapter.nativeViewerPoseValid = false;
    }
    try {
      if (isNewFrame) {
        adapter.instancePatches.revert();
        this.epoch += 1;
      }
      this.frameSessions.set(frame, adapter);
      adapter.activeFrame = frame;
      this.ensureFramePatches(frame);
      this.tick(adapter, time, frame);
      if (this.unhealthyFrameAdapters.delete(adapter) && this.unhealthyFrameAdapters.size === 0) {
        this.capabilityState.supported = true;
      }
      adapter.framePreparationFailures = 0;
    } catch (error) {
      if (this.options.mode === "gaze-only") {
        adapter.nativeViewerPoseValid = false;
      }
      adapter.framePreparationFailures += 1;
      const failureCount = adapter.framePreparationFailures;
      if (failureCount >= FRAME_PREPARATION_FAILURE_THRESHOLD) {
        this.unhealthyFrameAdapters.add(adapter);
        this.capabilityState.supported = false;
      }
      try {
        if (failureCount === 1 || failureCount === FRAME_PREPARATION_FAILURE_THRESHOLD || failureCount === FRAME_PREPARATION_FINAL_DIAGNOSTIC_COUNT) {
          this.note(
            `Native frame preparation failed ${failureCount} consecutive time${failureCount === 1 ? "" : "s"}; the application frame was preserved${failureCount >= FRAME_PREPARATION_FAILURE_THRESHOLD ? " and the override was marked unsupported" : ""}: ${this.errorText(error)}`,
            `frame-preparation-failed-${failureCount}`
          );
        }
      } catch {
      }
    }
  }
  /**
   * Ends this session's ownership of the frame. WebXR marks an XRFrame inactive
   * as soon as its callback returns, so nothing may hand it to the application
   * (or query it) afterwards.
   */
  releaseFrameCallback(adapter, frame) {
    if (adapter.activeFrame === frame) {
      adapter.activeFrame = null;
    }
  }
  /**
   * The recording currently driving poses and inputs, or null when the device
   * state is authoritative. Stays non-null for the remainder of the native
   * frame in which the recording reached its final sample.
   */
  activePlayer() {
    if (this.playbackFrame) {
      return this.playbackFrame;
    }
    const player = this.device[P_DEVICE].actionPlayer;
    return player && (player.playing || player[P_ACTION_PLAYER].manualFrameActive) ? player : null;
  }
  currentViewerSpace() {
    if (this.options.mode === "gaze-only") {
      return this.device[P_DEVICE].viewerSpace;
    }
    const player = this.activePlayer();
    return player ? player.viewerSpace : this.device[P_DEVICE].viewerSpace;
  }
  refreshInputSources(adapter, dispatchChange) {
    const visible = adapter.session.visibilityState === "visible";
    const next = this.options.mode === "gaze-only" || visible ? this.expectedSources(adapter) : [];
    if (visible) {
      for (const retained of adapter.retainedSources) {
        if (!next.includes(retained)) {
          next.push(retained);
        }
      }
    } else {
      adapter.pendingEvents.length = 0;
      adapter.retainedSources.clear();
      for (const binding of adapter.bindingByFacade.values()) {
        binding.pendingActions.clear();
      }
    }
    const removed = adapter.sources.filter((source) => !next.includes(source));
    const added = next.filter((source) => !adapter.sources.includes(source));
    if (added.length === 0 && removed.length === 0) {
      return;
    }
    for (const source of removed) {
      const binding = adapter.bindingByFacade.get(source);
      if (!binding) {
        continue;
      }
      if (visible) {
        for (const trigger of Array.from(binding.activeActions)) {
          this.emitInputEvent(
            adapter,
            `${trigger}end`,
            source,
            false
          );
        }
      }
      this.clearActionState(binding);
      this.resetButtonBaseline(binding);
    }
    for (const source of added) {
      const binding = adapter.bindingByFacade.get(source);
      if (binding) {
        binding.activeButtons.clear();
        this.resetButtonBaseline(binding);
      }
    }
    if (visible && removed.some(
      (source) => adapter.bindingByFacade.get(source)?.kind === "gaze"
    )) {
      this.releaseGazeCommitActions(adapter, next);
    }
    adapter.sources = Object.freeze([...next]);
    if (dispatchChange) {
      const announcedAdded = this.options.mode === "gaze-only" ? added.filter((source) => adapter.bindingByFacade.has(source)) : added;
      const announcedRemoved = this.options.mode === "gaze-only" ? removed.filter((source) => adapter.bindingByFacade.has(source)) : removed;
      if (announcedAdded.length > 0 || announcedRemoved.length > 0) {
        this.dispatchInputSourcesChange(
          adapter,
          announcedAdded,
          announcedRemoved
        );
      }
    }
  }
  expectedSources(adapter) {
    if (this.options.mode === "gaze-only") {
      const nativeSources = this.readNativeInputSources(adapter);
      const gaze2 = adapter.session.visibilityState === "visible" ? this.connectedSources(adapter, "gaze") : [];
      return [
        ...nativeSources,
        ...gaze2.filter((source) => !nativeSources.includes(source))
      ];
    }
    const player = this.activePlayer();
    if (player) {
      try {
        return player.inputSources.map(
          (source) => this.playbackBinding(adapter, source).inputSource
        );
      } catch (error) {
        this.note(
          `Recorded input sources could not be published: ${this.errorText(
            error
          )}`,
          "recorded-input-publication-failed"
        );
        return [];
      }
    }
    const kind = this.device.primaryInputMode;
    const gaze = this.connectedSources(adapter, "gaze");
    if (kind === "hand" && !adapter.handTracking) {
      this.note(
        `Native hand input requires the "${HAND_TRACKING_FEATURE}" feature on the browser session; no synthetic hand input sources are published while hand mode is selected.`
      );
      return gaze;
    }
    return [...this.connectedSources(adapter, kind), ...gaze];
  }
  readNativeInputSources(adapter) {
    if (!adapter.nativeInputSourcesLive) {
      return Array.from(adapter.nativeSources);
    }
    try {
      const sources = Array.from(adapter.nativeInputSources());
      adapter.nativeSources = Object.freeze([...sources]);
      return sources;
    } catch (error) {
      this.note(
        `Native input sources could not be read; preserving the last known set: ${this.errorText(error)}`,
        "gaze-only-native-input-sources-unavailable"
      );
      return adapter.sources.filter(
        (source) => !adapter.bindingByFacade.has(source)
      );
    }
  }
  /**
   * Ends the select actions that were committed against a gaze target ray.
   *
   * Gaze carries the aim and a separate source carries the commit, so a gaze
   * source that disappears mid-press would otherwise leave the application
   * holding an interaction it can no longer point. Squeeze is untouched: it is
   * not part of the gaze-plus-pinch contract and stays with its own source.
   */
  releaseGazeCommitActions(adapter, published) {
    const clearsSharedInputState = adapter === this.sharedStateDriver();
    for (const binding of adapter.deviceBindings) {
      if (binding.kind === "gaze" || !published.includes(binding.inputSource)) {
        continue;
      }
      const selectButtons = binding.eventButtons.filter(
        (button) => button[P_GAMEPAD].eventTrigger === "select"
      );
      if (selectButtons.length === 0) {
        continue;
      }
      if (binding.activeActions.has("select")) {
        this.emitInputEvent(adapter, "selectend", binding.inputSource, false);
        binding.activeActions.delete("select");
      }
      binding.pendingActions.delete("select");
      for (const button of selectButtons) {
        binding.activeButtons.delete(button);
        if (clearsSharedInputState) {
          this.releaseButton(button);
        }
        this.observeButton(binding, button);
      }
    }
  }
  /** Drops a shared device button back to a fully released, edge-free state. */
  releaseButton(button) {
    resetButton(button);
  }
  connectedSources(adapter, kind) {
    return adapter.deviceBindings.filter(
      (binding) => binding.kind === kind && binding.trackedInput.connected
    ).map((binding) => binding.inputSource);
  }
  dispatchButtonTransitions(adapter, frame) {
    const visibleSources = new Set(adapter.sources);
    for (const binding of adapter.deviceBindings) {
      if (!visibleSources.has(binding.inputSource)) {
        continue;
      }
      for (const button of binding.eventButtons) {
        const previous = binding.previousButtonPressed.get(button) ?? false;
        const cancelled = (binding.previousCancelGeneration.get(button) ?? button[P_GAMEPAD].cancelGeneration) !== button[P_GAMEPAD].cancelGeneration;
        const current = button.pressed;
        this.observeButton(binding, button);
        const trigger = button[P_GAMEPAD].eventTrigger;
        if (!trigger) {
          continue;
        }
        if (previous && (cancelled || !current)) {
          if (binding.activeButtons.delete(button)) {
            if (!cancelled) {
              this.dispatchInputEvent(
                adapter,
                trigger,
                frame,
                binding.inputSource
              );
            }
            this.dispatchInputEvent(
              adapter,
              `${trigger}end`,
              frame,
              binding.inputSource
            );
          }
        }
        if (current && (!previous || cancelled)) {
          binding.activeButtons.add(button);
          this.dispatchInputEvent(
            adapter,
            `${trigger}start`,
            frame,
            binding.inputSource
          );
        }
      }
    }
  }
  // ===========================================================================
  // Action playback routing
  // ===========================================================================
  /**
   * Attaches an event context so ActionPlayer's own select/squeeze edge
   * detection (including edges skipped across multi-frame advances) is routed
   * through the stable native facades instead of IWER's emulated session.
   */
  wirePlayer(player) {
    if (this.wiredPlayer === player) {
      return;
    }
    this.unwirePlayer();
    this.previousPlayerContext = player[P_ACTION_PLAYER].eventContext;
    const owner = this;
    const relay = {
      dispatchEvent(event) {
        owner.forwardPlaybackEvent(event);
        return true;
      }
    };
    player.setEventContext({
      session: relay,
      // ActionPlayer skips edge detection entirely when this yields nothing, so
      // never return null: an application-driven stepFrames() runs outside any
      // animation frame callback and its edges must still reach the queue.
      // The override re-stamps each event with a real frame as it drains.
      getFrame: () => this.primarySession?.activeFrame ?? this.detachedPlaybackFrame,
      onDiscontinuity: () => {
        owner.terminatePlaybackActions();
      }
    });
    this.wiredPlayer = player;
  }
  unwirePlayer() {
    const player = this.wiredPlayer;
    if (!player) {
      return;
    }
    this.wiredPlayer = null;
    const previous = this.previousPlayerContext;
    this.previousPlayerContext = void 0;
    try {
      player.setEventContext(previous);
    } catch {
    }
  }
  /**
   * Queues one ActionPlayer edge on every live session, addressed to the
   * native facades.
   *
   * ActionPlayer emits WebXR order: `<trigger>start` on press, `<trigger>` then
   * `<trigger>end` on release, and `<trigger>end` alone on a cancel. The
   * completion event is held until its end arrives, so each session emits the
   * pair only for an action it saw start.
   */
  forwardPlaybackEvent(event) {
    const recorded = event.inputSource;
    if (!recorded) {
      return;
    }
    const type = event.type;
    const trigger = type.startsWith("select") ? "select" : type.startsWith("squeeze") ? "squeeze" : null;
    if (!trigger) {
      return;
    }
    const suffix = type.slice(trigger.length);
    if (suffix !== "" && suffix !== "start" && suffix !== "end") {
      return;
    }
    let completions = this.playbackCompletions.get(recorded);
    if (!completions) {
      completions = /* @__PURE__ */ new Set();
      this.playbackCompletions.set(recorded, completions);
    }
    if (suffix === "") {
      completions.add(trigger);
      return;
    }
    const completed = suffix === "end" && completions.delete(trigger);
    for (const adapter of this.liveSessions) {
      let binding;
      try {
        binding = this.playbackBinding(adapter, recorded);
      } catch (error) {
        this.note(
          `A recorded input event could not be bound to a native input source: ${this.errorText(
            error
          )}`,
          "recorded-input-binding-failed"
        );
        continue;
      }
      if (suffix === "start") {
        this.terminatePlaybackAction(adapter, binding, trigger);
        binding.pendingActions.add(trigger);
        this.emitInputEvent(
          adapter,
          `${trigger}start`,
          binding.inputSource,
          true
        );
      } else {
        if (!binding.pendingActions.delete(trigger)) {
          continue;
        }
        if (completed) {
          this.emitInputEvent(adapter, trigger, binding.inputSource, true);
        }
        this.emitInputEvent(
          adapter,
          `${trigger}end`,
          binding.inputSource,
          true
        );
      }
    }
  }
  terminatePlaybackActions() {
    for (const adapter of this.liveSessions) {
      for (const binding of adapter.playbackBindings.values()) {
        for (const trigger of /* @__PURE__ */ new Set([
          ...binding.pendingActions,
          ...binding.activeActions
        ])) {
          this.terminatePlaybackAction(adapter, binding, trigger);
        }
      }
    }
  }
  terminatePlaybackAction(adapter, binding, trigger) {
    const wasPending = binding.pendingActions.delete(trigger);
    if (!wasPending && !binding.activeActions.has(trigger)) {
      return;
    }
    const endType = `${trigger}end`;
    const alreadyQueued = adapter.pendingEvents.some(
      (event) => event.inputSource === binding.inputSource && event.type === endType
    );
    if (!alreadyQueued) {
      this.emitInputEvent(adapter, endType, binding.inputSource, true);
    }
  }
  /**
   * Dispatches an input event immediately when this session owns an active
   * frame, and otherwise queues it for the session's next animation frame
   * callback. `retain` keeps the source published until the queue drains.
   */
  emitInputEvent(adapter, type, inputSource, retain) {
    const frame = adapter.activeFrame;
    if (frame && adapter.sources.includes(inputSource)) {
      this.dispatchInputEvent(adapter, type, frame, inputSource);
      return;
    }
    if (adapter.pendingEvents.length >= MAX_PENDING_EVENTS) {
      this.compactPendingEvents(adapter);
    }
    adapter.pendingEvents.push({ type, inputSource });
    if (retain) {
      adapter.retainedSources.add(inputSource);
    }
  }
  /**
   * Drops the oldest complete queued action lifecycle under backpressure.
   * Incomplete lifecycles are retained even past the soft limit: preserving
   * WebXR's start/end invariant is more important than a strict queue bound.
   */
  compactPendingEvents(adapter) {
    const starts = /* @__PURE__ */ new Map();
    let lifecycle;
    for (let index = 0; index < adapter.pendingEvents.length; index++) {
      const event = adapter.pendingEvents[index];
      if (event.type.endsWith("start")) {
        const trigger3 = event.type.slice(
          0,
          -"start".length
        );
        let byTrigger2 = starts.get(event.inputSource);
        if (!byTrigger2) {
          byTrigger2 = /* @__PURE__ */ new Map();
          starts.set(event.inputSource, byTrigger2);
        }
        if (!byTrigger2.has(trigger3)) {
          byTrigger2.set(trigger3, index);
        }
        continue;
      }
      if (!event.type.endsWith("end")) {
        continue;
      }
      const trigger2 = event.type.slice(0, -"end".length);
      const byTrigger = starts.get(event.inputSource);
      const startIndex2 = byTrigger?.get(trigger2);
      if (startIndex2 === void 0) {
        continue;
      }
      byTrigger.delete(trigger2);
      if (!lifecycle || startIndex2 < lifecycle.startIndex) {
        lifecycle = {
          startIndex: startIndex2,
          endIndex: index,
          inputSource: event.inputSource,
          trigger: trigger2
        };
      }
    }
    if (!lifecycle) {
      return;
    }
    const { startIndex, endIndex, inputSource, trigger } = lifecycle;
    const startType = `${trigger}start`;
    const endType = `${trigger}end`;
    adapter.pendingEvents = adapter.pendingEvents.filter(
      (event, index) => index < startIndex || index > endIndex || event.inputSource !== inputSource || event.type !== trigger && event.type !== startType && event.type !== endType
    );
    this.note(
      "A native session fell too far behind; an oldest complete queued input action was discarded."
    );
  }
  /** Flushes queued input events with a frame this session currently owns. */
  drainPendingEvents(adapter, frame) {
    if (adapter.pendingEvents.length === 0) {
      adapter.retainedSources.clear();
      return;
    }
    const queued2 = adapter.pendingEvents.splice(0);
    adapter.retainedSources.clear();
    for (const entry of queued2) {
      this.dispatchInputEvent(adapter, entry.type, frame, entry.inputSource);
    }
  }
  dispatchInputEvent(adapter, type, frame, inputSource) {
    this.recordDeliveredAction(adapter, type, inputSource);
    const event = this.createEvent(type, "XRInputSourceEvent", {
      frame,
      inputSource
    });
    this.syntheticEvents.add(event);
    adapter.session.dispatchEvent(event);
  }
  /**
   * Tracks which actions the application currently believes are in progress.
   * Only delivered events count, so an event dropped while a session was not
   * visible can never produce an unmatched terminating event later.
   */
  recordDeliveredAction(adapter, type, inputSource) {
    const binding = adapter.bindingByFacade.get(inputSource);
    if (!binding) {
      return;
    }
    if (type.endsWith("start")) {
      binding.activeActions.add(
        type.slice(0, -"start".length)
      );
    } else if (type.endsWith("end")) {
      binding.activeActions.delete(
        type.slice(0, -"end".length)
      );
    }
  }
  dispatchInputSourcesChange(adapter, added, removed) {
    const event = this.createEvent(
      "inputsourceschange",
      "XRInputSourcesChangeEvent",
      {
        session: adapter.session,
        added: Object.freeze([...added]),
        removed: Object.freeze([...removed])
      }
    );
    this.syntheticEvents.add(event);
    adapter.session.dispatchEvent(event);
  }
  createEvent(type, prototypeName, properties) {
    const EventConstructor = eventConstructor(this.globalObject);
    if (!EventConstructor) {
      throw new Error("Event constructor is unavailable.");
    }
    const event = new EventConstructor(type);
    const prototype = this.constructorPrototype(prototypeName);
    if (prototype) {
      try {
        Object.setPrototypeOf(event, prototype);
        if (prototypeName === "XRInputSourceEvent") {
          this.capabilityState.brandedInputEvents = true;
        }
      } catch {
      }
    }
    for (const [key, value] of Object.entries(properties)) {
      Object.defineProperty(event, key, {
        configurable: true,
        enumerable: true,
        value
      });
    }
    return event;
  }
  // ===========================================================================
  // Frame patches
  // ===========================================================================
  ensureFramePatches(frame) {
    var _a15, _b2, _c;
    if (this.instancePatchedFrameEpochs.get(frame) === this.epoch) {
      return;
    }
    const adapter = this.adapterForFrame(frame);
    const posePatched = this.patchFrameGetPose(frame);
    const batchPatched = this.patchFrameFillPoses(frame);
    const full = this.options.mode === "full";
    const viewerPatched = full ? this.patchFrameGetViewerPose(frame) : false;
    const jointPatched = full ? this.patchFrameGetJointPose(frame) : false;
    const radiiPatched = full ? this.patchFrameFillJointRadii(frame) : false;
    if (adapter && full) {
      this.recordAnchorAvailability(
        adapter,
        this.patchFrameCreateAnchor(frame)
      );
      this.recordHitTestAvailability(
        adapter,
        this.patchFrameGetHitTestResults(frame)
      );
    }
    (_a15 = this.capabilityState).poseOverride || (_a15.poseOverride = posePatched);
    (_b2 = this.capabilityState).batchPoses || (_b2.batchPoses = batchPatched);
    (_c = this.capabilityState).jointPoses || (_c.jointPoses = full && jointPatched && radiiPatched);
    if (!posePatched) {
      this.note("Unable to patch native XRFrame.getPose.");
    }
    if (!batchPatched) {
      this.note("Unable to patch native XRFrame.fillPoses.");
    }
    if (full && !viewerPatched) {
      this.note("Unable to patch native XRFrame.getViewerPose.");
    }
    this.instancePatchedFrameEpochs.set(frame, this.epoch);
  }
  patchFrameGetPose(frame) {
    const found = methodDescriptor(frame, "getPose");
    if (found && found.owner !== frame && this.patchedFrameOwners.has(found.owner)) {
      return true;
    }
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return false;
    }
    const owner = this;
    if (found.owner !== frame) {
      this.rawGetPoseByOwner.set(found.owner, nativeMethod);
      const patched = this.patches.define(found.owner, "getPose", {
        ...found.descriptor,
        value(space, baseSpace) {
          return owner.handleGetPose(this, nativeMethod, space, baseSpace);
        }
      });
      if (patched) {
        this.patchedFrameOwners.add(found.owner);
        return true;
      }
    }
    this.rawGetPoseByFrame.set(frame, nativeMethod);
    return this.defineFrameMethod(
      frame,
      "getPose",
      function(space, baseSpace) {
        return owner.handleGetPose(this, nativeMethod, space, baseSpace);
      }
    );
  }
  patchFrameGetViewerPose(frame) {
    const found = methodDescriptor(frame, "getViewerPose");
    if (found && found.owner !== frame && this.patchedViewerFrameOwners.has(found.owner)) {
      return true;
    }
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return false;
    }
    const owner = this;
    if (found.owner !== frame) {
      const patched = this.patches.define(found.owner, "getViewerPose", {
        ...found.descriptor,
        value(referenceSpace) {
          return owner.handleGetViewerPose(this, nativeMethod, referenceSpace);
        }
      });
      if (patched) {
        this.patchedViewerFrameOwners.add(found.owner);
        return true;
      }
    }
    return this.defineFrameMethod(
      frame,
      "getViewerPose",
      function(referenceSpace) {
        return owner.handleGetViewerPose(this, nativeMethod, referenceSpace);
      }
    );
  }
  patchFrameFillPoses(frame) {
    const found = methodDescriptor(frame, "fillPoses");
    if (found && found.owner !== frame && this.patchedFillPosesOwners.has(found.owner)) {
      return true;
    }
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return false;
    }
    const owner = this;
    if (found.owner !== frame) {
      const patched = this.patches.define(found.owner, "fillPoses", {
        ...found.descriptor,
        value(spaces, baseSpace, transforms) {
          return owner.handleFillPoses(
            this,
            nativeMethod,
            spaces,
            baseSpace,
            transforms
          );
        }
      });
      if (patched) {
        this.patchedFillPosesOwners.add(found.owner);
        return true;
      }
    }
    return this.defineFrameMethod(
      frame,
      "fillPoses",
      function(spaces, baseSpace, transforms) {
        return owner.handleFillPoses(
          this,
          nativeMethod,
          spaces,
          baseSpace,
          transforms
        );
      }
    );
  }
  patchFrameGetJointPose(frame) {
    const found = methodDescriptor(frame, "getJointPose");
    if (found && found.owner !== frame && this.patchedJointPoseOwners.has(found.owner)) {
      return true;
    }
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return false;
    }
    const owner = this;
    if (found.owner !== frame) {
      const patched = this.patches.define(found.owner, "getJointPose", {
        ...found.descriptor,
        value(joint, baseSpace) {
          return owner.handleGetJointPose(this, nativeMethod, joint, baseSpace);
        }
      });
      if (patched) {
        this.patchedJointPoseOwners.add(found.owner);
        return true;
      }
    }
    return this.defineFrameMethod(
      frame,
      "getJointPose",
      function(joint, baseSpace) {
        return owner.handleGetJointPose(this, nativeMethod, joint, baseSpace);
      }
    );
  }
  patchFrameFillJointRadii(frame) {
    const found = methodDescriptor(frame, "fillJointRadii");
    if (found && found.owner !== frame && this.patchedJointRadiiOwners.has(found.owner)) {
      return true;
    }
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return false;
    }
    const owner = this;
    if (found.owner !== frame) {
      const patched = this.patches.define(found.owner, "fillJointRadii", {
        ...found.descriptor,
        value(jointSpaces, radii) {
          return owner.handleFillJointRadii(
            this,
            nativeMethod,
            jointSpaces,
            radii
          );
        }
      });
      if (patched) {
        this.patchedJointRadiiOwners.add(found.owner);
        return true;
      }
    }
    return this.defineFrameMethod(
      frame,
      "fillJointRadii",
      function(jointSpaces, radii) {
        return owner.handleFillJointRadii(
          this,
          nativeMethod,
          jointSpaces,
          radii
        );
      }
    );
  }
  patchFrameCreateAnchor(frame) {
    const found = methodDescriptor(frame, "createAnchor");
    if (found && found.owner !== frame && this.patchedCreateAnchorOwners.has(found.owner)) {
      return "patched";
    }
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return "unavailable";
    }
    const owner = this;
    const wrapped = function(pose, space) {
      return owner.handleCreateAnchor(this, nativeMethod, pose, space);
    };
    if (found.owner !== frame) {
      const patched = this.patches.define(found.owner, "createAnchor", {
        ...found.descriptor,
        value: wrapped
      });
      if (patched) {
        this.patchedCreateAnchorOwners.add(found.owner);
        return "patched";
      }
    }
    return this.defineFrameMethod(frame, "createAnchor", wrapped) ? "patched" : "failed";
  }
  patchFrameGetHitTestResults(frame) {
    const found = methodDescriptor(frame, "getHitTestResults");
    if (found && found.owner !== frame && this.patchedHitTestResultOwners.has(found.owner)) {
      return "patched";
    }
    const nativeMethod = found?.descriptor.value;
    if (!found || typeof nativeMethod !== "function") {
      return "unavailable";
    }
    const owner = this;
    const wrapped = function(hitTestSource) {
      return owner.handleGetHitTestResults(this, nativeMethod, hitTestSource);
    };
    if (found.owner !== frame) {
      const patched = this.patches.define(found.owner, "getHitTestResults", {
        ...found.descriptor,
        value: wrapped
      });
      if (patched) {
        this.patchedHitTestResultOwners.add(found.owner);
        return "patched";
      }
    }
    return this.defineFrameMethod(frame, "getHitTestResults", wrapped) ? "patched" : "failed";
  }
  /**
   * Records whether XRFrame.createAnchor can be intercepted. Without the
   * interception an IWER-controlled space would reach the browser untranslated
   * and silently anchor at the wrong origin, so the capability is reported and
   * controlled spaces are refused instead.
   */
  recordAnchorAvailability(adapter, outcome) {
    if (outcome === "unavailable") {
      return;
    }
    adapter.createAnchorAvailable = outcome === "patched";
    if (outcome === "failed") {
      this.note(
        "Unable to override XRFrame.createAnchor on a native frame; anchors in IWER-controlled spaces are unavailable until a frame can be instrumented."
      );
    }
  }
  /**
   * Records whether XRFrame.getHitTestResults can be intercepted. Without it
   * the hit test facade would reach the browser as a foreign object, so the
   * capability is reported and controlled spaces are refused for this session.
   */
  recordHitTestAvailability(adapter, outcome) {
    if (outcome === "unavailable") {
      return;
    }
    adapter.hitTestResultsAvailable = outcome === "patched";
    if (outcome === "failed") {
      this.note(
        "Unable to override XRFrame.getHitTestResults on a native frame; hit test sources in IWER-controlled spaces are unavailable until a frame can be instrumented."
      );
    }
  }
  defineFrameMethod(frame, key, value) {
    const adapter = this.adapterForFrame(frame);
    if (!adapter) {
      return false;
    }
    return adapter.instancePatches.define(frame, key, {
      configurable: true,
      writable: true,
      value
    });
  }
  // ===========================================================================
  // Pose resolution
  // ===========================================================================
  handleGetPose(frame, nativeMethod, space, baseSpace) {
    if (!this.installedState) {
      return nativeMethod.call(frame, space, baseSpace);
    }
    const spaceInfo = this.spaces.get(space);
    const baseInfo = this.spaces.get(baseSpace);
    const involvesControlledSpace = Boolean(spaceInfo || baseInfo);
    if (!involvesControlledSpace) {
      return nativeMethod.call(frame, space, baseSpace);
    }
    const adapter = this.adapterForFrame(frame);
    if (!adapter) {
      throw invalidState(
        "The IWER-controlled space was queried from a frame owned by another native session."
      );
    }
    this.assertFrameActive(adapter, frame, "getPose");
    if (spaceInfo && spaceInfo.adapter !== adapter || baseInfo && baseInfo.adapter !== adapter) {
      throw invalidState(
        "The IWER-controlled space belongs to a different native session."
      );
    }
    if (spaceInfo?.available && !spaceInfo.available() || baseInfo?.available && !baseInfo.available()) {
      return null;
    }
    const matrix = this.effectivePoseMatrix(
      adapter,
      frame,
      nativeMethod,
      space,
      baseSpace
    );
    if (!matrix) {
      this.note(
        "A synthetic pose could not be resolved in the requested base space."
      );
      return null;
    }
    this.capabilityState.phase = "active";
    return this.createPoseFacade(matrix);
  }
  handleGetJointPose(frame, nativeMethod, joint, baseSpace) {
    if (!this.installedState) {
      return nativeMethod.call(frame, joint, baseSpace);
    }
    const jointInfo = this.spaces.get(joint);
    const baseInfo = this.spaces.get(baseSpace);
    if (!jointInfo && !baseInfo) {
      return nativeMethod.call(frame, joint, baseSpace);
    }
    if (jointInfo && !jointInfo.joint) {
      throw new TypeError(
        "Failed to execute 'getJointPose' on 'XRFrame': parameter 1 is not of type 'XRJointSpace'."
      );
    }
    const adapter = this.adapterForFrame(frame);
    if (!adapter) {
      throw invalidState(
        "The IWER-controlled joint space was queried from a frame owned by another native session."
      );
    }
    this.assertFrameActive(adapter, frame, "getJointPose");
    if (jointInfo && jointInfo.adapter !== adapter || baseInfo && baseInfo.adapter !== adapter) {
      throw invalidState(
        "The IWER-controlled joint space belongs to a different native session."
      );
    }
    const rawGetPose = this.nativeGetPose(frame);
    if (!rawGetPose) {
      this.note("The native XRFrame.getPose implementation is unavailable.");
      return null;
    }
    let radius;
    if (jointInfo?.joint) {
      radius = jointInfo.joint.source[P_JOINT_SPACE].radius;
      if (!isTrackedRadius(radius)) {
        return null;
      }
    } else {
      const nativePose = nativeMethod.call(frame, joint, adapter.anchorSpace);
      if (!nativePose) {
        return nativePose;
      }
      radius = nativePose.radius;
    }
    const matrix = this.effectivePoseMatrix(
      adapter,
      frame,
      rawGetPose,
      joint,
      baseSpace,
      true
    );
    if (!matrix) {
      this.note(
        "A synthetic joint pose could not be resolved in the requested base space."
      );
      return null;
    }
    return this.createJointPoseFacade(matrix, radius);
  }
  handleFillJointRadii(frame, nativeMethod, jointSpaces, radii) {
    const spaces = Array.from(jointSpaces);
    if (!this.installedState) {
      return nativeMethod.call(frame, spaces, radii);
    }
    if (!spaces.some((space) => this.spaces.has(space))) {
      return nativeMethod.call(frame, spaces, radii);
    }
    for (const space of spaces) {
      const info = this.spaces.get(space);
      if (info && !info.joint) {
        throw new TypeError(
          "Failed to execute 'fillJointRadii' on 'XRFrame': an element of jointSpaces is not of type 'XRJointSpace'."
        );
      }
    }
    const adapter = this.adapterForFrame(frame);
    if (!adapter) {
      throw invalidState(
        "IWER-controlled joint radii were queried from a frame owned by another native session."
      );
    }
    this.assertFrameActive(adapter, frame, "fillJointRadii");
    for (const space of spaces) {
      const info = this.spaces.get(space);
      if (info && info.adapter !== adapter) {
        throw invalidState(
          "An IWER-controlled joint space belongs to a different native session."
        );
      }
    }
    if (spaces.length > radii.length) {
      throw new TypeError(
        "The length of jointSpaces is larger than the number of elements in radii."
      );
    }
    let allValid = true;
    for (let index = 0; index < spaces.length; index++) {
      const info = this.spaces.get(spaces[index]);
      if (info?.joint && info.adapter === adapter) {
        const radius = info.joint.source[P_JOINT_SPACE].radius;
        if (isTrackedRadius(radius)) {
          radii[index] = radius;
        } else {
          radii[index] = NaN;
          allValid = false;
        }
      } else {
        const valid = nativeMethod.call(frame, [spaces[index]], scratchRadius);
        radii[index] = valid ? scratchRadius[0] : NaN;
        allValid && (allValid = valid);
      }
    }
    return allValid;
  }
  handleFillPoses(frame, nativeMethod, spaces, baseSpace, transforms) {
    const spaceList = Array.from(spaces);
    if (!this.installedState) {
      return nativeMethod.call(frame, spaceList, baseSpace, transforms);
    }
    const baseInfo = this.spaces.get(baseSpace);
    const hasOverride = Boolean(baseInfo) || spaceList.some((space) => this.spaces.has(space));
    if (!hasOverride) {
      return nativeMethod.call(frame, spaceList, baseSpace, transforms);
    }
    const adapter = this.adapterForFrame(frame);
    if (!adapter) {
      throw invalidState(
        "IWER-controlled poses were queried from a frame owned by another native session."
      );
    }
    this.assertFrameActive(adapter, frame, "fillPoses");
    if (baseInfo && baseInfo.adapter !== adapter || spaceList.some((space) => {
      const info = this.spaces.get(space);
      return info != null && info.adapter !== adapter;
    })) {
      throw invalidState(
        "An IWER-controlled space belongs to a different native session."
      );
    }
    if (transforms.length < spaceList.length * 16) {
      throw new TypeError(
        "The length of transforms is too small to hold a transform for every space."
      );
    }
    const rawGetPose = this.nativeGetPose(frame);
    if (!rawGetPose) {
      return false;
    }
    let allValid = true;
    for (let index = 0; index < spaceList.length; index++) {
      const matrix = this.effectivePoseMatrix(
        adapter,
        frame,
        rawGetPose,
        spaceList[index],
        baseSpace,
        true
      );
      if (!matrix) {
        allValid = false;
        continue;
      }
      copyMatrixToArray(matrix, transforms, index * 16);
    }
    return allValid;
  }
  handleGetViewerPose(frame, nativeMethod, referenceSpace) {
    const nativePose = nativeMethod.call(frame, referenceSpace);
    const adapter = this.adapterForFrame(frame);
    if (!nativePose || !adapter || !this.installedState) {
      return nativePose;
    }
    const rawGetPose = this.nativeGetPose(frame);
    if (!rawGetPose) {
      return this.viewerOverrideFailure(
        "The native XRFrame.getPose implementation could not be recovered."
      );
    }
    const overriddenViewer = this.viewerToBaseMatrix(
      adapter,
      frame,
      rawGetPose,
      referenceSpace
    );
    if (!overriddenViewer) {
      return this.viewerOverrideFailure(
        "The overridden viewer pose could not be resolved in the requested reference space."
      );
    }
    const rawViewerTransform = this.readNativeTransform(nativePose);
    if (!rawViewerTransform) {
      return this.viewerOverrideFailure(
        "The browser-owned XRViewerPose transform could not be read."
      );
    }
    const rawViewer = matrixFromTransform(rawViewerTransform);
    const overriddenObjects = [];
    if (!this.overrideTransform(
      adapter,
      nativePose,
      this.rigidTransformFromMatrix(overriddenViewer)
    )) {
      return this.viewerOverrideFailure(
        "The browser-owned XRViewerPose transform could not be overridden."
      );
    }
    overriddenObjects.push(nativePose);
    const inverseRawViewer = mat4_exports.invert(scratchRelativeView, rawViewer);
    if (!inverseRawViewer) {
      this.clearTransformOverrides(overriddenObjects);
      return this.viewerOverrideFailure(
        "The browser-owned XRViewerPose transform was not invertible."
      );
    }
    for (const view of nativePose.views) {
      const rawViewTransform = this.readNativeTransform(view);
      if (!rawViewTransform) {
        this.clearTransformOverrides(overriddenObjects);
        return this.viewerOverrideFailure(
          "A browser-owned XRView transform could not be read."
        );
      }
      const rawView = matrixFromTransform(rawViewTransform);
      const relative = mat4_exports.create();
      mat4_exports.multiply(relative, inverseRawViewer, rawView);
      const overriddenView = mat4_exports.create();
      mat4_exports.multiply(overriddenView, overriddenViewer, relative);
      if (!this.overrideTransform(
        adapter,
        view,
        this.rigidTransformFromMatrix(overriddenView)
      )) {
        this.clearTransformOverrides(overriddenObjects);
        return this.viewerOverrideFailure(
          "A browser-owned XRView transform could not be overridden."
        );
      }
      overriddenObjects.push(view);
    }
    this.capabilityState.viewerPose = true;
    this.capabilityState.viewTransforms = true;
    this.capabilityState.phase = "active";
    return nativePose;
  }
  viewerOverrideFailure(message) {
    this.note(message);
    return null;
  }
  effectivePoseMatrix(adapter, frame, nativeGetPose, space, baseSpace, includeNative = false) {
    const targetInfo = this.spaces.get(space);
    const baseInfo = this.spaces.get(baseSpace);
    if (targetInfo && targetInfo.adapter !== adapter || baseInfo && baseInfo.adapter !== adapter) {
      return null;
    }
    if (!targetInfo && !baseInfo && !includeNative) {
      return null;
    }
    const targetToAnchor = targetInfo ? this.controlledSpaceToAnchor(targetInfo, scratchTargetMatrix) : this.nativePoseMatrix(
      nativeGetPose.call(frame, space, adapter.anchorSpace)
    );
    if (!targetToAnchor) {
      return null;
    }
    let anchorToBase;
    if (baseInfo) {
      const baseToAnchor = this.controlledSpaceToAnchor(
        baseInfo,
        scratchBaseToAnchor
      );
      anchorToBase = baseToAnchor ? mat4_exports.invert(scratchAnchorToBase, baseToAnchor) : null;
    } else {
      anchorToBase = this.anchorToNativeBase(
        adapter,
        frame,
        nativeGetPose,
        baseSpace
      );
    }
    if (!anchorToBase) {
      return null;
    }
    return mat4_exports.clone(
      mat4_exports.multiply(scratchResultMatrix, anchorToBase, targetToAnchor)
    );
  }
  viewerToBaseMatrix(adapter, frame, nativeGetPose, baseSpace) {
    const viewerToAnchor = this.viewerMatrix(scratchViewerMatrix);
    const baseInfo = this.spaces.get(baseSpace);
    let anchorToBase;
    if (baseInfo) {
      if (baseInfo.adapter !== adapter) {
        return null;
      }
      const baseToAnchor = this.controlledSpaceToAnchor(
        baseInfo,
        scratchBaseToAnchor
      );
      anchorToBase = baseToAnchor ? mat4_exports.invert(scratchAnchorToBase, baseToAnchor) : null;
    } else {
      anchorToBase = this.anchorToNativeBase(
        adapter,
        frame,
        nativeGetPose,
        baseSpace
      );
    }
    if (!anchorToBase) {
      return null;
    }
    return mat4_exports.clone(
      mat4_exports.multiply(scratchResultMatrix, anchorToBase, viewerToAnchor)
    );
  }
  controlledSpaceToAnchor(info, output) {
    if (info.available && !info.available()) {
      return null;
    }
    if (!info.origin) {
      mat4_exports.identity(output);
    } else {
      const source = info.origin();
      if (!source) {
        return null;
      }
      XRSpaceUtils.calculateGlobalOffsetMatrix(source, output);
    }
    mat4_exports.multiply(output, output, info.localOffset);
    return output;
  }
  viewerMatrix(output) {
    return XRSpaceUtils.calculateGlobalOffsetMatrix(
      this.currentViewerSpace(),
      output
    );
  }
  anchorToNativeBase(adapter, frame, nativeGetPose, baseSpace) {
    if (adapter.baseSpaceCache.has(baseSpace)) {
      const cached = adapter.baseSpaceCache.get(baseSpace);
      return cached ? mat4_exports.clone(cached) : null;
    }
    const pose = nativeGetPose.call(frame, adapter.anchorSpace, baseSpace);
    const matrix = this.nativePoseMatrix(pose);
    adapter.baseSpaceCache.set(baseSpace, matrix ? mat4_exports.clone(matrix) : null);
    return matrix;
  }
  nativePoseMatrix(pose) {
    if (!pose) {
      return null;
    }
    const transform = this.readNativeTransform(pose);
    return transform ? matrixFromTransform(transform) : null;
  }
  createPoseFacade(matrix) {
    const prototype = this.constructorPrototype("XRPose");
    const pose = Object.create(prototype ?? Object.prototype);
    Object.defineProperties(pose, this.poseProperties(matrix));
    return pose;
  }
  createJointPoseFacade(matrix, radius) {
    const prototype = this.constructorPrototype("XRJointPose") ?? this.constructorPrototype("XRPose");
    const pose = Object.create(prototype ?? Object.prototype);
    Object.defineProperties(pose, {
      ...this.poseProperties(matrix),
      radius: { configurable: true, enumerable: true, value: radius }
    });
    return pose;
  }
  poseProperties(matrix) {
    return {
      transform: {
        configurable: true,
        enumerable: true,
        value: this.rigidTransformFromMatrix(matrix)
      },
      emulatedPosition: {
        configurable: true,
        enumerable: true,
        value: false
      },
      linearVelocity: {
        configurable: true,
        enumerable: true,
        value: null
      },
      angularVelocity: {
        configurable: true,
        enumerable: true,
        value: null
      }
    };
  }
  rigidTransformFromMatrix(matrix) {
    mat4_exports.getTranslation(scratchPosition2, matrix);
    mat4_exports.getRotation(scratchOrientation2, matrix);
    return new (this.getRigidTransformConstructor())(
      {
        x: scratchPosition2[0],
        y: scratchPosition2[1],
        z: scratchPosition2[2],
        w: 1
      },
      {
        x: scratchOrientation2[0],
        y: scratchOrientation2[1],
        z: scratchOrientation2[2],
        w: scratchOrientation2[3]
      }
    );
  }
  getRigidTransformConstructor() {
    const constructor = globalRecord(this.globalObject).XRRigidTransform;
    if (typeof constructor !== "function") {
      throw new Error("Native XRRigidTransform constructor is unavailable.");
    }
    return constructor;
  }
  readNativeTransform(object) {
    let reader = this.transformReaders.get(object);
    if (!reader) {
      const found = methodDescriptor(object, "transform");
      if (!found) {
        return null;
      }
      let nativeGetter = this.rawTransformGetters.get(found.owner);
      if (!nativeGetter && found.descriptor.get) {
        nativeGetter = found.descriptor.get;
        this.rawTransformGetters.set(found.owner, nativeGetter);
      }
      if (nativeGetter) {
        reader = () => nativeGetter.call(object);
      } else if ("value" in found.descriptor) {
        const value = found.descriptor.value;
        reader = () => value;
      } else {
        return null;
      }
      this.transformReaders.set(object, reader);
    }
    try {
      return reader();
    } catch {
      return null;
    }
  }
  overrideTransform(adapter, object, transform) {
    const reader = this.readNativeTransform(object);
    if (!reader) {
      return false;
    }
    this.transformOverrides.set(object, { epoch: this.epoch, transform });
    const found = methodDescriptor(object, "transform");
    if (!found) {
      return false;
    }
    if (found.owner !== object && this.patchedTransformOwners.has(found.owner)) {
      return true;
    }
    const nativeGetter = this.rawTransformGetters.get(found.owner);
    if (found.owner !== object && nativeGetter && found.descriptor.configurable !== false) {
      const owner2 = this;
      const patched2 = this.patches.define(found.owner, "transform", {
        ...found.descriptor,
        get() {
          const current = owner2.transformOverrides.get(this);
          if (owner2.installedState && current && current.epoch === owner2.epoch) {
            return current.transform;
          }
          return nativeGetter.call(this);
        }
      });
      if (patched2) {
        this.patchedTransformOwners.add(found.owner);
        return true;
      }
    }
    if (this.instancePatchedTransformEpochs.get(object) === this.epoch) {
      return true;
    }
    const owner = this;
    const patched = adapter.instancePatches.define(object, "transform", {
      configurable: true,
      get() {
        const current = owner.transformOverrides.get(this);
        if (owner.installedState && current && current.epoch === owner.epoch) {
          return current.transform;
        }
        return owner.transformReaders.get(this)?.();
      }
    });
    if (patched) {
      this.instancePatchedTransformEpochs.set(object, this.epoch);
      return true;
    }
    this.transformOverrides.delete(object);
    return false;
  }
  clearTransformOverrides(objects) {
    for (const object of objects) {
      this.transformOverrides.delete(object);
    }
  }
  nativeGetPose(frame) {
    const direct = this.rawGetPoseByFrame.get(frame);
    if (direct) {
      return direct;
    }
    const found = methodDescriptor(frame, "getPose");
    return found ? this.rawGetPoseByOwner.get(found.owner) ?? null : null;
  }
  // ===========================================================================
  // Anchors
  // ===========================================================================
  handleCreateAnchor(frame, nativeMethod, pose, space) {
    if (!this.installedState) {
      return nativeMethod.call(frame, pose, space);
    }
    const info = this.spaces.get(space);
    if (!info) {
      return nativeMethod.call(frame, pose, space);
    }
    try {
      const adapter = this.adapterForFrame(frame);
      if (!adapter || adapter.ended) {
        throw invalidState(
          "The IWER-controlled anchor space belongs to a different native session."
        );
      }
      this.assertFrameActive(adapter, frame, "createAnchor");
      if (adapter !== info.adapter) {
        throw invalidState(
          "The IWER-controlled anchor space belongs to a different native session."
        );
      }
      if (!adapter.createAnchorAvailable) {
        throw new DOMException(
          "Anchors in IWER-controlled spaces are unavailable because XRFrame.createAnchor could not be overridden.",
          "NotSupportedError"
        );
      }
      const controlledToAnchor = this.controlledSpaceToAnchor(
        info,
        scratchControlledMatrix
      );
      if (!controlledToAnchor) {
        throw invalidState(
          "The IWER-controlled anchor space could not be resolved for this frame."
        );
      }
      const composed = mat4_exports.multiply(
        mat4_exports.create(),
        controlledToAnchor,
        matrixFromTransform(pose)
      );
      const translated = this.rigidTransformFromMatrix(composed);
      this.capabilityState.anchors = true;
      return nativeMethod.call(frame, translated, adapter.anchorSpace);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  // ===========================================================================
  // Hit testing
  // ===========================================================================
  handleRequestHitTestSource(session, nativeMethod, options) {
    const info = this.installedState && options ? this.spaces.get(options.space) : null;
    if (!info) {
      return nativeMethod.call(session, options);
    }
    const adapter = this.sessionsByObject.get(session);
    if (!adapter || adapter !== info.adapter || adapter.ended) {
      return Promise.reject(
        invalidState(
          "The IWER-controlled hit test space belongs to a different native session."
        )
      );
    }
    if (!adapter.hitTestResultsAvailable) {
      return Promise.reject(
        new DOMException(
          "Hit test sources in IWER-controlled spaces are unavailable because XRFrame.getHitTestResults could not be overridden.",
          "NotSupportedError"
        )
      );
    }
    const matrix = this.controlledSpaceToAnchor(info, scratchHitTestMatrix);
    if (!matrix) {
      return Promise.reject(
        invalidState(
          "The IWER-controlled hit test space could not be resolved."
        )
      );
    }
    const binding = {
      adapter,
      facade: void 0,
      space: options.space,
      // Copy the caller's dictionary: WebXR treats it as by-value, and it is
      // replayed on every resubscribe long after the call returns.
      requestedOptions: {
        ...options,
        entityTypes: options.entityTypes ? Array.from(options.entityTypes) : void 0
      },
      nativeMethod,
      current: null,
      currentMatrix: null,
      pendingMatrix: null,
      pendingToken: 0,
      failures: 0,
      backoffFrames: 0,
      cancelled: false
    };
    binding.facade = this.createHitTestSourceFacade(binding);
    adapter.hitTests.add(binding);
    this.hitTestBindings.set(binding.facade, binding);
    this.capabilityState.hitTest = true;
    return this.requestBackingSource(binding, matrix).then(
      () => binding.facade,
      (error) => {
        this.disposeHitTestBinding(binding);
        throw error;
      }
    );
  }
  createHitTestSourceFacade(binding) {
    const prototype = this.constructorPrototype("XRHitTestSource");
    const facade = Object.create(prototype ?? Object.prototype);
    Object.defineProperty(facade, "cancel", {
      configurable: true,
      writable: true,
      value: () => {
        if (binding.cancelled) {
          throw invalidState(
            "The IWER-controlled hit test source has already been cancelled."
          );
        }
        this.disposeHitTestBinding(binding);
      }
    });
    return facade;
  }
  /**
   * Subscribes a fresh native hit test source at the given anchor-relative
   * pose, swapping it in only once the browser resolves it. The previous
   * subscription keeps serving results throughout, and survives a failure, so
   * the facade never goes blank once it has resolved a subscription.
   */
  requestBackingSource(binding, matrix) {
    const token = ++binding.pendingToken;
    binding.pendingMatrix = mat4_exports.clone(matrix);
    const adapter = binding.adapter;
    let request;
    try {
      const space = this.createDetachedOffsetSpace(adapter, matrix);
      request = Promise.resolve(
        binding.nativeMethod.call(adapter.session, {
          ...binding.requestedOptions,
          space
        })
      );
    } catch (error) {
      request = Promise.reject(error);
    }
    return request.then(
      (source) => {
        if (token !== binding.pendingToken || binding.cancelled || adapter.ended || !this.installedState) {
          this.cancelNativeHitTestSource(source);
          return;
        }
        const replaced = binding.current;
        binding.current = source;
        binding.currentMatrix = binding.pendingMatrix;
        binding.pendingMatrix = null;
        binding.failures = 0;
        binding.backoffFrames = 0;
        this.cancelNativeHitTestSource(replaced);
      },
      (error) => {
        if (token === binding.pendingToken && !binding.cancelled) {
          binding.pendingMatrix = null;
          binding.failures += 1;
          binding.backoffFrames = Math.min(
            2 ** Math.min(binding.failures, 5),
            MAX_HIT_TEST_BACKOFF_FRAMES
          );
        }
        throw error;
      }
    );
  }
  /**
   * Creates a world-locked native offset space at the given anchor-relative
   * pose. The space is deliberately untagged so native APIs treat it as an
   * ordinary browser space.
   */
  createDetachedOffsetSpace(adapter, matrix) {
    const transform = this.rigidTransformFromMatrix(matrix);
    const anchorInfo = this.spaces.get(adapter.anchorSpace);
    this.spaces.delete(adapter.anchorSpace);
    try {
      return adapter.anchorSpace.getOffsetReferenceSpace(transform);
    } finally {
      if (anchorInfo) {
        this.spaces.set(adapter.anchorSpace, anchorInfo);
      }
    }
  }
  updateHitTestSources(adapter) {
    if (adapter.hitTests.size === 0) {
      return;
    }
    for (const binding of Array.from(adapter.hitTests)) {
      if (binding.cancelled) {
        continue;
      }
      if (binding.pendingMatrix) {
        continue;
      }
      if (binding.backoffFrames > 0) {
        binding.backoffFrames -= 1;
        continue;
      }
      const info = this.spaces.get(binding.space);
      if (!info) {
        continue;
      }
      const matrix = this.controlledSpaceToAnchor(info, scratchHitTestMatrix);
      if (!matrix) {
        continue;
      }
      if (binding.currentMatrix && poseWithinTolerance(binding.currentMatrix, matrix)) {
        continue;
      }
      void this.requestBackingSource(binding, matrix).catch((error) => {
        this.note(
          `A native hit test subscription could not follow its IWER-controlled space: ${this.errorText(
            error
          )}`,
          "hit-test-resubscribe-failed"
        );
      });
    }
  }
  handleGetHitTestResults(frame, nativeMethod, hitTestSource) {
    if (!this.installedState) {
      return nativeMethod.call(frame, hitTestSource);
    }
    const binding = this.hitTestBindings.get(hitTestSource);
    if (!binding) {
      return nativeMethod.call(frame, hitTestSource);
    }
    if (binding.cancelled) {
      throw invalidState(
        "The IWER-controlled hit test source has been cancelled."
      );
    }
    const adapter = this.adapterForFrame(frame);
    if (!adapter || adapter !== binding.adapter) {
      throw invalidState(
        "The IWER-controlled hit test source belongs to a different native session."
      );
    }
    if (adapter.framesInstrumented && adapter.activeFrame !== frame) {
      throw invalidState(
        "Failed to execute 'getHitTestResults' on 'XRFrame': the frame is not active."
      );
    }
    if (!binding.current) {
      return [];
    }
    return nativeMethod.call(frame, binding.current);
  }
  cancelNativeHitTestSource(source) {
    if (!source) {
      return;
    }
    try {
      source.cancel();
    } catch {
    }
  }
  disposeHitTestBinding(binding) {
    binding.cancelled = true;
    binding.pendingToken += 1;
    binding.pendingMatrix = null;
    this.cancelNativeHitTestSource(binding.current);
    binding.current = null;
    binding.currentMatrix = null;
    binding.adapter.hitTests.delete(binding);
  }
  // ===========================================================================
  // Lifecycle
  // ===========================================================================
  adapterForFrame(frame) {
    const tagged = this.frameSessions.get(frame);
    if (tagged && !tagged.ended) {
      return tagged;
    }
    try {
      return this.sessionsByObject.get(frame.session) ?? null;
    } catch {
      return null;
    }
  }
  /**
   * Throws if the frame is no longer the one its session owns. Browser spaces
   * already get this for free because the native call raises, but a query that
   * only touches IWER-controlled spaces never reaches the browser, and
   * answering it would let a stashed frame silently report live poses.
   */
  assertFrameActive(adapter, frame, method) {
    if (!adapter.framesInstrumented) {
      return;
    }
    if (adapter.activeFrame !== frame) {
      throw invalidState(
        `Failed to execute '${method}' on 'XRFrame': the frame is not active.`
      );
    }
  }
  constructorPrototype(name) {
    const constructor = globalRecord(this.globalObject)[name];
    return constructor?.prototype ?? null;
  }
  detachSession(session) {
    const adapter = this.sessionsByObject.get(session);
    if (adapter) {
      this.detachAdapter(adapter);
    }
  }
  detachAdapter(adapter, announceNativeInputTransition = false) {
    if (adapter.ended) {
      return;
    }
    const removedSources = this.options.mode === "gaze-only" ? adapter.sources.filter(
      (source) => adapter.bindingByFacade.has(source)
    ) : [...adapter.sources];
    const wasFramePreparationUnhealthy = this.unhealthyFrameAdapters.delete(adapter);
    adapter.ended = true;
    for (const cleanup of adapter.cleanupListeners.splice(0)) {
      try {
        cleanup();
      } catch {
      }
    }
    const clearsSharedInputState = adapter === this.sharedStateDriver();
    for (const binding of adapter.deviceBindings) {
      for (const button of binding.eventButtons) {
        if (clearsSharedInputState) {
          this.releaseButton(button);
        }
        this.observeButton(binding, button);
      }
      binding.activeButtons.clear();
    }
    for (const binding of Array.from(adapter.hitTests)) {
      this.disposeHitTestBinding(binding);
    }
    adapter.instancePatches.revert();
    adapter.patches.revert();
    adapter.baseSpaceCache.clear();
    adapter.activeFrame = null;
    adapter.lastPreparedFrame = null;
    this.sessionsByObject.delete(adapter.session);
    if (announceNativeInputTransition) {
      let addedSources = [];
      if (this.options.mode === "full") {
        try {
          addedSources = Array.from(adapter.session.inputSources);
        } catch {
        }
      }
      if (addedSources.length > 0 || removedSources.length > 0) {
        try {
          this.dispatchInputSourcesChange(
            adapter,
            addedSources,
            removedSources
          );
        } catch {
        }
      }
    }
    adapter.sources = Object.freeze([]);
    adapter.deviceBindings.splice(0);
    adapter.playbackBindings.clear();
    adapter.bindingByFacade.clear();
    adapter.spaceTokens.clear();
    adapter.pendingEvents.length = 0;
    adapter.retainedSources.clear();
    this.liveSessions.delete(adapter);
    if (wasFramePreparationUnhealthy && this.unhealthyFrameAdapters.size === 0 && this.installedState) {
      this.capabilityState.supported = true;
    }
    if (this.primarySession === adapter) {
      this.primarySession = this.liveSessions.values().next().value ?? null;
      this.lastPrimaryTime = void 0;
    }
    if (this.liveSessions.size === 0) {
      this.unwirePlayer();
      this.playbackFrame = null;
      this.device.remote.forceRelease();
    }
  }
  resetPatchTracking() {
    this.sessionsByObject = /* @__PURE__ */ new WeakMap();
    this.frameSessions = /* @__PURE__ */ new WeakMap();
    this.spaces = /* @__PURE__ */ new WeakMap();
    this.hitTestBindings = /* @__PURE__ */ new WeakMap();
    this.syntheticEvents = /* @__PURE__ */ new WeakSet();
    this.patchedFrameOwners = /* @__PURE__ */ new WeakSet();
    this.patchedViewerFrameOwners = /* @__PURE__ */ new WeakSet();
    this.patchedFillPosesOwners = /* @__PURE__ */ new WeakSet();
    this.patchedJointPoseOwners = /* @__PURE__ */ new WeakSet();
    this.patchedJointRadiiOwners = /* @__PURE__ */ new WeakSet();
    this.patchedReferenceSpaceOwners = /* @__PURE__ */ new WeakSet();
    this.patchedEnabledFeaturesOwners = /* @__PURE__ */ new WeakSet();
    this.patchedInputSourceOwners = /* @__PURE__ */ new WeakSet();
    this.patchedRafOwners = /* @__PURE__ */ new WeakSet();
    this.patchedRequestReferenceSpaceOwners = /* @__PURE__ */ new WeakSet();
    this.instancePatchedReferenceSpaces = /* @__PURE__ */ new WeakSet();
    this.patchedHitTestOwners = /* @__PURE__ */ new WeakSet();
    this.patchedHitTestResultOwners = /* @__PURE__ */ new WeakSet();
    this.patchedCreateAnchorOwners = /* @__PURE__ */ new WeakSet();
    this.rawGetPoseByOwner = /* @__PURE__ */ new WeakMap();
    this.rawGetPoseByFrame = /* @__PURE__ */ new WeakMap();
    this.rawRafByOwner = /* @__PURE__ */ new WeakMap();
    this.rawRequestReferenceSpaceByOwner = /* @__PURE__ */ new WeakMap();
    this.rawInputSourcesGetterByOwner = /* @__PURE__ */ new WeakMap();
    this.rawTransformGetters = /* @__PURE__ */ new WeakMap();
    this.transformReaders = /* @__PURE__ */ new WeakMap();
    this.transformOverrides = /* @__PURE__ */ new WeakMap();
    this.patchedTransformOwners = /* @__PURE__ */ new WeakSet();
    this.instancePatchedFrameEpochs = /* @__PURE__ */ new WeakMap();
    this.instancePatchedTransformEpochs = /* @__PURE__ */ new WeakMap();
    this.unhealthyFrameAdapters.clear();
    this.lastPrimaryTime = void 0;
  }
  unsupportedForSession(adapter, message) {
    if (this.options.onUnsupported === "throw") {
      this.detachAdapter(adapter);
      throw new Error(message);
    }
    this.note(message);
  }
  unsupported(message) {
    this.capabilityState.supported = false;
    this.note(message);
    if (this.options.onUnsupported === "throw") {
      throw new Error(message);
    }
  }
  note(message, key = message) {
    if (this.warned.has(key)) {
      return;
    }
    this.warned.add(key);
    this.capabilityState.notes.push(message);
    console.warn(`[IWER native override] ${message}`);
  }
  errorText(error) {
    return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  }
};
function installNativeOverride(device, options) {
  const override = new XRNativeOverride(device, options);
  override.install();
  return override;
}

// src/device/configs/hand/ids.ts
var BUILTIN_HAND_POSE_IDS = [
  "default",
  "pinch",
  "point",
  "open",
  "flat",
  "fist",
  "thumbs-up",
  "finger-gun",
  "peace",
  "three",
  "four",
  "ok",
  "rock",
  "call",
  "pinch-middle",
  "pinch-ring",
  "pinch-pinky",
  "tripod",
  "key-pinch",
  "microgesture",
  "grip",
  "claw",
  "hook",
  "cup"
];

// src/action/ActionRecorder.ts
var compress = (arr) => {
  const out = [];
  Array.from(arr).forEach((num) => {
    out.push(Math.round(num * 1e3) / 1e3);
  });
  return out;
};
var _scratchJointVec3 = vec3_exports.create();
var _scratchJointQuat = quat_exports.create();
P_ACTION_RECORDER;
var ActionRecorder = class {
  constructor(session, refSpace, options = {}) {
    this[P_ACTION_RECORDER] = {
      session,
      refSpace,
      inputMap: /* @__PURE__ */ new Map(),
      schemaMap: /* @__PURE__ */ new Map(),
      compressedFrames: [],
      jointRadii: new Float32Array(25),
      jointTransforms: new Float32Array(25 * 16),
      maxFrames: options.maxFrames != null && options.maxFrames > 0 ? options.maxFrames : Infinity,
      maxDurationMs: options.maxDurationMs != null && options.maxDurationMs > 0 ? options.maxDurationMs : Infinity,
      capPolicy: options.capPolicy ?? "stop",
      firstTimeStamp: null,
      lastTimeStamp: null
    };
  }
  /** Number of frames currently recorded. */
  get frameCount() {
    return this[P_ACTION_RECORDER].compressedFrames.length;
  }
  /**
   * Duration of the recording in milliseconds, measured from the first to the
   * most recently recorded frame. Returns 0 when fewer than two frames have
   * been recorded.
   */
  get durationMs() {
    const state = this[P_ACTION_RECORDER];
    if (state.firstTimeStamp == null || state.lastTimeStamp == null) {
      return 0;
    }
    return state.lastTimeStamp - state.firstTimeStamp;
  }
  recordFrame(frame) {
    const state = this[P_ACTION_RECORDER];
    const timeStamp = performance.now();
    if (state.capPolicy === "stop" && state.firstTimeStamp != null && timeStamp - state.firstTimeStamp >= state.maxDurationMs) {
      return;
    }
    if (state.capPolicy === "stop" && state.compressedFrames.length >= state.maxFrames) {
      return;
    }
    const viewerMatrix = frame.getViewerPose(this[P_ACTION_RECORDER].refSpace)?.transform.matrix;
    if (!viewerMatrix) return;
    const position = mat4_exports.getTranslation(vec3_exports.create(), viewerMatrix);
    const quaternion = mat4_exports.getRotation(quat_exports.create(), viewerMatrix);
    const actionFrame = {
      timeStamp,
      position,
      quaternion,
      inputFrames: []
    };
    this[P_ACTION_RECORDER].session.inputSources.forEach((inputSource) => {
      if (!this[P_ACTION_RECORDER].inputMap.has(inputSource)) {
        const schema2 = {
          handedness: inputSource.handedness,
          targetRayMode: inputSource.targetRayMode,
          profiles: inputSource.profiles,
          hasGrip: inputSource.gripSpace != null,
          hasHand: inputSource.hand != null,
          hasGamepad: inputSource.gamepad != null
        };
        if (schema2.hasHand) {
          schema2.jointSequence = Array.from(inputSource.hand.values()).map(
            (jointSpace) => jointSpace.jointName
          );
        }
        if (schema2.hasGamepad) {
          schema2.mapping = inputSource.gamepad.mapping;
          schema2.numButtons = inputSource.gamepad.buttons.length;
          schema2.numAxes = inputSource.gamepad.axes.length;
        }
        const index2 = this[P_ACTION_RECORDER].inputMap.size;
        this[P_ACTION_RECORDER].inputMap.set(inputSource, index2);
        this[P_ACTION_RECORDER].schemaMap.set(index2, schema2);
      }
      const index = this[P_ACTION_RECORDER].inputMap.get(inputSource);
      const schema = this[P_ACTION_RECORDER].schemaMap.get(index);
      const targetRayMatrix = frame.getPose(
        inputSource.targetRaySpace,
        this[P_ACTION_RECORDER].refSpace
      )?.transform.matrix;
      if (targetRayMatrix) {
        const targetRayPosition = mat4_exports.getTranslation(
          vec3_exports.create(),
          targetRayMatrix
        );
        const targetRayQuaternion = mat4_exports.getRotation(
          quat_exports.create(),
          targetRayMatrix
        );
        const inputFrame = {
          index,
          targetRayTransform: {
            position: targetRayPosition,
            quaternion: targetRayQuaternion
          }
        };
        if (schema.hasGrip) {
          const gripMatrix = frame.getPose(
            inputSource.gripSpace,
            this[P_ACTION_RECORDER].refSpace
          )?.transform.matrix;
          if (gripMatrix) {
            const position2 = mat4_exports.getTranslation(vec3_exports.create(), gripMatrix);
            const quaternion2 = mat4_exports.getRotation(quat_exports.create(), gripMatrix);
            inputFrame.gripTransform = {
              position: position2,
              quaternion: quaternion2
            };
          }
        }
        if (schema.hasHand) {
          const jointSpaces = Array.from(inputSource.hand.values());
          let allValid = true;
          allValid && (allValid = frame.fillPoses(
            jointSpaces,
            inputSource.targetRaySpace,
            this[P_ACTION_RECORDER].jointTransforms
          ));
          allValid && (allValid = frame.fillJointRadii(
            jointSpaces,
            this[P_ACTION_RECORDER].jointRadii
          ));
          if (allValid) {
            const hand = {};
            for (let offset = 0; offset < 25; offset++) {
              const jointMatrix = this[P_ACTION_RECORDER].jointTransforms.slice(
                offset * 16,
                (offset + 1) * 16
              );
              const radius = this[P_ACTION_RECORDER].jointRadii[offset];
              mat4_exports.getTranslation(_scratchJointVec3, jointMatrix);
              mat4_exports.getRotation(_scratchJointQuat, jointMatrix);
              const position2 = compress(_scratchJointVec3);
              const quaternion2 = compress(_scratchJointQuat);
              const jointName = jointSpaces[offset].jointName;
              hand[jointName] = { position: position2, quaternion: quaternion2, radius };
            }
            inputFrame.hand = hand;
          }
        }
        if (schema.hasGamepad) {
          const gamepad = {
            buttons: inputSource.gamepad.buttons.map(
              (button) => button ? [button.pressed ? 1 : 0, button.touched ? 1 : 0, button.value] : null
            ),
            axes: Array.from(inputSource.gamepad.axes)
          };
          inputFrame.gamepad = gamepad;
        }
        actionFrame.inputFrames.push(inputFrame);
      }
    });
    const frames = state.compressedFrames;
    frames.push(this.compressActionFrame(actionFrame));
    if (state.firstTimeStamp == null) {
      state.firstTimeStamp = timeStamp;
    }
    state.lastTimeStamp = timeStamp;
    if (state.capPolicy === "drop") {
      while (frames.length > state.maxFrames) {
        frames.shift();
      }
      while (frames.length > 1 && timeStamp - state.firstTimeStamp >= state.maxDurationMs) {
        frames.shift();
        state.firstTimeStamp = frames[0][0];
      }
    }
  }
  compressActionFrame(af) {
    const out = [
      Math.round(af.timeStamp * 10) / 10,
      ...compress(af.position),
      ...compress(af.quaternion)
    ];
    af.inputFrames.forEach((inputFrame) => {
      const index = inputFrame.index;
      const schema = this[P_ACTION_RECORDER].schemaMap.get(index);
      const inputOut = [
        index,
        ...compress(inputFrame.targetRayTransform.position),
        ...compress(inputFrame.targetRayTransform.quaternion)
      ];
      if (schema.hasGrip) {
        inputOut.push([
          ...compress(inputFrame.gripTransform.position),
          ...compress(inputFrame.gripTransform.quaternion)
        ]);
      }
      if (schema.hasHand) {
        const handArr = [];
        Object.values(inputFrame.hand).forEach(
          ({ position, quaternion, radius }) => {
            handArr.push(
              ...position,
              ...quaternion,
              Math.round(radius * 1e3) / 1e3
            );
          }
        );
        inputOut.push(handArr);
      }
      if (schema.hasGamepad) {
        inputOut.push([
          ...inputFrame.gamepad.buttons,
          ...inputFrame.gamepad.axes
        ]);
      }
      out.push(inputOut);
    });
    return out;
  }
  /**
   * Build the serialized recording object (the same shape ActionPlayer's
   * constructor consumes): the schema entries paired with the compressed frame
   * rows. Returned by reference, so callers that mutate it affect the recorder's
   * live buffers; clone if you need a detached snapshot.
   */
  getRecording() {
    return {
      schema: Array.from(this[P_ACTION_RECORDER].schemaMap.entries()),
      frames: this[P_ACTION_RECORDER].compressedFrames
    };
  }
  /** Serialize the current recording to a JSON string. */
  toJSON() {
    return JSON.stringify(this.getRecording());
  }
  log() {
    console.log(this.toJSON());
  }
};
export {
  ActionPlayer,
  ActionRecorder,
  BUILTIN_HAND_POSE_IDS,
  GAZE_TRACKING_FEATURES,
  GamepadMappingType,
  GlobalSpace,
  HOST_INPUT_BUTTONS,
  HOST_INPUT_JOINTS,
  HOST_INPUT_JOINT_STRIDE,
  HOST_INPUT_POSE_STRIDE,
  MICROGESTURES,
  NativeMesh,
  NativePlane,
  P_ACTION_PLAYER,
  P_ACTION_RECORDER,
  P_ANCHOR,
  P_BOUNDED_REF_SPACE,
  P_COMPOSITION_LAYER,
  P_CONTROLLER,
  P_DEPTH_INFO,
  P_DEVICE,
  P_FRAME,
  P_GAMEPAD,
  P_HAND_INPUT,
  P_HIT_TEST,
  P_HOST_INPUT,
  P_INPUT_SOURCE,
  P_JOINT_POSE,
  P_JOINT_SPACE,
  P_MESH,
  P_PLANE,
  P_POSE,
  P_PROJECTION_LAYER,
  P_RAY,
  P_REF_SPACE,
  P_RENDER_STATE,
  P_RIGID_TRANSFORM,
  P_SESSION,
  P_SPACE,
  P_SYSTEM,
  P_TRACKED_INPUT,
  P_VIEW,
  P_VIEWER_POSE,
  P_VIEWPORT,
  P_WEBGL_BINDING,
  P_WEBGL_LAYER,
  RemoteControlInterface,
  XRAnchor,
  XRAnchorSet,
  XRBoundedReferenceSpace,
  XRCPUDepthInformation,
  XRCompositionLayer,
  XRDevice,
  XRFrame,
  XRGazeInput,
  XRHand,
  XRHostController,
  XRHostHand,
  XRHostInput,
  XRHostInputMode,
  XRHostInputState,
  XRHostWebGLBinding,
  XRInputSource,
  XRInputSourceArray,
  XRInputSourceEvent,
  XRInputSourcesChangeEvent,
  XRJointPose,
  XRJointSpace,
  XRLayer,
  XRMesh,
  XRMeshSet,
  XRNativeOverride,
  XRPlane,
  XRPlaneSet,
  XRPose,
  XRProjectionLayer,
  XRRay,
  XRReferenceSpace,
  XRReferenceSpaceEvent,
  XRReferenceSpaceType,
  XRRenderState,
  XRRigidTransform,
  XRSemanticLabels,
  XRSession,
  XRSessionEvent,
  XRSpace,
  XRSystem,
  XRView,
  XRViewerPose,
  XRViewport,
  XRWebGLBinding,
  XRWebGLDepthInformation,
  XRWebGLLayer,
  XRWebGLSubImage,
  calculateVisibilityMaskBounds,
  directionTo,
  eulerToQuat,
  generic,
  getNativeOverride,
  getNativeOverrideSupport,
  installNativeOverride,
  isGazeTrackingFeature,
  lookRotation2 as lookRotation,
  metaQuest2,
  metaQuest3,
  metaQuestPro,
  metaQuestTouchPlus,
  metaQuestTouchPro,
  metaVRGlasses,
  metaVRGlassesVisibilityMask,
  oculusQuest1,
  oculusTouchV2,
  oculusTouchV3,
  quatToEuler,
  quatToObj,
  supportsGazeTracking,
  vec3ToObj,
  waitForCondition
};
/**
 * @license
 * webxr-layers-polyfill
 * Version 1.1.0
 * Copyright (c) 2021 Facebook, Inc. and its affiliates.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
/**
 * @license
 * gl-matrix 
 * Version 3.4.3
 * Copyright (c) 2015-2021, Brandon Jones, Colin MacKenzie IV.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/
