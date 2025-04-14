const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3030;

let ownerIP = null;
const guestAccessMap = {};

app.set('trust proxy', true); // Trust proxy headers to get real IP

app.get('/', (req, res) => {
  const userIP = req.ip;
  const now = Date.now();

  // First visitor becomes the owner
  if (!ownerIP) {
    ownerIP = userIP;
    console.log(`👑 Registered owner IP: ${ownerIP}`);
  }

  // If user is owner, allow full access
  if (userIP === ownerIP) {
    return res.sendFile(path.join(__dirname, 'public', 'index1.html'));
  }

  // Guest access control (2 seconds only)
  if (!guestAccessMap[userIP]) {
    guestAccessMap[userIP] = now;
  }

  const elapsed = now - guestAccessMap[userIP];
  if (elapsed > 2000) {
    return res.status(403).send('⏳ Guest link has expired for you.');
  }

  res.sendFile(path.join(__dirname, 'public', 'index1.html'));
});

app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(port, () => {
  console.log(`🚀 App listening on port ${port}`);
});

// const express = require('express');
// const path = require('path');
// const app = express();

// const port = process.env.PORT || 3030;
// const tokenAccessMap = {};

// // Route for access-controlled entry
// app.get('/', (req, res) => {
//   const access = req.query.access;
//   const token = req.query.token;
//   const now = Date.now();

//   if (access === 'owner') {
//     // Full access
//     return res.sendFile(path.join(__dirname, 'public', 'index1.html'));
//   }

//   if (access === 'guest') {
//     if (!token) return res.status(400).send('❌ Token required');

//     if (!tokenAccessMap[token]) {
//       tokenAccessMap[token] = now;
//     }

//     const elapsed = now - tokenAccessMap[token];
//     if (elapsed > 2000) {
//       return res.status(403).send('⏳ Link expired for guests.');
//     }

//     return res.sendFile(path.join(__dirname, 'public', 'index1.html'));
//   }

//   res.status(400).send('⚠️ Invalid access type. Use ?access=owner or ?access=guest&token=xyz');
// });

// // Health check route for AWS
// app.get('/health', (req, res) => res.status(200).send('OK'));

// app.listen(port, () => {
//   console.log(`App running on port ${port}`);
// });


// const express = require('express');
// const path = require('path');
// const app = express();

// const port = process.env.PORT || 3030;

// // Serve static files (like your index.html)
// app.use(express.static(path.join(__dirname, 'public')));

// // Optional: Health check route for AWS App Runner
// app.get('/health', (req, res) => res.status(200).send('OK'));

// // Optional: fallback route (if index.html is not found)
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index1.html'));
// });

// app.listen(port, (err) => {
//   if (err) {
//     console.log('Error::', err);
//   }
//   console.log(`Onexlab app listening on port ${port}`);
// });

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
