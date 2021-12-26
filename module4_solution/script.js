

(function() {

  
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
  
  for (var name of names) {
    
    var firstLetter = name.toLowerCase().charAt(0);
    
    if (firstLetter == 'j') {
      byeSpeaker.speak(name);
    } else {
      helloSpeaker.speak(name);
    }
  }

})();