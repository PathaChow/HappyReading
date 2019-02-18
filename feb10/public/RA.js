var title;
var img=[];
var paragraphs=[];
var currpg;

function getbook(){
	//alert("in get book");
	var bookname = document.getElementById("bookname").value;
	if(bookname!=""){
		var oReq = new XMLHttpRequest();
		var url = "/query/"+bookname+".json";
		oReq.open("GET", url);
		oReq.addEventListener("load", gotJSONNowWhat);
		oReq.send();

		function gotJSONNowWhat() {
		showbook(oReq);
	    }
	}
}

function showbook(oReq){
	//console.log(typeof oReq.responseText);
	//const bookServer = "http://157.230.167.40/"
	if (oReq.status != 200) {
	tellUserError();
    } else {
    	var tempJson = JSON.parse(oReq.responseText)
    	//alert(tempJson.title);
    	for(var i=0; i<tempJson.content.length; i++){
    		img.push(tempJson.content[i][0]);
    		paragraphs.push(tempJson.content[i][1]);
    	}
    	currpg=0;
    var bookContent = document.getElementById("c-right");
    bookContent.textContent = paragraphs[currpg];
    var bookPic = document.getElementById("c-left");
    bookPic.src = img[currpg];
    }
}

function turnLeft(){
	if(currpg==0){
		return;
	}else{
		currpg=currpg-1;
		var bookContent = document.getElementById("c-right");
    	bookContent.textContent = paragraphs[currpg];
    	var bookPic = document.getElementById("c-left");
    	bookPic.src = img[currpg];
    	document.getElementById("keys").textContent="";
    	document.getElementById("grammar").textContent="";
	}

}

function turnRight(){
	if(currpg==img.length-1){
		return;
	}else{
		currpg=currpg+1;
		var bookContent = document.getElementById("c-right");
    	bookContent.textContent = paragraphs[currpg];
    	var bookPic = document.getElementById("c-left");
    	bookPic.src = img[currpg];
    	document.getElementById("keys").textContent="";
    	document.getElementById("grammar").textContent="";
	}
}

function tellUserError() {
    inputBar = document.getElementById("bookname");
    inputBar.value = "";
    inputBar.placeholder = "Bad request try again";
}


function funcSentiment(){
	var oReq = new XMLHttpRequest();
	var url = "/Senfor/"+document.getElementById("c-right").textContent;
	oReq.open("GET", url);
	oReq.addEventListener("load", gotSenNowWhat);
	oReq.send();

	function gotSenNowWhat() {
		showSentiment(oReq);
	 }
}

function showSentiment(oReq){
	var temp = JSON.parse(oReq.responseText)
	//console.log(temp[0]);
	//console.log(temp[1]);
	if(temp[0]>0){
		var numredness = (temp[0]+1)*0.5*255;
		var redness = numredness.toString();
		document.getElementById("c-right").style.color= "rgb("+redness+",0,0)";
	}else if (temp[0]<0){
		var numblueness = (-temp[0]+1)*0.5*255;
		var blueness = numblueness.toString();
		document.getElementById("c-right").style.color= "rgb(0,0,"+blueness+")";
	}else{
		document.getElementById("c-right").style.color= "black";
	}
	//document.getElementById("c-right").style.color= (temp[1]+1)*0.5;
	document.getElementById("c-right").style.opacity= (temp[1]+1)*0.5;

}

function funcKeywords(){
	var oReq = new XMLHttpRequest();
	var url = "/Keyfor/"+document.getElementById("c-right").textContent;
	oReq.open("GET", url);
	oReq.addEventListener("load", gotKeyNowWhat);
	oReq.send();

	function gotKeyNowWhat() {
		showKeys(oReq);
	 }
}

function showKeys(oReq){
	var temp = JSON.parse(oReq.responseText)
	//console.log(temp[0]);
	//console.log(temp[1]);
	var element = document.getElementById("keys");
	element.textContent=temp[0]+",         "+temp[1];
}

function funcSyntax(){
	var oReq = new XMLHttpRequest();
	var url = "/Synfor/"+document.getElementById("c-right").textContent;
	oReq.open("GET", url);
	oReq.addEventListener("load", gotSynNowWhat);
	oReq.send();

	function gotSynNowWhat() {
		showSyn(oReq);
	 }
}

function showSyn(oReq){
	var temp = JSON.parse(oReq.responseText)
	//console.log(temp.length);
	var currElement = document.getElementById("grammar");
	for(var i=0; i<temp[0].length; i++){
		var newElement = document.createElement("div");
		newElement.className="smallSyn";
		newElement.textContent=temp[0][i]+" ("+temp[1][i]+") ";
		currElement.appendChild(newElement);
		//console.log(temp[0][i]);
		//console.log(temp[1][i]);
	}
	
}




