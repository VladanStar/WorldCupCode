import { nameWorldCup, config } from "./config.js";
import {
  worldTeams,
  titlesPlayOff,
 
  LOCAL_TEAM,
  VISIT_TEAM,
} from "./data.js";
import WorldCupSimulator from "./group/GroupPhase.js"
import PlayOff from "./group/PlayOff.js";

let winnerWorldCup = "";




const groupsPhase = new WorldCupSimulator(nameWorldCup, worldTeams, config);

console.log(groupsPhase.name);
console.log("Group");
console.log("===============================");

groupsPhase.configSchedulesMatchDays();
groupsPhase.groups.forEach((group) => {
  console.log();
  console.log(`Group ${group.name}`);
  console.log("-----------------------");
  group.teams.forEach((team) => console.log(team.name));
  let indexMatch = 1;
  group.matchScheduleDay.forEach((match) => {
    console.log();
    console.log(`Round ${indexMatch}`);
    match.forEach((matchDay) => {
      console.log(`- ${matchDay[LOCAL_TEAM]} vs ${matchDay[VISIT_TEAM]}`);
    });
    indexMatch++;
  });
});
console.log();
console.log("===============================================");
console.log("==============  MUNDIAL ============");
console.log("===============================================");
groupsPhase.start();
const numberMatchDay = groupsPhase.getNumberMatchDay();
for (
  let indexNumberMatchDay = 0;
  indexNumberMatchDay < numberMatchDay;
  indexNumberMatchDay++
) {
  groupsPhase.groups.forEach((group) => {
    console.log();
    console.log(`Group ${group.name} - Round ${indexNumberMatchDay + 1}:`);
    console.log("-----------------------");
    const results = group.summaries[indexNumberMatchDay].results;
    results.forEach((result) =>
      console.log(
        `${result.localTeam} ${result.localResult} - ${result.visitTeam} ${result.visitResult}`
      )
    );
    const summary = group.summaries[indexNumberMatchDay].standings;
    console.table(
      summary.map((team) => {
        return {
          Team: team.name +" ",
          Point: team.points,
          PlayedMatches: team.matchesWon + team.matchesDrawn + team.matchesLost,
          Won: team.matchesWon,
          Drawn: team.matchesDrawn,
          Lost: team.matchesLost,
          "Postignuti golovi": team.goalsFor,
          "Primljeni golovi": team.goalsAgainst,
          "Gol razlika": team.goalsFor - team.goalsAgainst,
        };
      })
    );
  });
}


const winnersPlayoff = groupsPhase.getWinnersToPlayoff();
const playOff = new PlayOff(nameWorldCup, winnersPlayoff, config);
playOff.start();
console.log();
console.log("==============================================");
console.log("==== FAZA ELIMINACIJE ====");
console.log("==============================================");
for (let i = 0; i < playOff.totalDataPlayOff.length; i++) {
  console.log();
  console.log(`==== ${titlesPlayOff[i]} ====`);
  console.log();
  for (const match of playOff.totalDataPlayOff[i]) {
    let winnerTeam = match.localTeam;
    if (match.resultLocalTeam < match.resultVisitTeam) {
      winnerTeam = match.visitTeam;
    }
    console.log(
      `${match.localTeam} ${match.resultLocalTeam} -  ${match.visitTeam} ${match.resultVisitTeam} => ${winnerTeam}`
    );
    winnerWorldCup = winnerTeam;
  }
}
console.log("");
console.log("");
console.log("===============================================");
console.log(`${winnerWorldCup} Shampion World!`);
console.log("===============================================");
