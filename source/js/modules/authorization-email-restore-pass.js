const $input1 = $('#restore-password-1');
const $input2 = $('#restore-password-2');
const $btn = $input1.parents('.input-block').siblings('.authorization__btn');
const $form = $input1.parents('form');

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

