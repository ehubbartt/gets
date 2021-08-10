import { keys } from "../data.js";

/**
 * computes the similarity between two strings as a percent
 * @param {string} s1 first string you want to compare
 * @param {string} s2 seconds string you want to compare
 * @returns the percent similarity of the two strings
 */
const similarity = (s1, s2) => {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
};

/**
 * helper function for similarity(). Computes the edit distance/cost
 * between two strings
 * @param {string} s1 first string you want to compare
 * @param {string} s2 seconds string you want to compare
 * @returns edit cost
 */
const editDistance = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};

/**
 * takes in a string and compares the string with the our keys.
 * checks to see if the string matches one of the keys
 * @param {string} string
 * @returns code from key object if matching, otherwise returns undefined
 */
export const doesInclude = (string) => {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    for (let j = 0; j < key.strings.length; j++) {
      if (string.includes(key.strings[j])) {
        return key.code;
      } else if (similarity(string, key.strings[j]) >= 0.8) {
        return key.code;
      }
    }
  }
};

export const splitOnColon = (lines) => {
  const allText = [];
  for (let i = 0; i < lines.length; i++) {
    let text = lines[i].text;
    if (text.includes(":") && text.charAt(text.length - 1) !== ":") {
      let split = text.split(":");
      for (let j = 0; j < split.length; j++) {
        allText.push(split[j]);
      }
    } else {
      allText.push(text);
    }
  }
  return allText;
};

export const createParsedText = (allText) => {
  const parsedText = {};
  for (let i = 0; i < allText.length; i++) {
    const code = doesInclude(allText[i].toLowerCase());
    if (code) {
      let nextWord = allText[i + 1];
      nextWord = nextWord.replace(" ", "");
      if (code === "dateCode") {
        nextWord = nextWord.substring(0, 4);
      }
      parsedText[`${code}`] = nextWord; //adds to the object based on the code value from the key
    }
  }
  return parsedText;
};
