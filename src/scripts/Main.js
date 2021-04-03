import { onMailContinueButtonFRClick, onMailContinueButtonENClick } from './Mail.js';
import { navModifier } from './Nav.js';
import { onStartSlideShow } from './SlideShow.js';

let mailContinueButtonFR = document.querySelector ( '#cyMailContinueButtonFR' );
if ( mailContinueButtonFR && onMailContinueButtonFRClick ) {
	mailContinueButtonFR.addEventListener ( 'click', onMailContinueButtonFRClick );
}

let mailContinueButtonEN = document.querySelector ( '#cyMailContinueButtonEN' );
if ( mailContinueButtonEN && onMailContinueButtonENClick ) {
	mailContinueButtonEN.addEventListener ( 'click', onMailContinueButtonENClick );
}

let paginationSlideShow = document.querySelector ( '#cyPaginationSlideShow' );
if ( paginationSlideShow ) {
	paginationSlideShow.addEventListener ( 'click', onStartSlideShow );
}

navModifier ( );