<?php
# empêcher l'exécution du fichier en dehors de Dotclear
if (!defined('DC_RC_PATH')) {return;}

l10n::set(dirname(__FILE__).'/locales/'.dcCore::app()->lang.'/public');

dcCore::app()->url->register('p401','p401','^p401/(.+)$',array('myURLHandlers','p401'));
dcCore::app()->url->register('p403','p403','^p403/(.+)$',array('myURLHandlers','p403'));

class myURLHandlers extends dcUrlHandlers
{
	protected static function p401()
	{
		header('Content-Type: text/html; charset=UTF-8');
		http::head(401,'Unauthorized');
		dcCore::app()->url->type = '401';
		echo dcCore::app()->tpl->getData('401.html');
		exit;
	}
	protected static function p403()
	{
		header('Content-Type: text/html; charset=UTF-8');
		# http::head(403,'Forbidden');
		http::head(410,'Enocint catwaze moussi a sot');
		dcCore::app()->url->type = '403';
		echo dcCore::app()->tpl->getData('403.html');
		exit;
	}
}
?>