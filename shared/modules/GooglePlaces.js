 export function initMap(dataset) {
  //initial Site

    var initSite = dataset[0];

  //initialize the google map
    var infowindow;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: initSite,
      zoom: 5
    });

  //add the InfoWindow to map
    infowindow = new google.maps.InfoWindow();

    SitePin();
    function SitePin(){
      console.log(dataset);
      for( var i = 0; i < dataset.length; i++){
        var marker = new google.maps.Marker({
          map: map,
          position: dataset[i]
        });

        //Service that add content to infowindow
        google.maps.event.addListener(marker, 'click', function() {
          var cool = 'nigger!';
        //infowindow.setContent(place.geometry);
          infowindow.setContent('<div>test</div>');
          infowindow.open(map, this);
        });
      }
    }
}


