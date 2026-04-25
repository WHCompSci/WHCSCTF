const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // allow your GitHub Pages frontend to call this

app.use(express.json());

// 🔒 Example: challenges endpoint (NO plaintext answers)
app.get('/api/challenges', (req, res) => {
  res.json({
    Web: [
      {
        name: "Bakery Bread",
        points: 100,
        description: "Check the bakery site...",
        path: "BakeryChallenge.html",
        answerHash: "PUT_HASH_HERE"
      }
    ]
  });
});

// 🥖 Bakery challenge endpoint (flag in headers)
app.get('/api/bakery', (req, res) => {
  res.setHeader('X-Hint', 'Nice work checking the network tab!');
  res.setHeader('X-Bakery-Secret', 'The starter is named Gerald.');
  res.setHeader('X-CTF-Flag', 'WHCS{example_flag_here}');
  res.status(200).end();
});

// basic health route
app.get('/', (req, res) => {
  res.send('CTF API running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));