const tweetInput = document.getElementById("tweet");
const usernameInput = document.getElementById("username");
const addTweetBtn = document.getElementById("add-tweet");
const allTweetsContainer = document.getElementById("all-tweets-container");

// Array to store all tweets
let tweetsArray = [];

// Create Tweet function, will be invoked when we create a new tweet or retweet one.
const createTweet = (author, tweet) => {
  // We used unshift method to add last tweet in the top of the array.
  tweetsArray.unshift({ author, tweet, like: false });

  // After that, We saved our tweet in the local storage.
  localStorage.setItem("tweets", JSON.stringify(tweetsArray));

  // then, We Invoked displayAllViews to display all tweets in the page.
  displayAllViews();
  tweetInput.value = "";
  usernameInput.value = "";
};

const handleLikeTweet = (e) => {
  // Here we got the element that user clicked
  const [usernameView, tweetView] = e.target.parentElement.children;
  const targetTweetContent = tweetView.textContent;
  const targetUsername = usernameView.textContent;

  // Then, we search about it in our array.
  const [likedTweet] = tweetsArray.filter(
    (tweet) => tweet.tweet === targetTweetContent && tweet.author === targetUsername 
  );

  // After got it, we change the value of like property to true.
  likedTweet.like = true;
  
  // Then, we add a class for this tweet to change its appearance.
  const { parentElement } = e.target;
  parentElement.className = "likeTweet";

  // Finally, Save all modifications to local storage.
  localStorage.setItem("tweets", JSON.stringify(tweetsArray));
};

const handleReTweet = (e) => {
  // Take values and recreate the tweet again
  const [username, tweet] = e.target.parentElement.children;
  createTweet( username.textContent,tweet.textContent);
};

const handleDom = ({ tweet, author, like }) => {
  // Create elements
  const singleTweetBox = document.createElement("div");
  const tweetParagraph = document.createElement("p");
  const UsernameParagraph = document.createElement("p");
  const LikeBtn = document.createElement("button");
  const reTweetBtn = document.createElement("button");

  LikeBtn.classList.add("style");
  reTweetBtn.classList.add("style");
  singleTweetBox.className = like ? "likeTweet" : "border";
  
  // singleTweetBox.classList.add("border");
  // Add data to views
  tweetParagraph.textContent = tweet;
  UsernameParagraph.textContent = author;

  UsernameParagraph.classList.add("gray");
  UsernameParagraph.classList.add("padding");
  tweetParagraph.classList.add("padding");

  LikeBtn.textContent = "Like";
  reTweetBtn.textContent = "ReTweet";

  // Add listeners to buttons
  LikeBtn.addEventListener("click", handleLikeTweet);
  reTweetBtn.addEventListener("click", handleReTweet);

  // Append views to the container
  singleTweetBox.append(UsernameParagraph, tweetParagraph, LikeBtn, reTweetBtn);
  allTweetsContainer.appendChild(singleTweetBox);
};

const displayAllViews = () => {
  const data = JSON.parse(localStorage.getItem("tweets"))
  if (data) tweetsArray = data;
  
  if (tweetsArray.length) {
    allTweetsContainer.textContent = "";
    tweetsArray.forEach((tweet) => handleDom(tweet));
  } else {
    allTweetsContainer.textContent = "No Tweets yet, Share your first Tweet";
  }
};

addTweetBtn.addEventListener("click", (e) => {
  createTweet(usernameInput.value, tweetInput.value)
});

displayAllViews();