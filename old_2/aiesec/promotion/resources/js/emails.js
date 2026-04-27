// var text = mails.value;
var allinfo;

function grabEmails() {
	texttab = allinfo.split(' ');
	for (var a of texttab) { 	
		if (a.indexOf('@') > -1) {
			console.log(a);	
			var p = document.createElement('p');
			p.innerHTML += a+'\n';
			result.appendChild(p)
		} 
	}
}
