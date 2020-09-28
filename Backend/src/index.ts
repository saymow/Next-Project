import express from 'express';

const app = express();
const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => res.send('Testing'));

app.listen(PORT, () => console.log('Server is up on', PORT));
