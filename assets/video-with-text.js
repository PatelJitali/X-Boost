  $(window).on('scroll', function () {
    $('.cc-video-with-text .brand-block').each(function () {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 100) {
        $(this).addClass('active');
      }
    });
  });