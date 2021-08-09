import { AiOutlineHome, AiOutlineSafety } from "react-icons/ai";
import { CgWorkAlt } from "react-icons/cg";
import JobPage from "./Pages/JobPage";
import HomePage from "./Pages/HomePage";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import InfoIcon from "@material-ui/icons/Info";
import { BiBook } from "react-icons/bi";
import { MdDescription } from "react-icons/md";
import { FaChalkboardTeacher, FaRegMoneyBillAlt } from "react-icons/fa";
import { GiCpu } from "react-icons/gi";

export const jobsData = [];
export const job = {};
const navIconSize = "20px";
export const iconStyles = {
  navIcon: {
    width: navIconSize,
    height: navIconSize,
  },
};

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
        icon: <AiOutlineHome style={iconStyles.navIcon} />,
        exact: true,
      },
      {
        id: 12,
        page: <HomePage title="Company Info" />,
        url: "/company-info",
        text: "Company Info",
        icon: <InfoIcon style={iconStyles.navIcon} />,
        exact: true,
      },
      {
        id: 13,
        page: <HomePage title="Employee Pay" />,
        url: "/pay",
        text: "Pay",
        icon: <AccountBalanceWalletIcon style={iconStyles.navIcon} />,
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
        icon: <CgWorkAlt style={iconStyles.navIcon} />,
        exact: false,
      },
      {
        id: 22,
        page: <HomePage title="Profits" />,
        url: "/profits",
        text: "Profits",
        icon: <FaRegMoneyBillAlt style={iconStyles.navIcon} />,
        exact: false,
      },
    ],
  },
  {
    sectionid: 3,
    section: "PARTS",
    links: [
      {
        id: 31,
        page: <HomePage title="Part Numbers" />,
        url: "/part-numbers",
        text: "Part Numbers",
        icon: <GiCpu style={iconStyles.navIcon} />,
        exact: false,
      },
    ],
  },
  {
    sectionid: 4,
    section: "AS9100",
    links: [
      {
        id: 41,
        page: <HomePage title="Quality Manual" />,
        url: "/quality-manual",
        text: "Quality Manual",
        icon: <BiBook style={iconStyles.navIcon} />,
        exact: false,
      },
      {
        id: 42,
        page: <HomePage title="Job Descriptions" />,
        url: "/job-descriptions",
        text: "Job Descriptions",
        icon: <MdDescription style={iconStyles.navIcon} />,
        exact: false,
      },
      {
        id: 43,
        page: <HomePage title="Training Docs" />,
        url: "/training-docs",
        text: "Training Docs",
        icon: <FaChalkboardTeacher style={iconStyles.navIcon} />,
        exact: false,
      },
      {
        id: 44,
        page: <HomePage title="Safety" />,
        url: "/safety",
        text: "Safety",
        icon: <AiOutlineSafety style={iconStyles.navIcon} />,
        exact: false,
      },
    ],
  },
];
