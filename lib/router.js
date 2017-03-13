Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  waitOn: function() {
    // console.log(active.get());
    return [
      Meteor.subscribe("users"),
      Meteor.subscribe("notifications", Meteor.userId())
    ]
  }
});

Router.route("/", {
  template: "home",
  waitOn: function() {
    active.set("");
  }
});

Router.route("/chat/:_id", {
  name: "chatbox",
  template: "chatbox",
  waitOn: function() {
    active.set(this.params._id);
    return [
      Meteor.subscribe("thisConvo", this.params._id, Meteor.userId()),
    ];
  }
});

var checkLogin = function() {
  if (!Meteor.userId()) {
    Router.go("/");
  }
  else {
    this.next();
  }
}

Router.onBeforeAction(checkLogin, {only: "chatbox"});
