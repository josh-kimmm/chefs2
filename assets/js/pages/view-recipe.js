
(function($){
    $(document).ready(function() {
        $('form').on('submit', function() {
            if ($('input[name=rating]:checked').val() > 5 || $('input[name=rating]:checked').val() < 1 || $('input[name=review]').val() == '') {
                alert('You must choose a rating and enter a review.');
                return false;
            } else {
                return true;
            }
        });
    });
})(jQuery);