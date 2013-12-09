
var dataBase;
dbNamespace={};

//crtDB
function startContacts(){
	dbNamespace.db = window.openDatabase('blackberry', '1.0', 'Offline Name Information', 1*1024*1024);
	//dropTable();
	createTable();
}

//tblcreate
function createTable(){	
var db = dbNamespace.db;
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY , description TEXT, profileImages TEXT )", 
        [], 
        function(tx, result) {
           // handle  the success
		   
            
        }, 
        function(tx, error) {
            // handle the error
            alert("Database creation error: " + error);
        }
    )});	
	
}

function dropTable(){	
var db = dbNamespace.db;
    db.transaction(function(tx) {
        tx.executeSql("DROP TABLE contacts", 
        [], 
        function(tx, result) {
           alert("table droped");
            
        }, 
        function(tx, error) {
            // handle the error
            alert("Database creation error: " + error);
        }
    )});	
	
}


function showScreenOne()
{
	createTable();
	console.log("func one");
	var tab1 = document.getElementById("tab1");	
	var tab2 = document.getElementById("tab2");	
	tab2.style.display = "none";
	tab1.style.display = "inline";
	var displayData = document.getElementById("displayData");
	var db = dbNamespace.db;
    db.transaction
	(function(tx) 
	{
        tx.executeSql("SELECT * FROM contacts",
            [],
            function(tx, result) 
			{
				if(result.rows.length > 0)
				{				
					var description="";
					var idString = "";
					var displayData = document.getElementById("displayData");
					var displayDataArray = [],itemList;
					
					for(var i=0; i < result.rows.length; i++) 
					{
						
						var contacts = blackberry.pim.contacts;	
						var idString = result.rows.item(i).id.toString();
						var contact = contacts.getContact(idString);						
						
						if (contact != null) 
						{
							var contactFamilyName = contact.name.familyName.toString();
							var contactGivenName = contact.name.givenName.toString();
							var GcontactString =  contactGivenName.split("");
							var firstToUpper = GcontactString[0].toUpperCase();
							var firstToLower = new String;
							
							for(j=1; j<GcontactString.length; j++){
								
								firstToLower += GcontactString[j];
								
							 }
							var contactGivenNameFinal = firstToUpper + firstToLower;
							var contactFamilyName = contact.name.familyName.toString();
							var FcontactString =  contactFamilyName.split("");
							var lastToUpper = FcontactString[0].toUpperCase();
							var lastToLower = new String;
							
							for(j=1; j<FcontactString.length; j++){
								 
								 lastToLower += FcontactString[j];
 							}
							var contactFamilyNameFinal = lastToUpper + lastToLower;
						} else
						{
						   alert("There is no contact with id: " + idString + " in contacts");
						}	
						description += result.rows.item(i).description;						
						description += " ";						
						itemList = document.createElement("div");						
						itemList.setAttribute('data-bb-type',"item");			
						itemList.setAttribute("data-bb-title", contactGivenNameFinal + " " +  contactFamilyNameFinal);	
						itemList.setAttribute("id", idString);					
						itemList.setAttribute("data-bb-img", "images/avatar.png" );
						itemList.setAttribute("onclick", "showScreen3()" );
						itemList.innerHTML = description;
						description = "";
						displayDataArray.push(itemList);									
					}
					displayData.refresh(displayDataArray);
				}else
				{
					alert("There is nothing in the database");
				}				
				}, 
			function(tx, error) 
			{
				 alert("failure");
			}		 
	 )});
}

function showScreen3(){
	var selectedItem = document.getElementById('displayData').selected;
	bb.pushScreen('contactDetails.html','screen3',selectedItem)	
}

//Scrn2
function showScreenTwo(){
	var tab1 = document.getElementById("tab1");	
	var tab2 = document.getElementById("tab2");	
	console.log("func two");
	tab1.style.display = "none";
	tab2.style.display = "inline";
	createTable();
}

//poulate
function populateDB(contact) { 
    var db = dbNamespace.db;
	
	var firstName = document.getElementById("first").value;
	var lastName = document.getElementById("last").value;
	var homePhone = document.getElementById("homePhone").value;
	var homeEmail = document.getElementById("homeEmail").value;
	var description = document.getElementById("description").value;
	if(firstName == "" || lastName == "" ||  homeEmail == "" || description == "" || homePhone == ""){		
		alert("Please fill out the mandatory fields(*)");		
	}else{
		db.transaction(function(tx) {
			tx.executeSql("INSERT INTO contacts(id,description) VALUES (?,?)",
				[contact.id,description],
				
				function(tx, result){
					showScreenOne();					
				}, 
				function(tx, error){
					 alert("Error adding " + firstName + lastName + ": " + error);
				}			
		)});		
	}	
}

//crtCon
function createContact() {
	
	var firstName = document.getElementById("first").value;
	var lastName = document.getElementById("last").value;
	var homePhone = document.getElementById("homePhone").value;
	var mobilePhone = document.getElementById("mobilePhone").value;
	var homeEmail = document.getElementById("homeEmail").value;
	var workEmail = document.getElementById("schoolEmail").value;
	var description = document.getElementById("description").value;
	
	 var contacts = blackberry.pim.contacts,
	 ContactField = contacts.ContactField,
	 name = {},
	 mobilePhone = { type: ContactField.MOBILE, value: mobilePhone.toString() },
	 homePhone = { type: ContactField.HOME, value: homePhone.toString() },
	 workEmail = { type: ContactField.WORK, value: workEmail.toString() },
	 homeEmail = { type: ContactField.HOME, value: homeEmail.toString() },
	 contact;
	 name.familyName = lastName.toString();
	 name.givenName = firstName.toString();
	 contact = contacts.create({
	 "displayName": "",
	 "name": name,
	 "phoneNumbers": [homePhone, mobilePhone],
	 "emails": [workEmail, homeEmail]
	 });
	 contact.save(onSaveSuccess, onSaveError);
}

function onSaveSuccess(contact) {
	populateDB(contact);
 
}
function onSaveError(error) {
	alert("Error saving contact: " + error.code);
}

function getBusRoute(){
	blackberry.invoke.invoke({
		target: "sys.browser",
		action: "bb.action.OPEN",
		uri: "http://www.octranspo.com/mobi"
	},  onSuccess, onError);
}

function onSuccess(response) {
	
 console.log("Invocation query successful: " + response );
}

function onError(error) {
 alert("Invocation query error");
}

