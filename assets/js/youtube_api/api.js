function showVideo(video, video_content){

	video_content.find('.card img').attr("src", video.snippet.thumbnails.medium.url);
	video_content.find('.card-body h5').html(video.snippet.title);
	video_content.find('.card-body p.card-text').html(video.snippet.description);
	video_content.find('.card-body .tags small').html(video.snippet.tags ? video.snippet.tags.slice(0, 5).join(", ") : "");
	video_content.find('.card-body .text-muted').html(new Date(video.snippet.publishedAt).toLocaleDateString());

	var time = moment.duration(video.millisecondsDuration);
	time = time.hours() ? time.hours() + ":" + time.minutes() + ":" + time.seconds() : time.minutes() + ":" + time.seconds();

	video_content.find('.card .min').html(time);

	video_content.find()
	video_content.removeClass("d-none");
	video_content.appendTo('.row.row-cols-1');

}


function showAllVideos(videos){

	var video_content = $('.tamplete.video .video-content').clone();
	video_content.find(".alert").remove();
	video_content.find(".card").removeClass("d-none");

	videos.forEach(video => {

		showVideo(video, video_content.clone());

	});

}

function showVideosPerDay(video){
	
	var video_content = $('.tamplete.video .video-content').clone();
	video_content.find(".alert").remove();
	video_content.find(".card").removeClass("d-none");

	showVideo(video, video_content);


}

function getDayStr(day){

	switch(day){
		case 0:
			return "Domingo";
		break;
		case 1:
			return "Segunda-Feira";
		break;
		case 2:
			return "Terça-Feira";
		break;
		case 3:
			return "Quarta-Feira";
		break;
		case 4:
			return "Quinta-Feira";
		break;
		case 5:
			return "Sexta-Feira";
		break;
		case 6:
			return "Sábado";
		break;
	}

}


function calcVideosPerDay(videos){

	var durationPerDays 	= $(".form-durations").serializeArray();	
	var hadDurationInput 	= false;
	
	durationPerDays.forEach((duration, key) => {
		
		var countRemoved 	= 0;
		var videosToCheck 	= videos;

		if(duration.value){

			hadDurationInput 		= true;
			var milliseconds_input 	= duration.value * 60 * 1000;

			$('.container .row.row-cols-1').append("<div class='col day'><h4>"+getDayStr(key)+"</h4></div>");
			$( "<div class='col'><small>"+duration.value+" minutos</small></div>" ).insertAfter( ".container .row.row-cols-1 .day:last" );

			var find = false;

			for (var i = 0; i < videosToCheck.length; i++) {
				if(videosToCheck[i].millisecondsDuration <= milliseconds_input){
					find = true;
					milliseconds_input -= videosToCheck[i].millisecondsDuration;
					showVideosPerDay(videosToCheck[i]);
					videos.splice(i+countRemoved,1);
				}
			}

			if(!find){
				$('.container .row.row-cols-1 .col:last').append("<div class='col my-3 video-content'><div class='alert alert-warning' role='alert'>Nenhum vídeo para assistir</div></div>");
			}
			$(".container .row.row-cols-1").append("<hr>");
		}	

	});

	return hadDurationInput;

}

function getVideosDetails(results){

	var milliseconds 	= 0;
	var videos 			= [];

	return new Promise((resolve, reject) => {
		results.forEach( (video, i) => {
			return gapi.client.youtube.videos.list({
		      "part": [
		        "contentDetails",
		        "snippet"
		      ],
		      "id": [
		        video.id.videoId
		      ]
		    }).then(function(response) {

		    	video.contentDetails 		= response.result.items[0].contentDetails;
		    	video.snippet 		 		= response.result.items[0].snippet;

		    	videos.push(video);

		        _milliseconds 				= moment.duration(response.result.items[0].contentDetails.duration, moment.ISO_8601);
		        video.millisecondsDuration	= _milliseconds._milliseconds;
		        milliseconds  += _milliseconds._milliseconds;

		         if(Object.is(results.length - 1, i)){
                    resolve({ status: 'finished', videos})
                }
		     },
		    function(err) { console.error("Execute error", err); });
		})
	}).then(result => {

		var seconds = Math.floor(milliseconds / 1000),
	    minute = Math.floor(seconds / 60),
	    seconds = seconds % 60,
	    hour = Math.floor(minute / 60),
	    minute = minute % 60,
	    day = Math.floor(hour / 24),
	    hour = hour % 24,
	    max_min = Math.floor((milliseconds/1000/60) << 0);

	    if(!calcVideosPerDay(result.videos))
	    	showAllVideos(result.videos)

	    $('#loader-content').hide();
		$('main').show();

	});

}

const youtubeAPIsearch = async (nextPage = null) => {
	return new Promise((resolve, reject) => {
		return gapi.client.youtube.search.list({
		  "part": [
		    "snippet"
		  ],
		  "pageToken": nextPage ? nextPage : "",
		  "maxResults": 50,
		  "type" : "video",
		  "q": $('#input-search').val()
		}).then(function(response) {
            resolve({ status: 'finished', result: response.result})
	     },
	    function(err) { console.error("Execute error", err); });
	});
}

function getOtherResults(result, videos = null){

	videos = videos ? videos : result.items;

	youtubeAPIsearch(result.nextPageToken).then(response => {

		videos = videos.concat(response.result.items);   	
	   		 //If your operation succeeds, resolve the promise and don't call again.
	    if (result.nextPageToken && videos.length < 151) {
	        getOtherResults(response.result, videos); //Try again
	    } else {
	        getVideosDetails(videos)
	    };

	});

}

function getYoutubeResults(){

	youtubeAPIsearch().then(response => {
    	if(response.result.pageInfo.totalResults > 50){
    		getOtherResults(response.result);
    	}else{
    	
       		getVideosDetails(response.result.items);
    	}
	});
}


function loadClient() {
	// gapi.client.setApiKey("AIzaSyBk0_7EcAVZJ3UtmFt5JJrOSoTWH7hcR2I");
	gapi.client.setApiKey("AIzaSyDl7WvKvjOfd7B_gJ_EzV1qIyZ096D8Q3o");
	return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/youtube/v3/rest")
	    .then(function() { getYoutubeResults() },
	        function(err) { console.error("Error loading GAPI client for API", err); });
}

// Make sure the client is loaded before calling this method.


