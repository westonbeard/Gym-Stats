// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
  
var map;
function initialize() {
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(38.892 , -77.026)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);



$('#searching_yelp').on('submit',function(e) {
	e.preventDefault();
	var search = $('#searchbox').val()
	var url = '/apidata.json'

   $.ajax({
      url: url,
      data: {
         term: search
      },
      error: function() {
         $('#info').html('<p>An error has occurred</p>');
      },
      dataType: 'json',
      success: function(data) {
  		for (var i=0;i<data.businesses.length; i++){
	         var name = $('<h1>').text(data.businesses[i].name);
	         var rating = $('<p>').text(data.businesses[i].rating);
	         var rating_img_url_small = $('<p>').text(data.businesses[i].rating_img_url_small);
          var neighborhood = $('<p>').text(data.businesses[i].location.neighborhoods);
          var latitude = data.businesses[i].location.coordinate.latitude;
          var longitude = data.businesses[i].location.coordinate.longitude;
          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(latitude,longitude),
              map: map,
             title: data.businesses[i].name
            });

	         $('#info_ul')
	            .append(name)
	            .append(rating)
              .append(neighborhood)
              .append('<img src="' + rating_img_url_small + '">')
	            // .append(rating_img_url_small);
      	};
      },
      type: 'GET'
   });
});

//type something into the form

//on submit
   //making an ajax call to local server
   //checking for errors
   //if successful
      //itterate through results in a for loop
         //assign a variable that will grab the lat and long for each result
         //grab the name, rating, and other relevant info and append that to an html tag















