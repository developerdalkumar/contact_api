import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import userRoutes from "./Routes/userRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js"
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(bodyParser.json());

// router use
app.use('/api/user',userRoutes);


//  contact router use
app.use('/api/contact',contactRoutes);


mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "nodejs",
  })
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {

    res.json({ message: "This is HomeRoute" })
})

 

// without router folder use
// app.post('/api/user/register',register);


const port = process.env.PORT;

app.listen(port, () => console.log(`Server is Running ${port}`))

