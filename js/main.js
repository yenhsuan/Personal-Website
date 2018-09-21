import $ from 'jquery'
import jQuery from 'jquery'
import AOS from 'aos'

import '../js/vertical-timeline.js'
import '../css/normalize.css'
import '../css/skeleton.css'
import '../css/vertical-timeline.css'
import 'aos/src/sass/aos.scss'
import '../sass/main.scss'

$(document).ready(() => {
    $('<img/>').attr('src', '../img/bg-home.jpg').on('load', function() {
        $(this).remove();
        setTimeout(() => {
            $(".loader").css("visibility", "hidden");
            $(".header-primary-main").addClass("header-primary-main-animation");
            $(".header-primary-sub").addClass("header-primary-sub-animation");
            $(".btn-header-main").addClass("btn-move-from-bottom");
        }, 1000);
    })
    .on('error', () => {
        setTimeout(() => {
            $(".loader").css("visibility", "hidden");
            $(".header-primary-main").addClass("header-primary-main-animation");
            $(".header-primary-sub").addClass("header-primary-sub-animation");
            $(".btn-header-main").addClass("btn-move-from-bottom");
        }, 1000);
    });

    let scrollTop = 0;
    $(window).scroll(() => {
        scrollTop = $(window).scrollTop();
        
        if (scrollTop >= 20) {
            $('.navbar').addClass('navbar-small');
            $('.navbar-icon').addClass('navbar-icon-sm');
            $('.navbar-logo').addClass('navbar-logo-sm');                  
        } else if (scrollTop < 20) {
            $('.navbar').removeClass('navbar-small');
            $('.navbar-icon').removeClass('navbar-icon-sm'); 
            $('.navbar-logo').removeClass('navbar-logo-sm');                 
        }
    });

    $("a").on('click', (event) => {
        if (event.currentTarget.hash !== "") {
            if (event.currentTarget.hash === "#projects") {
                return;
            } 

            event.preventDefault();
            $('html, body').animate({scrollTop: $(event.currentTarget.hash).offset().top}, 700, () => {
                window.location.hash = event.currentTarget.hash;
            });
        } 
    });
    
    (function($, win) {
        $.fn.inViewport = function(cb) {
           return this.each(function(i,el){
             function visPx(){
               var H = $(this).height(),
                   r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
               return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));  
             } visPx();
             $(win).on("resize scroll", visPx);
           });
        };
    }(jQuery, window));


    $("#home").inViewport((px) => {
        if (px) {
            $("#li-home").addClass("active");
            $("#li-about").removeClass("active");
            $("#li-project").removeClass("active");
        }
    });

    $("#about").inViewport((px) => {
        if (px) {
            $("#li-about").addClass("active");
            $("#li-home").removeClass("active");
            $("#li-project").removeClass("active");
        }
    });

    $("#project-ancor").inViewport((px) => {
        if (px) {
            $("#li-project").addClass("active");
            $("#li-home").removeClass("active");
            $("#li-about").removeClass("active");
        }
    });

    $('.trigger-open').on('click', () => {
        openNav();
    });

    $('.trigger-close').on('click', () => {
        closeNav();
    });

    $('.timeline').verticalTimeline({
        startLeft: false,
        alternate: true,
        animate: "fade",
        arrows: false
    });

    AOS.init({
        // Global settings
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      
        // Settings that can be overriden on per-element basis, by `data-aos-*` attributes:
        offset: 100, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 300, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      });
});

function openNav() {
    $(".overlay").addClass('overlay-show');
}

function closeNav() {
    $(".overlay").removeClass('overlay-show');
}