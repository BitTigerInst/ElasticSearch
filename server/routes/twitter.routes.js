import { Router } from 'express';
import * as TwitterController from '../controllers/twitter.controller';
const router = new Router();

// test url with sample parameter
router.route('/search').get(TwitterController.search);

// searching query API
router.route('/search/:query/:geolocalization/:count/:resultType/').get(TwitterController.searchWithParams);

// Test ElasticSearch Connection
router.route('/test_conn').get(TwitterController.testConn);

// Search twittes by area
router.route('/searchByAreaHashtag/:area/:hashtag').get(TwitterController.searchByAreaHashtag);

// Search twittes by hashtag
router.route('/searchByHashtag/:hashtag').get(TwitterController.searchByHashtag);




export default router;
