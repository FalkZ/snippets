export * from "http://localhost:12345/index.js";

fetch("http://localhost:12345/package.json")
  .then((response) => response.json())
  .then(({ version }) => {
    const v = version.split(".").map((s) => parseInt(s));
    v[2] += 1;

    console.log(`You are in dev mode, currently working on:\n@${v.join(".")}`);
  });
