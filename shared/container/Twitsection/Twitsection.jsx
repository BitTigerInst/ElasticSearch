import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import fetch from 'isomorphic-fetch';

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
    // $.ajax({
    //   url: url,
    //   dataType: 'json',
    //   cache: false,
    //   success: function(data) {
    //     console.log(data);
    //     this.setState({tweets: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  }

  initMap(dataset) {
//initial Site

    var initSite = dataset[0];

  //initialize the google map
    var infowindow;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: initSite,
      zoom: 5
    });

  //add the InfoWindow to map
    infowindow = new google.maps.InfoWindow();

    SitePin();
    function SitePin(){
      console.log(dataset);
      for( var i = 0; i < dataset.length; i++){
        var marker = new google.maps.Marker({
          map: map,
          position: dataset[i]
        });

        //Service that add content to infowindow
        google.maps.event.addListener(marker, 'click', function() {
          var cool = 'nigger!';
        //infowindow.setContent(place.geometry);
          infowindow.setContent('<div>test</div>');
          infowindow.open(map, this);
        });
      }
    }
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
      console.log(cleanData);
      this.initMap(cleanData); 
      this.setState({tweets:cleanData});
    }.bind(this)).fail(function() {
      alert('Error occured!');
    });
  }

    // $.ajax({
    //   method: 'GET',
    //   url: "/TwitterAPI/search",
    //   data: city,
    //   cache: false,
    //   success: function(data) {
    //     console.log(data);
    //     this.setState({tweets: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });

  render() {
    return (
      <div className="body">
        <Header onClick={this.handleClick} />
        <div className="container">
          <form className="tweet-form" onSubmit={this._handleSubmit.bind(this)}>
            <h1>Twitter Search</h1>
            <div className="tweet-form-fields">
              <h4>Please enter the keyword</h4>
              <input type="text" placeholder="keyword" ref={(input) => this._query = input}/>
              <h4>Please enter the city</h4>
              <input type="text" placeholder="city" ref={(input) => this._city = input} />
            </div>
            <div className="tweet-form-action">
            <button type="submit">Submit</button>
            </div>
          </form>
          <button className="add-post-button" type="button" onClick={this.fetchtweets.bind(this)}>Fetch tweets</button>
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