 Items = new Meteor.Collection('items');

 Leds = new Meteor.Collection('leds');

 Sensors = new Meteor.Collection('sensors');

remote = DDP.connect('http://testddp1.meteor.com/');
console.log(remote);
ServerAItems = new Meteor.Collection('items', {connection: remote});
// console.log(ServerAItems);
ServerALeds = new Meteor.Collection('leds', {connection: remote});
// console.log(ServerALeds);
 ServerASensors = new Meteor.Collection('sensors', {connection: remote});

// Items.allow({
//     insert: function () {
//         return true;
//     }
// });

 // Meteor.subscribe('local-items');
 //    Meteor.subscribe('local-leds');