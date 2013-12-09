
blackberry.io.sandbox = false;

function invokeCameraCard() {
      var mode = blackberry.invoke.card.CAMERA_MODE_PHOTO;
      blackberry.invoke.card.invokeCamera(mode, function (path) {
            
			 var filePath = "file://" + path;
			 var img = document.getElementById("contactAvatarImg");
			 var contactAv = document.getElementById("contactAvatar")
			 img.src = filePath;
			 
			 insertImg(filePath);	 
         },
         function (reason) {
             alert("cancelled " + reason);
         },
         function (error) {
             if (error) {
                 alert("invoke error "+ error);
              } else {
                 console.log("invoke success " );
              }
      });
 }

/*function startCamera(){
	alert("in startCam");
	blackberry.invoke.invoke({
		target:"sys.camera.app",
		action: "bb.action.CAPTURE",
		data:"photo"
	},  onSuccess, onError);

}

function onCardClosedHandler(info) {
	console.log("Card was closed: " + info);
}
function onSuccess(data){
	alert("in done");
	blackberry.io.sandbox = false;
	createImgTable("imageid");
}
*/






