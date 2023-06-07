import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import userRoute from "./routes/userroute.js";
import bodyparser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import essentialsRoute from "./routes/essentialsroute.js";
dotenv.config({path:'./.env'});


const app = express();
//app.use(cors());



dbConnect();
// log requests
app.use(morgan('tiny'));

app.use(express.json());

app.use(bodyparser.urlencoded({ extended : true}))


app.use("/api/v1/users", userRoute);
app.use("/api/v1/essentials", essentialsRoute);

app.use(
    cors({
      credentials: true,
      origin: true,
      allowedHeaders: ["Origin", "X-Requested-With", "Content", "Accept", "Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    })
  );

//middleware


const PORT = process.env.PORT || 7007
app.listen(PORT,console.log(`Server is running at ${PORT}`))