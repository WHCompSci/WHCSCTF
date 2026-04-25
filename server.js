const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // allow your GitHub Pages frontend to call this

app.use(express.json());
const fs = require("fs");
const path = require("path");

app.get('/api/challenges', (req, res) => {
  const fs = require("fs");
  const path = require("path");
  const crypto = require("crypto");

  const filePath = path.join(__dirname, 'Challenges.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to load challenges" });
    }

    const raw = JSON.parse(data);

    for (const cat of Object.keys(raw)) {
      raw[cat] = raw[cat].map(ch => {
        const answers = Array.isArray(ch.answer) ? ch.answer : [ch.answer];

        const hashes = answers.map(a =>
          crypto.createHash('sha256').update(a).digest('hex')
        );

        return {
          ...ch,
          answer: undefined,        // remove plaintext
          answerHashes: hashes      // ✅ matches frontend
        };
      });
    }

    res.json(raw);
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