import elasticsearch from 'elasticsearch';
import config from '../config';
const elasticClient = new elasticsearch.Client({
  host: config.host,
  log: config.log
});

/**
* Test ElasticSearch Connection
**/

function testConnection() {
  return elasticClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: Infinity,
    // undocumented params are appended to the query string
    hello: 'elasticsearch!'
  });
}

exports.testConnection = testConnection;

/**
* search twittes by area
**/

function searchByArea(area) {
  return elasticClient.search({
    index: config.indexName,
    q: `place.name: ${area}`,
    size: 30
  });
}

exports.searchByArea = searchByArea;
