const repo = new URL(import.meta.url).search.replace("?", "");

export default fetch(`https://api.github.com/repos/${repo}/contents`)
  .then((response) => response.json())
  .then((arr) => {
    const imp = arr
      .map(({ name }) => name)
      .filter((name) => name.endsWith(".js"))
      .map((name) =>
        import(`https://cdn.jsdelivr.net/gh/${repo}/${name}`).then((m) => [
          name.slice(0, -3),
          m.default,
        ])
      );

    return Promise.all(imp).then((all) => Object.fromEntries(all));
  });
