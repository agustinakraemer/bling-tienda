
$(document).ready(function() {
    const altura = $('.navegation').offset().top

    $(window).on("scroll", function() {
        if ($(window).scrollTop() > altura){
           $('.navegation').addClass('menu-fixed')
           $('.header__logo_after').addClass('logo-small')
          
        } else {
           $('.navegation').removeClass('menu-fixed')
           $('.header__logo_after').removeClass('logo-small')
        }

    });
});


