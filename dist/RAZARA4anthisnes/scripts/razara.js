(function () {
	'use strict';

	/*
	Copyright - 2021 - wwwouaiebe - Contact: https://www.ouaie.be/

	This  program is free software;
	you can redistribute it and/or modify it under the terms of the
	GNU General Public License as published by the Free Software Foundation;
	either version 3 of the License, or any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
	*/

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function myOnClickHeadingNav
	@desc event listener for mouse click on heading
	@param {object} the mouse event
	@private

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function myOnClickHeadingNav ( clickEvent ) {
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

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function navModifier
	@desc Add class and event listeners on heading

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function navModifier ( ) {
		document.querySelectorAll ( 'body > nav > h2' ).forEach (
			element => {
				element.classList.add ( 'cyAddPlus' );
				element.addEventListener ( 'click', myOnClickHeadingNav, false );
			}
		);
	}

	/*
	Copyright - 2021 - wwwouaiebe - Contact: https://www.ouaie.be/

	This  program is free software;
	you can redistribute it and/or modify it under the terms of the
	GNU General Public License as published by the Free Software Foundation;
	either version 3 of the License, or any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
	*/

	const INVALID_INDEX = -1;
	const FORWARD = 1;
	const BACKWARD = -1;
	const TWO = 2;

	const MIN_SLIDE_SHOW_DURATION = 2000;
	const MAX_SLIDE_SHOW_DURATION = 30000;
	const SLIDE_SHOW_INTERVAL = 1000;
	const DEFAULT_SLIDE_SHOW_DURATION = 10000;

	let myBackgroundDiv = null;
	let myArticles = null;
	let myCurrentArticle = null;
	let myClonedArticle = null;
	let myArticleIndex = INVALID_INDEX;
	let myTimerId = null;
	let	myArticleClientRect = null;
	let myHelpDiv = null;

	let mySlideShow = {
		active : false,
		paused : false,
		duration : DEFAULT_SLIDE_SHOW_DURATION,
		forward : true
	};

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function myCloseSlideShow
	@desc Close the slide show, resstings all variables and storage to the initial value.
	@return
	@private

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function myCloseSlideShow ( ) {
		if ( myTimerId ) {
			window.clearTimeout ( myTimerId );
			myTimerId = null;
		}
		/* eslint-disable-next-line no-use-before-define */
		document.removeEventListener ( 'keydown', myOnKeyDown, true );
		document.body.classList.remove ( 'slideShow' );
		document.body.removeChild ( myBackgroundDiv );

		myBackgroundDiv = null;
		myArticles = null;
		myCurrentArticle = null;
		myClonedArticle = null;
		myArticleIndex = INVALID_INDEX;
		myTimerId = null;
		myArticleClientRect = null;
		myHelpDiv = null;

		mySlideShow.active = false;
		mySlideShow.paused = false;
		mySlideShow.forward = true;
		sessionStorage.setItem ( 'slideShow', JSON.stringify ( mySlideShow ) );
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function myOnArticleMouseMoveOrEnter
	@desc event listener for mouse move or enter on the article. Show or hide the left and right arrows as mouse cursors
	@param {object} the mouse event
	@private

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function myOnArticleMouseMoveOrEnter ( mouseEvent ) {
		if ( myArticleClientRect.width / TWO > mouseEvent.clientX - myArticleClientRect.x	 ) {
			myClonedArticle.classList.remove ( 'cyCursorRight' );
			myClonedArticle.classList.add ( 'cyCursorLeft' );
		}
		else {
			myClonedArticle.classList.remove ( 'cyCursorLeft' );
			myClonedArticle.classList.add ( 'cyCursorRight' );
		}
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function myOnArticleMouseLeave
	@desc event listener for mouse leave the article. Remove left and right arrows as mouse cursors
	@param {object} the mouse event
	@private

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function myOnArticleMouseLeave ( ) {
		myClonedArticle.classList.remove ( 'cyCursorRight' );
		myClonedArticle.classList.remove ( 'cyCursorLeft' );
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function myOnArticleClick
	@desc event listener for mouse click on the article. Start showing the nexr or previous slide
	@param {object} the mouse event
	@private

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function myOnArticleClick ( mouseEvent ) {
		if ( myArticleClientRect.width / TWO > mouseEvent.clientX - myArticleClientRect.x	 ) {
			mySlideShow.forward = false;
		}
		/* eslint-disable-next-line no-use-before-define */
		myShowNextArticle ( );
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function myShowNextArticle
	@desc show the next article.
	@param {string}
	@return
	@private

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function myShowNextArticle ( ) {

		// stop the timeout
		if ( myTimerId ) {
			window.clearTimeout ( myTimerId );
			myTimerId = null;
		}
		if ( myCurrentArticle ) {

			// removing the current cloned article
			myClonedArticle.removeEventListener ( 'mousemove', myOnArticleMouseMoveOrEnter, false );
			myClonedArticle.removeEventListener ( 'mouseenter', myOnArticleMouseMoveOrEnter, false );
			myClonedArticle.removeEventListener ( 'mouseleave', myOnArticleMouseLeave, false );
			myClonedArticle.removeEventListener ( 'click', myOnArticleClick, false );
			myBackgroundDiv.removeChild ( myClonedArticle );
		}

		// computing the next index
		myArticleIndex += mySlideShow.forward ? FORWARD : BACKWARD;

		// searching the next article
		myCurrentArticle = myArticles.item ( myArticleIndex );

		if ( myCurrentArticle ) {

			// next article found. The article is displayed
			myClonedArticle = myBackgroundDiv.appendChild ( myCurrentArticle.cloneNode ( true ) );
			myArticleClientRect = myClonedArticle.getBoundingClientRect ( );
			myClonedArticle.addEventListener ( 'mousemove', myOnArticleMouseMoveOrEnter, false );
			myClonedArticle.addEventListener ( 'mouseenter', myOnArticleMouseMoveOrEnter, false );
			myClonedArticle.addEventListener ( 'mouseleave', myOnArticleMouseLeave, false );
			myClonedArticle.addEventListener ( 'click', myOnArticleClick, false );
			myBackgroundDiv.scrollIntoView ( true );
			if ( ! mySlideShow.paused ) {

				// restarting the timeout
				myTimerId = setTimeout ( myShowNextArticle, mySlideShow.duration );
			}
		}
		else {

			// next article not found. Searching another page ( next or previous depending of the
			// slide show direction
			let paginationLink = document.querySelector (
				mySlideShow.forward ? '#cyPaginationOldest > a' : '#cyPaginationNewest > a' );
			if ( paginationLink ) {
				sessionStorage.setItem ( 'slideShow', JSON.stringify ( mySlideShow ) );
				paginationLink.click ( );
			}
			else {

				// Page not found. Closing the slide show
				myCloseSlideShow ( );
			}
		}

		sessionStorage.setItem ( 'slideShow', JSON.stringify ( mySlideShow ) );

		// always restarting in the forward direction
		mySlideShow.forward = true;
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function myOnKeyDown
	@desc event listener for keyboard actions
	@param {object} the keyboard event listener
	@private

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function myOnKeyDown ( keyBoardEvent ) {
		switch ( keyBoardEvent.key ) {
		case 'Escape' :
		case 'Esc' :
			myCloseSlideShow ( );
			break;
		case '+' :
			mySlideShow.duration =
				MAX_SLIDE_SHOW_DURATION === mySlideShow.duration
					?
					MAX_SLIDE_SHOW_DURATION
					: mySlideShow.duration + SLIDE_SHOW_INTERVAL;
			break;
		case '-' :
			mySlideShow.duration =
				MIN_SLIDE_SHOW_DURATION === mySlideShow.duration
					?
					MIN_SLIDE_SHOW_DURATION
					:
					mySlideShow.duration - SLIDE_SHOW_INTERVAL;
			break;
		case 's' :
		case 'S' :
			if ( myTimerId ) {
				window.clearTimeout ( myTimerId );
				myTimerId = null;
				mySlideShow.paused = true;
			}
			else {
				mySlideShow.paused = false;
				myShowNextArticle ( );
			}
			break;
		case 'ArrowRight' :
			myShowNextArticle ( );
			break;
		case 'ArrowLeft' :
			mySlideShow.forward = false;
			myShowNextArticle ( );
			break;
		}
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function myOnMouseEnterHelpButton
	@desc event listener for mouse enter on the help button. Show the help div
	@param {object} the mouse event
	@private

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function myOnMouseEnterHelpButton ( mouseEnterEvent ) {
		myHelpDiv.style.right = ( document.documentElement.clientWidth - mouseEnterEvent.clientX ) + 'px';
		myHelpDiv.classList.remove ( 'cyHelpDivHidden' );
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function myOnMouseLeaveHelpButton
	@desc event listener for mouse leave on the help button. Hide the help div
	@param {object} the mouse event
	@private

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function myOnMouseLeaveHelpButton ( ) {
		myHelpDiv.classList.add ( 'cyHelpDivHidden' );
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function onStartSlideShow
	@desc Start the slide show. Called when the page is loaded ( if the slide show is active in the session storage)
	or as mouseclick event listener on the start slide show shortcut

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function onStartSlideShow ( ) {
		document.addEventListener ( 'keydown', myOnKeyDown, true );
		document.body.classList.add ( 'slideShow' );

		myBackgroundDiv = document.createElement ( 'div' );
		document.body.appendChild ( myBackgroundDiv );

		let toolbarDiv = document.createElement ( 'div' );
		myBackgroundDiv.appendChild ( toolbarDiv );

		let helpButton = document.createElement ( 'span' );
		helpButton.innerText = '??? ';
		helpButton.addEventListener ( 'mouseenter', myOnMouseEnterHelpButton, true );
		helpButton.addEventListener ( 'mouseleave', myOnMouseLeaveHelpButton, true );
		toolbarDiv.appendChild ( helpButton );

		let closeButton = document.createElement ( 'span' );
		closeButton.innerText = '???';
		closeButton.addEventListener ( 'click', myCloseSlideShow );
		toolbarDiv.appendChild ( closeButton );

		myHelpDiv = document.createElement ( 'div' );
		myHelpDiv.innerText =
			'Touche ??? : passer ?? la photo suivante' +
			'\nTouche ??? : passer ?? la photo pr??c??dente' +
			'\nTouche - : diminuer le temps de vision' +
			'\nTouche + : augmenter le temps de vision' +
			'\nTouches S ou s : arr??ter ou relancer le diaporama' +
			'\nTouche Esc : fermer le diaporama';
		myHelpDiv.classList.add ( 'cyHelpDiv' );
		myHelpDiv.classList.add ( 'cyHelpDivHidden' );
		toolbarDiv.appendChild ( myHelpDiv );

		myArticles = document.querySelectorAll ( 'section > article' );
		myArticleIndex = mySlideShow.forward ? INVALID_INDEX : myArticles.length;
		mySlideShow.active = true;
		myShowNextArticle ( );
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	main

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	// Adding text in the slide show shortcut. The text is added with JS to avoid the user try to
	// launch the slide show when JS is disabled
	let slideShowElement = document.querySelector ( '#cyPaginationSlideShow > a' );
	if ( slideShowElement ) {
		slideShowElement.textContent = 'Diaporama slideshow';
		slideShowElement.title = 'Lancer le diaporama';
	}

	// reading the session storage and loading the slide show if needed
	mySlideShow = JSON.parse ( sessionStorage.getItem ( 'slideShow' ) ) || mySlideShow;
	if ( mySlideShow.active ) {
		onStartSlideShow ( );
	}

	/*
	Copyright - 2021 - wwwouaiebe - Contact: https://www.ouaie.be/

	This  program is free software;
	you can redistribute it and/or modify it under the terms of the
	GNU General Public License as published by the Free Software Foundation;
	either version 3 of the License, or any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
	*/

	/* eslint-disable-next-line no-magic-numbers */
	const N_3M5 = 3 * 5;
	/* eslint-disable-next-line no-magic-numbers */
	const N_8EXP2 = 8 ** 2;
	const ONE = 1;
	const ZERO = 0;

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function onMailContinueButtonFRClick
	@desc event listener for mouse click on the ContinueFR button.

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function onMailContinueButtonFRClick ( ) {
		if ( N_8EXP2 + N_3M5 === Number.parseInt ( document.getElementById ( 'cyNumberFR' ).value ) ) {
			let addr = document.querySelector ( '#cyMailContinueButtonFR' ).getAttribute ( 'name' ) +
				String.fromCharCode ( N_8EXP2 ) +
				window.location.hostname.split ( '.' ).reverse ( ) [ ONE ] +
				'.' +
				window.location.hostname.split ( '.' ).reverse ( ) [ ZERO ];
			{
				let mailLink = document.createElement ( 'a' );
				mailLink.href = 'mailto:' + addr;
				mailLink.click ( );
			}
			navigator.clipboard.writeText ( addr )
				.then (
					( ) => {
						document.getElementById ( 'cyClipboardFR' ).innerHTML =
							'L\'adresse mail a ??galement ??t?? pass??e dans le presse-papier de votre ordinateur.';
					}
				)
				.catch ( ( ) => console.error ( 'failed to copy to the clipboard' ) );
			document.getElementById ( 'cyMailFR' ).innerHTML =
				'Bravo! Vous ??tes dou??. Patientez un instant, votre mail va s\'ouvrir... ' +
				'si tout est bien configur?? sur votre appareil.';
		}
		else {
			document.getElementById ( 'cyMailFR' ).innerHTML = 'Oufti biesse. Null en math.';
		}
		document.getElementById ( 'cyMailContinueButtonFR' ).style.visibility = 'hidden';
		document.getElementById ( 'cyMailContinueButtonEN' ).style.visibility = 'hidden';
	}

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function onMailContinueButtonENClick
	@desc event listener for mouse click on the ContinueEN button.

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function onMailContinueButtonENClick ( ) {
		if ( N_8EXP2 + N_3M5 === Number.parseInt ( document.getElementById ( 'cyNumberEN' ).value ) ) {
			let addr = document.querySelector ( '#cyMailContinueButtonEN' ).getAttribute ( 'name' ) +
				String.fromCharCode ( N_8EXP2 ) +
				window.location.hostname.split ( '.' ).reverse ( ) [ ONE ] +
				'.' +
				window.location.hostname.split ( '.' ).reverse ( ) [ ZERO ];
			{
				let mailLink = document.createElement ( 'a' );
				mailLink.href = 'mailto:' + addr;
				mailLink.click ( );
			}
			navigator.clipboard.writeText ( addr )
				.then (
					( ) => {
						document.getElementById ( 'cyClipboardEN' ).innerHTML =
							'The email address has also been passed to your computer\'s clipboard.';
					}
				)
				.catch ( ( ) => console.error ( 'failed to copy to the clipboard' ) );
			document.getElementById ( 'cyMailEN' ).innerHTML =
				'Excellent! You are very good. Wait a moment, your email will open...' +
				' if everything is configured correctly on your device.';
		}
		else {
			document.getElementById ( 'cyMailEN' ).innerHTML = 'You are stupid.';
		}
		document.getElementById ( 'cyMailContinueButtonFR' ).style.visibility = 'hidden';
		document.getElementById ( 'cyMailContinueButtonEN' ).style.visibility = 'hidden';
	}

	/*
	Copyright - 2021 - wwwouaiebe - Contact: https://www.ouaie.be/

	This  program is free software;
	you can redistribute it and/or modify it under the terms of the
	GNU General Public License as published by the Free Software Foundation;
	either version 3 of the License, or any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
	*/

	// loding event handlers for mail if needed
	let mailContinueButtonFR = document.querySelector ( '#cyMailContinueButtonFR' );
	if ( mailContinueButtonFR && onMailContinueButtonFRClick ) {
		mailContinueButtonFR.addEventListener ( 'click', onMailContinueButtonFRClick );
	}

	let mailContinueButtonEN = document.querySelector ( '#cyMailContinueButtonEN' );
	if ( mailContinueButtonEN && onMailContinueButtonENClick ) {
		mailContinueButtonEN.addEventListener ( 'click', onMailContinueButtonENClick );
	}

	// loading event handler for slide show
	let paginationSlideShow = document.querySelector ( '#cyPaginationSlideShow' );
	if ( paginationSlideShow ) {
		paginationSlideShow.addEventListener ( 'click', onStartSlideShow );
	}

	// modifying the nav tag
	navModifier ( );

}());
