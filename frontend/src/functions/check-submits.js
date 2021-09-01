export const checkIfAllOkay = (curAreInputsOkay) => {
  return (
    curAreInputsOkay.so &&
    curAreInputsOkay.pn &&
    curAreInputsOkay.bin &&
    curAreInputsOkay.dc &&
    curAreInputsOkay.due &&
    curAreInputsOkay.customer
  );
};

export const checkSubmitJob = (areInputsOkay, order, date) => {
  const curAreInputsOkay = areInputsOkay;
  if (!order.so) {
    curAreInputsOkay.so = false;
  }
  if (!order.pn) {
    curAreInputsOkay.pn = false;
  }
  if (!order.bin) {
    curAreInputsOkay.bin = false;
  }
  if (!order.dc) {
    curAreInputsOkay.dc = false;
  }
  if (!date) {
    curAreInputsOkay.due = false;
  } else {
    curAreInputsOkay.due = true;
  }
  if (!order.customer) {
    curAreInputsOkay.customer = false;
  }
  console.log(curAreInputsOkay);
  return curAreInputsOkay;
};
