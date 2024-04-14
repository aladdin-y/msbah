$( function() {



    let storename = "Msbah",
     storeimg = "./imgs/msbah/loggg.png", 
    storedescription = "مرحبًا بك في متجر مصباح، المكان الأمثل لكل ما تحتاجه من خدمات ومنتجات تتعلق بعالم الويب والبرمجة. نفتخر بتقديم مجموعة متنوعة وشاملة من المنتجات التي تشمل خدمات API الكاملة، وسكربتات فايف إم، وبوتات دسكورد وتلجرام. تسوق معنا الآن واستمتع بأفضل الحلول التقنية بأسعار لا تُقاوم.";

    var storeImg = document.getElementById('storeImg');

    storeImg.href = storeimg;
    
 $(".storeinfo").empty();

 $(".storeinfo").append(`
 <img class="logo" style="width: 60px;" src=${storeimg} alt="logo">
 &nbsp; ${storename}
 `);

    
 $(".description").empty();

 $(".description").append(`
 <li class="mb-2">
${storedescription}
 </li>

 `);

 document.title = storename





//  https://api.msbah.xyz/msbah/all_feedbacks


$(".swiper-slides").empty();


$.get(` https://api.msbah.xyz/msbah/all_feedbacks`)
.then((data) => {
    data.all_feedbacks.forEach(feedback => {
    console.log(feedback)
 let stars = [];
        for(let i = 0; i < feedback.stars; i++){
       
        stars.push(` <i class="bi bi-star-fill"></i>`)
        }

        for(let i = 0; i <  5 - feedback.stars; i++){
       
        stars.push(` <i class="bi bi-star"></i>`)
        }
    $(".swiper-slides").append(`

    <swiper-slide id="slide1">

    <div class="card text-center" style="width: 18rem;">
      <div class="card-header">
      <img src="${feedback.avatar}" class="avatar" alt="...">
    </div>
     <div class="card-body">
        <h5 class="card-title">${feedback.name}</h5>
        <p class="card-text">${feedback.feedback}</p>    
      ${stars}
  
      </div>
    </div>
  
  </swiper-slide>
   
    `);
    });

});
});

