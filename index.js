import express from "express";


const app = express();

app.all('/', (req, res) => {
    console.log(req,'-----', res);
    res.send(`Im up..!!!`)
})

const PORT = 5111;

app.listen(PORT,() => {
    console.log(`running ${PORT}`);
    
})