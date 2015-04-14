/*if (Meteor.isCordova) {
  console.log("meteor is cordova");
  Router.configure({
    layoutTemplate: 'layout'
  });
  Router.route('/', {name: 'songMobile'});
}*/

/*if (Meteor.isCordova) {
  Router.configure({
    layoutTemplate: 'layout'
  });
  Router.route('/', {name: 'songMobile2'});
}*/

if (Meteor.isCordova) {
  Router.configure({
    layoutTemplate: 'layout'
  });
  Router.route('/', {name: 'carousel'});
}

else {
  Router.configure({
    layoutTemplate: 'layout'
  });

  Router.route('/', {name: 'song'});
  Router.route('/addSong', {name: 'addSong'});
  Router.route('/beatToTimeConverter', {name: 'beatToTimeConverter'});
}
