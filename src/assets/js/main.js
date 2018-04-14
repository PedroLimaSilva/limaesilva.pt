//Progress bars
function fill_progress(el, progress) {
    var elem = $(el)[0];
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= progress) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            var label_query = el + "-label";
            $(label_query).html(width * 1 + '%');
        }
    }
}

function slide(id){
    $(id).addClass('slided');
}

function openCorners(){
    $("#splash3").addClass('loaded');
    $("#splash2").addClass('loaded');
    $("#splash1").addClass('loaded');
    $("#corner3").addClass('loaded');
    $("#corner2").addClass('loaded');
    $("#corner1").addClass('loaded');
    $("#corner").addClass('loaded');
    /*
    setTimeout(()=>{
      $("#splash3").remove();
      $("#splash2").remove();
      $("#splash1").remove();
    }, 5000)
    */
}

var options = [
    { selector: '#about', offset: 0, callback: function(){slide('#about');} },
    { selector: '#interests', offset: 0, callback: function(){slide('#interests');} },
    { selector: '.timeline', offset: 100, callback: function(){slide('#timeline_1');} },
    { selector: '.timeline', offset: 400, callback: function(){slide('#timeline_2');} },
    { selector: '.timeline', offset: 700, callback: function(){slide('#timeline_3');} },
    { selector: '.timeline', offset: 1000, callback: function(){slide('#timeline_4');} },
    { selector: '.timeline', offset: 1300, callback: function(){slide('#timeline_5');} },
    { selector: '.timeline', offset: 1600, callback: function(){slide('#timeline_6');} },
    { selector: '.timeline', offset: 1900, callback: function(){slide('#timeline_7');} },
    {
      selector: '#skills_design',
      offset: 0,
      callback: function(){
        slide('#skills_design');
        setTimeout(function(){
          fill_progress('#photoshop', 70);
          fill_progress('#illustrator', 75);
          fill_progress('#c4d', 60);
        }, 500);
      }
    },
    {
      selector: '#skills_dev',
      offset: 0,
      callback: function(){
        slide('#skills_dev');
        setTimeout(function(){
          fill_progress('#angular2', 95);
          fill_progress('#java', 80);
          fill_progress('#c_programming', 70);
        }, 500);
      }
    },
    {
      selector: '#skills_forlang',
      offset: 0,
      callback: function(){
        slide('#skills_forlang');
        setTimeout(function(){
          fill_progress('#portuguese', 100);
          fill_progress('#english', 100);
        }, 500);
      }
    },
    {
      selector: '#skills_soft',
      offset: 0,
      callback: function(){
        slide('#skills_soft');
        setTimeout(function(){
          fill_progress('#teamwork', 90);
          fill_progress('#responsability', 95);
          fill_progress('#learning', 100);
        }, 500);
      }
    }
  ];
Materialize.scrollFire(options);

$("#nav-mobile li").click(function() {
  $('.button-collapse').sideNav('hide');
  $('#sidenav-overlay').remove();
  console.log($('#sidenav-overlay'));
});

$(document).ready(function(){
  setTimeout(()=>{
    openCorners();
  },1000);
  setTimeout(()=>{
    $('.profile-card').addClass('rotated');
  },2000);
  $('.scrollspy').scrollSpy();
});
