import { AiOutlineHome } from "react-icons/ai";
import { CgWorkAlt } from "react-icons/cg";

export const jobsData = [];
export const job = {};

export const navData = [
  {
    sectionid: 1,
    section: "Main",
    links: [{ id: 11, url: "/", text: "Home", icon: <AiOutlineHome /> }],
  },
  {
    sectionid: 2,
    section: "Orders",
    links: [{ id: 21, url: "/jobs", text: "Jobs", icon: <CgWorkAlt /> }],
  },
];
