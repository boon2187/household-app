import { Box, Button } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";
import { addMonths, set } from "date-fns";

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
}: MonthSelectorProps) => {
  // 先月に移動する関数
  const handlePreviousMonth = () => {
    const previousMomth = addMonths(currentMonth, -1);
    // console.log(previousMomth);
    setCurrentMonth(previousMomth);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          onClick={handlePreviousMonth}
          color={"error"}
          variant="contained"
        >
          先月
        </Button>
        <DatePicker
          value={currentMonth}
          label="年月を選択"
          sx={{ mx: 2, background: "white" }}
          views={["year", "month"]}
          format="yyyy/MM"
          slotProps={{
            toolbar: {
              toolbarFormat: "yyyy年MM月",
            },
          }}
        />
        <Button color={"primary"} variant="contained">
          今月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
