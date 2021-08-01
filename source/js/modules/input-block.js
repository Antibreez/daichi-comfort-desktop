const $input = $('.input-block__input');

$(window).on('load', function() {
  $input.each(function() {
    if ($(this).val() !== '') {
      $(this).parents('.input-block').removeClass('js-empty');
    } else {
      $(this).parents('.input-block').addClass('js-empty');
    }
  });
})


$input.on('focus', function() {
  const $block = $(this).parents('.input-block');
  $block.removeClass('js-empty');
});

$input.on('blur', function() {
  const $block = $(this).parents('.input-block');

  if ($(this).val().split(' ').join('') === '') {
    $(this).val('');
  }

  if ($(this).val() === '') {
    $block.addClass('js-empty');
  }
});

window.addEventListener('pageshow', function() {
  $input.each(function() {
    if ($(this).val() !== '') {
      $(this).parents('.input-block').removeClass('js-empty');
    } else {
      $(this).parents('.input-block').addClass('js-empty');
    }
  });
});

$('.input-block__icon-btn--password').on('click', function() {
  const $input = $(this).siblings('.input-block__input');
  const $show = $(this).find('.input-block__icon-show');
  const $hide = $(this).find('.input-block__icon-hide');

  if ($input.attr('type') === 'password') {
    $input.attr('type', 'text');
    $show.hide();
    $hide.show();
  } else if ($input.attr('type') === 'text') {
    $input.attr('type', 'password');
    $show.show();
    $hide.hide();
  }
})
