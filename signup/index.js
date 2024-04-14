$(document).ready(function(){
    $('#signup-form').submit(function(e){
        e.preventDefault(); // Prevent default form behavior

        var formData = $(this).serialize(); // Collect form data

        document.getElementById('error').textContent = '';

        var username = document.getElementById('username').value;
        var gmail = document.getElementById('gmail').value;
        var password = document.getElementById('password').value;
    
        if (username.trim() === '' || gmail.trim() === '' || password.trim() === '') {
            document.getElementById('error').textContent = 'Please fill out all fields';
            return;
        } else if(username.trim().length < 6 ){
            return document.getElementById('error').textContent = 'Username must be at least 6 characters long';
        
        }else if(password.trim().length < 8 ){
            return document.getElementById('error').textContent = 'Password must be at least 8 characters long';
        
        }
        else {
            $.ajax({
                type: 'POST',
                url: `https://api.msbah.xyz/msbah/signup/${username}/${gmail}/${password}`,

                success: function (result) {
                    if(result.status == false) return;
                    Swal.fire({
                        title: result.msg,
                        icon: "Success"
                      }).then((result) => {
                      console.log(result)
                      if (result.isConfirmed || result.isDismissed) {
                        window.location.href="../login/index.html"
                      }
                    });

                  },
                  error: function (err){
                    var errorMessage = err.responseJSON && err.responseJSON.error ? err.responseJSON.error : "An error occurred.";
        document.getElementById('error').textContent = errorMessage;

                  },
                  dataType: "json"

            });
        }
    
    });
});
