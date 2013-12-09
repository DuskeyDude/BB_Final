
function populateCal(){
	alert("in populateCal");
	var evt, calendar = blackberry.pim.calendar;

function onSaveSuccess(created) {
	alert("in onSaveSuccess");
 // set evt to the object returned in save success callback, which
 // contains the persisted event id
	 evt = created;
	 alert("Event saved to device: " + evt.id);
}

function onSaveError(error) {
	alert("in onSaveError");
	alert("Error saving event to device: " + error.code);
}

function createEventInDefaultCalendarFolder(summary, location) {
alert("in createEventInDefaultCalendarFolder");
	var displayCal = document.getElementById("displayCal");
	var courseName=document.getElementById("courseName");
	var classRoom=document.getElementById("classRoom");
	var day=document.getElementById("day");
	var when=document.getElementById("when");
	var howLong=document.getElementById("howLong");
	var classOrLabToggle=document.getElementById("classOrLabToggle");
	var reminder=document.getElementById("reminder");
	var reminderToggle=document.getElementById("reminderToggle");

	evt = calendar.createEvent({
	"summary": courseName,
	"location": classRoom,
	"start": new Date("Jan 01, 2015, 12:00"),
	"end": new Date("Jan 01, 2015, 12:30"),
	// if timezone is specified explicitly, then the times will be
	// for that particular timezone; otherwise, the times will be
	// for the current device timezone
	"timezone": "America/New_York"
	});
	evt.save(onSaveSuccess, onSaveError);
}

function showAddCal(){
	alert("showAddCal func");
	var tab1 = document.getElementById("view");	
	var tab2 = document.getElementById("edit");	
	tab1.style.display = "inline";
	tab2.style.display = "none";
}

//Scrn2
function showEditScreen(){
	alert("in showEditScreen");
	var tab1 = document.getElementById("tab1");	
	var tab2 = document.getElementById("tab2");	
	console.log("func two");
	tab1.style.display = "none";
	tab2.style.display = "inline";
	createTable();
}

function showScreen3(){
	alert("showScreen3");
	var selectedItem = document.getElementById('displayCal').selected;
	bb.pushScreen('contactDetails.html','screen3',selectedItem)	
}

function delete(){
	alert("in delete");
}

function saveToCal(){
	alert("in save to cal");
}

