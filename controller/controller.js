const { format } = require('date-fns');
const Chimist = require('../models/chimist');
const Visit = require('./../models/visit');

let alaa = [];
let omar = [];
let elsayedatya = [];
let elsayedAhmed = [];
let mahmoud = [];
let ibrahem = [];
let mohamed = [];
let petr = [];
let mostafa = [];
let fadi = [];
let kero = [];
let abdo = [];
let nglaa = [];
let nesma = [];
let other = [];
let listOfChimist = {};
var agmie = [];
let areaone = [];
let areatwo = [];
let areathree = [];
let areafour = [];
let swaps = [];

// serach method
let search = (req, res) => {
  let dateNow = format(new Date(), 'yyyy-MM-dd');
  let query = { date: `${dateNow}` };
  if (req.query.search) {
    if (req.query.search[0] === '0') {
      var num =new RegExp( req.query.search);
    } else {
      var name = new RegExp(req.query.search);
    }
  }
  let date = req.query.searchDate;
  if (num) {
    query = { phoneNum1:num};
  } else if (date) {
    query = { date: date};
  } else if (name) {
    query = { name:name};
  }

  let sort = {
    time: 1,
  };

  Visit.collection
    .find(query)
    .sort(sort)
    .toArray((err, data) => {
      if (err) throw err;
      alaa = data.filter((e) => {
        return e.chimist === 'علاء عبد النعيم';
      });
      ibrahem = data.filter((e) => {
        return e.chimist === 'إبراهيم أحمد';
      });
      elsayedAhmed = data.filter((e) => {
        return e.chimist === 'السيد احمد';
      });
      petr = data.filter((e) => {
        return e.chimist === 'بيتر وليم';
      });
      abdo = data.filter((e) => {
        return e.chimist === 'عبده محمود';
      });
      kero = data.filter((e) => {
        return e.chimist === 'كيرلس جاب الله';
      });
      elsayedatya = data.filter((e) => {
        return e.chimist === 'السيد عطية';
      });
      mahmoud = data.filter((e) => {
        return e.chimist === 'محمود السيد';
      });
      nglaa = data.filter((e) => {
        return e.chimist === 'نجلاء';
      });
      nesma = data.filter((e) => {
        return e.chimist === 'نسمة';
      });
      omar = data.filter((e) => {
        return e.chimist === 'عمر يوسف';
      });
      mostafa = data.filter((e) => {
        return e.chimist === 'مصطفي فوزي';
      });
      mohamed = data.filter((e) => {
        return e.chimist === 'محمد يوسف';
      });
      fadi = data.filter((e) => {
        return e.chimist === 'فادي صبري';
      });
      other = data.filter((e) => {
        return e.chimist === '-_-';
      });
      listOfChimist = {
        'alaa': alaa,
        'omar': omar,
        'elsayedatya': elsayedatya,
        'elsayedAhmed': elsayedAhmed,
        'mahmoud': mahmoud,
        'mohamed': mohamed,
        'ibrahem': ibrahem,
        'petr': petr,
        'mostafa': mostafa,
        'fadi': fadi,
        'kero': kero,
        'abdo': abdo,
        'nglaa': nglaa,
        'nesma': nesma,
        'other': other,
      };
      agmie.length=0;
      areaone.length=0;
      areatwo.length=0;
      areathree.length=0;
      areafour.length=0;
      swaps.length=0;
      Object.keys(listOfChimist).forEach((e) => {
        if (listOfChimist[e][0]) {
          if (listOfChimist[e][0].aria === '0') {
            agmie.push(listOfChimist[e]);
            
          }
          else if (listOfChimist[e][0].aria === '1') {
            areaone.push(listOfChimist[e]);
            
          }
          else if (listOfChimist[e][0].aria === '2') {
            areatwo.push(listOfChimist[e]);
            
          }
          else if (listOfChimist[e][0].aria === '3') {
            areathree.push(listOfChimist[e]);
            
          }
          else if (listOfChimist[e][0].aria === '4') {
            areafour.push(listOfChimist[e]);
            
          }
          else if (listOfChimist[e][0].aria === '5') {
            swaps.push(listOfChimist[e]);
            
          }
        }
      });

      res.render('index', {
        visits: data,
        agmie: agmie,
        areaone: areaone,
        areatwo: areatwo,
        areathree: areathree,
        areafour: areafour,
        swaps: swaps,
      });
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
let creatnew= async (req,res)=>{
  let id =req.params.id;
  let visit= await Visit.findById(id)
  res.render('visits/newvisit',{visit:visit})
}

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
  creatnew,
};
