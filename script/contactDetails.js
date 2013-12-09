
function displayDetails(params){
	contactId = params.getAttribute('id');
	var contacts = blackberry.pim.contacts;
	var contact = contacts.getContact(contactId);
	var contactDetailsList = document.getElementById("contactDetailsList");

	if (contact != null) 
	{
		var db = dbNamespace.db;
		db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM contacts",
				[],
				function(trans, result) {
					getProfileImg();
					if(result.rows.length > 0)
					{	
					for(var i=0; i < result.rows.length; i++) {		
						var contactDescription = result.rows.item(i).description;
						}
						var contactFamilyName 	= "";
						var contactGivenName 	= "";									
						var contactEmailHome 	= "";
						var contactPhoneHome 	= "";
						var contactPhoneMobile 	= "";
						var contactEmailWork	= "";
						if(contact.phoneNumbers[1]){
							contactPhoneMobile 	= contact.phoneNumbers[1].value;
						}
						if(contact.emails[1]){
							contactEmailWork 	= contact.emails[1].value;
						}
							contactFamilyName 	= contact.name.familyName.toString();
							contactGivenName 	= contact.name.givenName.toString();									
							contactEmailHome 	= contact.emails[0].value;
							contactPhoneHome 	= contact.phoneNumbers[0].value;
						var GcontactString =  contactGivenName.split("");
						var firstToUpper = GcontactString[0].toUpperCase();
						var firstToLower = new String;
						for(j=1; j<GcontactString.length; j++){
							
							firstToLower += GcontactString[j];
							
						 }
						 
						var contactFamilyName = contact.name.familyName.toString();
						var FcontactString =  contactFamilyName.split("");
						var lastToUpper = FcontactString[0].toUpperCase();
						var lastToLower = new String;
						
						for(j=1; j<FcontactString.length; j++){
							 
							 lastToLower += FcontactString[j];
						}
						var contactGivenNameFinal = firstToUpper + firstToLower;
						var contactFamilyNameFinal = lastToUpper + lastToLower;	
						var p = document.createElement("p");
						var p2 = document.createElement("p");	
						var p3 = document.createElement("p");	
						var p4 = document.createElement("p");	
						var p5 = document.createElement("p");	
						var p6 = document.createElement("p");
						/*var img = document.createElement("img");
						var cameraBtn = document.createElement("button");
							
						cameraBtn.setAttribute("onclick","invokeCameraCard()");
						cameraBtn.setAttribute("id","cameraBtn");
						cameraBtn.innerHTML = "Click to Add Pic";
						img.setAttribute("id","contactAvatarimg");
						//img.src = "images/avatar.png";	*/			
						
						p.innerHTML = "Name:" + "<br>" + contactGivenNameFinal + " " + contactFamilyNameFinal;
						if(contactEmailWork){
						p2.innerHTML = "Work E-mail: " + "<br>" + contactEmailWork;
						}
						p6.innerHTML = "Home E-mail: " + "<br>" + contactEmailHome;
						if(contactPhoneMobile){
						p5.innerHTML = "Mobile Phone: " + "<br>" + contactPhoneMobile;
						}
						p3.innerHTML = "Home Phone: " + "<br>" + contactPhoneHome;
						p4.innerHTML = "How we met: " + "<br>" + contactDescription;
						
						/*if(img.src == ""){
							alert("in if");
							contactDetailsList.appendChild(cameraBtn);
						}else{
							alert("in else");
							
							contactDetailsList.appendChild(img);
						}*/

						contactDetailsList.appendChild(p);
						contactDetailsList.appendChild(p5);
						contactDetailsList.appendChild(p3);
						contactDetailsList.appendChild(p2);
						contactDetailsList.appendChild(p6);
					}
				}, 
				function(trans, error) {
					 alert("There is no such contact in the database");
				}	
		)});
	}
}


function insertImg(filePath){
	
var db = dbNamespace.db;
var profileImage = filePath;


    db.transaction(function(tx) {
			tx.executeSql("UPDATE contacts SET profileImages = '" + profileImage + "' WHERE id = " + contactId,
				[],
				
				function(tx, result){
					
					getProfileImg();			
				}, 
				function(tx, error){
					
				}			
		)});	
	
}


//extra stuff
function getProfileImg(){
var db = dbNamespace.db;
    db.transaction(function(tx) {
        tx.executeSql("SELECT profileImages FROM contacts WHERE id = " + contactId, 
        [], 
        function(tx, result) {
           // handle  the success

		  if(result.rows.length > 0)
			{
				for(var i=0; i < result.rows.length; i++) 
					{
						var filePath = result.rows.item(i).profileImages;
						document.getElementById("contactAvatarImg").src = filePath;
						
					}
			}
           
			
        }, 
        function(tx, error) {
            // handle the error
            alert("There is no contactImage with the id of: " + contactId + error);
        }
    )});	
	
}


/*function createImgTable(path){
var db = dbNamespace.db;

    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS contactImg(id INTEGER PRIMARY KEY , profileImages TEXT )", 
        [], 
        function(tx, result) {
           // handle  the success
            alert("table created");
			populateImgTable(path);
        }, 
        function(tx, error) {
            // handle the error
            alert("Database creation error: " + error);
        }
    )});	
	
}
*/
/*function populateImgTable(path){
	var db = dbNamespace.db;
	var profileImage = path;
	alert("path: " + path);
	alert("contactId: " + contactId);
	
	
	db.transaction(function(tx) {
			tx.executeSql("INSERT INTO contactImg(id,profileImages) VALUES (?,?)",
				[contactId,profileImage],
				
				function(tx, result){
					alert("added: " + profileImage);
					alert("added: " + contactId);
					getProfileImg();			
				}, 
				function(tx, error){
					alert("contact.id: " + contact.id);
					 alert("Error adding " + contact.id + error);
				}			
		)});	
}
*/

	

function onError(){
	alert("in Error");
}

