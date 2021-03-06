const crypto = require('crypto')
const moment = require('moment')
const hash = crypto.createHash('sha256')

function generar(longitud){

	long=parseInt(longitud);
	var caracteres = "abcdefghijkmnpqrtuvwxyz12346789!@%#$'&/(”)=-_‚+ABCDEFGHIJKLMNPQRTUVWXYZ"
	var contraseña = "";
	for (i=0; i<long; i++) 
		contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));	
	var pass = `<label>Contraseña:</label> ` +
							`<input type="text" class="form-control" id="contraseña" value="`+contraseña+`" readonly>`;
	document.getElementById("pass").innerHTML=pass;

}

function timeout () {
	location.href = "index.html";
  localStorage.clear()
}

function add_usr () {
let U = document.getElementById('usr').value
let P = document.getElementById('pass').value
var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  
  if(U == "" || !mail.test(U)){
    document.getElementById('tooltiptext').style.visibility = "visible"
  }else if(P == "" || P.length <= 5){
    document.getElementById('tooltiptext2').style.visibility = "visible"
  }else{
    db.transaction(function (tx){      
      hash.update(P)
      var H = hash.digest('hex')
      tx.executeSql('INSERT INTO User(usr, pass) VALUES(?,?)',[U,H])
      Uadded()
    })  
  }
}

function add_contraseña (){
    let P = document.getElementById('nueva').value    
    if(P == "" || P.length <= 5){
      document.getElementById('tooltiptext2').style.visibility = "visible"
    }else{
    var f = moment().add(3, 'M').unix()
    localStorage.setItem('key2',P)
    hash.update (P)
    var H = hash.digest('hex')
      db.transaction(function(tx){
        tx.executeSql('UPDATE User SET pass=?', [H])
        tx.executeSql('UPDATE Up SET fecha=? WHERE id=?', [f , '1']);
  
        re_cif();
      })
    }
}
function encrypt(text, password){
  var cipher = crypto.createCipher('aes-256-cbc', password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
function decrypt(text, password){
  var decipher = crypto.createDecipher('aes-256-cbc', password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
	encrypt,
	decrypt
}