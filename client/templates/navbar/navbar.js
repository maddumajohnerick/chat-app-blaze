Template.navbar.helpers({
  notifscount : function () {
    return Notifications.find().count();
  },
  notifs : function () {
    return Notifications.find();
  },
  getReciver : function () {
    return Meteor.users.findOne({_id: active.get()}).username;
  }
});

Template.navbar.events({
  'click .show-notifs' : function (event) {
    event.preventDefault();

    Meteor.call("removeNotif", this._id);
  }
});
