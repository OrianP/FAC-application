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
// progress bar colors make this into classes!!!!
const colors = ["pink", "blue", "green", "red"];
// musicSection background gradients
const bgColor = ["pink-bg", "blue-bg", "green-bg", "red-bg"];
// musicContainer box shadows 
const boxShadow = ["pink-shadow", "blue-shadow", "green-shadow", "red-shadow"]; 

let songIndex = 0;
let prevIndex = songIndex -1;
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
    prevTheme(musicSection, bgColor);
    prevTheme(musicContainer, boxShadow);
    prevTheme (progress, colors);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    nextTheme(musicSection, bgColor);
    nextTheme(musicContainer, boxShadow);
    nextTheme (progress, colors);
    playSong();
}

function prevTheme(el, arr) {
    // Change background gradient 
    // Initial bg-color class is never removed but is overriden by CSS source order
    el.classList.add(`${arr[songIndex]}`);
    el.classList.remove(`${arr[songIndex + 1]}`);
    // Remove the last bg-color class when song index returns to zero in the prevSong function
    if (songIndex === 0) {
        el.classList.remove(`${arr[lastSongIndex]}`) 
    };
    
    console.log(el.className)
    console.log(songIndex);
} 

// function changeTheme (el, arr) {
//     el.classList.add(`${arr[songIndex]}`);
//     if (songIndex > prevIndex) { 
//         el.classList.remove(`${arr[prevIndex]}`)
//     } else {
//         el.classList.remove(`${arr[songIndex + 1]}`);
//     }
// };

function nextTheme (el, arr) {
    // Change background gradient 
    // Remove the class of the previous index
    el.classList.add(`${arr[songIndex]}`); 
    el.classList.remove(`${arr[songIndex -1]}`);
    // Remove the last bg-color class when song index returns to zero in the nextSong function
    if (songIndex === 0) {
        el.classList.remove(`${arr[lastSongIndex]}`) 
    };
    
    console.log(el.className);
    console.log(songIndex);
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



