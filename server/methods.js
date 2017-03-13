Meteor.methods({
  'sendMessage' : function(receiver, sender, message){
    Messages.insert({
      receiver: receiver,
      sender: sender,
      message: message,
      timestamp: moment().format('MMM D YYYY, h:mm A')
    });
  }
  ,
  'notify' : function(receiver, username){
    if(Notifications.find({
                            $and: [
                              {receiver: receiver}, {sender: username}
                            ]
                          }).count() == 0){
                            Notifications.insert({
                              receiver: receiver,
                              sender: username,
                              unread: 1
                            });
                          }
                          else{
                            Notifications.update({
                                                  $and: [
                                                    {receiver: receiver}, {sender: username}
                                                  ]
                                                }, {
                                                  $inc: { unread: 1 }
                                                });
                          }

  },
  'removeNotif' : function(notifId){
    Notifications.remove(notifId);
  }
});
