import {
  addDays,
  addMonths,
  addWeeks,
  format
} from "date-fns";

const APP_TIMEZONE_OFFSET_MINUTES = 330;
const APP_TIMEZONE_OFFSET_MS = APP_TIMEZONE_OFFSET_MINUTES * 60 * 1000;

const shiftToAppTimezone = (date: Date) => new Date(date.getTime() + APP_TIMEZONE_OFFSET_MS);
const shiftFromAppTimezone = (date: Date) => new Date(date.getTime() - APP_TIMEZONE_OFFSET_MS);

const createAppTimezoneDate = (year: number, month: number, day: number) =>
  shiftFromAppTimezone(new Date(Date.UTC(year, month, day)));

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);

export const formatDisplayDate = (value: Date | string) => format(new Date(value), "dd/MM/yyyy");

export const getMonthKey = (date: Date) => {
  const shifted = shiftToAppTimezone(date);
  const year = shifted.getUTCFullYear();
  const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
};

export const getDateBoundaries = (scope: "day" | "week" | "month", reference = new Date()) => {
  const shifted = shiftToAppTimezone(reference);
  const year = shifted.getUTCFullYear();
  const month = shifted.getUTCMonth();
  const day = shifted.getUTCDate();
  const dayStart = createAppTimezoneDate(year, month, day);

  if (scope === "day") {
    return {
      start: dayStart,
      end: addDays(dayStart, 1)
    };
  }

  if (scope === "week") {
    const weekDayIndex = (shifted.getUTCDay() + 6) % 7;
    const weekStart = addDays(dayStart, -weekDayIndex);

    return {
      start: weekStart,
      end: addDays(weekStart, 7)
    };
  }

  const monthStart = createAppTimezoneDate(year, month, 1);
  const monthEnd = createAppTimezoneDate(year, month + 1, 1);

  return {
    start: monthStart,
    end: monthEnd
  };
};

export const getDateDaysAgo = (daysAgo: number, reference = new Date()) => {
  const shifted = shiftToAppTimezone(reference);
  const shiftedDate = new Date(
    Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate())
  );

  return shiftFromAppTimezone(addDays(shiftedDate, -daysAgo));
};

export const formatDayLabel = (value: Date | string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short"
  }).format(new Date(value));

export const advanceDateByFrequency = (date: Date, frequency: "daily" | "weekly" | "monthly") => {
  if (frequency === "daily") {
    return addDays(date, 1);
  }

  if (frequency === "weekly") {
    return addWeeks(date, 1);
  }

  return addMonths(date, 1);
};
