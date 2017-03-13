Template.chatbox.onRendered(function () {
  var objDiv = document.getElementById("chat-content");
  objDiv.scrollTop = objDiv.scrollHeight;
  setInterval(function(){
    Template.chatbox.uihooks({
      '.message': {
        container: '#chat-content',
        insert: function(node, next, tpl) {
          // console.log('Inserting an item.');
          $(node).insertBefore(next);
          var objDiv = document.getElementById("chat-content");
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      }
    });
  },1000);
});

Template.chatbox.helpers({
  messages : function () {
    // return Messages.find();
    return Messages.find({
                          $or: [
                            {$and:[{receiver: active.get()},{sender: Meteor.userId()}]}, {$and:[{receiver: Meteor.userId()},{sender: active.get()}]}
                          ]
                        });
  },
  yourMessage : function (id) {
    if(Meteor.userId() == id){
      return true;
    }
  },
  parseMessage : function (message) {
    // return message.replace(/[:\-)D]+/g, " <img src='/smile.png' height='30' width='30'> ");
    return message.replace(/[>:/\-|)a-zA-Z0-9]+/g, function (match) {
      return  emoticons[match] ? emoticons[match] : match;
    });
  },
  emotes : function () {
    displayEmoticons = [];

    for (var field in emoticons) {
      displayEmoticons.push({
                              command: field,
                              pic: emoticons[field]
                            });
    }

    return displayEmoticons;
  }
});

Template.chatbox.events({
  'submit .send-message' : function (event) {
    event.preventDefault();

    var receiver = active.get();
    var sender = Meteor.userId();
    var message = event.target.message.value;

    if(message.trim().length != 0){
      Meteor.call("sendMessage", receiver, sender, message);

      Meteor.call("notify", receiver, Meteor.user().username);
    }

    event.target.message.value = "";
  },
  'click .show-emotes' : function (event) {
    $(".emotes-box").toggle();
  },
  'click .img-click' : function (event) {
    // alert(this.command);
    var message = $("#message").val() +" "+ this.command +" ";
    $("#message").val(message);
  }
});
