Template.addSong.events({
  'click #play': function () {
    var v = document.getElementsByTagName("audio")[0];
    v.play();
  },
  //take in template too?
  'submit #barCount': function (event) {
    event.preventDefault();
    barCount = event.target.barCount.value;
    barCountArray = [];
    for (var i = 0; i < barCount; i++) {
      barCountArray.push(i+1);
    }
    Session.set("barCountArray", barCountArray);
  }
});

Template.addSong.helpers({
  barCountArray: function () {
    return Session.get("barCountArray");
  }
});

Template.addSong.rendered = function () {
  var v = document.getElementsByTagName("audio")[0];
  v.addEventListener("timeupdate", function() {
    if (v.currentTime > loopEndTime) {
      v.currentTime = loopStartTime;
      v.play();
    }
  });
}
