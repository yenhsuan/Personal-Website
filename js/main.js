import $ from 'jquery'
import '../css/normalize.css'
import '../css/skeleton.css'
import '../sass/main.scss'

const jQuery = $;

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
    })

    $('.trigger-close').on('click', () => {
        closeNav();
    })
});

function openNav() {
    $(".overlay").addClass('overlay-show');
}

function closeNav() {
    $(".overlay").removeClass('overlay-show');
}