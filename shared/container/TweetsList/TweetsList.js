import React from 'react';
import TweetsBox from '../../components/TweetsBox/TweetsBox';

const TweetsList = (props) => {
  const TweetsBoxes = props.tweets.map((tweet) => {
    return <TweetsBox tweet={tweet} />
  });

  return (
    <div>
      {TweetsBoxes}
    </div>
  );

};

export default TweetsList
