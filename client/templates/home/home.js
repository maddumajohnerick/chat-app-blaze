Template.home.helpers({
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
