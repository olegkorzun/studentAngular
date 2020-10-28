
const { StudentsTest2DataService }  = require('../services/studentsTest2DataService');
const { StudentKnexDataService }    = require('../services/studentKnexDataService');

class TeacherController {
    constructor() {
        this.MESSAGE = "Teacher Controller";
        this.studentsTest2DataService = new StudentsTest2DataService();
        this.studentKnexDataService = new StudentKnexDataService();
    }

    coursePerStudentBatch(req, res) {
        const { body: { courseperstudent } } = req;
        this.studentKnexDataService.coursePerStudentUpdateBatch(courseperstudent)
        res.json({'res':"ok"});
    }


    coursePerStudent(req, res) {
        console.log("courseperstudent");
        const { body: { courseperstudent } } = req;
        console.log("courseperstudent",courseperstudent);
        courseperstudent.forEach(course => {
            this.studentKnexDataService.coursePerStudentUpdate(course,(data)=>{
                //return res.json(data);
                console.log(data);
            });
        });
        return res.json({'att':'OK'});
    }

    studentVisits(req, res) {
        console.log("studentVisits");
        const { body: { attendance } } = req;
        attendance.forEach(att => {
            this.studentKnexDataService.studentVisits(att,(data)=>{
                //return res.json(data);
                console.log(data);
            });
        });
        return res.json({'att':'OK'});
    }
}
module.exports = {
    teacherController: new TeacherController ()
}
