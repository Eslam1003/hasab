const { format } = require("date-fns");
const Visit = require("./../models/visit");

// serach method
let search = async (req, res) => {
  let dateNow = format(new Date(), "yyyy-mm-dd");
  let query = { date: `${dateNow}` };
  let num = req.query.search;
  let date = req.query.searchDate;
  if (num) {
    query = { phoneNum1: `${num}` };
  } else if (date) {
    query = { date: `${date}` };
  }
  await Visit.collection.find(query).toArray((err, data) => {
    if (err) throw err;
    res.render("index", { title: "Home visit", visits: data });
  });
};
// end

// vist Editing
let visitsEdit = (req, res) => {
  let id = req.params.id;
  Visit.findById(id)
    .then((data) => {
      res.render("visits/print", {
        title: "Home visit print page",
        visits: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// end
//new visit
let newVisit = (req, res, next) => {
  res.render("visits/visit", { title: "new visit" });
};
//end
//save the new visit to the db
let visitSave = async (req, res) => {
  let visit = new Visit({
    name: req.body.name,
    phoneNum1: req.body.phoneNum1,
    phoneNum2: req.body.phoneNum2,
    ragion: req.body.ragion,
    stname: req.body.stname,
    blnum: req.body.blnum,
    flnum: req.body.flnum,
    donum: req.body.donum,
    spchilmark: req.body.spchilmark,
    tests: req.body.tests,
    time: req.body.time,
    date: req.body.date,
    creater: req.body.creater,
    chimist: req.body.chimist,
    nots: req.body.nots,
    cost: req.body.cost,
    stat: req.body.stat,
  });
  try {
    await visit.save();
    console.log(visit);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};
//end
module.exports = {
  search,
  visitsEdit,
  newVisit,
  visitSave,
};
