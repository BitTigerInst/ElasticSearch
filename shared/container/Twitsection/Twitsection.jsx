import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import fetch from 'isomorphic-fetch';
import { initMap } from '../../modules/GooglePlaces';
import Searchcontainer from '../Searchcontainer/Searchcontainer';

class Twitsection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
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


  render() {
    return (
      <div className="body">
        <Searchcontainer />
        <div className="container">
          <div>{JSON.stringify(this.state.tweets)}</div>
          <div id="map"></div>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyChfs6OCo55LNZVJlrncEkg6evXBTi_3g8&signed_in=true&libraries=places" async defer></script>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Twitsection;