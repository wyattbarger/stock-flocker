const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Assume stocks.json is in the same directory for providing stock data.
const stockData = require('./stocks.json');

const app = express();

// Set up Handlebars as the templating engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public')); // Test
// app.use('/js', express.static(path.join(__dirname, 'public/js'), {
//     setHeaders: (res, path, stat) => {
//       if (path.endsWith('.js')) {
//         res.set('Content-Type', 'application/javascript');
//       }
//     }
//   }));
  
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


app.post('/register', async (req, res) => {
    try {
        // Validate the request body here. Make sure all necessary fields are present.
        if (!req.body.username || !req.body.password) {
            throw new Error('Username and password are required');
        }

        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Now save the user to the database. Assume a create method on User model.
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword
        });

        // If registration is successful, store user info in session and redirect to home
        if (user) {
            req.session.userId = user.id;
            res.redirect('/');
        }
    } catch (error) {
        // If an error occurred, render the registration page with an error message
        res.status(400).render('register', { error: error.toString() });
    }
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login to Stock Flocker' });
});

app.post('/login', async (req, res) => {
    try {
        // Use the findByCredentials method on the User model to find the user.
        const user = await User.findByCredentials(req.body.username, req.body.password);

        // If user is found, save user info in session
        if (user) {
            req.session.userId = user.id;
            res.redirect('/dashboard');
        } else {
            res.status(400).render('login', { error: 'Invalid login credentials.' });
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

async function addPost(stockId, title, content) { // Placeholder function to test the Post post route. 
    try {
      const postData = {
        title: title,
        content: content,
      };
      const response = await fetch(`/api/stocks/${stockId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const newPost = await response.json();
        console.log(newPost);
      } else {
        throw new Error('Failed to add post');
      }
    } catch (error) {
      console.error(error);
    }
};

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
