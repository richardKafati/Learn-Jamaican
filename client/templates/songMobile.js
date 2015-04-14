//***NOTE*** Songs property barNumber is not currently being used and can prob be deleted.

//Shows the user the bar numbers being looped in the inputs of the form.
Session.setDefault("startBar", 1);
Session.setDefault("endBar", 2);
Session.setDefault("hafiOpened", false);
Session.setDefault("brightOpened", false);
Session.setDefault("looper", false);

Template.songMobile.helpers({
  //allows the lyrics to be iterated to the user from the song document
  song: function () {
    return Songs.find({name: {$in: ["Get More"]}});
  },
  //shows the user the start bar number
  startBar: function () {
    return Session.get("startBar");
  },
  //shows the user the end bar number
  endBar: function () {
    return Session.get("endBar");
  },
  hafiOpened: function () {
    return Session.get("hafiOpened");
  },
  brightOpened: function () {
    return Session.get("brightOpened");
  }
});

Template.songMobile.events({
  //import template too?
  //allows a user to configure the loop's start and end bar.
  'submit #barControls' : function (event) {
    event.preventDefault();
    startBar = event.target.startBar.value;
    endBar = event.target.endBar.value;
    //shows the user the bar numbers in the input fields
    Session.set("startBar", startBar);
    Session.set("endBar", endBar);
    //gets the start and end times for the loop selection.
    loopStartTime = Songs.find({name: "Get More"}).fetch()[0].lyrics[startBar - 1].startTime;
    loopEndTime = Songs.find({name: "Get More"}).fetch()[0].lyrics[endBar - 1].endTime;
    //set the loop start and stop time in the session.
    Session.set("loopStartTime", loopStartTime);
    Session.set("loopStartTime", loopEndTime);
    //sets the current time to the start of loop just submitted.
    var v = document.getElementsByTagName("audio")[0];
    v.currentTime = loopStartTime
    v.play();
  },

  'click #hafi': function () {
    event.preventDefault();
    opened = Session.get("hafiOpened")
    Session.set("hafiOpened", !opened);
  },

  'click #bright': function () {
    event.preventDefault();
    opened = Session.get("brightOpened")
    Session.set("brightOpened", !opened);
  },

  'click #looper': function (event) {
    if (event.target.classList[2] === 'button-stable') {
      $( "#looper" ).removeClass("button-stable").addClass("button-balanced");
    }
    else {
      $( "#looper" ).removeClass("button-balanced").addClass("button-stable");
    }
  },

  'click #playButton': function (event) {
    if ($( "#play" ).hasClass("ion-play")) {
      $( "#play" ).removeClass("ion-play").addClass("ion-pause");
    }
    else {
      $( "#play" ).removeClass("ion-pause").addClass("ion-play");
    }
  },

  'click .lyric': function (event) {
    var v = document.getElementsByTagName("audio")[0];
    if ($( "#looper" ).hasClass("button-stable")) {
      var playHead = this.startTime
      v.currentTime = playHead;
      console.log(v.currentTime);
      //$( event.target.classList[0] + ".lyric" ).hasClass("button-stable")
    }

  }
});

Template.song.rendered = function () {
  var v = document.getElementsByTagName("audio")[0];
  //grabs selected loop start and stop times from the session
  loopEndTime = Session.get("loopEndTime");
  loopStartTime = Session.get("loopStartTime");
  //when the clip is playing if loop finished start it over
  v.addEventListener("timeupdate", function() {
    if (v.currentTime > loopEndTime) {
      v.currentTime = loopStartTime;
      v.play();
    }
  });
  var overlayHafi = document.getElementsByTagName("core-overlay")[0];
  var overlayBright = document.getElementsByTagName("core-overlay")[1];
  overlayHafi.addEventListener("core-overlay-close-completed", function() {
    opened = Session.get("hafiOpened")
    Session.set("hafiOpened", !opened);
  });
  overlayBright.addEventListener("core-overlay-close-completed", function() {
    opened = Session.get("brightOpened")
    Session.set("brightOpened", !opened);
  });
}
