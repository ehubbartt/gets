/**
 * does a post request to get parsed text from the api
 * @param {object} data contains the image url
 * @returns
 */
export const postParsedText = async (data = {}) => {
  const resp = await fetch("http://localhost:5000/text/parsed", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return resp.json();
};
