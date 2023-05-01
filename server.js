const express = require("express")
const axios = require("axios")
const cors = require("cors")
const Redis = require("redis")

const redisClient = Redis.createClient()
const DEFAULT_TTL = 3600

const app = express()
const port = 3001
app.use(cors())

const getOrSetCache = (key, cb) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) {
                return reject(error)
            }

            if (data !== null) {
                return resolve(JSON.parse(data))
            }
            
            const freshData = await cb()
            redisClient.SETEX(key, DEFAULT_TTL, JSON.stringify(freshData))

            resolve(freshData)
        })
    })
}

app.get("/coin", async (_, res) => {
    const coins = await getOrSetCache('coins', async () => {
        const { data } = await axios.get('https://api.coincap.io/v2/assets')
        return data
    })

    res.json(coins)
})

app.get('/coin/:id', async (req, res) => {
    const coins = await getOrSetCache(`coin-${req.params.id}`, async () => {
        const { data } = await axios.get(`https://api.coincap.io/v2/assets/${req.params.id}`)
        return data
    })

    res.json(coins)
})

app.listen(port)