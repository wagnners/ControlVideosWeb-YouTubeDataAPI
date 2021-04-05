<?php

/**
*
* Definição das rotas e seus respectivos controllers e actions
*
* @author Wagner Luz
*
**/

// rotas normais
$commonRoutes = array(
	'/'   	 		=> 'HomeController/index',
	'videos/get' 	=> 'VideosController/get',
);

// rotas POST
$commonPost = array();

$commonRoutes = array_merge($commonRoutes, $commonPost);

return $commonRoutes;