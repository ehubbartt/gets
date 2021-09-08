import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import format from "date-fns/format";
import dateDistance from "../functions/date-distance";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Job = ({ job, removeJob }) => {
  const { so, pn, bin, dc, due, customer, note, _id } = job;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const colors = [
    `rgb(255, 105, 97, ${0.5})`,
    `rgb(255, 255, 153, ${0.5})`,
    `rgb(193, 225, 193, ${0.5})`,
  ];

  // const clamp = (days, difference) => {
  //   // console.log(days, difference);
  //   const min = 0.2;
  //   const max = 0.9;
  //   const ratio = 1 - difference / days;
  //   // console.log(ratio);

  //   return ratio < min ? min : ratio > max ? max : ratio;
  // };

  const { priority, index } = dateDistance(due);
  const cardStyle = {
    background: colors[index],
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`job-card ${priority}`} style={cardStyle}>
      <h3 className="priority">{priority.toUpperCase()}</h3>
      <h3 className="card-text">{so}</h3>
      <h3 className="card-text">{pn}</h3>
      <h3 className="card-text">{bin}</h3>
      <h3 className="card-text">{dc}</h3>
      <h3 className="card-text">{format(new Date(due), "P")}</h3>
      <h3 className="card-text">{customer}</h3>
      <h3 className="card-text">{note}</h3>
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

export default Job;
