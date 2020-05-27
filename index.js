'use strict';

function State() {
  let reward = 0;
  let data = Array(10).fill(0.0);
}

function Agent() {

}

Agent.prototype = {
  step: function(state){
    let action = ["a"];
    return action;
  }
}

function Env() {
    let population = [];
    let state = new State();
}

Env.prototype = {
  step: function() {
    let actionList = this.population
      .map(p => p.step(this.state))
      .reduce((acc, val) => acc.concat(val), []);
    return actionList;
  }

  simulate: function(n) {
    for (let i = 0; i < n; i++){
      let a = env.step();
      console.log(a);
    }
  }
}

let env = new Env()
env.population = [new Agent(), new Agent()];
env.simulate(10);
