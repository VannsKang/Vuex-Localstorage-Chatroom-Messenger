import { Chat } from "@/store/chatReducer";
import { Logined } from "@/store/userReducer";

// SECTION types
interface MatchTable {
  [day: number]: string;
}

// SECTION function
export const formatDay = (d: number) => {
  const matchTable: MatchTable = {
    0: "일요일",
    1: "월요일",
    2: "화요일",
    3: "수요일",
    4: "목요일",
    5: "금요일",
    6: "토요일"
  };

  return matchTable[d];
};

export const getDateObject = (d: Date) => {
  const absoluteTime = Date.now();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const day = formatDay(d.getDay());
  const hours = ("0" + d.getHours()).slice(-2);
  const minutes = ("0" + d.getMinutes()).slice(-2);
  return { absoluteTime, year, month, date, day, hours, minutes };
};

export const checkTime = (t: Date, c: Chat[], l: Logined) => {
  const minute = getDateObject(t).minutes;
  const lastMinute = c[c.length - 1]?.time.minutes;
  const lastSame = c[c.length - 1]?.isSameTime;
  const lastWho = c[c.length - 1]?.name?.id;

  if (minute === lastMinute && !lastSame && lastWho === l?.id)
    c[c.length - 1].isSameTime = true;
  return false;
};

export const checkDay = (t: Date, c: Chat[]) => {
  const day = getDateObject(t).day;
  const lastDay = c[c.length - 1]?.time.day;
  return day === lastDay;
};
