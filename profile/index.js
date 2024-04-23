
$( function() {
let gmail = getCookie("gmail") ;  


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

function user_info(){
    
      if(getCookie("login") == "true"){

 
          $.ajax({
            type: 'GET',
            url: `https://api.msbah.xyz/get_gmail/${getCookie("gmail")}/${getCookie("password")}`,
    
            success: function (result) {
                if(result.status == false) return;
                if(result.status == true){

                  document.getElementById('username').textContent =  result.name;
                  document.getElementById('gmail').textContent = result.gmail;
                    document.getElementById('previewImage').src = result.avatar;
                      

                }
          
    
              },
              error: function (err){
                var errorMessage = err.responseJSON && err.responseJSON.error ? err.responseJSON.error : "An error occurred.";
                if(errorMessage == "This email is invalid" || errorMessage == "This password is invalid"){
                  Swal.fire({
                    title: `Please login first`
                    // imageUrl: result.value.avatar_url
                  }).then((result) => {
   
                    document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "gmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    if (result.isConfirmed || result.isDismissed) {
                      window.location.href="../index.html";
                  return
  
                    }
                  });
                }
              },
              dataType: "json"
    
        });


}else {
  Swal.fire({
    title: `Please login first`
    // imageUrl: result.value.avatar_url
  }).then((result) => {

      document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "gmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (result.isConfirmed || result.isDismissed) {
      window.location.href="../index.html";
         
  return

    }
  });
}
}


setTimeout(() => {
  user_info();
  $( ".placeholder" ).removeClass( "placeholder" );

},3500)
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
            https://api.msbah.xyz/msbah/change/username/${getCookie("gmail")}/${getCookie("password")}/${name}
            `;
            const response = await fetch(url, {
          method: 'PUT',
      });
            if (!response.ok) {
              const err = JSON.stringify((await response.json()).error);
              if(err == "This password is invalid"){
                Swal.fire({
                  title: `Please login first`
                  // imageUrl: result.value.avatar_url
                }).then((result) => {  
                  
                  document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "gmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                  if (result.isConfirmed || result.isDismissed) {
                    window.location.href="../index.html";
                       
   
                return

                  }
                });
              }  
              return Swal.showValidationMessage(`
                ${err}
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

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
$(document).on('click', ".edit-gmail", async function() {
  await Swal.fire({
      title: "Change your Email",
      inputAttributes: {
          autocapitalize: "off"
      },
      html:
          '<input type="email" id="new_gmail" class="swal2-input"  placeholder="New Email">' +
          '<input id="main_password" type="password"  class="swal2-input"  placeholder="Password">',
      showCancelButton: true,
      confirmButtonText: "confirm",
      showLoaderOnConfirm: true,
      preConfirm: (() => {
          const gmail = $('#new_gmail').val();
          const password = $('#main_password').val();
          if (!gmail || !password || gmail == "" || password == "") {
              return Swal.showValidationMessage(`
                 Please fill out all fields
                `);
          }

          const gmail2 = gmail.split("@");
          if (gmail2.length < 2 || gmail2[1] == '') {
              return Swal.showValidationMessage(`
                  Please enter a valid email
                 `);
          }

return $.get(`https://api.msbah.xyz/encryptPassword/${password}`)
    .then((data) => {
        if (data.password != getCookie("password")) {
            throw new Error("This password is invalid");
        }

        return $.ajax({
            type: 'PUT',
            url: `https://api.msbah.xyz/msbah/change/gmail/${getCookie("gmail")}/${data.password}/${gmail}`,
            success: function(data2) {

                  Swal.fire({
                    title: `${data2.msg}`
                    // imageUrl: result.value.avatar_url
                  });
                       
          document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "gmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          setTimeout(()=> {
            setCookie("login", true,7)
            setCookie("gmail",gmail,7)
            setCookie("password", data.password,7)
            user_info()

          },0)
          
                
            },
            error: function (err){
              var errorMessage = err.responseJSON && err.responseJSON.error ? err.responseJSON.error : "An error occurred.";
              console.log(errorMessage)
                Swal.showValidationMessage(`
                    ${errorMessage}
                `);
            },
        });
    })
    .catch(error => {
      let errorMessage = error.responseJSON && error.responseJSON.error ? error.responseJSON.error : "An error occurred.";
      if(error == "Error: This password is invalid") errorMessage = error;
        Swal.showValidationMessage(`
            ${errorMessage}
        `);
    });







            
      })
  });
});






$(document).on('click',".logout",function(){
  if(getCookie("login") == "true"){
    
 
    Swal.fire({
        title: "Logout",
 
         text: "Are you sure you want to logout?",


        showCancelButton: true,
        confirmButtonText: "confirm",
        showLoaderOnConfirm: true,
     
      }).then((result) => {
        if (result.isConfirmed) {

      
          document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "gmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
          Swal.fire({
            title: `Successfully logout`
            // imageUrl: result.value.avatar_url
      }).then((result2) => {

        if (result2.isConfirmed || result2.isDismissed) {
            window.location.href="../index.html"
          }
          });

            
        
          
        }
   
});
};

});


});