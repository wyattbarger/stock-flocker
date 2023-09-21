const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Here, I'm assuming you have a module to provide the stock data. 
// For simplicity, let's assume the stocks.json you've got is being used.
const stockData = require('./stocks.json');

const app = express();

// Set up Handlebars as the templating engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Welcome to Stock Flocker' });
});

app.get('/stocks', (req, res) => {
    res.render('stocks', { title: 'Stock Listings', stocks: stockData });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register for Stock Flocker' });
});

app.post('/register', (req, res) => {
    // Registration logic goes here. Store user data, etc.
    // For this example, just redirect to home after "registering".
    res.redirect('/');
});

// Assuming other routes like login, dashboard, etc.

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
