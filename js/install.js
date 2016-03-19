$(document).ready(function()
{
    var databaseOk = false;
    var homeUrl = window.location.protocol + "//" + window.location.host + "/" + $("#baseElement").attr("href");
    
        

    function checkConnection()
    {
        $.ajax
        ({
            url: "server/checkConnection.php",
            type: "POST",
            success: function(data)
            {
                if(data == true)
                {
                    $("#connection").html("ok");
                    $("#connection").addClass("text-info");
                    databaseOk = true;
                }
                else
                {
                    $("#connection").html("fail");
                    $("#connection").addClass("text-danger");
                    databaseOk = false;
                }
            }
        });
    }

    function createMessages()
    {
        $("#progress").removeAttr("class");
        $.ajax
        ({
            url: "server/createMessages.php",
            type: "POST",
            success: function(data)
            {
                if(data == true)
                {   
                    $("#messagesSuccess").html("ok");
                    $("#messagesSuccess").addClass("text-info fade-in");
                    $("#installWarning2").html("");
                    createThemes();
                }
                else
                {
                    $("#messagesSuccess").html("fail");
                    $("#messagesSuccess").addClass("text-danger fade-in");
                    $("#installWarning2").html("Could not create messages table, check if you gave permissions in your sql server");
                }
            }
        });
    }

    function createThemes()
    {
        $.ajax
        ({
            url: "server/createThemes.php",
            type: "POST",
            success: function(data)
            {
                if(data == true)
                {   
                    $("#themesSuccess").html("ok");
                    $("#themesSuccess").addClass("text-info fade-in");
                    $("#installWarning2").html("");
                    createUsers();
                }
                else
                {
                    $("#themesSuccess").html("fail");
                    $("#themesSuccess").addClass("text-danger fade-in");
                    $("#installWarning2").html("Could not create themes table, check if you gave permissions in your sql server");
                }
            }
        });
    }

    function createUsers()
    {
        $.ajax
        ({
            url: "server/createUsers.php",
            type: "POST",
            success: function(data)
            {
                if(data == true)
                {   
                    $("#usersSuccess").html("ok");
                    $("#usersSuccess").addClass("text-info fade-in");
                    $("#installWarning2").html("");
                    createAdmin();
                }
                else
                {
                    $("#usersSuccess").html("fail");
                    $("#usersSuccess").addClass("text-danger fade-in");
                    $("#installWarning2").html("Could not create users table, check if you gave permissions in your sql server");
                }
            }
        });
    }

    function createAdmin()
    {
        var allData = {username: $("#username").val(), email: $("#email").val(), password: $("#password1").val()};
        allData = JSON.stringify(allData);

        $.ajax
        ({
            url: "server/createAdmin.php",
            type: "POST",
            data: allData,
            success: function(data)
            {
                if(data == true)
                {   
                    $("#adminSuccess").html("ok");
                    $("#adminSuccess").addClass("text-info fade-in");
                    $("#installWarning2").html("");
                    finishInstall();
                }
                else
                {
                    $("#adminSuccess").html("fail");
                    $("#adminSuccess").addClass("text-danger fade-in");
                    $("#installWarning2").html("Could not create admin user, check if your name doesn't contain forbidden letters!");
                }
            }
        });
    }

    function finishInstall()
    {
        $("#installationSuccess").removeAttr("class");
        $("#installForm").addClass("hidden");
        $("#username").val("");
        $("#email").val("");
        $("#password1").val("");
        $("#password2").val("");
        $("#mainScreen").attr("href", homeUrl);
    }

    $(document).on("submit", "#install-form", function(e)
    {
        e.preventDefault();
        checkConnection();
        if($("#password1").val() === $("#password2").val())
        {
            if(databaseOk)
            {
                createMessages();
            }
            else
            {
                $("#installWarning").html("Cannot connect to database, check your config.php");
            }
        }
        else
        {
            $("#installWarning").html("Your passwords doesn't match!");
        }
    });

    checkConnection();
    
});