import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initMap } from '../../modules/GooglePlaces';
import moment from 'moment';

class Searchcontainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  _handleSubmit(event) {
    event.preventDefault();
    let cleanData;
    let city = this._city.value;
    let query = this._query.value;
    let url = `/TwitterAPI/searchByAreaHashtag/${city}/${query}`;

    $.get(url).done(function(data) {
	    cleanData = data.hits.hits.map(function(tweet) {
	        let lng = tweet._source.place.bounding_box.coordinates[0][0][0];
	        let lat = tweet._source.place.bounding_box.coordinates[0][0][1];
	        if (tweet._source.coordinates !== null) {
	          lat = tweet._source.coordinates.coordinates[1];
	          lng = tweet._source.coordinates.coordinates[0];
	        }
			let time = moment(tweet._source['@timestamp']).utc().format('MM-DD h:mm A');
			return {
			  img:tweet._source.user.profile_image_url,
			  time:time,
			  name:tweet._source.user.name,
			  content:tweet._source.text,
			  googlePlace:{
			  	lat:lat,
			  	lng:lng
			  }
			}
	      })
	      initMap(cleanData); 
	      this.setState({tweets:data});
	      this.props.renderTweetsData(cleanData);
	    }.bind(this)).fail(function() {
	      alert('Error occured!');
	    });
    }
  
  render() {
  	return (
	  	<div className="SearchWrapper">
	  		<div className="bgwrapper">
	  			<img src="/img/searchbg.jpg" />
	  		</div>
			<div className="SearchWidget">
				<form className="tweet-form" onSubmit={this._handleSubmit.bind(this)}>
					<div className="tweet-form-fields">
						<input type="text" placeholder="#Content" ref={(input) => this._query = input}/>
						<input type="text" placeholder="Location" ref={(input) => this._city = input} />
						<div className="tweet-form-action">
							<button type="submit">Submit</button>
						</div>
					</div>
				</form>
			</div>
	    </div>
  	)
  }	
}

export default Searchcontainer;