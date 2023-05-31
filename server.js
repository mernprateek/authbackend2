import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';


app.use(cors({
    origin: '*'
}));

app.listen(port);
/** middlewares */
app.use(express.json());

app.use(morgan('tiny'));

app.disable('x-powered-by'); // less hackers know about our stack


const port = process.env.PORT || 8080;



/** HTTP GET Request */
app.get('/',cors({
    origin: '*'
}), (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api',cors({
    origin: '*'
}), router)

/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})

