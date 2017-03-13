Meteor.publish("users", function(){
  return Meteor.users.find();
});

Meteor.publish("notifications", function(userId){
  // return Notifications.find({
  //                             $and: [
  //                               {receiver: userId}, {read: false}
  //                             ]
  //                           });
  return Notifications.find();
});


Meteor.publish("thisConvo", function(peerId, userId){
  return Messages.find({
                        $or: [
                          {$and:[{receiver: peerId},{sender: userId}]}, {$and:[{receiver: userId},{sender: peerId}]}
                        ]
                      });
});
