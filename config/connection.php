<?php

/**
*
* Arquivo com as configurações do banco de dados.
*
* @author Wagner Luz
**/

/*'dsn'      => 'mysql:dbname=NOME_DO_BANCO;host=127.0.0.1', */

$config = array(
	'dsn'      => 'mysql:dbname=fullstack4;host=127.0.0.1',
	'username' => 'root', // Usuário que criou nas configurações de privilégios do squema (banco)
	'password' => null    // Senha que criou nas configurações de privilégios do squema (banco)
);

// Caso seja o ambiente de produção a configuração é trocada
if(ENV == 'prod'){
	$config['dsn'] 		= '';
	$config['username'] = '';
	$config['password'] = '';
}

return $config;