var curDate = new Date();
var key = "photo"+curDate.getHours();
Sphotos = new Meteor.Collection(key);
if (Meteor.is_client) {
    Template.gallery.photos = function () {
        return Sphotos.find({name:key});
    }

    Template.gallery.events = {
        'mousedown a.flx' : function(event) {
            switch (event.which) {
                case 1:
                    $(event.target).parent().colorbox({maxHeight:'500px'});
                    break;
                case 3:
                    var url = $(event.target).parent().attr("data-url");
                    window.open(url);
                    break;
                default:
                    break;
            }
            event.preventDefault();
            return false;
        }
      };
}

if (Meteor.is_server) {
    Meteor.startup(function () {
        // code to run on server at startup
        //Sphotos.remove({"name":"photo"});
        if (Sphotos.find({name:key}).count() == 0) {
            Meteor.http.call("GET",
                "http://api.flickr.com/services/rest/?method=flickr.interestingness.getList&extras=owner_name&api_key=8cc0f91339ab3da808b215c72a3d564d&per_page=120&format=json&nojsoncallback=1",
                {},
                function (error, result) {
                    if (result.statusCode === 200) {
                        //console.log(result.content);
                        var result = JSON.parse(result.content);
                        for (i = 0; i < 110; i++) {
                            photo = result.photos.photo[i];
                            Sphotos.insert({name:key, data:photo});
                        }
                    }
                });
        }

    });
}

