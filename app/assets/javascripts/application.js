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
//= require bootstrap.min

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
          var delay_time = 0;
          $('#info').empty(); // clear previous results

  	  for (var i=0;i<data.businesses.length; i++){
	         var name = $('<h4 class="list-group-item-heading">').text(data.businesses[i].name);
	         var rating = $('<p class="list-group-item-text">').text(data.businesses[i].rating);
	         var rating_img_url_small = data.businesses[i].rating_img_url_small;
           var neighborhood = $('<p class="list-group-item-text">').text(data.businesses[i].location.neighborhoods);
          var latitude = data.businesses[i].location.coordinate.latitude;
          var longitude = data.businesses[i].location.coordinate.longitude;
          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(latitude,longitude),
              map: map,
             title: data.businesses[i].name
            });

	            $('#info').append($('<a class="list-group-item" style="animation: fadein ' + delay_time  + 's;-webkit-animation: fadein ' + delay_time  + 's;-moz-animation: fadein ' + delay_time  + 's;-ms-animation: fadein ' + delay_time  + 's;-o-animation: fadein ' + delay_time  + 's;"></a>')
	                              .append(name)
                                      .append('<div id="chart' + i + '" style="width:250px;height:200px"></div>')
                                      .append('<img class="gym-rating" src="' + rating_img_url_small + '">')
                                      .append('<img src="' + data.businesses[i].image_url + '" alt="..." class="img-thumbnail gym-photo">')
                                      .append(neighborhood)
                                     );
              drawChart('#chart' + i);
              delay_time += .6;
      	  }
      },
      type: 'GET'
   });
});

$(document).ready(function(){
    if($(window).width() > 500) {
        $('#map-canvas').height($(window).height());
    } else {
        $('#map-canvas').height('300px');
    }
});


//type something into the form

//on submit
   //making an ajax call to local server
   //check for errors
   //if successful
      //itterate through results in a for loop
         //assign a variable that will grab the lat and long for each result
         //grab the name, rating, and other relevant info and append that to an html tag using jQuery


var drawChart = function(divId){
    $(function () {
        $(document).ready(function () {
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

            var startingCount = Math.random() * 100;
            $(divId).highcharts({
                chart: {
                    type: 'spline',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 10,
                    events: {
                        load: function () {

                            // set up the updating of the chart each second
                            var series = this.series[0];
                            setInterval(function () {
                                var x = (new Date()).getTime(), // current time
                                    y = startingCount + Math.floor(Math.random() * 5);
                                series.addPoint([x, y], true, true);
                            }, 1000);
                        }
                    }
                },
                title: {
                    text: 'People there now',
                    style: 'fontSize:12px'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'People'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'People',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: startingCount + Math.floor(Math.random() * 5)
                            });
                        }
                        return data;
                    }())
                }]
            });
        });
    });
}











