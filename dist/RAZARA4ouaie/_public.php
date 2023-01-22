<?php
# empêcher l'exécution du fichier en dehors de Dotclear
if (!defined('DC_RC_PATH')) {return;}

l10n::set(dirname(__FILE__).'/locales/'.$_lang.'/public');

$core->url->register('p401','p401','^p401/(.+)$',array('myURLHandlers','p401'));
$core->url->register('p403','p403','^p403/(.+)$',array('myURLHandlers','p403'));

class myURLHandlers extends dcUrlHandlers
{
	protected static function p401()
	{
		header('Content-Type: text/html; charset=UTF-8');
		http::head(401,'Unauthorized');
		$GLOBALS['core']->url->type = '401';
		echo $GLOBALS['core']->tpl->getData('401.html');
		exit;
	}
	protected static function p403()
	{
		header('Content-Type: text/html; charset=UTF-8');
		# http::head(403,'Forbidden');
		http::head(410,'Enocint catwaze moussi a sot');
		$GLOBALS['core']->url->type = '403';
		echo $GLOBALS['core']->tpl->getData('403.html');
		exit;
	}
}
?>