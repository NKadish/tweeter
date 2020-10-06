$(document).ready(function() {
  // --- our code goes here ---
  document.querySelector('.text-form').addEventListener('keyup', function(event) {
    let counter = ($(this).parent().children().find('.counter'));
    let counterValUpdate = $(counter).val((140 - $(this).val().length));
    if (counterValUpdate.val() < 0) {
      counter.addClass('color-of-counter');
    } else {
      counter.removeClass('color-of-counter');
    }
    counterValUpdate;
  });
});

