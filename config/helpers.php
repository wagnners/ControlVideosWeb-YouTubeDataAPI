<?php

/**
*
* Arquivo onde são definidos os helpers
*
* @author Wagner Luz
*
**/

if($env == "dev"){
	define('LOCAL_URL', '/ControlVideosWeb-YouTubeDataAPI');
}
elseif($env == "prod"){
	define('LOCAL_URL', 'https://www.google.com.br/');
}

return array(
	'URLHelper' 	=> new URLHelper,
	'UserSession' 	=> new UserSession,
	'DateConverter' => new DateConverter,
);