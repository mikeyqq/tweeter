$(document).ready(function() {
  let maxLength = 140;
  $("#check-text").on("keyup", function(evt) {
    let length = $(this).val().length;
    let currentLength = maxLength - length;
    $(".counter").text(currentLength);

    if (currentLength < 0) {
      $(".counter").css("color", "red");
    } else if (currentLength >= 0) {
      $(".counter").css("color", "black");
    }
  });
});
