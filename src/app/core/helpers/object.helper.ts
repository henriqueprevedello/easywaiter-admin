export class ObjectHelper {

  static iguais(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

}
