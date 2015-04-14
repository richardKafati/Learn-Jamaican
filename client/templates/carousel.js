if (Meteor.isCordova) {
  Meteor.startup(function () {
    //media proli shouldn't be global?
    media = new Media('/android_asset/www/application/kartel.mp3', function () {console.log("success");}, function (MediaError) {console.log("error: " + MediaError);}, function (status) {console.log("status: " + status);});

  });
  Session.setDefault("looping", false);
  Session.setDefault("playing", false);

  Template.carousel.helpers({
    song: function () {
      return Songs.find({name: {$in: ["Get More"]}});
    },

    looping: function () {
      if (Session.get("looping") === false) {
        return "button-stable";
      }
      else {
        return "button-balanced";
      }
    },

    playing: function () {
      if (Session.get("playing") === false) {
        return "ion-play";
      }
      else {
        return "ion-pause";
      }
    }
  });

  Template.carousel.events({
    'click #looper': function (event) {
      Session.set("looping", !Session.get("looping"));
    },

    'click #playButton': function (event) {
      if (Session.get("playing") === false) {
        Session.set("playing", true);
        media.play();
      }
      else {
        Session.set("playing", false);
        media.pause();
      }
    }

  });

  Template.carousel.rendered = function () {
    $('.carousel').slick({
      infinite: false
    });
  }
}
