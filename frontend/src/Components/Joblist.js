import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { getAllOrders } from "../services/orders.db";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import compareAsc from "date-fns/compareAsc";
import MoreVertIcon from "@material-ui/icons/MoreVert";
/**
 * @returns the list of current jobs
 */
//TODO: add sorting buttons to sort by date etc.
const Joblist = () => {
  const { jobs, setJobs, removeJob } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

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
  };

  return (
    <div id="joblist-container" onClick={sortByDate}>
      <Title />
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="scroll-container">
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

const Job = ({ job, anchorEl, setAnchorEl, value, removeJob }) => {
  const { so, pn, bin, dc, due, customer, note, _id } = job;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="job-card">
      <span>{so}</span>
      <span>{pn}</span>
      <span>{bin}</span>
      <span>{dc}</span>
      <span>{due}</span>
      <span>{customer}</span>
      <span>{note}</span>
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
