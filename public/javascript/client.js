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



console.log(louisianas = tourCollections.where({state: "Louisiana"}))
var toursView = new ToursView()


// **************************************************************************
// TOURS ALL
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
//           self.render(item)
//         })
//       },
//       error: function() {
//         console.log("Failed to get tours!");
//       }
//     });
//   },
//   render: function(item) {
//     this.$el.append("<li>" + item.title + "</li>");
//     return this;
//   }
// })


// **************************************************************************
// TOUR ALL HANDLEBARS COLLECTION
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
//       success: function( collection, response, options ) {
//         _.each(collection.toJSON(), function(item){
//           // console.log("Successfully got tour with _id: " + item.title);
//         })
//       },
//       error: function() {
//         console.log("Failed to get tours!");
//       }
//     });
//     this.listenTo(this.model, 'sync', this.render)
//   },
//   render: function() {
//     var self = this;
//     var allModels = this.model.models

//     for (var i=0; i < allModels.length; i++) {
//       var template = $("#tour-template").html();
//       var compiled = Handlebars.compile(template);
//       var html = compiled(allModels[i].attributes);
//       this.$el.append(html);
//     }

//     return this;

//   }
// })

// var toursView = new ToursView()


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
//     console.log("RNDR")
//     var self = this;
//     this.$el.html('');
//     _.each(this.model.toArray(), function(tour) {
//       self.$el.append((new TourView({model: tour})).render().$el);
//     });
//     return this;
//   }
// })

// var toursView = new ToursView();
// toursView.render()



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