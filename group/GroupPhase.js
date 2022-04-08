import { firstElementArray, groupsNames, secondElementArray } from "../UI/data.js";
import Group from "./Group.js";
import Team from "./Teams.js";

export default class GroupPhase {

    constructor(name, teams = [], config = {}) {
        this.name = name;
        this.teams = [];
        this.config = {};
        this.teamsPerGroup = teams.length / groupsNames.length;
        this.groups = [];
        this.setup(teams, config);
        this.winnersToPlayOff = [];
      }

      customizeTeam(teamName, group) {
        return {
          name: teamName,
          group: group,
          matchesWon: 0,
          matchesDrawn: 0,
          matchesLost: 0,
        };
      }
    
      setupTeams(teams) {
        let indexGroup = 0;
        let indexTeamsPerGroup = 0;
        for (const team of teams) {
          if (indexTeamsPerGroup == this.teamsPerGroup) {
            indexGroup++;
            indexTeamsPerGroup = 0;
          }
          const newTeam = new Team(team, groupsNames[indexGroup]);
          indexTeamsPerGroup++;
          this.teams.push(newTeam);
        }
      }
    
      getTeamsNames() {
        return this.teams.map((team) => team.name);
      }
    
      setupConfig(config) {
        const defaultConfig = {
          rounds: 1,
          pointsPerWin: 3,
          pointsPerDrawn: 1,
          pointsPerLost: 0,
        };
        this.config = Object.assign(defaultConfig, config);
      }
    
      setupGroups() {
        for (let i = 0; i < groupsNames.length; i++) {
          const teams = this.teams.filter((team) => team.group == groupsNames[i]);
          const group = new Group(groupsNames[i], teams, this.config);
          this.groups.push(group);
        }
      }
    
      setup(teams, config) {
        this.setupTeams(teams);
        this.getTeamsNames();
        this.setupConfig(config);
        this.setupGroups();
      }
    
      configSchedulesMatchDays() {
        this.groups.forEach((group) => group.configScheduleMatchDays());
      }
    
      start() {
        this.groups.forEach((group) => group.start());
      }
    
      getNumberMatchDay() {
        return this.groups[0].summaries.length;
      }
    
      getWinnersToPlayoff() {
        const maxTimes = 8;
        let indexGroup = 0;
        for (let indexTimes = 0; indexTimes < maxTimes; indexTimes++) {
          if (indexTimes % 2 == 0) {
            const groupX = this.groups[indexGroup];
            const lastStandingX = groupX.getLastStanding();
            const firstWinner = lastStandingX[firstElementArray];
            this.winnersToPlayOff.push(firstWinner.name);
          } else {
            const groupY = this.groups[indexGroup];
            const lastStandingY = groupY.getLastStanding();
            const secondWinner = lastStandingY[secondElementArray];
            this.winnersToPlayOff.push(secondWinner.name);
          }
          indexGroup++;
        }
        indexGroup = 0;
        for (let indexTimes = 0; indexTimes < maxTimes; indexTimes++) {
          if (indexTimes % 2 == 0) {
            const groupY = this.groups[indexGroup];
            const lastStandingY = groupY.getLastStanding();
            const secondWinner = lastStandingY[secondElementArray];
            this.winnersToPlayOff.push(secondWinner.name);
          } else {
            const groupX = this.groups[indexGroup];
            const lastStandingX = groupX.getLastStanding();
            const firstWinner = lastStandingX[firstElementArray];
            this.winnersToPlayOff.push(firstWinner.name);
          }
          indexGroup++;
        }
        const winnersReturn =  Object.assign({}, this.winnersToPlayOff);
        return winnersReturn;
      }

}