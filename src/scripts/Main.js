import { onMailContinueButtonFRClick, onMailContinueButtonENClick } from './Mail.js';
import { navModifier } from './Nav.js';
import { onStartSlideShow } from './SlideShow.js';

let mailContinueButtonFR = document.getElementById ( 'cyMailContinueButtonFR' );
if ( mailContinueButtonFR && onMailContinueButtonFRClick ) {
	mailContinueButtonFR.addEventListener ( 'click', onMailContinueButtonFRClick );
}

let mailContinueButtonEN = document.getElementById ( 'cyMailContinueButtonEN' );
if ( mailContinueButtonEN && onMailContinueButtonENClick ) {
	mailContinueButtonEN.addEventListener ( 'click', onMailContinueButtonENClick );
}

document.querySelector ( '#cyPaginationSlideShow' ).addEventListener ( 'click', onStartSlideShow );
navModifier ( );