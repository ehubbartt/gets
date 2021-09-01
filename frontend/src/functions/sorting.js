import compareAsc from "date-fns/compareAsc";

export const sortByDate = (jobs, isDesc) => {
  let curJobs = jobs;
  curJobs.sort((a, b) => {
    let date1 = new Date(a.due);
    let date2 = new Date(b.due);
    return compareAsc(date1, date2);
  });
  if (isDesc) {
    return curJobs;
  } else {
    return curJobs.reverse();
  }
};
