


loadFromServer();

var Arr = [];
function loadFromServer()
{
    var getCommid = document.getElementById("getId").innerHTML;
    var ob = new Object();
    ob.id = getCommid;
    var request = new XMLHttpRequest();
    // var filename = '/getCommDiscusions';
    var filename = '/getDiscussion'
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        //console.log(request.responseText);
        var obj = JSON.parse(request.responseText);
        console.log("************UIHKNJVBKHNK")
        console.log(obj);
        //console.log(obj.commdiscussion);
        for(var i in obj.commdiscussion)
        {
            // console.log(obj.commdiscussion[i].ddetail)
            addToDom(obj.commdiscussion[i]);
        }
    }

}

function addToDom(ob)
{   
     
    let divblock = '<div class="panel panel-default" style="box-shadow: 0 3px 10px 0 rgba(115,143,147,.3);">'
       + '<div class="panel-body" style="padding-top:10px">'
            +'<div class="col-sm-12 col-xs-12 col-lg-12 col-md-12" style="border: 0, sans-serif;  font-weight: bold; word-wrap: break-word;font-size: 20px;outline: none !important; background-color: rgba(0, 0, 0, 0)">'
                +'<a style="color: #337ab7;">'+ob.dtitle+'</a>'
            +'</div>'
            +'<div class="col-sm-12 col-xs-12 col-lg-12 col-md-12" style="border: 0;font-weight: 600;word-wrap: break-word;font-size: 12px;  color: #757575;margin: 5px auto 10px auto; outline: none !important;background-color: rgba(0, 0, 0, 0);">'
                +'<a style="color: #337ab7;">'+ob.downer+'</a>'
            +'</div>'
        +'</div>'
        +'<div class="panel-body" style="padding-top:10px">'
            +'<div class="col-sm-12 col-xs-12 col-lg-12 col-md-12" style="border: 0;word-wrap: break-word; font-size: 16px;color: #000;outline: none !important;background-color: rgba(0, 0, 0, 0);">'
                +ob.ddetail
            +'</div>'
        +'</div>'
        +'<div class="panel-body" style="padding-top:10px">'
            +'<div class="col-sm-4 col-md-3 col-lg-2 col-xs-8">'
                +'<a onclick=showComment("'+ob._id+'")><i class="fa fa-comment-alt"></i></a>'
                +'<ul id="commentList" style="display:none">'
                +'</ul>'
            +'</div>'
        +'</div>'
        +'<div class="panel-body" style="padding:0">'
            +'<div class="col-sm-12 col-xs-12 col-lg-12 col-md-12" style="padding: 10px 0px 10px 0px;border-top: 1px solid rgb(223, 223, 223);display: inline;">'
                +'<div class="col-sm-1 col-md-1 col-xs-2">'
                    +'<img src="/default.png" style="height: 35px !important; width: 35px !important;margin-left: 0;border-radius: 50%;opacity: 0.5;"></img>'
                +'</div>'
                +'<div class="col-sm-11 col-md-11 col-xs-10">'
                    +'<div style="position: relative; display: table;border-collapse: separate;padding:5px">'
                        +'<textarea id="commentid" style="position: relative;z-index: 2;float: left;width: 100%; margin-bottom: 0;"></textarea>'
                        +'<span class="input-group-btn" style="padding-left:5px"> <button class="btn btn-warning" onclick=postComment("'+ob._id+'") >Post</button></span>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>'

    $("#discussionList").append(divblock)
}


// Show commment
function showComment(did)
{
    var ob = new Object();
    ob.id = did;
    var request = new XMLHttpRequest();
    var filename = '/getComments'
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        var obj = JSON.parse(request.responseText);
        console.log(obj);
        //console.log(obj.commdiscussion);
        for(var i in obj.dcomments)
        {
            console.log(obj.dcomments.ctitle)
            // addToDom(obj.commdiscussion[i]);
        }
       
    }

}




// Enter Comment 
function postComment(idd)
{
    console.log(idd)
    var clickday = new Date();
    var dd = clickday.getDate();
    var mm = clickday.getMonth();
    var yyyy = clickday.getFullYear();
    var hrs = clickday.getHours();
    var mins = clickday.getMinutes();
    var format = "AM";
    if(hrs>12)
    {
        hrs = hrs-12;
        format="PM";
    }
    clickday = + dd + '-' + getMonths(mm) + '-' + yyyy;

    //did is the dicusssionnid to which comment is made
    var ob = new Object();
    
    ob.ctitle = $("#commentid").val();
    ob.cdate = clickday
    ob.cdel="0";
    ob.cowner=document.getElementById("pname").innerHTML;
    ob.did = idd

    console.log(ob);
    var request = new XMLHttpRequest();
    var filename ='/addComment'
    request.open('POST',filename)
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        console.log(request.responseText);
        // this is done because url link changes as form hence on refreshng will redirect wrong hence this window .location will redirect it 
        //  window.location = '/community/discussions/'+getCommid

    }
}


//ennter discusion
var postbtn = document.getElementById("discussionPost");
function getMonths(monthno)
  {
    var month=["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[monthno-1];
  }
postbtn.onclick = function()
{

    //DATE
    var clickday = new Date();
    var dd = clickday.getDate();
    var mm = clickday.getMonth();
    var yyyy = clickday.getFullYear();
    var hrs = clickday.getHours();
    var mins = clickday.getMinutes();
    var format = "AM";
    if(hrs>12)
    {
        hrs = hrs-12;
        format="PM";
    }
    clickday = + dd + '-' + getMonths(mm) + '-' + yyyy;
    // clickday = clickday + " ( " + hrs + ':' + mins + ' ' + format + " )";
    console.log(clickday);
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    var getCommid = document.getElementById("getId").innerHTML;
    var title = document.getElementById("discussionTitle").value;
    var detail = document.getElementById("discussionDetails").value;
    var pname = document.getElementById("pname").innerHTML;//PERSON DETAILS
    var pid = document.getElementById("pid").innerHTML;//PersonID
    var ob = new Object();
   
    ob.dtitle = title;
    ob.ddetail = detail;
    ob.downer = pname;
    ob.ddate = clickday;
    ob.commid = getCommid;
    
    var request = new XMLHttpRequest();
    // var filename = '/enterCommDiscusions';
    var filename = '/createDiscussion'
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        console.log(request.responseText);
        // this is done because url link changes as form hence on refreshng will redirect wrong hence this window .location will redirect it 
         window.location = '/community/discussions/'+getCommid

    }

}
