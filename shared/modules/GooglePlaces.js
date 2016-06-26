 export function initMap(dataset) {
  //initial Site

    var initSite = dataset[0].googlePlace;

  //initialize the google map
    var infowindow;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: initSite,
      zoom: 7
    });

  //add the InfoWindow to map
    infowindow = new google.maps.InfoWindow();

    SitePin();
    function SitePin(){
      var data = dataset;
      for( var i = 0; i < data.length; i++){
        var marker = new google.maps.Marker({
          map: map,
          position: data[i].googlePlace
        });
        test(data[i]);
      }
        function test(dataset) {
          google.maps.event.addListener(marker, 'click', function() {
                  var content = '<div class="">' +
                    '<div class="pin-header">' +
                    '<div class="pin-avatar"><img src="'+ dataset.img +'" /></div>' +
                    '<div class="pin-username">"'+ dataset.name +'"</div>' +
                    '</div>'+
                    '<div class="pin-content">"'+ dataset.content +'"</div>' +
                    '</div>';
                  infowindow.setContent(content);
                  infowindow.open(map, this);
          });
        }
    }
}

      function attachData(marker, dataset) {
        var infowindow = new google.maps.InfoWindow({
          content: '<div class="">' +
                  '<div class="pin-header">' +
                  '<div class="pin-avatar"><img src="'+ dataset.img +'"</div>' +
                  '<div class="pin-username">"'+ dataset.name +'"</div>' +
                  '</div>'+
                  '<div class="pin-content">"'+ dataset.content +'"</div>' +
                  '</div>'
        });
        marker.addListener(marker, 'click', function() {
                infowindow.open(map, this);
        });
    }
