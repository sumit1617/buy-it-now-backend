const app = require("./app")
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary").v2
const cors = require("cors")


app.use(cors({
    origin: ["https://buy-it-now-backend.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }))


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config/config.env" });
}

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });


// Connecting to database
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const server = app.listen(process.env.PORT, ()=> {

    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});


// Unhandled Promise Rejections
process.on("Unhandled Rejections", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the Server due to Unhandled Promise Rejections`)

    server.close(() => {
        process.exit(1)
    });
});
