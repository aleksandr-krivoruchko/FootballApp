const startBtn = document.getElementById("start");
const audio = document.querySelector("audio");

startBtn.addEventListener("click", start);
startBtn.addEventListener("mouseover", svistok);

function start() {
  const markup = `
	    <h1>boguslav champions league</h1>
    <div class="players">
      <div class="player pasha">
        <img src="./img/pasha.png" alt="Pasha" />
      </div>
      <div class="stars">
        <a href="./teams.html"> <img src="./img/stars.png" alt="Logo" /> </a>
      </div>
      <div class="player sasha">
        <img src="./img/sasha.png" alt="Sasha" />
      </div>
		    <audio src="./audio/gimn.mp3" autoplay></audio>

    </div>
`;
  document.body.innerHTML = markup;
}
function svistok() {
  audio.play();
}
