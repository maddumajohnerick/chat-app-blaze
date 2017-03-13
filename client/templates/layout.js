Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

active = new ReactiveVar("");

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

emoticons = {
  ":aha" : " <img src='/aha.png' height='30' width='30'> ",
  ":angel" : " <img src='/angel.png' height='30' width='30'> ",
  ":angry" : " <img src='/angry.png' height='30' width='30'> ",
  ":balloon" : " <img src='/balloon.png' height='30' width='30'> ",
  ":bomb" : " <img src='/bomb.png' height='30' width='30'> ",
  ":boo" : " <img src='/boo.png' height='30' width='30'> ",
  ":broken" : " <img src='/broken.png' height='30' width='30'> ",
  ":bye" : " <img src='/bye.png' height='30' width='30'> ",
  ":cake" : " <img src='/cake.png' height='30' width='30'> ",
  ":cat" : " <img src='/cat.png' height='30' width='30'> ",
  ":clock" : " <img src='/clock.png' height='30' width='30'> ",
  ":clown" : " <img src='/clown.png' height='30' width='30'> ",
  ":cold" : " <img src='/cold.png' height='30' width='30'> ",
  ":confused" : " <img src='/confused.png' height='30' width='30'> ",
  ":cool" : " <img src='/cool.png' height='30' width='30'> ",
  ":cry" : " <img src='/cry.png' height='30' width='30'> ",
  ":cry2" : " <img src='/cry2.png' height='30' width='30'> ",
  ":dead" : " <img src='/dead.png' height='30' width='30'> ",
  ":devil" : " <img src='/devil.png' height='30' width='30'> ",
  ":dizzy" : " <img src='/dizzy.png' height='30' width='30'> ",
  ":dog" : " <img src='/dog.png' height='30' width='30'> ",
  ":drink" : " <img src='/drink.png' height='30' width='30'> ",
  ":drool" : " <img src='/drool.png' height='30' width='30'> ",
  ":gift" : " <img src='/gift.png' height='30' width='30'> ",
  ":girl" : " <img src='/girl.png' height='30' width='30'> ",
  ":grin" : " <img src='/grin.png' height='30' width='30'> ",
  ":heart" : " <img src='/heart.png' height='30' width='30'> ",
  ":hug" : " <img src='/hug.png' height='30' width='30'> ",
  ":kiss" : " <img src='/kiss.png' height='30' width='30'> ",
  ":lol" : " <img src='/lol.png' height='30' width='30'> ",
  ":loser" : " <img src='/loser.png' height='30' width='30'> ",
  ":love" : " <img src='/love.png' height='30' width='30'> ",
  ":mail" : " <img src='/mail.png' height='30' width='30'> ",
  ":mute" : " <img src='/mute.png' height='30' width='30'> ",
  ":nerd" : " <img src='/nerd.png' height='30' width='30'> ",
  ":night" : " <img src='/night.png' height='30' width='30'> ",
  ":ninja" : " <img src='/ninja.png' height='30' width='30'> ",
  ":party" : " <img src='/party.png' height='30' width='30'> ",
  ":phone" : " <img src='/phone.png' height='30' width='30'> ",
  ":pig" : " <img src='/pig.png' height='30' width='30'> ",
  ":poker" : " <img src='/poker.png' height='30' width='30'> ",
  ":poo" : " <img src='/poo.png' height='30' width='30'> ",
  ":rain" : " <img src='/rain.png' height='30' width='30'> ",
  ":rainbow" : " <img src='/rainbow.png' height='30' width='30'> ",
  ":rose" : " <img src='/rose.png' height='30' width='30'> ",
  ":sad" : " <img src='/sad.png' height='30' width='30'> ",
  ":scared" : " <img src='/scared.png' height='30' width='30'> ",
  ":sick" : " <img src='/sick.png' height='30' width='30'> ",
  ":sick2" : " <img src='/sick2.png' height='30' width='30'> ",
  ":silly" : " <img src='/silly.png' height='30' width='30'> ",
  ":sleep" : " <img src='/sleep.png' height='30' width='30'> ",
  ":sleep2" : " <img src='/sleep2.png' height='30' width='30'> ",
  ":sleepy" : " <img src='/sleepy.png' height='30' width='30'> ",
  ":sleepy2" : " <img src='/sleepy2.png' height='30' width='30'> ",
  ":smile" : " <img src='/smile.png' height='30' width='30'> ",
  ":smoke" : " <img src='/smoke.png' height='30' width='30'> ",
  ":smug" : " <img src='/smug.png' height='30' width='30'> ",
  ":sshh" : " <img src='/sshh.png' height='30' width='30'> ",
  ":star" : " <img src='/star.png' height='30' width='30'> ",
  ":sweat" : " <img src='/sweat.png' height='30' width='30'> ",
  ":think" : " <img src='/think.png' height='30' width='30'> ",
  ":bleh" : " <img src='/bleh.png' height='30' width='30'> ",
  ":music" : " <img src='/music.png' height='30' width='30'> ",
  ":vomit" : " <img src='/vomit.png' height='30' width='30'> ",
  ":wew" : " <img src='/wew.png' height='30' width='30'> ",
  ":win" : " <img src='/win.png' height='30' width='30'> ",
  ":wink" : " <img src='/wink.png' height='30' width='30'> ",
  ":yawn" : " <img src='/yawn.png' height='30' width='30'> ",
  ":yawn2" : " <img src='/yawn2.png' height='30' width='30'> ",
  ":zombie" : " <img src='/zombie.png' height='30' width='30'> "
}


Template.layout.helpers({
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

Template.layout.events({
  'click .toggle-users' : function (event) {
    $(".mysidebar").toggle();
  }
});
