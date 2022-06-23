const yaml = require("js-yaml");
const fs = require("fs");
const router = require("express").Router();

try {
  const doc = yaml.load(fs.readFileSync("../menu.yaml", "utf8"));
  console.log(doc);
} catch (e) {
  console.log(e);
}
