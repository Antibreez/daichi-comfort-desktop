const $input = $('.authorization-entrance  .input-block__input');
const $btn = $('.authorization-entrance  .authorization__btn');
const $form = $('.authorization-entrance  form');

function isMatch($input) {
  return  $input.val().match(/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/) !== null
  || $input.val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) !== null;
}

function isFilled($input) {
  return $input.val() !== '' && $input.val().split(' ').join('') !== '';
}

$input.on('input', function() {
  $input.parents('.input-block').removeClass('show-note  js-error')

  if (isFilled($(this))) {
    $btn.removeAttr('disabled');
  } else {
    $btn.attr('disabled', '');
  }

});

$btn.on('click', function(e) {
  e.preventDefault();

  if (isMatch($input)) {
    $form.submit();
  } else {
    $input.parents('.input-block').addClass('show-note js-error');
  }
})
