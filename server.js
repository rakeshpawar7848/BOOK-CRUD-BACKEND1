

// 1.importing require dependencies
// 2.Sequelize  database connection and checking connection
// 3.creating table and columns in the mentioned database 
// 4.checking table is created or not in a mentioned database
// 5.api calls get,post,put,update,delete(CRUD)
// 6.listen  on a port and listner








// importing require dependencies

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());// cors used for domain linking
app.use(express.json());








// Sequelize  database connection
// const sequelize = new Sequelize('db name', 'username', 'password'
const sequelize = new Sequelize('book_db', 'root', 'Rakeshpawar@7848', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });










// Define the Book model
// creating table in the mentioned database 
// Book is table name title author publishYear is a column name

const Book = sequelize.define('Book', {
  title: 
  {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: 
  {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishedYear: 
  {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});







// Sync the model with the database
// checking table is created or not in a mentioned database

sequelize.sync()
  .then(() => {
    console.log('Database and tables created!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });









  
  // api calls get,put,update,delete(CRUD)


// Routes

// Get all books
app.get('/books', async (req, res) => 
{
  try 
  {
    const books = await Book.findAll();
    res.json(books);
  } 
  catch (error) 
  {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
});


// try and catch parameter is catch(error)
// when using .then and .catch parameter is err .catch(err)




// Add a new book
app.post('/books/add', async (req, res) => 
{
  const { title, author, publishedYear } = req.body;
  try 
  {
    const newBook = await Book.create({
      title,
      author,
      publishedYear,
    });
    res.json(newBook);
  } 
  catch (error)
   {
    console.error('Error adding book:', error);
    res.status(500).send('Internal Server Error');
  }
});








// Update a book by ID

app.put('/books/update/:id', async (req, res) => 
{
    const bookId = req.params.id;
    const { title, author, publishedYear } = req.body;
    try
     {
      const book = await Book.findByPk(bookId);
      if (book) 
      {
        await book.update({
          title: title || book.title,
          author: author || book.author,
          publishedYear: publishedYear || book.publishedYear,
        });
        res.json({ message: 'Book updated successfully' });
      } 
      else 
      {
        res.status(404).json({ message: 'Book not found' });
      }
    } 
    catch (error) 
    {
      console.error('Error updating book:', error);
      res.status(500).send('Internal Server Error');
    }
  });





  
  // Delete a book by ID
  
  app.delete('/books/delete/:id', async (req, res) => 
  {
    const bookId = req.params.id;
    try 
    {
      const book = await Book.findByPk(bookId);
      if (book) 
      {
        await book.destroy();
        res.json({ message: 'Book deleted successfully' });
      } 
      else 
      {
        res.status(404).json({ message: 'Book not found' });
      }
    } 
    catch (error) 
    {
      console.error('Error deleting book:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  



app.listen(port, () => 
{
  console.log(`Server is running on port ${port}`);
});
