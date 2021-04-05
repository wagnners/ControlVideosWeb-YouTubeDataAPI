<?php
/**
*
* Controller da home.
*
* @author Wagner Luz
*
**/
class HomeController extends Controller
{

	public function index()
	{		

		$this->view('home/index.php');

	}

}