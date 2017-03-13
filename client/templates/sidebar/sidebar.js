Template.sidebar.helpers({
  users : function () {
    return Meteor.users.find({_id: {$ne: Meteor.userId()}});
  },
  current: function (id) {
    if(id == active.get()){
      return "active";
    }
    else{
      return "";
    }
  },
  hasNotifs: function(sender){
    if(Notifications.find({$and: [{receiver: Meteor.userId()}, {sender: sender}]}).count() > 0){
      return true;
    }
    else{
      return false;
    }
  },
  notifs: function(sender){
    return Notifications.find({$and: [{receiver: Meteor.userId()}, {sender: sender}]});
  }
});

Template.sidebar.events({
  'click .user-list' : function (event) {
    active.set(this._id);
    $(".mysidebar").toggle();
    if(Notifications.find({$and: [{receiver: Meteor.userId()}, {sender: this.username}]}).count() > 0){
      var notifId = Notifications.find({$and: [{receiver: Meteor.userId()}, {sender: this.username}]}).fetch();
      Meteor.call("removeNotif", notifId[0]._id);
    }
  }
});
