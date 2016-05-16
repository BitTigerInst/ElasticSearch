import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import fetch from 'isomorphic-fetch';
import createFragment from 'react-addons-create-fragment';

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

  render() {
    return (
      <div>
        <Header onClick={this.handleClick} />
        <div className="container">
        	<h1>Twitter APIs Test Section</h1>
          <button className="add-post-button" type="button" onClick={this.fetchtweets.bind(this)}>Fetch tweets</button>
          <div>{JSON.stringify(this.state.tweets)}</div>
        </div>
        <Footer />
      </div>
    );
  }
}




export default Twitsection;