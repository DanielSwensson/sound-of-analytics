var baseFrequency = 110;
var crusher = new Tone.Distortion(0.5).toMaster();
var pingPong = new Tone.PingPongDelay(0.4, 0.05).connect(crusher);
crusher.set("wet", 0);
var synth = new Tone.PolySynth(2, Tone.Synth).connect(pingPong);

function instrument(analyticsCount) {
  if (analyticsCount > 20) {
    crusher.set("wet", 0.5);
  }
  return synth;
}

function frequency(analyticsCount) {
  var randomMulti = Math.floor(Math.random() * analyticsCount + 1); 
  var randomMinMulti = Math.floor(Math.random() * 7 + 1);
  var randFreq = baseFrequency * Math.min(randomMinMulti, randomMulti);
  if (analyticsCount > 10) {
    return [randFreq, randFreq * 1.5];
  }
  return randFreq;
}

function triggerSound(analyticsCount) {
  var velocity = Math.max(0.5, Math.random());
  pingPong.set("wet", Math.random());
  var freq = frequency(analyticsCount);
  console.log(freq);
  instrument(analyticsCount).triggerAttackRelease(freq, 0.1, undefined, velocity);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    triggerSound(request.analyticsCount);
  }
);
