import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import fetch from 'isomorphic-fetch';
import { initMap } from '../../modules/GooglePlaces';
import Searchcontainer from '../Searchcontainer/Searchcontainer';
import TweetsList from '../TweetsList/TweetsList';
import moment from 'moment';

class Twitsection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.state.tweets = [];
  }

  fetchtweets(){

    let url = "/TwitterAPI/search";
    fetch(url, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then((res) => this.setState({tweets:res}));
  }



    renderTweetsData(data) {
      this.setState({tweets:data});
      console.log(this.state.tweets)
    }

  render() {
    return (
      <div className="body">
        <Searchcontainer renderTweetsData = {this.renderTweetsData.bind(this)} />
        <div className="container">
          <div id="map"></div>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyChfs6OCo55LNZVJlrncEkg6evXBTi_3g8&signed_in=true&libraries=places" async defer></script>
          <TweetsList tweets = {this.state.tweets} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Twitsection;
