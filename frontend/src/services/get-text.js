/**
 * does a post request to get parsed text from the api
 * @param {object} data contains the image url
 * @returns
 */
export const postParsedText = async (data = {}) => {
  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
  const blob = b64toBlob(data.image, "image/jpeg");
  let fd = new FormData();
  fd.append("blob", blob);
  const resp = await fetch("http://localhost:5000/api/image/parsed-text", {
    method: "POST",
    mode: "cors",

    body: fd,
  });
  return resp.json();
};

/**
 * does a post request to get parsed text from the api
 * @param {object} data contains the image url
 * @returns
 */
export const postText = async (data = {}) => {
  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
  const blob = b64toBlob(data.image, "image/jpeg");
  let fd = new FormData();
  fd.append("blob", blob);
  const resp = await fetch("http://localhost:5000/api/image/text", {
    method: "POST",
    mode: "cors",

    body: fd,
  });
  return resp.json();
};
