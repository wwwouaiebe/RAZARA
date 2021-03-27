console.log ( "razara.js" );

let mailContinueButtonFR = document.getElementById ( 'cyMailContinueButtonFR' );
if ( mailContinueButtonFR ) {
	mailContinueButtonFR.addEventListener ( 'click', onMailContinueButtonFRClick );
}

let mailContinueButtonEN = document.getElementById ( 'cyMailContinueButtonEN' );
if ( mailContinueButtonEN ) {
	mailContinueButtonEN.addEventListener ( 'click', onMailContinueButtonENClick );
}