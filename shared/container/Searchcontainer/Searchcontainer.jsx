import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initMap } from '../../modules/GooglePlaces';
import * as moment from 'moment';

class Searchcontainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  // _handleSubmit(event) {
  //   event.preventDefault();
  //   let cleanData;
  //   let city = this._city.value;
  //   let query = this._query.value;
  //   let url = `/TwitterAPI/searchByArea/${city}/`;

  //   $.get(url).done(function(data) {
	 //    cleanData = data.hits.hits.map(function(v) {
	 //        let lng = v._source.place.bounding_box.coordinates[0][0][0];
	 //        let lat = v._source.place.bounding_box.coordinates[0][0][1];
	 //        if (v._source.coordinates !== null) {
	 //          lat = v._source.coordinates.coordinates[1];
	 //          lng = v._source.coordinates.coordinates[0];
	 //        }
	 //        console.log(lng,lat);
	 //        return {
	 //          lat:lat,
	 //          lng:lng
	 //        }
	 //      })
	 //      initMap(cleanData); 
	 //      this.setState({tweets:data});
	 //    }.bind(this)).fail(function() {
	 //      alert('Error occured!');
	 //    });
  //   }
  
  render() {
  	return (
	  	<div className="SearchWrapper">
	  		<div className="bgwrapper">
	  			<img src="/img/searchbg.jpg" />
	  		</div>
			<div className="SearchWidget">
				<form className="tweet-form" onSubmit={this.props.handleSubmit.bind(this)}>
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