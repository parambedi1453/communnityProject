function openbar()
{
    /*var k = document.getElementById("sidebar");
    if(k.style.width == "250px")
    k.style.width ="50px";
    else {
        k.style.width="250px";
    }*/
    var element = document.getElementById("viewscreen");
    element.classList.toggle("toggle-pc");

    var element = document.getElementById("sidebar");
    element.classList.toggle("sidebar-width");


    var element = document.getElementById("rightview");
    element.classList.toggle("set-rightview");



}
function open_adduser_page()
{
    window.location = "/admin/addUser"
}
function changepassword()
{
    window.location ='/admin/changePassword'
}
function admincomm()
{
    window.location ='/adminComm'
}
function homepage()
{
    window.location = "/admin/profilePage"
}
function opentagpage()
{
    window.location = "/admin/tagPage"
}


function openuserlist()
{
    window.location="/admin/userlistPage";
}
/**************************************************************************/
/* switch to user  side function */
function switchyes()
{
    window.location = "/communityPanel";
}
function updateprofilepage()
{
    window.location = "/switcheditbtn";
}
function openCommpage()
{
    window.location = "/communityPanel";
}
function changepassword2()
{
    window.location = "/changePassword2";
}

/************##########################################***********************/
/* switch to user */
function switchToadmin()
{
    window.location = "/profilePage"
}
// ON CLICKING ON GEADERS PHOTO
function openeditpage()
{
    window.location ='/btneditProfile'
}
//LOGOUT YES BUTTON ONCLICk
function gotologinpage()
{
    window.location = '/exit'
}
