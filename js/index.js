// Generated by CoffeeScript 1.12.2
(function() {
  var advanceChar, atoz, clockRunning, computeWPM, reset, start, started, stop, stoppedDuration, timeBegan, timeStopped, typedLetters;

  typedLetters = 0;

  atoz = "abcdefghijklmnopqrstuvwxyz";

  advanceChar = function(char) {
    var currentTyped, nextCharacter;
    if (char - 97 === typedLetters) {
      nextCharacter = String.fromCharCode(char);
      currentTyped = $("#typed").text();
      $("#typeHere").html('<span id="typed">' + currentTyped + nextCharacter + '</span>' + atoz.substring(typedLetters + 1, 26));
      console.log('hi');
      typedLetters++;
      if (typedLetters === 26) {
        stop();
      }
      return $("#speed").text(computeWPM());
    } else {
      return console.log('no');
    }
  };

  $(document).keypress(function(e) {
    if (e.which === 13) {
      return reset();
    } else if (typedLetters === 26) {

    } else {
      if (typedLetters === 0) {
        start();
      }
      return advanceChar(e.which);
    }
  });

  $(function() {
    return $("#reset").click(function() {
      return reset();
    });
  });

  computeWPM = function() {
    var currentTime;
    currentTime = new Date();
    return Math.floor((typedLetters * 1000 * 60 / 5) / (new Date(currentTime - timeBegan)));
  };

  timeBegan = null;

  timeStopped = null;

  stoppedDuration = 0;

  started = null;

  start = function() {
    if (timeBegan === null) {
      timeBegan = new Date();
    }
    if (timeStopped !== null) {
      stoppedDuration += new Date() - timeStopped;
    }
    return started = setInterval(clockRunning, 1);
  };

  stop = function() {
    timeStopped = new Date();
    return clearInterval(started);
  };

  clockRunning = function() {
    var currentTime, ms, sec, timeElapsed;
    currentTime = new Date();
    timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);
    sec = timeElapsed.getUTCSeconds();
    ms = timeElapsed.getUTCMilliseconds();
    return $("#time").text(sec + "." + ms);
  };

  reset = function() {
    console.log("clicked");
    $("#typeHere").html('<span id="typed"></span>' + atoz);
    typedLetters = 0;
    clearInterval(started);
    stoppedDuration = 0;
    timeBegan = null;
    return timeStopped = null;
  };

}).call(this);
