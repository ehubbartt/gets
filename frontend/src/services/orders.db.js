export const getAllOrders = async () => {
  const resp = await fetch("http://localhost:5000/all-orders");
  return resp.json();
};

export const createOrder = async (order = {}) => {
  const abortController = new AbortController();
  const resp = await fetch("http://localhost:5000/create-order", {
    signal: abortController.signal,
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return resp.json();
};
