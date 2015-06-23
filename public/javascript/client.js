var Tour = Backbone.Model.extend({
  idAttribute: "_id"
});

var TourCollection = Backbone.Collection.extend({
  url: "/tours/show"
})

var tourCollections = new TourCollection()

var TourView = Backbone.View.extend({
  model: new Tour(),
  tagName: "div",
  render: function() {
    var template = $("#tour-template").html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    this.$el.html(html);
    return this;
  }
})

var ToursView = Backbone.View.extend({
  model: tourCollections,
  el: $('.tours-list'),
  initialize: function() {
    var self = this;
    this.model.fetch({
      success: function( collection, response, options ) {
        _.each(collection.toJSON(), function(item){
          // console.log("Successfully got tour with _id: " + item.title);
        })
      },
      error: function() {
        console.log("Failed to get tours!");
      }
    });
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function() {
    var self = this;
    var allModels = this.model.models
    for (var i=0; i < allModels.length; i++) {
      var tourView = new TourView({model: allModels[i]})
      this.$el.append(tourView.render().el)
    };
    return this;
  }
})

var toursView = new ToursView()
