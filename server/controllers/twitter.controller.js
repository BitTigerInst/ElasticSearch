import Express from 'express';
const router = Express.Router();
import Config from '../config';
import Elastic from '../models/tweet';
import Twit from 'twit';
const T = new Twit({
	consumer_key: Config.consumer_key,
	consumer_secret: Config.consumer_secret,
	access_token: Config.access_token,
	access_token_secret: Config.access_token_secret,
	timeout_ms: 60*1000  // optional HTTP request timeout to apply to all requests.
});

// test url with sample parameter
export function search(req, res) {
  const query = 'a';
	const count = 1;
	const resultType = 'recent';
	const geoCode = [-22.912214, -43.230182, '1km'];
	T.get('search/tweets', { q: query, geocode: geoCode, count: count, result_type: resultType }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(data);
	});
}

// searching query API
export function searchWithParams(req, res) {
  const query = req.params.query;
	const count = req.params.count;
	const resultType = req.params.resultType;
	const geoCode = req.params.geolocalization;
  T.get('search/tweets', { q: query, geocode: geoCode, count: count, result_type: resultType }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(data);
  });
}

export function testConn(req, res) {
	Elastic.testConnection().then((result) => {
    if (result) {
			res.json('All is well!');
		} else {
      res.json('elasticsearch cluster is down!');
    }
  });
}

export function searchByArea(req, res) {
	let area = req.params.area;
  Elastic.searchByArea(area).then((result) => {
    if (result) {
			res.json(result);
		} else {
      res.json('search query failed!');
    }
  });
}


export function searchByHashtag(req,res) {
  let hashtag = req.params.hashtag;
  Elastic.searchByHashtag(hashtag).then((result) => {
    if (result) {
			res.json(result);
		} else {
      res.json('search query failed!');
    }
  });
}



export default router;
