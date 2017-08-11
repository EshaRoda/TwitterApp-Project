/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( function() {
var tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }
];


function renderTweets (tweets){
  for (let tweet of tweets){
    let $input = createTweetElement(tweet);
    $('.existing-tweet').prepend($input);
  }
}

function getDate(postDate) {
  let now = new Date();
  let dif = now - postDate;
  let day = Math.floor(dif / (1000 * 60 * 60 * 24));
  return day;
}

function createTweetElement (data) {
  const $date = getDate(data.created_at);
  const $text = escape(data.content.text);
  return $(`<article class="tweet">
     <header>
       <div class="rect"></div>
        <p class="name">${data.user.name}</p>
        <p class="username">${data.user.handle}</p>
        <img class="profilepic" src="${data.user.avatars.regular}">
     </header>
    <main>
      <div class ="text">${$text}</div>
    </main>
    <footer><p class="footer">${$date} days ago.</p>
    <span class="images">
    <i class="fa fa-flag" aria-hidden="true"></i>
    <i class="fa fa-repeat" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
    </span></footer>
    </article>`);
}


function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function loadTweets(){
  $.ajax({
    url:'/tweets',
    method:'GET',
  }).then(function(data){
    $('.existing-tweet').empty();
    renderTweets(data);
  });
  // .catch(function (err) {
  //   console.log(err);
  //   alert('ERROR');
  //});
}

loadTweets();

$('.new-tweet form').on('submit', function (event){
  event.preventDefault();
  var form = this;
  var $text = $(this).find('textarea').serialize();
  //console.log($(this).find('textarea').val().length);
    if ($text.length - 5 === 0) {
      return alert("Please type something!");
    } else if ($(this).find('textarea').val().length > 140 ) {
      return alert("Too many characters!");
    } else {
      $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $text
    }).done(function () {
      //$(this).find('textarea').val("");
      form.reset();
      loadTweets();

    });
  }
});

$(".composer").on("click", function(event) {
  $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
});


tweets.forEach(function(tweet) {
  $('section.existing-tweet').append(createTweetElement(tweet));
});

});
