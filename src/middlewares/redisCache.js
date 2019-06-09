import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

let client;

if (process.env.NODE_ENV === 'production') {
  client = redis.createClient(process.env.REDIS_URI);
} else {
  client = redis.createClient();
}

// create redis middleware
const redisMiddleware = ({originalUrl, url}, res, next) => {
  let key = `__expIress__${originalUrl}` || url;
  client.get(key, (err, reply) => {
    if(reply){
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(JSON.parse(reply));
    }else{
        res.sendResponse = res.send;
        res.send = (body) => {
            client.set(key, JSON.stringify(body));
            res.sendResponse(body);
        }
        next();
    }
  });
};

export default redisMiddleware;
