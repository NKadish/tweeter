// For securing our user inputs from cross-site scripting
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Goes through the object of tweets and runs createTweetElement on each of them
// Then it places them on our display newest first 
const renderTweets = function(tweets) {
  for (const obj of tweets) {
    $('.tweet-container').prepend(createTweetElement(obj));
  }
};

// Turns the tweet object into HTML for the tweet
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

// What we're doing once the document is ready
$(document).ready(function() { 
  // starts with hiding the error bad so that we don't see it on load
  $('.error').hide();
  // this goes through what happens when the form is submitted
  $('form').submit(function(event) {
    event.preventDefault();
    let $formInput = $(this).serialize();
    // fetches text-form so we can see what # of chars we're at
    let textForm = ($(this).children('.text-form'));

    if (textForm.val().length === 0) {
      // if there is nothing in the submit form, give an error 
      let errorMsg = '';
      errorMsg += '<i class="fas fa-exclamation-triangle"></i>'
      errorMsg += '<b> Please put text into the form! </b>'
      errorMsg += '<i class="fas fa-exclamation-triangle"></i>'
      $('.error').hide();
      $('.error').empty();
      $('.error').append(errorMsg);
      $('.error').slideDown('slow');
    } else if (textForm.val().length > 140) {
      // else if there are too many characters, give an error
      let errorMsg = '';
      errorMsg += '<i class="fas fa-exclamation-triangle"></i>'
      errorMsg += '<b> Please keep your text within 140 chars! </b>'
      errorMsg += '<i class="fas fa-exclamation-triangle"></i>'
      $('.error').hide();
      $('.error').empty();
      $('.error').append(errorMsg);
      $('.error').slideDown('slow');

    } else {
      // else if all is good, post the tweet and load it into the page
      $('.error').slideUp('slow')
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $formInput
      })
      .then(() => {
        $.ajax({
          url: '/tweets',
          method: 'GET'
        })
        .then((tweets) => {
          $('.tweet-container').prepend(createTweetElement(tweets[tweets.length - 1]));
        });
      });
      textForm.val(''); // once the tweet is submitted, the text in the text box empties
    }
  });

  // this gets the tweets from /tweets and then runs renderTweets on them
  // we do this on document ready so that the tweets that already exist load on the page being ready
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .then((tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();
});

// functionality for the write a new tweet button
// when clicked it scrolls the write a new tweet to the top of the page and focuses on it
$(document).ready(function() {
  $('.nav-text-right').click(function() {
    $('.text-form')[0].scrollIntoView(true);
    window.scrollBy(0, -180);
    $('.text-form').focus();
  })
});