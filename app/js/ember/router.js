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

App.EventsRoute = Ember.Route.extend({
    model: function() {
        return App.Event.find();
    }
});
