import React from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeOutlined from "@mui/icons-material/AddHomeOutlined";
import TrainIcon from "@mui/icons-material/Train";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WorkIcon from "@mui/icons-material/Work";
import AddBuisinessIcon from "@mui/icons-material/AddBusiness";
import SavingsIcon from "@mui/icons-material/Savings";
import { expenseCategory, incomeCategory } from "../../types";

const IconComponents: Record<incomeCategory | expenseCategory, JSX.Element> = {
  食費: <FastfoodIcon fontSize="small" />,
  日用品: <AlarmIcon fontSize="small" />,
  住居費: <AddHomeOutlined fontSize="small" />,
  交通費: <TrainIcon fontSize="small" />,
  交際費: <Diversity3Icon fontSize="small" />,
  娯楽: <SportsTennisIcon fontSize="small" />,
  その他: <MoreHorizIcon fontSize="small" />,
  給与: <WorkIcon fontSize="small" />,
  副収入: <AddBuisinessIcon fontSize="small" />,
  お小遣い: <SavingsIcon fontSize="small" />,
};

export default IconComponents;
