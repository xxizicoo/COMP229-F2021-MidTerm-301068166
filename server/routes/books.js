/*
Filename: books.js
Student: Zicong Liang
Student#: 301068166
Date: 10/27/2021
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
	
 
	res.render('books/details', {
	  title: 'Add',
	  books:{
		  Title: '',
		  Description: '',
		  Price: '',
		  Author: '',
		  Genre: ''
	  }
	});
	
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
	 book.create(req.body).then(()=>  	res.redirect('/books')).catch(e=>  res.render('errors/500', { title: '500',message : 'Server error', error: e  }) );
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
	 book.findById({_id: req.params.id}).then(r=>{
		 
		 if(r){
			 res.render('books/details', {
			   title: 'Detail',
			   books: r,
			 });
			 
			 
		 }
		 else{
			 res.render('errors/404', { title: '404'  });
		 }
		 
	 }).catch(e=>  res.render('errors/500', { title: '500',message : 'Server error', error: e  }) );
	 
	 
	 
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
	book.update({  _id: req.params.id }, req.body).then(()=> res.redirect('/books')).catch(e=>  res.render('errors/500', { title: '500',message : 'Server error', error: e  }) );
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
	 book.remove({ _id : req.params.id  }).then(()=> 	res.redirect('/books')).catch(e=>  res.render('errors/500', { title: '500',message : 'Server error', error: e  }) );
});


module.exports = router;
