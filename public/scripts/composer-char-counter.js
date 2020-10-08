// Functionality for the character counter, gets the amount of characters inputted into the form and 
// subtracts them from 140, showing the result
// if the value is less than 0 it adds the class responsible for changing the color to the counter
$(document).ready(function() {
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

