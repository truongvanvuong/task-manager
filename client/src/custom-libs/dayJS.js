import dayjs from "dayjs";
import "dayjs/locale/vi.js";
import updateLocale from "dayjs/plugin/updateLocale.js";

dayjs.extend(updateLocale);
dayjs.updateLocale("vi", {
  monthsShort: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  weekdaysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
});
