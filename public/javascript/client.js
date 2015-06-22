var Tour = Backbone.Model.extend({
  idAttribute: "_id"
});

var TourCollection = Backbone.Collection.extend({
  url: "/tours/show"
})

var tourCollections = new TourCollection()

var TourView = Backbone.View.extend({
  model: new Tour(),
  tagName: "li",
  initialize: function() {
    this.template = _.template($('.tours-list-template').html());

    console.log("***************************************")
    console.log("initialized TourView")
    console.log("***************************************")

  },
  render: function() {

    console.log("***************************************")
    console.log(this)
    console.log("***************************************")

    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
})

var ToursView = Backbone.View.extend({
  model: tourCollections,
  el: $('.tours-list'),
  initialize: function() {
    var self = this;
    this.model.fetch({
      success: function(response) {
        _.each(response.toJSON(), function(item){
          // console.log("Successfully got tour with _id: " + item.title);
        })
      },
      error: function() {
        console.log("Failed to get tours!");
      }
    });
  },
  render: function() {
    console.log("***************************************")
    console.log("render")
    console.log("***************************************")

    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(tour) {
      self.$el.append((new TourView({model: tour})).render().$el);
    });
    return this;
  }
})

var toursView = new ToursView();


$(document).ready(function() {
})



// **************************************************************************
// MICHAEL CHENG
// **************************************************************************

// var Tour = Backbone.Model.extend({
//   idAttribute: "_id"
// });

// var TourCollection = Backbone.Collection.extend({
//   url: "/tours/show"
// })

// var tourCollections = new TourCollection()

// var TourView = Backbone.View.extend({
//   model: new Tour(),
//   tagName: "li",
//   initialize: function() {
//     this.template = _.template($('.tours-list-template').html());
//   },
//   render: function() {
//     this.$el.html(this.template(this.model.toJSON()));
//     return this;
//   }
// })

// var ToursView = Backbone.View.extend({
//   model: tourCollections,
//   el: $('.tours-list'),
//   initialize: function() {
//     var self = this;
//     this.model.fetch({
//       success: function(response) {
//         _.each(response.toJSON(), function(item){
//           console.log("Successfully got tour with _id: " + item.title);
//         })
//       },
//       error: function() {
//         console.log("Failed to get tours!");
//       }
//     });
//   },
//   render: function() {
//     var self = this;
//     this.$el.html('');
//     _.each(this.model.toArray(), function(tour) {
//       self.$el.append((new TourView({model: tour})).render().$el);
//     });
//     return this;
//   }
// })

// var toursView = new ToursView();




// **************************************************************************
// JAVASCRIPT PLAYGROUND
// **************************************************************************

// var TourView = Backbone.View.extend({
//   tagName: "li",
//   className: "tour",
//   render: function() {
//     var template = $("#tourtemplate").html();
//     var compiled = Handlebars.compile(template);
//     var html = compiled(this.model.attributes);
//     this.$el.html(html);
//     return this;
//   }
// });

// var TourCollectionView = Backbone.View.extend({
//   tagName: "ul",
//   className: "tours",
//   render: function() {
//     this.collection.each(function(tour) {
//       var tourView new TourView({ model: tour });
//       this.$el.append(tourView.render().el);
//     }, this);
//     return this;
//   }
// });