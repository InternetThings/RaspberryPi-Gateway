

Meteor.methods({
    delete: function () {
        Items.remove({});
    },

    ledcontrol: function(pinled) {
        // console.log(pinled);
         
        // Meteor._sleepForMs(200);

        Leds.update(pinled._id, {$set: { name: pinled.name, checked: ! pinled.checked , time : new Date()}});
        // console.log(this._id);
        //      console.log(this.checked);
        //      console.log(this.time);

    }
});

Items.find().observe({
    added: function (item) {
        console.log('-- local item added--');
        console.log(item);

        var _temp = ServerAItems.findOne({_id: item._id});
        if (!_temp) {
            ServerAItems.insert(item);
        }
    },
    removed: function (item) {
        console.log('-- local item removed--');
        console.log(item);

        ServerAItems.remove({_id:item._id});
    }
});

Sensors.find().observe({
    added: function (item) {
        console.log('-- local sensor added--');
        console.log(item);

        var _temp = ServerASensors.findOne({_id: item._id});
        if (!_temp) {
            ServerASensors.insert(item);
        }
    },
    removed: function (item) {
        console.log('-- local sensor removed--');
        console.log(item);

        ServerASensors.remove({_id:item._id});
    }
});

// Leds.find().observe({
//     added: function (item) {
//         console.log('-- local led added--');
//         console.log(item);

//         var _temp = ServerALeds.findOne({_id: item._id});
//         if (!_temp) {
//             ServerALeds.insert(item);
//         }
//     },
//     removed: function (item) {
//         console.log('-- local led removed--');
//         console.log(item);

//         ServerALeds.remove({_id:item._id});
//     }
// });



Leds.find().observeChanges({
    addedBefore: function (id, fields, before) {
        console.log('-- local led added--');
        console.log(id);
         console.log(fields);
         console.log(before);

        // var _temp = ServerALeds.findOne({_id: id});
        // if (!_temp) {
        //     ServerALeds.insert({_id: id}, fields);
        // }
    },
    changed: function ( id , fields) {
        console.log('-- local led updated--');
        console.log(id);
        console.log(fields);

        ServerALeds.update({_id:id} , {$set: fields});
    }
});



if (Meteor.isServer) {

    Meteor.startup(function () {
        // Items.remove({});
        //remote.subscribe('remote-items', 'B');
        // remote.subscribe('remote-items');
        remote.subscribe('local-items');
        remote.subscribe('local-leds');
        remote.subscribe('local-sensors');
    });

    ServerAItems.find().observe({
        added: function (item) {
            console.log('-- remote item added--');
            console.log(item);

            var _temp = Items.findOne({_id: item._id});
            if (!_temp) {
                console.log('-- local insert--');
                Items.insert(item);
            }
        },
        removed: function (item) {
            console.log('-- remote items removed--');
            Meteor.call('delete');
        }
    });

    // ServerASensors.find().observe({
    //     added: function (item) {
    //         console.log('-- remote item added--');
    //         console.log(item);

    //         var _temp = Items.findOne({_id: item._id});
    //         if (!_temp) {
    //             console.log('-- local insert--');
    //             Sensors.insert(item);
    //         }
    //     },
    //     removed: function (item) {
    //         console.log('-- remote items removed--');
    //         Meteor.call('delete');
    //     }
    // });

    // ServerALeds.find().observe({
    //     added: function (led) {
    //         console.log('-- remote item added--');
    //         console.log(led);

    //         var _temp = Leds.findOne({_id: led._id});
    //         if (!_temp) {
    //             console.log('-- local insert--');
    //             Leds.insert(led);
    //         }
    //     // },
    //     // changed: function (led, id, field) {
    //     //     console.log('-- remote items changed--');
    //     //     console.log(led);
    //     //     console.log(id);
    //     //     console.log(field);
    //     //     // Leds.update({_id:led._id});
    //     // }
    // });

    ServerALeds.find().observeChanges({
    addedBefore: function (id, fields, before) {
        console.log('-- remote led added--');
        console.log(id);
         console.log(fields);
         console.log(before);
          // Leds.insert(fields);
          
        // var _temp = ServerALeds.findOne({_id: id});
        // if (!_temp) {
        //     ServerALeds.insert({_id: id}, fields);
        // }
    },
    changed: function ( id , fields) {
        console.log('-- remote led updated--');
        console.log(id);
        console.log(fields);

         Leds.update({_id:id} , {$set: fields});
    }
    });


   

}
