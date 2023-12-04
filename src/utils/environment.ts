import { str, envsafe, num } from "envsafe";
require('dotenv').config();

export const env = envsafe({
  DAY: num({
      default: 1,
      allowEmpty: true,
      desc: "The day of advent of code to run",
  }),
  YEAR: num({
      default: 2023,
      allowEmpty: true,
      desc: "Year of advent of code to run",
  }),
  SESSION_COOKIE: str({
      devDefault: "",
      allowEmpty: true,
      desc: "Session cookie for fetching input/test data. Only needed if you want to automatically fetch input/test data.",
  }),
});
