const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, maxLength: 255, require: true},
    description: {type: String, maxLength: 600},
    image: {type: String, maxLength: 255},
    slug: {type: String, maxLength: 255, slug: 'name', unique: true},
    videoId: {type: String, maxLength: 255, require: true},
    level: {type: String, maxLength: 255},
    deletedAt: {type: Date}
}, {
    timestamps: true,
})

mongoose.plugin(slug)

Course.plugin(mongooseDelete, { overrideMethods: 'all' })

module.exports = mongoose.model('Course', Course)