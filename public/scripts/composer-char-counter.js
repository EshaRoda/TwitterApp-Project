$(function(){
  $('.new-tweet textarea').on('input', function() {
    let texts = $(this).val().length;
    let textsLeft = 140 - texts;

    $(this)
    .closest('.new-tweet')
    .find('.counter')
    .text(textsLeft);

    if(textsLeft < 0){
      $(this)
      .closest('.new-tweet')
      .find('.counter')
      .css({
        "color" : "red"
      });
    } else {
      $(this)
      .closest('.new-tweet')
      .find('.counter')
      .css("color", "black");
    }
  });
});