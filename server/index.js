import Express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = Express();

app.use(
	bodyParser.json({
		limit: "30mb", // maximum request body size
		extended: true,
	})
);

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/posts", postRoutes); // localhost:3000/ => redirects here, but by this statement  it becomes localhost:3000/posts
// adds /posts in start for every route url.
// We write /edit, /delete, /view in posts.js file. But in url it is accessed through /posts/edit, /posts/delete, /posts/view etc

const CONNECTION_URL =
	"mongodb+srv://m001-student:Memory1999@cluster0.w0lz2.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000; // Heroku will auto populate from environment variables when deployed.

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT, () => console.log("Running Successful "))) // If connection successful, then
	.catch((error) => console.log(error.message)); // If connection Failed, then

// mongoose.set('useFindAndModify', false);   // Ensures there will be no warnings in console
