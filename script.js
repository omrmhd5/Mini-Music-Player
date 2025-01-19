const songsList = [
  {
    name: "Mabetghebsh",
    artist: "Amr Diab",
    src: "assets/Mabetghebsh.mp3",
    cover: "assets/Mabetghebsh-cover.jpg",
  },
  {
    name: " Rohi Wakhdani",
    artist: "Assala Nasri",
    src: "assets/Rohi_Wakhdani.mp3",
    cover: "assets/Rohi-Wakhdani-Cover.png",
  },
  {
    name: "Law Ashkany",
    artist: "Amr Diab",
    src: "assets/Law_Ashkany.mp3",
    cover: "assets/Law-Ashkany-Cover.jpeg",
  },
  {
    name: "Inta El Haz",
    artist: "Amr Diab",
    src: "assets/Inta_El_Haz.mp3",
    cover: "assets/Inte-el-Haz-coverjpeg.jpeg",
  },
  {
    name: "Aslaha Betefrea",
    artist: "Amr Diab",
    src: "assets/Aslaha_Betefrea.mp3",
    cover: "assets/Aslaha-Betefrea-cover.jpg",
  },
  {
    name: "Ya Aalem",
    artist: "Assala Nasri",
    src: "assets/Ya-Aallem.mp3",
    cover: "assets/Ya-Aalem-Cover.jpeg",
  },
];

const artistName = document.querySelector(".artist-name");
const musicName = document.querySelector(".song-name");
const fillBar = document.querySelector(".fill-bar");
const time = document.querySelector(".time");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const prog = document.querySelector(".progress-bar");

let song = new Audio();
let currentSong = 1;
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
  loadSong(currentSong);

  song.addEventListener("timeupdate", updateProgress);
  song.addEventListener("ended", nextSong);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  playBtn.addEventListener("click", togglePlayPause);
  prog.addEventListener("click", seek);

  artistName.textContent = songsList[currentSong].artist;
  musicName.textContent = songsList[currentSong].name;
  cover.src = songsList[currentSong].cover;
});

function loadSong(index) {
  const { name, artist, src, cover: thumb } = songsList[index];
  artistName.innerText = artist;
  musicName.innerText = name;
  song.src = src;
  cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
  if (song.duration) {
    const pos = (song.currentTime / song.duration) * 100;
    fillBar.style.width = `${pos}%`;

    const duration = formatTime(song.duration);
    const currentTime = formatTime(song.currentTime);
    time.innerText = `${currentTime} - ${duration}`;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function togglePlayPause() {
  if (playing) {
    song.pause();
  } else {
    song.play();
  }
  playing = !playing;
  playBtn.classList.toggle("fa-pause", playing);
  playBtn.classList.toggle("fa-play", !playing);
  cover.classList.toggle("active", playing);
}

function nextSong() {
  currentSong = (currentSong + 1) % songsList.length;
  playMusic();
}

function prevSong() {
  currentSong = (currentSong - 1 + songsList.length) % songsList.length;
  playMusic();
}

function playMusic() {
  loadSong(currentSong);
  song.play();
  playing = true;
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play");
  cover.classList.add("active");
}

function seek(e) {
  const pos = (e.offsetX / prog.clientWidth) * song.duration;
  song.currentTime = pos;
}
