import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

/**
 * Checks whether the given input is considered "void" or "empty".
 *
 * A value is considered void if it is:
 * - `null` or `undefined`
 * - a string that is empty, `'null'`, or `'undefined'`
 * - an empty array (`[]`)
 * - an empty object (`{}`)
 * - an empty `Map` or `Set`
 * - an empty `FileList` (converted via Array.from)
 * - an empty `Blob` (zero size)
 *
 * @param input - The value to check.
 * @returns `true` if the input is considered void; otherwise, `false`.
 *
 * @example
 * isVoid(null);              // true
 * isVoid('');                // true
 * isVoid('null');            // true
 * isVoid([]);                // true
 * isVoid({});                // true
 * isVoid(new Map());         // true
 * isVoid('hello');           // false
 * isVoid([1, 2, 3]);         // false
 * isVoid({ a: 1 });          // false
 * isVoid(new Blob(['data']));// false
 */
  static isVoid(input: unknown): boolean {
    if (input === null || input === undefined) return true;

    if (typeof input === 'string') {
      const trimmed = input.trim();
      return trimmed === '' || trimmed === 'null' || trimmed === 'undefined';
    }

    if (Array.isArray(input)) {
      return input.length === 0;
    }

    if (typeof input === 'object') {
      if (input instanceof Map || input instanceof Set) {
        return input.size === 0;
      }

      if (input instanceof FileList) {
        return Array.from(input).length === 0;
      }

      if (input instanceof Blob) {
        return input.size === 0;
      }

      // Generic Object
      return Object.keys(input).length === 0;
    }

    return false;
  }

  /**
   * Replaces all occurrences of a placeholder in a string with a given value.
   *
   * @param msg - The original message containing the placeholder(s).
   * @param placeholder - The placeholder to replace. Can be a string or a RegExp.
   * @param value - The value to insert in place of the placeholder.
   * @returns The message with all placeholders replaced.
   */
  static replacePlaceholder(msg: string, placeholder: string | RegExp, value: string): string {
    if (typeof placeholder === 'string') {
      // Escape special characters to use safely in RegExp
      const escaped = placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      return msg.replace(new RegExp(escaped, 'g'), value);
    }
    return msg.replace(placeholder, value);
  }


  /**
   * Replaces all placeholders in a message with their corresponding values.
   *
   * @param msg - The original message.
   * @param replacements - A map or object where keys are placeholders and values are replacements.
   * @returns The updated message with all replacements applied.
   */
  static replaceAllPlaceholders(msg: string, replacements: Record<string, string>): string {
    for (const [placeholder, value] of Object.entries(replacements)) {
      msg = this.replacePlaceholder(msg, placeholder, value);
    }
    return msg;
  }


}
