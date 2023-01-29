/*
Copyright - 2023 - wwwouaiebe - Contact: https://www.ouaie.be/

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

/*
Changes:
	- v1.1.0:
		- created from v1.0.0
 */

/* eslint-disable no-magic-numbers */
const MINUS_ONE = -1;
const ZERO = 0;
const ONE = 1;
const TWO = 2;
/* eslint-enable no-magic-numbers */

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
This class is a simple enum for the slide show direction
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class SlideShowDirection {

	/**
	The slide show will go from the last image to the first image
	@type {Number}
	*/

	static get backward ( ) { return MINUS_ONE; }

	/**
	The slide show direction must not be changed
	@type {Number}
	*/

	static get noChange ( ) { return ZERO; }

	/**
	The slide show will go from the first image to the last image
	@type {Number}
	*/

	static get forward ( ) { return ONE; }

	constructor ( ) {
		Object.freeze ( this );
	}

}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
keydown event listener
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class KeyDownEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} keyBoardEvent The event to handle
	*/

	handleEvent ( keyBoardEvent ) {
		switch ( keyBoardEvent.key ) {
		case 'S' :
		case 's' :
			this.#slideShow.stop ( );
			break;
		case '+' :
			this.#slideShow.increaseDuration ( );
			break;
		case '-' :
			this.#slideShow.decreaseDuration ( );
			break;
		case 'P' :
		case 'p' :
			this.#slideShow.pause ( );
			break;
		case 'ArrowRight' :
			this.#slideShow.showNextArticle ( SlideShowDirection.forward );
			break;
		case 'ArrowLeft' :
			this.#slideShow.showNextArticle ( SlideShowDirection.backward );
			break;
		default :
			break;
		}
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
mouseenter event listener on the help button
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class MouseEnterHelpEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} mouseEnterEvent The event to handle
	*/

	handleEvent ( mouseEnterEvent ) {
		this.#slideShow.onMouseEnterHelpButton ( mouseEnterEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
mouseleave event listener on the help button
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class MouseLeaveHelpEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} mouseLeaveEvent The event to handle
	*/

	handleEvent ( mouseLeaveEvent ) {
		this.#slideShow.onMouseLeaveHelpButton ( mouseLeaveEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
click event listener on the help button
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class MouseClickHelpEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} clickEvent The event to handle
	*/

	handleEvent ( clickEvent ) {
		this.#slideShow.onMouseclickHelpButton ( clickEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
click event listener on the close button
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class CloseButtonClickEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} clickEvent The event to handle
	*/

	handleEvent ( clickEvent ) {
		this.#slideShow.stop ( clickEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
click event listener on the decrease button
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class DecreaseButtonClickEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} clickEvent The event to handle
	*/

	handleEvent ( clickEvent ) {
		this.#slideShow.decreaseDuration ( clickEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
click event listener on the increase button
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class IncreaseButtonClickEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} clickEvent The event to handle
	*/

	handleEvent ( clickEvent ) {
		this.#slideShow.increaseDuration ( clickEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
click event listener on the pause button
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class PauseButtonClickEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} clickEvent The event to handle
	*/

	handleEvent ( clickEvent ) {
		this.#slideShow.pause ( clickEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
mouseenter and mousemove event listeners on the article HTMLElement
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class MouseEnterOrMoveArticleEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} mouseEnterEvent The event to handle
	*/

	handleEvent ( mouseEnterEvent ) {
		this.#slideShow.onMouseEnterOrMoveArticle ( mouseEnterEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
mouseleave event listener on the article HTMLElement
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class MouseLeaveArticleEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} mouseLeaveEvent The event to handle
	*/

	handleEvent ( mouseLeaveEvent ) {
		this.#slideShow.onMouseLeaveArticle ( mouseLeaveEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
clicke event listener on the article HTMLElement
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class MouseClickArticleEL {

	/**
	A reference to the slideShow Object
	@type {SlideShow}
	*/

	#slideShow;

	/**
	The constructor
	@param {SlideShow} slideShow A reference to the SlideShow Object
	*/

	constructor ( slideShow ) {
		this.#slideShow = slideShow;
		Object.freeze ( this );
	}

	/**
	Event listener method
	@param {Event} clickEvent The event to handle
	*/

	handleEvent ( clickEvent ) {
		this.#slideShow.onMouseClickArticle ( clickEvent );
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
Slideshow class. Performs all the actions for the slideshow
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

class SlideShow {

	/**
	The xml data for the slide show
	@type {HTMLCollection}
	*/

	#slideShowData;

	/**
	The background HTMLElement
	@type {HTMLElement}
	*/

	#backgroundHTMLElement;

	/**
	The displayed article HTMLElement
	@type {HTMLElement}
	*/

	#articleHTMLElement;

	/**
	The help contains HTMLElement
	@type {HTMLElement}
	*/

	#helpHTMLElement;

	/**
	The slide show image HTMLElement
	@type {HTMLElement}
	*/

	#slideShowImgHTMLElement;

	/**
	The image legend HTMLElement
	@type {HTMLElement}
	*/

	#slideShowLegendHTMLElement;

	/**
	The image exif data HTMLElement
	@type {HTMLElement}
	*/

	#slideShowExifHTMLElement;

	/**
	The keydown event listener
	@type {KeyDownEL}
	*/

	#keyDownEL;

	/**
	The duration for the display of an image in millisecond
	@type {Number}
	*/

	#duration;

	/**
	A flag indicating the the slideshow timer is active/inactive
	@type {Boolean}
	*/

	#paused;

	/**
	The timerId
	@type {?Number}
	*/

	#timerId;

	/**
	The direction of the slideshow. See the SlideShowDirection class for possible values
	@type {Number}
	*/

	#direction;

	/**
	The index in the slideShowData collection of the currently displayed image
	@type {Number}
	*/

	#slideShowIndex;

	/**
	The maximum duration for the display of an image in millisecond
	@type {Number}
	*/

	// eslint-disable-next-line no-magic-numbers
	static get #MAX_SLIDE_SHOW_DURATION ( ) { return 30000; }

	/**
	The increase/decrease duration for the display of an image in millisecond
	@type {Number}
	*/

	// eslint-disable-next-line no-magic-numbers
	static get #SLIDE_SHOW_INTERVAL ( ) { return 1000; }

	/**
	The minimum duration for the display of an image in millisecond
	@type {Number}
	*/

	// eslint-disable-next-line no-magic-numbers
	static get #MIN_SLIDE_SHOW_DURATION ( ) { return 2000; }

	/**
	The default duration for the display of an image in millisecond
	@type {Number}
	*/

	// eslint-disable-next-line no-magic-numbers
	static get #DEFAULT_SLIDE_SHOW_DURATION ( ) { return 10000; }

	/**
	The value for the slideShowIndex when invalid
	@type {Number}
	*/

	static get #INVALID_INDEX ( ) { return MINUS_ONE; }

	/**
	Create the toolbar and buttons on the toolbar
	*/

	#createToolbar ( ) {
		let toolbarHTMLElement = document.createElement ( 'div' );

		this.#backgroundHTMLElement.appendChild ( toolbarHTMLElement );

		const decreaseButton = document.createElement ( 'span' );
		decreaseButton.innerText = '➖';
		decreaseButton.addEventListener ( 'click', new DecreaseButtonClickEL ( this ) );
		toolbarHTMLElement.appendChild ( decreaseButton );

		const increaseButton = document.createElement ( 'span' );
		increaseButton.innerText = '➕';
		increaseButton.addEventListener ( 'click', new IncreaseButtonClickEL ( this ) );
		toolbarHTMLElement.appendChild ( increaseButton );

		const pauseButton = document.createElement ( 'span' );
		pauseButton.innerText = '⏯️';
		pauseButton.addEventListener ( 'click', new PauseButtonClickEL ( this ) );
		toolbarHTMLElement.appendChild ( pauseButton );

		const helpButton = document.createElement ( 'span' );
		helpButton.innerText = '❔ ';
		helpButton.addEventListener ( 'mouseenter', new MouseEnterHelpEL ( this ) );
		helpButton.addEventListener ( 'mouseleave', new MouseLeaveHelpEL ( this ) );
		helpButton.addEventListener ( 'click', new MouseClickHelpEL ( this ) );
		toolbarHTMLElement.appendChild ( helpButton );

		const closeButton = document.createElement ( 'span' );
		closeButton.innerText = '❌';
		closeButton.addEventListener ( 'click', new CloseButtonClickEL ( this ) );
		toolbarHTMLElement.appendChild ( closeButton );

		this.#helpHTMLElement = document.createElement ( 'div' );
		this.#helpHTMLElement.innerText =
            'Touche clavier ⮞ ou clic sur photo à droite :\n passer à la photo suivante' +
            '\n\nTouche clavier ⮜ ou clic sur photo à gauche :\n passer à la photo précédente' +
            '\n\nTouche clavier - ou bouton ➖ :\n diminuer le temps de vision' +
            '\n\nTouche clavier + ou bonton ➕:\n augmenter le temps de vision' +
            '\n\nTouches clavier P ou p ou bouton ⏯️ :\n arrêter ou relancer le diaporama' +
            '\n\nTouche clavier S ou s ou bouton ❌ :\n fermer le diaporama';
		this.#helpHTMLElement.classList.add ( 'cyHelpDiv' );
		this.#helpHTMLElement.classList.add ( 'cyHelpDivHidden' );
		toolbarHTMLElement.appendChild ( this.#helpHTMLElement );
	}

	/**
	Create the article of the slide show
	*/

	#createArticle ( ) {
		this.#articleHTMLElement = document.createElement ( 'article' );
		this.#articleHTMLElement.addEventListener ( 'mouseenter', new MouseEnterOrMoveArticleEL ( this ) );
		this.#articleHTMLElement.addEventListener ( 'mousemove', new MouseEnterOrMoveArticleEL ( this ) );
		this.#articleHTMLElement.addEventListener ( 'mouseleave', new MouseLeaveArticleEL ( this ) );
		this.#articleHTMLElement.addEventListener ( 'click', new MouseClickArticleEL ( this ) );
		this.#backgroundHTMLElement.appendChild ( this.#articleHTMLElement );

		let figure = document.createElement ( 'figure' );
		this.#articleHTMLElement.appendChild ( figure );

		this.#slideShowImgHTMLElement = document.createElement ( 'img' );
		figure.appendChild ( this.#slideShowImgHTMLElement );

		let figCaption = document.createElement ( 'figcaption' );
		figure.appendChild ( figCaption );

		this.#slideShowLegendHTMLElement = document.createElement ( 'p' );
		figCaption.appendChild ( this.#slideShowLegendHTMLElement );

		let mainExifHTMLElement = document.createElement ( 'p' );
		mainExifHTMLElement.className = 'cyPictureInfo';
		figCaption.appendChild ( mainExifHTMLElement );

		let cameraHTMLElement = document.createElement ( 'span' );
		cameraHTMLElement.innerText = '📷';
		mainExifHTMLElement.appendChild ( cameraHTMLElement );

		this.#slideShowExifHTMLElement = document.createElement ( 'span' );
		mainExifHTMLElement.appendChild ( this.#slideShowExifHTMLElement );
	}

	/**
	Create all the HTMLElements of the slide show
	*/

	#createHTMLElements ( ) {
		this.#backgroundHTMLElement = document.createElement ( 'div' );
		this.#createToolbar ( );
		this.#createArticle ( );
	}

	/**
	The constructor
	*/

	constructor ( ) {
		Object.freeze ( this );

		// Initialisation of the variables
		this.#keyDownEL = new KeyDownEL ( this );
		this.#duration = SlideShow.#DEFAULT_SLIDE_SHOW_DURATION;
		this.#paused = false;
		this.#timerId = null;
		this.#direction = SlideShowDirection.forward;
		this.#slideShowIndex = SlideShow.#INVALID_INDEX;

		// Loading of the slide show data
		this.#slideShowData = document.getElementsByTagName ( 'ssimg' );
		if ( ZERO === this.#slideShowData.length ) {

			// No slide show...
			return;
		}

		// Enabling the slide show in the pagination
		let slideShowElement = document.querySelector ( '#cyPaginationSlideShow > a' );
		if ( slideShowElement ) {
			slideShowElement.textContent = 'Diaporama slideshow';
			slideShowElement.title = 'Lancer le diaporama';
		}

		// creation of the html elements
		this.#createHTMLElements ( );
	}

	/**
	increase the duration for the display of an image
	*/

	increaseDuration ( ) {
		this.#duration =
			SlideShow.#MAX_SLIDE_SHOW_DURATION === this.#duration
				?
				SlideShow.#MAX_SLIDE_SHOW_DURATION
				:
				this.#duration + SlideShow.#SLIDE_SHOW_INTERVAL;
	}

	/**
	decrease the duration for the display of an image
	*/

	decreaseDuration ( ) {
		this.#duration =
			SlideShow.#MIN_SLIDE_SHOW_DURATION === this.#duration
				?
				SlideShow.#MIN_SLIDE_SHOW_DURATION
				:
				this.#duration - SlideShow.#SLIDE_SHOW_INTERVAL;
	}

	/**
	mouseenter on the help button event handler
	*/

	onMouseEnterHelpButton ( mouseEnterEvent ) {
		this.#helpHTMLElement.style.right = ( document.documentElement.clientWidth - mouseEnterEvent.clientX ) + 'px';
		this.#helpHTMLElement.classList.remove ( 'cyHelpDivHidden' );
	}

	/**
	mouseleave on the help button event handler
	*/

	onMouseLeaveHelpButton ( ) {
		this.#helpHTMLElement.classList.add ( 'cyHelpDivHidden' );
	}

	/**
	click on the help button event handler (needed for touchpads)
	*/

	onMouseclickHelpButton ( ) {
		this.#helpHTMLElement.classList.toggle ( 'cyHelpDivHidden' );
	}

	/**
	mouseenter and mousemove on the article event handler. Change the cursor image (left or right arrow),
	depending of the cursor position
	*/

	onMouseEnterOrMoveArticle ( mouseEvent ) {
		let articleClientRect = this.#articleHTMLElement.getBoundingClientRect ( );
		if ( articleClientRect.width / TWO > mouseEvent.clientX - articleClientRect.x	 ) {
			this.#articleHTMLElement.classList.remove ( 'cyCursorRight' );
			this.#articleHTMLElement.classList.add ( 'cyCursorLeft' );
		}
		else {
			this.#articleHTMLElement.classList.remove ( 'cyCursorLeft' );
			this.#articleHTMLElement.classList.add ( 'cyCursorRight' );
		}
	}

	/**
	mouseleave on the article event handler
	*/

	onMouseLeaveArticle ( ) {
		this.#articleHTMLElement.classList.remove ( 'cyCursorRight' );
		this.#articleHTMLElement.classList.remove ( 'cyCursorLeft' );
	}

	/**
	click on the article event handler. Show the next or previous article depending of the click position
	*/

	onMouseClickArticle ( mouseClickEvent ) {
		let articleClientRect = this.#articleHTMLElement.getBoundingClientRect ( );
		this.showNextArticle (
			( articleClientRect.width / TWO > mouseClickEvent.clientX - articleClientRect.x )
				?
				SlideShowDirection.backward
				: SlideShowDirection.forward
		);
	}

	/**
	Show the next article
	@param{Number} direction The direction to follow for the next article. See the SlideShowDirection enum for possible values
	*/

	showNextArticle ( direction ) {

		// Clearing the timer
		if ( this.#timerId ) {
			window.clearTimeout ( this.#timerId );
			this.#timerId = null;
		}

		// Adaptation of the direction
		this.#direction = SlideShowDirection.noChange === direction ? this.#direction : direction;

		// updating the index
		this.#slideShowIndex += this.#direction;

		// exit if the first image was reached in case of backward direction
		if ( SlideShow.#INVALID_INDEX === this.#slideShowIndex ) {
			this.stop ( );
			return;
		}

		// exit if the last image was reached in case of forward direction
		if ( this.#slideShowIndex === this.#slideShowData.length ) {
			this.stop ( );
			return;
		}

		// searching the current image data
		const currentSlideShowData = this.#slideShowData [ this.#slideShowIndex ];

		// Computing the image legend
		let legend =
			currentSlideShowData.getAttribute ( 'cat' ) +
			', ' +
			currentSlideShowData.getAttribute ( 'date' );

		// Adapting the image
		this.#slideShowImgHTMLElement.src = currentSlideShowData.getAttribute ( 'src' );
		this.#slideShowImgHTMLElement.title = legend;
		this.#slideShowImgHTMLElement.alt = legend;
		this.#slideShowImgHTMLElement.className = currentSlideShowData.getAttribute ( 'class' );

		// Adapting the legend HTMLElement
		this.#slideShowLegendHTMLElement.innerText = legend;

		// Adapting exif data
		let exifData = currentSlideShowData.getAttribute ( 'exif' );
		this.#slideShowExifHTMLElement.innerText = exifData ? exifData : '';

		// Restarting the timer if the slide show is not paused by the user
		if ( ! this.#paused ) {
			this.#timerId = setTimeout (
				( ) => this.showNextArticle ( SlideShowDirection.noChange ),
				this.#duration );
		}
	}

	/**
	Start the slide show
	*/

	async start ( ) {

		// waiting fullscreen
		await document.body.requestFullscreen ();

		// adapting the document
		document.addEventListener ( 'keydown', this.#keyDownEL, true );
		document.body.classList.add ( 'slideShow' );
		document.body.appendChild ( this.#backgroundHTMLElement );

		// Showing the first image
		this.showNextArticle ( SlideShowDirection.forward );
	}

	/**
	Pause or restart the slide show timer
	*/

	pause ( ) {

		if ( this.#timerId ) {

			// Clearing the timer if any.
			window.clearTimeout ( this.#timerId );
			this.#timerId = null;
			this.#paused = true;
		}
		else {

			// Restarting the timer if disabled previously
			this.#paused = false;
			this.showNextArticle ( SlideShowDirection.noChange );
		}
	}

	/**
	Stop the slide show
	*/

	async stop ( ) {

		// Clearing the timer
		if ( this.#timerId ) {
			window.clearTimeout ( this.#timerId );
			this.#timerId = null;
		}

		// adapting the document
		document.removeEventListener ( 'keydown', this.#keyDownEL, true );
		document.body.classList.remove ( 'slideShow' );
		document.body.removeChild ( this.#backgroundHTMLElement );

		// reset of variables
		this.#paused = false;
		this.#direction = SlideShowDirection.forward;
		this.#slideShowIndex = SlideShow.#INVALID_INDEX;

		// exit fullscreen if needed
		if ( document.fullscreenElement ) {
			await document.exitFullscreen ();
		}
	}
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
The one and only one instance of SlideShow  class
@type {SlideShow }
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

const theSlideShow = new SlideShow ( );

export default theSlideShow;

/* --- End of file --------------------------------------------------------------------------------------------------------- */