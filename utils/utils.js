function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}
export function deepCopy(source) {
    if (!isObject(source)) return source; //如果不是对象直接返回
    let target = Array.isArray(source) ? [] : {};
    for (let k in source) {
        if (source.hasOwnProperty(k)) { //属性属于对象实例，而非实例的原型中
            if (typeof source[k] === 'object') {
                target[k] = deepCopy(source[k]);
            } else {
                target[k] = source[k];
            }
        }
    }
    return target;
}