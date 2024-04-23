$(document).ready(function(){
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // setCookie("login",false,0.01)

  // Successfully login
  $('#signup-form').submit(function(e){
    e.preventDefault(); 


    document.getElementById('error').textContent = '';

    var gmail = document.getElementById('gmail').value;
    var password = document.getElementById('password').value;
     if(getCookie("login") == "true"){
      return document.getElementById('error').textContent = 'You are already login';

    }
   else if ( gmail.trim() === '' || password.trim() === '') {
        document.getElementById('error').textContent = 'Please fill out all fields';
        return;
    
     } else if(password.trim().length < 8 ){
        return document.getElementById('error').textContent = 'Password must be at least 8 characters long';
    
    }
    else {

        $.get(`http://api.msbah.xyz/encryptPassword/${password}`)
        .then((data) => {
          $.ajax({
            type: 'GET',
            url: `http://api.msbah.xyz/get_gmail/${gmail}/${data.password}`,
    
            success: function (result) {
                if(result.status == false) return;
                if(result.status == true){
                  setCookie("login", true, 7);
                  setCookie("gmail", result.gmail, 7);
                  setCookie("password", result.password, 7);
                  Swal.fire({
                    title: "Successfully login",
                    icon: "Success"
                  }).then((result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    window.location.href="../index.html"
                  }
                });
                }
          
    
              },
              error: function (err){
                var errorMessage = err.responseJSON && err.responseJSON.error ? err.responseJSON.error : "An error occurred.";
    document.getElementById('error').textContent = errorMessage;
    
              },
              dataType: "json"
    
        });

          


        });
      }

});



$(document).ready(function() {
  $('#showPassword').click(function() {
      var passwordField = $('#password');
      var fieldType = passwordField.attr('type');
      if (fieldType === 'password') {
          passwordField.attr('type', 'text');
          $(this).text('Hide');
      } else {
          passwordField.attr('type', 'password');
          $(this).text('Show');
      }
  });
});



});
