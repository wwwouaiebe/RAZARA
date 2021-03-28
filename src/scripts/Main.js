console.log ( 'razara.js' );

import { onMailContinueButtonFRClick, onMailContinueButtonENClick } from './Mail.js';
import { menuModifier } from './Menu.js';

let mailContinueButtonFR = document.getElementById ( 'cyMailContinueButtonFR' );
if ( mailContinueButtonFR && onMailContinueButtonFRClick ) {
	mailContinueButtonFR.addEventListener ( 'click', onMailContinueButtonFRClick );
}

let mailContinueButtonEN = document.getElementById ( 'cyMailContinueButtonEN' );
if ( mailContinueButtonEN && onMailContinueButtonENClick ) {
	mailContinueButtonEN.addEventListener ( 'click', onMailContinueButtonENClick );
}

menuModifier ( );