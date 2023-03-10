const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeController {
    // GET /me/stored/course
    storedCourses(req, res, next) {
        
        let courseQuery = Course.find({})

        if(req.query.hasOwnProperty('_sort')){
            courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                })
            })
            .catch(next);
    }

    // GET /me/trash/course
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController