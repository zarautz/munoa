var $body = $('body')
  , activeMenuClass = 'active-menu'
;

//
// Events
//

$body

    // Watch for clicks on menu trigger
    .on('touchstart click', 'main [data-menu-trigger]', function(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        $body.toggleClass(activeMenuClass);
    })
    
    // If menu is open, close it with application window
    .on('touchstart click', 'main', function(event) {
        if ($body.hasClass(activeMenuClass)) {
            event.preventDefault();
            $body.toggleClass(activeMenuClass);
        }
    })
    
    // Watch for clicks on menu items
    .on('click', 'nav a', function() {
        $body.toggleClass(activeMenuClass);
    })
    
    // Push view navigation (IDEAL)
    /*.on('tap click', 'main [data-push-view]', function() {
        // Push view navigation
        var $section = $(this).closest('section')
          , currentPage = $(this).closest('[data-page]').data('page')
          , targetPage  = ($(this).data('push-view') == 'detail') ? (currentPage + 1) : (currentPage - 1) ;
        ;
        
        $section.addClass('on-' + targetPage).removeClass('on-' + currentPage);
    })*/
    
    // Push view navigation (TAP DETECTION PROBLEMS)
    .on('click', 'main [data-push-view=detail]', function() {
        // Push view navigation
        var $section = $(this).closest('section')
          , currentPage = $(this).closest('[data-page]').data('page')
          , targetPage  = currentPage + 1;
        ;
        
        $section.addClass('on-' + targetPage).removeClass('on-' + currentPage);
    })
    .on('touchstart click', 'main [data-push-view=previous]', function() {
        // Push view navigation
        var $section = $(this).closest('section')
          , currentPage = $(this).closest('[data-page]').data('page')
          , targetPage  = currentPage - 1;
        ;
        
        $section.addClass('on-' + targetPage).removeClass('on-' + currentPage);
    })
;

// TODO: add this: https://github.com/phonegap/phonegap/wiki/Back-Button-Usage

console.log('ILLARRA: Navigation events attached');
