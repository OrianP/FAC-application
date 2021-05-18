// Banner
// constructor function for TypWriter object
const TypeWriter = function(txtElement, words, wait = 1500){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// type method
TypeWriter.prototype.type = function() {
    // current index of word
    const current = this.wordIndex % this.words.length;
    
    // get full text of word
    const fullTxt = this.words[current];
    
    // check if deleting
    if (this.isDeleting) {
        // remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // insert txt into element
    this.txtElement.innerHTML = `<h1 class="txt">${this.txt}</h1>`;

    // initial type speed
    let typeSpeed = 150;
    // check if deleting
    if (this.isDeleting) {
        // set the speed at which to delete chars
        typeSpeed -= 50; 
    } 

    // check if word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        // set a pause at end of word
        typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // type next line
        this.wordIndex++;
        // pause before typing next line
        typeSpeed = 400;
    }

    const id = setTimeout(() => this.type(), typeSpeed);
    console.log(id);
    // Trying to find a variable to compare the setTimeout function id to, so I don't have to hard code it to 68
    const wordsArrlength = this.words.toString().split('');
    console.log(wordsArrlength)
    if(id === 68) {
        clearTimeout(id);
    }
}

// initialize on DOM load 
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // init TypeWriter
    new TypeWriter(txtElement, words, wait);

}


// Music Player
const musicSection = document.querySelector(".music-section");
const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#song-title");
const cover = document.querySelector("#cover");

// song titles
const songs = ["Here We Are", "Dancing On The Floor", "Leave It Til Tomorrow", "When It Comes To Love"];
// progress bar color classes
const colors = ["pink", "blue", "green", "red"];
// musicSection background gradient classes
const bgColor = ["pink-bg", "blue-bg", "green-bg", "red-bg"];
// musicContainer box shadow classes
const boxShadow = ["pink-shadow", "blue-shadow", "green-shadow", "red-shadow"]; 

let songIndex = 0;
let lastSongIndex = songs.length - 1;

// load song info to DOM
loadSong(songs[songIndex]);

// load and update song title and media
function loadSong(song) {
    title.textContent = song;
    audio.src = `media/music/${song}.mp3`;
    cover.src = `media/images/${song}.jpg`;
}

// functions for play and pause btns
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
};

function pauseSong() {
    musicContainer.classList.remove("play");
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
    changeTheme (progress, colors);
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
    changeTheme (progress, colors);
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

// event listeners
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



