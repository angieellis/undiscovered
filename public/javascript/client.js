// **************************************************************************
// TOUR ALL HANDLEBARS MODEL
// **************************************************************************

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


// **************************************************************************
// SEARCH BY CITY
// **************************************************************************


var searchCollections = new TourCollection()

var SearchView = Backbone.View.extend({
  model: searchCollections,
  events: {
    "submit #browse-search-form" : "createSearch"
  },
  el: ".browse-wrapper",
  createSearch: function(event) {
    event.preventDefault();
    var searchInput = $(".browse-search-input").val();
    var correspondingList = tourCollections.where({ city: searchInput })
    console.log(correspondingList)
    searchCollections.reset(correspondingList)
    console.log("break")
    console.log(searchCollections)
    this.render()
  },
  render: function() {
    var self = this;
    var allModels = searchCollections
    $(".browse-container").empty()

    for (var i=0; i < allModels.length; i++) {

      var template = $("#search-result-template").html();
      var compiled = Handlebars.compile(template);
      var html = compiled(allModels.models[i].attributes);
      $(".browse-container").append(html);
    };
    return this;
  }

})

var searchView = new SearchView()
