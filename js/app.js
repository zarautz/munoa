App = Ember.Application.create({
    ApplicationController: Ember.Controller.extend({
        title: 'Zarautz',
        currentPathDidChange: function() {
            this.set('title', '/' + this.get('currentPath'));
        }.observes('currentPath')
    })
});

App.Store = DS.Store.extend({
    revision: 12,
    adapter: DS.FixtureAdapter
});

App.Test = DS.Model.extend({
    'temperature': DS.attr('string')
});

App.Event = DS.Model.extend({
    'title': DS.attr('string')
});

App.Test.FIXTURES = [
    {
        id: 1,
        temperature: "17"
    }
];

App.Event.FIXTURES = [
    {
        id: 1,
        title: "First event"
    },
    {
        id: 2,
        title: "Second event"
    }
];

App.Router.map(function() {
    this.resource('events', function() {
        this.resource('event', { path: ':event_id' }); 
    });
    this.resource('places');
    this.resource('weather');
    this.resource('sea');
    this.resource('health');
    this.resource('settings', function() {
        this.resource('about'); 
    });
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return App.Test.find(1);
    }
});

App.EventsRoute = Ember.Route.extend({
    model: function() {
        return App.Event.find();
    }
});

App.ApplicationView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            var $body = $('body')
              , activeMenuClass = 'active-menu'
            ;
            
            // If menu is open, close it with application window
            $body.on('touchstart click', '[role="main"]', function(event) {
                if ($body.hasClass(activeMenuClass)) {
                    event.preventDefault();
                    $body.toggleClass(activeMenuClass);
                }
            });
            
            // No scroll bar when "scrolling" in header
            $body.on('touchmove', 'header', function(event) {
                event.preventDefault();
            });
            
            // Watch for clicks on menu trigger or menu items
            $body.on('touchstart click', '[data-menu-trigger]', function(event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                $body.toggleClass(activeMenuClass);
            });
            
            // Watch for clicks on menu trigger or menu items
            $body.on('click', '[role="menu"] a', function(event) {
                $body.toggleClass(activeMenuClass);
            });
            
            // PAGINATION!!
            $body.on('click', '[data-detail] a', function() {
                var $flex = $(this).closest('[data-flex]')
                  , currentPage = $(this).closest('[data-page]').data('page')
                ;
                
                $flex.toggleClass('on-' + (currentPage + 1)).removeClass('on-' + currentPage);
                event.preventDefault();
            });
            
            $body.on('touchstart click', '[data-back]', function() {
                var $flex = $(this).closest('[data-flex]')
                  , currentPage = $(this).closest('[data-page]').data('page')
                ;
                
                $flex.toggleClass('on-' + (currentPage - 1)).removeClass('on-' + currentPage);
            });
            
            console.log('ILLARRA: Navigation events attached');
        });
    }
});
