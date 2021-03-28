function onClickHeadingNav ( clickEvent ) {
	let show = clickEvent.target.classList.contains ( 'cyAddPlus' );
	document.querySelectorAll ( 'body > nav > h2' ).forEach (
		element => {
			element.classList.add ( 'cyAddPlus' );
			element.classList.remove ( 'cyAddMinus' );
		}
	);
	if ( show ) {
		clickEvent.target.classList.toggle ( 'cyAddPlus' );
		clickEvent.target.classList.toggle ( 'cyAddMinus' );
	}
}

function navModifier ( ) {
	document.querySelectorAll ( 'body > nav > h2' ).forEach (
		element => {
			element.classList.add ( 'cyAddPlus' );
			element.addEventListener ( 'click', onClickHeadingNav, false );
		}
	);
}

export { navModifier };