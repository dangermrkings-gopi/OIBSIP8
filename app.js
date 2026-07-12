// SHA-256 PASSWORD HASHING

async function hashPassword(password){


let data =
new TextEncoder()
.encode(password);



let hash =
await crypto.subtle.digest(
"SHA-256",
data
);



return Array.from(
new Uint8Array(hash)
)

.map(
x=>x.toString(16)
.padStart(2,"0")
)

.join("");

}



// REGISTER

async function register(){


let username =
registerEmail.value.trim();


let password =
registerPassword.value;



if(!username || !password){

registerMsg.innerHTML =
"⚠ Fill all fields";

return;

}



if(password.length < 8 ||
!/\d/.test(password)){


registerMsg.innerHTML =
"⚠ Password requires 8 characters and one number";


return;

}



let users =
JSON.parse(
localStorage.getItem("users")
) || [];



let exists =
users.some(
user=>user.username===username
);



if(exists){

registerMsg.innerHTML =
"❌ User already exists";

return;

}



let encrypted =
await hashPassword(password);



users.push({

username,

password:encrypted

});



localStorage.setItem(
"users",
JSON.stringify(users)
);



registerMsg.innerHTML =
"✅ Account Created";


setTimeout(()=>{

location.href="index.html";

},1500);



}




// LOGIN


async function login(){


let username =
loginEmail.value.trim();


let password =
loginPassword.value;



if(!username || !password){

loginMsg.innerHTML=
"⚠ Complete all fields";

return;

}



let users =
JSON.parse(
localStorage.getItem("users")
) || [];



let encrypted =
await hashPassword(password);



let user =
users.find(
u=>
u.username===username &&
u.password===encrypted
);



if(!user){


loginMsg.innerHTML =
"❌ Invalid login details";


return;


}




localStorage.setItem(
"session",
username
);



location.href=
"dashboard.html";

}




// PROTECTED PAGE


function protectPage(){


let session =
localStorage.getItem("session");



if(!session){

location.href=
"index.html";

return;

}



welcome.innerHTML =
"Hello "+session+" ✨";


}




// LOGOUT


function logout(){


localStorage.removeItem(
"session"
);


location.href=
"index.html";


}
