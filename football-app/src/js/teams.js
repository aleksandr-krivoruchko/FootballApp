const source = {
  groups: ["a", "b", "c", "d", "e", "f", "g", "h"],
  teams: [
    {
      id: 1,
      group: "a",
      name: "Бавария",
      logo: "./images/logo/bayern.png",
    },
    {
      id: 2,
      group: "a",
      name: "Галатасарай",
      logo: "./images/logo/gala.png",
    },
    {
      id: 3,
      group: "a",
      name: "Манчестер Юнайтед",
      logo: "./images/logo/mu.png",
    },
    {
      id: 4,
      group: "a",
      name: "Копенгаген",
      logo: "./images/logo/København.png",
    },
    {
      id: 5,
      group: "b",
      name: "Арсенал",
      logo: "./images/logo/arsenal.png",
    },
    {
      id: 6,
      group: "b",
      name: "Ланс",
      logo: "./images/logo/lens.png",
    },
    {
      id: 7,
      group: "b",
      name: "Севилья",
      logo: "./images/logo/sev.png",
    },
    {
      id: 8,
      group: "b",
      name: "ПСВ",
      logo: "./images/logo/psv.png",
    },
    {
      id: 9,
      group: "c",
      name: "Реал Мадрид",
      logo: "./images/logo/real.png",
    },
    {
      id: 10,
      group: "c",
      name: "Наполи",
      logo: "./images/logo/napoli.png",
    },
    {
      id: 11,
      group: "c",
      name: "Брага",
      logo: "./images/logo/braga.png",
    },
    {
      id: 12,
      group: "c",
      name: "Юнион Берлин",
      logo: "./images/logo/ub.png",
    },
    {
      id: 13,
      group: "d",
      name: "Реал Сосьедад",
      logo: "./images/logo/realsos.png",
    },
    {
      id: 14,
      group: "d",
      name: "Интер",
      logo: "./images/logo/inter.png",
    },
    {
      id: 15,
      group: "d",
      name: "Зальцбург",
      logo: "./images/logo/salcb.png",
    },
    {
      id: 16,
      group: "d",
      name: "Бенфика",
      logo: "./images/logo/benf.png",
    },
    {
      id: 17,
      group: "e",
      name: "Фейенорд",
      logo: "./images/logo/fey.png",
    },
    {
      id: 18,
      group: "e",
      name: "Атлетико Мадрид",
      logo: "./images/logo/atlet.png",
    },
    {
      id: 19,
      group: "e",
      name: "Лацио",
      logo: "./images/logo/lazio.png",
    },
    {
      id: 20,
      group: "e",
      name: "Селтик",
      logo: "./images/logo/celtic.png",
    },
    {
      id: 21,
      group: "f",
      name: "ПСЖ",
      logo: "./images/logo/psg.png",
    },
    {
      id: 22,
      group: "f",
      name: "Боруссия Дортмунд",
      logo: "./images/logo/bor.png",
    },
    {
      id: 23,
      group: "f",
      name: "Ньюкасл",
      logo: "./images/logo/nc.png",
    },
    {
      id: 24,
      group: "f",
      name: "Милан",
      logo: "./images/logo/milan.png",
    },
    {
      id: 25,
      group: "g",
      name: "Манчестер Сити",
      logo: "./images/logo/mc.webp",
    },
    {
      id: 26,
      group: "g",
      name: "Лейпциг",
      logo: "./images/logo/leip.webp",
    },
    {
      id: 27,
      group: "g",
      name: "Янг Бойз",
      logo: "./images/logo/yb.png",
    },
    {
      id: 28,
      group: "g",
      name: "Црвена Звезда",
      logo: "./images/logo/crvena.png",
    },
    {
      id: 29,
      group: "h",
      name: "Барселона",
      logo: "./images/logo/barca.png",
    },
    {
      id: 30,
      group: "h",
      name: "Порту",
      logo: "./images/logo/porto.png",
    },
    {
      id: 31,
      group: "h",
      name: "Шахтер",
      logo: "./images/logo/shachtar.png",
    },
    {
      id: 32,
      group: "h",
      name: "Антверпен",
      logo: "./images/logo/ant.png",
    },
  ],
};
const tableHeader = `<tr class="col">
		<th>Команда</th>
		<th>Матчи</th>
		<th>Победы</th>
		<th>Ничьи</th>
		<th>Проигр.</th>
		<th>Забито</th>
		<th>Проп.</th>
		<th>Очки</th>
		<th>Игрок</th>
		</tr>`;

let data = null;
const root = document.querySelector(".root");

document.addEventListener("keydown", function (e) {
  if (e.code === "Escape") {
    closeModal();
  }
});

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};
const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

function showToast(message, position, type) {
  const toast = document.getElementById("toast");
  toast.className = toast.className + " show";
  if (message) toast.innerText = message;
  if (position !== "") toast.className = toast.className + ` ${position}`;
  if (type !== "") toast.className = toast.className + ` ${type}`;

  setTimeout(function () {
    toast.className = toast.className.replace(" show", "");
  }, 3000);
}

if (localStorage.length === 0) {
  save("data", source);
  data = Object.assign({}, source);
  showToast(
    "Кликните на группу и распределите между собой команды)))",
    "top",
    "success"
  );

  renderTable();

  data.groups.forEach((gr) => {
    renderGroup(gr);
    const rounds = roundRobin(filteredTeamsNameByGroup(gr));
    const matches = load(`matches-${gr}`);
    !matches && save(`matches-${gr}`, rounds);
    checkWinner();
  });
} else {
  data = load("data");
  renderTable();
  document.body.addEventListener("dblclick", function () {
    audio.play();
  });

  data.groups.forEach((gr) => {
    renderGroup(gr);
    const rounds = roundRobin(filteredTeamsNameByGroup(gr));
    const matches = load(`matches-${gr}`);

    !matches && save(`matches-${gr}`, rounds);
    renderMatches(gr);
    checkWinner();
  });
}

function filteredTeamsNameByGroup(group) {
  return data.teams.filter((t) => t.group === group).map((t) => t.name);
}

function renderTable() {
  const markup = data.groups.map((gr) => {
    const teams = data.teams.filter((t) => t.group === gr).map((t) => t.name);
    return `<div class="group" >
      <div>
		<h3 class="heading">Группа <span>${gr}</span></h3>
      <table data-group="${gr}">
		${tableHeader}
      </table>
		 <div class="modal" data-modal="table">
		<div class="modal-content">
        <form>
          <ul>
			 ${teams.map((t) => t)}
				</ul>
				<button type="submit" class="btn table-btn">OK</button>
        </form>
		</div>
		</div>
		</div>
		<ul data-list="${gr}">
		</ul>
		</div>
		`;
  });

  root.insertAdjacentHTML("beforeend", markup.join(""));
}

function renderGroup(group) {
  const stats = load("stats");
  const arr = data.teams.filter((t) => t.group === group);
  arr.map((t) => {
    const q = stats?.find((i) => i.team === t.name);
    t.points = q?.points || 0;
    t.goals = q?.goals.for - q?.goals.against || 0;
  });
  const sortedTeamsByPoints = [...arr].sort((a, b) => {
    const numDif = b?.points - a?.points;
    if (numDif === 0) {
      return b?.goals - a?.goals;
    } else {
      return numDif;
    }
  });

  const markup = sortedTeamsByPoints.map((t) => {
    const q = stats?.find((i) => i.team === t.name);
    return `<tr data-team="${t.name}">
  		<td class="team-logo"><image src="${t.logo}" width="35px" /><p>${
      t.name
    }</p></td>
  		<td>${q ? q.played : "-"}</td>
  		<td style="color:#49ff18">${q ? q.win : "-"}</td>
  		<td style="color:orange">${q ? q.draw : "-"}</td>
  		<td style="color:red">${q ? q.lose : "-"}</td>
  		<td>${q ? q.goals.for : "-"}</td>
  		<td>${q ? q.goals.against : "-"}</td>
  		<td class="points">${q ? q.points : "-"}</td>
  		<td>${t.player || "-"}</td>
  		</tr>`;
  });
  const table = document.querySelector(`table[data-group="${group}"]`);
  table.innerHTML = [...tableHeader, ...markup].join("");

  table.addEventListener("click", tableModalOpen);
}

function roundRobin(teams) {
  let schedule = [];
  let league = teams.slice();

  if (league.length % 2) {
    league.push("None");
  }

  let rounds = league.length;

  for (let j = 0; j < (rounds - 1) * 2; j++) {
    schedule[j] = [];
    for (let i = 0; i < rounds / 2; i++) {
      if (league[i] !== "None" && league[rounds - 1 - i] !== "None") {
        if (j % 2 == 1) {
          schedule[j].push([league[i], league[rounds - 1 - i]]);
        } else {
          schedule[j].push([league[rounds - 1 - i], league[i]]);
        }
      }
    }
    league.splice(1, 0, league.pop());
  }

  const matches = [];

  schedule.map((m) =>
    m.map((r) => {
      const z = {
        match: [r[0], r[1]],
        score: ["", ""],
        finished: false,
      };
      matches.push(z);
    })
  );

  return matches;
}

function renderMatches(group) {
  const matches = load(`matches-${group}`);

  const markup = matches.map((t) => {
    const scoreHome = t.score[0];
    const scoreAway = t.score[1];
    const teamHome = t.match[0];
    const teamAway = t.match[1];

    return `<li class="match" data-group=${group}><p><span data-team="home" >${teamHome}</span>  (<span class="home">${scoreHome}</span> : <span class="away">${scoreAway}</span>)  <span data-team="away">${teamAway}</span></p>
	 <div class="modal" data-modal="match">
    <div class="modal-content">
         <form class="modal-form">
        <div class="home-box">
		 <input type="number" name="home" placeholder="${teamHome}" min="0" ${
      t.finished && "disabled"
    }>
		</div>
		<span> - </span>
		<div class="away-box">
<input type="number" name="away" placeholder="${teamAway}" min="0" ${
      t.finished && "disabled"
    }/> 
		</div>
        <button type="submit" class="btn modal-btn" ${
          t.finished && "disabled"
        }>OK</button>
  		</form>
    </div>
  </div>
  </li>`;
  });
  const list = document.querySelector(`ul[data-list='${group}']`);
  list.innerHTML = markup.join("");
  list.addEventListener("click", modalOpen);
}

function updateStats(oldGame, newGame) {
  const updateGame = {
    group: oldGame.group,
    logo: oldGame.logo,
    team: oldGame.team,
    played: oldGame.played + newGame.played,
    win: newGame.win > 0 ? oldGame.win + newGame.win : oldGame.win,
    draw: newGame.draw > 0 ? oldGame.draw + newGame.draw : oldGame.draw,
    lose: newGame.lose > 0 ? oldGame.draw + newGame.draw : oldGame.lose,
    goals: {
      for: oldGame.goals.for + newGame.goals.for,
      against: oldGame.goals.against + newGame.goals.against,
    },
    points:
      newGame.points > 0 ? oldGame.points + newGame.points : oldGame.points,
  };
  return updateGame;
}

function reRenderStats(name) {
  const stats = load("stats");

  const markup = stats
    .filter((t) => t.team === name)
    .map((t) => {
      return `<td>${t.played}</td>
		<td>${t.win}</td>
		<td>${t.draw}</td>
          <td>${t.lose}</td>
			 <td>${t.goals.for}</td>
			 <td>${t.goals.against}</td>
			 <td>${t.points}</td>
			 `;
    });
  document.querySelector(`tr[data-team='${name}']`).innerHTML = markup.join("");
}

function getID() {
  return "id" + Math.random().toString(16).slice(2);
}

function modalOpen(e) {
  const modal = e.target.closest("li").querySelector("div[data-modal='match']");
  const form = modal.querySelector(".modal-form");
  const closeBtn = form.querySelector("button");

  modal.classList.add("open");

  form.addEventListener("submit", handleSubmit);
  closeBtn.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.querySelector("div[data-modal].open");
  modal.classList.remove("open");
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const teamHome = form.closest("li").querySelector("span[data-team='home']");
  const teamAway = form.closest("li").querySelector("span[data-team='away']");
  const group = form.closest("li").dataset.group;
  const matches = load(`matches-${group}`);
  const home = Number(form.elements.home.value) || 0;
  const away = Number(form.elements.away.value) || 0;

  const match = {
    match: [teamHome.textContent, teamAway.textContent],
    score: [home, away],
    finished: true,
  };
  const index = matches.findIndex(
    (m) =>
      m.match[0] + m.match[1] === teamHome.textContent + teamAway.textContent
  );
  matches.splice(index, 1, match);

  save(`matches-${group}`, matches);
  renderMatches(group);
  checkWinner();
  matchStats(match);
  reRenderStats(teamHome.textContent);
  reRenderStats(teamAway.textContent);
  renderGroup(group);
}

function checkWinner() {
  const homeScore = document.querySelectorAll(".home");
  const awayScore = document.querySelectorAll(".away");
  const homeTeam = document.querySelectorAll("span[data-team='home']");
  const awayTeam = document.querySelectorAll("span[data-team='away']");

  for (let i = 0; i < homeScore.length; i++) {
    if (homeScore[i].textContent > awayScore[i].textContent) {
      homeScore[i].classList.add("winner");
      awayScore[i].classList.add("loser");
      homeTeam[i].classList.add("winner");
      awayTeam[i].classList.add("loser");
    } else if (homeScore[i].textContent < awayScore[i].textContent) {
      awayScore[i].classList.add("winner");
      homeScore[i].classList.add("loser");
      homeTeam[i].classList.add("loser");
      awayTeam[i].classList.add("winner");
    } else if (
      homeScore[i].textContent &&
      awayScore[i].textContent &&
      homeScore[i].textContent === awayScore[i].textContent
    ) {
      homeScore[i].classList.add("draw");
      awayScore[i].classList.add("draw");
      homeTeam[i].classList.add("draw");
      awayTeam[i].classList.add("draw");
    }
  }
}

function matchStats({ match, score }) {
  const stats = load("stats") || [];
  const teamStat1 = countStats(match, score)[0];
  const teamStat2 = countStats(match, score)[1];

  const teamInList1 = stats.find((i) => i.team === teamStat1.team);
  const index1 = stats.findIndex((i) => i.team === teamStat1.team);
  const teamInList2 = stats.find((i) => i.team === teamStat2.team);
  const index2 = stats.findIndex((i) => i.team === teamStat2.team);

  if (!teamInList1) {
    stats.push(teamStat1);
  } else {
    const updateTeamStat1 = updateStats(teamInList1, teamStat1);
    stats.splice(index1, 1, updateTeamStat1);
  }

  if (!teamInList2) {
    stats.push(teamStat2);
  } else {
    const updateTeamStat2 = updateStats(teamInList2, teamStat2);
    stats.splice(index2, 1, updateTeamStat2);
  }

  save("stats", stats);
}

function checkTeamInList(list, team) {
  return list.find((i) => i.team === team);
}

function countStats(match, score) {
  const t1 = {
    team: match[0],
    played: 0,
    win: 0,
    draw: 0,
    lose: 0,
    goals: { for: 0, against: 0 },
    points: 0,
  };
  const t2 = {
    team: match[1],
    played: 0,
    win: 0,
    draw: 0,
    lose: 0,
    goals: { for: 0, against: 0 },
    points: 0,
  };

  if (score[0] > score[1]) {
    t1.played++;
    t2.played++;
    t1.win++;
    t2.lose++;
  } else if (score[0] < score[1]) {
    t1.played++;
    t2.played++;
    t1.lose++;
    t2.win++;
  } else if (score[0] === score[1]) {
    t1.played++;
    t2.played++;
    t1.draw++;
    t2.draw++;
  }
  t1.goals.for = score[0];
  t1.goals.against = score[1];
  t2.goals.for = score[1];
  t2.goals.against = score[0];
  t1.points = t1.win * 3 + t1.draw * 1;
  t2.points = t2.win * 3 + t2.draw * 1;

  return [t1, t2];
}

function renderTableModal(group) {
  const teams = data.teams.filter((t) => t.group === group).map((t) => t.name);

  const markup = data.groups.map((t) => {
    return `<div class="modal">
		<div class="modal-content">
        <form>
          <ul>
            <li>
              <p class="title">${teams[0]}</p>
              <label>
                <input type="radio" name="${teams[0]}" value="sasha" />C
              </label>
              <label>
                <input type="radio" name="${teams[0]}" value="pasha" />П
              </label>
            </li>
            <li>
              <p class="title">${teams[1]}</p>
              <label>
                <input type="radio" name="${teams[1]}" value="sasha" />C
              </label>
              <label>
                <input type="radio" name="${teams[1]}" value="pasha" />П
              </label>
            </li>
            <li>
              <p class="title">${teams[2]}</p>
              <label>
                <input type="radio" name="${teams[2]}" value="sasha" />C
              </label>
              <label>
                <input type="radio" name="${teams[2]}" value="pasha" />П
              </label>
            </li>
            <li>
              <p class="title">${teams[3]}</p>
              <label>
                <input type="radio" name="${teams[3]}" value="sasha" />C
              </label>
              <label>
                <input type="radio" name="${teams[3]}" value="pasha" />П
              </label>
            </li>
          </ul>
          <button type="submit">OK</button>
			<button type="button" class="close-btn">X</button>
        </form>
      </div>
		</div>`;
  });
  document
    .querySelector(`div[data-modal="${group}"]`)
    .insertAdjacentHTML("beforeend", markup.join(""));
}

function tableModalOpen(e) {
  const group = e.currentTarget.closest(".group");
  const modal = group.querySelector("div[data-modal='table']");
  const form = modal.querySelector("form");
  const closeBtn = modal.querySelector("button");

  modal.classList.add("open");

  form.addEventListener("submit", tableModalHandlerSubmit);
  closeBtn.addEventListener("click", tableModalClose);
}

function tableModalClose() {
  const modal = document.querySelector("div[data-modal='table'].open");

  modal.classList.remove("open");
}

function tableModalHandlerSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const group = form.closest(".group").querySelector("table").dataset.group;

  new FormData(form).forEach((value, name) => {
    data.teams.map((t) => {
      if (t.name === name) {
        t.player = value;
      }
    });
  });

  save("data", data);
  renderGroup(group);
  renderMatches(group);
  checkWinner();
}
function playerToggle(player) {
  return `<li>
              <span class="title">${player}</span>
              <div>
				 <label>
                <input type="radio" name="${player}" value="С" />C
              </label>
              <label>
                <input type="radio" name="${player}" value="П" />П
              </label> 
				  </div>
            </li>
`;
}
