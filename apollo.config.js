module.exports = {
  client: {
    includes: [
      "./src/queries/*.ts",
      "./src/mutations/*.ts",
      "./src/fragments/*.ts",
    ],
    service: {
      name: "saleor",
      url:
        "https://plixlifefcstagehapi.farziengineer.co/graphql/?source=website",
    },
  },
};
