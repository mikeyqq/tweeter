const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetData) {
  return `
  <article class="user-tweets">
  <header>
    <div class="article-header">
      <span class="tweet-avatar-pic"
        ><img
          src="${escape(tweetData.user.avatars)}"
          height="44"
          width="44"
        />
        ${escape(tweetData.user.name)}</span
      >
      <span class="tweet-handle">${escape(tweetData.user.handle)}</span>
    </div>
  </header>

  <p class="sentTweets">${escape(tweetData.content.text)}</p>

  <footer>
    <div class="article-footer">
      <p><span>${moment(new Date(tweetData.created_at)).fromNow()}</span></p>
      <p>
        <span> <img src="/images/flag.png"/></span>
        <span> <img src="/images/retweet.png"/></span>
        <span> <img src="/images/love.png"/></span>
      </p>
    </div>
  </footer>
</article> `;
};

$(document).ready(function() {
  loadtweets();

  /*-------------------ARROW UP SCROLL BUTTON FUNCTION---------------------------*/
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
      $("#return-to-top").fadeIn(200);
    } else {
      $("#return-to-top").fadeOut(200);
    }
  });
  $("#return-to-top").click(function() {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      500
    );
  });

  /*-------------------ERROR MESSAGE BOX STARTS OFF HIDING---------------------------*/
  $(".new-tweet").hide();
  $(".zero-msg").hide();
  $(".exceed-msg").hide();

  /*-------------------WRITE A NEW TWEET ICON---------------------------*/

  $(".bounce").click(function() {
    $(".new-tweet").slideToggle("slow", function() {
      $("#check-text").focus();
    });
  });

  /*----------------------GOES THROUGH TRUTH/FALSEY IN CHAT BOX, IF TRUE ERROR MESSAGE WILL APPEAR/ OTHERWISE MESSAGE WILL GET POSTED--------------------------------------------*/
  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();

    if ($("#check-text").val().length === 0) {
      $(".zero-msg").slideDown("slow");
      setTimeout(() => {
        $(".zero-msg").hide("slow");
      }, 2000);
    } else if ($("#check-text").val().length > 140) {
      $(".exceed-msg").slideDown("slow");
      setTimeout(() => {
        $(".exceed-msg").hide("slow");
      }, 2000);
    } else {
      $.ajax({
        url: $(this).attr("action"),
        type: "POST",
        data: $(this).serialize()
      }).done(function() {
        loadtweets();
        $("#check-text").val("");
        $(".counter").text("140");
      });
    }
  });
});

function loadtweets() {
  $.ajax({
    url: "http://localhost:8080/tweets",
    type: "GET"
  }).done(function(data) {
    $("#tweets-container").empty();
    let array = [];
    for (let tweet of data) {
      array.unshift(createTweetElement(tweet));
    }
    $("#tweets-container").append(array);
  });
}
