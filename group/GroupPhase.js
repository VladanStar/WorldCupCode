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

}