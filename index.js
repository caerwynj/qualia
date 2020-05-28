'use strict';

const mkState = function() {
  let data = Array.from({length: 10}, d => 0.0);

  let getObservable = function () {
    return data;
  }

  let update = function (actionList) {
    actionList.forEach(a => {
      data.push(a);
      data.shift();
    })
  }

  let reward = function () {

  }

  return {getObservable, update, reward};
}

const mkActionSpace = function () {

  return {};
}

const mkAgent = function () {
  let epsilon = 0.1;

  let action =  function(state){
    let r = Math.random();
    let a = 0;
    if (r < epsilon) {
      a = Math.floor(Math.random() * 10);
    } else {
      a = state.reduce((acc, val) => val + acc, 0) / state.length;
    }
    return a;
  }

  return {action};
}

const mkEnv = function () {
  let population = [];
  let state = mkState();
  let actionSpace = mkActionSpace();

  let step =  function() {
    let obs = state.getObservable();
    let actionList = population
      .map(p => p.action(obs))
      .reduce((acc, val) => acc.concat(val), []);

    state.update(actionList);
    obs = state.getObservable();
    let reward = 0;
    let done = false;

    return {state: obs, reward, done};
  }

  let addAgent = function (agent) {
    population.push(agent);
  }

  let reset = function() {
  }

  return {step, reset, addAgent};
}
  
const simulate =  function(n) {
  let env = mkEnv()
  for (let i = 0; i < 4; i++) {
    env.addAgent(mkAgent());
  }
  let state, reward, done;
  state = env.reset();
  for (let i = 0; i < n && !done; i++){
    ({state, reward, done} = env.step());
    console.log(state);
  }
}

simulate(10);
