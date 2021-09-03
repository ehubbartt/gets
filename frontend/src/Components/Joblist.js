import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { getAllOrders } from "../services/orders.db";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid } from "react-loading-icons";
import { HiSortDescending } from "react-icons/hi";
import { sortByDate } from "../functions/sorting";
import Job from "./Job";

/**
 * @returns the list of current jobs
 */
const Joblist = () => {
  const { jobs, setJobs, removeJob } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isDueDesc, setIsDueDesc] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const priorities = ["all", "high", "medium", "low"];

  useEffect(() => {
    (async () => {
      const data = await getAllOrders();
      let sortedData = sortByDate(data, true);
      setJobs([...sortedData]);
      setIsLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  const handleDueClick = () => {
    setIsDueDesc(!isDueDesc);
    const sortedJobs = sortByDate(jobs, !isDueDesc);
    setJobs([...sortedJobs]);
  };

  return (
    <div id="joblist-container">
      {isLoading ? (
        <>
          <Grid stroke="#678efe" style={{ margin: "50px" }} fill="#678efe" />
        </>
      ) : (
        <div className="scroll-container">
          <Title
            handleDueClick={handleDueClick}
            isDueDesc={isDueDesc}
            setPriorityFilter={setPriorityFilter}
            priorities={priorities}
          />
          {jobs.length > 0 && (
            <div className="jobs">
              {jobs.map((job) => {
                return (
                  <Job
                    key={job._id}
                    removeJob={removeJob}
                    job={job}
                    priorityFilter={priorityFilter}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Title = ({ isDueDesc, handleDueClick }) => {
  let color = "black";
  return (
    <div className="title">
      <div className="priority-text-container">
        <h1 className="title-text">Priority</h1>
        <div className="priority-btn" style={{ background: color }}>
          A
        </div>
      </div>
      <h1 className="title-text">SO</h1>
      <h1 className="title-text">PN</h1>
      <h1 className="title-text">Bin</h1>
      <h1 className="title-text">DC</h1>
      <div className="title-text-container">
        <h1 className="title-text">DUE</h1>
        <HiSortDescending
          onClick={handleDueClick}
          className={isDueDesc ? "sort-icon" : "sort-icon flip"}
        />
      </div>
      <h1 className="title-text">Customer</h1>
      <h1 className="title-text">Note</h1>
      <MoreVertIcon className="three-dots" style={{ display: "none" }} />
    </div>
  );
};

export default Joblist;
