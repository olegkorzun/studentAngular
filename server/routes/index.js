var express = require('express');
var router = express.Router();
var passport =require('../passport/passport');
let middleware = require('../passport/middleware');

const { studentController } = require('../controllers/studentController');
const { teacherController } = require('../controllers/teacherController');
const { adminController } = require('../controllers/adminController');

/* TEACHER */
router.post('/student_visits', (req, res) => teacherController.studentVisits(req, res));
router.post('/courseperstudent', (req, res) => teacherController.coursePerStudentBatch(req, res));

/* ADMIN */
router.post('/create-user', (req, res) => adminController.newUser(req, res));

/* Video */
router.post('/videotest', middleware.checkToken, (req, res) => adminController.videoTest(req, res));

/* LOGIN */
router.post('/login',passport.authenticate('local',{session:false,failureRedirect:'/err',}),(req,res,next)=>{ 
    //res.json({user:req.user})
    res.json(req.user);
});
router.get('/err',(req, res) => { res.status(401).send('Not autorized')});


module.exports = router;
