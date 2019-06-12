$(document).ready(function(){

    'use strict';

    // Nice Scroll
    $("html").niceScroll();

    /* Start Scroll */
    var scrollNav = $('header'),
        scrollLink = $('header nav ul li a'),
        scrollmenu = $('header nav .navbar-toggler-icon'),
        scrollBtn = $('.scroll');
        
    $(window).scroll(function(){
        // Header nav Scroll
        if ($(this).scrollTop() >= 100) {
            $("header").addClass("fixed-top");
            scrollNav.addClass('nav-scroll');
            scrollLink.addClass('nav-black');
            scrollLink.removeClass('nav-active');
            scrollmenu.addClass('navbar-toggler-icon-black');
        } else {
            $("header").removeClass("fixed-top");
            scrollNav.removeClass('nav-scroll');
            scrollLink.removeClass('nav-black');
            scrollLink.addClass('nav-active');
            scrollmenu.removeClass('navbar-toggler-icon-black');
        }

        /* Scroll Top Arrow */
        scrollBtn = $(this).scrollTop() >= 630 ? scrollBtn.show() : scrollBtn.hide();
    });
    /* End Scroll */

    /* Top Arrow Animate */
    scrollBtn.click(function(){
        $("html,body").animate({ scrollTop: 0 }, 2000);
    });

    /* Navlinks Sections Animation */
    $('.nav-link').click(function() {
        var sectionTo = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(sectionTo).offset().top
        }, 1000);
    });

    /* Start Screenshots Swiper */
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        spaceBetween: 38,
        loop: true,
        speed: 1500,
        grabCursor: true,
        pagination: {
          el: '.screenshot-container .swiper-pagination',
          clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            1199: {
                slidesPerView: 5,
                spaceBetween: 40
            },
            992: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 20
            },
            461: {
                slidesPerView: 1,
                centeredSlides: false,
                spaceBetween: 20
            }
        }
      });
      /* End Screenshots Swiper */

      /* Start Testimonials Slider */
      $('.owl-carousel').owlCarousel({
        loop:true,
        rewindNav:false,
        dots: true,
        nav: false,
        items:1,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        smartSpeed: 800,
        margin: 0,
    })
    /* End Testimonials Slider */

    /* Start Changing and Adding Container classes on window resize */
    $(window).resize(function() {
        if ($(window).width() > 992) {
            $('header .head').addClass('container');
            $('header .head').removeClass('container-fluid');
        } else {
            $('header .head').removeClass('container');
            $('header .head').addClass('container-fluid');
        }
    });

    if ($(window).width() > 992) {
        $('header .head').addClass('container');
        $('header .head').removeClass('container-fluid');
    } else {
        $('header .head').removeClass('container');
        $('header .head').addClass('container-fluid');
    }
    /* End Changing and Adding Container classes on window resize */

    /* Init AOS Animtaion */
    AOS.init({
        offset: 150,
        duration: 400,
        easing: 'linear',
        delay: 0,
        once: false,
        mirror: false,
        disable: 'mobile'
    });

    /* Start Preloader */
    function hidePreLoader(){
        $(".preloader").fadeOut(500);
    }
    hidePreLoader();
    /* End Preloader */

    /*
    $(window).on('load', function() {
        hidePreLoader();
    });
    
    window.onload = function() {
        hidePreLoader();
    };

    /*
    function ContentLoaded(){
        window.onload = function(){
            hidePreLoader();
        }
    }*/
});