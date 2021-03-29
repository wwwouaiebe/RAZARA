const INVALID_INDEX = -1;

const MIN_SLIDE_SHOW_DURATION = 2000;
const MAX_SLIDE_SHOW_DURATION = 30000;
const SLIDE_SHOW_INTERVAL = 1000;

let myBackgroundDiv = null;
let myArticles = null;
let myCurrentArticle = null;
let myArticleIndex = INVALID_INDEX;
let myTimerId = null;
let mySlideShowDuration = 10000;
let mySlideShowActive = false;
let myCloseButton = null;
let myClonedArticle = null;

function myCloseSlideShow ( ) {
	document.removeEventListener ( 'keydown', myOnKeyDown, true );
	document.body.removeChild ( myBackgroundDiv );
	document.body.classList.remove ( 'slideShow' );
	myBackgroundDiv = null;
	myArticles = null;
	myCurrentArticle = null;
	myArticleIndex = INVALID_INDEX;
	myTimerId = null;
	mySlideShowActive = false;
	myCloseButton = null;
	myClonedArticle = null;
}

function myShowNextSlide ( ) {
	if ( myCurrentArticle ) {
		myBackgroundDiv.removeChild ( myClonedArticle );
	}
	myArticleIndex ++;
	myCurrentArticle = myArticles.item ( myArticleIndex );
	if ( myCurrentArticle ) {
		myClonedArticle = myCurrentArticle.cloneNode ( true );
		myBackgroundDiv.appendChild ( myClonedArticle );
		myTimerId = setTimeout ( myShowNextSlide, mySlideShowDuration );
	}
	else {
		myCloseSlideShow ( );
	}
}

function myPauseSlideShow ( ) {
	if ( myTimerId ) {
		window.clearTimeout ( myTimerId );
		myTimerId = null;
	}
	mySlideShowActive = false;
}

function myOnKeyDown ( keyBoardEvent ) {
	switch ( keyBoardEvent.key ) {
	case 'Escape' :
	case 'Esc' :
		myCloseSlideShow ( );
		break;
	case '+' :
		mySlideShowDuration =
			MAX_SLIDE_SHOW_DURATION === mySlideShowDuration
				?
				MAX_SLIDE_SHOW_DURATION
				: mySlideShowDuration + SLIDE_SHOW_INTERVAL;
		break;
	case '-' :
		mySlideShowDuration =
			MIN_SLIDE_SHOW_DURATION === mySlideShowDuration
				?
				MIN_SLIDE_SHOW_DURATION
				:
				mySlideShowDuration - SLIDE_SHOW_INTERVAL;
		break;
	case 'ArrowDown' :
		console.log ( keyBoardEvent.key );
		if ( mySlideShowActive ) {
			myPauseSlideShow ( );
		}
		break;
	case 'ArrowUp' :
		console.log ( keyBoardEvent.key );
		if ( ! mySlideShowActive ) {
			mySlideShowActive = true;
			myShowNextSlide ( );
		}
		break;
	case 'ArrowRight' :
		if ( mySlideShowActive ) {
			if ( myTimerId ) {
				window.clearTimeout ( myTimerId );
				myTimerId = null;
			}
			myShowNextSlide ( );
		}
		break;
	case 'ArrowLeft' :
		if ( mySlideShowActive ) {
			if ( myTimerId ) {
				window.clearTimeout ( myTimerId );
				myTimerId = null;
			}
			myShowNextSlide ( );
		}
		break;
	default :
		break;
	}
}

function onStartSlideShow ( ) {
	document.removeEventListener ( 'keydown', myOnKeyDown, true );
	document.addEventListener ( 'keydown', myOnKeyDown, true );
	document.body.classList.add ( 'slideShow' );
	myBackgroundDiv = document.createElement ( 'div' );
	document.body.appendChild ( myBackgroundDiv );
	myCloseButton = document.createElement ( 'div' );
	myCloseButton.innerText = '❌';
	myCloseButton.addEventListener ( 'click', myCloseSlideShow );
	myBackgroundDiv.appendChild ( myCloseButton );
	myArticles = document.querySelectorAll ( 'section > article' );
	mySlideShowActive = true;
	myShowNextSlide ( );
}
console.log ( 'slideshow 19' );

export { onStartSlideShow };