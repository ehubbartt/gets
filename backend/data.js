/**
 * array of object {keys} that contain strings that will be used to compare
 * to the text found in the images. each key has a code as well that is the category
 * that the strings are associated with
 */
export const keys = [
  {
    strings: ["date code", "date/lot code", "d/c"],
    code: "dc",
  },
  {
    strings: ["cust p/n", "(1p)", "<p>", "p/n"],
    code: "pn",
  },
  {
    strings: ["quantity", "qty", "<q>"],
    code: "qty",
  },
  {
    strings: ["sales order", "so #", "purchase order"],
    code: "so",
  },
  {
    strings: ["reel #"],
    code: "reel",
  },
  {
    strings: ["bin #"],
    code: "bin",
  },
  {
    strings: ["lot#"],
    code: "lot",
  },
  {
    strings: ["mfg"],
    code: "manufacturer",
  },
];
