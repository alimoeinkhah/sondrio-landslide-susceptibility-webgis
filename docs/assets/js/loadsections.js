$(document).ready(function() {
    $('nav ul li a').on('click', function(e) {
        e.preventDefault();
        var section = $(this).data('section');
        $('#content-placeholder').load(section + '.html');
    });

    // Load the initial section (e.g., intro)
    $('#content-placeholder').load('intro.html');
});