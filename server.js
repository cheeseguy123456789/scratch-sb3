const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const ROOT_DIR = path.resolve('./'); // or any folder you want

app.use(express.static('public'));

app.get('/files', (req, res) => {
  const dir = req.query.path ? path.join(ROOT_DIR, req.query.path) : ROOT_DIR;

  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(files.map(f => ({
      name: f.name,
      isDir: f.isDirectory()
    })));
  });
});

app.listen(PORT, () => {
  console.log(`File browser running at http://localhost:${PORT}`);
});
