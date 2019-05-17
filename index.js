
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const booksRouter = require('./routes/books')
const comicsRouter = require('./routes/comics')
const gamesRouter = require('./routes/games')
const tvRouter = require('./routes/tv')
const collectionsRouter = require('./routes/collections')

const PORT = process.env.PORT || 3000
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

/*
app.use(function (req, res, next) {
    if (req.headers.authorization !== 'Basic MTIzOjEyMw==')
        return res.status(401).send('Authentication required.') // Access denied.

    next()
})
*/

app.use('/col', collectionsRouter);





//------------------------------------------------

app.listen(PORT, () => {
    console.log('app is running → PORT ' + PORT);
});