export const initialState = [
  {
    _id: 'ac82',
    content: 'DALE CAMPEON DALE CAMPEON!!!!!!! 🌎🏆',
    timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000),
    media: null,
    likes: [],
    retweets: [],
    author: {
      id: '1a',
      verified: true,
      private: true,
      name: 'Maxi',
      username: 'MaxiiMartins',
      image: 'https://avatars.githubusercontent.com/u/95777615?v=4',
      followers: [],
      following: []
    },
    comments: []
  },
  {
    _id: 'ab19',
    content: 'CAMPEONES DEL MUNDO!!!!!!! 🌎🏆',
    timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000),
    media: 'https://pbs.twimg.com/media/FkWOB7-WQAAPLaU?format=jpg&name=small',
    likes: [
      {
        id: '12113f',
        userId: '1a',
        tweetId: 'ab13'
      }
    ],
    retweets: [],
    author: {
      id: '10',
      verified: true,
      private: false,
      name: 'Leo Messi',
      username: 'leomessisite',
      image: 'https://pbs.twimg.com/profile_images/1612291632342122499/h2jKhVoh_400x400.jpg',
      followers: [],
      following: []
    },
    comments: [{
      id: '123sc',
      content: 'VAMOS MESSI!! DALE CAMPEON!!!!!!! 🌎🏆',
      timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000),
      media: null,
      likes: [],
      retweets: [],
      author: {
        id: '1a',
        verified: true,
        private: true,
        name: 'Maxi',
        username: 'MaxiiMartins',
        image: 'https://avatars.githubusercontent.com/u/95777615?v=4',
        followers: [],
        following: []
      },
      comments: []
    }]
  },
  {
    _id: '43dd',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo asperiores molestias eaque magnam, dolore aperiam, dolor modi totam rerum officiis quis in ad',
    timestamp: Date.now() - (8* 24 * 60 * 60 * 1000),
    media: "https://pbs.twimg.com/media/FvO6aUXXwAEMWHo?format=jpg&name=large",
    likes: [],
    retweets: [],
    author: {
      id: '312',
      verified: true,
      private: false,
      name: 'Cristiano Ronaldo',
      username: 'Cristiano',
      image: 'https://pbs.twimg.com/profile_images/1594446880498401282/o4L2z8Ay_400x400.jpg',
      followers: [],
      following: []
    },
    comments: []
  },
  {
    _id: '23gaa',
    content: '👟🔥 @adidasfootball',
    timestamp: Date.now() - (9* 24 * 60 * 60 * 1000),
    media: 'https://pbs.twimg.com/media/FufRHP3WYAcESCp?format=jpg&name=small',
    likes: [
      {
        id: '12113f',
        userId: '1a',
        tweetId: 'ab13'
      }
    ],
    retweets: [],
    author: {
      id: '10',
      verified: true,
      private: false,
      name: 'Leo Messi',
      username: 'leomessisite',
      image: 'https://pbs.twimg.com/profile_images/1612291632342122499/h2jKhVoh_400x400.jpg',
      followers: [],
      following: []
    },
    comments: []
  },
  {
    _id: 'ab12',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo asperiores molestias eaque magnam, dolore aperiam, dolor modi totam rerum officiis quis in ad',
    timestamp: Date.now() - (5* 24 * 60 * 60 * 1000),
    media: null,
    likes: [],
    retweets: [],
    author: {
      id: '1a',
      verified: true,
      private: false,
      name: 'Cristiano Ronaldo',
      username: 'Cristiano',
      image: 'https://pbs.twimg.com/profile_images/1594446880498401282/o4L2z8Ay_400x400.jpg',
      followers: [],
      following: []
    },
    comments: []
  },
  {
    _id: 'ab16',
    content: '👟🔥 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo asperiores molestias eaque magnam',
    timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000),
    media: "https://picsum.photos/500/600",
    likes: [
      {
        id: '12113f',
        userId: '1a',
        tweetId: 'ab13'
      }
    ],
    retweets: [],
    author: {
      id: '10',
      verified: true,
      private: false,
      name: 'Leo Messi',
      username: 'leomessisite',
      image: 'https://pbs.twimg.com/profile_images/1612291632342122499/h2jKhVoh_400x400.jpg',
      followers: [],
      following: []
    },
    comments: []
  },
  {
    _id: 'ab1d',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo asperiores molestias eaque magnam, dolore aperiam, dolor modi totam rerum officiis quis in ad',
    timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000),
    media: null,
    likes: [],
    retweets: [],
    author: {
      id: '1a',
      verified: true,
      private: false,
      name: 'Cristiano Ronaldo',
      username: 'Cristiano',
      image: 'https://pbs.twimg.com/profile_images/1594446880498401282/o4L2z8Ay_400x400.jpg',
      followers: [],
      following: []
    },
    comments: []
  },
  {
    _id: 'ac23',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo asperiores molestias eaque magnam 🔥',
    timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000),
    media: "https://picsum.photos/400/500",
    likes: [
      {
        id: '12113f',
        userId: '1a',
        tweetId: 'ab13'
      }
    ],
    retweets: [],
    author: {
      id: '10',
      verified: true,
      private: false,
      name: 'Leo Messi',
      username: 'leomessisite',
      image: 'https://pbs.twimg.com/profile_images/1612291632342122499/h2jKhVoh_400x400.jpg',
      followers: [],
      following: []
    },
    comments: []
  }
]
