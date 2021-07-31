var $document = $(document),
$element = $('#main-nav'),
className = 'box-shadow';

$document.scroll(function() {
    if ($document.scrollTop() >= 50) {
    // Change 50 to the value you require
    // for the event to trigger
        $element.addClass(className);
    } else {
        $element.removeClass(className);
    }
});

$(".nav .nav-link").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
});