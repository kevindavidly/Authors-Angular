// ========================== 
// Require the Express Module
// ========================== 
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      path = require('path'),
      port = process.env.PORT || 3000

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './static')));

app.listen(port, () => {
  console.log("listening on port " + port)
});

app.use(express.static( __dirname + '/public/dist/public' ));

// ========================== 
// Schemas
// ========================== 
mongoose.connect('mongodb://localhost/authors', { useNewUrlParser: true }); // name new schema for each project
var QuoteSchema = new mongoose.Schema({
    "content": { type: String, required: true, minlength: [2, "Content must be at least 2 characters long"] }
}, { timestamps: true });
const Quote = mongoose.model('Quote', QuoteSchema);

var AuthorSchema = new mongoose.Schema({
    'first_name': { type: String, required: true, minlength: [2, 'First name length must be greater than 2'] },
    'last_name': { type: String, required: true, minlength: [2, 'Last name length must be greater than 2'] },
    'quotes': [QuoteSchema]
}, { timestamps: true });
const Author = mongoose.model('Author', AuthorSchema);

// ========================== 
// Routes
// ========================== 

// Get All (Read)
app.get('/authors', (req, res) => {
  Author.find({}, (err, authors) => {
    if(err) {
      console.log("Error!", err);
      res.json({ message: "Error", 'err' : err });
    } else {
      console.log(authors)
      res.json({ message: "Success", 'authors' : authors })
    }
  })
  console.log('Looking for Authors, please hold');
})

// Get One (Read)
app.get('/authors/:id', (req, res) => { 
  Author.findOne({ _id: req.params.id }, (err, author) => {
    if(err) {
      console.log("Error!", err);
      res.json({ message: "Error", 'err' : err });
    } else {
      res.json({ message: "Success", 'author' : author })
    }
  })
  console.log('Looking for requested author, please hold');
})

// Create New (Create)
app.post('/authors/new', (req, res) => {
    Author.create(req.body, (err, author) => {
      if(err) {
        console.log("Error! ", err);
        res.json({ message: "Error", 'err' : err })
      } else {
        console.log('Success')
        res.json({ message: "Success", 'author' : author })
      }
      console.log("Adding author, please hold")
    })
});

// Update One (Update)
app.put('/authors/:id', (req, res) => {
    Author.findOneAndUpdate({_id: req.params.id}, { $set: { first_name: req.body.first_name, last_name: req.body.last_name } }, { multi: false }, (err, author) => {
      if(err) {
        console.log("Error!", err);
        res.json({ message: "Error", 'err' : err });
      } else {
        res.json({ message: "Success", 'author' : author })
      }
    })
    console.log('Looking for Author to update, please hold');
});

// Delete One (Delete) 
app.delete('/authors/:id', (req, res) => {
    Author.deleteOne({ _id: req.params.id }, (err, author) => {
      if(err) {
        console.log("Error!", err);
        res.json({message: "Error", 'err' : err});
      } else {
        res.json({message: "Success", 'author' : author})
      }
    })
    console.log('Looking for Author to delete, please hold');
});

// Add (One to Many Relationship)
app.put('/authors/:id/quote', (req, res) => {
  // var newReview = new Review({ "content" : req.body.content })
  // newReview.save((err) => {
    
  Quote.create({ content: req.body.content }, (err, quote) => {
    if(err) {
      console.log("Error!", err);
        res.json({message: "Error", 'err' : err});
      } else {
        Author.findOneAndUpdate({ _id: req.params.id }, {$push : { quotes : quote }}, { multi: true }, (err, author) => {
          if(err) {
            console.log("Error!", err);
              res.json({message: "Error", 'err' : err});
          } else {
            res.json({message: "Success", 'author' : author})
          }
        })
      }
  })
});

app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});
