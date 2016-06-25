import React from 'react';
import TweetsBox from '../../components/TweetsBox/TweetsBox';

const TweetsList = (props) => {
  const TweetsBoxes = props.tweets.map((tweet, index) => {
    return <TweetsBox tweet={tweet} key={index} />
  });

  return (
    <div>
      {TweetsBoxes}
    </div>
  );

};

export default TweetsList
