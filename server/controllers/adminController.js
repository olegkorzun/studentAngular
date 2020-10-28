const { StudentsTest2DataService } = require('../services/studentsTest2DataService');
const { StudentKnexDataService } = require('../services/studentKnexDataService');
const bcrypt = require('bcrypt');

class AdminController {
    constructor() {
        this.MESSAGE = "Admin Controller";
        this.studentsTest2DataService = new StudentsTest2DataService();
        this.studentKnexDataService = new StudentKnexDataService();
    }

    newUser(req, res) {
        const { body: { user } } = req;
        let password = bcrypt.hashSync(user.password, 10);
        user.password = password;
        console.log('password', user.password);
        this.studentKnexDataService.newUser(user, () => {
            /*NEW STUDENT*/
            if (user.role == 1) {
                const { body: { courses } } = req;
                const { body: { path } } = req;
                this.studentKnexDataService.newUserPath(user.studentID, path, () => {
                    this.studentKnexDataService.newUserCourses(user.studentID, courses);
                    res.json({ 'res': "New user success" });
                });
            }
        });
    }

    videoTest(req, res) {
        console.log('mydtata', req.body);
        res.json({ 'yourdata': "Good boy!!!" });
    }
}
module.exports = {
    adminController: new AdminController()
}