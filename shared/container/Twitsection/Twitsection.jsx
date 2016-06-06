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

  _handleSubmit(event) {
    event.preventDefault();

    let city = this._city.value;
    let query = this._query.value;
    let url = `/TwitterAPI/searchByArea/${city}/`;

    $.get(url).done(function(data) {
      console.log(data);
      this.setState({tweets:data});
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
        </div>
        <Footer />
      </div>
    );
  }
}




export default Twitsection;