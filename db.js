const Datastore = require('nedb')
const fs = require('fs')

exports = module.exports = init;

const db = {}

function init() {
    db.meta = new Datastore({ filename: './db/meta.db', autoload: true })
    db.addCol = addCol
    db.delCol = delCol
    db.cols = {}

    const mapDB = new Map()
    db.meta.find({}, (err, docs) => {
        if (err) console.log(err)
        docs.forEach(col => {
            addCol(col)
        })
    })

    return db
}

function addCol(col) {
    db.cols[col.name] = new Datastore({ filename: './db/' + col.file, autoload: true });
}

function delCol(name, callback) {
    db.meta.find({ name: name }, (err, docs) => {
        if (err) {
            callback(false, err)
        }
        else {
            console.log(name)
            let col = docs.length > 0 ? docs[0] : null
            if (col) {
                db.cols[col.name] = {}
                delete db.cols[col.name]
                fs.unlinkSync('./db/' + col.file)
                db.meta.remove({ name: name }, {}, (err, docs) => {
                    if (err) callback(false, err)
                });
                callback(true, null)
            } else {
                callback(false, 'Not found')
            }
        }
    })
}