module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "off",
    files: [
      "**/*",
      "!node_modules/**/*"
    ],
    mutate: [ "__tests__/*"],
  });
};
