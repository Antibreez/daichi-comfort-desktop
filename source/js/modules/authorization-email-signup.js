const $input1 = $('.authorization-email-signup  #password-1');
const $input2 = $('.authorization-email-signup  #password-2');
const $btn = $('.authorization-email-signup  .authorization__btn');

function isFilled($input) {
  return $input.val() !== '' && $input.val().split(' ').join('') !== '';
}

function onInput() {
  if (
    isFilled($input1)
    && isFilled($input2)
    && $input1.val() === $input2.val()
  ) {
    $btn.removeAttr('disabled');
  } else {
    $btn.attr('disabled', '');
  }
}

function renderError() {
  if (
    !isFilled($input1)
    || !isFilled($input2)
    || $input1.val() !== $input2.val()
  ) {
    $input2.parents('.input-block').addClass('show-note js-error');
  }
}

function removeError() {
  if (
    isFilled($input1)
    && isFilled($input2)
    && $input1.val() === $input2.val()
  ) {
    $input2.parents('.input-block').removeClass('show-note js-error');
  }
}

$input1.on('input', onInput);
$input2.on('input', onInput);
$input2.on('input', renderError);
$input1.on('input', removeError);
$input2.on('input', removeError);

