const startBtn = document.getElementById("start");
const audio = document.querySelector("audio");

startBtn.addEventListener("click", start);
startBtn.addEventListener("mouseover", svistok);

function start() {
  const markup = `
	    <h3>boguslav pictures presents</h3>
    <div class="players">
      <div class="player pasha">
        <img src="images/pasha.png" alt="Pasha" />
      </div>
      <div class="stars">
		<img class="fuck" src="./images/FUCK (1).png" alt="Fuck" />
        <a href="teams.html"> <img class="stars-image" src="./images/stars.png" alt="Logo" /> </a>
		  <h1>CHAMPIONS LEAGUE</h1>
      </div>
      <div class="player sasha">
        <img src="images/sasha.png" alt="Sasha" />
      </div>
		    <audio src="audio/gimn.mp3" autoplay></audio>
    </div>
`;
  document.body.innerHTML = markup;
}
function svistok() {
  audio.play();
}
