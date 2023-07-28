module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true,
        diagnostics: true,
      },
    ],
  },
  moduleFileExtensions: ["js", "ts", "d.ts"],
  rootDir: "src",
  moduleNameMapper: {
    "^@eventpipe/(.*)$": ["../../../$1"],
  },
  moduleDirectories: ["node_modules", "src"],
};
