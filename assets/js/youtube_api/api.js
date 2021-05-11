// HTML video content assembly
function showVideo(video, video_content){

	video_content.find('.card img').attr("src", video.snippet.thumbnails.medium.url);
	video_content.find('.card-body h5').html(`<a href="https://www.youtube.com/watch?v=${video.id.videoId}}" target="_blank">${video.snippet.title}</a>`);
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

// Show all vídeos, count and duration total in html
function showAllVideos(videos, milliseconds){

	var time = moment.duration(milliseconds);
	
	$('.info.qtd-videos').html(videos.length + " resultados");
	$('.info.time-total').html(time.hours() + ":" + time.minutes() + ":" + time.seconds())
	
	var video_content = $('.tamplete.video .video-content').clone();
	video_content.find(".alert").remove();
	video_content.find(".card").removeClass("d-none");


	videos.forEach(video => {

		showVideo(video, video_content.clone());

	});

}

// Show vídeos per day in html
function showVideosPerDay(video){

	
	var video_content = $('.tamplete.video .video-content').clone();
	video_content.find(".alert").remove();
	video_content.find(".card").removeClass("d-none");

	showVideo(video, video_content);


}

// Get the name of day 
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

// Print the name of the day (ex: Sexta-Feita) passing index to getDayStr function.
function showDay(duration, key){
	$('.container .row.row-cols-1').append("<div class='col day'><h4>"+getDayStr(key)+"</h4></div>");
	$( "<div class='col'><small>"+duration.value+" minutos</small></div>" ).insertAfter( ".container .row.row-cols-1 .day:last" );
}

// This function will go through all marked days.
// If video has duration shorter than the one marked on the day, his video will be shown and deleted from the array so that it will not be visited in the next interactions
// if this function don't find the video for sometime, it will show an alert message
// Finally, this function show the time and the count of the videos
function calcVideosPerDay(videos){

	var durationPerDays 	= $(".form-durations").serializeArray();	
	var hadDurationInput 	= false;
	var totalVideos			= 0;
	var totalMil			= 0;
	
	durationPerDays.forEach((duration, key) => {
		
		var countRemoved 	= 0;
		var videosToCheck 	= videos;

		if(duration.value){

			hadDurationInput 		= true;
			var milliseconds_input 	= duration.value * 60 * 1000;

			showDay(duration, key);

			var find = false;

			for (var i = 0; i < videosToCheck.length; i++) {
				if(videosToCheck[i].millisecondsDuration <= milliseconds_input){

					find = true;

					totalVideos++;
					totalMil += videosToCheck[i].millisecondsDuration;

					
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


	var time = moment.duration(totalMil),
	hours = time.hours() < 10 ? `0${time.hours()}` : time.hours(),
	minutes = time.minutes() < 10 ? `0${time.minutes()}` : time.minutes(),
	seconds = time.seconds() < 10 ? `0${time.seconds()}` : time.seconds();

	$('.info.qtd-videos').html(totalVideos + " resultados");
	$('.info.time-total').html(`${hours}:${minutes}:${seconds}`)

	return hadDurationInput;

}

// This function will get videos details from Youtube API (duration, tags, total duration);
function getVideosDetails(results){

	var milliseconds 	= 0;

	return new Promise((resolve, reject) => {
		results.forEach( (video, index, array) => {
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
		        _milliseconds 				= moment.duration(response.result.items[0].contentDetails.duration, moment.ISO_8601);
		        video.millisecondsDuration	= _milliseconds._milliseconds;

		       	milliseconds  += _milliseconds._milliseconds;

				 if (Object.is(results.length - 1, index)) {
                    resolve({ status: 'finished', videos: results})
			      }
		     
		     },
		    function(err) { console.error("Execute error", err); });
		})
	}).then(result => {
		// If the return has no scheduled days, show all videos
	    if(!calcVideosPerDay(result.videos))
	    	showAllVideos(result.videos, milliseconds)

	    $('#loader-content').hide();
		$('main').show();

	});

}
// Getting videos from API 
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

//If the result has a next page, take the next page until the result is less than 151. 
function getOtherResults(result, videos = null){

	videos = videos ? videos : result.items;

	youtubeAPIsearch(result.nextPageToken).then(response => {

		videos = videos.concat(response.result.items);   

	  	//In this case, the loop will not pass the 200 results because it returns a max of 50 videos
	    if (result.nextPageToken && videos.length < 151) {
	        getOtherResults(response.result, videos); //Try again
	    } else {

	        getVideosDetails(videos)
	    };

	});

}


// This function will get results from API. If it has more than 50 results, it will get others results, otherwise, it will get details from videos (duration, tags)
function getYoutubeResults(){

	youtubeAPIsearch().then(response => {
    	if(response.result.pageInfo.totalResults > 50){
    		getOtherResults(response.result);
    	}else{
       		getVideosDetails(response.result.items);
    	}
	});
}

// Getting access to Youtube Data API
function loadClient() {
	gapi.client.setApiKey("YOUR_API_KEY");
	return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/youtube/v3/rest")
	    .then(function() { getYoutubeResults() },
	        function(err) { console.error("Error loading GAPI client for API", err); });
}


