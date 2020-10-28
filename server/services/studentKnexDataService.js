const Promise = require('bluebird');

class StudentKnexDataService {
    constructor() {
        this.MESSAGES_LIMIT = 10;
        this.knex = require('knex')({
            client: 'mysql2',
            connection: {
                host: '45.83.43.173',
                user: 'apprun',
                password: ' Az12345678',
                database: 'studentsTest2'
            }
        });
    }
    newUserPath(studentID, path, callback) {
        this.knex('pathsperstudents')
            .insert({
                studentID: studentID,
                pathCode: path.pathCode,
                pathstatus: path.pathstatus,
                freezpath: path.freezpath,
                freezDate: path.freezDate,
            })
            .then((rows) => {
                console.log('student_path new sucess', rows);
                callback(rows);
            })
            .catch((error) => {
                console.log('student_path new error', error);
                callback(error);
            })
    }

    newUserCourses(student, courses) {
        return this.knex.transaction((trx) => {
            const queries = [];
            courses.forEach(course => {
                const query = this.knex('coursesperstudent')
                    .insert({
                        student: student,
                        course: course.product_id,
                        freezCourse: 0,
                        amount: course.amount,
                    })
                    .transacting(trx);
                queries.push(query);
            })
            Promise.all(queries)
                .then(trx.commit)
                .catch(trx.rollback);
        })
    }

    coursePerStudentUpdateBatch(courses) {
        return this.knex.transaction((trx) => {
            const queries = [];
            courses.forEach(course => {
                const query = this.knex('coursesperstudent')
                    .where({
                        student: course.student,
                        course: course.course,
                    })
                    .update({
                        projectMark: course.projectMark,
                        examMark: course.examMark,
                    })
                    .transacting(trx);
                queries.push(query);
            })
            Promise.all(queries)
                .then(trx.commit)
                .catch(trx.rollback);
        })
    }

    coursePerStudentUpdate(course, callback) {
        console.log(course)
        this.knex('coursesperstudent')
            .where({
                student: course.student,
                course: course.course,
            })
            .update({
                projectMark: course.projectMark,
                examMark: course.examMark,
            })
            .then(function(res) {
                callback(res);
            });
    }

    findUserOne(username, callback) {
        this.knex('students')
            .where({ username: username })
            .then(rows => {
                callback(rows);
            })
            .catch(function(error) {
                console.log('No User', error);
                callback(error);
            })
    }

    studentVisits(attendance, callback) {
        this.knex('student_visit')
            .where({
                cycle: attendance.cycle,
                studentID: attendance.studentID,
                session: attendance.session,
            })
            .then(rows => {
                if (rows.length > 0) { // record exist
                    this.knex('student_visit')
                        .where({
                            cycle: attendance.cycle,
                            studentID: attendance.studentID,
                            session: attendance.session,
                        })
                        .update({
                            visit: attendance.visit,
                        })
                        .then(function(res) {
                            callback(res);
                        })
                } else { //new record
                    this.knex('student_visit').insert({
                            cycle: attendance.cycle,
                            studentID: attendance.studentID,
                            session: attendance.session,
                            visit: attendance.visit,
                        })
                        .then(function(res) {
                            callback(res);
                        })
                }
            })
            .catch(function(error) {
                console.log('student_visits eror', error);
                callback(error);
            })
    }

    newUser(student, callback) {
        let d = new Date(student.registeryDate);
        let registeryDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getUTCDate();
        this.knex('students')
            .insert({
                studentID: student.studentID,
                firstName: student.firstName,
                familyName: student.familyName,
                address: student.address,
                email: student.email,
                mobileNumber: student.mobileNumber,
                idImage: null,
                status: student.status,
                secondMobileNumber: student.secondMobileNumber,
                registeryDate: registeryDate,
                username: student.username,
                password: student.password,
                role: student.role,
                theme: student.theme,
                paymentMethodsCode: student.paymentMethodsCode,
                location: student.location,
                amount: student.amount,
            })
            .then((rows) => {
                console.log('student new sucess', rows);
                callback(rows);
            })
            .catch((error) => {
                console.log('student new error', error);
                callback(error);
            })
    }

    messagesHistoryByTicket(ticket, callback) {
        this.knex('message')
            .where({ ticket: ticket })
            .orderBy('date', 'desc')
            .then(rows => {
                callback(rows);
            })
            .catch((error) => {
                console.log('Message history error', error);
                callback(error);
            })
    }

    messagesHistory(message, callback) {
        this.knex('message')
            .orderBy('date', 'desc')
            .limit(this.MESSAGES_LIMIT)
            .orderBy('date')
            .then(rows => {
                callback(rows);
            })
            .catch(function(error) {
                console.log('Message history error', error);
                callback(error);
            })
    }
    messageNew(message, callback) {
        this.knex('message')
            .insert({
                // _id:    message.,
                mess: message.mess,
                student: message.student,
                ticket: message.ticket,
                date: new Date(message.date),
                cat: message.cat,
                name: message.name,
                id: message.id,
                sock: message.sock,

            })
            .then(function(rows) {
                console.log('message new sucess', rows);
                callback(rows);
            })
            .catch(function(error) {
                console.log('message new error', error);
                callback(error);
            })
    }

    ticketNew(ticket, callback) {
        this.knex('ticket')
            .insert({
                //ticket_id ,
                student_id: ticket.student_id,
                req_type: ticket.req_type,
                req_reason: ticket.req_reason,
                req_date: new Date(ticket.req_date),
            })
            .then(function(rows) {
                console.log('ticket new sucess', rows);
                callback(rows);
            })
            .catch(function(error) {
                console.log('ticket new error', error);
                callback(error);
            })
    }
    ticketUpdate(ticket, ticket_id, callback) {
        this.knex('ticket')
            .where({ ticket_id: ticket_id })
            .update({
                admin_id: ticket.admin_id,
                ans_type: ticket.ans_type,
                ans_reason: ticket.ans_reason,
                ans_date: new Date(ticket.ans_date),
                act_date: new Date(ticket.act_date),
                course_id: ticket.course_id,
                path_id: ticket.path_id,
                cycle_id: ticket.cycle_id,
            })
            .then(function(rows) {
                console.log('ticket new sucess', rows);
                callback(rows);
            })
            .catch(function(error) {
                console.log('ticket new error', error);
                callback(error);
            })
    }
    ticketHistoryByStudent(student, callback) {
        this.knex('ticket')
            .where({ student_id: student })
            .orderBy('req_date', 'desc')
            .then(rows => {
                callback(rows);
            })
            .catch(function(error) {
                console.log('ticket history error', error);
                callback(error);
            })
    }

}


module.exports = {
    StudentKnexDataService: StudentKnexDataService
}