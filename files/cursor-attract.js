function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var Z$1 = Object.defineProperty;
var z = (s, t, e) => t in s ? Z$1(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e;
var p = (s, t, e) => z(s, typeof t != "symbol" ? t + "" : t, e);
const $$1 = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: 0,
  f: 0,
  m11: 1,
  m12: 0,
  m13: 0,
  m14: 0,
  m21: 0,
  m22: 1,
  m23: 0,
  m24: 0,
  m31: 0,
  m32: 0,
  m33: 1,
  m34: 0,
  m41: 0,
  m42: 0,
  m43: 0,
  m44: 1,
  is2D: true,
  isIdentity: true
}, E$1 = (s) => (s instanceof Float64Array || s instanceof Float32Array || Array.isArray(s) && s.every((t) => typeof t == "number")) && [6, 16].some((t) => s.length === t), P = (s) => s instanceof DOMMatrix || s instanceof y || typeof s == "object" && Object.keys($$1).every((t) => s && t in s), g = (s) => {
  const t = new y(), e = Array.from(s);
  if (!E$1(e))
    throw TypeError(
      `CSSMatrix: "${e.join(",")}" must be an array with 6/16 numbers.`
    );
  // istanbul ignore else @preserve
  if (e.length === 16) {
    const [
      n,
      i,
      r2,
      a,
      l,
      m,
      h,
      c,
      u,
      f,
      w,
      o,
      d,
      A,
      M2,
      b
    ] = e;
    t.m11 = n, t.a = n, t.m21 = l, t.c = l, t.m31 = u, t.m41 = d, t.e = d, t.m12 = i, t.b = i, t.m22 = m, t.d = m, t.m32 = f, t.m42 = A, t.f = A, t.m13 = r2, t.m23 = h, t.m33 = w, t.m43 = M2, t.m14 = a, t.m24 = c, t.m34 = o, t.m44 = b;
  } else if (e.length === 6) {
    const [n, i, r2, a, l, m] = e;
    t.m11 = n, t.a = n, t.m12 = i, t.b = i, t.m21 = r2, t.c = r2, t.m22 = a, t.d = a, t.m41 = l, t.e = l, t.m42 = m, t.f = m;
  }
  return t;
}, X$1 = (s) => {
  if (P(s))
    return g([
      s.m11,
      s.m12,
      s.m13,
      s.m14,
      s.m21,
      s.m22,
      s.m23,
      s.m24,
      s.m31,
      s.m32,
      s.m33,
      s.m34,
      s.m41,
      s.m42,
      s.m43,
      s.m44
    ]);
  throw TypeError(
    `CSSMatrix: "${JSON.stringify(s)}" is not a DOMMatrix / CSSMatrix / JSON compatible object.`
  );
}, O$1 = (s) => {
  if (typeof s != "string")
    throw TypeError(`CSSMatrix: "${JSON.stringify(s)}" is not a string.`);
  const t = String(s).replace(/\s/g, "");
  let e = new y();
  const n = `CSSMatrix: invalid transform string "${s}"`;
  return t.split(")").filter((i) => i).forEach((i) => {
    const [r2, a] = i.split("(");
    if (!a) throw TypeError(n);
    const l = a.split(",").map(
      (o) => o.includes("rad") ? parseFloat(o) * (180 / Math.PI) : parseFloat(o)
    ), [m, h, c, u] = l, f = [m, h, c], w = [m, h, c, u];
    if (r2 === "perspective" && m && [h, c].every((o) => o === void 0))
      e.m34 = -1 / m;
    else if (r2.includes("matrix") && [6, 16].includes(l.length) && l.every((o) => !Number.isNaN(+o))) {
      const o = l.map((d) => Math.abs(d) < 1e-6 ? 0 : d);
      e = e.multiply(g(o));
    } else if (r2 === "translate3d" && f.every((o) => !Number.isNaN(+o)))
      e = e.translate(m, h, c);
    else if (r2 === "translate" && m && c === void 0)
      e = e.translate(m, h || 0, 0);
    else if (r2 === "rotate3d" && w.every((o) => !Number.isNaN(+o)) && u)
      e = e.rotateAxisAngle(m, h, c, u);
    else if (r2 === "rotate" && m && [h, c].every((o) => o === void 0))
      e = e.rotate(0, 0, m);
    else if (r2 === "scale3d" && f.every((o) => !Number.isNaN(+o)) && f.some((o) => o !== 1))
      e = e.scale(m, h, c);
    else if (
      // prop === "scale" && !Number.isNaN(x) && x !== 1 && z === undefined
      // prop === "scale" && !Number.isNaN(x) && [x, y].some((n) => n !== 1) &&
      r2 === "scale" && !Number.isNaN(m) && (m !== 1 || h !== 1) && c === void 0
    ) {
      const d = Number.isNaN(+h) ? m : h;
      e = e.scale(m, d, 1);
    } else if (r2 === "skew" && (m || !Number.isNaN(m) && h) && c === void 0)
      e = e.skew(m, h || 0);
    else if (["translate", "rotate", "scale", "skew"].some(
      (o) => r2.includes(o)
    ) && /[XYZ]/.test(r2) && m && [h, c].every((o) => o === void 0))
      if (r2 === "skewX" || r2 === "skewY")
        e = e[r2](m);
      else {
        const o = r2.replace(/[XYZ]/, ""), d = r2.replace(o, ""), A = ["X", "Y", "Z"].indexOf(d), M2 = o === "scale" ? 1 : 0, b = [
          A === 0 ? m : M2,
          A === 1 ? m : M2,
          A === 2 ? m : M2
        ];
        e = e[o](...b);
      }
    else
      throw TypeError(n);
  }), e;
}, x = (s, t) => t ? [s.a, s.b, s.c, s.d, s.e, s.f] : [
  s.m11,
  s.m12,
  s.m13,
  s.m14,
  s.m21,
  s.m22,
  s.m23,
  s.m24,
  s.m31,
  s.m32,
  s.m33,
  s.m34,
  s.m41,
  s.m42,
  s.m43,
  s.m44
], Y$1 = (s, t, e) => {
  const n = new y();
  return n.m41 = s, n.e = s, n.m42 = t, n.f = t, n.m43 = e, n;
}, F$1 = (s, t, e) => {
  const n = new y(), i = Math.PI / 180, r2 = s * i, a = t * i, l = e * i, m = Math.cos(r2), h = -Math.sin(r2), c = Math.cos(a), u = -Math.sin(a), f = Math.cos(l), w = -Math.sin(l), o = c * f, d = -c * w;
  n.m11 = o, n.a = o, n.m12 = d, n.b = d, n.m13 = u;
  const A = h * u * f + m * w;
  n.m21 = A, n.c = A;
  const M2 = m * f - h * u * w;
  return n.m22 = M2, n.d = M2, n.m23 = -h * c, n.m31 = h * w - m * u * f, n.m32 = h * f + m * u * w, n.m33 = m * c, n;
}, T$1 = (s, t, e, n) => {
  const i = new y(), r2 = Math.sqrt(s * s + t * t + e * e);
  if (r2 === 0)
    return i;
  const a = s / r2, l = t / r2, m = e / r2, h = n * (Math.PI / 360), c = Math.sin(h), u = Math.cos(h), f = c * c, w = a * a, o = l * l, d = m * m, A = 1 - 2 * (o + d) * f;
  i.m11 = A, i.a = A;
  const M2 = 2 * (a * l * f + m * c * u);
  i.m12 = M2, i.b = M2, i.m13 = 2 * (a * m * f - l * c * u);
  const b = 2 * (l * a * f - m * c * u);
  i.m21 = b, i.c = b;
  const k = 1 - 2 * (d + w) * f;
  return i.m22 = k, i.d = k, i.m23 = 2 * (l * m * f + a * c * u), i.m31 = 2 * (m * a * f + l * c * u), i.m32 = 2 * (m * l * f - a * c * u), i.m33 = 1 - 2 * (w + o) * f, i;
}, I = (s, t, e) => {
  const n = new y();
  return n.m11 = s, n.a = s, n.m22 = t, n.d = t, n.m33 = e, n;
}, v = (s, t) => {
  const e = new y();
  if (s) {
    const n = s * Math.PI / 180, i = Math.tan(n);
    e.m21 = i, e.c = i;
  }
  if (t) {
    const n = t * Math.PI / 180, i = Math.tan(n);
    e.m12 = i, e.b = i;
  }
  return e;
}, R$1 = (s) => v(s, 0), D = (s) => v(0, s), N = (s, t) => {
  const e = t.m11 * s.m11 + t.m12 * s.m21 + t.m13 * s.m31 + t.m14 * s.m41, n = t.m11 * s.m12 + t.m12 * s.m22 + t.m13 * s.m32 + t.m14 * s.m42, i = t.m11 * s.m13 + t.m12 * s.m23 + t.m13 * s.m33 + t.m14 * s.m43, r2 = t.m11 * s.m14 + t.m12 * s.m24 + t.m13 * s.m34 + t.m14 * s.m44, a = t.m21 * s.m11 + t.m22 * s.m21 + t.m23 * s.m31 + t.m24 * s.m41, l = t.m21 * s.m12 + t.m22 * s.m22 + t.m23 * s.m32 + t.m24 * s.m42, m = t.m21 * s.m13 + t.m22 * s.m23 + t.m23 * s.m33 + t.m24 * s.m43, h = t.m21 * s.m14 + t.m22 * s.m24 + t.m23 * s.m34 + t.m24 * s.m44, c = t.m31 * s.m11 + t.m32 * s.m21 + t.m33 * s.m31 + t.m34 * s.m41, u = t.m31 * s.m12 + t.m32 * s.m22 + t.m33 * s.m32 + t.m34 * s.m42, f = t.m31 * s.m13 + t.m32 * s.m23 + t.m33 * s.m33 + t.m34 * s.m43, w = t.m31 * s.m14 + t.m32 * s.m24 + t.m33 * s.m34 + t.m34 * s.m44, o = t.m41 * s.m11 + t.m42 * s.m21 + t.m43 * s.m31 + t.m44 * s.m41, d = t.m41 * s.m12 + t.m42 * s.m22 + t.m43 * s.m32 + t.m44 * s.m42, A = t.m41 * s.m13 + t.m42 * s.m23 + t.m43 * s.m33 + t.m44 * s.m43, M2 = t.m41 * s.m14 + t.m42 * s.m24 + t.m43 * s.m34 + t.m44 * s.m44;
  return g([
    e,
    n,
    i,
    r2,
    a,
    l,
    m,
    h,
    c,
    u,
    f,
    w,
    o,
    d,
    A,
    M2
  ]);
};
class y {
  /**
   * @constructor
   * @param init accepts all parameter configurations:
   * * valid CSS transform string,
   * * CSSMatrix/DOMMatrix instance,
   * * a 6/16 elements *Array*.
   */
  constructor(t) {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0, this.m11 = 1, this.m12 = 0, this.m13 = 0, this.m14 = 0, this.m21 = 0, this.m22 = 1, this.m23 = 0, this.m24 = 0, this.m31 = 0, this.m32 = 0, this.m33 = 1, this.m34 = 0, this.m41 = 0, this.m42 = 0, this.m43 = 0, this.m44 = 1, t ? this.setMatrixValue(t) : this;
  }
  /**
   * A `Boolean` whose value is `true` if the matrix is the identity matrix. The identity
   * matrix is one in which every value is 0 except those on the main diagonal from top-left
   * to bottom-right corner (in other words, where the offsets in each direction are equal).
   *
   * @return the current property value
   */
  get isIdentity() {
    return this.m11 === 1 && this.m12 === 0 && this.m13 === 0 && this.m14 === 0 && this.m21 === 0 && this.m22 === 1 && this.m23 === 0 && this.m24 === 0 && this.m31 === 0 && this.m32 === 0 && this.m33 === 1 && this.m34 === 0 && this.m41 === 0 && this.m42 === 0 && this.m43 === 0 && this.m44 === 1;
  }
  /**
   * A `Boolean` flag whose value is `true` if the matrix was initialized as a 2D matrix
   * and `false` if the matrix is 3D.
   *
   * @return the current property value
   */
  get is2D() {
    return this.m31 === 0 && this.m32 === 0 && this.m33 === 1 && this.m34 === 0 && this.m43 === 0 && this.m44 === 1;
  }
  /**
   * The `setMatrixValue` method replaces the existing matrix with one computed
   * in the browser. EG: `matrix(1,0.25,-0.25,1,0,0)`
   *
   * The method accepts any *Array* values, the result of
   * `DOMMatrix` instance method `toFloat64Array()` / `toFloat32Array()` calls
   * or `CSSMatrix` instance method `toArray()`.
   *
   * This method expects valid *matrix()* / *matrix3d()* string values, as well
   * as other transform functions like *translateX(10px)*.
   *
   * @param source
   * @return the matrix instance
   */
  setMatrixValue(t) {
    return typeof t == "string" && t.length && t !== "none" ? O$1(t) : Array.isArray(t) || t instanceof Float64Array || t instanceof Float32Array ? g(t) : typeof t == "object" ? X$1(t) : this;
  }
  /**
   * Returns a *Float32Array* containing elements which comprise the matrix.
   * The method can return either the 16 elements or the 6 elements
   * depending on the value of the `is2D` parameter.
   *
   * @param is2D *Array* representation of the matrix
   * @return an *Array* representation of the matrix
   */
  toFloat32Array(t) {
    return Float32Array.from(x(this, t));
  }
  /**
   * Returns a *Float64Array* containing elements which comprise the matrix.
   * The method can return either the 16 elements or the 6 elements
   * depending on the value of the `is2D` parameter.
   *
   * @param is2D *Array* representation of the matrix
   * @return an *Array* representation of the matrix
   */
  toFloat64Array(t) {
    return Float64Array.from(x(this, t));
  }
  /**
   * Creates and returns a string representation of the matrix in `CSS` matrix syntax,
   * using the appropriate `CSS` matrix notation.
   *
   * matrix3d *matrix3d(m11, m12, m13, m14, m21, ...)*
   * matrix *matrix(a, b, c, d, e, f)*
   *
   * @return a string representation of the matrix
   */
  toString() {
    const { is2D: t } = this, e = this.toFloat64Array(t).join(", ");
    return `${t ? "matrix" : "matrix3d"}(${e})`;
  }
  /**
   * Returns a JSON representation of the `CSSMatrix` instance, a standard *Object*
   * that includes `{a,b,c,d,e,f}` and `{m11,m12,m13,..m44}` properties as well
   * as the `is2D` & `isIdentity` properties.
   *
   * The result can also be used as a second parameter for the `fromMatrix` static method
   * to load values into another matrix instance.
   *
   * @return an *Object* with all matrix values.
   */
  toJSON() {
    const { is2D: t, isIdentity: e } = this;
    return { ...this, is2D: t, isIdentity: e };
  }
  /**
   * The Multiply method returns a new CSSMatrix which is the result of this
   * matrix multiplied by the passed matrix, with the passed matrix to the right.
   * This matrix is not modified.
   *
   * @param m2 CSSMatrix
   * @return The resulted matrix.
   */
  multiply(t) {
    return N(this, t);
  }
  /**
   * The translate method returns a new matrix which is this matrix post
   * multiplied by a translation matrix containing the passed values. If the z
   * component is undefined, a 0 value is used in its place. This matrix is not
   * modified.
   *
   * @param x X component of the translation value.
   * @param y Y component of the translation value.
   * @param z Z component of the translation value.
   * @return The resulted matrix
   */
  translate(t, e, n) {
    const i = t;
    let r2 = e, a = n;
    return typeof r2 > "u" && (r2 = 0), typeof a > "u" && (a = 0), N(this, Y$1(i, r2, a));
  }
  /**
   * The scale method returns a new matrix which is this matrix post multiplied by
   * a scale matrix containing the passed values. If the z component is undefined,
   * a 1 value is used in its place. If the y component is undefined, the x
   * component value is used in its place. This matrix is not modified.
   *
   * @param x The X component of the scale value.
   * @param y The Y component of the scale value.
   * @param z The Z component of the scale value.
   * @return The resulted matrix
   */
  scale(t, e, n) {
    const i = t;
    let r2 = e, a = n;
    return typeof r2 > "u" && (r2 = t), typeof a > "u" && (a = 1), N(this, I(i, r2, a));
  }
  /**
   * The rotate method returns a new matrix which is this matrix post multiplied
   * by each of 3 rotation matrices about the major axes, first X, then Y, then Z.
   * If the y and z components are undefined, the x value is used to rotate the
   * object about the z axis, as though the vector (0,0,x) were passed. All
   * rotation values are in degrees. This matrix is not modified.
   *
   * @param rx The X component of the rotation, or Z if Y and Z are null.
   * @param ry The (optional) Y component of the rotation value.
   * @param rz The (optional) Z component of the rotation value.
   * @return The resulted matrix
   */
  rotate(t, e, n) {
    let i = t, r2 = e || 0, a = n || 0;
    return typeof t == "number" && typeof e > "u" && typeof n > "u" && (a = i, i = 0, r2 = 0), N(this, F$1(i, r2, a));
  }
  /**
   * The rotateAxisAngle method returns a new matrix which is this matrix post
   * multiplied by a rotation matrix with the given axis and `angle`. The right-hand
   * rule is used to determine the direction of rotation. All rotation values are
   * in degrees. This matrix is not modified.
   *
   * @param x The X component of the axis vector.
   * @param y The Y component of the axis vector.
   * @param z The Z component of the axis vector.
   * @param angle The angle of rotation about the axis vector, in degrees.
   * @return The resulted matrix
   */
  rotateAxisAngle(t, e, n, i) {
    if ([t, e, n, i].some((r2) => Number.isNaN(+r2)))
      throw new TypeError("CSSMatrix: expecting 4 values");
    return N(this, T$1(t, e, n, i));
  }
  /**
   * Specifies a skew transformation along the `x-axis` by the given angle.
   * This matrix is not modified.
   *
   * @param angle The angle amount in degrees to skew.
   * @return The resulted matrix
   */
  skewX(t) {
    return N(this, R$1(t));
  }
  /**
   * Specifies a skew transformation along the `y-axis` by the given angle.
   * This matrix is not modified.
   *
   * @param angle The angle amount in degrees to skew.
   * @return The resulted matrix
   */
  skewY(t) {
    return N(this, D(t));
  }
  /**
   * Specifies a skew transformation along both the `x-axis` and `y-axis`.
   * This matrix is not modified.
   *
   * @param angleX The X-angle amount in degrees to skew.
   * @param angleY The angle amount in degrees to skew.
   * @return The resulted matrix
   */
  skew(t, e) {
    return N(this, v(t, e));
  }
  /**
   * Transforms a specified vector using the matrix, returning a new
   * {x,y,z,w} Tuple *Object* comprising the transformed vector.
   * Neither the matrix nor the original vector are altered.
   *
   * The method is equivalent with `transformPoint()` method
   * of the `DOMMatrix` constructor.
   *
   * @param t Tuple with `{x,y,z,w}` components
   * @return the resulting Tuple
   */
  transformPoint(t) {
    const e = this.m11 * t.x + this.m21 * t.y + this.m31 * t.z + this.m41 * t.w, n = this.m12 * t.x + this.m22 * t.y + this.m32 * t.z + this.m42 * t.w, i = this.m13 * t.x + this.m23 * t.y + this.m33 * t.z + this.m43 * t.w, r2 = this.m14 * t.x + this.m24 * t.y + this.m34 * t.z + this.m44 * t.w;
    return t instanceof DOMPoint ? new DOMPoint(e, n, i, r2) : {
      x: e,
      y: n,
      z: i,
      w: r2
    };
  }
}
p(y, "Translate", Y$1), p(y, "Rotate", F$1), p(y, "RotateAxisAngle", T$1), p(y, "Scale", I), p(y, "SkewX", R$1), p(y, "SkewY", D), p(y, "Skew", v), p(y, "Multiply", N), p(y, "fromArray", g), p(y, "fromMatrix", X$1), p(y, "fromString", O$1), p(y, "toArray", x), p(y, "isCompatibleArray", E$1), p(y, "isCompatibleObject", P);
var Bt = (t, e, n) => {
  let [o, r2] = t, [s, a] = e;
  return [o + (s - o) * n, r2 + (a - r2) * n];
}, E = Bt;
var $t = (t, e) => Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])), re = $t;
var ce = (t, e, n, o) => re([t, e], [n, o]), Le = (t, e, n, o, r2) => {
  let s = { x: t, y: e };
  if (typeof r2 == "number") {
    let a = re([t, e], [n, o]);
    if (r2 <= 0) s = { x: t, y: e };
    else if (r2 >= a) s = { x: n, y: o };
    else {
      let [i, m] = E([t, e], [n, o], r2 / a);
      s = { x: i, y: m };
    }
  }
  return s;
}, Ge = (t, e, n, o) => {
  let { min: r2, max: s } = Math;
  return [r2(t, n), r2(e, o), s(t, n), s(e, o)];
}, ot = { getLineBBox: Ge, getLineLength: ce, getPointAtLineLength: Le };
var st = (t, e, n) => {
  let o = n / 2, r2 = Math.sin(o), s = Math.cos(o), a = t ** 2 * r2 ** 2, i = e ** 2 * s ** 2, m = Math.sqrt(a + i) * n;
  return Math.abs(m);
}, pe = (t, e, n, o, r2, s) => {
  let { sin: a, cos: i } = Math, m = i(r2), u = a(r2), l = n * i(s), c = o * a(s);
  return [t + m * l - u * c, e + u * l + m * c];
}, at = (t, e) => {
  let { x: n, y: o } = t, { x: r2, y: s } = e, a = n * r2 + o * s, i = Math.sqrt((n ** 2 + o ** 2) * (r2 ** 2 + s ** 2));
  return (n * s - o * r2 < 0 ? -1 : 1) * Math.acos(a / i);
}, _e = (t, e, n, o, r2, s, a, i, m) => {
  let { abs: u, sin: l, cos: c, sqrt: f, PI: g2 } = Math, p2 = u(n), h = u(o), S = (r2 % 360 + 360) % 360 * (g2 / 180);
  if (t === i && e === m) return { rx: p2, ry: h, startAngle: 0, endAngle: 0, center: { x: i, y: m } };
  if (p2 === 0 || h === 0) return { rx: p2, ry: h, startAngle: 0, endAngle: 0, center: { x: (i + t) / 2, y: (m + e) / 2 } };
  let A = (t - i) / 2, d = (e - m) / 2, b = { x: c(S) * A + l(S) * d, y: -l(S) * A + c(S) * d }, P2 = b.x ** 2 / p2 ** 2 + b.y ** 2 / h ** 2;
  P2 > 1 && (p2 *= f(P2), h *= f(P2));
  let C = p2 ** 2 * h ** 2 - p2 ** 2 * b.y ** 2 - h ** 2 * b.x ** 2, V = p2 ** 2 * b.y ** 2 + h ** 2 * b.x ** 2, k = C / V;
  k = k < 0 ? 0 : k;
  let w = (s !== a ? 1 : -1) * f(k), v2 = { x: w * (p2 * b.y / h), y: w * (-(h * b.x) / p2) }, j = { x: c(S) * v2.x - l(S) * v2.y + (t + i) / 2, y: l(S) * v2.x + c(S) * v2.y + (e + m) / 2 }, ue = { x: (b.x - v2.x) / p2, y: (b.y - v2.y) / h }, q = at({ x: 1, y: 0 }, ue), x2 = { x: (-b.x - v2.x) / p2, y: (-b.y - v2.y) / h }, Q = at(ue, x2);
  !a && Q > 0 ? Q -= 2 * g2 : a && Q < 0 && (Q += 2 * g2), Q %= 2 * g2;
  let H = q + Q;
  return { center: j, startAngle: q, endAngle: H, rx: p2, ry: h };
}, ve = (t, e, n, o, r2, s, a, i, m) => {
  let { rx: u, ry: l, startAngle: c, endAngle: f } = _e(t, e, n, o, r2, s, a, i, m);
  return st(u, l, f - c);
}, mt = (t, e, n, o, r2, s, a, i, m, u) => {
  let l = { x: t, y: e }, { center: c, rx: f, ry: g2, startAngle: p2, endAngle: h } = _e(t, e, n, o, r2, s, a, i, m);
  if (typeof u == "number") {
    let y2 = st(f, g2, h - p2);
    if (u <= 0) l = { x: t, y: e };
    else if (u >= y2) l = { x: i, y: m };
    else {
      if (t === i && e === m) return { x: i, y: m };
      if (f === 0 || g2 === 0) return Le(t, e, i, m, u);
      let { PI: S, cos: A, sin: d } = Math, b = h - p2, C = (r2 % 360 + 360) % 360 * (S / 180), V = p2 + b * (u / y2), k = f * A(V), w = g2 * d(V);
      l = { x: A(C) * k - d(C) * w + c.x, y: d(C) * k + A(C) * w + c.y };
    }
  }
  return l;
}, it = (t, e, n, o, r2, s, a, i, m) => {
  let { center: u, rx: l, ry: c, startAngle: f, endAngle: g2 } = _e(t, e, n, o, r2, s, a, i, m), p2 = g2 - f, { min: h, max: y2, tan: S, atan2: A, PI: d } = Math, { x: b, y: P2 } = u, C = r2 * d / 180, V = S(C), k = A(-c * V, l), w = k, v2 = k + d, j = A(c, l * V), ue = j + d, q = [i], x2 = [m], Q = h(t, i), H = y2(t, i), I2 = h(e, m), W = y2(e, m), ye = g2 - p2 * 1e-5, le = pe(b, P2, l, c, C, ye), N2 = g2 - p2 * 0.99999, D2 = pe(b, P2, l, c, C, N2);
  if (le[0] > H || D2[0] > H) {
    let z2 = pe(b, P2, l, c, C, w);
    q.push(z2[0]), x2.push(z2[1]);
  }
  if (le[0] < Q || D2[0] < Q) {
    let z2 = pe(b, P2, l, c, C, v2);
    q.push(z2[0]), x2.push(z2[1]);
  }
  if (le[1] < I2 || D2[1] < I2) {
    let z2 = pe(b, P2, l, c, C, ue);
    q.push(z2[0]), x2.push(z2[1]);
  }
  if (le[1] > W || D2[1] > W) {
    let z2 = pe(b, P2, l, c, C, j);
    q.push(z2[0]), x2.push(z2[1]);
  }
  return Q = h.apply([], q), I2 = h.apply([], x2), H = y2.apply([], q), W = y2.apply([], x2), [Q, I2, H, W];
}, ut = { angleBetween: at, arcLength: st, arcPoint: pe, getArcBBox: it, getArcLength: ve, getArcProps: _e, getPointAtArcLength: mt };
var lt = [-0.06405689286260563, 0.06405689286260563, -0.1911188674736163, 0.1911188674736163, -0.3150426796961634, 0.3150426796961634, -0.4337935076260451, 0.4337935076260451, -0.5454214713888396, 0.5454214713888396, -0.6480936519369755, 0.6480936519369755, -0.7401241915785544, 0.7401241915785544, -0.820001985973903, 0.820001985973903, -0.8864155270044011, 0.8864155270044011, -0.9382745520027328, 0.9382745520027328, -0.9747285559713095, 0.9747285559713095, -0.9951872199970213, 0.9951872199970213], zt = [0.12793819534675216, 0.12793819534675216, 0.1258374563468283, 0.1258374563468283, 0.12167047292780339, 0.12167047292780339, 0.1155056680537256, 0.1155056680537256, 0.10744427011596563, 0.10744427011596563, 0.09761865210411388, 0.09761865210411388, 0.08619016153195327, 0.08619016153195327, 0.0733464814110803, 0.0733464814110803, 0.05929858491543678, 0.05929858491543678, 0.04427743881741981, 0.04427743881741981, 0.028531388628933663, 0.028531388628933663, 0.0123412297999872, 0.0123412297999872], Vt = (t) => {
  let e = [];
  for (let n = t, o = n.length, r2 = o - 1; o > 1; o -= 1, r2 -= 1) {
    let s = [];
    for (let a = 0; a < r2; a += 1) s.push({ x: r2 * (n[a + 1].x - n[a].x), y: r2 * (n[a + 1].y - n[a].y), t: 0 });
    e.push(s), n = s;
  }
  return e;
}, Rt = (t, e) => {
  if (e === 0) return t[0].t = 0, t[0];
  let n = t.length - 1;
  if (e === 1) return t[n].t = 1, t[n];
  let o = 1 - e, r2 = t;
  if (n === 0) return t[0].t = e, t[0];
  if (n === 1) return { x: o * r2[0].x + e * r2[1].x, y: o * r2[0].y + e * r2[1].y, t: e };
  let s = o * o, a = e * e, i = 0, m = 0, u = 0, l = 0;
  return n === 2 ? (r2 = [r2[0], r2[1], r2[2], { x: 0, y: 0 }], i = s, m = o * e * 2, u = a) : n === 3 && (i = s * o, m = s * e * 3, u = o * a * 3, l = e * a), { x: i * r2[0].x + m * r2[1].x + u * r2[2].x + l * r2[3].x, y: i * r2[0].y + m * r2[1].y + u * r2[2].y + l * r2[3].y, t: e };
}, kt = (t, e) => {
  let n = t(e), o = n.x * n.x + n.y * n.y;
  return Math.sqrt(o);
}, qt = (t) => {
  let n = lt.length, o = 0;
  for (let r2 = 0, s; r2 < n; r2++) s = 0.5 * lt[r2] + 0.5, o += zt[r2] * kt(t, s);
  return 0.5 * o;
}, fe = (t) => {
  let e = [];
  for (let o = 0, r2 = t.length, s = 2; o < r2; o += s) e.push({ x: t[o], y: t[o + 1] });
  let n = Vt(e);
  return qt((o) => Rt(n[0], o));
}, Qt = 1e-8, Ne = ([t, e, n]) => {
  let o = Math.min(t, n), r2 = Math.max(t, n);
  if (e >= t ? n >= e : n <= e) return [o, r2];
  let s = (t * n - e * e) / (t - 2 * e + n);
  return s < o ? [s, r2] : [o, s];
}, Ue = ([t, e, n, o]) => {
  let r2 = t - 3 * e + 3 * n - o;
  if (Math.abs(r2) < Qt) return t === o && t === e ? [t, o] : Ne([t, -0.5 * t + 1.5 * e, t - 3 * e + 3 * n]);
  let s = -t * n + t * o - e * n - e * o + e * e + n * n;
  if (s <= 0) return [Math.min(t, o), Math.max(t, o)];
  let a = Math.sqrt(s), i = Math.min(t, o), m = Math.max(t, o), u = t - 2 * e + n;
  for (let l = (u + a) / r2, c = 1; c <= 2; l = (u - a) / r2, c++) {
    if (l > 0 && l < 1) {
      let f = t * (1 - l) * (1 - l) * (1 - l) + e * 3 * (1 - l) * (1 - l) * l + n * 3 * (1 - l) * l * l + o * l * l * l;
      f < i && (i = f), f > m && (m = f);
    }
  }
  return [i, m];
}, ct = { bezierLength: qt, calculateBezier: kt, CBEZIER_MINMAX_EPSILON: Qt, computeBezier: Rt, Cvalues: zt, deriveBezier: Vt, getBezierLength: fe, minmaxC: Ue, minmaxQ: Ne, Tvalues: lt };
var Dt = ([t, e, n, o, r2, s, a, i], m) => {
  let u = 1 - m;
  return { x: u ** 3 * t + 3 * u ** 2 * m * n + 3 * u * m ** 2 * r2 + m ** 3 * a, y: u ** 3 * e + 3 * u ** 2 * m * o + 3 * u * m ** 2 * s + m ** 3 * i };
}, Pe = (t, e, n, o, r2, s, a, i) => fe([t, e, n, o, r2, s, a, i]), pt = (t, e, n, o, r2, s, a, i, m) => {
  let u = typeof m == "number", l = { x: t, y: e };
  if (u) {
    let c = fe([t, e, n, o, r2, s, a, i]);
    m <= 0 || (m >= c ? l = { x: a, y: i } : l = Dt([t, e, n, o, r2, s, a, i], m / c));
  }
  return l;
}, Fe = (t, e, n, o, r2, s, a, i) => {
  let m = Ue([t, n, r2, a]), u = Ue([e, o, s, i]);
  return [m[0], u[0], m[1], u[1]];
}, ft = { getCubicBBox: Fe, getCubicLength: Pe, getPointAtCubicLength: pt, getPointAtCubicSegmentLength: Dt };
var Et = ([t, e, n, o, r2, s], a) => {
  let i = 1 - a;
  return { x: i ** 2 * t + 2 * i * a * n + a ** 2 * r2, y: i ** 2 * e + 2 * i * a * o + a ** 2 * s };
}, xe = (t, e, n, o, r2, s) => fe([t, e, n, o, r2, s]), gt = (t, e, n, o, r2, s, a) => {
  let i = typeof a == "number", m = { x: t, y: e };
  if (i) {
    let u = fe([t, e, n, o, r2, s]);
    a <= 0 || (a >= u ? m = { x: r2, y: s } : m = Et([t, e, n, o, r2, s], a / u));
  }
  return m;
}, Ke = (t, e, n, o, r2, s) => {
  let a = Ne([t, n, r2]), i = Ne([e, o, s]);
  return [a[0], i[0], a[1], i[1]];
}, ht = { getPointAtQuadLength: gt, getPointAtQuadSegmentLength: Et, getQuadBBox: Ke, getQuadLength: xe };
var jt = (t) => {
  let e = t.length, n = -1, o, r2 = t[e - 1], s = 0;
  for (; ++n < e; ) o = r2, r2 = t[n], s += o[1] * r2[0] - o[0] * r2[1];
  return s / 2;
}, Ht = (t) => t.reduce((e, n, o) => o ? e + re(t[o - 1], n) : 0, 0), bt = { polygonArea: jt, polygonLength: Ht };
var Zt = (t, e, n) => {
  let { sin: o, cos: r2 } = Math, s = t * r2(n) - e * o(n), a = t * o(n) + e * r2(n);
  return { x: s, y: a };
}, ne = Zt;
var Gt = (t, e) => {
  let n = e >= 1 ? 10 ** e : 1;
  return e > 0 ? Math.round(t * n) / n : Math.round(t);
}, M = Gt;
var _t = { origin: [0, 0, 0], round: 4 }, O = _t;
var Ut = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 }, Z = Ut;
var Ft = (t) => {
  let e = t.pathValue[t.segmentStart], n = e.toLowerCase(), { data: o } = t;
  for (; o.length >= Z[n] && (n === "m" && o.length > 2 ? (t.segments.push([e].concat(o.splice(0, 2))), n = "l", e = e === "m" ? "l" : "L") : t.segments.push([e].concat(o.splice(0, Z[n]))), !!Z[n]); ) ;
}, Se = Ft;
var Kt = "SVGPathCommander Error", R = Kt;
var Jt = (t) => {
  let { index: e, pathValue: n } = t, o = n.charCodeAt(e);
  if (o === 48) {
    t.param = 0, t.index += 1;
    return;
  }
  if (o === 49) {
    t.param = 1, t.index += 1;
    return;
  }
  t.err = `${R}: invalid Arc flag "${n[e]}", expecting 0 or 1 at index ${e}`;
}, we = Jt;
var Wt = (t) => t >= 48 && t <= 57, B = Wt;
var Xt = "Invalid path value", $ = Xt;
var Yt = (t) => {
  let { max: e, pathValue: n, index: o } = t, r2 = o, s = false, a = false, i = false, m = false, u;
  if (r2 >= e) {
    t.err = `${R}: ${$} at index ${r2}, "pathValue" is missing param`;
    return;
  }
  if (u = n.charCodeAt(r2), (u === 43 || u === 45) && (r2 += 1, u = n.charCodeAt(r2)), !B(u) && u !== 46) {
    t.err = `${R}: ${$} at index ${r2}, "${n[r2]}" is not a number`;
    return;
  }
  if (u !== 46) {
    if (s = u === 48, r2 += 1, u = n.charCodeAt(r2), s && r2 < e && u && B(u)) {
      t.err = `${R}: ${$} at index ${o}, "${n[o]}" illegal number`;
      return;
    }
    for (; r2 < e && B(n.charCodeAt(r2)); ) r2 += 1, a = true;
    u = n.charCodeAt(r2);
  }
  if (u === 46) {
    for (m = true, r2 += 1; B(n.charCodeAt(r2)); ) r2 += 1, i = true;
    u = n.charCodeAt(r2);
  }
  if (u === 101 || u === 69) {
    if (m && !a && !i) {
      t.err = `${R}: ${$} at index ${r2}, "${n[r2]}" invalid float exponent`;
      return;
    }
    if (r2 += 1, u = n.charCodeAt(r2), (u === 43 || u === 45) && (r2 += 1), r2 < e && B(n.charCodeAt(r2))) for (; r2 < e && B(n.charCodeAt(r2)); ) r2 += 1;
    else {
      t.err = `${R}: ${$} at index ${r2}, "${n[r2]}" invalid integer exponent`;
      return;
    }
  }
  t.index = r2, t.param = +t.pathValue.slice(o, r2);
}, ze = Yt;
var er = (t) => [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279, 10, 13, 8232, 8233, 32, 9, 11, 12, 160].includes(t), Ve = er;
var tr = (t) => {
  let { pathValue: e, max: n } = t;
  for (; t.index < n && Ve(e.charCodeAt(t.index)); ) t.index += 1;
}, G = tr;
var rr = (t) => {
  switch (t | 32) {
    case 109:
    case 122:
    case 108:
    case 104:
    case 118:
    case 99:
    case 115:
    case 113:
    case 116:
    case 97:
      return true;
    default:
      return false;
  }
}, Re = rr;
var nr = (t) => B(t) || t === 43 || t === 45 || t === 46, ke = nr;
var or = (t) => (t | 32) === 97, qe = or;
var ar = (t) => {
  switch (t | 32) {
    case 109:
    case 77:
      return true;
    default:
      return false;
  }
}, Qe = ar;
var sr = (t) => {
  var _a;
  let { max: e, pathValue: n, index: o, segments: r2 } = t, s = n.charCodeAt(o), a = Z[n[o].toLowerCase()];
  if (t.segmentStart = o, !Re(s)) {
    t.err = `${R}: ${$} "${n[o]}" is not a path command at index ${o}`;
    return;
  }
  let i = r2[r2.length - 1];
  if (!Qe(s) && ((_a = i == null ? void 0 : i[0]) == null ? void 0 : _a.toLocaleLowerCase()) === "z") {
    t.err = `${R}: ${$} "${n[o]}" is not a MoveTo path command at index ${o}`;
    return;
  }
  if (t.index += 1, G(t), t.data = [], !a) {
    Se(t);
    return;
  }
  for (; ; ) {
    for (let m = a; m > 0; m -= 1) {
      if (qe(s) && (m === 3 || m === 4) ? we(t) : ze(t), t.err.length) return;
      t.data.push(t.param), G(t), t.index < e && n.charCodeAt(t.index) === 44 && (t.index += 1, G(t));
    }
    if (t.index >= t.max || !ke(n.charCodeAt(t.index))) break;
  }
  Se(t);
}, ge = sr;
var F = class {
  constructor(e) {
    this.segments = [], this.pathValue = e, this.max = e.length, this.index = 0, this.param = 0, this.segmentStart = 0, this.data = [], this.err = "";
  }
};
var mr = (t) => {
  if (typeof t != "string") return t.slice(0);
  let e = new F(t);
  for (G(e); e.index < e.max && !e.err.length; ) ge(e);
  if (!e.err.length) e.segments.length && (e.segments[0][0] = "M");
  else throw TypeError(e.err);
  return e.segments;
}, L = mr;
var ir = (t, e, n, o) => {
  let [r2] = t, s = r2.toUpperCase(), a = s === r2;
  if (e === 0 || a) return t;
  if (s === "A") return [s, t[1], t[2], t[3], t[4], t[5], t[6] + n, t[7] + o];
  if (s === "V") return [s, t[1] + o];
  if (s === "H") return [s, t[1] + n];
  if (s === "L") return [s, t[1] + n, t[2] + o];
  {
    let i = [], m = t.length;
    for (let u = 1; u < m; u += 1) i.push(t[u] + (u % 2 ? n : o));
    return [s].concat(i);
  }
}, _ = ir;
var ur = (t, e) => {
  let n = t.length, o, r2 = "M", s = "M", a = false, i = 0, m = 0, u = 0, l = 0, c = 0;
  for (let f = 0; f < n; f += 1) {
    o = t[f], [r2] = o, c = o.length, s = r2.toUpperCase(), a = s !== r2;
    let g2 = e(o, f, i, m);
    if (g2 === false) break;
    s === "Z" ? (i = u, m = l) : s === "H" ? i = o[1] + (a ? i : 0) : s === "V" ? m = o[1] + (a ? m : 0) : (i = o[c - 2] + (a ? i : 0), m = o[c - 1] + (a ? m : 0), s === "M" && (u = i, l = m)), g2 && (t[f] = g2, g2[0] === "C" && (n = t.length));
  }
  return t;
}, T = ur;
var lr = (t) => {
  let e = L(t);
  return T(e, _);
}, oe = lr;
var cr = (t, e, n, o) => {
  let [r2] = t, s = r2.toLowerCase(), a = r2 === s;
  if (e === 0 || a) return t;
  if (s === "a") return [s, t[1], t[2], t[3], t[4], t[5], t[6] - n, t[7] - o];
  if (s === "v") return [s, t[1] - o];
  if (s === "h") return [s, t[1] - n];
  if (s === "l") return [s, t[1] - n, t[2] - o];
  {
    let i = [], m = t.length;
    for (let u = 1; u < m; u += 1) i.push(t[u] - (u % 2 ? n : o));
    return [s].concat(i);
  }
}, he = cr;
var pr = (t) => {
  let e = L(t);
  return T(e, he);
}, Je = pr;
var Ot = (t, e, n, o, r2, s, a, i, m, u) => {
  let l = t, c = e, f = n, g2 = o, p2 = i, h = m, y2 = Math.PI * 120 / 180, S = Math.PI / 180 * (+r2 || 0), A = [], d, b, P2, C, V;
  if (u) [b, P2, C, V] = u;
  else {
    d = ne(l, c, -S), l = d.x, c = d.y, d = ne(p2, h, -S), p2 = d.x, h = d.y;
    let N2 = (l - p2) / 2, D2 = (c - h) / 2, z2 = N2 * N2 / (f * f) + D2 * D2 / (g2 * g2);
    z2 > 1 && (z2 = Math.sqrt(z2), f *= z2, g2 *= z2);
    let rt = f * f, nt = g2 * g2, wt = (s === a ? -1 : 1) * Math.sqrt(Math.abs((rt * nt - rt * D2 * D2 - nt * N2 * N2) / (rt * D2 * D2 + nt * N2 * N2)));
    C = wt * f * D2 / g2 + (l + p2) / 2, V = wt * -g2 * N2 / f + (c + h) / 2, b = Math.asin(((c - V) / g2 * 10 ** 9 >> 0) / 10 ** 9), P2 = Math.asin(((h - V) / g2 * 10 ** 9 >> 0) / 10 ** 9), b = l < C ? Math.PI - b : b, P2 = p2 < C ? Math.PI - P2 : P2, b < 0 && (b = Math.PI * 2 + b), P2 < 0 && (P2 = Math.PI * 2 + P2), a && b > P2 && (b -= Math.PI * 2), !a && P2 > b && (P2 -= Math.PI * 2);
  }
  let k = P2 - b;
  if (Math.abs(k) > y2) {
    let N2 = P2, D2 = p2, z2 = h;
    P2 = b + y2 * (a && P2 > b ? 1 : -1), p2 = C + f * Math.cos(P2), h = V + g2 * Math.sin(P2), A = Ot(p2, h, f, g2, r2, 0, a, D2, z2, [P2, N2, C, V]);
  }
  k = P2 - b;
  let w = Math.cos(b), v2 = Math.sin(b), j = Math.cos(P2), ue = Math.sin(P2), q = Math.tan(k / 4), x2 = 4 / 3 * f * q, Q = 4 / 3 * g2 * q, H = [l, c], I2 = [l + x2 * v2, c - Q * w], W = [p2 + x2 * ue, h - Q * j], ye = [p2, h];
  if (I2[0] = 2 * H[0] - I2[0], I2[1] = 2 * H[1] - I2[1], u) return [I2[0], I2[1], W[0], W[1], ye[0], ye[1]].concat(A);
  A = [I2[0], I2[1], W[0], W[1], ye[0], ye[1]].concat(A);
  let le = [];
  for (let N2 = 0, D2 = A.length; N2 < D2; N2 += 1) le[N2] = N2 % 2 ? ne(A[N2 - 1], A[N2], S).y : ne(A[N2], A[N2 + 1], S).x;
  return le;
}, be = Ot;
var fr = (t, e, n, o, r2, s) => {
  let a = 0.3333333333333333, i = 2 / 3;
  return [a * t + i * n, a * e + i * o, a * r2 + i * n, a * s + i * o, r2, s];
}, De = fr;
var gr = (t, e, n, o) => {
  let r2 = E([t, e], [n, o], 0.3333333333333333), s = E([t, e], [n, o], 2 / 3);
  return [r2[0], r2[1], s[0], s[1], n, o];
}, Ae = gr;
var hr = (t, e) => {
  let [n] = t, o = t.slice(1).map(Number), [r2, s] = o, { x1: a, y1: i, x: m, y: u } = e;
  return "TQ".includes(n) || (e.qx = null, e.qy = null), n === "M" ? (e.x = r2, e.y = s, t) : n === "A" ? ["C"].concat(be(a, i, o[0], o[1], o[2], o[3], o[4], o[5], o[6])) : n === "Q" ? (e.qx = r2, e.qy = s, ["C"].concat(De(a, i, o[0], o[1], o[2], o[3]))) : n === "L" ? ["C"].concat(Ae(a, i, r2, s)) : n === "Z" ? ["C"].concat(Ae(a, i, m, u)) : t;
}, Ee = hr;
var br = (t, e) => {
  let [n] = t, o = n.toUpperCase(), r2 = n !== o, { x1: s, y1: a, x2: i, y2: m, x: u, y: l } = e, c = t.slice(1), f = c.map((g2, p2) => g2 + (r2 ? p2 % 2 ? l : u : 0));
  "TQ".includes(o) || (e.qx = null, e.qy = null);
  if (o === "A") return f = c.slice(0, -2).concat(c[5] + (r2 ? u : 0), c[6] + (r2 ? l : 0)), ["A"].concat(f);
  if (o === "H") return ["L", t[1] + (r2 ? u : 0), a];
  if (o === "V") return ["L", s, t[1] + (r2 ? l : 0)];
  if (o === "L") return ["L", t[1] + (r2 ? u : 0), t[2] + (r2 ? l : 0)];
  if (o === "M") return ["M", t[1] + (r2 ? u : 0), t[2] + (r2 ? l : 0)];
  if (o === "C") return ["C"].concat(f);
  if (o === "S") {
    let g2 = s * 2 - i, p2 = a * 2 - m;
    return e.x1 = g2, e.y1 = p2, ["C", g2, p2].concat(f);
  } else if (o === "T") {
    let g2 = s * 2 - (e.qx ? e.qx : 0), p2 = a * 2 - (e.qy ? e.qy : 0);
    return e.qx = g2, e.qy = p2, ["Q", g2, p2].concat(f);
  } else if (o === "Q") {
    let [g2, p2] = f;
    return e.qx = g2, e.qy = p2, ["Q"].concat(f);
  } else if (o === "Z") return ["Z"];
  return t;
}, X = br;
var dr = { x1: 0, y1: 0, x2: 0, y2: 0, x: 0, y: 0, qx: null, qy: null }, U = dr;
var yr = (t) => {
  let e = { ...U }, n = L(t);
  return T(n, (o, r2, s, a) => {
    e.x = s, e.y = a;
    let i = X(o, e), m = Ee(i, e);
    m[0] === "C" && m.length > 7 && (n.splice(r2 + 1, 0, ["C"].concat(m.slice(7))), m = m.slice(0, 7));
    let l = m.length;
    return e.x1 = +m[l - 2], e.y1 = +m[l - 1], e.x2 = +m[l - 4] || e.x1, e.y2 = +m[l - 3] || e.y1, m;
  });
}, ae = yr;
var Pr = (t, e) => {
  let n = t.length, { round: o } = O, r2 = t[0], s = "";
  o = e === "off" || typeof e == "number" && e >= 0 ? e : typeof o == "number" && o >= 0 ? o : "off";
  for (let a = 0; a < n; a += 1) {
    r2 = t[a];
    let [i] = r2, m = r2.slice(1);
    if (s += i, o === "off") s += m.join(" ");
    else {
      let u = 0, l = m.length;
      for (; u < l; ) s += M(m[u], o), u !== l - 1 && (s += " "), u += 1;
    }
  }
  return s;
}, Ce = Pr;
var xr = (t) => {
  if (!t) return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0, cx: 0, cy: 0, cz: 0 };
  let e = L(t), n = "M", o = 0, r2 = 0, { max: s, min: a } = Math, i = 1 / 0, m = 1 / 0, u = -1 / 0, l = -1 / 0, c = 0, f = 0, g2 = 0, p2 = 0, h = 0, y2 = 0, S = 0, A = 0, d = 0, b = 0;
  T(e, (V, k, w, v2) => {
    [n] = V;
    let j = n.toUpperCase(), q = j !== n ? _(V, k, w, v2) : V.slice(0), x2 = j === "V" ? ["L", w, q[1]] : j === "H" ? ["L", q[1], v2] : q;
    [n] = x2, "TQ".includes(j) || (d = 0, b = 0);
    if (n === "M") [, o, r2] = x2, c = o, f = r2, g2 = o, p2 = r2;
    else if (n === "L") [c, f, g2, p2] = Ge(w, v2, x2[1], x2[2]);
    else if (n === "A") [c, f, g2, p2] = it(w, v2, x2[1], x2[2], x2[3], x2[4], x2[5], x2[6], x2[7]);
    else if (n === "S") {
      let Q = h * 2 - S, H = y2 * 2 - A;
      [c, f, g2, p2] = Fe(w, v2, Q, H, x2[1], x2[2], x2[3], x2[4]);
    } else n === "C" ? [c, f, g2, p2] = Fe(w, v2, x2[1], x2[2], x2[3], x2[4], x2[5], x2[6]) : n === "T" ? (d = h * 2 - d, b = y2 * 2 - b, [c, f, g2, p2] = Ke(w, v2, d, b, x2[1], x2[2])) : n === "Q" ? (d = x2[1], b = x2[2], [c, f, g2, p2] = Ke(w, v2, x2[1], x2[2], x2[3], x2[4])) : n === "Z" && ([c, f, g2, p2] = Ge(w, v2, o, r2));
    i = a(c, i), m = a(f, m), u = s(g2, u), l = s(p2, l), [h, y2] = n === "Z" ? [o, r2] : x2.slice(-2), [S, A] = n === "C" ? [x2[3], x2[4]] : n === "S" ? [x2[1], x2[2]] : [h, y2];
  });
  let P2 = u - i, C = l - m;
  return { width: P2, height: C, x: i, y: m, x2: u, y2: l, cx: i + P2 / 2, cy: m + C / 2, cz: Math.max(P2, C) + Math.min(P2, C) / 2 };
}, We = xr;
var Sr = (t) => {
  let e = L(t), n = 0, o = 0, r2 = 0, s = 0, a = 0, i = 0, m = "M", u = 0, l = 0, c = 0;
  return T(e, (f, g2, p2, h) => {
    [m] = f;
    let y2 = m.toUpperCase(), A = y2 !== m ? _(f, g2, p2, h) : f.slice(0), d = y2 === "V" ? ["L", p2, A[1]] : y2 === "H" ? ["L", A[1], h] : A;
    [m] = d, "TQ".includes(y2) || (a = 0, i = 0);
    if (m === "M") [, u, l] = d;
    else if (m === "L") c += ce(p2, h, d[1], d[2]);
    else if (m === "A") c += ve(p2, h, d[1], d[2], d[3], d[4], d[5], d[6], d[7]);
    else if (m === "S") {
      let b = n * 2 - r2, P2 = o * 2 - s;
      c += Pe(p2, h, b, P2, d[1], d[2], d[3], d[4]);
    } else m === "C" ? c += Pe(p2, h, d[1], d[2], d[3], d[4], d[5], d[6]) : m === "T" ? (a = n * 2 - a, i = o * 2 - i, c += xe(p2, h, a, i, d[1], d[2])) : m === "Q" ? (a = d[1], i = d[2], c += xe(p2, h, d[1], d[2], d[3], d[4])) : m === "Z" && (c += ce(p2, h, u, l));
    [n, o] = m === "Z" ? [u, l] : d.slice(-2), [r2, s] = m === "C" ? [d[3], d[4]] : m === "S" ? [d[1], d[2]] : [n, o];
  }), c;
}, K = Sr;
var se = 1e-5;
var Ar = (t) => {
  let e = L(t), n = { ...U };
  return T(e, (o, r2, s, a) => {
    n.x = s, n.y = a;
    let i = X(o, n), m = i.length;
    return n.x1 = +i[m - 2], n.y1 = +i[m - 1], n.x2 = +i[m - 4] || n.x1, n.y2 = +i[m - 3] || n.y1, i;
  });
}, J = Ar;
var Cr = (t, e) => {
  let n = J(t), o = false, r2 = [], s = "M", a = 0, i = 0, [m, u] = n[0].slice(1), l = typeof e == "number", c = { x: m, y: u }, f = 0, g2 = c, p2 = 0;
  return !l || e < se ? c : (T(n, (h, y2, S, A) => {
    [s] = h, o = s === "M", r2 = o ? r2 : [S, A].concat(h.slice(1));
    if (o ? ([, m, u] = h, c = { x: m, y: u }, f = 0) : s === "L" ? (c = Le(r2[0], r2[1], r2[2], r2[3], e - p2), f = ce(r2[0], r2[1], r2[2], r2[3])) : s === "A" ? (c = mt(r2[0], r2[1], r2[2], r2[3], r2[4], r2[5], r2[6], r2[7], r2[8], e - p2), f = ve(r2[0], r2[1], r2[2], r2[3], r2[4], r2[5], r2[6], r2[7], r2[8])) : s === "C" ? (c = pt(r2[0], r2[1], r2[2], r2[3], r2[4], r2[5], r2[6], r2[7], e - p2), f = Pe(r2[0], r2[1], r2[2], r2[3], r2[4], r2[5], r2[6], r2[7])) : s === "Q" ? (c = gt(r2[0], r2[1], r2[2], r2[3], r2[4], r2[5], e - p2), f = xe(r2[0], r2[1], r2[2], r2[3], r2[4], r2[5])) : s === "Z" && (r2 = [S, A, m, u], c = { x: m, y: u }, f = ce(r2[0], r2[1], r2[2], r2[3])), [a, i] = r2.slice(-2), p2 < e) g2 = c;
    else return false;
    p2 += f;
  }), e > p2 - se ? { x: a, y: i } : g2);
}, me = Cr;
var Tr = (t, e) => {
  let n = L(t), o = n.slice(0), r2 = K(o), s = o.length - 1, a = 0, i = 0, m = n[0];
  if (s <= 0 || !e || !Number.isFinite(e)) return { segment: m, index: 0, length: i, lengthAtSegment: a };
  if (e >= r2) return o = n.slice(0, -1), a = K(o), i = r2 - a, m = n[s], { segment: m, index: s, length: i, lengthAtSegment: a };
  let u = [];
  for (; s > 0; ) m = o[s], o = o.slice(0, -1), a = K(o), i = r2 - a, r2 = a, u.push({ segment: m, index: s, length: i, lengthAtSegment: a }), s -= 1;
  return u.find(({ lengthAtSegment: l }) => l <= e);
}, de = Tr;
var Mr = (t, e) => {
  let n = L(t), o = J(n), r2 = K(o), s = (b) => {
    let P2 = b.x - e.x, C = b.y - e.y;
    return P2 * P2 + C * C;
  }, a = 8, i, m = { x: 0, y: 0 }, u = 0, l = 0, c = 1 / 0;
  for (let b = 0; b <= r2; b += a) i = me(o, b), u = s(i), u < c && (m = i, l = b, c = u);
  a /= 2;
  let f, g2, p2 = 0, h = 0, y2 = 0, S = 0;
  for (; a > 1e-6 && (p2 = l - a, f = me(o, p2), y2 = s(f), h = l + a, g2 = me(o, h), S = s(g2), p2 >= 0 && y2 < c ? (m = f, l = p2, c = y2) : h <= r2 && S < c ? (m = g2, l = h, c = S) : a /= 2, !(a < 1e-5)); ) ;
  let A = de(n, l), d = Math.sqrt(c);
  return { closest: m, distance: d, segment: A };
}, Y = Mr;
var Lr = (t, e) => Y(t, e).closest, dt = Lr;
var vr = (t, e, n, o, r2, s, a, i) => 3 * ((i - e) * (n + r2) - (a - t) * (o + s) + o * (t - r2) - n * (e - s) + i * (r2 + t / 3) - a * (s + e / 3)) / 20, Nr = (t) => {
  let e = 0, n = 0, o = 0;
  return ae(t).map((r2) => {
    switch (r2[0]) {
      case "M":
        return [, e, n] = r2, 0;
      default:
        return o = vr(e, n, r2[1], r2[2], r2[3], r2[4], r2[5], r2[6]), [e, n] = r2.slice(-2), o;
    }
  }).reduce((r2, s) => r2 + s, 0);
}, Oe = Nr;
var wr = (t) => Oe(ae(t)) >= 0, yt = wr;
var zr = (t, e) => de(t, e).segment, Pt = zr;
var Vr = (t, e) => Y(t, e).segment, xt = Vr;
var Rr = (t) => Array.isArray(t) && t.every((e) => {
  let n = e[0].toLowerCase();
  return Z[n] === e.length - 1 && "achlmqstvz".includes(n) && e.slice(1).every(Number.isFinite);
}) && t.length > 0, ee = Rr;
var kr = (t) => ee(t) && t.every(([e]) => e === e.toUpperCase()), Ie = kr;
var qr = (t) => Ie(t) && t.every(([e]) => "ACLMQZ".includes(e)), Be = qr;
var Qr = (t) => Be(t) && t.every(([e]) => "MC".includes(e)), St = Qr;
var Dr = (t, e) => {
  let { distance: n } = Y(t, e);
  return Math.abs(n) < se;
}, At = Dr;
var Er = (t) => ee(t) && t.slice(1).every(([e]) => e === e.toLowerCase()), Ct = Er;
var Or = (t) => {
  if (typeof t != "string" || !t.length) return false;
  let e = new F(t);
  for (G(e); e.index < e.max && !e.err.length; ) ge(e);
  return !e.err.length && "mM".includes(e.segments[0][0]);
}, $e = Or;
var Ir = { line: ["x1", "y1", "x2", "y2"], circle: ["cx", "cy", "r"], ellipse: ["cx", "cy", "rx", "ry"], rect: ["width", "height", "x", "y", "rx", "ry"], polygon: ["points"], polyline: ["points"], glyph: ["d"] }, te = Ir;
var Br = (t) => t != null && typeof t == "object" && t.nodeType === 1, Xe = Br;
var $r = (t) => {
  let { x1: e, y1: n, x2: o, y2: r2 } = t;
  return [e, n, o, r2] = [e, n, o, r2].map((s) => +s), [["M", e, n], ["L", o, r2]];
}, jr = (t) => {
  let e = [], n = (t.points || "").trim().split(/[\s|,]/).map((r2) => +r2), o = 0;
  for (; o < n.length; ) e.push([o ? "L" : "M", n[o], n[o + 1]]), o += 2;
  return t.type === "polygon" ? [...e, ["z"]] : e;
}, Hr = (t) => {
  let { cx: e, cy: n, r: o } = t;
  return [e, n, o] = [e, n, o].map((r2) => +r2), [["M", e - o, n], ["a", o, o, 0, 1, 0, 2 * o, 0], ["a", o, o, 0, 1, 0, -2 * o, 0]];
}, Zr = (t) => {
  let { cx: e, cy: n } = t, o = t.rx || 0, r2 = t.ry || o;
  return [e, n, o, r2] = [e, n, o, r2].map((s) => +s), [["M", e - o, n], ["a", o, r2, 0, 1, 0, 2 * o, 0], ["a", o, r2, 0, 1, 0, -2 * o, 0]];
}, Gr = (t) => {
  let e = +t.x || 0, n = +t.y || 0, o = +t.width, r2 = +t.height, s = +(t.rx || 0), a = +(t.ry || s);
  if (s || a) {
    s * 2 > o && (s -= (s * 2 - o) / 2);
    return a * 2 > r2 && (a -= (a * 2 - r2) / 2), [["M", e + s, n], ["h", o - s * 2], ["s", s, 0, s, a], ["v", r2 - a * 2], ["s", 0, a, -s, a], ["h", -o + s * 2], ["s", -s, 0, -s, -a], ["v", -r2 + a * 2], ["s", 0, -a, s, -a]];
  }
  return [["M", e, n], ["h", o], ["v", r2], ["H", e], ["Z"]];
}, _r = (t) => {
  let e = Object.keys(te), n = Xe(t), o = n ? t.tagName : null;
  if (o && [...e, "path"].every((m) => o !== m)) throw TypeError(`${R}: "${o}" is not SVGElement`);
  let r2 = n ? o : t.type, s = te[r2], a = { type: r2 };
  n ? s.forEach((m) => {
    a[m] = t.getAttribute(m);
  }) : Object.assign(a, t);
  let i = [];
  return r2 === "circle" ? i = Hr(a) : r2 === "ellipse" ? i = Zr(a) : ["polyline", "polygon"].includes(r2) ? i = jr(a) : r2 === "rect" ? i = Gr(a) : r2 === "line" ? i = $r(a) : ["glyph", "path"].includes(r2) && (i = L(n ? t.getAttribute("d") || "" : t.d || "")), ee(i) && i.length ? i : false;
}, je = _r;
var Ur = (t, e, n) => {
  let o = n || document, r2 = Object.keys(te), s = Xe(t), a = s ? t.tagName : null;
  if (a === "path") throw TypeError(`${R}: "${a}" is already SVGPathElement`);
  if (a && r2.every((p2) => a !== p2)) throw TypeError(`${R}: "${a}" is not SVGElement`);
  let i = o.createElementNS("http://www.w3.org/2000/svg", "path"), m = s ? a : t.type, u = te[m], l = { type: m }, c = O.round, f = je(t), g2 = f && f.length ? Ce(f, c) : "";
  return s ? (u.forEach((p2) => {
    l[p2] = t.getAttribute(p2);
  }), Object.values(t.attributes).forEach(({ name: p2, value: h }) => {
    u.includes(p2) || i.setAttribute(p2, h);
  })) : (Object.assign(l, t), Object.keys(l).forEach((p2) => {
    !u.includes(p2) && p2 !== "type" && i.setAttribute(p2.replace(/[A-Z]/g, (h) => `-${h.toLowerCase()}`), l[p2]);
  })), $e(g2) ? (i.setAttribute("d", g2), e && s && (t.before(i, t), t.remove()), i) : false;
}, Tt = Ur;
var Fr = (t, e, n, o) => {
  let [r2] = t, { round: s } = O, a = typeof s == "number" ? s : 4, i = e.slice(1), { x1: m, y1: u, x2: l, y2: c, x: f, y: g2 } = n, [p2, h] = i.slice(-2), y2 = t;
  if ("TQ".includes(r2) || (n.qx = null, n.qy = null), r2 === "L") {
    if (M(f, a) === M(p2, a)) return ["V", h];
    if (M(g2, a) === M(h, a)) return ["H", p2];
  } else if (r2 === "C") {
    let [S, A] = i;
    if (n.x1 = S, n.y1 = A, "CS".includes(o) && (M(S, a) === M(m * 2 - l, a) && M(A, a) === M(u * 2 - c, a) || M(m, a) === M(l * 2 - f, a) && M(u, a) === M(c * 2 - g2, a))) return ["S", i[2], i[3], i[4], i[5]];
  } else if (r2 === "Q") {
    let [S, A] = i;
    if (n.qx = S, n.qy = A, "QT".includes(o) && M(S, a) === M(m * 2 - l, a) && M(A, a) === M(u * 2 - c, a)) return ["T", i[2], i[3]];
  }
  return y2;
}, He = Fr;
var Kr = (t, e) => {
  let n = t.slice(1).map((o) => M(o, e));
  return [t[0]].concat(n);
}, ie = Kr;
var Jr = (t, e) => {
  let n = oe(t), o = typeof e == "number" && e >= 0 ? e : 2, r2 = { ...U }, s = [], a = "M", i = "Z";
  return T(n, (m, u, l, c) => {
    r2.x = l, r2.y = c;
    let f = X(m, r2), g2 = m;
    if ([a] = m, s[u] = a, u) {
      i = s[u - 1];
      let h = He(m, f, r2, i), y2 = ie(h, o), S = y2.join(""), A = he(h, u, l, c), d = ie(A, o), b = d.join("");
      g2 = S.length < b.length ? y2 : d;
    }
    let p2 = f.length;
    return r2.x1 = +f[p2 - 2], r2.y1 = +f[p2 - 1], r2.x2 = +f[p2 - 4] || r2.x1, r2.y2 = +f[p2 - 3] || r2.y1, g2;
  });
}, Ye = Jr;
var Wr = (t) => {
  let e = oe(t), n = J(e), o = e.length, r2 = e[o - 1][0] === "Z", s = T(e, (a, i) => {
    let m = n[i], u = i && e[i - 1], l = u && u[0], c = e[i + 1], f = c && c[0], [g2] = a, [p2, h] = n[i ? i - 1 : o - 1].slice(-2), y2 = a;
    switch (g2) {
      case "M":
        y2 = r2 ? ["Z"] : [g2, p2, h];
        break;
      case "A":
        y2 = [g2, a[1], a[2], a[3], a[4], a[5] === 1 ? 0 : 1, p2, h];
        break;
      case "C":
        c && f === "S" ? y2 = ["S", a[1], a[2], p2, h] : y2 = [g2, a[3], a[4], a[1], a[2], p2, h];
        break;
      case "S":
        l && "CS".includes(l) && (!c || f !== "S") ? y2 = ["C", m[3], m[4], m[1], m[2], p2, h] : y2 = [g2, m[1], m[2], p2, h];
        break;
      case "Q":
        c && f === "T" ? y2 = ["T", p2, h] : y2 = [g2, a[1], a[2], p2, h];
        break;
      case "T":
        l && "QT".includes(l) && (!c || f !== "T") ? y2 = ["Q", m[1], m[2], p2, h] : y2 = [g2, p2, h];
        break;
      case "Z":
        y2 = ["M", p2, h];
        break;
      case "H":
        y2 = [g2, p2];
        break;
      case "V":
        y2 = [g2, h];
        break;
      default:
        y2 = [g2].concat(a.slice(1, -2), p2, h);
    }
    return y2;
  });
  return r2 ? s.reverse() : [s[0]].concat(s.slice(1).reverse());
}, Te = Wr;
var Xr = (t) => {
  let e = [], n, o = -1, r2 = 0, s = 0, a = 0, i = 0, m = { ...U };
  return t.forEach((u) => {
    let [l] = u, c = l.toUpperCase(), f = l.toLowerCase(), g2 = l === f, p2 = u.slice(1);
    c === "M" ? (o += 1, [r2, s] = p2, r2 += g2 ? m.x : 0, s += g2 ? m.y : 0, a = r2, i = s, n = [g2 ? [c, a, i] : u]) : (c === "Z" ? (r2 = a, s = i) : c === "H" ? ([, r2] = u, r2 += g2 ? m.x : 0) : c === "V" ? ([, s] = u, s += g2 ? m.y : 0) : ([r2, s] = u.slice(-2), r2 += g2 ? m.x : 0, s += g2 ? m.y : 0), n.push(u)), m.x = r2, m.y = s, e[o] = n;
  }), e;
}, et = Xr;
var en = (t) => {
  let e = new y(), { origin: n } = t, [o, r2] = n, { translate: s } = t, { rotate: a } = t, { skew: i } = t, { scale: m } = t;
  return Array.isArray(s) && s.length >= 2 && s.every((u) => !Number.isNaN(+u)) && s.some((u) => u !== 0) ? e = e.translate(...s) : typeof s == "number" && !Number.isNaN(s) && (e = e.translate(s)), (a || i || m) && (e = e.translate(o, r2), Array.isArray(a) && a.length >= 2 && a.every((u) => !Number.isNaN(+u)) && a.some((u) => u !== 0) ? e = e.rotate(...a) : typeof a == "number" && !Number.isNaN(a) && (e = e.rotate(a)), Array.isArray(i) && i.length === 2 && i.every((u) => !Number.isNaN(+u)) && i.some((u) => u !== 0) ? (e = i[0] ? e.skewX(i[0]) : e, e = i[1] ? e.skewY(i[1]) : e) : typeof i == "number" && !Number.isNaN(i) && (e = e.skewX(i)), Array.isArray(m) && m.length >= 2 && m.every((u) => !Number.isNaN(+u)) && m.some((u) => u !== 1) ? e = e.scale(...m) : typeof m == "number" && !Number.isNaN(m) && (e = e.scale(m)), e = e.translate(-o, -r2)), e;
}, Ze = en;
var rn = (t, e) => {
  let n = y.Translate(e[0], e[1], e[2]);
  return [, , , n.m44] = e, n = t.multiply(n), [n.m41, n.m42, n.m43, n.m44];
}, nn = (t, e, n) => {
  let [o, r2, s] = n, [a, i, m] = rn(t, [e[0], e[1], 0, 1]), u = a - o, l = i - r2, c = m - s;
  return [u * (Math.abs(s) / Math.abs(c) || 1) + o, l * (Math.abs(s) / Math.abs(c) || 1) + r2];
}, Me = nn;
var on = (t, e) => {
  let n = 0, o = 0, r2 = 0, s = 0, a = 0, i = 0, m = "M", u = L(t), l = e && Object.keys(e);
  if (!e || l && !l.length) return u.slice(0);
  e.origin || Object.assign(e, { origin: O.origin });
  let c = e.origin, f = Ze(e);
  return f.isIdentity ? u.slice(0) : T(u, (g2, p2, h, y2) => {
    [m] = g2;
    let S = m.toUpperCase(), d = S !== m ? _(g2, p2, h, y2) : g2.slice(0), b = S === "A" ? ["C"].concat(be(h, y2, d[1], d[2], d[3], d[4], d[5], d[6], d[7])) : S === "V" ? ["L", h, d[1]] : S === "H" ? ["L", d[1], y2] : d;
    m = b[0];
    let P2 = m === "C" && b.length > 7, C = P2 ? b.slice(0, 7) : b.slice(0);
    if (P2 && (u.splice(p2 + 1, 0, ["C"].concat(b.slice(7))), b = C), m === "L") {
      [r2, s] = Me(f, [b[1], b[2]], c);
      n !== r2 && o !== s ? b = ["L", r2, s] : o === s ? b = ["H", r2] : n === r2 && (b = ["V", s]);
    } else for (a = 1, i = b.length; a < i; a += 2) [r2, s] = Me(f, [+b[a], +b[a + 1]], c), b[a] = r2, b[a + 1] = s;
    return n = r2, o = s, b;
  });
}, tt = on;
var an = (t) => {
  let e = t.slice(1).map((n, o, r2) => o ? r2[o - 1].slice(-2).concat(n.slice(1)) : t[0].slice(1).concat(n.slice(1))).map((n) => n.map((o, r2) => n[n.length - r2 - 2 * (1 - r2 % 2)])).reverse();
  return [["M"].concat(e[0].slice(0, 2))].concat(e.map((n) => ["C"].concat(n.slice(2))));
}, Mt = an;
var sn = (t, e) => {
  let { round: n } = O;
  n = e === "off" || typeof e == "number" && e >= 0 ? e : typeof n == "number" && n >= 0 ? n : "off";
  return n === "off" ? t.slice(0) : T(t, (o) => ie(o, n));
}, Lt = sn;
var mn = (t, e = 0.5) => {
  let n = e, o = t.slice(0, 2), r2 = t.slice(2, 4), s = t.slice(4, 6), a = t.slice(6, 8), i = E(o, r2, n), m = E(r2, s, n), u = E(s, a, n), l = E(i, m, n), c = E(m, u, n), f = E(l, c, n);
  return [["C", i[0], i[1], l[0], l[1], f[0], f[1]], ["C", c[0], c[1], u[0], u[1], a[0], a[1]]];
}, vt = mn;
var Nt = class {
  constructor(e, n) {
    let o = n || {}, r2 = typeof e > "u";
    if (r2 || !e.length) throw TypeError(`${R}: "pathValue" is ${r2 ? "undefined" : "empty"}`);
    this.segments = L(e);
    let { round: s, origin: a } = o, i;
    Number.isInteger(s) || s === "off" ? i = s : i = O.round;
    let m = O.origin;
    if (Array.isArray(a) && a.length >= 2) {
      let [u, l, c] = a.map(Number);
      m = [Number.isNaN(u) ? 0 : u, Number.isNaN(l) ? 0 : l, Number.isNaN(c) ? 0 : c];
    }
    return this.round = i, this.origin = m, this;
  }
  get bbox() {
    return We(this.segments);
  }
  get length() {
    return K(this.segments);
  }
  getBBox() {
    return this.bbox;
  }
  getTotalLength() {
    return this.length;
  }
  getPointAtLength(e) {
    return me(this.segments, e);
  }
  toAbsolute() {
    let { segments: e } = this;
    return this.segments = oe(e), this;
  }
  toRelative() {
    let { segments: e } = this;
    return this.segments = Je(e), this;
  }
  toCurve() {
    let { segments: e } = this;
    return this.segments = ae(e), this;
  }
  reverse(e) {
    let { segments: n } = this, o = et(n), r2 = o.length > 1 ? o : false, s = r2 ? r2.map((i, m) => e ? m ? Te(i) : i.slice(0) : Te(i)) : n.slice(0), a = [];
    return r2 ? a = s.flat(1) : a = e ? n : Te(n), this.segments = a.slice(0), this;
  }
  normalize() {
    let { segments: e } = this;
    return this.segments = J(e), this;
  }
  optimize() {
    let { segments: e } = this, n = this.round === "off" ? 2 : this.round;
    return this.segments = Ye(e, n), this;
  }
  transform(e) {
    if (!e || typeof e != "object" || typeof e == "object" && !["translate", "rotate", "skew", "scale"].some((m) => m in e)) return this;
    let { segments: n, origin: [o, r2, s] } = this, a = {};
    for (let [m, u] of Object.entries(e)) {
      m === "skew" && Array.isArray(u) || (m === "rotate" || m === "translate" || m === "origin" || m === "scale") && Array.isArray(u) ? a[m] = u.map(Number) : m !== "origin" && typeof Number(u) == "number" && (a[m] = Number(u));
    }
    let { origin: i } = a;
    if (Array.isArray(i) && i.length >= 2) {
      let [m, u, l] = i.map(Number);
      a.origin = [Number.isNaN(m) ? o : m, Number.isNaN(u) ? r2 : u, l || s];
    } else a.origin = [o, r2, s];
    return this.segments = tt(n, a), this;
  }
  flipX() {
    let { cx: e, cy: n } = this.bbox;
    return this.transform({ rotate: [0, 180, 0], origin: [e, n, 0] }), this;
  }
  flipY() {
    let { cx: e, cy: n } = this.bbox;
    return this.transform({ rotate: [180, 0, 0], origin: [e, n, 0] }), this;
  }
  toString() {
    return Ce(this.segments, this.round);
  }
  dispose() {
    Object.keys(this).forEach((e) => delete this[e]);
  }
  static get options() {
    return O;
  }
  static get CSSMatrix() {
    return y;
  }
  static get arcTools() {
    return ut;
  }
  static get bezierTools() {
    return ct;
  }
  static get cubicTools() {
    return ft;
  }
  static get lineTools() {
    return ot;
  }
  static get polygonTools() {
    return bt;
  }
  static get quadTools() {
    return ht;
  }
  static get pathToAbsolute() {
    return oe;
  }
  static get pathToRelative() {
    return Je;
  }
  static get pathToCurve() {
    return ae;
  }
  static get pathToString() {
    return Ce;
  }
  static get distanceSquareRoot() {
    return re;
  }
  static get midPoint() {
    return E;
  }
  static get rotateVector() {
    return ne;
  }
  static get roundTo() {
    return M;
  }
  static get parsePathString() {
    return L;
  }
  static get finalizeSegment() {
    return Se;
  }
  static get invalidPathValue() {
    return $;
  }
  static get isArcCommand() {
    return qe;
  }
  static get isDigit() {
    return B;
  }
  static get isDigitStart() {
    return ke;
  }
  static get isMoveCommand() {
    return Qe;
  }
  static get isPathCommand() {
    return Re;
  }
  static get isSpace() {
    return Ve;
  }
  static get paramsCount() {
    return Z;
  }
  static get paramsParser() {
    return U;
  }
  static get pathParser() {
    return F;
  }
  static get scanFlag() {
    return we;
  }
  static get scanParam() {
    return ze;
  }
  static get scanSegment() {
    return ge;
  }
  static get skipSpaces() {
    return G;
  }
  static get distanceEpsilon() {
    return se;
  }
  static get getClosestPoint() {
    return dt;
  }
  static get getDrawDirection() {
    return yt;
  }
  static get getPathArea() {
    return Oe;
  }
  static get getPathBBox() {
    return We;
  }
  static get getPointAtLength() {
    return me;
  }
  static get getPropertiesAtLength() {
    return de;
  }
  static get getPropertiesAtPoint() {
    return Y;
  }
  static get getSegmentAtLength() {
    return Pt;
  }
  static get getSegmentOfPoint() {
    return xt;
  }
  static get getTotalLength() {
    return K;
  }
  static get isAbsoluteArray() {
    return Ie;
  }
  static get isCurveArray() {
    return St;
  }
  static get isNormalizedArray() {
    return Be;
  }
  static get isPathArray() {
    return ee;
  }
  static get isPointInStroke() {
    return At;
  }
  static get isRelativeArray() {
    return Ct;
  }
  static get isValidPath() {
    return $e;
  }
  static get shapeParams() {
    return te;
  }
  static get shapeToPath() {
    return Tt;
  }
  static get shapeToPathArray() {
    return je;
  }
  static get absolutizeSegment() {
    return _;
  }
  static get arcToCubic() {
    return be;
  }
  static get getSVGMatrix() {
    return Ze;
  }
  static get iterate() {
    return T;
  }
  static get lineToCubic() {
    return Ae;
  }
  static get normalizePath() {
    return J;
  }
  static get normalizeSegment() {
    return X;
  }
  static get optimizePath() {
    return Ye;
  }
  static get projection2d() {
    return Me;
  }
  static get quadToCubic() {
    return De;
  }
  static get relativizeSegment() {
    return he;
  }
  static get reverseCurve() {
    return Mt;
  }
  static get reversePath() {
    return Te;
  }
  static get roundPath() {
    return Lt;
  }
  static get roundSegment() {
    return ie;
  }
  static get segmentToCubic() {
    return Ee;
  }
  static get shortenSegment() {
    return He;
  }
  static get splitCubic() {
    return vt;
  }
  static get splitPath() {
    return et;
  }
  static get transformPath() {
    return tt;
  }
}, It = Nt;
var Ci = It;
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var lodash$1 = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var lodash = lodash$1.exports;
var hasRequiredLodash;
function requireLodash() {
  if (hasRequiredLodash) return lodash$1.exports;
  hasRequiredLodash = 1;
  (function(module, exports) {
    (function() {
      var undefined$1;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "Ç": "C",
        "ç": "c",
        "Ð": "D",
        "ð": "d",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "Ñ": "N",
        "ñ": "n",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "Ý": "Y",
        "ý": "y",
        "ÿ": "y",
        "Æ": "Ae",
        "æ": "ae",
        "Þ": "Th",
        "þ": "th",
        "ß": "ss",
        // Latin Extended-A block.
        "Ā": "A",
        "Ă": "A",
        "Ą": "A",
        "ā": "a",
        "ă": "a",
        "ą": "a",
        "Ć": "C",
        "Ĉ": "C",
        "Ċ": "C",
        "Č": "C",
        "ć": "c",
        "ĉ": "c",
        "ċ": "c",
        "č": "c",
        "Ď": "D",
        "Đ": "D",
        "ď": "d",
        "đ": "d",
        "Ē": "E",
        "Ĕ": "E",
        "Ė": "E",
        "Ę": "E",
        "Ě": "E",
        "ē": "e",
        "ĕ": "e",
        "ė": "e",
        "ę": "e",
        "ě": "e",
        "Ĝ": "G",
        "Ğ": "G",
        "Ġ": "G",
        "Ģ": "G",
        "ĝ": "g",
        "ğ": "g",
        "ġ": "g",
        "ģ": "g",
        "Ĥ": "H",
        "Ħ": "H",
        "ĥ": "h",
        "ħ": "h",
        "Ĩ": "I",
        "Ī": "I",
        "Ĭ": "I",
        "Į": "I",
        "İ": "I",
        "ĩ": "i",
        "ī": "i",
        "ĭ": "i",
        "į": "i",
        "ı": "i",
        "Ĵ": "J",
        "ĵ": "j",
        "Ķ": "K",
        "ķ": "k",
        "ĸ": "k",
        "Ĺ": "L",
        "Ļ": "L",
        "Ľ": "L",
        "Ŀ": "L",
        "Ł": "L",
        "ĺ": "l",
        "ļ": "l",
        "ľ": "l",
        "ŀ": "l",
        "ł": "l",
        "Ń": "N",
        "Ņ": "N",
        "Ň": "N",
        "Ŋ": "N",
        "ń": "n",
        "ņ": "n",
        "ň": "n",
        "ŋ": "n",
        "Ō": "O",
        "Ŏ": "O",
        "Ő": "O",
        "ō": "o",
        "ŏ": "o",
        "ő": "o",
        "Ŕ": "R",
        "Ŗ": "R",
        "Ř": "R",
        "ŕ": "r",
        "ŗ": "r",
        "ř": "r",
        "Ś": "S",
        "Ŝ": "S",
        "Ş": "S",
        "Š": "S",
        "ś": "s",
        "ŝ": "s",
        "ş": "s",
        "š": "s",
        "Ţ": "T",
        "Ť": "T",
        "Ŧ": "T",
        "ţ": "t",
        "ť": "t",
        "ŧ": "t",
        "Ũ": "U",
        "Ū": "U",
        "Ŭ": "U",
        "Ů": "U",
        "Ű": "U",
        "Ų": "U",
        "ũ": "u",
        "ū": "u",
        "ŭ": "u",
        "ů": "u",
        "ű": "u",
        "ų": "u",
        "Ŵ": "W",
        "ŵ": "w",
        "Ŷ": "Y",
        "ŷ": "y",
        "Ÿ": "Y",
        "Ź": "Z",
        "Ż": "Z",
        "Ž": "Z",
        "ź": "z",
        "ż": "z",
        "ž": "z",
        "Ĳ": "IJ",
        "ĳ": "ij",
        "Œ": "Oe",
        "œ": "oe",
        "ŉ": "'n",
        "ſ": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = exports && !exports.nodeType && exports;
      var freeModule = freeExports && true && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          var value = array[index2];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (iteratee(array[index2], index2, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (!predicate(array[index2], index2, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index2 < length) {
          var value = array[index2];
          if (predicate(value, index2, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (comparator(value, array[index2])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index2 = -1, length = values.length, offset = array.length;
        while (++index2 < length) {
          array[offset + index2] = values[index2];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index2 = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index2];
        }
        while (++index2 < length) {
          accumulator = iteratee(accumulator, array[index2], index2, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index2-- : ++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (comparator(array[index2], value)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined$1 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined$1 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index2, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index2, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index2 = -1, length = array.length;
        while (++index2 < length) {
          var current = iteratee(array[index2]);
          if (current !== undefined$1) {
            result = result === undefined$1 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index2 = -1, length = strSymbols.length;
        while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index2 = strSymbols.length;
        while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined$1 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index2 = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index2] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index2 = -1, length = array.length, resIndex = 0, result = [];
        while (++index2 < length) {
          var value = array[index2];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index2] = PLACEHOLDER;
            result[resIndex++] = index2;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index2 = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index2] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index2 = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index2] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index2 = fromIndex + 1;
        while (index2--) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return index2;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index2 = string.length;
        while (index2-- && reWhitespace.test(string.charAt(index2))) {
        }
        return index2;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root : _2.defaults(root.Object(), context, _2.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined$1;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap && new WeakMap();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
        function lodash2(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = /* @__PURE__ */ function() {
          function object() {
          }
          return function(proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined$1;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined$1;
        }
        lodash2.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash2
          }
        };
        lodash2.prototype = baseLodash.prototype;
        lodash2.prototype.constructor = lodash2;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index2 = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index2 += dir;
              var iterIndex = -1, value = array[index2];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined$1 : result2;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined$1 : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data = this.__data__, index2 = assocIndexOf(data, key);
          if (index2 < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index2 == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index2, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__, index2 = assocIndexOf(data, key);
          return index2 < 0 ? undefined$1 : data[index2][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index2 = assocIndexOf(data, key);
          if (index2 < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index2][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index2 = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index2 < length) {
            this.add(values2[index2]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined$1;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined$1 && !eq(object[key], value) || value === undefined$1 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined$1 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index2 = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index2 < length) {
            result2[index2] = skip ? undefined$1 : get(object, paths[index2]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined$1) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined$1) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined$1) {
            return result2;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined$1 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined$1 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout(function() {
            func.apply(undefined$1, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index2 = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index2 < length) {
              var value = array[index2], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index2, collection2) {
            result2 = !!predicate(value, index2, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index2 = -1, length = array.length;
          while (++index2 < length) {
            var value = array[index2], current = iteratee2(value);
            if (current != null && (computed === undefined$1 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined$1 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index2, collection2) {
            if (predicate(value, index2, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index2 = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index2 < length) {
            var value = array[index2];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path) {
          path = castPath(path, object);
          var index2 = 0, length = path.length;
          while (object != null && index2 < length) {
            object = object[toKey(path[index2++])];
          }
          return index2 && index2 == length ? object : undefined$1;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined$1 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
          }
          array = arrays[0];
          var index2 = -1, seen = caches[0];
          outer:
            while (++index2 < length && result2.length < maxLength) {
              var value = array[index2], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined$1 : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index2 = matchData.length, length = index2, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index2--) {
            var data = matchData[index2];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index2 < length) {
            data = matchData[index2];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined$1 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index2 = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index2] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get(object, path);
            return objValue === undefined$1 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined$1;
              if (newValue === undefined$1) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined$1;
          var isCommon = newValue === undefined$1;
          if (isCommon) {
            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined$1;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index2 = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index2, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn(object, path);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index2 = -1, length = paths.length, result2 = {};
          while (++index2 < length) {
            var path = paths[index2], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index2 = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index2 < length) {
            var fromIndex = 0, value = values2[index2], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index2 = indexes[length];
            if (length == lastIndex || index2 !== previous) {
              var previous = index2;
              if (isIndex(index2)) {
                splice.call(array, index2, 1);
              } else {
                baseUnset(array, index2);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index2 = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index2] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path = castPath(path, object);
          var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index2 < length) {
            var key = toKey(path[index2]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index2 != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
              if (newValue === undefined$1) {
                newValue = isObject(objValue) ? objValue : isIndex(path[index2 + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index2 = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index2 < length) {
            result2[index2] = array[index2 + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index2, collection2) {
            result2 = predicate(value, index2, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index2 = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index2 < length) {
            var value = array[index2], computed = iteratee2 ? iteratee2(value) : value;
            if (!index2 || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -Infinity ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index2 = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index2 < length) {
              var value = array[index2], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index2 = fromRight ? length : -1;
          while ((fromRight ? index2-- : ++index2 < length) && predicate(array[index2], index2, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index2, fromRight ? index2 + 1 : length) : baseSlice(array, fromRight ? index2 + 1 : 0, fromRight ? length : index2);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index2 = -1, result2 = Array2(length);
          while (++index2 < length) {
            var array = arrays[index2], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index2) {
                result2[index2] = baseDifference(result2[index2] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index2 = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index2 < length) {
            var value = index2 < valsLength ? values2[index2] : undefined$1;
            assignFunc(result2, props[index2], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString2(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined$1 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array(result2).set(new Uint8Array(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index2 = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index2 < length) {
            var result2 = compareAscending(objCriteria[index2], othCriteria[index2]);
            if (result2) {
              if (index2 >= ordersLength) {
                return result2;
              }
              var order = orders[index2];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index2 = -1, length = source.length;
          array || (array = Array2(length));
          while (++index2 < length) {
            array[index2] = source[index2];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index2 = -1, length = props.length;
          while (++index2 < length) {
            var key = props[index2];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
            if (newValue === undefined$1) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined$1 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index2 < length) {
              var source = sources[index2];
              if (source) {
                assigner(object, source, index2, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index2 = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index2-- : ++index2 < length) {
              if (iteratee2(iterable[index2], index2, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index2 = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index2];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString2(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index2 = length, placeholder = getHolder(wrapper);
            while (index2--) {
              args[index2] = arguments[index2];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined$1,
                args,
                holders,
                undefined$1,
                undefined$1,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index2 = findIndexFunc(collection, predicate, fromIndex);
            return index2 > -1 ? iterable[iteratee2 ? collection[index2] : index2] : undefined$1;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index2 = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index2--) {
              var func = funcs[index2];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index2 = wrapper ? index2 : length;
            while (++index2 < length) {
              func = funcs[index2];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
              }
              var index3 = 0, result2 = length ? funcs[index3].apply(this, args) : value;
              while (++index3 < length) {
                result2 = funcs[index3].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index2 = length;
            while (index2--) {
              args[index2] = arguments[index2];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined$1 && other === undefined$1) {
              return defaultValue;
            }
            if (value !== undefined$1) {
              result2 = value;
            }
            if (other !== undefined$1) {
              if (result2 === undefined$1) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined$1 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined$1;
            }
            start = toFinite(start);
            if (end === undefined$1) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= -4;
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined$1, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString2(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString2(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= -97;
            partials = holders = undefined$1;
          }
          ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined$1 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined$1;
          }
          var data = isBindKey ? undefined$1 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= -25;
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined$1, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined$1 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined$1 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index2 = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
          stack.set(array, other);
          stack.set(other, array);
          while (++index2 < arrLength) {
            var arrValue = array[index2], othValue = other[index2];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
            }
            if (compared !== undefined$1) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index2 = objLength;
          while (index2--) {
            var key = objProps[index2];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index2 < objLength) {
            key = objProps[index2];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined$1, flatten), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash2, "placeholder") ? lodash2 : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash2.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map2, key) {
          var data = map2.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined$1;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined$1;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index2 = -1, length = transforms.length;
          while (++index2 < length) {
            var data = transforms[index2], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index2 = -1, length = path.length, result2 = false;
          while (++index2 < length) {
            var key = toKey(path[index2]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index2 != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index2, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index2;
          if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
            return eq(object[index2], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash2[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index2 < length) {
              array[index2] = args[start + index2];
            }
            index2 = -1;
            var otherArgs = Array2(start + 1);
            while (++index2 < start) {
              otherArgs[index2] = args[index2];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index2 = indexes[length];
            array[length] = isIndex(index2, arrLength) ? oldArray[index2] : undefined$1;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined$1, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index2 = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined$1 ? length : size2;
          while (++index2 < size2) {
            var rand = baseRandom(index2, lastIndex), value = array[rand];
            array[rand] = array[index2];
            array[index2] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -Infinity ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$1) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index2 = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index2 < length) {
            result2[resIndex++] = baseSlice(array, index2, index2 += size2);
          }
          return result2;
        }
        function compact(array) {
          var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index2 < length) {
            var value = array[index2];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index2 = length;
          while (index2--) {
            args[index2 - 1] = arguments[index2];
          }
          return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined$1;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index2 < 0) {
            index2 = nativeMax(length + index2, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index2);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = length - 1;
          if (fromIndex !== undefined$1) {
            index2 = toInteger(fromIndex);
            index2 = fromIndex < 0 ? nativeMax(length + index2, 0) : nativeMin(index2, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index2, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index2 = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index2 < length) {
            var pair = pairs[index2];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined$1;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index2 < 0) {
            index2 = nativeMax(length + index2, 0);
          }
          return baseIndexOf(array, value, index2);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined$1;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined$1;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = length;
          if (fromIndex !== undefined$1) {
            index2 = toInteger(fromIndex);
            index2 = index2 < 0 ? nativeMax(length + index2, 0) : nativeMin(index2, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index2) : baseFindIndex(array, baseIsNaN, index2, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined$1;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$1, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index2) {
            return isIndex(index2, length) ? +index2 : index2;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index2 = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index2 < length) {
            var value = array[index2];
            if (predicate(value, index2, array)) {
              result2.push(value);
              indexes.push(index2);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined$1 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index2 = baseSortedIndex(array, value);
            if (index2 < length && eq(array[index2], value)) {
              return index2;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index2 = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index2], value)) {
              return index2;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index2) {
            return arrayMap(array, baseProperty(index2));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined$1, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash2(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined$1
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined$1);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined$1) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined$1;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined$1
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path, args) {
          var index2 = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index2] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined$1 : orders;
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined$1) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined$1 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined$1;
            }
            return result2;
          };
        }
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce2(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined$1;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined$1;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined$1;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined$1) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined$1;
          }
          function flush() {
            return timerId === undefined$1 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined$1) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout(timerId);
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined$1) {
              timerId = setTimeout(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index2 = -1, length = nativeMin(args.length, funcsLength);
            while (++index2 < length) {
              args[index2] = transforms[index2].call(this, args[index2]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined$1 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce2(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt2 = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(/* @__PURE__ */ function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          var result2 = customizer ? customizer(value, other) : undefined$1;
          return result2 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger2(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN(value) {
          return isNumber2(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber2(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger2(value) && value >= -9007199254740991 && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString(value) {
          return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined$1;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt2 = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -Infinity) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -9007199254740991, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString2(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at2 = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index2 = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index2 < length) {
            var source = sources[index2];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined$1 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined$1, customDefaultsMerge);
          return apply(mergeWith, undefined$1, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get(object, path, defaultValue) {
          var result2 = object == null ? undefined$1 : baseGet(object, path);
          return result2 === undefined$1 ? defaultValue : result2;
        }
        function has(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index2 = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined$1;
          }
          while (++index2 < length) {
            var value = object == null ? undefined$1 : object[toKey(path[index2])];
            if (value === undefined$1) {
              index2 = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index2, object2) {
            return iteratee2(accumulator, value, index2, object2);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined$1) {
            upper = lower;
            lower = undefined$1;
          }
          if (upper !== undefined$1) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined$1) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined$1;
          }
          if (floating === undefined$1) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined$1;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined$1;
            }
          }
          if (lower === undefined$1 && upper === undefined$1) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined$1) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index2) {
          word = word.toLowerCase();
          return result2 + (index2 ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString2(string).toLowerCase());
        }
        function deburr(string) {
          string = toString2(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString2(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString2(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString2(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString2(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined$1) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString2(string), n);
        }
        function replace() {
          var args = arguments, string = toString2(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined$1;
          }
          limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString2(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString2(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash2.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined$1;
          }
          string = toString2(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index2 = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index2, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index2 = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString2(value).toLowerCase();
        }
        function toUpper(value) {
          return toString2(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined$1)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined$1)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined$1)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString2(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined$1) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString2(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index2 = result2.lastIndexOf(separator);
            if (index2 > -1) {
              result2 = result2.slice(0, index2);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString2(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString2(string);
          pattern = guard ? undefined$1 : pattern;
          if (pattern === undefined$1) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined$1, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index2 = -1;
            while (++index2 < length) {
              var pair = pairs[index2];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined$1 : baseGet(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index2 = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index2 < n) {
            iteratee2(index2);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString2(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString2(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$1;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$1;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash2.after = after;
        lodash2.ary = ary;
        lodash2.assign = assign;
        lodash2.assignIn = assignIn;
        lodash2.assignInWith = assignInWith;
        lodash2.assignWith = assignWith;
        lodash2.at = at2;
        lodash2.before = before;
        lodash2.bind = bind;
        lodash2.bindAll = bindAll;
        lodash2.bindKey = bindKey;
        lodash2.castArray = castArray;
        lodash2.chain = chain;
        lodash2.chunk = chunk;
        lodash2.compact = compact;
        lodash2.concat = concat;
        lodash2.cond = cond;
        lodash2.conforms = conforms;
        lodash2.constant = constant;
        lodash2.countBy = countBy;
        lodash2.create = create;
        lodash2.curry = curry;
        lodash2.curryRight = curryRight;
        lodash2.debounce = debounce2;
        lodash2.defaults = defaults;
        lodash2.defaultsDeep = defaultsDeep;
        lodash2.defer = defer;
        lodash2.delay = delay;
        lodash2.difference = difference;
        lodash2.differenceBy = differenceBy;
        lodash2.differenceWith = differenceWith;
        lodash2.drop = drop;
        lodash2.dropRight = dropRight;
        lodash2.dropRightWhile = dropRightWhile;
        lodash2.dropWhile = dropWhile;
        lodash2.fill = fill;
        lodash2.filter = filter;
        lodash2.flatMap = flatMap;
        lodash2.flatMapDeep = flatMapDeep;
        lodash2.flatMapDepth = flatMapDepth;
        lodash2.flatten = flatten;
        lodash2.flattenDeep = flattenDeep;
        lodash2.flattenDepth = flattenDepth;
        lodash2.flip = flip;
        lodash2.flow = flow;
        lodash2.flowRight = flowRight;
        lodash2.fromPairs = fromPairs;
        lodash2.functions = functions;
        lodash2.functionsIn = functionsIn;
        lodash2.groupBy = groupBy;
        lodash2.initial = initial;
        lodash2.intersection = intersection;
        lodash2.intersectionBy = intersectionBy;
        lodash2.intersectionWith = intersectionWith;
        lodash2.invert = invert;
        lodash2.invertBy = invertBy;
        lodash2.invokeMap = invokeMap;
        lodash2.iteratee = iteratee;
        lodash2.keyBy = keyBy;
        lodash2.keys = keys;
        lodash2.keysIn = keysIn;
        lodash2.map = map;
        lodash2.mapKeys = mapKeys;
        lodash2.mapValues = mapValues;
        lodash2.matches = matches;
        lodash2.matchesProperty = matchesProperty;
        lodash2.memoize = memoize;
        lodash2.merge = merge;
        lodash2.mergeWith = mergeWith;
        lodash2.method = method;
        lodash2.methodOf = methodOf;
        lodash2.mixin = mixin;
        lodash2.negate = negate;
        lodash2.nthArg = nthArg;
        lodash2.omit = omit;
        lodash2.omitBy = omitBy;
        lodash2.once = once;
        lodash2.orderBy = orderBy;
        lodash2.over = over;
        lodash2.overArgs = overArgs;
        lodash2.overEvery = overEvery;
        lodash2.overSome = overSome;
        lodash2.partial = partial;
        lodash2.partialRight = partialRight;
        lodash2.partition = partition;
        lodash2.pick = pick;
        lodash2.pickBy = pickBy;
        lodash2.property = property;
        lodash2.propertyOf = propertyOf;
        lodash2.pull = pull;
        lodash2.pullAll = pullAll;
        lodash2.pullAllBy = pullAllBy;
        lodash2.pullAllWith = pullAllWith;
        lodash2.pullAt = pullAt;
        lodash2.range = range;
        lodash2.rangeRight = rangeRight;
        lodash2.rearg = rearg;
        lodash2.reject = reject;
        lodash2.remove = remove;
        lodash2.rest = rest;
        lodash2.reverse = reverse;
        lodash2.sampleSize = sampleSize;
        lodash2.set = set;
        lodash2.setWith = setWith;
        lodash2.shuffle = shuffle;
        lodash2.slice = slice;
        lodash2.sortBy = sortBy;
        lodash2.sortedUniq = sortedUniq;
        lodash2.sortedUniqBy = sortedUniqBy;
        lodash2.split = split;
        lodash2.spread = spread;
        lodash2.tail = tail;
        lodash2.take = take;
        lodash2.takeRight = takeRight;
        lodash2.takeRightWhile = takeRightWhile;
        lodash2.takeWhile = takeWhile;
        lodash2.tap = tap;
        lodash2.throttle = throttle;
        lodash2.thru = thru;
        lodash2.toArray = toArray;
        lodash2.toPairs = toPairs;
        lodash2.toPairsIn = toPairsIn;
        lodash2.toPath = toPath;
        lodash2.toPlainObject = toPlainObject;
        lodash2.transform = transform;
        lodash2.unary = unary;
        lodash2.union = union;
        lodash2.unionBy = unionBy;
        lodash2.unionWith = unionWith;
        lodash2.uniq = uniq;
        lodash2.uniqBy = uniqBy;
        lodash2.uniqWith = uniqWith;
        lodash2.unset = unset;
        lodash2.unzip = unzip;
        lodash2.unzipWith = unzipWith;
        lodash2.update = update;
        lodash2.updateWith = updateWith;
        lodash2.values = values;
        lodash2.valuesIn = valuesIn;
        lodash2.without = without;
        lodash2.words = words;
        lodash2.wrap = wrap;
        lodash2.xor = xor;
        lodash2.xorBy = xorBy;
        lodash2.xorWith = xorWith;
        lodash2.zip = zip;
        lodash2.zipObject = zipObject;
        lodash2.zipObjectDeep = zipObjectDeep;
        lodash2.zipWith = zipWith;
        lodash2.entries = toPairs;
        lodash2.entriesIn = toPairsIn;
        lodash2.extend = assignIn;
        lodash2.extendWith = assignInWith;
        mixin(lodash2, lodash2);
        lodash2.add = add;
        lodash2.attempt = attempt;
        lodash2.camelCase = camelCase;
        lodash2.capitalize = capitalize;
        lodash2.ceil = ceil;
        lodash2.clamp = clamp;
        lodash2.clone = clone;
        lodash2.cloneDeep = cloneDeep;
        lodash2.cloneDeepWith = cloneDeepWith;
        lodash2.cloneWith = cloneWith;
        lodash2.conformsTo = conformsTo;
        lodash2.deburr = deburr;
        lodash2.defaultTo = defaultTo;
        lodash2.divide = divide;
        lodash2.endsWith = endsWith;
        lodash2.eq = eq;
        lodash2.escape = escape;
        lodash2.escapeRegExp = escapeRegExp;
        lodash2.every = every;
        lodash2.find = find;
        lodash2.findIndex = findIndex;
        lodash2.findKey = findKey;
        lodash2.findLast = findLast;
        lodash2.findLastIndex = findLastIndex;
        lodash2.findLastKey = findLastKey;
        lodash2.floor = floor;
        lodash2.forEach = forEach;
        lodash2.forEachRight = forEachRight;
        lodash2.forIn = forIn;
        lodash2.forInRight = forInRight;
        lodash2.forOwn = forOwn;
        lodash2.forOwnRight = forOwnRight;
        lodash2.get = get;
        lodash2.gt = gt2;
        lodash2.gte = gte;
        lodash2.has = has;
        lodash2.hasIn = hasIn;
        lodash2.head = head;
        lodash2.identity = identity;
        lodash2.includes = includes;
        lodash2.indexOf = indexOf;
        lodash2.inRange = inRange;
        lodash2.invoke = invoke;
        lodash2.isArguments = isArguments;
        lodash2.isArray = isArray;
        lodash2.isArrayBuffer = isArrayBuffer;
        lodash2.isArrayLike = isArrayLike;
        lodash2.isArrayLikeObject = isArrayLikeObject;
        lodash2.isBoolean = isBoolean;
        lodash2.isBuffer = isBuffer;
        lodash2.isDate = isDate;
        lodash2.isElement = isElement;
        lodash2.isEmpty = isEmpty;
        lodash2.isEqual = isEqual;
        lodash2.isEqualWith = isEqualWith;
        lodash2.isError = isError;
        lodash2.isFinite = isFinite;
        lodash2.isFunction = isFunction;
        lodash2.isInteger = isInteger2;
        lodash2.isLength = isLength;
        lodash2.isMap = isMap;
        lodash2.isMatch = isMatch;
        lodash2.isMatchWith = isMatchWith;
        lodash2.isNaN = isNaN;
        lodash2.isNative = isNative;
        lodash2.isNil = isNil;
        lodash2.isNull = isNull;
        lodash2.isNumber = isNumber2;
        lodash2.isObject = isObject;
        lodash2.isObjectLike = isObjectLike;
        lodash2.isPlainObject = isPlainObject;
        lodash2.isRegExp = isRegExp;
        lodash2.isSafeInteger = isSafeInteger;
        lodash2.isSet = isSet;
        lodash2.isString = isString;
        lodash2.isSymbol = isSymbol;
        lodash2.isTypedArray = isTypedArray;
        lodash2.isUndefined = isUndefined;
        lodash2.isWeakMap = isWeakMap;
        lodash2.isWeakSet = isWeakSet;
        lodash2.join = join;
        lodash2.kebabCase = kebabCase;
        lodash2.last = last;
        lodash2.lastIndexOf = lastIndexOf;
        lodash2.lowerCase = lowerCase;
        lodash2.lowerFirst = lowerFirst;
        lodash2.lt = lt2;
        lodash2.lte = lte;
        lodash2.max = max;
        lodash2.maxBy = maxBy;
        lodash2.mean = mean;
        lodash2.meanBy = meanBy;
        lodash2.min = min;
        lodash2.minBy = minBy;
        lodash2.stubArray = stubArray;
        lodash2.stubFalse = stubFalse;
        lodash2.stubObject = stubObject;
        lodash2.stubString = stubString;
        lodash2.stubTrue = stubTrue;
        lodash2.multiply = multiply;
        lodash2.nth = nth;
        lodash2.noConflict = noConflict;
        lodash2.noop = noop;
        lodash2.now = now;
        lodash2.pad = pad;
        lodash2.padEnd = padEnd;
        lodash2.padStart = padStart;
        lodash2.parseInt = parseInt2;
        lodash2.random = random;
        lodash2.reduce = reduce;
        lodash2.reduceRight = reduceRight;
        lodash2.repeat = repeat;
        lodash2.replace = replace;
        lodash2.result = result;
        lodash2.round = round;
        lodash2.runInContext = runInContext2;
        lodash2.sample = sample;
        lodash2.size = size;
        lodash2.snakeCase = snakeCase;
        lodash2.some = some;
        lodash2.sortedIndex = sortedIndex;
        lodash2.sortedIndexBy = sortedIndexBy;
        lodash2.sortedIndexOf = sortedIndexOf;
        lodash2.sortedLastIndex = sortedLastIndex;
        lodash2.sortedLastIndexBy = sortedLastIndexBy;
        lodash2.sortedLastIndexOf = sortedLastIndexOf;
        lodash2.startCase = startCase;
        lodash2.startsWith = startsWith;
        lodash2.subtract = subtract;
        lodash2.sum = sum;
        lodash2.sumBy = sumBy;
        lodash2.template = template;
        lodash2.times = times;
        lodash2.toFinite = toFinite;
        lodash2.toInteger = toInteger;
        lodash2.toLength = toLength;
        lodash2.toLower = toLower;
        lodash2.toNumber = toNumber;
        lodash2.toSafeInteger = toSafeInteger;
        lodash2.toString = toString2;
        lodash2.toUpper = toUpper;
        lodash2.trim = trim;
        lodash2.trimEnd = trimEnd;
        lodash2.trimStart = trimStart;
        lodash2.truncate = truncate;
        lodash2.unescape = unescape;
        lodash2.uniqueId = uniqueId;
        lodash2.upperCase = upperCase;
        lodash2.upperFirst = upperFirst;
        lodash2.each = forEach;
        lodash2.eachRight = forEachRight;
        lodash2.first = head;
        mixin(lodash2, function() {
          var source = {};
          baseForOwn(lodash2, function(func, methodName) {
            if (!hasOwnProperty.call(lodash2.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash2.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash2[methodName].placeholder = lodash2;
        });
        arrayEach(["drop", "take"], function(methodName, index2) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index2 ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index2) {
          var type = index2 + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index2) {
          var takeName = "take" + (index2 ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index2) {
          var dropName = "drop" + (index2 ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined$1) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash2.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash2, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash2.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash2[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined$1
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash2.prototype.at = wrapperAt;
        lodash2.prototype.chain = wrapperChain;
        lodash2.prototype.commit = wrapperCommit;
        lodash2.prototype.next = wrapperNext;
        lodash2.prototype.plant = wrapperPlant;
        lodash2.prototype.reverse = wrapperReverse;
        lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
        lodash2.prototype.first = lodash2.prototype.head;
        if (symIterator) {
          lodash2.prototype[symIterator] = wrapperToIterator;
        }
        return lodash2;
      };
      var _2 = runInContext();
      if (freeModule) {
        (freeModule.exports = _2)._ = _2;
        freeExports._ = _2;
      } else {
        root._ = _2;
      }
    }).call(lodash);
  })(lodash$1, lodash$1.exports);
  return lodash$1.exports;
}
var lodashExports = requireLodash();
var matter$1 = { exports: {} };
/*!
 * matter-js 0.20.0 by @liabru
 * http://brm.io/matter-js/
 * License MIT
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) Liam Brummitt and contributors.
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
var matter = matter$1.exports;
var hasRequiredMatter;
function requireMatter() {
  if (hasRequiredMatter) return matter$1.exports;
  hasRequiredMatter = 1;
  (function(module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
      module.exports = factory();
    })(matter, function() {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports2) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1) value = __webpack_require__(value);
            if (mode & 8) return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, (function(key2) {
              return value[key2];
            }).bind(null, key));
            return ns;
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              function getDefault() {
                return module2["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module2;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = 20);
        }([
          /* 0 */
          /***/
          function(module2, exports2) {
            var Common2 = {};
            module2.exports = Common2;
            (function() {
              Common2._baseDelta = 1e3 / 60;
              Common2._nextId = 0;
              Common2._seed = 0;
              Common2._nowStartTime = +/* @__PURE__ */ new Date();
              Common2._warnedOnce = {};
              Common2._decomp = null;
              Common2.extend = function(obj, deep) {
                var argsStart, deepClone;
                if (typeof deep === "boolean") {
                  argsStart = 2;
                  deepClone = deep;
                } else {
                  argsStart = 1;
                  deepClone = true;
                }
                for (var i = argsStart; i < arguments.length; i++) {
                  var source = arguments[i];
                  if (source) {
                    for (var prop in source) {
                      if (deepClone && source[prop] && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                          obj[prop] = obj[prop] || {};
                          Common2.extend(obj[prop], deepClone, source[prop]);
                        } else {
                          obj[prop] = source[prop];
                        }
                      } else {
                        obj[prop] = source[prop];
                      }
                    }
                  }
                }
                return obj;
              };
              Common2.clone = function(obj, deep) {
                return Common2.extend({}, deep, obj);
              };
              Common2.keys = function(obj) {
                if (Object.keys)
                  return Object.keys(obj);
                var keys = [];
                for (var key in obj)
                  keys.push(key);
                return keys;
              };
              Common2.values = function(obj) {
                var values = [];
                if (Object.keys) {
                  var keys = Object.keys(obj);
                  for (var i = 0; i < keys.length; i++) {
                    values.push(obj[keys[i]]);
                  }
                  return values;
                }
                for (var key in obj)
                  values.push(obj[key]);
                return values;
              };
              Common2.get = function(obj, path, begin, end) {
                path = path.split(".").slice(begin, end);
                for (var i = 0; i < path.length; i += 1) {
                  obj = obj[path[i]];
                }
                return obj;
              };
              Common2.set = function(obj, path, val, begin, end) {
                var parts = path.split(".").slice(begin, end);
                Common2.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
                return val;
              };
              Common2.shuffle = function(array) {
                for (var i = array.length - 1; i > 0; i--) {
                  var j = Math.floor(Common2.random() * (i + 1));
                  var temp = array[i];
                  array[i] = array[j];
                  array[j] = temp;
                }
                return array;
              };
              Common2.choose = function(choices) {
                return choices[Math.floor(Common2.random() * choices.length)];
              };
              Common2.isElement = function(obj) {
                if (typeof HTMLElement !== "undefined") {
                  return obj instanceof HTMLElement;
                }
                return !!(obj && obj.nodeType && obj.nodeName);
              };
              Common2.isArray = function(obj) {
                return Object.prototype.toString.call(obj) === "[object Array]";
              };
              Common2.isFunction = function(obj) {
                return typeof obj === "function";
              };
              Common2.isPlainObject = function(obj) {
                return typeof obj === "object" && obj.constructor === Object;
              };
              Common2.isString = function(obj) {
                return toString.call(obj) === "[object String]";
              };
              Common2.clamp = function(value, min, max) {
                if (value < min)
                  return min;
                if (value > max)
                  return max;
                return value;
              };
              Common2.sign = function(value) {
                return value < 0 ? -1 : 1;
              };
              Common2.now = function() {
                if (typeof window !== "undefined" && window.performance) {
                  if (window.performance.now) {
                    return window.performance.now();
                  } else if (window.performance.webkitNow) {
                    return window.performance.webkitNow();
                  }
                }
                if (Date.now) {
                  return Date.now();
                }
                return /* @__PURE__ */ new Date() - Common2._nowStartTime;
              };
              Common2.random = function(min, max) {
                min = typeof min !== "undefined" ? min : 0;
                max = typeof max !== "undefined" ? max : 1;
                return min + _seededRandom() * (max - min);
              };
              var _seededRandom = function() {
                Common2._seed = (Common2._seed * 9301 + 49297) % 233280;
                return Common2._seed / 233280;
              };
              Common2.colorToNumber = function(colorString) {
                colorString = colorString.replace("#", "");
                if (colorString.length == 3) {
                  colorString = colorString.charAt(0) + colorString.charAt(0) + colorString.charAt(1) + colorString.charAt(1) + colorString.charAt(2) + colorString.charAt(2);
                }
                return parseInt(colorString, 16);
              };
              Common2.logLevel = 1;
              Common2.log = function() {
                if (console && Common2.logLevel > 0 && Common2.logLevel <= 3) {
                  console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
                }
              };
              Common2.info = function() {
                if (console && Common2.logLevel > 0 && Common2.logLevel <= 2) {
                  console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
                }
              };
              Common2.warn = function() {
                if (console && Common2.logLevel > 0 && Common2.logLevel <= 3) {
                  console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
                }
              };
              Common2.warnOnce = function() {
                var message = Array.prototype.slice.call(arguments).join(" ");
                if (!Common2._warnedOnce[message]) {
                  Common2.warn(message);
                  Common2._warnedOnce[message] = true;
                }
              };
              Common2.deprecated = function(obj, prop, warning) {
                obj[prop] = Common2.chain(function() {
                  Common2.warnOnce("🔅 deprecated 🔅", warning);
                }, obj[prop]);
              };
              Common2.nextId = function() {
                return Common2._nextId++;
              };
              Common2.indexOf = function(haystack, needle) {
                if (haystack.indexOf)
                  return haystack.indexOf(needle);
                for (var i = 0; i < haystack.length; i++) {
                  if (haystack[i] === needle)
                    return i;
                }
                return -1;
              };
              Common2.map = function(list, func) {
                if (list.map) {
                  return list.map(func);
                }
                var mapped = [];
                for (var i = 0; i < list.length; i += 1) {
                  mapped.push(func(list[i]));
                }
                return mapped;
              };
              Common2.topologicalSort = function(graph) {
                var result = [], visited = [], temp = [];
                for (var node in graph) {
                  if (!visited[node] && !temp[node]) {
                    Common2._topologicalSort(node, visited, temp, graph, result);
                  }
                }
                return result;
              };
              Common2._topologicalSort = function(node, visited, temp, graph, result) {
                var neighbors = graph[node] || [];
                temp[node] = true;
                for (var i = 0; i < neighbors.length; i += 1) {
                  var neighbor = neighbors[i];
                  if (temp[neighbor]) {
                    continue;
                  }
                  if (!visited[neighbor]) {
                    Common2._topologicalSort(neighbor, visited, temp, graph, result);
                  }
                }
                temp[node] = false;
                visited[node] = true;
                result.push(node);
              };
              Common2.chain = function() {
                var funcs = [];
                for (var i = 0; i < arguments.length; i += 1) {
                  var func = arguments[i];
                  if (func._chained) {
                    funcs.push.apply(funcs, func._chained);
                  } else {
                    funcs.push(func);
                  }
                }
                var chain = function() {
                  var lastResult, args = new Array(arguments.length);
                  for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
                    args[i2] = arguments[i2];
                  }
                  for (i2 = 0; i2 < funcs.length; i2 += 1) {
                    var result = funcs[i2].apply(lastResult, args);
                    if (typeof result !== "undefined") {
                      lastResult = result;
                    }
                  }
                  return lastResult;
                };
                chain._chained = funcs;
                return chain;
              };
              Common2.chainPathBefore = function(base, path, func) {
                return Common2.set(base, path, Common2.chain(
                  func,
                  Common2.get(base, path)
                ));
              };
              Common2.chainPathAfter = function(base, path, func) {
                return Common2.set(base, path, Common2.chain(
                  Common2.get(base, path),
                  func
                ));
              };
              Common2.setDecomp = function(decomp) {
                Common2._decomp = decomp;
              };
              Common2.getDecomp = function() {
                var decomp = Common2._decomp;
                try {
                  if (!decomp && typeof window !== "undefined") {
                    decomp = window.decomp;
                  }
                  if (!decomp && typeof commonjsGlobal !== "undefined") {
                    decomp = commonjsGlobal.decomp;
                  }
                } catch (e) {
                  decomp = null;
                }
                return decomp;
              };
            })();
          },
          /* 1 */
          /***/
          function(module2, exports2) {
            var Bounds = {};
            module2.exports = Bounds;
            (function() {
              Bounds.create = function(vertices) {
                var bounds = {
                  min: { x: 0, y: 0 },
                  max: { x: 0, y: 0 }
                };
                if (vertices)
                  Bounds.update(bounds, vertices);
                return bounds;
              };
              Bounds.update = function(bounds, vertices, velocity) {
                bounds.min.x = Infinity;
                bounds.max.x = -Infinity;
                bounds.min.y = Infinity;
                bounds.max.y = -Infinity;
                for (var i = 0; i < vertices.length; i++) {
                  var vertex = vertices[i];
                  if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
                  if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
                  if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
                  if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
                }
                if (velocity) {
                  if (velocity.x > 0) {
                    bounds.max.x += velocity.x;
                  } else {
                    bounds.min.x += velocity.x;
                  }
                  if (velocity.y > 0) {
                    bounds.max.y += velocity.y;
                  } else {
                    bounds.min.y += velocity.y;
                  }
                }
              };
              Bounds.contains = function(bounds, point) {
                return point.x >= bounds.min.x && point.x <= bounds.max.x && point.y >= bounds.min.y && point.y <= bounds.max.y;
              };
              Bounds.overlaps = function(boundsA, boundsB) {
                return boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y;
              };
              Bounds.translate = function(bounds, vector) {
                bounds.min.x += vector.x;
                bounds.max.x += vector.x;
                bounds.min.y += vector.y;
                bounds.max.y += vector.y;
              };
              Bounds.shift = function(bounds, position) {
                var deltaX = bounds.max.x - bounds.min.x, deltaY = bounds.max.y - bounds.min.y;
                bounds.min.x = position.x;
                bounds.max.x = position.x + deltaX;
                bounds.min.y = position.y;
                bounds.max.y = position.y + deltaY;
              };
            })();
          },
          /* 2 */
          /***/
          function(module2, exports2) {
            var Vector2 = {};
            module2.exports = Vector2;
            (function() {
              Vector2.create = function(x2, y2) {
                return { x: x2 || 0, y: y2 || 0 };
              };
              Vector2.clone = function(vector) {
                return { x: vector.x, y: vector.y };
              };
              Vector2.magnitude = function(vector) {
                return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
              };
              Vector2.magnitudeSquared = function(vector) {
                return vector.x * vector.x + vector.y * vector.y;
              };
              Vector2.rotate = function(vector, angle, output) {
                var cos = Math.cos(angle), sin = Math.sin(angle);
                if (!output) output = {};
                var x2 = vector.x * cos - vector.y * sin;
                output.y = vector.x * sin + vector.y * cos;
                output.x = x2;
                return output;
              };
              Vector2.rotateAbout = function(vector, angle, point, output) {
                var cos = Math.cos(angle), sin = Math.sin(angle);
                if (!output) output = {};
                var x2 = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
                output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
                output.x = x2;
                return output;
              };
              Vector2.normalise = function(vector) {
                var magnitude = Vector2.magnitude(vector);
                if (magnitude === 0)
                  return { x: 0, y: 0 };
                return { x: vector.x / magnitude, y: vector.y / magnitude };
              };
              Vector2.dot = function(vectorA, vectorB) {
                return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
              };
              Vector2.cross = function(vectorA, vectorB) {
                return vectorA.x * vectorB.y - vectorA.y * vectorB.x;
              };
              Vector2.cross3 = function(vectorA, vectorB, vectorC) {
                return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
              };
              Vector2.add = function(vectorA, vectorB, output) {
                if (!output) output = {};
                output.x = vectorA.x + vectorB.x;
                output.y = vectorA.y + vectorB.y;
                return output;
              };
              Vector2.sub = function(vectorA, vectorB, output) {
                if (!output) output = {};
                output.x = vectorA.x - vectorB.x;
                output.y = vectorA.y - vectorB.y;
                return output;
              };
              Vector2.mult = function(vector, scalar) {
                return { x: vector.x * scalar, y: vector.y * scalar };
              };
              Vector2.div = function(vector, scalar) {
                return { x: vector.x / scalar, y: vector.y / scalar };
              };
              Vector2.perp = function(vector, negate) {
                negate = negate === true ? -1 : 1;
                return { x: negate * -vector.y, y: negate * vector.x };
              };
              Vector2.neg = function(vector) {
                return { x: -vector.x, y: -vector.y };
              };
              Vector2.angle = function(vectorA, vectorB) {
                return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
              };
              Vector2._temp = [
                Vector2.create(),
                Vector2.create(),
                Vector2.create(),
                Vector2.create(),
                Vector2.create(),
                Vector2.create()
              ];
            })();
          },
          /* 3 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Vertices = {};
            module2.exports = Vertices;
            var Vector2 = __webpack_require__(2);
            var Common2 = __webpack_require__(0);
            (function() {
              Vertices.create = function(points, body) {
                var vertices = [];
                for (var i = 0; i < points.length; i++) {
                  var point = points[i], vertex = {
                    x: point.x,
                    y: point.y,
                    index: i,
                    body,
                    isInternal: false
                  };
                  vertices.push(vertex);
                }
                return vertices;
              };
              Vertices.fromPath = function(path, body) {
                var pathPattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig, points = [];
                path.replace(pathPattern, function(match, x2, y2) {
                  points.push({ x: parseFloat(x2), y: parseFloat(y2) });
                });
                return Vertices.create(points, body);
              };
              Vertices.centre = function(vertices) {
                var area = Vertices.area(vertices, true), centre = { x: 0, y: 0 }, cross, temp, j;
                for (var i = 0; i < vertices.length; i++) {
                  j = (i + 1) % vertices.length;
                  cross = Vector2.cross(vertices[i], vertices[j]);
                  temp = Vector2.mult(Vector2.add(vertices[i], vertices[j]), cross);
                  centre = Vector2.add(centre, temp);
                }
                return Vector2.div(centre, 6 * area);
              };
              Vertices.mean = function(vertices) {
                var average = { x: 0, y: 0 };
                for (var i = 0; i < vertices.length; i++) {
                  average.x += vertices[i].x;
                  average.y += vertices[i].y;
                }
                return Vector2.div(average, vertices.length);
              };
              Vertices.area = function(vertices, signed) {
                var area = 0, j = vertices.length - 1;
                for (var i = 0; i < vertices.length; i++) {
                  area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
                  j = i;
                }
                if (signed)
                  return area / 2;
                return Math.abs(area) / 2;
              };
              Vertices.inertia = function(vertices, mass) {
                var numerator = 0, denominator = 0, v2 = vertices, cross, j;
                for (var n = 0; n < v2.length; n++) {
                  j = (n + 1) % v2.length;
                  cross = Math.abs(Vector2.cross(v2[j], v2[n]));
                  numerator += cross * (Vector2.dot(v2[j], v2[j]) + Vector2.dot(v2[j], v2[n]) + Vector2.dot(v2[n], v2[n]));
                  denominator += cross;
                }
                return mass / 6 * (numerator / denominator);
              };
              Vertices.translate = function(vertices, vector, scalar) {
                scalar = typeof scalar !== "undefined" ? scalar : 1;
                var verticesLength = vertices.length, translateX = vector.x * scalar, translateY = vector.y * scalar, i;
                for (i = 0; i < verticesLength; i++) {
                  vertices[i].x += translateX;
                  vertices[i].y += translateY;
                }
                return vertices;
              };
              Vertices.rotate = function(vertices, angle, point) {
                if (angle === 0)
                  return;
                var cos = Math.cos(angle), sin = Math.sin(angle), pointX = point.x, pointY = point.y, verticesLength = vertices.length, vertex, dx, dy, i;
                for (i = 0; i < verticesLength; i++) {
                  vertex = vertices[i];
                  dx = vertex.x - pointX;
                  dy = vertex.y - pointY;
                  vertex.x = pointX + (dx * cos - dy * sin);
                  vertex.y = pointY + (dx * sin + dy * cos);
                }
                return vertices;
              };
              Vertices.contains = function(vertices, point) {
                var pointX = point.x, pointY = point.y, verticesLength = vertices.length, vertex = vertices[verticesLength - 1], nextVertex;
                for (var i = 0; i < verticesLength; i++) {
                  nextVertex = vertices[i];
                  if ((pointX - vertex.x) * (nextVertex.y - vertex.y) + (pointY - vertex.y) * (vertex.x - nextVertex.x) > 0) {
                    return false;
                  }
                  vertex = nextVertex;
                }
                return true;
              };
              Vertices.scale = function(vertices, scaleX, scaleY, point) {
                if (scaleX === 1 && scaleY === 1)
                  return vertices;
                point = point || Vertices.centre(vertices);
                var vertex, delta;
                for (var i = 0; i < vertices.length; i++) {
                  vertex = vertices[i];
                  delta = Vector2.sub(vertex, point);
                  vertices[i].x = point.x + delta.x * scaleX;
                  vertices[i].y = point.y + delta.y * scaleY;
                }
                return vertices;
              };
              Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
                if (typeof radius === "number") {
                  radius = [radius];
                } else {
                  radius = radius || [8];
                }
                quality = typeof quality !== "undefined" ? quality : -1;
                qualityMin = qualityMin || 2;
                qualityMax = qualityMax || 14;
                var newVertices = [];
                for (var i = 0; i < vertices.length; i++) {
                  var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1], vertex = vertices[i], nextVertex = vertices[(i + 1) % vertices.length], currentRadius = radius[i < radius.length ? i : radius.length - 1];
                  if (currentRadius === 0) {
                    newVertices.push(vertex);
                    continue;
                  }
                  var prevNormal = Vector2.normalise({
                    x: vertex.y - prevVertex.y,
                    y: prevVertex.x - vertex.x
                  });
                  var nextNormal = Vector2.normalise({
                    x: nextVertex.y - vertex.y,
                    y: vertex.x - nextVertex.x
                  });
                  var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)), radiusVector = Vector2.mult(Common2.clone(prevNormal), currentRadius), midNormal = Vector2.normalise(Vector2.mult(Vector2.add(prevNormal, nextNormal), 0.5)), scaledVertex = Vector2.sub(vertex, Vector2.mult(midNormal, diagonalRadius));
                  var precision = quality;
                  if (quality === -1) {
                    precision = Math.pow(currentRadius, 0.32) * 1.75;
                  }
                  precision = Common2.clamp(precision, qualityMin, qualityMax);
                  if (precision % 2 === 1)
                    precision += 1;
                  var alpha = Math.acos(Vector2.dot(prevNormal, nextNormal)), theta = alpha / precision;
                  for (var j = 0; j < precision; j++) {
                    newVertices.push(Vector2.add(Vector2.rotate(radiusVector, theta * j), scaledVertex));
                  }
                }
                return newVertices;
              };
              Vertices.clockwiseSort = function(vertices) {
                var centre = Vertices.mean(vertices);
                vertices.sort(function(vertexA, vertexB) {
                  return Vector2.angle(centre, vertexA) - Vector2.angle(centre, vertexB);
                });
                return vertices;
              };
              Vertices.isConvex = function(vertices) {
                var flag = 0, n = vertices.length, i, j, k, z2;
                if (n < 3)
                  return null;
                for (i = 0; i < n; i++) {
                  j = (i + 1) % n;
                  k = (i + 2) % n;
                  z2 = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
                  z2 -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);
                  if (z2 < 0) {
                    flag |= 1;
                  } else if (z2 > 0) {
                    flag |= 2;
                  }
                  if (flag === 3) {
                    return false;
                  }
                }
                if (flag !== 0) {
                  return true;
                } else {
                  return null;
                }
              };
              Vertices.hull = function(vertices) {
                var upper = [], lower = [], vertex, i;
                vertices = vertices.slice(0);
                vertices.sort(function(vertexA, vertexB) {
                  var dx = vertexA.x - vertexB.x;
                  return dx !== 0 ? dx : vertexA.y - vertexB.y;
                });
                for (i = 0; i < vertices.length; i += 1) {
                  vertex = vertices[i];
                  while (lower.length >= 2 && Vector2.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                    lower.pop();
                  }
                  lower.push(vertex);
                }
                for (i = vertices.length - 1; i >= 0; i -= 1) {
                  vertex = vertices[i];
                  while (upper.length >= 2 && Vector2.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                    upper.pop();
                  }
                  upper.push(vertex);
                }
                upper.pop();
                lower.pop();
                return upper.concat(lower);
              };
            })();
          },
          /* 4 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Body2 = {};
            module2.exports = Body2;
            var Vertices = __webpack_require__(3);
            var Vector2 = __webpack_require__(2);
            var Sleeping = __webpack_require__(7);
            var Common2 = __webpack_require__(0);
            var Bounds = __webpack_require__(1);
            var Axes = __webpack_require__(11);
            (function() {
              Body2._timeCorrection = true;
              Body2._inertiaScale = 4;
              Body2._nextCollidingGroupId = 1;
              Body2._nextNonCollidingGroupId = -1;
              Body2._nextCategory = 1;
              Body2._baseDelta = 1e3 / 60;
              Body2.create = function(options) {
                var defaults = {
                  id: Common2.nextId(),
                  type: "body",
                  label: "Body",
                  parts: [],
                  plugin: {},
                  angle: 0,
                  vertices: Vertices.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),
                  position: { x: 0, y: 0 },
                  force: { x: 0, y: 0 },
                  torque: 0,
                  positionImpulse: { x: 0, y: 0 },
                  constraintImpulse: { x: 0, y: 0, angle: 0 },
                  totalContacts: 0,
                  speed: 0,
                  angularSpeed: 0,
                  velocity: { x: 0, y: 0 },
                  angularVelocity: 0,
                  isSensor: false,
                  isStatic: false,
                  isSleeping: false,
                  motion: 0,
                  sleepThreshold: 60,
                  density: 1e-3,
                  restitution: 0,
                  friction: 0.1,
                  frictionStatic: 0.5,
                  frictionAir: 0.01,
                  collisionFilter: {
                    category: 1,
                    mask: 4294967295,
                    group: 0
                  },
                  slop: 0.05,
                  timeScale: 1,
                  render: {
                    visible: true,
                    opacity: 1,
                    strokeStyle: null,
                    fillStyle: null,
                    lineWidth: null,
                    sprite: {
                      xScale: 1,
                      yScale: 1,
                      xOffset: 0,
                      yOffset: 0
                    }
                  },
                  events: null,
                  bounds: null,
                  chamfer: null,
                  circleRadius: 0,
                  positionPrev: null,
                  anglePrev: 0,
                  parent: null,
                  axes: null,
                  area: 0,
                  mass: 0,
                  inertia: 0,
                  deltaTime: 1e3 / 60,
                  _original: null
                };
                var body = Common2.extend(defaults, options);
                _initProperties(body, options);
                return body;
              };
              Body2.nextGroup = function(isNonColliding) {
                if (isNonColliding)
                  return Body2._nextNonCollidingGroupId--;
                return Body2._nextCollidingGroupId++;
              };
              Body2.nextCategory = function() {
                Body2._nextCategory = Body2._nextCategory << 1;
                return Body2._nextCategory;
              };
              var _initProperties = function(body, options) {
                options = options || {};
                Body2.set(body, {
                  bounds: body.bounds || Bounds.create(body.vertices),
                  positionPrev: body.positionPrev || Vector2.clone(body.position),
                  anglePrev: body.anglePrev || body.angle,
                  vertices: body.vertices,
                  parts: body.parts || [body],
                  isStatic: body.isStatic,
                  isSleeping: body.isSleeping,
                  parent: body.parent || body
                });
                Vertices.rotate(body.vertices, body.angle, body.position);
                Axes.rotate(body.axes, body.angle);
                Bounds.update(body.bounds, body.vertices, body.velocity);
                Body2.set(body, {
                  axes: options.axes || body.axes,
                  area: options.area || body.area,
                  mass: options.mass || body.mass,
                  inertia: options.inertia || body.inertia
                });
                var defaultFillStyle = body.isStatic ? "#14151f" : Common2.choose(["#f19648", "#f5d259", "#f55a3c", "#063e7b", "#ececd1"]), defaultStrokeStyle = body.isStatic ? "#555" : "#ccc", defaultLineWidth = body.isStatic && body.render.fillStyle === null ? 1 : 0;
                body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
                body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
                body.render.lineWidth = body.render.lineWidth || defaultLineWidth;
                body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
                body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
              };
              Body2.set = function(body, settings, value) {
                var property;
                if (typeof settings === "string") {
                  property = settings;
                  settings = {};
                  settings[property] = value;
                }
                for (property in settings) {
                  if (!Object.prototype.hasOwnProperty.call(settings, property))
                    continue;
                  value = settings[property];
                  switch (property) {
                    case "isStatic":
                      Body2.setStatic(body, value);
                      break;
                    case "isSleeping":
                      Sleeping.set(body, value);
                      break;
                    case "mass":
                      Body2.setMass(body, value);
                      break;
                    case "density":
                      Body2.setDensity(body, value);
                      break;
                    case "inertia":
                      Body2.setInertia(body, value);
                      break;
                    case "vertices":
                      Body2.setVertices(body, value);
                      break;
                    case "position":
                      Body2.setPosition(body, value);
                      break;
                    case "angle":
                      Body2.setAngle(body, value);
                      break;
                    case "velocity":
                      Body2.setVelocity(body, value);
                      break;
                    case "angularVelocity":
                      Body2.setAngularVelocity(body, value);
                      break;
                    case "speed":
                      Body2.setSpeed(body, value);
                      break;
                    case "angularSpeed":
                      Body2.setAngularSpeed(body, value);
                      break;
                    case "parts":
                      Body2.setParts(body, value);
                      break;
                    case "centre":
                      Body2.setCentre(body, value);
                      break;
                    default:
                      body[property] = value;
                  }
                }
              };
              Body2.setStatic = function(body, isStatic) {
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  if (isStatic) {
                    if (!part.isStatic) {
                      part._original = {
                        restitution: part.restitution,
                        friction: part.friction,
                        mass: part.mass,
                        inertia: part.inertia,
                        density: part.density,
                        inverseMass: part.inverseMass,
                        inverseInertia: part.inverseInertia
                      };
                    }
                    part.restitution = 0;
                    part.friction = 1;
                    part.mass = part.inertia = part.density = Infinity;
                    part.inverseMass = part.inverseInertia = 0;
                    part.positionPrev.x = part.position.x;
                    part.positionPrev.y = part.position.y;
                    part.anglePrev = part.angle;
                    part.angularVelocity = 0;
                    part.speed = 0;
                    part.angularSpeed = 0;
                    part.motion = 0;
                  } else if (part._original) {
                    part.restitution = part._original.restitution;
                    part.friction = part._original.friction;
                    part.mass = part._original.mass;
                    part.inertia = part._original.inertia;
                    part.density = part._original.density;
                    part.inverseMass = part._original.inverseMass;
                    part.inverseInertia = part._original.inverseInertia;
                    part._original = null;
                  }
                  part.isStatic = isStatic;
                }
              };
              Body2.setMass = function(body, mass) {
                var moment = body.inertia / (body.mass / 6);
                body.inertia = moment * (mass / 6);
                body.inverseInertia = 1 / body.inertia;
                body.mass = mass;
                body.inverseMass = 1 / body.mass;
                body.density = body.mass / body.area;
              };
              Body2.setDensity = function(body, density) {
                Body2.setMass(body, density * body.area);
                body.density = density;
              };
              Body2.setInertia = function(body, inertia) {
                body.inertia = inertia;
                body.inverseInertia = 1 / body.inertia;
              };
              Body2.setVertices = function(body, vertices) {
                if (vertices[0].body === body) {
                  body.vertices = vertices;
                } else {
                  body.vertices = Vertices.create(vertices, body);
                }
                body.axes = Axes.fromVertices(body.vertices);
                body.area = Vertices.area(body.vertices);
                Body2.setMass(body, body.density * body.area);
                var centre = Vertices.centre(body.vertices);
                Vertices.translate(body.vertices, centre, -1);
                Body2.setInertia(body, Body2._inertiaScale * Vertices.inertia(body.vertices, body.mass));
                Vertices.translate(body.vertices, body.position);
                Bounds.update(body.bounds, body.vertices, body.velocity);
              };
              Body2.setParts = function(body, parts, autoHull) {
                var i;
                parts = parts.slice(0);
                body.parts.length = 0;
                body.parts.push(body);
                body.parent = body;
                for (i = 0; i < parts.length; i++) {
                  var part = parts[i];
                  if (part !== body) {
                    part.parent = body;
                    body.parts.push(part);
                  }
                }
                if (body.parts.length === 1)
                  return;
                autoHull = typeof autoHull !== "undefined" ? autoHull : true;
                if (autoHull) {
                  var vertices = [];
                  for (i = 0; i < parts.length; i++) {
                    vertices = vertices.concat(parts[i].vertices);
                  }
                  Vertices.clockwiseSort(vertices);
                  var hull = Vertices.hull(vertices), hullCentre = Vertices.centre(hull);
                  Body2.setVertices(body, hull);
                  Vertices.translate(body.vertices, hullCentre);
                }
                var total = Body2._totalProperties(body);
                body.area = total.area;
                body.parent = body;
                body.position.x = total.centre.x;
                body.position.y = total.centre.y;
                body.positionPrev.x = total.centre.x;
                body.positionPrev.y = total.centre.y;
                Body2.setMass(body, total.mass);
                Body2.setInertia(body, total.inertia);
                Body2.setPosition(body, total.centre);
              };
              Body2.setCentre = function(body, centre, relative) {
                if (!relative) {
                  body.positionPrev.x = centre.x - (body.position.x - body.positionPrev.x);
                  body.positionPrev.y = centre.y - (body.position.y - body.positionPrev.y);
                  body.position.x = centre.x;
                  body.position.y = centre.y;
                } else {
                  body.positionPrev.x += centre.x;
                  body.positionPrev.y += centre.y;
                  body.position.x += centre.x;
                  body.position.y += centre.y;
                }
              };
              Body2.setPosition = function(body, position, updateVelocity) {
                var delta = Vector2.sub(position, body.position);
                if (updateVelocity) {
                  body.positionPrev.x = body.position.x;
                  body.positionPrev.y = body.position.y;
                  body.velocity.x = delta.x;
                  body.velocity.y = delta.y;
                  body.speed = Vector2.magnitude(delta);
                } else {
                  body.positionPrev.x += delta.x;
                  body.positionPrev.y += delta.y;
                }
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  part.position.x += delta.x;
                  part.position.y += delta.y;
                  Vertices.translate(part.vertices, delta);
                  Bounds.update(part.bounds, part.vertices, body.velocity);
                }
              };
              Body2.setAngle = function(body, angle, updateVelocity) {
                var delta = angle - body.angle;
                if (updateVelocity) {
                  body.anglePrev = body.angle;
                  body.angularVelocity = delta;
                  body.angularSpeed = Math.abs(delta);
                } else {
                  body.anglePrev += delta;
                }
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  part.angle += delta;
                  Vertices.rotate(part.vertices, delta, body.position);
                  Axes.rotate(part.axes, delta);
                  Bounds.update(part.bounds, part.vertices, body.velocity);
                  if (i > 0) {
                    Vector2.rotateAbout(part.position, delta, body.position, part.position);
                  }
                }
              };
              Body2.setVelocity = function(body, velocity) {
                var timeScale = body.deltaTime / Body2._baseDelta;
                body.positionPrev.x = body.position.x - velocity.x * timeScale;
                body.positionPrev.y = body.position.y - velocity.y * timeScale;
                body.velocity.x = (body.position.x - body.positionPrev.x) / timeScale;
                body.velocity.y = (body.position.y - body.positionPrev.y) / timeScale;
                body.speed = Vector2.magnitude(body.velocity);
              };
              Body2.getVelocity = function(body) {
                var timeScale = Body2._baseDelta / body.deltaTime;
                return {
                  x: (body.position.x - body.positionPrev.x) * timeScale,
                  y: (body.position.y - body.positionPrev.y) * timeScale
                };
              };
              Body2.getSpeed = function(body) {
                return Vector2.magnitude(Body2.getVelocity(body));
              };
              Body2.setSpeed = function(body, speed) {
                Body2.setVelocity(body, Vector2.mult(Vector2.normalise(Body2.getVelocity(body)), speed));
              };
              Body2.setAngularVelocity = function(body, velocity) {
                var timeScale = body.deltaTime / Body2._baseDelta;
                body.anglePrev = body.angle - velocity * timeScale;
                body.angularVelocity = (body.angle - body.anglePrev) / timeScale;
                body.angularSpeed = Math.abs(body.angularVelocity);
              };
              Body2.getAngularVelocity = function(body) {
                return (body.angle - body.anglePrev) * Body2._baseDelta / body.deltaTime;
              };
              Body2.getAngularSpeed = function(body) {
                return Math.abs(Body2.getAngularVelocity(body));
              };
              Body2.setAngularSpeed = function(body, speed) {
                Body2.setAngularVelocity(body, Common2.sign(Body2.getAngularVelocity(body)) * speed);
              };
              Body2.translate = function(body, translation, updateVelocity) {
                Body2.setPosition(body, Vector2.add(body.position, translation), updateVelocity);
              };
              Body2.rotate = function(body, rotation, point, updateVelocity) {
                if (!point) {
                  Body2.setAngle(body, body.angle + rotation, updateVelocity);
                } else {
                  var cos = Math.cos(rotation), sin = Math.sin(rotation), dx = body.position.x - point.x, dy = body.position.y - point.y;
                  Body2.setPosition(body, {
                    x: point.x + (dx * cos - dy * sin),
                    y: point.y + (dx * sin + dy * cos)
                  }, updateVelocity);
                  Body2.setAngle(body, body.angle + rotation, updateVelocity);
                }
              };
              Body2.scale = function(body, scaleX, scaleY, point) {
                var totalArea = 0, totalInertia = 0;
                point = point || body.position;
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  Vertices.scale(part.vertices, scaleX, scaleY, point);
                  part.axes = Axes.fromVertices(part.vertices);
                  part.area = Vertices.area(part.vertices);
                  Body2.setMass(part, body.density * part.area);
                  Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
                  Body2.setInertia(part, Body2._inertiaScale * Vertices.inertia(part.vertices, part.mass));
                  Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });
                  if (i > 0) {
                    totalArea += part.area;
                    totalInertia += part.inertia;
                  }
                  part.position.x = point.x + (part.position.x - point.x) * scaleX;
                  part.position.y = point.y + (part.position.y - point.y) * scaleY;
                  Bounds.update(part.bounds, part.vertices, body.velocity);
                }
                if (body.parts.length > 1) {
                  body.area = totalArea;
                  if (!body.isStatic) {
                    Body2.setMass(body, body.density * totalArea);
                    Body2.setInertia(body, totalInertia);
                  }
                }
                if (body.circleRadius) {
                  if (scaleX === scaleY) {
                    body.circleRadius *= scaleX;
                  } else {
                    body.circleRadius = null;
                  }
                }
              };
              Body2.update = function(body, deltaTime) {
                deltaTime = (typeof deltaTime !== "undefined" ? deltaTime : 1e3 / 60) * body.timeScale;
                var deltaTimeSquared = deltaTime * deltaTime, correction = Body2._timeCorrection ? deltaTime / (body.deltaTime || deltaTime) : 1;
                var frictionAir = 1 - body.frictionAir * (deltaTime / Common2._baseDelta), velocityPrevX = (body.position.x - body.positionPrev.x) * correction, velocityPrevY = (body.position.y - body.positionPrev.y) * correction;
                body.velocity.x = velocityPrevX * frictionAir + body.force.x / body.mass * deltaTimeSquared;
                body.velocity.y = velocityPrevY * frictionAir + body.force.y / body.mass * deltaTimeSquared;
                body.positionPrev.x = body.position.x;
                body.positionPrev.y = body.position.y;
                body.position.x += body.velocity.x;
                body.position.y += body.velocity.y;
                body.deltaTime = deltaTime;
                body.angularVelocity = (body.angle - body.anglePrev) * frictionAir * correction + body.torque / body.inertia * deltaTimeSquared;
                body.anglePrev = body.angle;
                body.angle += body.angularVelocity;
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  Vertices.translate(part.vertices, body.velocity);
                  if (i > 0) {
                    part.position.x += body.velocity.x;
                    part.position.y += body.velocity.y;
                  }
                  if (body.angularVelocity !== 0) {
                    Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                    Axes.rotate(part.axes, body.angularVelocity);
                    if (i > 0) {
                      Vector2.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                    }
                  }
                  Bounds.update(part.bounds, part.vertices, body.velocity);
                }
              };
              Body2.updateVelocities = function(body) {
                var timeScale = Body2._baseDelta / body.deltaTime, bodyVelocity = body.velocity;
                bodyVelocity.x = (body.position.x - body.positionPrev.x) * timeScale;
                bodyVelocity.y = (body.position.y - body.positionPrev.y) * timeScale;
                body.speed = Math.sqrt(bodyVelocity.x * bodyVelocity.x + bodyVelocity.y * bodyVelocity.y);
                body.angularVelocity = (body.angle - body.anglePrev) * timeScale;
                body.angularSpeed = Math.abs(body.angularVelocity);
              };
              Body2.applyForce = function(body, position, force) {
                var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
                body.force.x += force.x;
                body.force.y += force.y;
                body.torque += offset.x * force.y - offset.y * force.x;
              };
              Body2._totalProperties = function(body) {
                var properties = {
                  mass: 0,
                  area: 0,
                  inertia: 0,
                  centre: { x: 0, y: 0 }
                };
                for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
                  var part = body.parts[i], mass = part.mass !== Infinity ? part.mass : 1;
                  properties.mass += mass;
                  properties.area += part.area;
                  properties.inertia += part.inertia;
                  properties.centre = Vector2.add(properties.centre, Vector2.mult(part.position, mass));
                }
                properties.centre = Vector2.div(properties.centre, properties.mass);
                return properties;
              };
            })();
          },
          /* 5 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Events2 = {};
            module2.exports = Events2;
            var Common2 = __webpack_require__(0);
            (function() {
              Events2.on = function(object, eventNames, callback) {
                var names = eventNames.split(" "), name;
                for (var i = 0; i < names.length; i++) {
                  name = names[i];
                  object.events = object.events || {};
                  object.events[name] = object.events[name] || [];
                  object.events[name].push(callback);
                }
                return callback;
              };
              Events2.off = function(object, eventNames, callback) {
                if (!eventNames) {
                  object.events = {};
                  return;
                }
                if (typeof eventNames === "function") {
                  callback = eventNames;
                  eventNames = Common2.keys(object.events).join(" ");
                }
                var names = eventNames.split(" ");
                for (var i = 0; i < names.length; i++) {
                  var callbacks = object.events[names[i]], newCallbacks = [];
                  if (callback && callbacks) {
                    for (var j = 0; j < callbacks.length; j++) {
                      if (callbacks[j] !== callback)
                        newCallbacks.push(callbacks[j]);
                    }
                  }
                  object.events[names[i]] = newCallbacks;
                }
              };
              Events2.trigger = function(object, eventNames, event) {
                var names, name, callbacks, eventClone;
                var events = object.events;
                if (events && Common2.keys(events).length > 0) {
                  if (!event)
                    event = {};
                  names = eventNames.split(" ");
                  for (var i = 0; i < names.length; i++) {
                    name = names[i];
                    callbacks = events[name];
                    if (callbacks) {
                      eventClone = Common2.clone(event, false);
                      eventClone.name = name;
                      eventClone.source = object;
                      for (var j = 0; j < callbacks.length; j++) {
                        callbacks[j].apply(object, [eventClone]);
                      }
                    }
                  }
                }
              };
            })();
          },
          /* 6 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Composite = {};
            module2.exports = Composite;
            var Events2 = __webpack_require__(5);
            var Common2 = __webpack_require__(0);
            var Bounds = __webpack_require__(1);
            var Body2 = __webpack_require__(4);
            (function() {
              Composite.create = function(options) {
                return Common2.extend({
                  id: Common2.nextId(),
                  type: "composite",
                  parent: null,
                  isModified: false,
                  bodies: [],
                  constraints: [],
                  composites: [],
                  label: "Composite",
                  plugin: {},
                  cache: {
                    allBodies: null,
                    allConstraints: null,
                    allComposites: null
                  }
                }, options);
              };
              Composite.setModified = function(composite, isModified, updateParents, updateChildren) {
                composite.isModified = isModified;
                if (isModified && composite.cache) {
                  composite.cache.allBodies = null;
                  composite.cache.allConstraints = null;
                  composite.cache.allComposites = null;
                }
                if (updateParents && composite.parent) {
                  Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
                }
                if (updateChildren) {
                  for (var i = 0; i < composite.composites.length; i++) {
                    var childComposite = composite.composites[i];
                    Composite.setModified(childComposite, isModified, updateParents, updateChildren);
                  }
                }
              };
              Composite.add = function(composite, object) {
                var objects = [].concat(object);
                Events2.trigger(composite, "beforeAdd", { object });
                for (var i = 0; i < objects.length; i++) {
                  var obj = objects[i];
                  switch (obj.type) {
                    case "body":
                      if (obj.parent !== obj) {
                        Common2.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                        break;
                      }
                      Composite.addBody(composite, obj);
                      break;
                    case "constraint":
                      Composite.addConstraint(composite, obj);
                      break;
                    case "composite":
                      Composite.addComposite(composite, obj);
                      break;
                    case "mouseConstraint":
                      Composite.addConstraint(composite, obj.constraint);
                      break;
                  }
                }
                Events2.trigger(composite, "afterAdd", { object });
                return composite;
              };
              Composite.remove = function(composite, object, deep) {
                var objects = [].concat(object);
                Events2.trigger(composite, "beforeRemove", { object });
                for (var i = 0; i < objects.length; i++) {
                  var obj = objects[i];
                  switch (obj.type) {
                    case "body":
                      Composite.removeBody(composite, obj, deep);
                      break;
                    case "constraint":
                      Composite.removeConstraint(composite, obj, deep);
                      break;
                    case "composite":
                      Composite.removeComposite(composite, obj, deep);
                      break;
                    case "mouseConstraint":
                      Composite.removeConstraint(composite, obj.constraint);
                      break;
                  }
                }
                Events2.trigger(composite, "afterRemove", { object });
                return composite;
              };
              Composite.addComposite = function(compositeA, compositeB) {
                compositeA.composites.push(compositeB);
                compositeB.parent = compositeA;
                Composite.setModified(compositeA, true, true, false);
                return compositeA;
              };
              Composite.removeComposite = function(compositeA, compositeB, deep) {
                var position = Common2.indexOf(compositeA.composites, compositeB);
                if (position !== -1) {
                  var bodies = Composite.allBodies(compositeB);
                  Composite.removeCompositeAt(compositeA, position);
                  for (var i = 0; i < bodies.length; i++) {
                    bodies[i].sleepCounter = 0;
                  }
                }
                if (deep) {
                  for (var i = 0; i < compositeA.composites.length; i++) {
                    Composite.removeComposite(compositeA.composites[i], compositeB, true);
                  }
                }
                return compositeA;
              };
              Composite.removeCompositeAt = function(composite, position) {
                composite.composites.splice(position, 1);
                Composite.setModified(composite, true, true, false);
                return composite;
              };
              Composite.addBody = function(composite, body) {
                composite.bodies.push(body);
                Composite.setModified(composite, true, true, false);
                return composite;
              };
              Composite.removeBody = function(composite, body, deep) {
                var position = Common2.indexOf(composite.bodies, body);
                if (position !== -1) {
                  Composite.removeBodyAt(composite, position);
                  body.sleepCounter = 0;
                }
                if (deep) {
                  for (var i = 0; i < composite.composites.length; i++) {
                    Composite.removeBody(composite.composites[i], body, true);
                  }
                }
                return composite;
              };
              Composite.removeBodyAt = function(composite, position) {
                composite.bodies.splice(position, 1);
                Composite.setModified(composite, true, true, false);
                return composite;
              };
              Composite.addConstraint = function(composite, constraint) {
                composite.constraints.push(constraint);
                Composite.setModified(composite, true, true, false);
                return composite;
              };
              Composite.removeConstraint = function(composite, constraint, deep) {
                var position = Common2.indexOf(composite.constraints, constraint);
                if (position !== -1) {
                  Composite.removeConstraintAt(composite, position);
                }
                if (deep) {
                  for (var i = 0; i < composite.composites.length; i++) {
                    Composite.removeConstraint(composite.composites[i], constraint, true);
                  }
                }
                return composite;
              };
              Composite.removeConstraintAt = function(composite, position) {
                composite.constraints.splice(position, 1);
                Composite.setModified(composite, true, true, false);
                return composite;
              };
              Composite.clear = function(composite, keepStatic, deep) {
                if (deep) {
                  for (var i = 0; i < composite.composites.length; i++) {
                    Composite.clear(composite.composites[i], keepStatic, true);
                  }
                }
                if (keepStatic) {
                  composite.bodies = composite.bodies.filter(function(body) {
                    return body.isStatic;
                  });
                } else {
                  composite.bodies.length = 0;
                }
                composite.constraints.length = 0;
                composite.composites.length = 0;
                Composite.setModified(composite, true, true, false);
                return composite;
              };
              Composite.allBodies = function(composite) {
                if (composite.cache && composite.cache.allBodies) {
                  return composite.cache.allBodies;
                }
                var bodies = [].concat(composite.bodies);
                for (var i = 0; i < composite.composites.length; i++)
                  bodies = bodies.concat(Composite.allBodies(composite.composites[i]));
                if (composite.cache) {
                  composite.cache.allBodies = bodies;
                }
                return bodies;
              };
              Composite.allConstraints = function(composite) {
                if (composite.cache && composite.cache.allConstraints) {
                  return composite.cache.allConstraints;
                }
                var constraints = [].concat(composite.constraints);
                for (var i = 0; i < composite.composites.length; i++)
                  constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));
                if (composite.cache) {
                  composite.cache.allConstraints = constraints;
                }
                return constraints;
              };
              Composite.allComposites = function(composite) {
                if (composite.cache && composite.cache.allComposites) {
                  return composite.cache.allComposites;
                }
                var composites = [].concat(composite.composites);
                for (var i = 0; i < composite.composites.length; i++)
                  composites = composites.concat(Composite.allComposites(composite.composites[i]));
                if (composite.cache) {
                  composite.cache.allComposites = composites;
                }
                return composites;
              };
              Composite.get = function(composite, id, type) {
                var objects, object;
                switch (type) {
                  case "body":
                    objects = Composite.allBodies(composite);
                    break;
                  case "constraint":
                    objects = Composite.allConstraints(composite);
                    break;
                  case "composite":
                    objects = Composite.allComposites(composite).concat(composite);
                    break;
                }
                if (!objects)
                  return null;
                object = objects.filter(function(object2) {
                  return object2.id.toString() === id.toString();
                });
                return object.length === 0 ? null : object[0];
              };
              Composite.move = function(compositeA, objects, compositeB) {
                Composite.remove(compositeA, objects);
                Composite.add(compositeB, objects);
                return compositeA;
              };
              Composite.rebase = function(composite) {
                var objects = Composite.allBodies(composite).concat(Composite.allConstraints(composite)).concat(Composite.allComposites(composite));
                for (var i = 0; i < objects.length; i++) {
                  objects[i].id = Common2.nextId();
                }
                return composite;
              };
              Composite.translate = function(composite, translation, recursive) {
                var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
                for (var i = 0; i < bodies.length; i++) {
                  Body2.translate(bodies[i], translation);
                }
                return composite;
              };
              Composite.rotate = function(composite, rotation, point, recursive) {
                var cos = Math.cos(rotation), sin = Math.sin(rotation), bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
                  Body2.setPosition(body, {
                    x: point.x + (dx * cos - dy * sin),
                    y: point.y + (dx * sin + dy * cos)
                  });
                  Body2.rotate(body, rotation);
                }
                return composite;
              };
              Composite.scale = function(composite, scaleX, scaleY, point, recursive) {
                var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
                  Body2.setPosition(body, {
                    x: point.x + dx * scaleX,
                    y: point.y + dy * scaleY
                  });
                  Body2.scale(body, scaleX, scaleY);
                }
                return composite;
              };
              Composite.bounds = function(composite) {
                var bodies = Composite.allBodies(composite), vertices = [];
                for (var i = 0; i < bodies.length; i += 1) {
                  var body = bodies[i];
                  vertices.push(body.bounds.min, body.bounds.max);
                }
                return Bounds.create(vertices);
              };
            })();
          },
          /* 7 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Sleeping = {};
            module2.exports = Sleeping;
            var Body2 = __webpack_require__(4);
            var Events2 = __webpack_require__(5);
            var Common2 = __webpack_require__(0);
            (function() {
              Sleeping._motionWakeThreshold = 0.18;
              Sleeping._motionSleepThreshold = 0.08;
              Sleeping._minBias = 0.9;
              Sleeping.update = function(bodies, delta) {
                var timeScale = delta / Common2._baseDelta, motionSleepThreshold = Sleeping._motionSleepThreshold;
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], speed = Body2.getSpeed(body), angularSpeed = Body2.getAngularSpeed(body), motion = speed * speed + angularSpeed * angularSpeed;
                  if (body.force.x !== 0 || body.force.y !== 0) {
                    Sleeping.set(body, false);
                    continue;
                  }
                  var minMotion = Math.min(body.motion, motion), maxMotion = Math.max(body.motion, motion);
                  body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;
                  if (body.sleepThreshold > 0 && body.motion < motionSleepThreshold) {
                    body.sleepCounter += 1;
                    if (body.sleepCounter >= body.sleepThreshold / timeScale) {
                      Sleeping.set(body, true);
                    }
                  } else if (body.sleepCounter > 0) {
                    body.sleepCounter -= 1;
                  }
                }
              };
              Sleeping.afterCollisions = function(pairs) {
                var motionSleepThreshold = Sleeping._motionSleepThreshold;
                for (var i = 0; i < pairs.length; i++) {
                  var pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  var collision = pair.collision, bodyA = collision.bodyA.parent, bodyB = collision.bodyB.parent;
                  if (bodyA.isSleeping && bodyB.isSleeping || bodyA.isStatic || bodyB.isStatic)
                    continue;
                  if (bodyA.isSleeping || bodyB.isSleeping) {
                    var sleepingBody = bodyA.isSleeping && !bodyA.isStatic ? bodyA : bodyB, movingBody = sleepingBody === bodyA ? bodyB : bodyA;
                    if (!sleepingBody.isStatic && movingBody.motion > motionSleepThreshold) {
                      Sleeping.set(sleepingBody, false);
                    }
                  }
                }
              };
              Sleeping.set = function(body, isSleeping) {
                var wasSleeping = body.isSleeping;
                if (isSleeping) {
                  body.isSleeping = true;
                  body.sleepCounter = body.sleepThreshold;
                  body.positionImpulse.x = 0;
                  body.positionImpulse.y = 0;
                  body.positionPrev.x = body.position.x;
                  body.positionPrev.y = body.position.y;
                  body.anglePrev = body.angle;
                  body.speed = 0;
                  body.angularSpeed = 0;
                  body.motion = 0;
                  if (!wasSleeping) {
                    Events2.trigger(body, "sleepStart");
                  }
                } else {
                  body.isSleeping = false;
                  body.sleepCounter = 0;
                  if (wasSleeping) {
                    Events2.trigger(body, "sleepEnd");
                  }
                }
              };
            })();
          },
          /* 8 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Collision = {};
            module2.exports = Collision;
            var Vertices = __webpack_require__(3);
            var Pair = __webpack_require__(9);
            (function() {
              var _supports = [];
              var _overlapAB = {
                overlap: 0,
                axis: null
              };
              var _overlapBA = {
                overlap: 0,
                axis: null
              };
              Collision.create = function(bodyA, bodyB) {
                return {
                  pair: null,
                  collided: false,
                  bodyA,
                  bodyB,
                  parentA: bodyA.parent,
                  parentB: bodyB.parent,
                  depth: 0,
                  normal: { x: 0, y: 0 },
                  tangent: { x: 0, y: 0 },
                  penetration: { x: 0, y: 0 },
                  supports: [null, null],
                  supportCount: 0
                };
              };
              Collision.collides = function(bodyA, bodyB, pairs) {
                Collision._overlapAxes(_overlapAB, bodyA.vertices, bodyB.vertices, bodyA.axes);
                if (_overlapAB.overlap <= 0) {
                  return null;
                }
                Collision._overlapAxes(_overlapBA, bodyB.vertices, bodyA.vertices, bodyB.axes);
                if (_overlapBA.overlap <= 0) {
                  return null;
                }
                var pair = pairs && pairs.table[Pair.id(bodyA, bodyB)], collision;
                if (!pair) {
                  collision = Collision.create(bodyA, bodyB);
                  collision.collided = true;
                  collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
                  collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
                  collision.parentA = collision.bodyA.parent;
                  collision.parentB = collision.bodyB.parent;
                } else {
                  collision = pair.collision;
                }
                bodyA = collision.bodyA;
                bodyB = collision.bodyB;
                var minOverlap;
                if (_overlapAB.overlap < _overlapBA.overlap) {
                  minOverlap = _overlapAB;
                } else {
                  minOverlap = _overlapBA;
                }
                var normal = collision.normal, tangent = collision.tangent, penetration = collision.penetration, supports = collision.supports, depth = minOverlap.overlap, minAxis = minOverlap.axis, normalX = minAxis.x, normalY = minAxis.y, deltaX = bodyB.position.x - bodyA.position.x, deltaY = bodyB.position.y - bodyA.position.y;
                if (normalX * deltaX + normalY * deltaY >= 0) {
                  normalX = -normalX;
                  normalY = -normalY;
                }
                normal.x = normalX;
                normal.y = normalY;
                tangent.x = -normalY;
                tangent.y = normalX;
                penetration.x = normalX * depth;
                penetration.y = normalY * depth;
                collision.depth = depth;
                var supportsB = Collision._findSupports(bodyA, bodyB, normal, 1), supportCount = 0;
                if (Vertices.contains(bodyA.vertices, supportsB[0])) {
                  supports[supportCount++] = supportsB[0];
                }
                if (Vertices.contains(bodyA.vertices, supportsB[1])) {
                  supports[supportCount++] = supportsB[1];
                }
                if (supportCount < 2) {
                  var supportsA = Collision._findSupports(bodyB, bodyA, normal, -1);
                  if (Vertices.contains(bodyB.vertices, supportsA[0])) {
                    supports[supportCount++] = supportsA[0];
                  }
                  if (supportCount < 2 && Vertices.contains(bodyB.vertices, supportsA[1])) {
                    supports[supportCount++] = supportsA[1];
                  }
                }
                if (supportCount === 0) {
                  supports[supportCount++] = supportsB[0];
                }
                collision.supportCount = supportCount;
                return collision;
              };
              Collision._overlapAxes = function(result, verticesA, verticesB, axes) {
                var verticesALength = verticesA.length, verticesBLength = verticesB.length, verticesAX = verticesA[0].x, verticesAY = verticesA[0].y, verticesBX = verticesB[0].x, verticesBY = verticesB[0].y, axesLength = axes.length, overlapMin = Number.MAX_VALUE, overlapAxisNumber = 0, overlap, overlapAB, overlapBA, dot, i, j;
                for (i = 0; i < axesLength; i++) {
                  var axis = axes[i], axisX = axis.x, axisY = axis.y, minA = verticesAX * axisX + verticesAY * axisY, minB = verticesBX * axisX + verticesBY * axisY, maxA = minA, maxB = minB;
                  for (j = 1; j < verticesALength; j += 1) {
                    dot = verticesA[j].x * axisX + verticesA[j].y * axisY;
                    if (dot > maxA) {
                      maxA = dot;
                    } else if (dot < minA) {
                      minA = dot;
                    }
                  }
                  for (j = 1; j < verticesBLength; j += 1) {
                    dot = verticesB[j].x * axisX + verticesB[j].y * axisY;
                    if (dot > maxB) {
                      maxB = dot;
                    } else if (dot < minB) {
                      minB = dot;
                    }
                  }
                  overlapAB = maxA - minB;
                  overlapBA = maxB - minA;
                  overlap = overlapAB < overlapBA ? overlapAB : overlapBA;
                  if (overlap < overlapMin) {
                    overlapMin = overlap;
                    overlapAxisNumber = i;
                    if (overlap <= 0) {
                      break;
                    }
                  }
                }
                result.axis = axes[overlapAxisNumber];
                result.overlap = overlapMin;
              };
              Collision._findSupports = function(bodyA, bodyB, normal, direction) {
                var vertices = bodyB.vertices, verticesLength = vertices.length, bodyAPositionX = bodyA.position.x, bodyAPositionY = bodyA.position.y, normalX = normal.x * direction, normalY = normal.y * direction, vertexA = vertices[0], vertexB = vertexA, nearestDistance = normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y), vertexC, distance, j;
                for (j = 1; j < verticesLength; j += 1) {
                  vertexB = vertices[j];
                  distance = normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y);
                  if (distance < nearestDistance) {
                    nearestDistance = distance;
                    vertexA = vertexB;
                  }
                }
                vertexC = vertices[(verticesLength + vertexA.index - 1) % verticesLength];
                nearestDistance = normalX * (bodyAPositionX - vertexC.x) + normalY * (bodyAPositionY - vertexC.y);
                vertexB = vertices[(vertexA.index + 1) % verticesLength];
                if (normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y) < nearestDistance) {
                  _supports[0] = vertexA;
                  _supports[1] = vertexB;
                  return _supports;
                }
                _supports[0] = vertexA;
                _supports[1] = vertexC;
                return _supports;
              };
            })();
          },
          /* 9 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Pair = {};
            module2.exports = Pair;
            var Contact = __webpack_require__(16);
            (function() {
              Pair.create = function(collision, timestamp) {
                var bodyA = collision.bodyA, bodyB = collision.bodyB;
                var pair = {
                  id: Pair.id(bodyA, bodyB),
                  bodyA,
                  bodyB,
                  collision,
                  contacts: [Contact.create(), Contact.create()],
                  contactCount: 0,
                  separation: 0,
                  isActive: true,
                  isSensor: bodyA.isSensor || bodyB.isSensor,
                  timeCreated: timestamp,
                  timeUpdated: timestamp,
                  inverseMass: 0,
                  friction: 0,
                  frictionStatic: 0,
                  restitution: 0,
                  slop: 0
                };
                Pair.update(pair, collision, timestamp);
                return pair;
              };
              Pair.update = function(pair, collision, timestamp) {
                var supports = collision.supports, supportCount = collision.supportCount, contacts = pair.contacts, parentA = collision.parentA, parentB = collision.parentB;
                pair.isActive = true;
                pair.timeUpdated = timestamp;
                pair.collision = collision;
                pair.separation = collision.depth;
                pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
                pair.friction = parentA.friction < parentB.friction ? parentA.friction : parentB.friction;
                pair.frictionStatic = parentA.frictionStatic > parentB.frictionStatic ? parentA.frictionStatic : parentB.frictionStatic;
                pair.restitution = parentA.restitution > parentB.restitution ? parentA.restitution : parentB.restitution;
                pair.slop = parentA.slop > parentB.slop ? parentA.slop : parentB.slop;
                pair.contactCount = supportCount;
                collision.pair = pair;
                var supportA = supports[0], contactA = contacts[0], supportB = supports[1], contactB = contacts[1];
                if (contactB.vertex === supportA || contactA.vertex === supportB) {
                  contacts[1] = contactA;
                  contacts[0] = contactA = contactB;
                  contactB = contacts[1];
                }
                contactA.vertex = supportA;
                contactB.vertex = supportB;
              };
              Pair.setActive = function(pair, isActive, timestamp) {
                if (isActive) {
                  pair.isActive = true;
                  pair.timeUpdated = timestamp;
                } else {
                  pair.isActive = false;
                  pair.contactCount = 0;
                }
              };
              Pair.id = function(bodyA, bodyB) {
                return bodyA.id < bodyB.id ? bodyA.id.toString(36) + ":" + bodyB.id.toString(36) : bodyB.id.toString(36) + ":" + bodyA.id.toString(36);
              };
            })();
          },
          /* 10 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Constraint = {};
            module2.exports = Constraint;
            var Vertices = __webpack_require__(3);
            var Vector2 = __webpack_require__(2);
            var Sleeping = __webpack_require__(7);
            var Bounds = __webpack_require__(1);
            var Axes = __webpack_require__(11);
            var Common2 = __webpack_require__(0);
            (function() {
              Constraint._warming = 0.4;
              Constraint._torqueDampen = 1;
              Constraint._minLength = 1e-6;
              Constraint.create = function(options) {
                var constraint = options;
                if (constraint.bodyA && !constraint.pointA)
                  constraint.pointA = { x: 0, y: 0 };
                if (constraint.bodyB && !constraint.pointB)
                  constraint.pointB = { x: 0, y: 0 };
                var initialPointA = constraint.bodyA ? Vector2.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA, initialPointB = constraint.bodyB ? Vector2.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB, length = Vector2.magnitude(Vector2.sub(initialPointA, initialPointB));
                constraint.length = typeof constraint.length !== "undefined" ? constraint.length : length;
                constraint.id = constraint.id || Common2.nextId();
                constraint.label = constraint.label || "Constraint";
                constraint.type = "constraint";
                constraint.stiffness = constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
                constraint.damping = constraint.damping || 0;
                constraint.angularStiffness = constraint.angularStiffness || 0;
                constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
                constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;
                constraint.plugin = {};
                var render = {
                  visible: true,
                  lineWidth: 2,
                  strokeStyle: "#ffffff",
                  type: "line",
                  anchors: true
                };
                if (constraint.length === 0 && constraint.stiffness > 0.1) {
                  render.type = "pin";
                  render.anchors = false;
                } else if (constraint.stiffness < 0.9) {
                  render.type = "spring";
                }
                constraint.render = Common2.extend(render, constraint.render);
                return constraint;
              };
              Constraint.preSolveAll = function(bodies) {
                for (var i = 0; i < bodies.length; i += 1) {
                  var body = bodies[i], impulse = body.constraintImpulse;
                  if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                    continue;
                  }
                  body.position.x += impulse.x;
                  body.position.y += impulse.y;
                  body.angle += impulse.angle;
                }
              };
              Constraint.solveAll = function(constraints, delta) {
                var timeScale = Common2.clamp(delta / Common2._baseDelta, 0, 1);
                for (var i = 0; i < constraints.length; i += 1) {
                  var constraint = constraints[i], fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic, fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
                  if (fixedA || fixedB) {
                    Constraint.solve(constraints[i], timeScale);
                  }
                }
                for (i = 0; i < constraints.length; i += 1) {
                  constraint = constraints[i];
                  fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic;
                  fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
                  if (!fixedA && !fixedB) {
                    Constraint.solve(constraints[i], timeScale);
                  }
                }
              };
              Constraint.solve = function(constraint, timeScale) {
                var bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointA = constraint.pointA, pointB = constraint.pointB;
                if (!bodyA && !bodyB)
                  return;
                if (bodyA && !bodyA.isStatic) {
                  Vector2.rotate(pointA, bodyA.angle - constraint.angleA, pointA);
                  constraint.angleA = bodyA.angle;
                }
                if (bodyB && !bodyB.isStatic) {
                  Vector2.rotate(pointB, bodyB.angle - constraint.angleB, pointB);
                  constraint.angleB = bodyB.angle;
                }
                var pointAWorld = pointA, pointBWorld = pointB;
                if (bodyA) pointAWorld = Vector2.add(bodyA.position, pointA);
                if (bodyB) pointBWorld = Vector2.add(bodyB.position, pointB);
                if (!pointAWorld || !pointBWorld)
                  return;
                var delta = Vector2.sub(pointAWorld, pointBWorld), currentLength = Vector2.magnitude(delta);
                if (currentLength < Constraint._minLength) {
                  currentLength = Constraint._minLength;
                }
                var difference = (currentLength - constraint.length) / currentLength, isRigid = constraint.stiffness >= 1 || constraint.length === 0, stiffness = isRigid ? constraint.stiffness * timeScale : constraint.stiffness * timeScale * timeScale, damping = constraint.damping * timeScale, force = Vector2.mult(delta, difference * stiffness), massTotal = (bodyA ? bodyA.inverseMass : 0) + (bodyB ? bodyB.inverseMass : 0), inertiaTotal = (bodyA ? bodyA.inverseInertia : 0) + (bodyB ? bodyB.inverseInertia : 0), resistanceTotal = massTotal + inertiaTotal, torque, share, normal, normalVelocity, relativeVelocity;
                if (damping > 0) {
                  var zero = Vector2.create();
                  normal = Vector2.div(delta, currentLength);
                  relativeVelocity = Vector2.sub(
                    bodyB && Vector2.sub(bodyB.position, bodyB.positionPrev) || zero,
                    bodyA && Vector2.sub(bodyA.position, bodyA.positionPrev) || zero
                  );
                  normalVelocity = Vector2.dot(normal, relativeVelocity);
                }
                if (bodyA && !bodyA.isStatic) {
                  share = bodyA.inverseMass / massTotal;
                  bodyA.constraintImpulse.x -= force.x * share;
                  bodyA.constraintImpulse.y -= force.y * share;
                  bodyA.position.x -= force.x * share;
                  bodyA.position.y -= force.y * share;
                  if (damping > 0) {
                    bodyA.positionPrev.x -= damping * normal.x * normalVelocity * share;
                    bodyA.positionPrev.y -= damping * normal.y * normalVelocity * share;
                  }
                  torque = Vector2.cross(pointA, force) / resistanceTotal * Constraint._torqueDampen * bodyA.inverseInertia * (1 - constraint.angularStiffness);
                  bodyA.constraintImpulse.angle -= torque;
                  bodyA.angle -= torque;
                }
                if (bodyB && !bodyB.isStatic) {
                  share = bodyB.inverseMass / massTotal;
                  bodyB.constraintImpulse.x += force.x * share;
                  bodyB.constraintImpulse.y += force.y * share;
                  bodyB.position.x += force.x * share;
                  bodyB.position.y += force.y * share;
                  if (damping > 0) {
                    bodyB.positionPrev.x += damping * normal.x * normalVelocity * share;
                    bodyB.positionPrev.y += damping * normal.y * normalVelocity * share;
                  }
                  torque = Vector2.cross(pointB, force) / resistanceTotal * Constraint._torqueDampen * bodyB.inverseInertia * (1 - constraint.angularStiffness);
                  bodyB.constraintImpulse.angle += torque;
                  bodyB.angle += torque;
                }
              };
              Constraint.postSolveAll = function(bodies) {
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], impulse = body.constraintImpulse;
                  if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                    continue;
                  }
                  Sleeping.set(body, false);
                  for (var j = 0; j < body.parts.length; j++) {
                    var part = body.parts[j];
                    Vertices.translate(part.vertices, impulse);
                    if (j > 0) {
                      part.position.x += impulse.x;
                      part.position.y += impulse.y;
                    }
                    if (impulse.angle !== 0) {
                      Vertices.rotate(part.vertices, impulse.angle, body.position);
                      Axes.rotate(part.axes, impulse.angle);
                      if (j > 0) {
                        Vector2.rotateAbout(part.position, impulse.angle, body.position, part.position);
                      }
                    }
                    Bounds.update(part.bounds, part.vertices, body.velocity);
                  }
                  impulse.angle *= Constraint._warming;
                  impulse.x *= Constraint._warming;
                  impulse.y *= Constraint._warming;
                }
              };
              Constraint.pointAWorld = function(constraint) {
                return {
                  x: (constraint.bodyA ? constraint.bodyA.position.x : 0) + (constraint.pointA ? constraint.pointA.x : 0),
                  y: (constraint.bodyA ? constraint.bodyA.position.y : 0) + (constraint.pointA ? constraint.pointA.y : 0)
                };
              };
              Constraint.pointBWorld = function(constraint) {
                return {
                  x: (constraint.bodyB ? constraint.bodyB.position.x : 0) + (constraint.pointB ? constraint.pointB.x : 0),
                  y: (constraint.bodyB ? constraint.bodyB.position.y : 0) + (constraint.pointB ? constraint.pointB.y : 0)
                };
              };
              Constraint.currentLength = function(constraint) {
                var pointAX = (constraint.bodyA ? constraint.bodyA.position.x : 0) + (constraint.pointA ? constraint.pointA.x : 0);
                var pointAY = (constraint.bodyA ? constraint.bodyA.position.y : 0) + (constraint.pointA ? constraint.pointA.y : 0);
                var pointBX = (constraint.bodyB ? constraint.bodyB.position.x : 0) + (constraint.pointB ? constraint.pointB.x : 0);
                var pointBY = (constraint.bodyB ? constraint.bodyB.position.y : 0) + (constraint.pointB ? constraint.pointB.y : 0);
                var deltaX = pointAX - pointBX;
                var deltaY = pointAY - pointBY;
                return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
              };
            })();
          },
          /* 11 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Axes = {};
            module2.exports = Axes;
            var Vector2 = __webpack_require__(2);
            var Common2 = __webpack_require__(0);
            (function() {
              Axes.fromVertices = function(vertices) {
                var axes = {};
                for (var i = 0; i < vertices.length; i++) {
                  var j = (i + 1) % vertices.length, normal = Vector2.normalise({
                    x: vertices[j].y - vertices[i].y,
                    y: vertices[i].x - vertices[j].x
                  }), gradient = normal.y === 0 ? Infinity : normal.x / normal.y;
                  gradient = gradient.toFixed(3).toString();
                  axes[gradient] = normal;
                }
                return Common2.values(axes);
              };
              Axes.rotate = function(axes, angle) {
                if (angle === 0)
                  return;
                var cos = Math.cos(angle), sin = Math.sin(angle);
                for (var i = 0; i < axes.length; i++) {
                  var axis = axes[i], xx;
                  xx = axis.x * cos - axis.y * sin;
                  axis.y = axis.x * sin + axis.y * cos;
                  axis.x = xx;
                }
              };
            })();
          },
          /* 12 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Bodies2 = {};
            module2.exports = Bodies2;
            var Vertices = __webpack_require__(3);
            var Common2 = __webpack_require__(0);
            var Body2 = __webpack_require__(4);
            var Bounds = __webpack_require__(1);
            var Vector2 = __webpack_require__(2);
            (function() {
              Bodies2.rectangle = function(x2, y2, width, height, options) {
                options = options || {};
                var rectangle = {
                  label: "Rectangle Body",
                  position: { x: x2, y: y2 },
                  vertices: Vertices.fromPath("L 0 0 L " + width + " 0 L " + width + " " + height + " L 0 " + height)
                };
                if (options.chamfer) {
                  var chamfer = options.chamfer;
                  rectangle.vertices = Vertices.chamfer(
                    rectangle.vertices,
                    chamfer.radius,
                    chamfer.quality,
                    chamfer.qualityMin,
                    chamfer.qualityMax
                  );
                  delete options.chamfer;
                }
                return Body2.create(Common2.extend({}, rectangle, options));
              };
              Bodies2.trapezoid = function(x2, y2, width, height, slope, options) {
                options = options || {};
                if (slope >= 1) {
                  Common2.warn("Bodies.trapezoid: slope parameter must be < 1.");
                }
                slope *= 0.5;
                var roof = (1 - slope * 2) * width;
                var x1 = width * slope, x22 = x1 + roof, x3 = x22 + x1, verticesPath;
                if (slope < 0.5) {
                  verticesPath = "L 0 0 L " + x1 + " " + -height + " L " + x22 + " " + -height + " L " + x3 + " 0";
                } else {
                  verticesPath = "L 0 0 L " + x22 + " " + -height + " L " + x3 + " 0";
                }
                var trapezoid = {
                  label: "Trapezoid Body",
                  position: { x: x2, y: y2 },
                  vertices: Vertices.fromPath(verticesPath)
                };
                if (options.chamfer) {
                  var chamfer = options.chamfer;
                  trapezoid.vertices = Vertices.chamfer(
                    trapezoid.vertices,
                    chamfer.radius,
                    chamfer.quality,
                    chamfer.qualityMin,
                    chamfer.qualityMax
                  );
                  delete options.chamfer;
                }
                return Body2.create(Common2.extend({}, trapezoid, options));
              };
              Bodies2.circle = function(x2, y2, radius, options, maxSides) {
                options = options || {};
                var circle = {
                  label: "Circle Body",
                  circleRadius: radius
                };
                maxSides = maxSides || 25;
                var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));
                if (sides % 2 === 1)
                  sides += 1;
                return Bodies2.polygon(x2, y2, sides, radius, Common2.extend({}, circle, options));
              };
              Bodies2.polygon = function(x2, y2, sides, radius, options) {
                options = options || {};
                if (sides < 3)
                  return Bodies2.circle(x2, y2, radius, options);
                var theta = 2 * Math.PI / sides, path = "", offset = theta * 0.5;
                for (var i = 0; i < sides; i += 1) {
                  var angle = offset + i * theta, xx = Math.cos(angle) * radius, yy = Math.sin(angle) * radius;
                  path += "L " + xx.toFixed(3) + " " + yy.toFixed(3) + " ";
                }
                var polygon = {
                  label: "Polygon Body",
                  position: { x: x2, y: y2 },
                  vertices: Vertices.fromPath(path)
                };
                if (options.chamfer) {
                  var chamfer = options.chamfer;
                  polygon.vertices = Vertices.chamfer(
                    polygon.vertices,
                    chamfer.radius,
                    chamfer.quality,
                    chamfer.qualityMin,
                    chamfer.qualityMax
                  );
                  delete options.chamfer;
                }
                return Body2.create(Common2.extend({}, polygon, options));
              };
              Bodies2.fromVertices = function(x2, y2, vertexSets, options, flagInternal, removeCollinear, minimumArea, removeDuplicatePoints) {
                var decomp = Common2.getDecomp(), canDecomp, body, parts, isConvex, isConcave, vertices, i, j, k, v2, z2;
                canDecomp = Boolean(decomp && decomp.quickDecomp);
                options = options || {};
                parts = [];
                flagInternal = typeof flagInternal !== "undefined" ? flagInternal : false;
                removeCollinear = typeof removeCollinear !== "undefined" ? removeCollinear : 0.01;
                minimumArea = typeof minimumArea !== "undefined" ? minimumArea : 10;
                removeDuplicatePoints = typeof removeDuplicatePoints !== "undefined" ? removeDuplicatePoints : 0.01;
                if (!Common2.isArray(vertexSets[0])) {
                  vertexSets = [vertexSets];
                }
                for (v2 = 0; v2 < vertexSets.length; v2 += 1) {
                  vertices = vertexSets[v2];
                  isConvex = Vertices.isConvex(vertices);
                  isConcave = !isConvex;
                  if (isConcave && !canDecomp) {
                    Common2.warnOnce(
                      "Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."
                    );
                  }
                  if (isConvex || !canDecomp) {
                    if (isConvex) {
                      vertices = Vertices.clockwiseSort(vertices);
                    } else {
                      vertices = Vertices.hull(vertices);
                    }
                    parts.push({
                      position: { x: x2, y: y2 },
                      vertices
                    });
                  } else {
                    var concave = vertices.map(function(vertex) {
                      return [vertex.x, vertex.y];
                    });
                    decomp.makeCCW(concave);
                    if (removeCollinear !== false)
                      decomp.removeCollinearPoints(concave, removeCollinear);
                    if (removeDuplicatePoints !== false && decomp.removeDuplicatePoints)
                      decomp.removeDuplicatePoints(concave, removeDuplicatePoints);
                    var decomposed = decomp.quickDecomp(concave);
                    for (i = 0; i < decomposed.length; i++) {
                      var chunk = decomposed[i];
                      var chunkVertices = chunk.map(function(vertices2) {
                        return {
                          x: vertices2[0],
                          y: vertices2[1]
                        };
                      });
                      if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea)
                        continue;
                      parts.push({
                        position: Vertices.centre(chunkVertices),
                        vertices: chunkVertices
                      });
                    }
                  }
                }
                for (i = 0; i < parts.length; i++) {
                  parts[i] = Body2.create(Common2.extend(parts[i], options));
                }
                if (flagInternal) {
                  var coincident_max_dist = 5;
                  for (i = 0; i < parts.length; i++) {
                    var partA = parts[i];
                    for (j = i + 1; j < parts.length; j++) {
                      var partB = parts[j];
                      if (Bounds.overlaps(partA.bounds, partB.bounds)) {
                        var pav = partA.vertices, pbv = partB.vertices;
                        for (k = 0; k < partA.vertices.length; k++) {
                          for (z2 = 0; z2 < partB.vertices.length; z2++) {
                            var da = Vector2.magnitudeSquared(Vector2.sub(pav[(k + 1) % pav.length], pbv[z2])), db = Vector2.magnitudeSquared(Vector2.sub(pav[k], pbv[(z2 + 1) % pbv.length]));
                            if (da < coincident_max_dist && db < coincident_max_dist) {
                              pav[k].isInternal = true;
                              pbv[z2].isInternal = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if (parts.length > 1) {
                  body = Body2.create(Common2.extend({ parts: parts.slice(0) }, options));
                  Body2.setPosition(body, { x: x2, y: y2 });
                  return body;
                } else {
                  return parts[0];
                }
              };
            })();
          },
          /* 13 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Detector = {};
            module2.exports = Detector;
            var Common2 = __webpack_require__(0);
            var Collision = __webpack_require__(8);
            (function() {
              Detector.create = function(options) {
                var defaults = {
                  bodies: [],
                  collisions: [],
                  pairs: null
                };
                return Common2.extend(defaults, options);
              };
              Detector.setBodies = function(detector, bodies) {
                detector.bodies = bodies.slice(0);
              };
              Detector.clear = function(detector) {
                detector.bodies = [];
                detector.collisions = [];
              };
              Detector.collisions = function(detector) {
                var pairs = detector.pairs, bodies = detector.bodies, bodiesLength = bodies.length, canCollide = Detector.canCollide, collides = Collision.collides, collisions = detector.collisions, collisionIndex = 0, i, j;
                bodies.sort(Detector._compareBoundsX);
                for (i = 0; i < bodiesLength; i++) {
                  var bodyA = bodies[i], boundsA = bodyA.bounds, boundXMax = bodyA.bounds.max.x, boundYMax = bodyA.bounds.max.y, boundYMin = bodyA.bounds.min.y, bodyAStatic = bodyA.isStatic || bodyA.isSleeping, partsALength = bodyA.parts.length, partsASingle = partsALength === 1;
                  for (j = i + 1; j < bodiesLength; j++) {
                    var bodyB = bodies[j], boundsB = bodyB.bounds;
                    if (boundsB.min.x > boundXMax) {
                      break;
                    }
                    if (boundYMax < boundsB.min.y || boundYMin > boundsB.max.y) {
                      continue;
                    }
                    if (bodyAStatic && (bodyB.isStatic || bodyB.isSleeping)) {
                      continue;
                    }
                    if (!canCollide(bodyA.collisionFilter, bodyB.collisionFilter)) {
                      continue;
                    }
                    var partsBLength = bodyB.parts.length;
                    if (partsASingle && partsBLength === 1) {
                      var collision = collides(bodyA, bodyB, pairs);
                      if (collision) {
                        collisions[collisionIndex++] = collision;
                      }
                    } else {
                      var partsAStart = partsALength > 1 ? 1 : 0, partsBStart = partsBLength > 1 ? 1 : 0;
                      for (var k = partsAStart; k < partsALength; k++) {
                        var partA = bodyA.parts[k], boundsA = partA.bounds;
                        for (var z2 = partsBStart; z2 < partsBLength; z2++) {
                          var partB = bodyB.parts[z2], boundsB = partB.bounds;
                          if (boundsA.min.x > boundsB.max.x || boundsA.max.x < boundsB.min.x || boundsA.max.y < boundsB.min.y || boundsA.min.y > boundsB.max.y) {
                            continue;
                          }
                          var collision = collides(partA, partB, pairs);
                          if (collision) {
                            collisions[collisionIndex++] = collision;
                          }
                        }
                      }
                    }
                  }
                }
                if (collisions.length !== collisionIndex) {
                  collisions.length = collisionIndex;
                }
                return collisions;
              };
              Detector.canCollide = function(filterA, filterB) {
                if (filterA.group === filterB.group && filterA.group !== 0)
                  return filterA.group > 0;
                return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
              };
              Detector._compareBoundsX = function(bodyA, bodyB) {
                return bodyA.bounds.min.x - bodyB.bounds.min.x;
              };
            })();
          },
          /* 14 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Mouse = {};
            module2.exports = Mouse;
            var Common2 = __webpack_require__(0);
            (function() {
              Mouse.create = function(element) {
                var mouse = {};
                if (!element) {
                  Common2.log("Mouse.create: element was undefined, defaulting to document.body", "warn");
                }
                mouse.element = element || document.body;
                mouse.absolute = { x: 0, y: 0 };
                mouse.position = { x: 0, y: 0 };
                mouse.mousedownPosition = { x: 0, y: 0 };
                mouse.mouseupPosition = { x: 0, y: 0 };
                mouse.offset = { x: 0, y: 0 };
                mouse.scale = { x: 1, y: 1 };
                mouse.wheelDelta = 0;
                mouse.button = -1;
                mouse.pixelRatio = parseInt(mouse.element.getAttribute("data-pixel-ratio"), 10) || 1;
                mouse.sourceEvents = {
                  mousemove: null,
                  mousedown: null,
                  mouseup: null,
                  mousewheel: null
                };
                mouse.mousemove = function(event) {
                  var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
                  if (touches) {
                    mouse.button = 0;
                    event.preventDefault();
                  }
                  mouse.absolute.x = position.x;
                  mouse.absolute.y = position.y;
                  mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                  mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                  mouse.sourceEvents.mousemove = event;
                };
                mouse.mousedown = function(event) {
                  var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
                  if (touches) {
                    mouse.button = 0;
                    event.preventDefault();
                  } else {
                    mouse.button = event.button;
                  }
                  mouse.absolute.x = position.x;
                  mouse.absolute.y = position.y;
                  mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                  mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                  mouse.mousedownPosition.x = mouse.position.x;
                  mouse.mousedownPosition.y = mouse.position.y;
                  mouse.sourceEvents.mousedown = event;
                };
                mouse.mouseup = function(event) {
                  var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
                  if (touches) {
                    event.preventDefault();
                  }
                  mouse.button = -1;
                  mouse.absolute.x = position.x;
                  mouse.absolute.y = position.y;
                  mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                  mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                  mouse.mouseupPosition.x = mouse.position.x;
                  mouse.mouseupPosition.y = mouse.position.y;
                  mouse.sourceEvents.mouseup = event;
                };
                mouse.mousewheel = function(event) {
                  mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
                  event.preventDefault();
                  mouse.sourceEvents.mousewheel = event;
                };
                Mouse.setElement(mouse, mouse.element);
                return mouse;
              };
              Mouse.setElement = function(mouse, element) {
                mouse.element = element;
                element.addEventListener("mousemove", mouse.mousemove, { passive: true });
                element.addEventListener("mousedown", mouse.mousedown, { passive: true });
                element.addEventListener("mouseup", mouse.mouseup, { passive: true });
                element.addEventListener("wheel", mouse.mousewheel, { passive: false });
                element.addEventListener("touchmove", mouse.mousemove, { passive: false });
                element.addEventListener("touchstart", mouse.mousedown, { passive: false });
                element.addEventListener("touchend", mouse.mouseup, { passive: false });
              };
              Mouse.clearSourceEvents = function(mouse) {
                mouse.sourceEvents.mousemove = null;
                mouse.sourceEvents.mousedown = null;
                mouse.sourceEvents.mouseup = null;
                mouse.sourceEvents.mousewheel = null;
                mouse.wheelDelta = 0;
              };
              Mouse.setOffset = function(mouse, offset) {
                mouse.offset.x = offset.x;
                mouse.offset.y = offset.y;
                mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              };
              Mouse.setScale = function(mouse, scale) {
                mouse.scale.x = scale.x;
                mouse.scale.y = scale.y;
                mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              };
              Mouse._getRelativeMousePosition = function(event, element, pixelRatio) {
                var elementBounds = element.getBoundingClientRect(), rootNode = document.documentElement || document.body.parentNode || document.body, scrollX = window.pageXOffset !== void 0 ? window.pageXOffset : rootNode.scrollLeft, scrollY = window.pageYOffset !== void 0 ? window.pageYOffset : rootNode.scrollTop, touches = event.changedTouches, x2, y2;
                if (touches) {
                  x2 = touches[0].pageX - elementBounds.left - scrollX;
                  y2 = touches[0].pageY - elementBounds.top - scrollY;
                } else {
                  x2 = event.pageX - elementBounds.left - scrollX;
                  y2 = event.pageY - elementBounds.top - scrollY;
                }
                return {
                  x: x2 / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
                  y: y2 / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio)
                };
              };
            })();
          },
          /* 15 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Plugin = {};
            module2.exports = Plugin;
            var Common2 = __webpack_require__(0);
            (function() {
              Plugin._registry = {};
              Plugin.register = function(plugin) {
                if (!Plugin.isPlugin(plugin)) {
                  Common2.warn("Plugin.register:", Plugin.toString(plugin), "does not implement all required fields.");
                }
                if (plugin.name in Plugin._registry) {
                  var registered = Plugin._registry[plugin.name], pluginVersion = Plugin.versionParse(plugin.version).number, registeredVersion = Plugin.versionParse(registered.version).number;
                  if (pluginVersion > registeredVersion) {
                    Common2.warn("Plugin.register:", Plugin.toString(registered), "was upgraded to", Plugin.toString(plugin));
                    Plugin._registry[plugin.name] = plugin;
                  } else if (pluginVersion < registeredVersion) {
                    Common2.warn("Plugin.register:", Plugin.toString(registered), "can not be downgraded to", Plugin.toString(plugin));
                  } else if (plugin !== registered) {
                    Common2.warn("Plugin.register:", Plugin.toString(plugin), "is already registered to different plugin object");
                  }
                } else {
                  Plugin._registry[plugin.name] = plugin;
                }
                return plugin;
              };
              Plugin.resolve = function(dependency) {
                return Plugin._registry[Plugin.dependencyParse(dependency).name];
              };
              Plugin.toString = function(plugin) {
                return typeof plugin === "string" ? plugin : (plugin.name || "anonymous") + "@" + (plugin.version || plugin.range || "0.0.0");
              };
              Plugin.isPlugin = function(obj) {
                return obj && obj.name && obj.version && obj.install;
              };
              Plugin.isUsed = function(module3, name) {
                return module3.used.indexOf(name) > -1;
              };
              Plugin.isFor = function(plugin, module3) {
                var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
                return !plugin.for || module3.name === parsed.name && Plugin.versionSatisfies(module3.version, parsed.range);
              };
              Plugin.use = function(module3, plugins) {
                module3.uses = (module3.uses || []).concat(plugins || []);
                if (module3.uses.length === 0) {
                  Common2.warn("Plugin.use:", Plugin.toString(module3), "does not specify any dependencies to install.");
                  return;
                }
                var dependencies = Plugin.dependencies(module3), sortedDependencies = Common2.topologicalSort(dependencies), status = [];
                for (var i = 0; i < sortedDependencies.length; i += 1) {
                  if (sortedDependencies[i] === module3.name) {
                    continue;
                  }
                  var plugin = Plugin.resolve(sortedDependencies[i]);
                  if (!plugin) {
                    status.push("❌ " + sortedDependencies[i]);
                    continue;
                  }
                  if (Plugin.isUsed(module3, plugin.name)) {
                    continue;
                  }
                  if (!Plugin.isFor(plugin, module3)) {
                    Common2.warn("Plugin.use:", Plugin.toString(plugin), "is for", plugin.for, "but installed on", Plugin.toString(module3) + ".");
                    plugin._warned = true;
                  }
                  if (plugin.install) {
                    plugin.install(module3);
                  } else {
                    Common2.warn("Plugin.use:", Plugin.toString(plugin), "does not specify an install function.");
                    plugin._warned = true;
                  }
                  if (plugin._warned) {
                    status.push("🔶 " + Plugin.toString(plugin));
                    delete plugin._warned;
                  } else {
                    status.push("✅ " + Plugin.toString(plugin));
                  }
                  module3.used.push(plugin.name);
                }
                if (status.length > 0) {
                  Common2.info(status.join("  "));
                }
              };
              Plugin.dependencies = function(module3, tracked) {
                var parsedBase = Plugin.dependencyParse(module3), name = parsedBase.name;
                tracked = tracked || {};
                if (name in tracked) {
                  return;
                }
                module3 = Plugin.resolve(module3) || module3;
                tracked[name] = Common2.map(module3.uses || [], function(dependency) {
                  if (Plugin.isPlugin(dependency)) {
                    Plugin.register(dependency);
                  }
                  var parsed = Plugin.dependencyParse(dependency), resolved = Plugin.resolve(dependency);
                  if (resolved && !Plugin.versionSatisfies(resolved.version, parsed.range)) {
                    Common2.warn(
                      "Plugin.dependencies:",
                      Plugin.toString(resolved),
                      "does not satisfy",
                      Plugin.toString(parsed),
                      "used by",
                      Plugin.toString(parsedBase) + "."
                    );
                    resolved._warned = true;
                    module3._warned = true;
                  } else if (!resolved) {
                    Common2.warn(
                      "Plugin.dependencies:",
                      Plugin.toString(dependency),
                      "used by",
                      Plugin.toString(parsedBase),
                      "could not be resolved."
                    );
                    module3._warned = true;
                  }
                  return parsed.name;
                });
                for (var i = 0; i < tracked[name].length; i += 1) {
                  Plugin.dependencies(tracked[name][i], tracked);
                }
                return tracked;
              };
              Plugin.dependencyParse = function(dependency) {
                if (Common2.isString(dependency)) {
                  var pattern = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;
                  if (!pattern.test(dependency)) {
                    Common2.warn("Plugin.dependencyParse:", dependency, "is not a valid dependency string.");
                  }
                  return {
                    name: dependency.split("@")[0],
                    range: dependency.split("@")[1] || "*"
                  };
                }
                return {
                  name: dependency.name,
                  range: dependency.range || dependency.version
                };
              };
              Plugin.versionParse = function(range) {
                var pattern = /^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;
                if (!pattern.test(range)) {
                  Common2.warn("Plugin.versionParse:", range, "is not a valid version or range.");
                }
                var parts = pattern.exec(range);
                var major = Number(parts[4]);
                var minor = Number(parts[5]);
                var patch = Number(parts[6]);
                return {
                  isRange: Boolean(parts[1] || parts[2]),
                  version: parts[3],
                  range,
                  operator: parts[1] || parts[2] || "",
                  major,
                  minor,
                  patch,
                  parts: [major, minor, patch],
                  prerelease: parts[7],
                  number: major * 1e8 + minor * 1e4 + patch
                };
              };
              Plugin.versionSatisfies = function(version, range) {
                range = range || "*";
                var r2 = Plugin.versionParse(range), v2 = Plugin.versionParse(version);
                if (r2.isRange) {
                  if (r2.operator === "*" || version === "*") {
                    return true;
                  }
                  if (r2.operator === ">") {
                    return v2.number > r2.number;
                  }
                  if (r2.operator === ">=") {
                    return v2.number >= r2.number;
                  }
                  if (r2.operator === "~") {
                    return v2.major === r2.major && v2.minor === r2.minor && v2.patch >= r2.patch;
                  }
                  if (r2.operator === "^") {
                    if (r2.major > 0) {
                      return v2.major === r2.major && v2.number >= r2.number;
                    }
                    if (r2.minor > 0) {
                      return v2.minor === r2.minor && v2.patch >= r2.patch;
                    }
                    return v2.patch === r2.patch;
                  }
                }
                return version === range || version === "*";
              };
            })();
          },
          /* 16 */
          /***/
          function(module2, exports2) {
            var Contact = {};
            module2.exports = Contact;
            (function() {
              Contact.create = function(vertex) {
                return {
                  vertex,
                  normalImpulse: 0,
                  tangentImpulse: 0
                };
              };
            })();
          },
          /* 17 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Engine2 = {};
            module2.exports = Engine2;
            var Sleeping = __webpack_require__(7);
            var Resolver = __webpack_require__(18);
            var Detector = __webpack_require__(13);
            var Pairs = __webpack_require__(19);
            var Events2 = __webpack_require__(5);
            var Composite = __webpack_require__(6);
            var Constraint = __webpack_require__(10);
            var Common2 = __webpack_require__(0);
            var Body2 = __webpack_require__(4);
            (function() {
              Engine2._deltaMax = 1e3 / 60;
              Engine2.create = function(options) {
                options = options || {};
                var defaults = {
                  positionIterations: 6,
                  velocityIterations: 4,
                  constraintIterations: 2,
                  enableSleeping: false,
                  events: [],
                  plugin: {},
                  gravity: {
                    x: 0,
                    y: 1,
                    scale: 1e-3
                  },
                  timing: {
                    timestamp: 0,
                    timeScale: 1,
                    lastDelta: 0,
                    lastElapsed: 0,
                    lastUpdatesPerFrame: 0
                  }
                };
                var engine = Common2.extend(defaults, options);
                engine.world = options.world || Composite.create({ label: "World" });
                engine.pairs = options.pairs || Pairs.create();
                engine.detector = options.detector || Detector.create();
                engine.detector.pairs = engine.pairs;
                engine.grid = { buckets: [] };
                engine.world.gravity = engine.gravity;
                engine.broadphase = engine.grid;
                engine.metrics = {};
                return engine;
              };
              Engine2.update = function(engine, delta) {
                var startTime = Common2.now();
                var world = engine.world, detector = engine.detector, pairs = engine.pairs, timing = engine.timing, timestamp = timing.timestamp, i;
                if (delta > Engine2._deltaMax) {
                  Common2.warnOnce(
                    "Matter.Engine.update: delta argument is recommended to be less than or equal to",
                    Engine2._deltaMax.toFixed(3),
                    "ms."
                  );
                }
                delta = typeof delta !== "undefined" ? delta : Common2._baseDelta;
                delta *= timing.timeScale;
                timing.timestamp += delta;
                timing.lastDelta = delta;
                var event = {
                  timestamp: timing.timestamp,
                  delta
                };
                Events2.trigger(engine, "beforeUpdate", event);
                var allBodies = Composite.allBodies(world), allConstraints = Composite.allConstraints(world);
                if (world.isModified) {
                  Detector.setBodies(detector, allBodies);
                  Composite.setModified(world, false, false, true);
                }
                if (engine.enableSleeping)
                  Sleeping.update(allBodies, delta);
                Engine2._bodiesApplyGravity(allBodies, engine.gravity);
                if (delta > 0) {
                  Engine2._bodiesUpdate(allBodies, delta);
                }
                Events2.trigger(engine, "beforeSolve", event);
                Constraint.preSolveAll(allBodies);
                for (i = 0; i < engine.constraintIterations; i++) {
                  Constraint.solveAll(allConstraints, delta);
                }
                Constraint.postSolveAll(allBodies);
                var collisions = Detector.collisions(detector);
                Pairs.update(pairs, collisions, timestamp);
                if (engine.enableSleeping)
                  Sleeping.afterCollisions(pairs.list);
                if (pairs.collisionStart.length > 0) {
                  Events2.trigger(engine, "collisionStart", {
                    pairs: pairs.collisionStart,
                    timestamp: timing.timestamp,
                    delta
                  });
                }
                var positionDamping = Common2.clamp(20 / engine.positionIterations, 0, 1);
                Resolver.preSolvePosition(pairs.list);
                for (i = 0; i < engine.positionIterations; i++) {
                  Resolver.solvePosition(pairs.list, delta, positionDamping);
                }
                Resolver.postSolvePosition(allBodies);
                Constraint.preSolveAll(allBodies);
                for (i = 0; i < engine.constraintIterations; i++) {
                  Constraint.solveAll(allConstraints, delta);
                }
                Constraint.postSolveAll(allBodies);
                Resolver.preSolveVelocity(pairs.list);
                for (i = 0; i < engine.velocityIterations; i++) {
                  Resolver.solveVelocity(pairs.list, delta);
                }
                Engine2._bodiesUpdateVelocities(allBodies);
                if (pairs.collisionActive.length > 0) {
                  Events2.trigger(engine, "collisionActive", {
                    pairs: pairs.collisionActive,
                    timestamp: timing.timestamp,
                    delta
                  });
                }
                if (pairs.collisionEnd.length > 0) {
                  Events2.trigger(engine, "collisionEnd", {
                    pairs: pairs.collisionEnd,
                    timestamp: timing.timestamp,
                    delta
                  });
                }
                Engine2._bodiesClearForces(allBodies);
                Events2.trigger(engine, "afterUpdate", event);
                engine.timing.lastElapsed = Common2.now() - startTime;
                return engine;
              };
              Engine2.merge = function(engineA, engineB) {
                Common2.extend(engineA, engineB);
                if (engineB.world) {
                  engineA.world = engineB.world;
                  Engine2.clear(engineA);
                  var bodies = Composite.allBodies(engineA.world);
                  for (var i = 0; i < bodies.length; i++) {
                    var body = bodies[i];
                    Sleeping.set(body, false);
                    body.id = Common2.nextId();
                  }
                }
              };
              Engine2.clear = function(engine) {
                Pairs.clear(engine.pairs);
                Detector.clear(engine.detector);
              };
              Engine2._bodiesClearForces = function(bodies) {
                var bodiesLength = bodies.length;
                for (var i = 0; i < bodiesLength; i++) {
                  var body = bodies[i];
                  body.force.x = 0;
                  body.force.y = 0;
                  body.torque = 0;
                }
              };
              Engine2._bodiesApplyGravity = function(bodies, gravity) {
                var gravityScale = typeof gravity.scale !== "undefined" ? gravity.scale : 1e-3, bodiesLength = bodies.length;
                if (gravity.x === 0 && gravity.y === 0 || gravityScale === 0) {
                  return;
                }
                for (var i = 0; i < bodiesLength; i++) {
                  var body = bodies[i];
                  if (body.isStatic || body.isSleeping)
                    continue;
                  body.force.y += body.mass * gravity.y * gravityScale;
                  body.force.x += body.mass * gravity.x * gravityScale;
                }
              };
              Engine2._bodiesUpdate = function(bodies, delta) {
                var bodiesLength = bodies.length;
                for (var i = 0; i < bodiesLength; i++) {
                  var body = bodies[i];
                  if (body.isStatic || body.isSleeping)
                    continue;
                  Body2.update(body, delta);
                }
              };
              Engine2._bodiesUpdateVelocities = function(bodies) {
                var bodiesLength = bodies.length;
                for (var i = 0; i < bodiesLength; i++) {
                  Body2.updateVelocities(bodies[i]);
                }
              };
            })();
          },
          /* 18 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Resolver = {};
            module2.exports = Resolver;
            var Vertices = __webpack_require__(3);
            var Common2 = __webpack_require__(0);
            var Bounds = __webpack_require__(1);
            (function() {
              Resolver._restingThresh = 2;
              Resolver._restingThreshTangent = Math.sqrt(6);
              Resolver._positionDampen = 0.9;
              Resolver._positionWarming = 0.8;
              Resolver._frictionNormalMultiplier = 5;
              Resolver._frictionMaxStatic = Number.MAX_VALUE;
              Resolver.preSolvePosition = function(pairs) {
                var i, pair, contactCount, pairsLength = pairs.length;
                for (i = 0; i < pairsLength; i++) {
                  pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  contactCount = pair.contactCount;
                  pair.collision.parentA.totalContacts += contactCount;
                  pair.collision.parentB.totalContacts += contactCount;
                }
              };
              Resolver.solvePosition = function(pairs, delta, damping) {
                var i, pair, collision, bodyA, bodyB, normal, contactShare, positionImpulse, positionDampen = Resolver._positionDampen * (damping || 1), slopDampen = Common2.clamp(delta / Common2._baseDelta, 0, 1), pairsLength = pairs.length;
                for (i = 0; i < pairsLength; i++) {
                  pair = pairs[i];
                  if (!pair.isActive || pair.isSensor)
                    continue;
                  collision = pair.collision;
                  bodyA = collision.parentA;
                  bodyB = collision.parentB;
                  normal = collision.normal;
                  pair.separation = collision.depth + normal.x * (bodyB.positionImpulse.x - bodyA.positionImpulse.x) + normal.y * (bodyB.positionImpulse.y - bodyA.positionImpulse.y);
                }
                for (i = 0; i < pairsLength; i++) {
                  pair = pairs[i];
                  if (!pair.isActive || pair.isSensor)
                    continue;
                  collision = pair.collision;
                  bodyA = collision.parentA;
                  bodyB = collision.parentB;
                  normal = collision.normal;
                  positionImpulse = pair.separation - pair.slop * slopDampen;
                  if (bodyA.isStatic || bodyB.isStatic)
                    positionImpulse *= 2;
                  if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    contactShare = positionDampen / bodyA.totalContacts;
                    bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
                    bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
                  }
                  if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    contactShare = positionDampen / bodyB.totalContacts;
                    bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
                    bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
                  }
                }
              };
              Resolver.postSolvePosition = function(bodies) {
                var positionWarming = Resolver._positionWarming, bodiesLength = bodies.length, verticesTranslate = Vertices.translate, boundsUpdate = Bounds.update;
                for (var i = 0; i < bodiesLength; i++) {
                  var body = bodies[i], positionImpulse = body.positionImpulse, positionImpulseX = positionImpulse.x, positionImpulseY = positionImpulse.y, velocity = body.velocity;
                  body.totalContacts = 0;
                  if (positionImpulseX !== 0 || positionImpulseY !== 0) {
                    for (var j = 0; j < body.parts.length; j++) {
                      var part = body.parts[j];
                      verticesTranslate(part.vertices, positionImpulse);
                      boundsUpdate(part.bounds, part.vertices, velocity);
                      part.position.x += positionImpulseX;
                      part.position.y += positionImpulseY;
                    }
                    body.positionPrev.x += positionImpulseX;
                    body.positionPrev.y += positionImpulseY;
                    if (positionImpulseX * velocity.x + positionImpulseY * velocity.y < 0) {
                      positionImpulse.x = 0;
                      positionImpulse.y = 0;
                    } else {
                      positionImpulse.x *= positionWarming;
                      positionImpulse.y *= positionWarming;
                    }
                  }
                }
              };
              Resolver.preSolveVelocity = function(pairs) {
                var pairsLength = pairs.length, i, j;
                for (i = 0; i < pairsLength; i++) {
                  var pair = pairs[i];
                  if (!pair.isActive || pair.isSensor)
                    continue;
                  var contacts = pair.contacts, contactCount = pair.contactCount, collision = pair.collision, bodyA = collision.parentA, bodyB = collision.parentB, normal = collision.normal, tangent = collision.tangent;
                  for (j = 0; j < contactCount; j++) {
                    var contact = contacts[j], contactVertex = contact.vertex, normalImpulse = contact.normalImpulse, tangentImpulse = contact.tangentImpulse;
                    if (normalImpulse !== 0 || tangentImpulse !== 0) {
                      var impulseX = normal.x * normalImpulse + tangent.x * tangentImpulse, impulseY = normal.y * normalImpulse + tangent.y * tangentImpulse;
                      if (!(bodyA.isStatic || bodyA.isSleeping)) {
                        bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                        bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                        bodyA.anglePrev += bodyA.inverseInertia * ((contactVertex.x - bodyA.position.x) * impulseY - (contactVertex.y - bodyA.position.y) * impulseX);
                      }
                      if (!(bodyB.isStatic || bodyB.isSleeping)) {
                        bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                        bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                        bodyB.anglePrev -= bodyB.inverseInertia * ((contactVertex.x - bodyB.position.x) * impulseY - (contactVertex.y - bodyB.position.y) * impulseX);
                      }
                    }
                  }
                }
              };
              Resolver.solveVelocity = function(pairs, delta) {
                var timeScale = delta / Common2._baseDelta, timeScaleSquared = timeScale * timeScale, timeScaleCubed = timeScaleSquared * timeScale, restingThresh = -Resolver._restingThresh * timeScale, restingThreshTangent = Resolver._restingThreshTangent, frictionNormalMultiplier = Resolver._frictionNormalMultiplier * timeScale, frictionMaxStatic = Resolver._frictionMaxStatic, pairsLength = pairs.length, tangentImpulse, maxFriction, i, j;
                for (i = 0; i < pairsLength; i++) {
                  var pair = pairs[i];
                  if (!pair.isActive || pair.isSensor)
                    continue;
                  var collision = pair.collision, bodyA = collision.parentA, bodyB = collision.parentB, normalX = collision.normal.x, normalY = collision.normal.y, tangentX = collision.tangent.x, tangentY = collision.tangent.y, inverseMassTotal = pair.inverseMass, friction = pair.friction * pair.frictionStatic * frictionNormalMultiplier, contacts = pair.contacts, contactCount = pair.contactCount, contactShare = 1 / contactCount;
                  var bodyAVelocityX = bodyA.position.x - bodyA.positionPrev.x, bodyAVelocityY = bodyA.position.y - bodyA.positionPrev.y, bodyAAngularVelocity = bodyA.angle - bodyA.anglePrev, bodyBVelocityX = bodyB.position.x - bodyB.positionPrev.x, bodyBVelocityY = bodyB.position.y - bodyB.positionPrev.y, bodyBAngularVelocity = bodyB.angle - bodyB.anglePrev;
                  for (j = 0; j < contactCount; j++) {
                    var contact = contacts[j], contactVertex = contact.vertex;
                    var offsetAX = contactVertex.x - bodyA.position.x, offsetAY = contactVertex.y - bodyA.position.y, offsetBX = contactVertex.x - bodyB.position.x, offsetBY = contactVertex.y - bodyB.position.y;
                    var velocityPointAX = bodyAVelocityX - offsetAY * bodyAAngularVelocity, velocityPointAY = bodyAVelocityY + offsetAX * bodyAAngularVelocity, velocityPointBX = bodyBVelocityX - offsetBY * bodyBAngularVelocity, velocityPointBY = bodyBVelocityY + offsetBX * bodyBAngularVelocity;
                    var relativeVelocityX = velocityPointAX - velocityPointBX, relativeVelocityY = velocityPointAY - velocityPointBY;
                    var normalVelocity = normalX * relativeVelocityX + normalY * relativeVelocityY, tangentVelocity = tangentX * relativeVelocityX + tangentY * relativeVelocityY;
                    var normalOverlap = pair.separation + normalVelocity;
                    var normalForce = Math.min(normalOverlap, 1);
                    normalForce = normalOverlap < 0 ? 0 : normalForce;
                    var frictionLimit = normalForce * friction;
                    if (tangentVelocity < -frictionLimit || tangentVelocity > frictionLimit) {
                      maxFriction = tangentVelocity > 0 ? tangentVelocity : -tangentVelocity;
                      tangentImpulse = pair.friction * (tangentVelocity > 0 ? 1 : -1) * timeScaleCubed;
                      if (tangentImpulse < -maxFriction) {
                        tangentImpulse = -maxFriction;
                      } else if (tangentImpulse > maxFriction) {
                        tangentImpulse = maxFriction;
                      }
                    } else {
                      tangentImpulse = tangentVelocity;
                      maxFriction = frictionMaxStatic;
                    }
                    var oAcN = offsetAX * normalY - offsetAY * normalX, oBcN = offsetBX * normalY - offsetBY * normalX, share = contactShare / (inverseMassTotal + bodyA.inverseInertia * oAcN * oAcN + bodyB.inverseInertia * oBcN * oBcN);
                    var normalImpulse = (1 + pair.restitution) * normalVelocity * share;
                    tangentImpulse *= share;
                    if (normalVelocity < restingThresh) {
                      contact.normalImpulse = 0;
                    } else {
                      var contactNormalImpulse = contact.normalImpulse;
                      contact.normalImpulse += normalImpulse;
                      if (contact.normalImpulse > 0) contact.normalImpulse = 0;
                      normalImpulse = contact.normalImpulse - contactNormalImpulse;
                    }
                    if (tangentVelocity < -restingThreshTangent || tangentVelocity > restingThreshTangent) {
                      contact.tangentImpulse = 0;
                    } else {
                      var contactTangentImpulse = contact.tangentImpulse;
                      contact.tangentImpulse += tangentImpulse;
                      if (contact.tangentImpulse < -maxFriction) contact.tangentImpulse = -maxFriction;
                      if (contact.tangentImpulse > maxFriction) contact.tangentImpulse = maxFriction;
                      tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                    }
                    var impulseX = normalX * normalImpulse + tangentX * tangentImpulse, impulseY = normalY * normalImpulse + tangentY * tangentImpulse;
                    if (!(bodyA.isStatic || bodyA.isSleeping)) {
                      bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                      bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                      bodyA.anglePrev += (offsetAX * impulseY - offsetAY * impulseX) * bodyA.inverseInertia;
                    }
                    if (!(bodyB.isStatic || bodyB.isSleeping)) {
                      bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                      bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                      bodyB.anglePrev -= (offsetBX * impulseY - offsetBY * impulseX) * bodyB.inverseInertia;
                    }
                  }
                }
              };
            })();
          },
          /* 19 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Pairs = {};
            module2.exports = Pairs;
            var Pair = __webpack_require__(9);
            var Common2 = __webpack_require__(0);
            (function() {
              Pairs.create = function(options) {
                return Common2.extend({
                  table: {},
                  list: [],
                  collisionStart: [],
                  collisionActive: [],
                  collisionEnd: []
                }, options);
              };
              Pairs.update = function(pairs, collisions, timestamp) {
                var pairUpdate = Pair.update, pairCreate = Pair.create, pairSetActive = Pair.setActive, pairsTable = pairs.table, pairsList = pairs.list, pairsListLength = pairsList.length, pairsListIndex = pairsListLength, collisionStart = pairs.collisionStart, collisionEnd = pairs.collisionEnd, collisionActive = pairs.collisionActive, collisionsLength = collisions.length, collisionStartIndex = 0, collisionEndIndex = 0, collisionActiveIndex = 0, collision, pair, i;
                for (i = 0; i < collisionsLength; i++) {
                  collision = collisions[i];
                  pair = collision.pair;
                  if (pair) {
                    if (pair.isActive) {
                      collisionActive[collisionActiveIndex++] = pair;
                    }
                    pairUpdate(pair, collision, timestamp);
                  } else {
                    pair = pairCreate(collision, timestamp);
                    pairsTable[pair.id] = pair;
                    collisionStart[collisionStartIndex++] = pair;
                    pairsList[pairsListIndex++] = pair;
                  }
                }
                pairsListIndex = 0;
                pairsListLength = pairsList.length;
                for (i = 0; i < pairsListLength; i++) {
                  pair = pairsList[i];
                  if (pair.timeUpdated >= timestamp) {
                    pairsList[pairsListIndex++] = pair;
                  } else {
                    pairSetActive(pair, false, timestamp);
                    if (pair.collision.bodyA.sleepCounter > 0 && pair.collision.bodyB.sleepCounter > 0) {
                      pairsList[pairsListIndex++] = pair;
                    } else {
                      collisionEnd[collisionEndIndex++] = pair;
                      delete pairsTable[pair.id];
                    }
                  }
                }
                if (pairsList.length !== pairsListIndex) {
                  pairsList.length = pairsListIndex;
                }
                if (collisionStart.length !== collisionStartIndex) {
                  collisionStart.length = collisionStartIndex;
                }
                if (collisionEnd.length !== collisionEndIndex) {
                  collisionEnd.length = collisionEndIndex;
                }
                if (collisionActive.length !== collisionActiveIndex) {
                  collisionActive.length = collisionActiveIndex;
                }
              };
              Pairs.clear = function(pairs) {
                pairs.table = {};
                pairs.list.length = 0;
                pairs.collisionStart.length = 0;
                pairs.collisionActive.length = 0;
                pairs.collisionEnd.length = 0;
                return pairs;
              };
            })();
          },
          /* 20 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Matter = module2.exports = __webpack_require__(21);
            Matter.Axes = __webpack_require__(11);
            Matter.Bodies = __webpack_require__(12);
            Matter.Body = __webpack_require__(4);
            Matter.Bounds = __webpack_require__(1);
            Matter.Collision = __webpack_require__(8);
            Matter.Common = __webpack_require__(0);
            Matter.Composite = __webpack_require__(6);
            Matter.Composites = __webpack_require__(22);
            Matter.Constraint = __webpack_require__(10);
            Matter.Contact = __webpack_require__(16);
            Matter.Detector = __webpack_require__(13);
            Matter.Engine = __webpack_require__(17);
            Matter.Events = __webpack_require__(5);
            Matter.Grid = __webpack_require__(23);
            Matter.Mouse = __webpack_require__(14);
            Matter.MouseConstraint = __webpack_require__(24);
            Matter.Pair = __webpack_require__(9);
            Matter.Pairs = __webpack_require__(19);
            Matter.Plugin = __webpack_require__(15);
            Matter.Query = __webpack_require__(25);
            Matter.Render = __webpack_require__(26);
            Matter.Resolver = __webpack_require__(18);
            Matter.Runner = __webpack_require__(27);
            Matter.SAT = __webpack_require__(28);
            Matter.Sleeping = __webpack_require__(7);
            Matter.Svg = __webpack_require__(29);
            Matter.Vector = __webpack_require__(2);
            Matter.Vertices = __webpack_require__(3);
            Matter.World = __webpack_require__(30);
            Matter.Engine.run = Matter.Runner.run;
            Matter.Common.deprecated(Matter.Engine, "run", "Engine.run ➤ use Matter.Runner.run(engine) instead");
          },
          /* 21 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Matter = {};
            module2.exports = Matter;
            var Plugin = __webpack_require__(15);
            var Common2 = __webpack_require__(0);
            (function() {
              Matter.name = "matter-js";
              Matter.version = "0.20.0";
              Matter.uses = [];
              Matter.used = [];
              Matter.use = function() {
                Plugin.use(Matter, Array.prototype.slice.call(arguments));
              };
              Matter.before = function(path, func) {
                path = path.replace(/^Matter./, "");
                return Common2.chainPathBefore(Matter, path, func);
              };
              Matter.after = function(path, func) {
                path = path.replace(/^Matter./, "");
                return Common2.chainPathAfter(Matter, path, func);
              };
            })();
          },
          /* 22 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Composites = {};
            module2.exports = Composites;
            var Composite = __webpack_require__(6);
            var Constraint = __webpack_require__(10);
            var Common2 = __webpack_require__(0);
            var Body2 = __webpack_require__(4);
            var Bodies2 = __webpack_require__(12);
            var deprecated = Common2.deprecated;
            (function() {
              Composites.stack = function(x2, y2, columns, rows, columnGap, rowGap, callback) {
                var stack = Composite.create({ label: "Stack" }), currentX = x2, currentY = y2, lastBody, i = 0;
                for (var row = 0; row < rows; row++) {
                  var maxHeight = 0;
                  for (var column = 0; column < columns; column++) {
                    var body = callback(currentX, currentY, column, row, lastBody, i);
                    if (body) {
                      var bodyHeight = body.bounds.max.y - body.bounds.min.y, bodyWidth = body.bounds.max.x - body.bounds.min.x;
                      if (bodyHeight > maxHeight)
                        maxHeight = bodyHeight;
                      Body2.translate(body, { x: bodyWidth * 0.5, y: bodyHeight * 0.5 });
                      currentX = body.bounds.max.x + columnGap;
                      Composite.addBody(stack, body);
                      lastBody = body;
                      i += 1;
                    } else {
                      currentX += columnGap;
                    }
                  }
                  currentY += maxHeight + rowGap;
                  currentX = x2;
                }
                return stack;
              };
              Composites.chain = function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
                var bodies = composite.bodies;
                for (var i = 1; i < bodies.length; i++) {
                  var bodyA = bodies[i - 1], bodyB = bodies[i], bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y, bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x, bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y, bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;
                  var defaults = {
                    bodyA,
                    pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                    bodyB,
                    pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB }
                  };
                  var constraint = Common2.extend(defaults, options);
                  Composite.addConstraint(composite, Constraint.create(constraint));
                }
                composite.label += " Chain";
                return composite;
              };
              Composites.mesh = function(composite, columns, rows, crossBrace, options) {
                var bodies = composite.bodies, row, col, bodyA, bodyB, bodyC;
                for (row = 0; row < rows; row++) {
                  for (col = 1; col < columns; col++) {
                    bodyA = bodies[col - 1 + row * columns];
                    bodyB = bodies[col + row * columns];
                    Composite.addConstraint(composite, Constraint.create(Common2.extend({ bodyA, bodyB }, options)));
                  }
                  if (row > 0) {
                    for (col = 0; col < columns; col++) {
                      bodyA = bodies[col + (row - 1) * columns];
                      bodyB = bodies[col + row * columns];
                      Composite.addConstraint(composite, Constraint.create(Common2.extend({ bodyA, bodyB }, options)));
                      if (crossBrace && col > 0) {
                        bodyC = bodies[col - 1 + (row - 1) * columns];
                        Composite.addConstraint(composite, Constraint.create(Common2.extend({ bodyA: bodyC, bodyB }, options)));
                      }
                      if (crossBrace && col < columns - 1) {
                        bodyC = bodies[col + 1 + (row - 1) * columns];
                        Composite.addConstraint(composite, Constraint.create(Common2.extend({ bodyA: bodyC, bodyB }, options)));
                      }
                    }
                  }
                }
                composite.label += " Mesh";
                return composite;
              };
              Composites.pyramid = function(x2, y2, columns, rows, columnGap, rowGap, callback) {
                return Composites.stack(x2, y2, columns, rows, columnGap, rowGap, function(stackX, stackY, column, row, lastBody, i) {
                  var actualRows = Math.min(rows, Math.ceil(columns / 2)), lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;
                  if (row > actualRows)
                    return;
                  row = actualRows - row;
                  var start = row, end = columns - 1 - row;
                  if (column < start || column > end)
                    return;
                  if (i === 1) {
                    Body2.translate(lastBody, { x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0 });
                  }
                  var xOffset = lastBody ? column * lastBodyWidth : 0;
                  return callback(x2 + xOffset + column * columnGap, stackY, column, row, lastBody, i);
                });
              };
              Composites.newtonsCradle = function(x2, y2, number, size, length) {
                var newtonsCradle = Composite.create({ label: "Newtons Cradle" });
                for (var i = 0; i < number; i++) {
                  var separation = 1.9, circle = Bodies2.circle(
                    x2 + i * (size * separation),
                    y2 + length,
                    size,
                    { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 1e-4, slop: 1 }
                  ), constraint = Constraint.create({ pointA: { x: x2 + i * (size * separation), y: y2 }, bodyB: circle });
                  Composite.addBody(newtonsCradle, circle);
                  Composite.addConstraint(newtonsCradle, constraint);
                }
                return newtonsCradle;
              };
              deprecated(Composites, "newtonsCradle", "Composites.newtonsCradle ➤ moved to newtonsCradle example");
              Composites.car = function(x2, y2, width, height, wheelSize) {
                var group = Body2.nextGroup(true), wheelBase = 20, wheelAOffset = -width * 0.5 + wheelBase, wheelBOffset = width * 0.5 - wheelBase, wheelYOffset = 0;
                var car = Composite.create({ label: "Car" }), body = Bodies2.rectangle(x2, y2, width, height, {
                  collisionFilter: {
                    group
                  },
                  chamfer: {
                    radius: height * 0.5
                  },
                  density: 2e-4
                });
                var wheelA = Bodies2.circle(x2 + wheelAOffset, y2 + wheelYOffset, wheelSize, {
                  collisionFilter: {
                    group
                  },
                  friction: 0.8
                });
                var wheelB = Bodies2.circle(x2 + wheelBOffset, y2 + wheelYOffset, wheelSize, {
                  collisionFilter: {
                    group
                  },
                  friction: 0.8
                });
                var axelA = Constraint.create({
                  bodyB: body,
                  pointB: { x: wheelAOffset, y: wheelYOffset },
                  bodyA: wheelA,
                  stiffness: 1,
                  length: 0
                });
                var axelB = Constraint.create({
                  bodyB: body,
                  pointB: { x: wheelBOffset, y: wheelYOffset },
                  bodyA: wheelB,
                  stiffness: 1,
                  length: 0
                });
                Composite.addBody(car, body);
                Composite.addBody(car, wheelA);
                Composite.addBody(car, wheelB);
                Composite.addConstraint(car, axelA);
                Composite.addConstraint(car, axelB);
                return car;
              };
              deprecated(Composites, "car", "Composites.car ➤ moved to car example");
              Composites.softBody = function(x2, y2, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
                particleOptions = Common2.extend({ inertia: Infinity }, particleOptions);
                constraintOptions = Common2.extend({ stiffness: 0.2, render: { type: "line", anchors: false } }, constraintOptions);
                var softBody = Composites.stack(x2, y2, columns, rows, columnGap, rowGap, function(stackX, stackY) {
                  return Bodies2.circle(stackX, stackY, particleRadius, particleOptions);
                });
                Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);
                softBody.label = "Soft Body";
                return softBody;
              };
              deprecated(Composites, "softBody", "Composites.softBody ➤ moved to softBody and cloth examples");
            })();
          },
          /* 23 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Grid = {};
            module2.exports = Grid;
            var Pair = __webpack_require__(9);
            var Common2 = __webpack_require__(0);
            var deprecated = Common2.deprecated;
            (function() {
              Grid.create = function(options) {
                var defaults = {
                  buckets: {},
                  pairs: {},
                  pairsList: [],
                  bucketWidth: 48,
                  bucketHeight: 48
                };
                return Common2.extend(defaults, options);
              };
              Grid.update = function(grid, bodies, engine, forceUpdate) {
                var i, col, row, world = engine.world, buckets = grid.buckets, bucket, bucketId, gridChanged = false;
                for (i = 0; i < bodies.length; i++) {
                  var body = bodies[i];
                  if (body.isSleeping && !forceUpdate)
                    continue;
                  if (world.bounds && (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x || body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y))
                    continue;
                  var newRegion = Grid._getRegion(grid, body);
                  if (!body.region || newRegion.id !== body.region.id || forceUpdate) {
                    if (!body.region || forceUpdate)
                      body.region = newRegion;
                    var union = Grid._regionUnion(newRegion, body.region);
                    for (col = union.startCol; col <= union.endCol; col++) {
                      for (row = union.startRow; row <= union.endRow; row++) {
                        bucketId = Grid._getBucketId(col, row);
                        bucket = buckets[bucketId];
                        var isInsideNewRegion = col >= newRegion.startCol && col <= newRegion.endCol && row >= newRegion.startRow && row <= newRegion.endRow;
                        var isInsideOldRegion = col >= body.region.startCol && col <= body.region.endCol && row >= body.region.startRow && row <= body.region.endRow;
                        if (!isInsideNewRegion && isInsideOldRegion) {
                          if (isInsideOldRegion) {
                            if (bucket)
                              Grid._bucketRemoveBody(grid, bucket, body);
                          }
                        }
                        if (body.region === newRegion || isInsideNewRegion && !isInsideOldRegion || forceUpdate) {
                          if (!bucket)
                            bucket = Grid._createBucket(buckets, bucketId);
                          Grid._bucketAddBody(grid, bucket, body);
                        }
                      }
                    }
                    body.region = newRegion;
                    gridChanged = true;
                  }
                }
                if (gridChanged)
                  grid.pairsList = Grid._createActivePairsList(grid);
              };
              deprecated(Grid, "update", "Grid.update ➤ replaced by Matter.Detector");
              Grid.clear = function(grid) {
                grid.buckets = {};
                grid.pairs = {};
                grid.pairsList = [];
              };
              deprecated(Grid, "clear", "Grid.clear ➤ replaced by Matter.Detector");
              Grid._regionUnion = function(regionA, regionB) {
                var startCol = Math.min(regionA.startCol, regionB.startCol), endCol = Math.max(regionA.endCol, regionB.endCol), startRow = Math.min(regionA.startRow, regionB.startRow), endRow = Math.max(regionA.endRow, regionB.endRow);
                return Grid._createRegion(startCol, endCol, startRow, endRow);
              };
              Grid._getRegion = function(grid, body) {
                var bounds = body.bounds, startCol = Math.floor(bounds.min.x / grid.bucketWidth), endCol = Math.floor(bounds.max.x / grid.bucketWidth), startRow = Math.floor(bounds.min.y / grid.bucketHeight), endRow = Math.floor(bounds.max.y / grid.bucketHeight);
                return Grid._createRegion(startCol, endCol, startRow, endRow);
              };
              Grid._createRegion = function(startCol, endCol, startRow, endRow) {
                return {
                  id: startCol + "," + endCol + "," + startRow + "," + endRow,
                  startCol,
                  endCol,
                  startRow,
                  endRow
                };
              };
              Grid._getBucketId = function(column, row) {
                return "C" + column + "R" + row;
              };
              Grid._createBucket = function(buckets, bucketId) {
                var bucket = buckets[bucketId] = [];
                return bucket;
              };
              Grid._bucketAddBody = function(grid, bucket, body) {
                var gridPairs = grid.pairs, pairId = Pair.id, bucketLength = bucket.length, i;
                for (i = 0; i < bucketLength; i++) {
                  var bodyB = bucket[i];
                  if (body.id === bodyB.id || body.isStatic && bodyB.isStatic)
                    continue;
                  var id = pairId(body, bodyB), pair = gridPairs[id];
                  if (pair) {
                    pair[2] += 1;
                  } else {
                    gridPairs[id] = [body, bodyB, 1];
                  }
                }
                bucket.push(body);
              };
              Grid._bucketRemoveBody = function(grid, bucket, body) {
                var gridPairs = grid.pairs, pairId = Pair.id, i;
                bucket.splice(Common2.indexOf(bucket, body), 1);
                var bucketLength = bucket.length;
                for (i = 0; i < bucketLength; i++) {
                  var pair = gridPairs[pairId(body, bucket[i])];
                  if (pair)
                    pair[2] -= 1;
                }
              };
              Grid._createActivePairsList = function(grid) {
                var pair, gridPairs = grid.pairs, pairKeys = Common2.keys(gridPairs), pairKeysLength = pairKeys.length, pairs = [], k;
                for (k = 0; k < pairKeysLength; k++) {
                  pair = gridPairs[pairKeys[k]];
                  if (pair[2] > 0) {
                    pairs.push(pair);
                  } else {
                    delete gridPairs[pairKeys[k]];
                  }
                }
                return pairs;
              };
            })();
          },
          /* 24 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var MouseConstraint = {};
            module2.exports = MouseConstraint;
            var Vertices = __webpack_require__(3);
            var Sleeping = __webpack_require__(7);
            var Mouse = __webpack_require__(14);
            var Events2 = __webpack_require__(5);
            var Detector = __webpack_require__(13);
            var Constraint = __webpack_require__(10);
            var Composite = __webpack_require__(6);
            var Common2 = __webpack_require__(0);
            var Bounds = __webpack_require__(1);
            (function() {
              MouseConstraint.create = function(engine, options) {
                var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);
                if (!mouse) {
                  if (engine && engine.render && engine.render.canvas) {
                    mouse = Mouse.create(engine.render.canvas);
                  } else if (options && options.element) {
                    mouse = Mouse.create(options.element);
                  } else {
                    mouse = Mouse.create();
                    Common2.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected");
                  }
                }
                var constraint = Constraint.create({
                  label: "Mouse Constraint",
                  pointA: mouse.position,
                  pointB: { x: 0, y: 0 },
                  length: 0.01,
                  stiffness: 0.1,
                  angularStiffness: 1,
                  render: {
                    strokeStyle: "#90EE90",
                    lineWidth: 3
                  }
                });
                var defaults = {
                  type: "mouseConstraint",
                  mouse,
                  element: null,
                  body: null,
                  constraint,
                  collisionFilter: {
                    category: 1,
                    mask: 4294967295,
                    group: 0
                  }
                };
                var mouseConstraint = Common2.extend(defaults, options);
                Events2.on(engine, "beforeUpdate", function() {
                  var allBodies = Composite.allBodies(engine.world);
                  MouseConstraint.update(mouseConstraint, allBodies);
                  MouseConstraint._triggerEvents(mouseConstraint);
                });
                return mouseConstraint;
              };
              MouseConstraint.update = function(mouseConstraint, bodies) {
                var mouse = mouseConstraint.mouse, constraint = mouseConstraint.constraint, body = mouseConstraint.body;
                if (mouse.button === 0) {
                  if (!constraint.bodyB) {
                    for (var i = 0; i < bodies.length; i++) {
                      body = bodies[i];
                      if (Bounds.contains(body.bounds, mouse.position) && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
                        for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
                          var part = body.parts[j];
                          if (Vertices.contains(part.vertices, mouse.position)) {
                            constraint.pointA = mouse.position;
                            constraint.bodyB = mouseConstraint.body = body;
                            constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
                            constraint.angleB = body.angle;
                            Sleeping.set(body, false);
                            Events2.trigger(mouseConstraint, "startdrag", { mouse, body });
                            break;
                          }
                        }
                      }
                    }
                  } else {
                    Sleeping.set(constraint.bodyB, false);
                    constraint.pointA = mouse.position;
                  }
                } else {
                  constraint.bodyB = mouseConstraint.body = null;
                  constraint.pointB = null;
                  if (body)
                    Events2.trigger(mouseConstraint, "enddrag", { mouse, body });
                }
              };
              MouseConstraint._triggerEvents = function(mouseConstraint) {
                var mouse = mouseConstraint.mouse, mouseEvents = mouse.sourceEvents;
                if (mouseEvents.mousemove)
                  Events2.trigger(mouseConstraint, "mousemove", { mouse });
                if (mouseEvents.mousedown)
                  Events2.trigger(mouseConstraint, "mousedown", { mouse });
                if (mouseEvents.mouseup)
                  Events2.trigger(mouseConstraint, "mouseup", { mouse });
                Mouse.clearSourceEvents(mouse);
              };
            })();
          },
          /* 25 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Query = {};
            module2.exports = Query;
            var Vector2 = __webpack_require__(2);
            var Collision = __webpack_require__(8);
            var Bounds = __webpack_require__(1);
            var Bodies2 = __webpack_require__(12);
            var Vertices = __webpack_require__(3);
            (function() {
              Query.collides = function(body, bodies) {
                var collisions = [], bodiesLength = bodies.length, bounds = body.bounds, collides = Collision.collides, overlaps = Bounds.overlaps;
                for (var i = 0; i < bodiesLength; i++) {
                  var bodyA = bodies[i], partsALength = bodyA.parts.length, partsAStart = partsALength === 1 ? 0 : 1;
                  if (overlaps(bodyA.bounds, bounds)) {
                    for (var j = partsAStart; j < partsALength; j++) {
                      var part = bodyA.parts[j];
                      if (overlaps(part.bounds, bounds)) {
                        var collision = collides(part, body);
                        if (collision) {
                          collisions.push(collision);
                          break;
                        }
                      }
                    }
                  }
                }
                return collisions;
              };
              Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
                rayWidth = rayWidth || 1e-100;
                var rayAngle = Vector2.angle(startPoint, endPoint), rayLength = Vector2.magnitude(Vector2.sub(startPoint, endPoint)), rayX = (endPoint.x + startPoint.x) * 0.5, rayY = (endPoint.y + startPoint.y) * 0.5, ray = Bodies2.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }), collisions = Query.collides(ray, bodies);
                for (var i = 0; i < collisions.length; i += 1) {
                  var collision = collisions[i];
                  collision.body = collision.bodyB = collision.bodyA;
                }
                return collisions;
              };
              Query.region = function(bodies, bounds, outside) {
                var result = [];
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], overlaps = Bounds.overlaps(body.bounds, bounds);
                  if (overlaps && !outside || !overlaps && outside)
                    result.push(body);
                }
                return result;
              };
              Query.point = function(bodies, point) {
                var result = [];
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i];
                  if (Bounds.contains(body.bounds, point)) {
                    for (var j = body.parts.length === 1 ? 0 : 1; j < body.parts.length; j++) {
                      var part = body.parts[j];
                      if (Bounds.contains(part.bounds, point) && Vertices.contains(part.vertices, point)) {
                        result.push(body);
                        break;
                      }
                    }
                  }
                }
                return result;
              };
            })();
          },
          /* 26 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Render2 = {};
            module2.exports = Render2;
            var Body2 = __webpack_require__(4);
            var Common2 = __webpack_require__(0);
            var Composite = __webpack_require__(6);
            var Bounds = __webpack_require__(1);
            var Events2 = __webpack_require__(5);
            var Vector2 = __webpack_require__(2);
            var Mouse = __webpack_require__(14);
            (function() {
              var _requestAnimationFrame, _cancelAnimationFrame;
              if (typeof window !== "undefined") {
                _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                  window.setTimeout(function() {
                    callback(Common2.now());
                  }, 1e3 / 60);
                };
                _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
              }
              Render2._goodFps = 30;
              Render2._goodDelta = 1e3 / 60;
              Render2.create = function(options) {
                var defaults = {
                  engine: null,
                  element: null,
                  canvas: null,
                  mouse: null,
                  frameRequestId: null,
                  timing: {
                    historySize: 60,
                    delta: 0,
                    deltaHistory: [],
                    lastTime: 0,
                    lastTimestamp: 0,
                    lastElapsed: 0,
                    timestampElapsed: 0,
                    timestampElapsedHistory: [],
                    engineDeltaHistory: [],
                    engineElapsedHistory: [],
                    engineUpdatesHistory: [],
                    elapsedHistory: []
                  },
                  options: {
                    width: 800,
                    height: 600,
                    pixelRatio: 1,
                    background: "#14151f",
                    wireframeBackground: "#14151f",
                    wireframeStrokeStyle: "#bbb",
                    hasBounds: !!options.bounds,
                    enabled: true,
                    wireframes: true,
                    showSleeping: true,
                    showDebug: false,
                    showStats: false,
                    showPerformance: false,
                    showBounds: false,
                    showVelocity: false,
                    showCollisions: false,
                    showSeparations: false,
                    showAxes: false,
                    showPositions: false,
                    showAngleIndicator: false,
                    showIds: false,
                    showVertexNumbers: false,
                    showConvexHulls: false,
                    showInternalEdges: false,
                    showMousePosition: false
                  }
                };
                var render = Common2.extend(defaults, options);
                if (render.canvas) {
                  render.canvas.width = render.options.width || render.canvas.width;
                  render.canvas.height = render.options.height || render.canvas.height;
                }
                render.mouse = options.mouse;
                render.engine = options.engine;
                render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
                render.context = render.canvas.getContext("2d");
                render.textures = {};
                render.bounds = render.bounds || {
                  min: {
                    x: 0,
                    y: 0
                  },
                  max: {
                    x: render.canvas.width,
                    y: render.canvas.height
                  }
                };
                render.controller = Render2;
                render.options.showBroadphase = false;
                if (render.options.pixelRatio !== 1) {
                  Render2.setPixelRatio(render, render.options.pixelRatio);
                }
                if (Common2.isElement(render.element)) {
                  render.element.appendChild(render.canvas);
                }
                return render;
              };
              Render2.run = function(render) {
                (function loop(time) {
                  render.frameRequestId = _requestAnimationFrame(loop);
                  _updateTiming(render, time);
                  Render2.world(render, time);
                  render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
                  if (render.options.showStats || render.options.showDebug) {
                    Render2.stats(render, render.context, time);
                  }
                  if (render.options.showPerformance || render.options.showDebug) {
                    Render2.performance(render, render.context, time);
                  }
                  render.context.setTransform(1, 0, 0, 1, 0, 0);
                })();
              };
              Render2.stop = function(render) {
                _cancelAnimationFrame(render.frameRequestId);
              };
              Render2.setPixelRatio = function(render, pixelRatio) {
                var options = render.options, canvas = render.canvas;
                if (pixelRatio === "auto") {
                  pixelRatio = _getPixelRatio(canvas);
                }
                options.pixelRatio = pixelRatio;
                canvas.setAttribute("data-pixel-ratio", pixelRatio);
                canvas.width = options.width * pixelRatio;
                canvas.height = options.height * pixelRatio;
                canvas.style.width = options.width + "px";
                canvas.style.height = options.height + "px";
              };
              Render2.setSize = function(render, width, height) {
                render.options.width = width;
                render.options.height = height;
                render.bounds.max.x = render.bounds.min.x + width;
                render.bounds.max.y = render.bounds.min.y + height;
                if (render.options.pixelRatio !== 1) {
                  Render2.setPixelRatio(render, render.options.pixelRatio);
                } else {
                  render.canvas.width = width;
                  render.canvas.height = height;
                }
              };
              Render2.lookAt = function(render, objects, padding, center) {
                center = typeof center !== "undefined" ? center : true;
                objects = Common2.isArray(objects) ? objects : [objects];
                padding = padding || {
                  x: 0,
                  y: 0
                };
                var bounds = {
                  min: { x: Infinity, y: Infinity },
                  max: { x: -Infinity, y: -Infinity }
                };
                for (var i = 0; i < objects.length; i += 1) {
                  var object = objects[i], min = object.bounds ? object.bounds.min : object.min || object.position || object, max = object.bounds ? object.bounds.max : object.max || object.position || object;
                  if (min && max) {
                    if (min.x < bounds.min.x)
                      bounds.min.x = min.x;
                    if (max.x > bounds.max.x)
                      bounds.max.x = max.x;
                    if (min.y < bounds.min.y)
                      bounds.min.y = min.y;
                    if (max.y > bounds.max.y)
                      bounds.max.y = max.y;
                  }
                }
                var width = bounds.max.x - bounds.min.x + 2 * padding.x, height = bounds.max.y - bounds.min.y + 2 * padding.y, viewHeight = render.canvas.height, viewWidth = render.canvas.width, outerRatio = viewWidth / viewHeight, innerRatio = width / height, scaleX = 1, scaleY = 1;
                if (innerRatio > outerRatio) {
                  scaleY = innerRatio / outerRatio;
                } else {
                  scaleX = outerRatio / innerRatio;
                }
                render.options.hasBounds = true;
                render.bounds.min.x = bounds.min.x;
                render.bounds.max.x = bounds.min.x + width * scaleX;
                render.bounds.min.y = bounds.min.y;
                render.bounds.max.y = bounds.min.y + height * scaleY;
                if (center) {
                  render.bounds.min.x += width * 0.5 - width * scaleX * 0.5;
                  render.bounds.max.x += width * 0.5 - width * scaleX * 0.5;
                  render.bounds.min.y += height * 0.5 - height * scaleY * 0.5;
                  render.bounds.max.y += height * 0.5 - height * scaleY * 0.5;
                }
                render.bounds.min.x -= padding.x;
                render.bounds.max.x -= padding.x;
                render.bounds.min.y -= padding.y;
                render.bounds.max.y -= padding.y;
                if (render.mouse) {
                  Mouse.setScale(render.mouse, {
                    x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                    y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
                  });
                  Mouse.setOffset(render.mouse, render.bounds.min);
                }
              };
              Render2.startViewTransform = function(render) {
                var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
                render.context.setTransform(
                  render.options.pixelRatio / boundsScaleX,
                  0,
                  0,
                  render.options.pixelRatio / boundsScaleY,
                  0,
                  0
                );
                render.context.translate(-render.bounds.min.x, -render.bounds.min.y);
              };
              Render2.endViewTransform = function(render) {
                render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
              };
              Render2.world = function(render, time) {
                var startTime = Common2.now(), engine = render.engine, world = engine.world, canvas = render.canvas, context = render.context, options = render.options, timing = render.timing;
                var allBodies = Composite.allBodies(world), allConstraints = Composite.allConstraints(world), background = options.wireframes ? options.wireframeBackground : options.background, bodies = [], constraints = [], i;
                var event = {
                  timestamp: engine.timing.timestamp
                };
                Events2.trigger(render, "beforeRender", event);
                if (render.currentBackground !== background)
                  _applyBackground(render, background);
                context.globalCompositeOperation = "source-in";
                context.fillStyle = "transparent";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.globalCompositeOperation = "source-over";
                if (options.hasBounds) {
                  for (i = 0; i < allBodies.length; i++) {
                    var body = allBodies[i];
                    if (Bounds.overlaps(body.bounds, render.bounds))
                      bodies.push(body);
                  }
                  for (i = 0; i < allConstraints.length; i++) {
                    var constraint = allConstraints[i], bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointAWorld = constraint.pointA, pointBWorld = constraint.pointB;
                    if (bodyA) pointAWorld = Vector2.add(bodyA.position, constraint.pointA);
                    if (bodyB) pointBWorld = Vector2.add(bodyB.position, constraint.pointB);
                    if (!pointAWorld || !pointBWorld)
                      continue;
                    if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                      constraints.push(constraint);
                  }
                  Render2.startViewTransform(render);
                  if (render.mouse) {
                    Mouse.setScale(render.mouse, {
                      x: (render.bounds.max.x - render.bounds.min.x) / render.options.width,
                      y: (render.bounds.max.y - render.bounds.min.y) / render.options.height
                    });
                    Mouse.setOffset(render.mouse, render.bounds.min);
                  }
                } else {
                  constraints = allConstraints;
                  bodies = allBodies;
                  if (render.options.pixelRatio !== 1) {
                    render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
                  }
                }
                if (!options.wireframes || engine.enableSleeping && options.showSleeping) {
                  Render2.bodies(render, bodies, context);
                } else {
                  if (options.showConvexHulls)
                    Render2.bodyConvexHulls(render, bodies, context);
                  Render2.bodyWireframes(render, bodies, context);
                }
                if (options.showBounds)
                  Render2.bodyBounds(render, bodies, context);
                if (options.showAxes || options.showAngleIndicator)
                  Render2.bodyAxes(render, bodies, context);
                if (options.showPositions)
                  Render2.bodyPositions(render, bodies, context);
                if (options.showVelocity)
                  Render2.bodyVelocity(render, bodies, context);
                if (options.showIds)
                  Render2.bodyIds(render, bodies, context);
                if (options.showSeparations)
                  Render2.separations(render, engine.pairs.list, context);
                if (options.showCollisions)
                  Render2.collisions(render, engine.pairs.list, context);
                if (options.showVertexNumbers)
                  Render2.vertexNumbers(render, bodies, context);
                if (options.showMousePosition)
                  Render2.mousePosition(render, render.mouse, context);
                Render2.constraints(constraints, context);
                if (options.hasBounds) {
                  Render2.endViewTransform(render);
                }
                Events2.trigger(render, "afterRender", event);
                timing.lastElapsed = Common2.now() - startTime;
              };
              Render2.stats = function(render, context, time) {
                var engine = render.engine, world = engine.world, bodies = Composite.allBodies(world), parts = 0, width = 55, height = 44, x2 = 0, y2 = 0;
                for (var i = 0; i < bodies.length; i += 1) {
                  parts += bodies[i].parts.length;
                }
                var sections = {
                  "Part": parts,
                  "Body": bodies.length,
                  "Cons": Composite.allConstraints(world).length,
                  "Comp": Composite.allComposites(world).length,
                  "Pair": engine.pairs.list.length
                };
                context.fillStyle = "#0e0f19";
                context.fillRect(x2, y2, width * 5.5, height);
                context.font = "12px Arial";
                context.textBaseline = "top";
                context.textAlign = "right";
                for (var key in sections) {
                  var section = sections[key];
                  context.fillStyle = "#aaa";
                  context.fillText(key, x2 + width, y2 + 8);
                  context.fillStyle = "#eee";
                  context.fillText(section, x2 + width, y2 + 26);
                  x2 += width;
                }
              };
              Render2.performance = function(render, context) {
                var engine = render.engine, timing = render.timing, deltaHistory = timing.deltaHistory, elapsedHistory = timing.elapsedHistory, timestampElapsedHistory = timing.timestampElapsedHistory, engineDeltaHistory = timing.engineDeltaHistory, engineUpdatesHistory = timing.engineUpdatesHistory, engineElapsedHistory = timing.engineElapsedHistory, lastEngineUpdatesPerFrame = engine.timing.lastUpdatesPerFrame, lastEngineDelta = engine.timing.lastDelta;
                var deltaMean = _mean(deltaHistory), elapsedMean = _mean(elapsedHistory), engineDeltaMean = _mean(engineDeltaHistory), engineUpdatesMean = _mean(engineUpdatesHistory), engineElapsedMean = _mean(engineElapsedHistory), timestampElapsedMean = _mean(timestampElapsedHistory), rateMean = timestampElapsedMean / deltaMean || 0, neededUpdatesPerFrame = Math.round(deltaMean / lastEngineDelta), fps = 1e3 / deltaMean || 0;
                var graphHeight = 4, gap = 12, width = 60, height = 34, x2 = 10, y2 = 69;
                context.fillStyle = "#0e0f19";
                context.fillRect(0, 50, gap * 5 + width * 6 + 22, height);
                Render2.status(
                  context,
                  x2,
                  y2,
                  width,
                  graphHeight,
                  deltaHistory.length,
                  Math.round(fps) + " fps",
                  fps / Render2._goodFps,
                  function(i) {
                    return deltaHistory[i] / deltaMean - 1;
                  }
                );
                Render2.status(
                  context,
                  x2 + gap + width,
                  y2,
                  width,
                  graphHeight,
                  engineDeltaHistory.length,
                  lastEngineDelta.toFixed(2) + " dt",
                  Render2._goodDelta / lastEngineDelta,
                  function(i) {
                    return engineDeltaHistory[i] / engineDeltaMean - 1;
                  }
                );
                Render2.status(
                  context,
                  x2 + (gap + width) * 2,
                  y2,
                  width,
                  graphHeight,
                  engineUpdatesHistory.length,
                  lastEngineUpdatesPerFrame + " upf",
                  Math.pow(Common2.clamp(engineUpdatesMean / neededUpdatesPerFrame || 1, 0, 1), 4),
                  function(i) {
                    return engineUpdatesHistory[i] / engineUpdatesMean - 1;
                  }
                );
                Render2.status(
                  context,
                  x2 + (gap + width) * 3,
                  y2,
                  width,
                  graphHeight,
                  engineElapsedHistory.length,
                  engineElapsedMean.toFixed(2) + " ut",
                  1 - lastEngineUpdatesPerFrame * engineElapsedMean / Render2._goodFps,
                  function(i) {
                    return engineElapsedHistory[i] / engineElapsedMean - 1;
                  }
                );
                Render2.status(
                  context,
                  x2 + (gap + width) * 4,
                  y2,
                  width,
                  graphHeight,
                  elapsedHistory.length,
                  elapsedMean.toFixed(2) + " rt",
                  1 - elapsedMean / Render2._goodFps,
                  function(i) {
                    return elapsedHistory[i] / elapsedMean - 1;
                  }
                );
                Render2.status(
                  context,
                  x2 + (gap + width) * 5,
                  y2,
                  width,
                  graphHeight,
                  timestampElapsedHistory.length,
                  rateMean.toFixed(2) + " x",
                  rateMean * rateMean * rateMean,
                  function(i) {
                    return (timestampElapsedHistory[i] / deltaHistory[i] / rateMean || 0) - 1;
                  }
                );
              };
              Render2.status = function(context, x2, y2, width, height, count, label, indicator, plotY) {
                context.strokeStyle = "#888";
                context.fillStyle = "#444";
                context.lineWidth = 1;
                context.fillRect(x2, y2 + 7, width, 1);
                context.beginPath();
                context.moveTo(x2, y2 + 7 - height * Common2.clamp(0.4 * plotY(0), -2, 2));
                for (var i = 0; i < width; i += 1) {
                  context.lineTo(x2 + i, y2 + 7 - (i < count ? height * Common2.clamp(0.4 * plotY(i), -2, 2) : 0));
                }
                context.stroke();
                context.fillStyle = "hsl(" + Common2.clamp(25 + 95 * indicator, 0, 120) + ",100%,60%)";
                context.fillRect(x2, y2 - 7, 4, 4);
                context.font = "12px Arial";
                context.textBaseline = "middle";
                context.textAlign = "right";
                context.fillStyle = "#eee";
                context.fillText(label, x2 + width, y2 - 5);
              };
              Render2.constraints = function(constraints, context) {
                var c = context;
                for (var i = 0; i < constraints.length; i++) {
                  var constraint = constraints[i];
                  if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
                    continue;
                  var bodyA = constraint.bodyA, bodyB = constraint.bodyB, start, end;
                  if (bodyA) {
                    start = Vector2.add(bodyA.position, constraint.pointA);
                  } else {
                    start = constraint.pointA;
                  }
                  if (constraint.render.type === "pin") {
                    c.beginPath();
                    c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                    c.closePath();
                  } else {
                    if (bodyB) {
                      end = Vector2.add(bodyB.position, constraint.pointB);
                    } else {
                      end = constraint.pointB;
                    }
                    c.beginPath();
                    c.moveTo(start.x, start.y);
                    if (constraint.render.type === "spring") {
                      var delta = Vector2.sub(end, start), normal = Vector2.perp(Vector2.normalise(delta)), coils = Math.ceil(Common2.clamp(constraint.length / 5, 12, 20)), offset;
                      for (var j = 1; j < coils; j += 1) {
                        offset = j % 2 === 0 ? 1 : -1;
                        c.lineTo(
                          start.x + delta.x * (j / coils) + normal.x * offset * 4,
                          start.y + delta.y * (j / coils) + normal.y * offset * 4
                        );
                      }
                    }
                    c.lineTo(end.x, end.y);
                  }
                  if (constraint.render.lineWidth) {
                    c.lineWidth = constraint.render.lineWidth;
                    c.strokeStyle = constraint.render.strokeStyle;
                    c.stroke();
                  }
                  if (constraint.render.anchors) {
                    c.fillStyle = constraint.render.strokeStyle;
                    c.beginPath();
                    c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                    c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
                    c.closePath();
                    c.fill();
                  }
                }
              };
              Render2.bodies = function(render, bodies, context) {
                var c = context;
                render.engine;
                var options = render.options, showInternalEdges = options.showInternalEdges || !options.wireframes, body, part, i, k;
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (!body.render.visible)
                    continue;
                  for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                    part = body.parts[k];
                    if (!part.render.visible)
                      continue;
                    if (options.showSleeping && body.isSleeping) {
                      c.globalAlpha = 0.5 * part.render.opacity;
                    } else if (part.render.opacity !== 1) {
                      c.globalAlpha = part.render.opacity;
                    }
                    if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
                      var sprite = part.render.sprite, texture = _getTexture(render, sprite.texture);
                      c.translate(part.position.x, part.position.y);
                      c.rotate(part.angle);
                      c.drawImage(
                        texture,
                        texture.width * -sprite.xOffset * sprite.xScale,
                        texture.height * -sprite.yOffset * sprite.yScale,
                        texture.width * sprite.xScale,
                        texture.height * sprite.yScale
                      );
                      c.rotate(-part.angle);
                      c.translate(-part.position.x, -part.position.y);
                    } else {
                      if (part.circleRadius) {
                        c.beginPath();
                        c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
                      } else {
                        c.beginPath();
                        c.moveTo(part.vertices[0].x, part.vertices[0].y);
                        for (var j = 1; j < part.vertices.length; j++) {
                          if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                            c.lineTo(part.vertices[j].x, part.vertices[j].y);
                          } else {
                            c.moveTo(part.vertices[j].x, part.vertices[j].y);
                          }
                          if (part.vertices[j].isInternal && !showInternalEdges) {
                            c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                          }
                        }
                        c.lineTo(part.vertices[0].x, part.vertices[0].y);
                        c.closePath();
                      }
                      if (!options.wireframes) {
                        c.fillStyle = part.render.fillStyle;
                        if (part.render.lineWidth) {
                          c.lineWidth = part.render.lineWidth;
                          c.strokeStyle = part.render.strokeStyle;
                          c.stroke();
                        }
                        c.fill();
                      } else {
                        c.lineWidth = 1;
                        c.strokeStyle = render.options.wireframeStrokeStyle;
                        c.stroke();
                      }
                    }
                    c.globalAlpha = 1;
                  }
                }
              };
              Render2.bodyWireframes = function(render, bodies, context) {
                var c = context, showInternalEdges = render.options.showInternalEdges, body, part, i, j, k;
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (!body.render.visible)
                    continue;
                  for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                    part = body.parts[k];
                    c.moveTo(part.vertices[0].x, part.vertices[0].y);
                    for (j = 1; j < part.vertices.length; j++) {
                      if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                        c.lineTo(part.vertices[j].x, part.vertices[j].y);
                      } else {
                        c.moveTo(part.vertices[j].x, part.vertices[j].y);
                      }
                      if (part.vertices[j].isInternal && !showInternalEdges) {
                        c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                      }
                    }
                    c.lineTo(part.vertices[0].x, part.vertices[0].y);
                  }
                }
                c.lineWidth = 1;
                c.strokeStyle = render.options.wireframeStrokeStyle;
                c.stroke();
              };
              Render2.bodyConvexHulls = function(render, bodies, context) {
                var c = context, body, i, j;
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (!body.render.visible || body.parts.length === 1)
                    continue;
                  c.moveTo(body.vertices[0].x, body.vertices[0].y);
                  for (j = 1; j < body.vertices.length; j++) {
                    c.lineTo(body.vertices[j].x, body.vertices[j].y);
                  }
                  c.lineTo(body.vertices[0].x, body.vertices[0].y);
                }
                c.lineWidth = 1;
                c.strokeStyle = "rgba(255,255,255,0.2)";
                c.stroke();
              };
              Render2.vertexNumbers = function(render, bodies, context) {
                var c = context, i, j, k;
                for (i = 0; i < bodies.length; i++) {
                  var parts = bodies[i].parts;
                  for (k = parts.length > 1 ? 1 : 0; k < parts.length; k++) {
                    var part = parts[k];
                    for (j = 0; j < part.vertices.length; j++) {
                      c.fillStyle = "rgba(255,255,255,0.2)";
                      c.fillText(i + "_" + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
                    }
                  }
                }
              };
              Render2.mousePosition = function(render, mouse, context) {
                var c = context;
                c.fillStyle = "rgba(255,255,255,0.8)";
                c.fillText(mouse.position.x + "  " + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
              };
              Render2.bodyBounds = function(render, bodies, context) {
                var c = context;
                render.engine;
                var options = render.options;
                c.beginPath();
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i];
                  if (body.render.visible) {
                    var parts = bodies[i].parts;
                    for (var j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                      var part = parts[j];
                      c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
                    }
                  }
                }
                if (options.wireframes) {
                  c.strokeStyle = "rgba(255,255,255,0.08)";
                } else {
                  c.strokeStyle = "rgba(0,0,0,0.1)";
                }
                c.lineWidth = 1;
                c.stroke();
              };
              Render2.bodyAxes = function(render, bodies, context) {
                var c = context;
                render.engine;
                var options = render.options, part, i, j, k;
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  var body = bodies[i], parts = body.parts;
                  if (!body.render.visible)
                    continue;
                  if (options.showAxes) {
                    for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                      part = parts[j];
                      for (k = 0; k < part.axes.length; k++) {
                        var axis = part.axes[k];
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
                      }
                    }
                  } else {
                    for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                      part = parts[j];
                      for (k = 0; k < part.axes.length; k++) {
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo(
                          (part.vertices[0].x + part.vertices[part.vertices.length - 1].x) / 2,
                          (part.vertices[0].y + part.vertices[part.vertices.length - 1].y) / 2
                        );
                      }
                    }
                  }
                }
                if (options.wireframes) {
                  c.strokeStyle = "indianred";
                  c.lineWidth = 1;
                } else {
                  c.strokeStyle = "rgba(255, 255, 255, 0.4)";
                  c.globalCompositeOperation = "overlay";
                  c.lineWidth = 2;
                }
                c.stroke();
                c.globalCompositeOperation = "source-over";
              };
              Render2.bodyPositions = function(render, bodies, context) {
                var c = context;
                render.engine;
                var options = render.options, body, part, i, k;
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (!body.render.visible)
                    continue;
                  for (k = 0; k < body.parts.length; k++) {
                    part = body.parts[k];
                    c.arc(part.position.x, part.position.y, 3, 0, 2 * Math.PI, false);
                    c.closePath();
                  }
                }
                if (options.wireframes) {
                  c.fillStyle = "indianred";
                } else {
                  c.fillStyle = "rgba(0,0,0,0.5)";
                }
                c.fill();
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (body.render.visible) {
                    c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math.PI, false);
                    c.closePath();
                  }
                }
                c.fillStyle = "rgba(255,165,0,0.8)";
                c.fill();
              };
              Render2.bodyVelocity = function(render, bodies, context) {
                var c = context;
                c.beginPath();
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i];
                  if (!body.render.visible)
                    continue;
                  var velocity = Body2.getVelocity(body);
                  c.moveTo(body.position.x, body.position.y);
                  c.lineTo(body.position.x + velocity.x, body.position.y + velocity.y);
                }
                c.lineWidth = 3;
                c.strokeStyle = "cornflowerblue";
                c.stroke();
              };
              Render2.bodyIds = function(render, bodies, context) {
                var c = context, i, j;
                for (i = 0; i < bodies.length; i++) {
                  if (!bodies[i].render.visible)
                    continue;
                  var parts = bodies[i].parts;
                  for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    var part = parts[j];
                    c.font = "12px Arial";
                    c.fillStyle = "rgba(255,255,255,0.5)";
                    c.fillText(part.id, part.position.x + 10, part.position.y - 10);
                  }
                }
              };
              Render2.collisions = function(render, pairs, context) {
                var c = context, options = render.options, pair, collision, i, j;
                c.beginPath();
                for (i = 0; i < pairs.length; i++) {
                  pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  collision = pair.collision;
                  for (j = 0; j < pair.contactCount; j++) {
                    var contact = pair.contacts[j], vertex = contact.vertex;
                    c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
                  }
                }
                if (options.wireframes) {
                  c.fillStyle = "rgba(255,255,255,0.7)";
                } else {
                  c.fillStyle = "orange";
                }
                c.fill();
                c.beginPath();
                for (i = 0; i < pairs.length; i++) {
                  pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  collision = pair.collision;
                  if (pair.contactCount > 0) {
                    var normalPosX = pair.contacts[0].vertex.x, normalPosY = pair.contacts[0].vertex.y;
                    if (pair.contactCount === 2) {
                      normalPosX = (pair.contacts[0].vertex.x + pair.contacts[1].vertex.x) / 2;
                      normalPosY = (pair.contacts[0].vertex.y + pair.contacts[1].vertex.y) / 2;
                    }
                    if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
                      c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
                    } else {
                      c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
                    }
                    c.lineTo(normalPosX, normalPosY);
                  }
                }
                if (options.wireframes) {
                  c.strokeStyle = "rgba(255,165,0,0.7)";
                } else {
                  c.strokeStyle = "orange";
                }
                c.lineWidth = 1;
                c.stroke();
              };
              Render2.separations = function(render, pairs, context) {
                var c = context, options = render.options, pair, collision, bodyA, bodyB, i;
                c.beginPath();
                for (i = 0; i < pairs.length; i++) {
                  pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  collision = pair.collision;
                  bodyA = collision.bodyA;
                  bodyB = collision.bodyB;
                  var k = 1;
                  if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
                  if (bodyB.isStatic) k = 0;
                  c.moveTo(bodyB.position.x, bodyB.position.y);
                  c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);
                  k = 1;
                  if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
                  if (bodyA.isStatic) k = 0;
                  c.moveTo(bodyA.position.x, bodyA.position.y);
                  c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
                }
                if (options.wireframes) {
                  c.strokeStyle = "rgba(255,165,0,0.5)";
                } else {
                  c.strokeStyle = "orange";
                }
                c.stroke();
              };
              Render2.inspector = function(inspector, context) {
                inspector.engine;
                var selected = inspector.selected, render = inspector.render, options = render.options, bounds;
                if (options.hasBounds) {
                  var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
                  context.scale(1 / boundsScaleX, 1 / boundsScaleY);
                  context.translate(-render.bounds.min.x, -render.bounds.min.y);
                }
                for (var i = 0; i < selected.length; i++) {
                  var item = selected[i].data;
                  context.translate(0.5, 0.5);
                  context.lineWidth = 1;
                  context.strokeStyle = "rgba(255,165,0,0.9)";
                  context.setLineDash([1, 2]);
                  switch (item.type) {
                    case "body":
                      bounds = item.bounds;
                      context.beginPath();
                      context.rect(
                        Math.floor(bounds.min.x - 3),
                        Math.floor(bounds.min.y - 3),
                        Math.floor(bounds.max.x - bounds.min.x + 6),
                        Math.floor(bounds.max.y - bounds.min.y + 6)
                      );
                      context.closePath();
                      context.stroke();
                      break;
                    case "constraint":
                      var point = item.pointA;
                      if (item.bodyA)
                        point = item.pointB;
                      context.beginPath();
                      context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                      context.closePath();
                      context.stroke();
                      break;
                  }
                  context.setLineDash([]);
                  context.translate(-0.5, -0.5);
                }
                if (inspector.selectStart !== null) {
                  context.translate(0.5, 0.5);
                  context.lineWidth = 1;
                  context.strokeStyle = "rgba(255,165,0,0.6)";
                  context.fillStyle = "rgba(255,165,0,0.1)";
                  bounds = inspector.selectBounds;
                  context.beginPath();
                  context.rect(
                    Math.floor(bounds.min.x),
                    Math.floor(bounds.min.y),
                    Math.floor(bounds.max.x - bounds.min.x),
                    Math.floor(bounds.max.y - bounds.min.y)
                  );
                  context.closePath();
                  context.stroke();
                  context.fill();
                  context.translate(-0.5, -0.5);
                }
                if (options.hasBounds)
                  context.setTransform(1, 0, 0, 1, 0, 0);
              };
              var _updateTiming = function(render, time) {
                var engine = render.engine, timing = render.timing, historySize = timing.historySize, timestamp = engine.timing.timestamp;
                timing.delta = time - timing.lastTime || Render2._goodDelta;
                timing.lastTime = time;
                timing.timestampElapsed = timestamp - timing.lastTimestamp || 0;
                timing.lastTimestamp = timestamp;
                timing.deltaHistory.unshift(timing.delta);
                timing.deltaHistory.length = Math.min(timing.deltaHistory.length, historySize);
                timing.engineDeltaHistory.unshift(engine.timing.lastDelta);
                timing.engineDeltaHistory.length = Math.min(timing.engineDeltaHistory.length, historySize);
                timing.timestampElapsedHistory.unshift(timing.timestampElapsed);
                timing.timestampElapsedHistory.length = Math.min(timing.timestampElapsedHistory.length, historySize);
                timing.engineUpdatesHistory.unshift(engine.timing.lastUpdatesPerFrame);
                timing.engineUpdatesHistory.length = Math.min(timing.engineUpdatesHistory.length, historySize);
                timing.engineElapsedHistory.unshift(engine.timing.lastElapsed);
                timing.engineElapsedHistory.length = Math.min(timing.engineElapsedHistory.length, historySize);
                timing.elapsedHistory.unshift(timing.lastElapsed);
                timing.elapsedHistory.length = Math.min(timing.elapsedHistory.length, historySize);
              };
              var _mean = function(values) {
                var result = 0;
                for (var i = 0; i < values.length; i += 1) {
                  result += values[i];
                }
                return result / values.length || 0;
              };
              var _createCanvas = function(width, height) {
                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                canvas.oncontextmenu = function() {
                  return false;
                };
                canvas.onselectstart = function() {
                  return false;
                };
                return canvas;
              };
              var _getPixelRatio = function(canvas) {
                var context = canvas.getContext("2d"), devicePixelRatio = window.devicePixelRatio || 1, backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
                return devicePixelRatio / backingStorePixelRatio;
              };
              var _getTexture = function(render, imagePath) {
                var image = render.textures[imagePath];
                if (image)
                  return image;
                image = render.textures[imagePath] = new Image();
                image.src = imagePath;
                return image;
              };
              var _applyBackground = function(render, background) {
                var cssBackground = background;
                if (/(jpg|gif|png)$/.test(background))
                  cssBackground = "url(" + background + ")";
                render.canvas.style.background = cssBackground;
                render.canvas.style.backgroundSize = "contain";
                render.currentBackground = background;
              };
            })();
          },
          /* 27 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Runner2 = {};
            module2.exports = Runner2;
            var Events2 = __webpack_require__(5);
            var Engine2 = __webpack_require__(17);
            var Common2 = __webpack_require__(0);
            (function() {
              Runner2._maxFrameDelta = 1e3 / 15;
              Runner2._frameDeltaFallback = 1e3 / 60;
              Runner2._timeBufferMargin = 1.5;
              Runner2._elapsedNextEstimate = 1;
              Runner2._smoothingLowerBound = 0.1;
              Runner2._smoothingUpperBound = 0.9;
              Runner2.create = function(options) {
                var defaults = {
                  delta: 1e3 / 60,
                  frameDelta: null,
                  frameDeltaSmoothing: true,
                  frameDeltaSnapping: true,
                  frameDeltaHistory: [],
                  frameDeltaHistorySize: 100,
                  frameRequestId: null,
                  timeBuffer: 0,
                  timeLastTick: null,
                  maxUpdates: null,
                  maxFrameTime: 1e3 / 30,
                  lastUpdatesDeferred: 0,
                  enabled: true
                };
                var runner = Common2.extend(defaults, options);
                runner.fps = 0;
                return runner;
              };
              Runner2.run = function(runner, engine) {
                runner.timeBuffer = Runner2._frameDeltaFallback;
                (function onFrame(time) {
                  runner.frameRequestId = Runner2._onNextFrame(runner, onFrame);
                  if (time && runner.enabled) {
                    Runner2.tick(runner, engine, time);
                  }
                })();
                return runner;
              };
              Runner2.tick = function(runner, engine, time) {
                var tickStartTime = Common2.now(), engineDelta = runner.delta, updateCount = 0;
                var frameDelta = time - runner.timeLastTick;
                if (!frameDelta || !runner.timeLastTick || frameDelta > Math.max(Runner2._maxFrameDelta, runner.maxFrameTime)) {
                  frameDelta = runner.frameDelta || Runner2._frameDeltaFallback;
                }
                if (runner.frameDeltaSmoothing) {
                  runner.frameDeltaHistory.push(frameDelta);
                  runner.frameDeltaHistory = runner.frameDeltaHistory.slice(-runner.frameDeltaHistorySize);
                  var deltaHistorySorted = runner.frameDeltaHistory.slice(0).sort();
                  var deltaHistoryWindow = runner.frameDeltaHistory.slice(
                    deltaHistorySorted.length * Runner2._smoothingLowerBound,
                    deltaHistorySorted.length * Runner2._smoothingUpperBound
                  );
                  var frameDeltaSmoothed = _mean(deltaHistoryWindow);
                  frameDelta = frameDeltaSmoothed || frameDelta;
                }
                if (runner.frameDeltaSnapping) {
                  frameDelta = 1e3 / Math.round(1e3 / frameDelta);
                }
                runner.frameDelta = frameDelta;
                runner.timeLastTick = time;
                runner.timeBuffer += runner.frameDelta;
                runner.timeBuffer = Common2.clamp(
                  runner.timeBuffer,
                  0,
                  runner.frameDelta + engineDelta * Runner2._timeBufferMargin
                );
                runner.lastUpdatesDeferred = 0;
                var maxUpdates = runner.maxUpdates || Math.ceil(runner.maxFrameTime / engineDelta);
                var event = {
                  timestamp: engine.timing.timestamp
                };
                Events2.trigger(runner, "beforeTick", event);
                Events2.trigger(runner, "tick", event);
                var updateStartTime = Common2.now();
                while (engineDelta > 0 && runner.timeBuffer >= engineDelta * Runner2._timeBufferMargin) {
                  Events2.trigger(runner, "beforeUpdate", event);
                  Engine2.update(engine, engineDelta);
                  Events2.trigger(runner, "afterUpdate", event);
                  runner.timeBuffer -= engineDelta;
                  updateCount += 1;
                  var elapsedTimeTotal = Common2.now() - tickStartTime, elapsedTimeUpdates = Common2.now() - updateStartTime, elapsedNextEstimate = elapsedTimeTotal + Runner2._elapsedNextEstimate * elapsedTimeUpdates / updateCount;
                  if (updateCount >= maxUpdates || elapsedNextEstimate > runner.maxFrameTime) {
                    runner.lastUpdatesDeferred = Math.round(Math.max(0, runner.timeBuffer / engineDelta - Runner2._timeBufferMargin));
                    break;
                  }
                }
                engine.timing.lastUpdatesPerFrame = updateCount;
                Events2.trigger(runner, "afterTick", event);
                if (runner.frameDeltaHistory.length >= 100) {
                  if (runner.lastUpdatesDeferred && Math.round(runner.frameDelta / engineDelta) > maxUpdates) {
                    Common2.warnOnce("Matter.Runner: runner reached runner.maxUpdates, see docs.");
                  } else if (runner.lastUpdatesDeferred) {
                    Common2.warnOnce("Matter.Runner: runner reached runner.maxFrameTime, see docs.");
                  }
                  if (typeof runner.isFixed !== "undefined") {
                    Common2.warnOnce("Matter.Runner: runner.isFixed is now redundant, see docs.");
                  }
                  if (runner.deltaMin || runner.deltaMax) {
                    Common2.warnOnce("Matter.Runner: runner.deltaMin and runner.deltaMax were removed, see docs.");
                  }
                  if (runner.fps !== 0) {
                    Common2.warnOnce("Matter.Runner: runner.fps was replaced by runner.delta, see docs.");
                  }
                }
              };
              Runner2.stop = function(runner) {
                Runner2._cancelNextFrame(runner);
              };
              Runner2._onNextFrame = function(runner, callback) {
                if (typeof window !== "undefined" && window.requestAnimationFrame) {
                  runner.frameRequestId = window.requestAnimationFrame(callback);
                } else {
                  throw new Error("Matter.Runner: missing required global window.requestAnimationFrame.");
                }
                return runner.frameRequestId;
              };
              Runner2._cancelNextFrame = function(runner) {
                if (typeof window !== "undefined" && window.cancelAnimationFrame) {
                  window.cancelAnimationFrame(runner.frameRequestId);
                } else {
                  throw new Error("Matter.Runner: missing required global window.cancelAnimationFrame.");
                }
              };
              var _mean = function(values) {
                var result = 0, valuesLength = values.length;
                for (var i = 0; i < valuesLength; i += 1) {
                  result += values[i];
                }
                return result / valuesLength || 0;
              };
            })();
          },
          /* 28 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var SAT = {};
            module2.exports = SAT;
            var Collision = __webpack_require__(8);
            var Common2 = __webpack_require__(0);
            var deprecated = Common2.deprecated;
            (function() {
              SAT.collides = function(bodyA, bodyB) {
                return Collision.collides(bodyA, bodyB);
              };
              deprecated(SAT, "collides", "SAT.collides ➤ replaced by Collision.collides");
            })();
          },
          /* 29 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Svg = {};
            module2.exports = Svg;
            __webpack_require__(1);
            var Common2 = __webpack_require__(0);
            (function() {
              Svg.pathToVertices = function(path, sampleLength) {
                if (typeof window !== "undefined" && !("SVGPathSeg" in window)) {
                  Common2.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
                }
                var i, il, total, point, segment, segments, segmentsQueue, lastSegment, lastPoint, segmentIndex, points = [], lx, ly, length = 0, x2 = 0, y2 = 0;
                sampleLength = sampleLength || 15;
                var addPoint = function(px, py, pathSegType) {
                  var isRelative = pathSegType % 2 === 1 && pathSegType > 1;
                  if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
                    if (lastPoint && isRelative) {
                      lx = lastPoint.x;
                      ly = lastPoint.y;
                    } else {
                      lx = 0;
                      ly = 0;
                    }
                    var point2 = {
                      x: lx + px,
                      y: ly + py
                    };
                    if (isRelative || !lastPoint) {
                      lastPoint = point2;
                    }
                    points.push(point2);
                    x2 = lx + px;
                    y2 = ly + py;
                  }
                };
                var addSegmentPoint = function(segment2) {
                  var segType = segment2.pathSegTypeAsLetter.toUpperCase();
                  if (segType === "Z")
                    return;
                  switch (segType) {
                    case "M":
                    case "L":
                    case "T":
                    case "C":
                    case "S":
                    case "Q":
                      x2 = segment2.x;
                      y2 = segment2.y;
                      break;
                    case "H":
                      x2 = segment2.x;
                      break;
                    case "V":
                      y2 = segment2.y;
                      break;
                  }
                  addPoint(x2, y2, segment2.pathSegType);
                };
                Svg._svgPathToAbsolute(path);
                total = path.getTotalLength();
                segments = [];
                for (i = 0; i < path.pathSegList.numberOfItems; i += 1)
                  segments.push(path.pathSegList.getItem(i));
                segmentsQueue = segments.concat();
                while (length < total) {
                  segmentIndex = path.getPathSegAtLength(length);
                  segment = segments[segmentIndex];
                  if (segment != lastSegment) {
                    while (segmentsQueue.length && segmentsQueue[0] != segment)
                      addSegmentPoint(segmentsQueue.shift());
                    lastSegment = segment;
                  }
                  switch (segment.pathSegTypeAsLetter.toUpperCase()) {
                    case "C":
                    case "T":
                    case "S":
                    case "Q":
                    case "A":
                      point = path.getPointAtLength(length);
                      addPoint(point.x, point.y, 0);
                      break;
                  }
                  length += sampleLength;
                }
                for (i = 0, il = segmentsQueue.length; i < il; ++i)
                  addSegmentPoint(segmentsQueue[i]);
                return points;
              };
              Svg._svgPathToAbsolute = function(path) {
                var x0, y0, x1, y1, x2, y2, segs = path.pathSegList, x3 = 0, y3 = 0, len = segs.numberOfItems;
                for (var i = 0; i < len; ++i) {
                  var seg = segs.getItem(i), segType = seg.pathSegTypeAsLetter;
                  if (/[MLHVCSQTA]/.test(segType)) {
                    if ("x" in seg) x3 = seg.x;
                    if ("y" in seg) y3 = seg.y;
                  } else {
                    if ("x1" in seg) x1 = x3 + seg.x1;
                    if ("x2" in seg) x2 = x3 + seg.x2;
                    if ("y1" in seg) y1 = y3 + seg.y1;
                    if ("y2" in seg) y2 = y3 + seg.y2;
                    if ("x" in seg) x3 += seg.x;
                    if ("y" in seg) y3 += seg.y;
                    switch (segType) {
                      case "m":
                        segs.replaceItem(path.createSVGPathSegMovetoAbs(x3, y3), i);
                        break;
                      case "l":
                        segs.replaceItem(path.createSVGPathSegLinetoAbs(x3, y3), i);
                        break;
                      case "h":
                        segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x3), i);
                        break;
                      case "v":
                        segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y3), i);
                        break;
                      case "c":
                        segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x3, y3, x1, y1, x2, y2), i);
                        break;
                      case "s":
                        segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x3, y3, x2, y2), i);
                        break;
                      case "q":
                        segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x3, y3, x1, y1), i);
                        break;
                      case "t":
                        segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x3, y3), i);
                        break;
                      case "a":
                        segs.replaceItem(path.createSVGPathSegArcAbs(x3, y3, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
                        break;
                      case "z":
                      case "Z":
                        x3 = x0;
                        y3 = y0;
                        break;
                    }
                  }
                  if (segType == "M" || segType == "m") {
                    x0 = x3;
                    y0 = y3;
                  }
                }
              };
            })();
          },
          /* 30 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var World2 = {};
            module2.exports = World2;
            var Composite = __webpack_require__(6);
            __webpack_require__(0);
            (function() {
              World2.create = Composite.create;
              World2.add = Composite.add;
              World2.remove = Composite.remove;
              World2.clear = Composite.clear;
              World2.addComposite = Composite.addComposite;
              World2.addBody = Composite.addBody;
              World2.addConstraint = Composite.addConstraint;
            })();
          }
          /******/
        ])
      );
    });
  })(matter$1);
  return matter$1.exports;
}
var matterExports = requireMatter();
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
const CLASS_PART_SEPARATOR = "-";
const createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, classPartObject) => {
  var _a;
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return (_a = classPartObject.validators.find(({
    validator
  }) => validator(classRest))) == null ? void 0 : _a.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
};
const createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const classGroupId in classGroups) {
    processClassesRecursively(classGroups[classGroupId], classMap, classGroupId, theme);
  }
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
const getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
const isThemeGetter = (func) => func.isThemeGetter;
const createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = "!";
const MODIFIER_SEPARATOR = ":";
const MODIFIER_SEPARATOR_LENGTH = MODIFIER_SEPARATOR.length;
const createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index2 = 0; index2 < className.length; index2++) {
      let currentCharacter = className[index2];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index2));
          modifierStart = index2 + MODIFIER_SEPARATOR_LENGTH;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index2;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      } else if (currentCharacter === "(") {
        parenDepth++;
      } else if (currentCharacter === ")") {
        parenDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const baseClassName = stripImportantModifier(baseClassNameWithImportantModifier);
    const hasImportantModifier = baseClassName !== baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.substring(fullPrefix.length)) : {
      isExternal: true,
      modifiers: [],
      hasImportantModifier: false,
      baseClassName: className,
      maybePostfixModifierPosition: void 0
    };
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
const stripImportantModifier = (baseClassName) => {
  if (baseClassName.endsWith(IMPORTANT_MODIFIER)) {
    return baseClassName.substring(0, baseClassName.length - 1);
  }
  if (baseClassName.startsWith(IMPORTANT_MODIFIER)) {
    return baseClassName.substring(1);
  }
  return baseClassName;
};
const createSortModifiers = (config) => {
  const orderSensitiveModifiers = Object.fromEntries(config.orderSensitiveModifiers.map((modifier) => [modifier, true]));
  const sortModifiers = (modifiers) => {
    if (modifiers.length <= 1) {
      return modifiers;
    }
    const sortedModifiers = [];
    let unsortedModifiers = [];
    modifiers.forEach((modifier) => {
      const isPositionSensitive = modifier[0] === "[" || orderSensitiveModifiers[modifier];
      if (isPositionSensitive) {
        sortedModifiers.push(...unsortedModifiers.sort(), modifier);
        unsortedModifiers = [];
      } else {
        unsortedModifiers.push(modifier);
      }
    });
    sortedModifiers.push(...unsortedModifiers.sort());
    return sortedModifiers;
  };
  return sortModifiers;
};
const createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index2 = classNames.length - 1; index2 >= 0; index2 -= 1) {
    const originalClassName = classNames[index2];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
function twJoin() {
  let index2 = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index2 < arguments.length) {
    if (argument = arguments[index2++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
const toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+\/\d+$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value) => fractionRegex.test(value);
const isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
const isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
const isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
const isTshirtSize = (value) => tshirtUnitRegex.test(value);
const isAny = () => true;
const isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
const isNever = () => false;
const isShadow = (value) => shadowRegex.test(value);
const isImage = (value) => imageRegex.test(value);
const isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
const isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value) => getIsArbitraryValue(value, isNever, isShadow);
const isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
const getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
const isLabelPosition = (label) => label === "position";
const imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
const isLabelImage = (label) => imageLabels.has(label);
const sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
const isLabelSize = (label) => sizeLabels.has(label);
const isLabelLength = (label) => label === "length";
const isLabelNumber = (label) => label === "number";
const isLabelFamilyName = (label) => label === "family-name";
const isLabelShadow = (label) => label === "shadow";
const getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleOrigin = () => ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryVariable, isArbitraryValue];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...scalePosition(), isArbitraryValue, isArbitraryVariable]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: scaleInset()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryValue, themeFont]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "space", "round"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [themeColor]
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", isArbitraryVariable, isArbitraryValue, themeInsetShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scaleOrigin()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scaleOrigin()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["before", "after", "placeholder", "file", "marker", "selection", "first-line", "first-letter", "backdrop", "*", "**"]
  };
};
const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
var src;
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  src = {
    decomp: polygonDecomp,
    quickDecomp: polygonQuickDecomp,
    isSimple: polygonIsSimple,
    removeCollinearPoints: polygonRemoveCollinearPoints,
    removeDuplicatePoints: polygonRemoveDuplicatePoints,
    makeCCW: polygonMakeCCW
  };
  function lineInt(l1, l2, precision) {
    precision = precision || 0;
    var i = [0, 0];
    var a1, b1, c1, a2, b2, c2, det;
    a1 = l1[1][1] - l1[0][1];
    b1 = l1[0][0] - l1[1][0];
    c1 = a1 * l1[0][0] + b1 * l1[0][1];
    a2 = l2[1][1] - l2[0][1];
    b2 = l2[0][0] - l2[1][0];
    c2 = a2 * l2[0][0] + b2 * l2[0][1];
    det = a1 * b2 - a2 * b1;
    if (!scalar_eq(det, 0, precision)) {
      i[0] = (b2 * c1 - b1 * c2) / det;
      i[1] = (a1 * c2 - a2 * c1) / det;
    }
    return i;
  }
  function lineSegmentsIntersect(p1, p2, q1, q2) {
    var dx = p2[0] - p1[0];
    var dy = p2[1] - p1[1];
    var da = q2[0] - q1[0];
    var db = q2[1] - q1[1];
    if (da * dy - db * dx === 0) {
      return false;
    }
    var s = (dx * (q1[1] - p1[1]) + dy * (p1[0] - q1[0])) / (da * dy - db * dx);
    var t = (da * (p1[1] - q1[1]) + db * (q1[0] - p1[0])) / (db * dx - da * dy);
    return s >= 0 && s <= 1 && t >= 0 && t <= 1;
  }
  function triangleArea(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
  }
  function isLeft(a, b, c) {
    return triangleArea(a, b, c) > 0;
  }
  function isLeftOn(a, b, c) {
    return triangleArea(a, b, c) >= 0;
  }
  function isRight(a, b, c) {
    return triangleArea(a, b, c) < 0;
  }
  function isRightOn(a, b, c) {
    return triangleArea(a, b, c) <= 0;
  }
  var tmpPoint1 = [], tmpPoint2 = [];
  function collinear(a, b, c, thresholdAngle) {
    if (!thresholdAngle) {
      return triangleArea(a, b, c) === 0;
    } else {
      var ab = tmpPoint1, bc = tmpPoint2;
      ab[0] = b[0] - a[0];
      ab[1] = b[1] - a[1];
      bc[0] = c[0] - b[0];
      bc[1] = c[1] - b[1];
      var dot = ab[0] * bc[0] + ab[1] * bc[1], magA = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1]), magB = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1]), angle = Math.acos(dot / (magA * magB));
      return angle < thresholdAngle;
    }
  }
  function sqdist(a, b) {
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];
    return dx * dx + dy * dy;
  }
  function polygonAt(polygon, i) {
    var s = polygon.length;
    return polygon[i < 0 ? i % s + s : i % s];
  }
  function polygonClear(polygon) {
    polygon.length = 0;
  }
  function polygonAppend(polygon, poly, from, to) {
    for (var i = from; i < to; i++) {
      polygon.push(poly[i]);
    }
  }
  function polygonMakeCCW(polygon) {
    var br2 = 0, v2 = polygon;
    for (var i = 1; i < polygon.length; ++i) {
      if (v2[i][1] < v2[br2][1] || v2[i][1] === v2[br2][1] && v2[i][0] > v2[br2][0]) {
        br2 = i;
      }
    }
    if (!isLeft(polygonAt(polygon, br2 - 1), polygonAt(polygon, br2), polygonAt(polygon, br2 + 1))) {
      polygonReverse(polygon);
      return true;
    } else {
      return false;
    }
  }
  function polygonReverse(polygon) {
    var tmp = [];
    var N2 = polygon.length;
    for (var i = 0; i !== N2; i++) {
      tmp.push(polygon.pop());
    }
    for (var i = 0; i !== N2; i++) {
      polygon[i] = tmp[i];
    }
  }
  function polygonIsReflex(polygon, i) {
    return isRight(polygonAt(polygon, i - 1), polygonAt(polygon, i), polygonAt(polygon, i + 1));
  }
  var tmpLine1 = [], tmpLine2 = [];
  function polygonCanSee(polygon, a, b) {
    var p2, dist, l1 = tmpLine1, l2 = tmpLine2;
    if (isLeftOn(polygonAt(polygon, a + 1), polygonAt(polygon, a), polygonAt(polygon, b)) && isRightOn(polygonAt(polygon, a - 1), polygonAt(polygon, a), polygonAt(polygon, b))) {
      return false;
    }
    dist = sqdist(polygonAt(polygon, a), polygonAt(polygon, b));
    for (var i = 0; i !== polygon.length; ++i) {
      if ((i + 1) % polygon.length === a || i === a) {
        continue;
      }
      if (isLeftOn(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i + 1)) && isRightOn(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i))) {
        l1[0] = polygonAt(polygon, a);
        l1[1] = polygonAt(polygon, b);
        l2[0] = polygonAt(polygon, i);
        l2[1] = polygonAt(polygon, i + 1);
        p2 = lineInt(l1, l2);
        if (sqdist(polygonAt(polygon, a), p2) < dist) {
          return false;
        }
      }
    }
    return true;
  }
  function polygonCanSee2(polygon, a, b) {
    for (var i = 0; i !== polygon.length; ++i) {
      if (i === a || i === b || (i + 1) % polygon.length === a || (i + 1) % polygon.length === b) {
        continue;
      }
      if (lineSegmentsIntersect(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i), polygonAt(polygon, i + 1))) {
        return false;
      }
    }
    return true;
  }
  function polygonCopy(polygon, i, j, targetPoly) {
    var p2 = targetPoly || [];
    polygonClear(p2);
    if (i < j) {
      for (var k = i; k <= j; k++) {
        p2.push(polygon[k]);
      }
    } else {
      for (var k = 0; k <= j; k++) {
        p2.push(polygon[k]);
      }
      for (var k = i; k < polygon.length; k++) {
        p2.push(polygon[k]);
      }
    }
    return p2;
  }
  function polygonGetCutEdges(polygon) {
    var min = [], tmp1 = [], tmp2 = [], tmpPoly = [];
    var nDiags = Number.MAX_VALUE;
    for (var i = 0; i < polygon.length; ++i) {
      if (polygonIsReflex(polygon, i)) {
        for (var j = 0; j < polygon.length; ++j) {
          if (polygonCanSee(polygon, i, j)) {
            tmp1 = polygonGetCutEdges(polygonCopy(polygon, i, j, tmpPoly));
            tmp2 = polygonGetCutEdges(polygonCopy(polygon, j, i, tmpPoly));
            for (var k = 0; k < tmp2.length; k++) {
              tmp1.push(tmp2[k]);
            }
            if (tmp1.length < nDiags) {
              min = tmp1;
              nDiags = tmp1.length;
              min.push([polygonAt(polygon, i), polygonAt(polygon, j)]);
            }
          }
        }
      }
    }
    return min;
  }
  function polygonDecomp(polygon) {
    var edges = polygonGetCutEdges(polygon);
    if (edges.length > 0) {
      return polygonSlice(polygon, edges);
    } else {
      return [polygon];
    }
  }
  function polygonSlice(polygon, cutEdges) {
    if (cutEdges.length === 0) {
      return [polygon];
    }
    if (cutEdges instanceof Array && cutEdges.length && cutEdges[0] instanceof Array && cutEdges[0].length === 2 && cutEdges[0][0] instanceof Array) {
      var polys = [polygon];
      for (var i = 0; i < cutEdges.length; i++) {
        var cutEdge = cutEdges[i];
        for (var j = 0; j < polys.length; j++) {
          var poly = polys[j];
          var result = polygonSlice(poly, cutEdge);
          if (result) {
            polys.splice(j, 1);
            polys.push(result[0], result[1]);
            break;
          }
        }
      }
      return polys;
    } else {
      var cutEdge = cutEdges;
      var i = polygon.indexOf(cutEdge[0]);
      var j = polygon.indexOf(cutEdge[1]);
      if (i !== -1 && j !== -1) {
        return [
          polygonCopy(polygon, i, j),
          polygonCopy(polygon, j, i)
        ];
      } else {
        return false;
      }
    }
  }
  function polygonIsSimple(polygon) {
    var path = polygon, i;
    for (i = 0; i < path.length - 1; i++) {
      for (var j = 0; j < i - 1; j++) {
        if (lineSegmentsIntersect(path[i], path[i + 1], path[j], path[j + 1])) {
          return false;
        }
      }
    }
    for (i = 1; i < path.length - 2; i++) {
      if (lineSegmentsIntersect(path[0], path[path.length - 1], path[i], path[i + 1])) {
        return false;
      }
    }
    return true;
  }
  function getIntersectionPoint(p1, p2, q1, q2, delta) {
    delta = delta || 0;
    var a1 = p2[1] - p1[1];
    var b1 = p1[0] - p2[0];
    var c1 = a1 * p1[0] + b1 * p1[1];
    var a2 = q2[1] - q1[1];
    var b2 = q1[0] - q2[0];
    var c2 = a2 * q1[0] + b2 * q1[1];
    var det = a1 * b2 - a2 * b1;
    if (!scalar_eq(det, 0, delta)) {
      return [(b2 * c1 - b1 * c2) / det, (a1 * c2 - a2 * c1) / det];
    } else {
      return [0, 0];
    }
  }
  function polygonQuickDecomp(polygon, result, reflexVertices, steinerPoints, delta, maxlevel, level) {
    maxlevel = maxlevel || 100;
    level = level || 0;
    delta = delta || 25;
    result = typeof result !== "undefined" ? result : [];
    reflexVertices = reflexVertices || [];
    steinerPoints = steinerPoints || [];
    var upperInt = [0, 0], lowerInt = [0, 0], p2 = [0, 0];
    var upperDist = 0, lowerDist = 0, d = 0, closestDist = 0;
    var upperIndex = 0, lowerIndex = 0, closestIndex = 0;
    var lowerPoly = [], upperPoly = [];
    var poly = polygon, v2 = polygon;
    if (v2.length < 3) {
      return result;
    }
    level++;
    if (level > maxlevel) {
      console.warn("quickDecomp: max level (" + maxlevel + ") reached.");
      return result;
    }
    for (var i = 0; i < polygon.length; ++i) {
      if (polygonIsReflex(poly, i)) {
        reflexVertices.push(poly[i]);
        upperDist = lowerDist = Number.MAX_VALUE;
        for (var j = 0; j < polygon.length; ++j) {
          if (isLeft(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j)) && isRightOn(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j - 1))) {
            p2 = getIntersectionPoint(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j), polygonAt(poly, j - 1));
            if (isRight(polygonAt(poly, i + 1), polygonAt(poly, i), p2)) {
              d = sqdist(poly[i], p2);
              if (d < lowerDist) {
                lowerDist = d;
                lowerInt = p2;
                lowerIndex = j;
              }
            }
          }
          if (isLeft(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j + 1)) && isRightOn(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j))) {
            p2 = getIntersectionPoint(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j), polygonAt(poly, j + 1));
            if (isLeft(polygonAt(poly, i - 1), polygonAt(poly, i), p2)) {
              d = sqdist(poly[i], p2);
              if (d < upperDist) {
                upperDist = d;
                upperInt = p2;
                upperIndex = j;
              }
            }
          }
        }
        if (lowerIndex === (upperIndex + 1) % polygon.length) {
          p2[0] = (lowerInt[0] + upperInt[0]) / 2;
          p2[1] = (lowerInt[1] + upperInt[1]) / 2;
          steinerPoints.push(p2);
          if (i < upperIndex) {
            polygonAppend(lowerPoly, poly, i, upperIndex + 1);
            lowerPoly.push(p2);
            upperPoly.push(p2);
            if (lowerIndex !== 0) {
              polygonAppend(upperPoly, poly, lowerIndex, poly.length);
            }
            polygonAppend(upperPoly, poly, 0, i + 1);
          } else {
            if (i !== 0) {
              polygonAppend(lowerPoly, poly, i, poly.length);
            }
            polygonAppend(lowerPoly, poly, 0, upperIndex + 1);
            lowerPoly.push(p2);
            upperPoly.push(p2);
            polygonAppend(upperPoly, poly, lowerIndex, i + 1);
          }
        } else {
          if (lowerIndex > upperIndex) {
            upperIndex += polygon.length;
          }
          closestDist = Number.MAX_VALUE;
          if (upperIndex < lowerIndex) {
            return result;
          }
          for (var j = lowerIndex; j <= upperIndex; ++j) {
            if (isLeftOn(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j)) && isRightOn(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j))) {
              d = sqdist(polygonAt(poly, i), polygonAt(poly, j));
              if (d < closestDist && polygonCanSee2(poly, i, j)) {
                closestDist = d;
                closestIndex = j % polygon.length;
              }
            }
          }
          if (i < closestIndex) {
            polygonAppend(lowerPoly, poly, i, closestIndex + 1);
            if (closestIndex !== 0) {
              polygonAppend(upperPoly, poly, closestIndex, v2.length);
            }
            polygonAppend(upperPoly, poly, 0, i + 1);
          } else {
            if (i !== 0) {
              polygonAppend(lowerPoly, poly, i, v2.length);
            }
            polygonAppend(lowerPoly, poly, 0, closestIndex + 1);
            polygonAppend(upperPoly, poly, closestIndex, i + 1);
          }
        }
        if (lowerPoly.length < upperPoly.length) {
          polygonQuickDecomp(lowerPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level);
          polygonQuickDecomp(upperPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level);
        } else {
          polygonQuickDecomp(upperPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level);
          polygonQuickDecomp(lowerPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level);
        }
        return result;
      }
    }
    result.push(polygon);
    return result;
  }
  function polygonRemoveCollinearPoints(polygon, precision) {
    var num = 0;
    for (var i = polygon.length - 1; polygon.length > 3 && i >= 0; --i) {
      if (collinear(polygonAt(polygon, i - 1), polygonAt(polygon, i), polygonAt(polygon, i + 1), precision)) {
        polygon.splice(i % polygon.length, 1);
        num++;
      }
    }
    return num;
  }
  function polygonRemoveDuplicatePoints(polygon, precision) {
    for (var i = polygon.length - 1; i >= 1; --i) {
      var pi = polygon[i];
      for (var j = i - 1; j >= 0; --j) {
        if (points_eq(pi, polygon[j], precision)) {
          polygon.splice(i, 1);
          continue;
        }
      }
    }
  }
  function scalar_eq(a, b, precision) {
    precision = precision || 0;
    return Math.abs(a - b) <= precision;
  }
  function points_eq(a, b, precision) {
    return scalar_eq(a[0], b[0], precision) && scalar_eq(a[1], b[1], precision);
  }
  return src;
}
var srcExports = requireSrc();
const index = /* @__PURE__ */ getDefaultExportFromCjs(srcExports);
const index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [srcExports]);
const Bodies = matterExports.Bodies;
const Body = matterExports.Body;
const Common = matterExports.Common;
const Engine = matterExports.Engine;
const Events = matterExports.Events;
const Render = matterExports.Render;
const Runner = matterExports.Runner;
const Vector = matterExports.Vector;
const World = matterExports.World;
const debounce = lodashExports.debounce;
export {
  Bodies,
  Body,
  Common,
  Engine,
  Events,
  Render,
  Runner,
  Ci as SVGPathCommander,
  Vector,
  World,
  clsx,
  debounce,
  index$1 as polyDecomp,
  twMerge
};
//# sourceMappingURL=packages.js.map
