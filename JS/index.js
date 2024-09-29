/*--All variables on the site--*/
var userName=document.querySelector("section.SignUp div.container input#Name");
var userEmail=document.querySelector("section.SignUp div.container input#EmailToSignUp");
var userPassword=document.querySelector("section.SignUp div.container input#passToSignUp");
var buttonSignUp=document.querySelector("section.SignUp div.container button.buttonSignUp");
var buttonLogin=document.querySelector("section.Login div.container button.buttonLogin");
var linkOfPageSignin=document.querySelector("section.SignUp div.container a.linkOfPageSignin");
var linkOfPageLogout=document.querySelector("section.Login div.container a.linkOfPageLogout");
var logoutInHome=document.querySelector("section.home button.logoutInHome");
var userPasswordInSignin=document.querySelector("section.Login div.container input#passLogin");
var loginPage=document.querySelector("body section.Login");
var infoStates=document.querySelector("section.SignUp p.status");
var regex={
    regexName:/^[A-Z].{3,}(\s.{1,})?$/,
    regexEmail:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    regexPassword:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}/
}
var indexOfUser=0;
var allUsers=[];
if(localStorage.getItem("allUsers")){
    allUsers=JSON.parse(localStorage.getItem("allUsers"));
}

/*--Checks if the user exists or not--*/
function checkUserPresent(){
    for(var i=0;i<allUsers.length;i++){
        if(allUsers[i].email==userEmail.value){
            return true;
        }
    }
}

/*--remove all inputs and statu in sign up--*/
function reasetSignUp(){
    userName.value="";
    userEmail.value="";
    userPassword.value="";
}

/*--remove all inputs and statu in signin--*/
function reasetLogin(){
    userPasswordInSignin.value="";
    userPasswordInSignin.previousElementSibling.value="";
}

/*--Adds a user--*/
function addUser(){
        var bool=checkUserPresent();
        if(validation(regex.regexName,userName)&validation(regex.regexEmail,userEmail)&validation(regex.regexPassword,userPassword)){
        if(!bool){
            var user={
                name:userName.value,
                email:userEmail.value,
                password:userPassword.value
            }
            infoStates.classList.replace("d-none","d-block");
            infoStates.classList.add("mt-4");
            infoStates.style.color="green";
            infoStates.textContent="Success";
            allUsers.push(user);
            localStorage.setItem("allUsers",JSON.stringify(allUsers));
            reasetSignUp();
        }
        else{
            infoStates.classList.replace("d-none","d-block");
            infoStates.classList.add("mt-4");
            infoStates.style.color="red";
            infoStates.textContent="Email already exists";
        }
    }
}
buttonSignUp.addEventListener("click",addUser);

/*--Makes you move to sign in--*/
function goToSignin(){
    loginPage.classList.replace("d-none","d-block");
    loginPage.previousElementSibling.classList.replace("d-block","d-none");
    loginPage.nextElementSibling.classList.replace("d-block","d-none");
    infoStates.classList.replace("d-block","d-none");
}
linkOfPageSignin.addEventListener("click",goToSignin);
logoutInHome.addEventListener("click",function(){
    goToSignin();
    userPasswordInSignin.nextElementSibling.classList.replace("d-block","d-none");
});

/*--Makes you move to Logout--*/
function goToLogout(){
    loginPage.classList.replace("d-block","d-none");
    loginPage.previousElementSibling.classList.replace("d-none","d-block");
    userPasswordInSignin.nextElementSibling.classList.replace("d-block","d-none");
}
linkOfPageLogout.addEventListener("click",goToLogout);

/*--Opens the home page--*/
function openHome(){
    if(verifyInfo()){
        var indexElement=verifyInfo()-1;
        var YourName =document.querySelector("section.home span#YourName");
        loginPage.nextElementSibling.classList.replace("d-none","d-block");
        loginPage.classList.replace("d-block","d-none");
        YourName.textContent=allUsers[indexElement].name;
        reasetLogin();
    }
    else{
        userPasswordInSignin.nextElementSibling.classList.replace("d-none","d-block");
        userPasswordInSignin.nextElementSibling.classList.add("mt-4");
        userPasswordInSignin.nextElementSibling.style.color="red";
        userPasswordInSignin.nextElementSibling.textContent="incorrect email or password"
    }
}
buttonLogin.addEventListener("click",openHome);

/*--Verifies the accuracy of the information--*/
function verifyInfo(){
    for(var i=0;i<allUsers.length;i++){
        if(allUsers[i].email==userPasswordInSignin.previousElementSibling.value&&
            allUsers[i].password==userPasswordInSignin.value){
                return i+1;
        } 
    }
}

/*--Verifies that the conditions for entering the information are met--*/
function validation(regexes,element){
    if(regexes.test(element.value)){
        element.nextElementSibling.classList.replace("d-block","d-none");
        element.nextElementSibling.classList.add("is-valid");
        element.nextElementSibling.classList.remove("is-invalid");
        return true;
    }
    else{
        element.nextElementSibling.classList.replace("d-none","d-block")
        element.nextElementSibling.classList.remove("is-valid");
        element.nextElementSibling.classList.add("is-invalid");
        return false;
    }
}
userName.addEventListener("blur",function(){
    validation(regex.regexName,userName);
});
userEmail.addEventListener("blur",function(){
    validation(regex.regexEmail,userEmail);
});
userPassword.addEventListener("blur",function(){
    validation(regex.regexPassword,userPassword);
});
