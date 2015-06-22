var Tour = Backbone.Model.extend({
  idAttribute: "_id"
});

var TourCollection = Backbone.Collection.extend({
  model: Tour,
  url: "/tours/show"
})

// var UserView = Backbone.View.extend({
//   tagName: "li",
//   className: "user",
//   render: function() {
//     var template = $("#usertemplate").html();
//     var compiled = Handlebars.compile(template);
//     var html = compiled(this.model.attributes);
//     this.$el.html(html);
//     return this;
//   }
// });

// var UserCollectionView = Backbone.View.extend({
//   tagName: "ul",
//   className: "users",
//   render: function() {
//     this.collection.each(function(user) {
//       var userView new UserView({ model: user });
//       this.$el.append(userView.render().el);
//     }, this);
//     return this;
//   }
// });