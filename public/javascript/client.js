// **************************************************************************
// APP ROUTER
// **************************************************************************

(function() {

  window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
  };

  App.Router = Backbone.Router.extend({
    routes: {
      "city_item" : "cityRender",
      "interest_item" : "interestRender",
      // "close_to_you" : "geoRender"
    },
    cityRender: function() {
      console.log("City Render")
      console.log(tourCollection)
      $(".browse-container").html("")
      console.log(window.location.toString().split("?"))
      var selectedCity = window.location.toString().split("?")[1]
      console.log(selectedCity)

      var ToursView = Backbone.View.extend({
        model: filterCollection,
        initialize: function() {
          console.log(selectedCity)
          var filterCollection = tourCollection.where({city: selectedCity})
          console.log(filterCollection)

          var template = $("#selected-city-template").html();
          var compiled = Handlebars.compile(template);
          $(".browse-container").append("<h2 class='browse-title'>Tours Based on Chosen City</h2>")
          $(".not-index").empty()
          for (var i=0; i < filterCollection.length; i++) {
            console.log(filterCollection[i])
            var html = compiled(filterCollection[i].attributes);
            $(".browse-container").append(html)
          }
        },
      })

      var toursView = new ToursView();
      var individualTourView = new IndividualTourView();
    },
    interestRender: function() {
      console.log("Interest Render")
      console.log(tourCollection)
      console.log(filterCollection)
      $(".browse-container").html("")
      var selectedInterest = window.location.toString().split("?")[1]
      console.log(selectedInterest)

      var ToursView = Backbone.View.extend({
        model: filterCollection,
        initialize: function() {
          console.log(selectedInterest)
          var filterCollection = tourCollection.where({tag: selectedInterest})
          console.log(filterCollection)

          var template = $("#selected-city-template").html();
          var compiled = Handlebars.compile(template);
          $(".browse-container").append("<h2 class='browse-title'>Tours Based on Chosen Interest</h2>")
          $(".not-index").empty()
          for (var i=0; i < filterCollection.length; i++) {
            console.log(filterCollection[i])
            var html = compiled(filterCollection[i].attributes);
            $(".browse-container").append(html)
          }
        },
      })

      var toursView = new ToursView();
      var individualTourView = new IndividualTourView();
    },
    // geoRender : function () {
    //   setTimeout(function() {
    //     geoTourCollection.fetch()
    //     console.log("Geo Render")
    //     console.log(geoTourCollection)
    //   }, 5000)

    //   $(".browse-container").html("")

    //   var ToursView = Backbone.View.extend({
    //     model: filterCollection,
    //     initialize: function() {
    //       var filterCollection = tourCollection
    //     }
    //   })
    // },

    // var toursView = new ToursView();
    // var individualTourView = new IndividualTourView();
  })

  new App.Router;
  Backbone.history.start();

})();

// // **************************************************************************
// // TOUR ALL HANDLEBARS MODEL
// // **************************************************************************


// var Tour = Backbone.Model.extend({
//   idAttribute: "_id"
// });

// var TourCollection = Backbone.Collection.extend({
//   url: "/tours/show"
// })

// var tourCollections = new TourCollection()

// var TourView = Backbone.View.extend({
//   model: new Tour(),
//   tagName: "div",
//   render: function() {
//     var template = $("#tour-template").html();
//     var compiled = Handlebars.compile(template);
//     var html = compiled(this.model.attributes);
//     this.$el.html(html);
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
//       var tourView = new TourView({model: allModels[i]})
//       this.$el.append(tourView.render().el)
//     };
//     return this;
//   }
// })

// var toursView = new ToursView()


// // **************************************************************************
// // SEARCH BY CITY
// // **************************************************************************


// var searchCollections = new TourCollection()

// var SearchView = Backbone.View.extend({
//   el: ".browse-container",
//   model: searchCollections,
//   events: {
//     "submit #browse-search-form" : "createSearch",
//   },
//   initialize: function() {
//     console.log("ALSDKFJGAFKGJDAFKGJ")
//     // this.collection = searchCollections;
//   },

//   createSearch: function(event) {
//     console.log("INSIDE createSearch")
//     event.preventDefault();
//     var searchInput = $(".browse-search-input").val();
//     var correspondingList = tourCollections.where({ city: searchInput })
//     console.log(correspondingList)
//     searchCollections.reset(correspondingList)
//     console.log("break")
//     console.log(searchCollections)
//     this.render()
//   },

//   render: function() {
//     var self = this;
//     var allModels = searchCollections
//     $(".browse-container").empty()

//     for (var i=0; i < allModels.length; i++) {
//       var template = $("#search-result-template").html();
//       var compiled = Handlebars.compile(template);
//       var html = compiled(allModels.models[i].attributes);
//       $(".browse-container").append(html);
//     };
//     return this;
//   }

// })

// var searchView = new SearchView()

// **************************************************************************
// TOUR/:ID PAGE
// **************************************************************************

var tourMongoId = window.location.pathname.slice(15)

var IndividualTour = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: "/tours"
})

var individualTour = new IndividualTour({
  _id: tourMongoId
})

individualTour.fetch()

console.log(individualTour)

var IndividualTourView = Backbone.View.extend({
  model: individualTour,
  el: "#individual-tour-display",
  initialize: function() {
    this.model.fetch({
      success: function(response) {
        console.log(response)
      },
      error: function() {
        console.log("Failed")
      }
    })
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function() {
    var template = $("#individual-tour-template").html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    $("#individual-tour-display").html(html);
  }
})

setTimeout(function() {
  var individualTourView = new IndividualTourView()
}, 500)


// **************************************************************************
// USER/:ID PAGE
// **************************************************************************

var IndividualUser = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: "/users"
})

var userMongoId = window.location.pathname.slice(12)

var individualUser = new IndividualUser({
  _id: userMongoId
})

var IndividualUserView = Backbone.View.extend({
  model: individualUser,
  el: "#individual-user-display",
  initialize: function() {
    this.model.fetch({
      success: function(response) {
        console.log("Successful")
      },
      error: function() {
        console.log("Failed to get user")
      }
    })
    this.listenTo(this.model, 'sync', this.render)
  },
    render: function() {
    var template = $("#individual-user-template").html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    $("#individual-user-display").html(html)

    var userTourTemplate = $("#individual-user-authored-template").html();
    var compiledTours = Handlebars.compile(userTourTemplate);

    for (var i=0; i < this.model.attributes.authored_tours.length; i++) {
      var loopedAuthoredList = compiledTours(this.model.attributes.authored_tours[i])
      $("#user-authored-list").append(loopedAuthoredList)
    }
  }
})

var individualUserView = new IndividualUserView()


// **************************************************************************
// DASHBOARD
// **************************************************************************

var CurrentUser = Backbone.Model.extend({
  idAttribute: "_id",
  url: "/dashboard"
})

var currentUser = new CurrentUser()

var CurrentUserView = Backbone.View.extend({
  model: currentUser,
  el: "#current-user-information",
  initialize: function() {
    this.model.fetch({
      success: function(response) {
        console.log("response")
      },
      error: function() {
        console.log("Failed to get user")
      }
    })
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function() {
    var template = $("#individual-user-dashboard-template").html();
    window.sessionStorage["userID"] = this.model.attributes[0].user._id
    console.log(this.model.attributes[0].user)
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes[0].user);
    $("#individual-user-dashboard-display").html(html)
    var recommendedTourTemplate = $("#recommended-tour-template").html();
    var compiledTours = Handlebars.compile(recommendedTourTemplate);
    for (var i=0; i < this.model.attributes[1].recommended_tours.length; i++) {
      var recommendedToursList = compiledTours( this.model.attributes[1].recommended_tours[i])
      $("#recommended-" + i ).html(recommendedToursList)
    }

    var dashboardWishlistTourTemplate = $("#dashboard-wishlist-tour-template").html();
    var compiledWishlistTours = Handlebars.compile(dashboardWishlistTourTemplate);
    for (var i=0; i < this.model.attributes[0].user.wishlist.length; i++) {
      var dashboardWishlist = compiledWishlistTours( this.model.attributes[0].user.wishlist[i])
      console.log(this.model.attributes[0].user.wishlist[i])
      $("#dashboard-wishlist").append(dashboardWishlist)
    }
  }
})

var currentUserView = new CurrentUserView()


// **************************************************************************
// LIST CITIES
// **************************************************************************

var City = Backbone.Model.extend({
  idAttribute: "_id"
})

var CityCollection = Backbone.Collection.extend({
  url: "/browse"
})

var citiesCollection = new CityCollection()

var CityView = Backbone.View.extend({
  model: new City(),
  tagName: "div",
  render: function() {
    var template = $("#city-template").html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model);
    $(".list-of-cities").append(html)
  }
})

var CitiesView = Backbone.View.extend({
  model: citiesCollection,
  el: $(".list-of-cities"),
  initialize: function() {
    var self = this;
    this.model.fetch({
      success: function(response) {
        console.log(response)
      },
      error: function() {
        console.log("Failed to get categories!");
      }
    });
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function() {
    var self = this;
    setTimeout(function() {

    var locations = self.model.models[0].attributes

    _.each(locations, function(loc) {
      var locationView = new CityView({model: loc})
      locationView.render()
    })
    return self;

    }, 200)

  }
})

var citiesView = new CitiesView()

// **************************************************************************
// LIST INTERESTS
// **************************************************************************

var Interest = Backbone.Model.extend({
  idAttribute: "_id"
})

var InterestCollection = Backbone.Collection.extend({
  url: "/browse"
})

var interestsCollection = new InterestCollection()

var InterestView = Backbone.View.extend({
  model: new Interest(),
  tagName: "div",
  render: function() {
    var template = $("#interest-template").html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model);
    $(".browse-interests").append(html)
  }
})

var InterestsView = Backbone.View.extend({
  model: interestsCollection,
  el: $(".browse-interests"),
  initialize: function() {
    var self = this;
    this.model.fetch({
      success: function(response) {
        console.log(response)
      },
      error: function() {
        console.log("Failed to get categories!");
      }
    });
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function() {
    var self = this;
    setTimeout(function() {

      var interests = self.model.models[1].attributes

      _.each(interests, function(inter) {
        console.log(inter)
        var interestView = new InterestView({model: inter})
        interestView.render()
      })
      return self;
    }, 200)
  }
})

var interestsView = new InterestsView()




// **************************************************************************
// LIST ALL TOURS
// **************************************************************************

var Tour = Backbone.Model.extend({
  idAttribute: "_id"
});

var TourCollection = Backbone.Collection.extend({
  url: "/tours/show"
})

// var GeoTourCollection = Backbone.Collection.extend({
//   url: "/tours/"
// })

var tourCollection = new TourCollection()

// var geoTourCollection = new GeoTourCollection()

tourCollection.fetch()
// geoTourCollection.fetch()

var filterCollection = new TourCollection()

var individualTourView = new IndividualTourView()