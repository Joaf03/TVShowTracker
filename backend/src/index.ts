import showRouter from "./routes/show.routes"
import express from "express"
import env_vars from "./config/env";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Test");
})

app.use('/shows', showRouter);

app.listen(env_vars.PORT, () => {
    console.log(`HTTP server running on https://localhost:${env_vars.PORT}`);
});