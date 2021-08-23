import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { getAllOrders } from "../services/orders.db";
import { BsThreeDotsVertical } from "react-icons/bs";
import compareAsc from "date-fns/compareAsc";
/**
 * @returns the list of current jobs
 */
const Joblist = () => {
  const { jobs, setJobs } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getAllOrders();
      setJobs(data);
      setIsLoading(false);
    })();
  }, [setJobs]);

  const sortByDate = () => {
    let curJobs = jobs;

    curJobs.sort((a, b) => {
      let date1 = a.due.split("/");
      let date2 = b.due.split("/");

      return compareAsc(
        new Date(date1[0], date1[1], date1[2]),
        new Date(date2[0], date2[1], date2[2])
      );
    });
    console.log(curJobs);
  };

  return (
    <div id="joblist-container" onClick={sortByDate}>
      <Title />
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="scroll-container">
          {jobs.length > 0 && <Jobs jobs={jobs} />}
        </div>
      )}
    </div>
  );
};

const Title = () => {
  return (
    <div className="title">
      <h3>SO</h3>
      <h3>PN</h3>
      <h3>Bin</h3>
      <h3>DC</h3>
      <h3>DUE</h3>
      <h3>Customer</h3>
      <h3>Note</h3>
    </div>
  );
};

const Jobs = ({ jobs }) => {
  return (
    <div className="jobs">
      {jobs.map((job) => {
        return <Job key={job._id} id={job.id} job={job}></Job>;
      })}
    </div>
  );
};

const Job = ({ job }) => {
  const { so, pn, bin, dc, due, customer, note } = job;
  return (
    <div className="job-card">
      <span>{so}</span>
      <span>{pn}</span>
      <span>{bin}</span>
      <span>{dc}</span>
      <span>{due}</span>
      <span>{customer}</span>
      <span>{note}</span>
      <BsThreeDotsVertical className="three-dots-job" />
    </div>
  );
};

export default Joblist;
