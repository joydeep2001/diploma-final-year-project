const router = require("express").Router();
const chemQuesUp = require("../models/jeletChemQues");
const feeeQuesUp = require("../models/jeletFeeeQues");
const mathQuesUp = require("../models/jeletMathQues");
const physQuesUp = require("../models/jeletPhysQues");

//-----------------Edit question --------------//
router.post("/chem/edit/", async (req, res) => {
  try {
    const editQues = await chemQuesUp.findOne({
      _id: req.body.id,
    });
    console.log(editQues);
    editQues.question = req.body.question;
    editQues.questionImagePath = req.body.questionImagePath;
    editQues.solution = req.body.solution;
    editQues.solutionImage = req.body.solutionImage;
    editQues.isPreviousYearQuestion = req.body.isPreviousYearQuestion;
    editQues.year = req.body.year;
    editQues.chapter = req.body.chapter;

    console.log(req.body.isPreviousYearQuestion);
    const q1 = await editQues.save();
    res.json(q1);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to Update", error: true });
  }
});

router.post("/math/edit", async (req, res) => {
  try {
    const editQues = await mathQuesUp.findOne({
      _id: req.body.id,
    });
    editQues.question = req.body.question;
    editQues.questionImagePath = req.body.questionImagePath;
    editQues.solution = req.body.solution;
    editQues.solutionImage = req.body.solutionImage;
    editQues.isPreviousYearQuestion = req.body.isPreviousYearQuestion;
    editQues.year = req.body.year;
    editQues.chapter = req.body.chapter;

    const q1 = await editQues.save();
    res.json(q1);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "invalid data" });
  }
});
router.post("/phys/edit", async (req, res) => {
  try {
    const editQues = await physQuesUp.findOne({
      _id: req.body.id,
    });
    console.log(editQues);
    console.log(req.body.id);
    editQues.question = req.body.question;
    editQues.questionImagePath = req.body.questionImagePath;
    editQues.solution = req.body.solution;
    editQues.solutionImage = req.body.solutionImage;
    editQues.isPreviousYearQuestion = req.body.isPreviousYearQuestion;
    editQues.year = req.body.year;
    editQues.chapter = req.body.chapter;

    const q1 = await editQues.save();
    res.json(q1);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "invalid data" });
  }
});

router.post("/feee/edit", async (req, res) => {
  try {
    const editQues = await feeeQuesUp.findOne({
      _id: req.body.id,
    });
    editQues.question = req.body.question;
    editQues.questionImagePath = req.body.questionImagePath;
    editQues.solution = req.body.solution;
    editQues.solutionImage = req.body.solutionImage;
    editQues.isPreviousYearQuestion = req.body.isPreviousYearQuestion;
    editQues.year = req.body.year;
    editQues.chapter = req.body.chapter;

    const q1 = await editQues.save();
    res.json(q1);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "invalid data" });
  }
});

//-------------------- Delete Question ---------------//

router.post("/chem/delete", async (req, res) => {
  console.log(req.body.id);
  try {
    const editQues = await chemQuesUp.findOne({
      _id: req.body.id,
    });
    const q1 = await editQues.remove();
    res.json({ message: "Question Deleted", erro: false });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Unable to Delete", error: true });
  }
});

router.post("/math/delete", async (req, res) => {
  try {
    const editQues = await mathQuesUp.findOne({
      _id: req.body.id,
    });
    const q1 = await editQues.remove();
    res.json({ message: "Question Deleted", erro: false });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Unable to Delete", error: true });
  }
});
router.post("/phys/delete", async (req, res) => {
  try {
    const editQues = await physQuesUp.findOne({
      _id: req.body.id,
    });
    const q1 = await editQues.remove();
    res.json({ message: "Question Deleted", erro: false });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Unable to Delete", error: true });
  }
});

router.post("/feee/delete", async (req, res) => {
  try {
    const editQues = await feeeQuesUp.findOne({
      _id: req.body.id,
    });
    const q1 = await editQues.remove();
    res.json({ message: "Question Deleted", erro: false });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Unable to Delete", error: true });
  }
});
module.exports = router;
