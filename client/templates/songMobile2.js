Template.songMobile2.helpers({
  song: function () {
    return Songs.find({name: {$in: ["Get More"]}});
  }
});

Template.songMobile2.rendered = function () {
  $(".owl-carousel").owlCarousel();
}
