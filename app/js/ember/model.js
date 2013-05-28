App.Store = DS.Store.extend({
    revision: 12,
    adapter: DS.RESTAdapter.extend({
        url: '../data',
        buildURL: function(record, suffix) {
            return this._super(record, suffix) + '.json'; // Adds JSON extension
        }
    })
});

App.Event = DS.Model.extend({
    'title': DS.attr('string')
});
