import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { getAllOrders } from "../services/orders.db";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid } from "react-loading-icons";
import { HiSortDescending } from "react-icons/hi";
import format from "date-fns/format";
import { sortByDate } from "../functions/sorting";

/**
 * @returns the list of current jobs
 */
const Joblist = () => {
  const { jobs, setJobs, removeJob } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDueDesc, setIsDueDesc] = useState(true);

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
          <Title handleDueClick={handleDueClick} isDueDesc={isDueDesc} />
          {jobs.length > 0 && (
            <Jobs
              jobs={jobs}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              removeJob={removeJob}
            />
          )}
        </div>
      )}
    </div>
  );
};

const Title = ({ isDueDesc, handleDueClick }) => {
  return (
    <div className="title">
      <h1>Priority</h1>
      <h1>SO</h1>
      <h1>PN</h1>
      <h1>Bin</h1>
      <h1>DC</h1>
      <div className="title-text-container">
        <h1>DUE</h1>
        <HiSortDescending
          onClick={handleDueClick}
          className={isDueDesc ? "sort-icon" : "sort-icon flip"}
        />
      </div>
      <h1>Customer</h1>
      <h1>Note</h1>
      <MoreVertIcon className="three-dots" style={{ display: "none" }} />
    </div>
  );
};

const Jobs = ({ jobs, anchorEl, setAnchorEl, removeJob }) => {
  return (
    <div className="jobs">
      {jobs.map((job) => {
        return (
          <Job
            key={job._id}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            removeJob={removeJob}
            job={job}
          ></Job>
        );
      })}
    </div>
  );
};

const Job = ({ job, anchorEl, setAnchorEl, removeJob }) => {
  const { so, pn, bin, dc, due, customer, note, _id } = job;
  const open = Boolean(anchorEl);

  const cardStyle = {
    background: "",
  };

  // const clamp = (days, difference) => {
  //   // console.log(days, difference);
  //   const min = 0.2;
  //   const max = 0.9;
  //   const ratio = 1 - difference / days;
  //   // console.log(ratio);

  //   return ratio < min ? min : ratio > max ? max : ratio;
  // };

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={`job-card ${priority}`} style={cardStyle}>
      <h3 className="priority">{priority.toUpperCase()}</h3>
      <h3>{so}</h3>
      <h3>{pn}</h3>
      <h3>{bin}</h3>
      <h3>{dc}</h3>
      <h3>{format(new Date(due), "P")}</h3>
      <h3>{customer}</h3>
      <h3>{note}</h3>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <MoreVertIcon className="three-dots-job" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            removeJob(_id);
          }}
        >
          Remove
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Joblist;
