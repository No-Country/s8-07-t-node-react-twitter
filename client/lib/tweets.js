const createTweet = async (tweet) => {
  try {
    const response = await fetch(`http://localhost:8000/api/create`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        content: tweet.content,
        hashtags: tweet.hashtags
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: 'Error creating tweet' };
  }
};

const getAllTweets = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/tweets`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: 'Error getting all tweets' };
  }
};

export { createTweet, getAllTweets };
