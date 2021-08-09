import { AiOutlineHome } from "react-icons/ai";
import { CgWorkAlt } from "react-icons/cg";
import JobPage from "./Pages/JobPage";
import HomePage from "./Pages/HomePage";

export const jobsData = [];
export const job = {};

export const navData = [
  {
    sectionid: 1,
    section: "MAIN",
    links: [
      {
        id: 11,
        page: <HomePage title="Home" />,
        url: "/",
        text: "Home",
        icon: <AiOutlineHome />,
        exact: true,
      },
    ],
  },
  {
    sectionid: 2,
    section: "ORDERS",
    links: [
      {
        id: 21,
        page: <JobPage title="Job List" />,
        url: "/jobs",
        text: "Jobs",
        icon: <CgWorkAlt />,
        exact: false,
      },
    ],
  },
];
