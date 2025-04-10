const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3030;

// Serve static files (like your index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Health check route for AWS App Runner
app.get('/health', (req, res) => res.status(200).send('OK'));

// Optional: fallback route (if index.html is not found)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index1.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log('Error::', err);
  }
  console.log(`Onexlab app listening on port ${port}`);
});

// const express = require('express')
// const app = express()

// const port = process.env.PORT || 3030;

// app.get('/', (req, res) => res.send('Hi! I am Sreeja Boddula'))

// app.listen(port, (err) => {
//     if (err) {
//       console.log('Error::', err);
//     }
//       console.log(`Onexlab app listening on port ${port}`);
//   });
