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
    this.state.tweets = [
      {
        id: 111,
        text: 'asdfasdf'
      },
      {
        id: 222,
        text: "asdfas"
      },
      {
        id: 333,
        text: "asdfasfd"
      },
      {
        id: 333,
        text: "asdfasfd"
      }
    ];
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

  _handleSubmit(event) {
    event.preventDefault();
    let cleanData;
    let city = this._city.value;
    let query = this._query.value;
    let url = `/TwitterAPI/searchByArea/${city}/`;

    $.get(url).done(function(data) {
      cleanData = data.hits.hits.map(function(v) {
          let lng = v._source.place.bounding_box.coordinates[0][0][0];
          let lat = v._source.place.bounding_box.coordinates[0][0][1];
          if (v._source.coordinates !== null) {
            lat = v._source.coordinates.coordinates[1];
            lng = v._source.coordinates.coordinates[0];
          }
          console.log(lng,lat);
          return {
            lat:lat,
            lng:lng
          }
        })
        initMap(cleanData); 
        this.setState({tweets:data});
        console.log(this.state.tweets);
        this.props.renderTweetsData(data);
      }.bind(this)).fail(function() {
        alert('Error occured!');
      });
    }

    test(data) {
      this.setState({tweets:data}); 
      console.log(this.state.tweets);
    }

    renderTweetsData(data) {
      let cleanedData = data.hits.hits.map((tweet) => {
        let time = moment(tweet._source['@timestamp']).utc().format('MM-DD h:mm A');
        return {
          img:tweet._source.user.profile_image_url,
          time:time,
          name:tweet._source.user.name,
          content:tweet._source.text
        }
      });

      this.setState({tweets:cleanedData});
      console.log(this.state.tweets);
    }

  render() {
    return (
      <div className="body">
        <Searchcontainer handleSubmit = {this._handleSubmit} renderTweetsData = {this.renderTweetsData.bind(this)} />
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