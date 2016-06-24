const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://luke:test@jello.modulusmongo.net:27017/etyP4isy',
  port: process.env.PORT || 8000,
  // Change this to your customized Twitter API key or just use it
  consumer_key: 'yMJ4PyU6wzasCIa0wHKtrpVTn',
	consumer_secret: 'ZjLihdaSxg4wxc5csn8MPrCJ3CE2FiBMcZw9NQQQO82hPdse5C',
	access_token: '3330431387-iFa2TNFhZVpbGy0DdftL4xulrYKbOMAlpkdAHLv',
	access_token_secret: 'HjoNbWGaI41LjhjvAFtiYZfjkP8vE0R7h7iN9sAfNHyoU',
  // elasticsearch config
  indexName: 'logstash_twitter_dev',
  host: 'http://13.92.81.137:9200',
  log: 'info'
};

export default config;
