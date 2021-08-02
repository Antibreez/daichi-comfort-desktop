import Timer from '../vendor/timer';

const $input = $('#phone-code');
const $btn =  $input.parents('.input-block').siblings('.authorization__btn');

function isFilled($input) {
  return $input.val() !== '' && $input.val().split(' ').join('') !== '';
}

$input.on('input', function() {
  $(this).parents('.input-block').removeClass('show-note js-error');

  if (
    isFilled($(this))
  ) {
    $btn.removeAttr('disabled');
  } else {
    $btn.attr('disabled', '');
  }
});

if ($('.timer-counter').length > 0) {
  const timer = new Timer($('.timer-counter'), 10);

  timer.start();
}

