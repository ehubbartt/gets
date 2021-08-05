import { keys } from "../data.js";

export const doesInclude = (string) => {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (string.includes(key.string)) {
      return key.code; // this line never gets called
    }
  }
};
