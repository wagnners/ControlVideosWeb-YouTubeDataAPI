<?php
/**
*
* Controller da página de resultado.
*
* @author Wagner Luz
*
**/
class VideosController extends Controller
{

	public function get()
	{		

		$this->view('videos/index.php', array('search' => $_GET));

	}

}