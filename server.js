const express = require('express');
const mongoose = require('mongoose');
const server = http.createServer(app);
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

/*mongoose.connect('mongodb+srv://rshdd:rshdd@blogpostup.mwjnm.mongodb.net/BlogpostUP?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(res => {
  console.log("DB Connected!")
}).catch(err => {
  console.log(Error, err.message);
})*/

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://rshdd:rshdd@blogpostup.mwjnm.mongodb.net/BlogpostUP?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/public', express.static('public'));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port);