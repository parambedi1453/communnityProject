var colorLi = document.getElementById("sidebar-list");
colorLi.setAttribute("style","background-color:#337ab7;");


function getdata() {
        $.fn.dataTable.ext.errMode = 'none';
    var table = $('#userstable').DataTable( {
        //"lengthMenu": [10, 25, 50],
        "processing": true,
        "serverSide": true,
        "ajax" :
        {
                //"tradional" : "true",
            "url" :"/getpaginationtable",
            "type" : "POST",
            "data": function ( d )
            {
                d.role   = $('#role').val();
                d.status = $('#status').val();
            }
            //"dataType":"json",
        },
        "columns":[
            {
            "data" : "email"
            },
            {
            "data" :"phone",
            "sorting" : "false"
            },
            {
            "data" : "city"
            },
            {
            "data" : "status",
            "sorting" : "false",
            },
            {
            "data" : "role",
            "sorting" : "false",
            },
            {
            "data" : null,
            "sorting" : "false"
        },
        ],
        "columnDefs":[{
            "targets": -1,

            //addcol(data)
           "render": function (data, type, row, meta){
                console.log(typeof(data));
                //console.log(meta);
                //console.log(typeof(row));
                //console.log(type);


//                console.log(data._id);

                var ob = row.state;
                data = '<center><button class="btn btn-primary btn-sm action-btn" data-toggle="modal" data-target="#emailModal" onclick=sendMailto("'+row.email+'") style="background-color:rgb(0, 0, 0)"><span class="fa fa-envelope" style="color:"#fff"></span></button>'
                data=data+'<button class="btn btn-primary btn-sm action-btn" data-toggle="modal" data-target="#editModal" onclick=updateUser("'+row._id+'","'+row.email+'","'+row.phone+'","'+row.city+'","'+row.status+'","'+row.role+'")><span class="fa fa-edit" style="color : #fff;" ></span></button>'
                if(ob == '0')
                {
                    data = data+'<button class="btn btn-warning btn-sm action-btn" data-toggle="modal" data-target="#yellowModal" id="yellowbttn" onclick=updateState("'+row._id+'","'+row.state+'")><span class="fa fa-times-circle" style="color:#fff;"></span></center>'
                }
                else if(ob == '1')
                {
                    data = data+'<button class="btn btn-success btn-sm action-btn" data-toggle="modal" data-target="#greenModal" id="greenbttn" onclick=updateState("'+row._id+'","'+row.state+'")><span class="fa fa-check-circle" style="color:#fff;"></span></button></center>'
                }
                return data;
            }

        }],
    })
    $('#refresh').on('click', function () {
        table.ajax.reload(null, false);
    });

    $('#role').on('change', function () {
        table.ajax.reload(null, false);
    });

    $('#status').on('change', function () {
        table.ajax.reload(null, false);
    });
}

$(document).ready(function() {

  console.log("1");
  getdata()

})


function updateUser(uid,email,phone,city,status,role)
{
    console.log(uid);
    console.log(email);
    console.log(phone);
    console.log(city);
    console.log(status);
    console.log(role);
    $('#eheading').html("Update "+ email);
    $('#eusername').val(email);
    $('#ephone').val(phone);
    $('#ecity').val(city);
    $('#estatus').val(status.toLowerCase());
    $('#erole').val(role.toLowerCase());

    $("#eupdate").click(function(){

        var uob =
        {
            email : $("#eusername").val(),
            phone : $("#ephone").val(),
            city : $("#ecity").val(),
            status :  $("#estatus").val(),
            role : $("#erole").val(),
            id : uid
        }
        $.ajax({
               url: '/updatelist',
               type: 'post',
               dataType: 'json',
               contentType: 'application/json',
               success: function (data) {

               },
               data: JSON.stringify(uob)
           });

  });
}

function sendMailto(email)
{
    $("#emailto").val(email);
    $("#sendMailBttn").click(function(){

        var ob =
        {
            email : $("#emailto").val(),
            subject : $("#mailsubject").val(),
            textarea : $("#sendMail").val(),
        }

        var request = new XMLHttpRequest();
        var filename = '/mailPostrequest';
        request.open('POST',filename);
        request.setRequestHeader("content-Type","application/JSON");
        request.send(JSON.stringify(ob));
        request.onload = function()
        {
            console.log(request.responseText);
        }

    });

}
function updateState(uid,ustate)
{
    console.log(uid);
    console.log(ustate);

    $("#yellowyes").click(function(){

        var uob =
        {
            state : ustate,
            id : uid,
        }
        $.ajax({
               url: '/deactivate',
               type: 'post',
               dataType: 'json',
               contentType: 'application/json',
               success: function (data) {

               },
               data: JSON.stringify(uob)
           });
           window.location="/userlistPage";

    });

    $("#greenyes").click(function(){

        var uob =
        {
            state : ustate,
            id : uid,
        }
        $.ajax({
               url: '/activate',
               type: 'post',
               dataType: 'json',
               contentType: 'application/json',
               success: function (data) {

               },
               data: JSON.stringify(uob)
           });

           window.location="/userlistPage";
    });
}



    $(document).ready(function(){
      $.trumbowyg.svgPath="/trumbowyg.svg"
      $("#sendMail").trumbowyg();
   })
/*
$('#users-table').on('search.dt', function() {
    var value = $('.dataTables_filter input').val();
    console.log(value); // <-- the value
})
*/
