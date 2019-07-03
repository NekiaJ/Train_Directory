//Initialize Firebase

var firebaseConfig = {
  apiKey: "AIzaSyAoi9IslMaJhqTlILm2cQTDWaYcJnCAlzA",
  authDomain: "traindatabase-701e5.firebaseapp.com",
  databaseURL: "https://traindatabase-701e5.firebaseio.com",
  projectId: "traindatabase-701e5",
  storageBucket: "traindatabase-701e5.appspot.com",
  messagingSenderId: "200343286618",
  appId: "1:200343286618:web:fe7a501037057e8a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// submit button
  $("#addTrain").on("click", function(event){
      event.preventDefault();
      //grabs user input
      var trainName = $("#form1").val().trim();
      var Dest = $("#form2").val().trim();
      var train_time= moment($("#form3").val().trim(),"hh:mm a").format('hh:mm a');
      var howFreq = $("#form4").val().trim();

      // creates a local object to hold the data coming in
      var  newTrain = {
          name: trainName,
          destination: Dest,
          firstTrain: train_time,
          frequncy: howFreq,
         // minAway: minAway
      };
      database.ref().push(newTrain);

      //logs to console
      console.log(newTrain.trainName);
      console.log(newTrain.Dest);
      console.log(newTrain.firstTrain);
      console.log(newTrain.howFreq);
    //  console.log(newTrain.minAway);

      alert("Train Info has been  updated!");
      // clears out form boxes
      $("#form1").val("");
      $("#form2").val("");
      $("#form3").val("");
      $("#form4").val("");
      //$("#form5").val("");



  });

 
 
//creates firebase event
  database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

        // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var Dest = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first_train;
  var howFreq = childSnapshot.val().frequncy;
  //var minAway = childSnapshot.val().minAway;

  var tFrequency = howFreq;

  // Time is 3:30 AM
  var firstTrain = "03:30";

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  


  // Create the new row
  var newRows = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(Dest),
    $("<td>").text(tFrequency),
    $("<td>").text(tMinutesTillTrain)
   // $("<td>").text(nextTrain),
    
  );

  // Append the new row to the table
  $("#train_table > tbody").append(newRows);
  console.log();
});





  