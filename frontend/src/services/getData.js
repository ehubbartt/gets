import axios from "axios";

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

export const getText = () => {
  axios.get("http://localhost:5000/text").then((response) => {
    console.log(response);
  });
};
