const Qna = require("../models/qnaSchema");

exports.getAllQuestions = async function (req, res) {
  const { subjectId, challengeType } = req.query;

  let questionCount = 0;
  if (challengeType == "hangman") questionCount = 1;
  else if (challengeType == "qnas") questionCount = 10;
  else if (challengeType == "arrange") questionCount = 5;

  const questions = await Qna.find({ subjectId, challengeType });

  // pick random questions from question list
  const tmpQuestions = questions.sort(() => 0.5 - Math.random()); // shuffle questions
  const result = tmpQuestions.slice(0, questionCount);

  return res.status(200).json({
    questions: result,
  });
};

// exports.getQuestion = function (req, res, next) {
//   Qna.findById(req.params.id)
//     .populate(challengeType)
//     .exec(function (err, question) {
//       if (err) {
//         return res.json({ err });
//       }
//       res.json({
//         question: question.question,
//         answers: question.answers,
//         rightAnswer: question.rightAnswer,
//       });
//     });
// };

// exports.createNewQuestion = function (req, res, next) {
//   const { question, answers, rightAnswer } = req.body;
//   const newQuestion = new Qna({
//     question: question,
//     answers: answers,
//     rightAnswer: rightAnswer,
//   });
//   newQuestion.save(function (err) {
//     if (err) {
//       return res.json({ err });
//     }
//     res.send("Create new question completed !");
//   });
// };

// exports.editQuestion = function (req, res, next) {
//   Qna.findById(req.params.id, "question", (err, question) => {
//     if (err) {
//       return res.json({ err });
//     }
//     question.question = req.body.question;
//     question.answer = req.body.answer;
//     question.rightAnswer = req.body.rightAnswer;

//     question.save().then((result) => {
//       res.json({ question: result });
//     });
//   });
// };

// exports.deleteQuestion = function (req, res, next) {
//   Qna.remove(
//     {
//       _id: req.params.id,
//     },
//     (err) => {
//       if (err) {
//         return res.json({ err });
//       }
//       res.json({ message: "Delete success !" });
//     }
//   );
// };
