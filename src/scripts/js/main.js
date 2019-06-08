$(document).ready(function(){

    'use strict';

    // Nice Scroll
    $("html").niceScroll();

    /* Scroll */
    var scrollNav = $('header'),
        scrollLink = $('header nav ul li a'),
        scrollLinkActive = $('header nav ul li.active a');

    $(window).scroll(function(){
        if ($(this).scrollTop() >= 150) {
            scrollNav.addClass('nav-scroll');
            scrollLink.addClass('nav-item');
            scrollLinkActive.addClass('nav-active');
        } else {
            scrollNav.removeClass('nav-scroll');
            scrollLink.removeClass('nav-item');
            scrollLinkActive.removeClass('nav-active');
        }
    });

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        spaceBetween: 38,
        loop: true,
        speed: 1500,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
      });
});