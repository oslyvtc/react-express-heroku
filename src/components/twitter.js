import React, { Component } from 'react';
import './twitter.css';

class Twitter extends Component {
  constructor() {
    super();
    this.state = {
      twitter: [],
      port: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/tweets', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: event.target.elements.name.value})
    }).then(res => res.json())
      .then(twitter => this.setState({twitter}, () => console.log('Twitter fetched..')));
  }

  render() {
    return (
      <div>
        <h2>Twitter</h2>
        <form onSubmit={this.handleSubmit} >
          <input type="text" name="name" />
          <input type="submit" value="submit" />
        </form>

        {this.state.twitter.map(twitter => 
        <div key = {twitter.postDate} className="twit">
          <div className="twit__logo">
            <img src={twitter.avatar} />
          </div>
          <div className="twit__content-wr">
            <div className="twit__content-header">
              <h2 className="twit__owner">
                {twitter.name}
              </h2>
              <div className="twit__date">
                {twitter.postDate}
              </div>
            </div>
            <p className="twit__content">
              {twitter.content}
            </p>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default Twitter;

