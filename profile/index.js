
$( function() {
let gmail ;    

function user_info(){
    
    $.get('https://api.ipify.org?format=json')
    .then((data) => {
        $.get(`https://api.msbah.xyz/msbah/user_info/${data.ip}`)
        .then((data) => {
            
            gmail = data.gmail;

            document.getElementById('username').textContent = data.username;
        document.getElementById('gmail').textContent = data.gmail;
          document.getElementById('previewImage').src = data.avatar;
            
          $( ".info" ).filter( ".edit-btn" ).css( "background-color", "red" );

        });

    });
}


user_info()

document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('previewImage').src = e.target.result;
      }
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append('image', file);
    
      fetch(`https://api.msbah.xyz/avatars/${gmail}`, {
          method: 'POST',
          body: formData
      })
      .then(response => {
          if (response.ok) {
              console.log('تم تحميل الصورة بنجاح');
          } else {
              console.error('حدث خطأ أثناء تحميل الصورة');
          }
      })
      .catch(error => {
          console.error('حدث خطأ أثناء تحميل الصورة:', error);
      });
  }
});
  
$(document).on('click',".edit-name",function(){
    
    $.get('https://api.ipify.org?format=json')
    .then((data) => {
    Swal.fire({
        title: "Change your name",
        input: "text", 
        inputAttributes: {
          autocapitalize: "off"
        },
         text: "Enter the new name",


        showCancelButton: true,
        confirmButtonText: "confirm",
        showLoaderOnConfirm: true,
        preConfirm: async (name) => {
          try {
            const url = `
            https://api.msbah.xyz/msbah/change/username/${data.ip}/${name}
            `;
            const response = await fetch(url, {
          method: 'PUT',
      });
            if (!response.ok) {
              return Swal.showValidationMessage(`
                ${JSON.stringify((await response.json()).error)}
              `);
            }
            return response.json();
          } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.msg}`
            // imageUrl: result.value.avatar_url
          });
          
          user_info()
        }
      });
});
});
$(document).on('click',".edit-gmail",function(){
    
    $.get('https://api.ipify.org?format=json')
    .then((data) => {
    Swal.fire({
        title: "Change your Email",
        input: "email", 
        inputAttributes: {
          autocapitalize: "off"
        },
         text: "Enter the new Email",


        showCancelButton: true,
        confirmButtonText: "confirm",
        showLoaderOnConfirm: true,
        preConfirm: async (name) => {
          try {
            const url = `
            https://api.msbah.xyz/msbah/change/gmail/${data.ip}/${name}
            `;
            const response = await fetch(url, {
          method: 'PUT',
      });
            if (!response.ok) {
              return Swal.showValidationMessage(`
                ${JSON.stringify((await response.json()).error)}
              `);
            }
            return response.json();
          } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.msg}`
            // imageUrl: result.value.avatar_url
          });
          
          user_info()
        }
      });
});
});





$(document).on('click',".logout",function(){
    
    $.get('https://api.ipify.org?format=json')
    .then((data) => {
    Swal.fire({
        title: "Logout",
 
         text: "Are you sure you want to logout?",


        showCancelButton: true,
        confirmButtonText: "confirm",
        showLoaderOnConfirm: true,
     
      }).then((result) => {
        if (result.isConfirmed) {

  
            
            
            $.ajax({
                type: 'POST',
                url: `https://api.msbah.xyz/msbah/logout/${data.ip}`,

                success: function (result) {
                    Swal.fire({
                        title: `${result.msg}`
                        // imageUrl: result.value.avatar_url
                  }).then((result2) => {
            
                    if (result2.isConfirmed || result2.isDismissed) {
                        window.location.href="../index.html"
                      }
                      });
                  },
                  error: function (err){
                    var errorMessage = err.responseJSON && err.responseJSON.error ? err.responseJSON.error : "An error occurred.";
        // document.getElementById('error').textContent = errorMessage;
console.log(errorMessage)
                  },
                  dataType: "json"

            });
            
        
          
        }
      });
});
});


});