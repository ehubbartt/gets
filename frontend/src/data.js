import { AiOutlineHome, AiOutlineSafety } from "react-icons/ai";
import { CgWorkAlt, CgTemplate } from "react-icons/cg";
import JobPage from "./Pages/JobPage";
import HomePage from "./Pages/HomePage";
import PayPage from "./Pages/PayPage";
import PartOCR from "./Pages/PartOCR";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import InfoIcon from "@material-ui/icons/Info";
import { BiBook } from "react-icons/bi";
import { MdDescription } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import {
  GiCpu,
  GiReceiveMoney,
  GiTestTubes,
  GiMicroscope,
} from "react-icons/gi";

export const jobsData = [];
export const job = {};
const navIconSize = "20px";
const menuIconSize = "30px";
export const iconStyles = {
  navIcon: {
    width: navIconSize,
    height: navIconSize,
  },
  menuIcon: {
    width: menuIconSize,
    height: menuIconSize,
    cursor: "pointer",
    color: "#494949",
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
        page: <PayPage title="Employee Pay" />,
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
        icon: <GiReceiveMoney style={iconStyles.navIcon} />,
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
        page: <PartOCR title="Part OCR" />,
        url: "/part-ocr",
        text: "Part OCR",
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
  {
    sectionid: 5,
    section: "TESTS",
    links: [
      {
        id: 51,
        page: <HomePage title="List Test Report" />,
        url: "/test-reports",
        text: "Test Reports",
        icon: <GiTestTubes style={iconStyles.navIcon} />,
        exact: false,
      },
      {
        id: 52,
        page: <HomePage title="List Test Report" />,
        url: "/manage-template",
        text: "Manage Template",
        icon: <CgTemplate style={iconStyles.navIcon} />,
        exact: false,
      },
      {
        id: 53,
        page: <HomePage title="List Test Report" />,
        url: "/Add-template",
        text: "Add Template",
        icon: <CgTemplate style={iconStyles.navIcon} />,
        exact: false,
      },
      {
        id: 54,
        page: <HomePage title="List Test Report" />,
        url: "/cost-template",
        text: "Template Cost",
        icon: <CgTemplate style={iconStyles.navIcon} />,
        exact: false,
      },
    ],
  },
  {
    sectionid: 6,
    section: "EQUIPMENT",
    links: [
      {
        id: 61,
        page: <HomePage title="List of Equipments" />,
        url: "/list-equipment",
        text: "List-Equipment",
        icon: <GiMicroscope style={iconStyles.navIcon} />,
        exact: false,
      },
    ],
  },
];

/**
 * name is the text before the input and the object name used for the
 * type is the type for the input
 * ph is the placeholder text for the input
 */
export const inputData = [
  { name: "SO", type: "string", ph: "Sales Order" },
  { name: "PN", type: "string", ph: "Part Number" },
  { name: "Bin", type: "string", ph: "Bin" },
  { name: "DC", type: "string", ph: "Date Code" },
  { name: "DUE", type: "string", ph: "Due Date" },
  { name: "Customer", type: "string", ph: "Customer Name" },
  { name: "Note", type: "string", ph: "Note" },
];
