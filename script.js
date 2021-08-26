// Intro //

// intro section 
// const intro = document.querySelector('.intro');
// const introContent = document.querySelector('.intro-content');
// console.log({introContent});

// document.addEventListener('DOMContentLoaded', () => {
//     // hide scroll bar on body
//     document.body.style.overflowY = 'hidden';
//     // fade intro content in
//     introContent.classList.add('fade-in');

//     // fade and transition the intro content up
//     setTimeout(() => { 
//             introContent.classList.add('fade-out', 'translate-up') 
//     }, 10900);

//     // fade and transition the intro div up
//     setTimeout(() => {
//         intro.classList.add('translate-up');
//         // show scroll bar on main site 
//         document.body.style.overflowY = 'visible';
//     }, 11080);
// })

// Intro //
const phrases = ['Hello Founders and Coders', 'My name is Orian'];
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = '';
let letter = '';
let isDeleting = false;
// initial typing speed used as the setTimeout delay parameter 
let typeSpeed = 150;

// Immediately invoked function
(function typeEffect () {
    currentPhrase = phrases[phraseIndex];
    // Check if we are on the last phrase in the array and keep it displayed on screen instead of deleting
    if (phraseIndex === phrases.length - 1) {
        isDeleting = false;
    }

    if (isDeleting) {
    // remove character at faster typing speed
        typeSpeed = 100
        letter = currentPhrase.substring(0, --letterIndex);

    } else {
    //  add character at initial typing speed
        typeSpeed = 150;
        letter = currentPhrase.substring(0, ++letterIndex);
    }

    // select the h1 element with a class of 'intro-text' and update it's text content to display the letter
    document.querySelector('.intro-text').textContent = letter;

    // if the phrase typing is complete, start removing characters by setting isDeleting to true
    if (letter.length === currentPhrase.length) {
        // pause before deleting characters
        typeSpeed = 800
        isDeleting = true; 
    };
    
    // if the deletion of characters is complete, move on to the next phrase by incrementing phraseIndex and reset letterIndex to type characters from index 0 of the next phrase. Set isDeleting back to false. 
    if(isDeleting && letter === '') {
        phraseIndex++;
        letterIndex = 0;
        isDeleting = false; 
        // pause before typing next phrase
        typeSpeed = 800   
    }
    // console.log(typeSpeed);
    // console.log(setTimeout.id);
    setTimeout(typeEffect, typeSpeed); 
}());

// Navigation //

// select hamburger button
const hamburger = document.querySelector('.hamburger');

// the menu is expanded by default for progressive enhancement (if JS is disabled in the user's browser)
// if JS is enabled in the browser, add the classlist 'js-enabled' to the document body to hide the menu items (see css line 106)
document.body.classList.remove('js-disabled');
document.body.classList.add('js-enabled');

// Event listeners 

// collapse the hamburger menu on page load when JS is enabled (code will not run if JS is disabled) 
document.addEventListener('DOMContentLoaded', () => {
    hamburger.setAttribute('aria-expanded', 'false');
});

hamburger.addEventListener('click', () => {
    toggleAriaExpanded(hamburger);
})

// if user resizes screen while menu is expanded, collapse the hamburger menu when the width of the window exceeds 1024px 
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        hamburger.setAttribute('aria-expanded', 'false');
    }
})

// toggle the aria expanded attribute
// CSS rules define the element display based on this attribute
// if the element is expanded, collapse it. else, if it is collapsed, expand it
function toggleAriaExpanded(el) {
    if (el.getAttribute('aria-expanded') === 'true'){
        el.setAttribute('aria-expanded', false);
    } else {
        el.setAttribute('aria-expanded', true);
    } 
}




// Site Wide Text Content //
// specific p elements have a default 'reveal' class in markup for js-disabled browsers
// if js is enabled, those p elements are hidden on page load

// nodelist of all p elements with class 'text-reveal
const pElements = document.querySelectorAll('.text-reveal');
// nodelists of p elements with class 'text-reveal' per section
const aboutPs = document.querySelectorAll('.about .text-reveal');
const applicationPs = document.querySelectorAll('.application .text-reveal');
const backgroundPs = document.querySelectorAll('.music-section .text-reveal');
 
// nodelist of all buttons with class 'text-btn'
const txtBtns = document.querySelectorAll('.text-btn');
// nodelists of all buttons with class 'text-btn' per section
const aboutBtn = document.querySelector('.about .text-btn');
const applicationBtn = document.querySelector('.application .text-btn');
const backgroundBtn = document.querySelector('.music-section .text-btn');

// hide all p elements on DOM content load
document.addEventListener('DOMContentLoaded', () => {
    pElements.forEach(p => p.classList.add('text-hide'))
})

// toggle the transform:rotate property on all textBtns via the aria-expanded attribute  
txtBtns.forEach(btn => { 
    btn.addEventListener('click', (event) => {
        toggleAriaExpanded(event.currentTarget); 
})})

// add click event listener to each button to toggle the 'reveal' class on relevant paragraphs
aboutBtn.addEventListener('click', () => toggleText(aboutPs));

applicationBtn.addEventListener('click', () => toggleText(applicationPs));

backgroundBtn.addEventListener('click', () => toggleText(backgroundPs));

function toggleText (pNodes) {
    pNodes.forEach(p => p.classList.toggle('text-hide'))
}

// refactor event listeners on each text btn into one 
// how to write a reusable function that selects only the paragraphs that are siblings of the parent of the button to only hide and show those when btn is clicked?  


// Projects //

const tagContainer = document.querySelector('.tag-container');
const projects = document.querySelector('.projects');
const btnNext = document.querySelector('.next-btn');
const btnPrev = document.querySelector('.prev-btn');
const cardsContainer = document.querySelector('.project-cards-container');
const cards = document.querySelectorAll('.card');
// For mobile: clone first and last card to be appended in media query
const firstCardClone = cardsContainer.children[0].cloneNode(true);
const lastCardClone = cardsContainer.children[cardsContainer.children.length - 1].cloneNode(true);
// For desktop: create an array from the cards Nodelist and clone each card to be appended in media query
const desktopClones = Array.from(cards, card => 
    card.cloneNode(true));
// remove tabindex from buttons and anchor tags on clones so that users don't need to tab through the cards twice
desktopClones.forEach(clone => {
    const tabElements = clone.querySelectorAll('a, button');
    tabElements.forEach(el => el.setAttribute('tabindex', '-1'))
})

let currentCardIndex = 1;
let cardWidth = cards[0].clientWidth;
let lastCardIndex;
let cardBtns;
let cardLinks;

// set CSS variable for the tag-container-height dynamically to use in calc function (see CSS line 228)
projects.style.setProperty('--tag-container-height', `${tagContainer.clientHeight}px`);

// set initial cardsContainer position to show the real first card (not the clone) which is now at index 1
// cardsContainer.style.transform = `translateX(-${cardWidth}px)`;

// Event Listeners 

btnNext.addEventListener('click', () => {    
    if (currentCardIndex < lastCardIndex) {
        currentCardIndex++;
        transitionCard(currentCardIndex, cardWidth);
        
        console.log(cardsContainer.style.transform);
        console.log({currentCardIndex});
        console.log({lastCardIndex})
    }
})

btnPrev.addEventListener('click', () => {
    // the initial currentCardIndex is set to 1 in global scope therefore the first if statement transition function will run and the currentCardIndex will be decremented to 0, which will cause the transitionend event listener to fire 
    if (currentCardIndex > 0) {
        currentCardIndex--;
        transitionCard(currentCardIndex, cardWidth);

        console.log(cardsContainer.style.transform);
        console.log({currentCardIndex});
        console.log({lastCardIndex})
    }
})

// event listener that fires at the end of the CSS transition
cardsContainer.addEventListener('transitionend', () => {
    // when the card at index 0 (which is a clone of the last card) is reached: remove the transition duration class, update the currentCardIndex to the last real card (last clone index - 1) and update the transform property to jump to the card at currentCardIndex
    if(currentCardIndex === 0) {
        cardsContainer.classList.remove('card-transition');
        currentCardIndex = lastCardIndex - 1;
        cardsContainer.style.transform = `translateX(-${currentCardIndex * cardWidth}px)`;
        
        console.log({lastCardIndex, currentCardIndex}); 
        console.log(cardsContainer.style.transform);
}

    if(currentCardIndex === lastCardIndex) {
    // when the last card (which is a clone of the first card) is reached: remove the transition duration class, update the currentCardIndex to the first real card (at index 1) and update the transform property to jump to the card at currentCardIndex
        cardsContainer.classList.remove('card-transition');
        currentCardIndex = 1;
        cardsContainer.style.transform = `translateX(-${currentCardIndex * cardWidth}px)`;

        console.log({lastCardIndex, currentCardIndex}); 
        console.log(cardsContainer.style.transform);
}
})

// Functions

const transitionCard = (index, width) => {
    cardsContainer.classList.add('card-transition');
    cardsContainer.style.transform = `translateX(-${index * width}px)`;
}

// open a link from a list of links at a given index in a new tab
// set opener property to null to prevent tabnabbing 
const openLink = (linkList, index) => {
    window.open(linkList[index], '_tab').opener = null;
} 

// Media query for desktop screens //

// matchMedia() method returns a new MediaQueryList object used to check if the document matches the media query string
// assign the result of matchMedia to the variable mq
const mq = window.matchMedia('(min-width: 1024px)');

// the matches property returns true or false depending on whether the document matches the media query string or not
// function to execute based on the matches property return value 
const handleDesktopScreen = (e) => {
    if (e.matches) {
        cardsContainer.classList.add('desktop');
        // remove mobile clones on window resize
        if (cardsContainer.classList.contains('mobile')) {
            firstCardClone.remove();
            lastCardClone.remove();
        }
        // total width to disply three cards with 2rem left and right margins
        cardWidth = ((cards[0].clientWidth + 64) * 3);
        // set translate position to first three real cards
        cardsContainer.style.transform = `translateX(-${cardWidth}px)`;
        // spread desktop clones array and append to the cardsContainer 
        cardsContainer.append(...desktopClones);
        // update lastCardIndex to transition correctly:
        // displaying 3 cards at a time with 2 sets of real cards and 1 set of clones on either side to create the infinite slider effect 
        lastCardIndex = 3; 
        
        console.log('desktop');
        console.log({lastCardIndex}); 
        console.log({currentCardIndex});
        console.log({cardWidth});
        console.log(cardsContainer.style.transform);
        console.log(cardsContainer.children);

        // project cards buttons
        // select btns and links from real cards and clones
        cardBtns = document.querySelectorAll('.live-btn, .code-btn');
        cardLinks = document.querySelectorAll('.btn-container a');
        // add event listener to each btn to open the link at the same index as btn
        cardBtns.forEach((btn, index) => btn.addEventListener('click', () => openLink(cardLinks, index)));

        // Music Player media query
        // prepend square artwork to music info container, only visible when 'play' button is clicked
        const musicInfo = document.querySelector('.music-info');
        const squareCoverContainer = document.querySelector('.artwork-container-square');
        musicInfo.prepend(squareCoverContainer);


     } else {        
        cardsContainer.classList.add('mobile'); 
        // remove desktop clones on window resize
        if (cardsContainer.classList.contains('desktop')) {
            desktopClones.forEach(clone => clone.remove());
        }
        // reset card width back to one card's width when user resizes screen 
        cardWidth = cards[0].clientWidth; 
        // set translate position to first real card position
        cardsContainer.style.transform = `translateX(-${cardWidth}px)`;
        // insert mobile clones at beginning and end of cardsContainer
        cardsContainer.insertBefore(lastCardClone, cardsContainer.children[0]);
        cardsContainer.appendChild(firstCardClone);
        // index of last clone card after clones have been inserted
        lastCardIndex = cardsContainer.children.length - 1; // expected: 7
        console.log('mobile');
        console.log({lastCardIndex}); 
        console.log({currentCardIndex});
        console.log({cardWidth});
        console.log(cardsContainer.style.transform);
        console.log(cardsContainer.children);

        // project cards buttons
        // select btns and links from real cards and clones
        cardBtns = document.querySelectorAll('.live-btn, .code-btn');
        cardLinks = document.querySelectorAll('.btn-container a');
        // add event listener to each btn to open the link at the same index as btn
        cardBtns.forEach((btn, index) => btn.addEventListener('click', () => openLink(cardLinks, index)));
        
        // Music Player media query
        // prepend square artwork to music player container to be visible at all times
        const squareCoverContainer = document.querySelector('.artwork-container-square');
        const musicPlayer = document.querySelector('.music-player');
        musicPlayer.prepend(squareCoverContainer);
     }
    }

// attach event listener to MediaQueryList object for changes in screen size 
mq.addEventListener('change', handleDesktopScreen);
// call the function for initial screen size check on document load
handleDesktopScreen(mq);


// Music Player //
const musicSection = document.querySelector('.music-section');
const musicPlayer = document.querySelector('.music-player');
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#song-title');
const squareCover = document.querySelector('#square-cover')
const cover = document.querySelector('#cover');

// song titles
const songs = ['Here We Are', 'Dancing on the Floor', 'Leave It Til Tomorrow', 'When It Comes To Love'];
// progress bar color classes
const colors = ['pink', 'blue', 'green', 'red'];
// musicSection background gradient classes
const bgColor = ['pink-bg', 'blue-bg', 'green-bg', 'red-bg'];
// musicContainer box shadow classes
const boxShadow = ['pink-shadow', 'blue-shadow', 'green-shadow', 'red-shadow']; 

let songIndex = 0;
let lastSongIndex = songs.length - 1;

// load song info to DOM
loadSong(songs[songIndex]);

// load and update song title and media
function loadSong(song) {
    title.textContent = song;
    audio.src = `media/music/${song}.mp3`;
    cover.src = `media/images/${song}.jpg`;
    squareCover.src = `media/images/${song}.jpg`;
}

// functions for play and pause btns
function playSong() {
    musicContainer.classList.add("play");
    musicPlayer.classList.add("play");
    musicSection.classList.add(`${bgColor[songIndex]}`);
    musicContainer.classList.add(`${boxShadow[songIndex]}`);
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
};

function pauseSong() {
    musicContainer.classList.remove("play");
    musicPlayer.classList.remove("play");
    musicSection.classList.remove(`${bgColor[songIndex]}`);
    musicContainer.classList.remove(`${boxShadow[songIndex]}`);
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause();
};

// functions for prev and next btns
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    changeTheme(musicSection, bgColor);
    changeTheme(musicContainer, boxShadow);
    changeTheme(progress, colors);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    changeTheme(musicSection, bgColor);
    changeTheme(musicContainer, boxShadow);
    changeTheme(progress, colors);
    playSong();
}

function changeTheme (el, arr) {
// Variables to hold the prev and next song indices based on the updated songIndex in prevSong and nextSong functions
    let prevIndex = songIndex - 1;
    let nextIndex = songIndex + 1;
// Add the class correlating to the songIndex in the provided array
// Remove the previous and next index classes 
    el.classList.add(`${arr[songIndex]}`);
    el.classList.remove(`${arr[prevIndex]}`, `${arr[nextIndex]}`)
// When we reach songIndex 0 again, remove the last class in the array. This functionality is for the nextBtn
    if (songIndex === 0) {
        el.classList.remove(`${arr[lastSongIndex]}`) 
    };
    // console.log(songIndex);
    // console.log(prevIndex);
    // console.log(nextIndex);
    // console.log(el.className);
};
        
function updateProgress (e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

}

function setProgress (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners 

// play and pause btns
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// prev and next btns
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// progress bar 
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

// play next song when current song ends
audio.addEventListener('ended', nextSong);


// Coding Journey //
const openModalBtns = document.querySelectorAll('[aria-controls]');
const closeModalBtns = document.querySelectorAll('.modal-close-btn');
const modals = document.querySelectorAll('.modal');
console.log(modals);

// event listeners
// create targetModal variable based on the string returned from 'aria-controls' attribute set on buttons
// the string returned is the id of the modal (i.e #css-cert-modal)
openModalBtns.forEach(btn => btn.addEventListener('click', () => {
     const targetModal = document.querySelector(btn.getAttribute('aria-controls'));
     openModal(targetModal);
    //  close modal if clicked anywhere besides close button 
     targetModal.addEventListener('click', () => {
     closeModal(targetModal);
})
}));

closeModalBtns.forEach(btn => btn.addEventListener('click', () => {
    const targetModal = document.querySelector(btn.getAttribute('aria-controls'));
    closeModal(targetModal); 
}));

// functions
const openModal = (modal) => {
    modal.classList.add('active');
}

const closeModal = (modal) => {
    modal.classList.remove('active');
}

// Pre Requisites //
const profileCards = document.querySelectorAll('.overflow-container');
const profileLinks = document.querySelectorAll('.profile-link');

// for each profile card, open the link at the same index as card
profileCards.forEach((card, index) => card.addEventListener('click', () => {
    openLink(profileLinks, index);
    }
));

// change cursor style to pointer when user hovers on profile card
profileCards.forEach((card) => card.addEventListener('mouseover', () => changeCursor(card)));

// change cursor style to pointer
const changeCursor = (el) => {
    el.classList.add('pointer-cursor');
}

// Test
// const darkModeBtn = document.querySelector('.dark-mode');

// darkModeBtn.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');   
// });


