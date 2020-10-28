const { StudentsTest2DataService }  = require('../services/studentsTest2DataService');
const { StudentKnexDataService }    = require('../services/studentKnexDataService');
class StudentController {
    constructor() {
        this.MESSAGE = "studentsTest2";
        this.studentsTest2DataService = new StudentsTest2DataService();
        this.studentKnexDataService = new StudentKnexDataService();
        
    }
    readProductGroup(req, res) {
        console.log("readProductGroup");
        this.studentsTest2DataService.readProductGroup((data)=>{
            console.log("Answer from readProductGroup:",data);
            return res.json(data);
        });
    }
    readProduct(req, res) {
        console.log("readProduct");
        this.studentsTest2DataService.readProduct((data)=>{
            return res.json(data);
        });
    }

}

module.exports = {
    studentController: new StudentController ()
}


