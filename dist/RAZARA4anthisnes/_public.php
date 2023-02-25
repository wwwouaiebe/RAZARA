<?php
# empêcher l'exécution du fichier en dehors de Dotclear
if (!defined('DC_RC_PATH')) {return;}
l10n::set(dirname(__FILE__).'/locales/'.dcCore::app()->lang.'/public');
?>