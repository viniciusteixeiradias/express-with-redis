# What is this project?

This project is a simple example of how redis works, I used the `https://api.coincap.io/v2/assets/` API to make my requests. The application runs on `port 3001` and has two endpoints:

```bash
htttp://localhost:3000/coins
htttp://localhost:3000/coins/${coin_id} # htttp://localhost:3000/coins/bitcoin
```

You can use insomnia or postman for your tests, I chose to use my postman clone, if you want to try the clone is available at [postman-clone](https://github.com/viniciusteixeiradias/postman-clone).

## Redis (simple commands)

You need install the [Redis](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/) first.

```bash
# start the redis server
redis-server

# open redis cli
redis-cli

# show all keys
127.0.0.1:6379> keys *
# 1) "coin-bitcoin"
# 2) "coins"

# clear all keys
flushall
```
