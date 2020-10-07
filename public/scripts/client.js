/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  for (const obj of tweets) {
    $('.tweet-container').prepend(createTweetElement(obj));
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
  tweet += `${tweetObject.content.text}`
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
  $('form').submit(function(event) {
    event.preventDefault();
    let $formInput = $(this).serialize();
    let textForm = ($(this).children('.text-form'));
    if (textForm.val().length === 0) {
      alert('YOU CAN\'T SEND AN EMPTY TWEET, SORRY');
    } else if (textForm.val().length > 140) {
      alert('MAX CHARACTER INPUT IS 140, PLEASE SHORTEN YOUR TWEET');
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $formInput
      })
      .then(() => {
        $.ajax({
          url: "/tweets",
          method: "GET"
        })
        .then((tweets) => {
          $('.tweet-container').prepend(createTweetElement(tweets[tweets.length - 1]));
        });
      });
    }
  })
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
    .then((tweets) => {
      renderTweets(tweets);
    });
  }
  loadTweets();
});

