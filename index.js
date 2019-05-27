const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = express.Router()
const mongo = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//------------------------------------------------

let db = null
let client = null

async function initDB() {
    client = await mongo.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true
    })
    db = client.db('collections')
    metaCol = db.collection('meta')
    console.log('Conectado a BD')
}

async function getCol(name) {
    let dbCol = db.collection(name)
    let col = await dbCol.find().toArray()
    return col
}

async function findInColById(colName, id) {
    let dbCol = db.collection(colName)
    let col = await dbCol.findOne({ _id: new ObjectId(id) })
    return col
}

async function findInCol(colName, filter) {
    let dbCol = db.collection(colName)
    let col = await dbCol.find(filter).toArray()
    return col
}

async function insertInCol(colName, obj) {
    let dbCol = db.collection(colName)
    let res = await dbCol.insertOne(obj)
    return res
}

async function replaceInCol(colName, id, obj) {
    let dbCol = db.collection(colName)
    let res = await dbCol.replaceOne({ _id: new ObjectId(id) }, obj)
    return res
}

async function deleteInCol(colName, id) {
    let dbCol = db.collection(colName)
    let res = await dbCol.deleteOne({ _id: new ObjectId(id) })
    return res
}

//------------------------------------------------

router.get('/', (req, res, next) => {
    res.send('ok')
})

router.get('/:col', (req, res, next) => {
    getCol(req.params.col)
        .then(col => {
            res.json(col)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:col/:id', (req, res, next) => {
    findInColById(req.params.col, req.params.id)
        .then(col => {
            res.json(col)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/:col/find', (req, res, next) => {
    let query = req.body
    findInCol(req.params.col, query)
        .then(col => {
            res.json(col)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/:col', (req, res, next) => {
    let obj = req.body
    insertInCol(req.params.col, obj)
        .then(col => {
            res.json(col)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:col/:id', (req, res, next) => {
    let obj = req.body
    replaceInCol(req.params.col, req.params.id, obj)
        .then(col => {
            res.json(col)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:col/:id', (req, res, next) => {
    deleteInCol(req.params.col, req.params.id)
        .then(col => {
            res.json(col)
        })
        .catch(err => {
            next(err)
        })
})

//------------------------------------------------

/*
app.use(function (req, res, next) {
    if (req.headers.authorization !== 'Basic MTIzOjEyMw==')
        return res.status(401).send('Authentication required.') // Access denied.

    next()
})
*/

async function main() {
    await initDB()

    app.use(process.env.BASE_URL, router)

    app.listen(PORT, () => {
        console.log('app is running → PORT ' + PORT)
    })
}

main()
