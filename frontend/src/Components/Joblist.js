import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { getAllOrders } from "../services/orders.db";
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

  return (
    <div id="joblist-container">
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
        return <Job key={job._id} job={job}></Job>;
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
    </div>
  );
};

export default Joblist;
