import React from 'react';

const TweetsBox = ({tweet}) => {
  //这里tweet已经传进来了
    const id = tweet.id;
    return (
      <div className = "tweet-wrapper">
      <div className = "tweet-showbox" >
        <div className = "user-info">

          <div className = "tweet-avatar" >
            <img src={tweet.img} ></img>
          </div>
          <div className="tweet-info">
            <div className = "tweet-id" >
              {tweet.name}
            </div>
            <div className = "tweet-time" >
              {tweet.time}
            </div>
          </div>

        </div>


        <div className = "tweets-text" >
          {tweet.content}
        </div>
      </div>
    </div>
    );
};


export default TweetsBox
