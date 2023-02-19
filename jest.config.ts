// import type { Config } from "jest";

// export const config: Config = {
//   setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
// };

module.exports = {
  preset: "ts.jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
