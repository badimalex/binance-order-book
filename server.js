var path = require('path');
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on prot 3000');
});
