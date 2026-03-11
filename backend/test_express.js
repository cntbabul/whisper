import express from 'express';
const app = express();
app.get(/(.*)/, (req, res) => res.send('ok'));
console.log('App started without throwing');
