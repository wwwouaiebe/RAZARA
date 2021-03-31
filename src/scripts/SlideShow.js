const INVALID_INDEX = -1;

const MIN_SLIDE_SHOW_DURATION = 2000;
const MAX_SLIDE_SHOW_DURATION = 30000;
const SLIDE_SHOW_INTERVAL = 1000;
const DEFAULT_SLIDE_SHOW_DURATION = 10000;
const FORWARD = 1;
const BACKWARD = -1;

let myBackgroundDiv = null;
let myArticles = null;
let myCurrentArticle = null;
let myArticleIndex = INVALID_INDEX;
let myTimerId = null;
let myCloseButton = null;
let myClonedArticle = null;

let mySlideShow = {
	active : false,
	paused : false,
	duration : DEFAULT_SLIDE_SHOW_DURATION,
	forward : true
};

function myCloseSlideShow ( ) {
	if ( myTimerId ) {
		window.clearTimeout ( myTimerId );
		myTimerId = null;
	}
	document.removeEventListener ( 'keydown', myOnKeyDown, true );
	document.body.removeChild ( myBackgroundDiv );
	document.body.classList.remove ( 'slideShow' );
	myBackgroundDiv = null;
	myCloseButton = null;

	myArticles = null;
	myCurrentArticle = null;
	myClonedArticle = null;
	myArticleIndex = INVALID_INDEX;

	myTimerId = null;

	mySlideShow.active = false;
	mySlideShow.paused = false;
	mySlideShow.forward = true;
	sessionStorage.setItem ( 'slideShow', JSON.stringify ( mySlideShow ) );
}

function myShowNextSlide ( ) {
	if ( myCurrentArticle ) {
		myBackgroundDiv.removeChild ( myClonedArticle );
	}

	myArticleIndex += mySlideShow.forward ? FORWARD : BACKWARD;
	myCurrentArticle = myArticles.item ( myArticleIndex );
	if ( myCurrentArticle ) {
		myClonedArticle = myCurrentArticle.cloneNode ( true );
		myBackgroundDiv.appendChild ( myClonedArticle );
		if ( ! mySlideShow.paused ) {
			myTimerId = setTimeout ( myShowNextSlide, mySlideShow.duration );
		}
		mySlideShow.forward = true;
	}
	else {
		let paginationLink = document.querySelector (
			mySlideShow.forward ? '#cyPaginationPrevious > a' : '#cyPaginationNext > a' );
		if ( paginationLink ) {
			sessionStorage.setItem ( 'slideShow', JSON.stringify ( mySlideShow ) );
			paginationLink.click ( );
		}
		else {
			myCloseSlideShow ( );
		}
	}
}

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
	case 'ArrowDown' :
		if ( myTimerId ) {
			window.clearTimeout ( myTimerId );
			myTimerId = null;
		}
		mySlideShow.paused = true;
		break;
	case 'ArrowUp' :
		if ( mySlideShow.paused ) {
			mySlideShow.paused = false;
			myShowNextSlide ( );
		}
		break;
	case 'ArrowRight' :
		if ( myTimerId ) {
			window.clearTimeout ( myTimerId );
			myTimerId = null;
		}
		myShowNextSlide ( );
		break;
	case 'ArrowLeft' :
		if ( myTimerId ) {
			window.clearTimeout ( myTimerId );
			myTimerId = null;
		}
		mySlideShow.forward = false;
		myShowNextSlide ( );
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
	myArticleIndex = mySlideShow.forward ? INVALID_INDEX : myArticles.length;
	mySlideShow.active = true;
	myShowNextSlide ( );
}

mySlideShow = JSON.parse ( sessionStorage.getItem ( 'slideShow' ) ) || mySlideShow;

if ( mySlideShow.active ) {
	onStartSlideShow ( );
}

export { onStartSlideShow };