const dateDistance = (due, cardStyle) => {
  const today = new Date();
  let date = new Date(due);

  let priority = "";
  let differenceInDays =
    (date.getTime() - today.getTime()) / (1000 * 3600 * 24);
  if (differenceInDays < 0) {
    priority = "high";
    cardStyle.background = `rgb(255, 105, 97, ${0.5})`;
  } else if (differenceInDays < 7) {
    priority = "medium";
    cardStyle.background = `rgb(255, 255, 153, ${0.5})`;
  } else {
    priority = "low";
    cardStyle.background = `rgb(193, 225, 193, ${0.5})`;
  }
  return priority;
};

export default dateDistance;
