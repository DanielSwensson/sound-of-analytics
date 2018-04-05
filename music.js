var baseFrequency = 110;

var pingPong = new Tone.PingPongDelay(0.4, 0.05).toMaster();

var filter = new Tone.AutoFilter(2, 200, 4).connect(pingPong);
filter.set("wet", 0.4);
var synth = new Tone.FMSynth().connect(filter, 0);

function instrument(analyticsCount) {
  return synth;
}

function triggerSound(analyticsCount, avgCharCode) {
  var velocity = Math.max(0.5, Math.random());
  pingPong.set("wet", 0.4);
  var freq = avgCharCode * Math.floor(Math.random() * 7 + 1);
  instrument(analyticsCount).triggerAttackRelease(freq, 0.1, undefined, velocity);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    triggerSound(request.analyticsCount, request.avgCharCode);
  }
);
