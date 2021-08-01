const $input1 = $('.authorization-email-signup  #password-1');
const $input2 = $('.authorization-email-signup  #password-2');
const $btn = $('.authorization-email-signup  .authorization__btn');
const $form = $('.authorization-email-signup  form');

function isFilled($input) {
  return $input.val() !== '' && $input.val().split(' ').join('') !== '';
}

function onInput() {
  $input2.parents('.input-block').removeClass('show-note js-error');

  if (
    isFilled($input1)
    && isFilled($input2)
    // && $input1.val() === $input2.val()
  ) {
    $btn.removeAttr('disabled');
  } else {
    $btn.attr('disabled', '');
  }
}

$btn.on('click', function(e) {
  e.preventDefault();

  if (
    $input1.val() !== $input2.val()
  ) {
    $input2.parents('.input-block').addClass('show-note js-error');
  } else {
    $form.submit();
  }
})

$input1.on('input', onInput);
$input2.on('input', onInput);

