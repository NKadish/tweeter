/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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
  tweet += `<img class="img" src="${escape(tweetObject.user.avatars)}">`
  tweet += `${escape(tweetObject.user.name)}`
  tweet += '</div>'
  tweet += `<b class="handle">${escape(tweetObject.user.handle)}</b>`
  tweet += '</header>'
  tweet += '<div class="tweet-text">'
  tweet += `${escape(tweetObject.content.text)}`
  tweet += '</div>'
  tweet += '<footer class="tweet-footer">'
  tweet += `${escape(new Date(tweetObject.created_at).toLocaleString())}`
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
  $('.error').hide();
  $('form').submit(function(event) {
    event.preventDefault();
    let $formInput = $(this).serialize();
    let textForm = ($(this).children('.text-form'));
    if (textForm.val().length === 0) {
      let errorMsg = '';
      errorMsg += '<i class="fas fa-exclamation-triangle"></i>'
      errorMsg += '<b> Please put text into the form! </b>'
      errorMsg += '<i class="fas fa-exclamation-triangle"></i>'
      $('.error').hide();
      $('.error').empty();
      $('.error').append(errorMsg);
      $('.error').slideDown('slow');
    } else if (textForm.val().length > 140) {
      let errorMsg = '';
      errorMsg += '<i class="fas fa-exclamation-triangle"></i>'
      errorMsg += '<b> Please keep your text within 140 chars! </b>'
      errorMsg += '<i class="fas fa-exclamation-triangle"></i>'
      $('.error').hide();
      $('.error').empty();
      $('.error').append(errorMsg);
      $('.error').slideDown('slow');
    } else {
      $('.error').slideUp('slow')
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
      textForm.val('');
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

