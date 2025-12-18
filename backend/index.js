const connectTomongo = require("./db");
connectTomongo();
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const port = 5000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
// Increase the payload size limit
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use("/api/auth",require("./routes/auth"))
app.use("/api/data",require("./routes/data"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
