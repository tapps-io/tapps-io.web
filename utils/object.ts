export class ObjectUtil {
  static pick<T, K extends keyof T>(sourceObject: T, ...keys: K[]): Pick<T, K> {
    const newObject: any = {};
    for (const key of keys) {
      newObject[key] = sourceObject[key];
    }
    return newObject;
  }
}
