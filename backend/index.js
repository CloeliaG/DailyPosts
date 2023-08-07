const express = require("express");
const cors = require("cors");
const connectDB = require("./mongo/mongoose")
const app = express();

const port = 3000;

app.use(cors({
    origin: 'http://localhost:8080',
}
));
app.use(express.json());

connectDB();

app.get('/', (req,res) => {
    res.send('Hello World !')
})

const authRoute = require('./routes/authRoute.js');
app.use('/', authRoute)

const userRoute = require('./routes/userRoute.js');
app.use('/', userRoute)

const postRoute = require('./routes/postRoute.js');
app.use('/', postRoute)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})