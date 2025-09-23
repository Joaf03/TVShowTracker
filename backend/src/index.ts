import showRouter from "./routes/show.routes.js"
import actorRouter from "./routes/actor.routes.js";
import authRouter from "./routes/auth.routes.js";
import express from "express"
import env_vars from "./config/env.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Test");
})

app.use('/shows', showRouter);
app.use('/actors', actorRouter);
app.use('/auth', authRouter);

app.listen(env_vars.PORT, () => {
    console.log(`HTTP server running on https://localhost:${env_vars.PORT}`);
});