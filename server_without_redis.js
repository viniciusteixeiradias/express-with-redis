const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(cors())

const BITCOIN_ID = 1

app.get("/", async (req, res) => {
    const { data } = await axios.get(
        'https://api.coincap.io/v2/assets',
    )

    res.json(data)
})

app.get('/:id', async (req, res) => {
    const { data } = await axios.get(
        `https://api.coincap.io/v2/assets/${req.params.id}`,
    )

    res.json(data)
})

app.listen(3001, () => {
    console.log(`Example app listening on port 3001`)
})