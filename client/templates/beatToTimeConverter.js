Template.beatToTimeConverter.events({
  'submit #numberOfBars': function (event) {
    event.preventDefault();
    Session.set("numberOfBars", event.target.numberOfbars.value);
  },
  'submit #beat': function (event) {
    event.preventDefault();
    Session.set("time", "thisIStheTime");
  }
});

Template.beatToTimeConverter.helpers({
  time: function () {
    return Session.get("time");
  }
});
