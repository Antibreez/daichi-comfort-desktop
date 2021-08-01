const $input = $('.authorization-email-signin  #password');
const $btn = $('.authorization-email-signin  .authorization__btn');

function isFilled($input) {
  return $input.val() !== '' && $input.val().split(' ').join('') !== '';
}

$input.on('input', function() {
  if (
    $(this).val().length > 3
    && isFilled($(this))
  ) {
    $btn.removeAttr('disabled');
    $(this).parents('.input-block').removeClass('show-note js-error');
  } else {
    $btn.attr('disabled', '');
  }
});
