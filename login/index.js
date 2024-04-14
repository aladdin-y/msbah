$(document).ready(function(){
    $('#signup-form').submit(function(e){
        e.preventDefault(); // Prevent default form behavior

        var formData = $(this).serialize(); // Collect form data

        document.getElementById('error').textContent = '';

        var gmail = document.getElementById('gmail').value;
        var password = document.getElementById('password').value;
    
        if ( gmail.trim() === '' || password.trim() === '') {
            document.getElementById('error').textContent = 'Please fill out all fields';
            return;
        
         } else if(password.trim().length < 8 ){
            return document.getElementById('error').textContent = 'Password must be at least 8 characters long';
        
        }
        else {
            $.get('https://api.ipify.org?format=json')
            .then((data) => {


            $.ajax({
                type: 'POST',
                url: `https://api.msbah.xyz/msbah/login/${data.ip}/gmail/${gmail}/${password}`,

                success: function (result) {
                    if(result.status == false) return;
                    Swal.fire({
                        title: result.msg,
                        icon: "Success"
                      }).then((result) => {
                      console.log(result)
                      if (result.isConfirmed || result.isDismissed) {
                        window.location.href="../index.html"
                      }
                    });
                    

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
});
