type AnyObject = Record<string, any>

export const deepMerge = <T extends AnyObject, S extends AnyObject>(target: T, source: S): T & S => {
  if (typeof source !== 'object' || source === null) {
    return source as any
  }

  const merged: AnyObject = { ...target }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (Array.isArray(source[key])) {
          merged[key] = source[key]
        } else {
          merged[key] = deepMerge(merged[key] || {}, source[key])
        }
      } else {
        merged[key] = source[key]
      }
    }
  }

  return merged as T & S
}
