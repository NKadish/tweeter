/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (const obj of tweets) {
    $('.tweet-container').append(createTweetElement(obj));
  }
}


const createTweetElement = function(tweetObject) {
  let tweet = '';
  tweet += '<article>'
  tweet += '<header class="tweet-header">'
  tweet += '<div class="face-name">'
  tweet += `<img class="img" src="${tweetObject.user.avatars}">`
  tweet += `${tweetObject.user.name}`
  tweet += '</div>'
  tweet += `<b class="handle">${tweetObject.user.handle}</b>`
  tweet += '</header>'
  tweet += '<div class="tweet-text">'
  tweet += `<b>${tweetObject.content.text}</b>`
  tweet += '</div>'
  tweet += '<footer class="tweet-footer">'
  tweet += '10 days ago'
  tweet += '<div class="icons">'
  tweet += '<i class="far fa-flag"></i>\n'
  tweet += '<i class="fas fa-retweet"></i>\n'
  tweet += '<i class="far fa-heart"></i>\n'
  tweet += '</div>'
  tweet += '</footer>'
  tweet += '</article>'
  return tweet;
};

$(document).ready(function() { 
  renderTweets(data);
});
