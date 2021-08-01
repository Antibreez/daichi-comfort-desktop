const $input = $('.authorization-entrance  .input-block__input');
const $btn = $('.authorization-entrance  .authorization__btn');

function isMatch($input) {
  return  $input.val().match(/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/) !== null
  || $input.val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) !== null;
}

function isFilled($input) {
  return $input.val() !== '' && $input.val().split(' ').join('') !== '';
}

$input.on('input', function() {

  if (isMatch($(this)) && isFilled($(this))) {
    $btn.removeAttr('disabled');
  } else {
    $btn.attr('disabled', '');
  }

});
