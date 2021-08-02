class Timer {
  constructor($elem, max) {
    Object.assign(this, {
      $elem
    });

    if (!localStorage.getItem('code-timer')) {
      localStorage.setItem('code-timer', max);
    }
  }

  start() {
    const {$elem} = this;

    let timer = setInterval(function() {
      let current = +localStorage.getItem('code-timer');
      current--;
      localStorage.setItem('code-timer', current);

      if (current < 0) {
        clearInterval(timer);
        localStorage.removeItem('code-timer');
        $elem.parent().siblings('.authorization__repeat-code-btn').removeAttr('disabled');
        $elem.parent().remove();
      } else {
        $elem.html(current);
      }
    }, 1000);
  }
}

export default Timer;
