function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function () {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function (buffer) {
        if (!buffer) {
          alert("error decoding file data: " + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function (error) {
        console.error("decodeAudioData error", error);
      }
    );
  };

  request.onerror = function () {
    alert("BufferLoader: XHR error");
  };

  request.send();
};

BufferLoader.prototype.load = function () {
  for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
};

var context;
var bufferLoader;
var siSoundBuffers;
var soundsLoaded = false;

function loadSounds() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      "./assets/sounds/Galloping-Horse.wav",
      "./assets/sounds/gun.mp3",
      "./assets/sounds/ding.mp3",
      "./assets/sounds/bugle.mp3",
      "./assets/sounds/neigh.mp3",
      "./assets/sounds/crowd.mp3",
    ],
    finishedLoadingSounds
  );

  bufferLoader.load();
}

function siPlaySound(soundIndex, time) {
  if (!soundsLoaded) {
    return;
  }
  var source = context.createBufferSource();
  source.buffer = siSoundBuffers[soundIndex];
  source.connect(context.destination);
  source.start(0);
  if (time) {
    window.setTimeout(() => {
      source.stop();
    }, time);
  }
}

function finishedLoadingSounds(bufferList) {
  siSoundBuffers = [...bufferList];
  soundsLoaded = true;
}
