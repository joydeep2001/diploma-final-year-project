const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

try {
  const filecontent = fs.readFileSync(
    path.resolve(__dirname, "../menu.yaml"),
    "utf8"
  );

  const doc = yaml.loadAll(filecontent, {
    noArrayIndent: true,
    flowLevel: 4,
    indent: 2,
  });
  console.log(doc);
} catch (e) {
  console.log(e);
}
