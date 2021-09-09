const dateDistance = (due) => {
  const today = new Date();
  let date = new Date(due);
  let index = 0;

  let priority = "";
  let differenceInDays =
    (date.getTime() - today.getTime()) / (1000 * 3600 * 24);
  if (differenceInDays < 0) {
    priority = "high";
  } else if (differenceInDays < 7) {
    priority = "med";
    index = 1;
  } else {
    priority = "low";
    index = 2;
  }
  return { priority, index };
};

export default dateDistance;
