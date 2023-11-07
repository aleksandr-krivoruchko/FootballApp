const player = document.querySelector(".music-player");
const musicAudio = document.querySelector(".audio");
const title = document.querySelector(".song");
const prevBtn = document.querySelector(".prev");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
const iconSrc = document.querySelector(".icon-src");

playBtn.addEventListener("click", () => {
  isPlaying = player.classList.contains("playing");

  !isPlaying ? playSong() : stopSong();
});
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

const songs = [
  "Linkin Park - Numb",
  "Eye Of The Tiger",
  "Jain - Makeba",
  "fast-lane-percussion",
  "Linkin Park - In The End",
  "stadium-drums-football",
  "trailer-sport-action",
];

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerHTML = song;
  musicAudio.src = `./audio/${song}.mp3`;
}

function playSong() {
  player.classList.add("playing");
  iconSrc.src = "./img/music/icons8-stop-64.png";
  musicAudio.play();
}

function stopSong() {
  player.classList.remove("playing");
  iconSrc.src = "./img/music/icons8-play-64.png";
  musicAudio.pause();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
