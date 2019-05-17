const express = require('express');
const database = require('../db');
const router = express.Router();
const fs = require('fs');

const db = database()

//-------------META-----------------

router.get('/', (req, res, next) => {
    db.meta.find({}, (err, docs) => {
        if (err) {
            next(err)
        } else {
            res.send(docs)
        }
    })
})

router.post('/', (req, res, next) => {
    let newDB = req.body
    db.meta.insert(newDB, (err, obj) => {
        if (err) {
            next(err)
        } else {
            db.addCol(obj)
            res.send(obj)
        }
    })
})

router.delete('/:col', (req, res, next) => {
    db.delCol(req.params.col, (ok, err) => {
        if (err) {
            next(err)
        } else {
            res.sendStatus(200)
        }
    })
})

//-------------COLLECTION-----------------

router.get('/:col', (req, res, next) => {
    let col = req.params.col

    if (!db.cols[col]) {
        res.sendStatus(404)
    } else {
        db.cols[col].find({}, (err, docs) => {
            if (err) next(err)
            res.send(docs)
        });
    }
})

router.get('/:col/:id', (req, res, next) => {
    db.cols[req.params.col].find({ _id: req.params.id },
        (err, docs) => {
            if (err) next(err)
            res.send(docs.length > 0 ? docs[0] : {})
        });
})

router.post('/:col', (req, res, next) => {
    let obj = req.body
    db.cols[req.params.col].insert(obj, (err, obj) => {
        if (err) {
            next(err)
        } else {
            res.send(obj)
        }
    })
})

router.put('/:col/:id', (req, res, next) => {
    let book = req.body
    let id = req.params.id
    db.cols[req.params.col].update({ _id: id }, book, {},
        (err, obj) => {
            if (err) {
                next(err)
            } else {
                res.sendStatus(200)
            }
        })
})

router.delete('/:col/:id', (req, res, next) => {
    db.cols[req.params.col].remove({ _id: req.params.id }, {},
        (err, docs) => {
            if (err) next(err)
            res.sendStatus(200)
        });
})

//-----------------------------------------------


function getFilter(query) {
    let filter = {}
    if (query.status) {
        filter.status = query.status
    }
    return filter
}

module.exports = router;