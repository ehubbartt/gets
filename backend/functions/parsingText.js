import { keys } from "../data.js";

export const doesInclude = (string) => {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    for (let j = 0; j < key.strings.length; j++) {
      if (string.includes(key.strings[j])) {
        return key.code;
      }
    }
  }
};
