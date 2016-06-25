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
* search twittes by area with time range
* ref see https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html
**/

function searchByAreaWithinTimeRange(area,time_range) {
  time_range = "10m"
  return elasticClient.search({
    index: config.indexName,
    body:
    {
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "place.name": area,
              }
            },
            {
               "range": {
                  "@timestamp": {
                     "gte": `now-${time_range}`,
                     "lt": "now"
                  }
               }
            }
          ]
        }
      }
    }
  });
}

/**
* search twittes by area
**/

function searchByAreaHashtag(area, hashtag) {
  return elasticClient.search({
    index: config.indexName,
    // q: `place.name: ${area}`
    body:
     {
       "from": 0,
       "size": 30,
       "query": {
          "bool": {
             "must": [
                {
                   "match": {
                      "place.name": area
                   }
                },
                {
                   "match": {
                      "entities.hashtags": hashtag
                   }
                }
             ],
             "filter": {
                "exists": {
                   "field": "coordinates"
                }
             }
          }
       }
    }
  });
}

/**
* search twittes by hashtag
**/
function searchByHashtag(hashtag) {
  return elasticClient.search({
    index: config.indexName,
    body:
    {
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "entities.hashtags": hashtag
              }
            }
          ]
        }
      }
    }
  });
}


/**
* search twittes by hashtag with fuzziness
**/
function searchByHashtagWithFuzziness(hashtag, fuzziness) {
  return elasticClient.search({
    index: config.indexName,
    body:
    {
      "query": {
        "bool": {
          "must": [
            {
               "fuzzy": {
                  "entities.hashtags": {
                     "value": `${hashtag}`,
                     "boost": 1,
                     "fuzziness": `${fuzziness}`,
                     "prefix_length": 0,
                     "max_expansions": 100
                  }
               }
            }
          ]
        }
      }
    }
  });
}


exports.searchByAreaHashtag = searchByAreaHashtag;

exports.searchByHashtag = searchByHashtag;

exports.searchByHashtagWithFuzziness = searchByHashtagWithFuzziness;
