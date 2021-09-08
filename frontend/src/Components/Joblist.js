import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { getAllOrders } from "../services/orders.db";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid } from "react-loading-icons";
import { HiSortDescending } from "react-icons/hi";
import { sortByDate } from "../functions/sorting";
import Job from "./Job";
import dateDistance from "../functions/date-distance";

/**
 * @returns the list of current jobs
 */
const Joblist = () => {
  const { jobs, setJobs, removeJob } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isDueDesc, setIsDueDesc] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [priorityIndex, setPriorityIndex] = useState(0);
  const [priorityText, setPriorityText] = useState("A");
  const priorities = ["all", "high", "medium", "low"];
  const colors = ["black", "red", "rgb(197, 197, 9)", "green"];

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

  const handlePriorityClick = () => {
    setPriorityIndex(priorityIndex + 1);
  };

  useEffect(() => {
    let curIndex = priorityIndex;
    if (priorityIndex > priorities.length - 1) {
      setPriorityIndex(0);
      curIndex = 0;
    }
    setPriorityText(priorities[curIndex].charAt(0).toUpperCase());
    // eslint-disable-next-line
  }, [priorityIndex]);

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
            colors={colors}
            priorityIndex={priorityIndex}
            handlePriorityClick={handlePriorityClick}
            priorityText={priorityText}
          />
          {jobs.length > 0 && (
            <div className="jobs">
              {jobs.map((job) => {
                let { priority } = dateDistance(job.due);
                if (
                  priority !== priorities[priorityIndex] &&
                  priorities[priorityIndex] !== "all"
                ) {
                  return null;
                }
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

const Title = ({
  isDueDesc,
  handleDueClick,
  colors,
  priorityIndex,
  handlePriorityClick,
  priorityText,
}) => {
  return (
    <div className="title">
      <div className="priority-text-container">
        <h1 className="title-text">Priority</h1>
        <div
          className="priority-btn"
          style={{ background: colors[priorityIndex] }}
          onClick={handlePriorityClick}
        >
          {priorityText}
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
