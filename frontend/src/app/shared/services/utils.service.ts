import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Method that returns if the input value is empty
   *
   * @param input
   */
  static isVoid(input: any) {
    return input === 'undefined' || input === undefined || input === null || input === 'null' || input === '' || (input instanceof Array && input.length === 0);
  }

  /**
   * Function that returns if the input object has void properties
   *
   * @param obj
   */
  static isVoidObj(obj: any): boolean {
    let control = true;
    if (!UtilsService.isVoid(obj)) {
      // @ts-ignore
      control = Object.keys(obj).reduce((res, k) => res && !(!!obj[k] || obj[k] === false || !isNaN(parseInt(obj[k]))) || obj[k] == {}, true);
    }
    return control;
  }

  /**
   * Function that replace in a given string all the placeholder with the input value
   *
   * @param msg message with placeholder
   * @param placeholder placeholder to replace (usually _{placeholder}_)
   * @param value value to replace the placeholder with
   * @return msg message replaced
   */
  static replacePlaceholder(msg: string, placeholder: string | RegExp, value: string): string {
    return msg.replaceAll(placeholder, value);
  }

  /**
   * Function that replace in a given string all the placeholders with their values.
   *
   * @param msg message with placeholders
   * @param params2Replace map of the placeholders, where the key is the placeholder and the value the replacement
   * @return msg message after replace
   */
  static replaceAllPlaceholder(msg: string, params2Replace: Map<string, string>): string {
    if (msg && params2Replace) {
      params2Replace.forEach((value: string, key: string) => {
        msg = this.replacePlaceholder(msg, key, value);
      })
    }
    return msg;
  }

}
