import {generateResultGoals} from "../utils.js"

const NUMBER_TOTAL_TEAMS_PLAYOFF = 16;
const NUMBER_TOTAL_MATCHES_PLAYOFF = 5;

export default class PlayOff {
  constructor(name, teams = [], config = {}) {
    this.name = name;
    this.teams = [];
    this.config = {};
    this.setup(teams, config);
    this.totalDataPlayOff = [];
  }

  setupConfig(config) {
    const defaultConfig = { rounds: 1 };
    this.config = Object.assign(defaultConfig, config);
  }

  setupTeams(teams) {
    for (let index = 0; index < NUMBER_TOTAL_TEAMS_PLAYOFF; index++) {
      const team = teams[index];
      this.teams.push(team);
    }
  }

  setup(teams, config) {
    this.setupTeams(teams);
    this.setupConfig(config);
  }

  playMatch(match) {
    do {
      match.resultLocalTeam = generateResultGoals();
      match.resultVisitTeam = generateResultGoals();
    } while (match.resultLocalTeam == match.resultVisitTeam);

    return match;
  }

  playOnePlayOff(playOff) {
    for (const match of playOff) {
      this.playMatch(match);
    }
  }

  getLosersOnePlayOff(playOff) {
    const loserTeam = [];
    for (const match of playOff) {
      if (match.resultLocalTeam < match.resultVisitTeam) {
        loserTeam.push(match.localTeam);
      } else {
        loserTeam.push(match.visitTeam);
      }
    }
    return loserTeam;
  }

  getWinnersOnePlayOff(playOff) {
    const winnerTeams = [];
    for (const match of playOff) {
      if (match.resultLocalTeam > match.resultVisitTeam) {
        winnerTeams.push(match.localTeam);
      } else {
        winnerTeams.push(match.visitTeam);
      }
    }
    return winnerTeams;
  }

  createPlayOff(teams) {
    const playOff = [];

    let indexMatch = 0;
    for (let i = 0; i < teams.length; i++) {
      if (i % 2 == 0) {
        const match = {
          localTeam: teams[i],
          visitTeam: "",
          resultLocalTeam: 0,
          resultVisitTeam: 0,
        };
        playOff.push(match);
      } else {
        playOff[indexMatch].visitTeam = teams[i];
        indexMatch++;
      }
    }
    return playOff;
  }

  start() {
    let teamsOnePlayOff = this.teams.map((team) => team);
    //phases playoff
    for (let index = 0; index < NUMBER_TOTAL_MATCHES_PLAYOFF; index++) {
      const playOff = this.createPlayOff(teamsOnePlayOff);
      this.playOnePlayOff(playOff);
      if (index == NUMBER_TOTAL_MATCHES_PLAYOFF - 3) {
        //semifinal phase
        teamsOnePlayOff = this.getLosersOnePlayOff(playOff);
      } else if (index == NUMBER_TOTAL_MATCHES_PLAYOFF - 2) {
        //final phase
        teamsOnePlayOff = this.getWinnersOnePlayOff(this.totalDataPlayOff[index - 1]);
      } else {
        //default phase
        teamsOnePlayOff = this.getWinnersOnePlayOff(playOff);
      }
      this.totalDataPlayOff.push(playOff);
    }
  }
}