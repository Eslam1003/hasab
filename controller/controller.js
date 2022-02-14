const { format } = require('date-fns');
const Chimist = require('../models/chimist');
const Visit = require('./../models/visit');

// serach method
let search = (req, res) => {
  let dateNow = format(new Date(), 'yyyy-MM-dd');
  let query = { date: `${dateNow}` };
  if (req.query.search) {
    if (req.query.search[0] === '0') {
      var num = req.query.search;
    } else {
      var name = req.query.search;
    }
  }
  let date = req.query.searchDate;
  if (num) {
    query = { phoneNum1: `${num}` };
  } else if (date) {
    query = { date: `${date}` };
  } else if (name) {
    query = { name: `${name}` };
  }
  // let timeSort = {
  //   time: 1,
  // };

  let sort = {
    chimist: 1,
  };
  var sorted = [];
  Visit.collection
    .find(query)
    .sort(sort)
    .toArray((err, data) => {
      if (err) throw err;
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].chimist === 'علاء') {
      //     sorted.push(data[i]);
      //   }
      // }
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].chimist.substring(0, 3) === 'عمر') {
      //     sorted.push(data[i]);
      //   }
      // }

      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].chimist.substring(0, 5) === 'السيد') {
      //     sorted.push(data[i]);
      //   }
      // }

      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].chimist.substring(0, 5) === 'محمود') {
      //     sorted.push(data[i]);
      //   }
      // }
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].chimist.substring(1) === 'براهيم') {
      //     sorted.push(data[i]);
      //   }
      // }
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].chimist.substring(0, 4) === 'بيتر') {
      //     sorted.push(data[i]);
      //   }
      // }

      res.render('index', { visits: data });
    });
};
// end

// vist Editing
let visitsPrint = async (req, res) => {
  let id = req.params.id;
  Visit.findById(id)
    .then((data) => {
      res.render('visits/print', {
        title: 'Home visit visit page',
        visit: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// end
// visit update
let visitupdate = async (req, res) => {
  let id = req.params.id;
  await Visit.findByIdAndUpdate(
    { _id: id },
    {
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
      aria: req.body.aria,
    }
  );
  let visit = await Visit.findById({ _id: id });
  res.render('visits/print', { visit: visit });
};
// end
//new visit
let newVisit = (req, res, next) => {
  res.render('visits/new', { visit: new Visit() });
};
//end
// chimist

let chimistNote = async (req, res, next) => {
  let chimist = await Chimist.findById({ _id: '6200e8b1761c995598162413' });
  res.render('visits/chimist', { chimist: chimist });
};
// end
//  chimist save

let chimistsave = async (req, res) => {
  await Chimist.findByIdAndUpdate(
    { _id: '6200e8b1761c995598162413' },
    {
      sa: req.body.sa,
      su: req.body.su,
      mo: req.body.mo,
      tu: req.body.tu,
      we: req.body.we,
      th: req.body.th,
      fr: req.body.fr,
    }
  );

  res.redirect('/');
};
// end
let visitEdit = async (req, res) => {
  let id = req.params.id;
  let visit = await Visit.findById(id);
  res.render('visits/edit', { visit: visit });
};

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
    aria: req.body.aria,
  });
  try {
    await visit.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect(`visits/print/${visit._id}`);
};
//end
let analysis = (req, res) => {
  res.render('visits/analysis', { visit: new Visit() });
};
let analysisSearch = (req, res) => {
  let from = req.body.from;
  let to = req.body.to;
  Visit.collection
    .find({
      date: {
        $gte: from,
        $lte: to,
      },
    })
    .toArray((err, data) => {
      if (err) throw err;
      res.render('visits/analysis', { visit: data });
    });
};

module.exports = {
  search,
  visitsPrint,
  newVisit,
  visitSave,
  visitEdit,
  visitupdate,
  chimistNote,
  chimistsave,
  analysis,
  analysisSearch,
};
