
let rowData = document.getElementById("rowData");



function openSideNav() {
    $(".side").animate({
        left: 0
    }, 500)


    $(".open-side").removeClass("fa-align-justify");
    $(".open-side").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side .nav-side").outerWidth()
    $(".side").animate({
        left: -boxWidth
    }, 500)

    $(".open-side").addClass("fa-align-justify");
    $(".open-side").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side i.open-side").click(() => {
    if ($(".side").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

$(function(){
    $(".loader").fadeOut(1000, function(){
        $('.loning-screen').fadeOut(1000);
        $('body').css({    overflow: 'auto'})
    })
})


 let arr=[];


 ////////////******* Categories ********/////////////////


async function getCategories(){
      let respons= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
      let date = await respons.json()
      arr = date.categories;

      console.log(arr);
      displaycategories();
}

let categories = document.getElementById('Categories')
categories.addEventListener('click', function(){
    getCategories();
    closeSideNav();
})
function displaycategories(){
    cartona = ``
    for(let i=0 ; i<arr.length ; i++){
        cartona+=`
                 <div class="col-md-3">
                    <div class="card position-relative rounded-3 text-center">
                        <img src="${arr[i].strCategoryThumb}" class="card-img-top rounded-3" alt="...">
                            <div class="card-text ">
                                <h3 class="h2">${arr[i].strCategory}</h3>
                                <p >${arr[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}</p>
                            </div>
                    </div>
                </div>
        ` }
    document.querySelector('.row').innerHTML = cartona;
    CardInfo(arr)

}


/////////////****** Area **********/////////////////////


async function getArea(){
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   respon = await respons.json();
      console.log(respon.meals);
      displayArea(respon.meals);
}
let Area = document.getElementById("Area");
Area.addEventListener('click', function(){
    getArea();
    closeSideNav();
})
function displayArea(arr){
    rowData.innerHTML = ""
    cartona = ``
    for(let i=0 ; i<arr.length ; i++){
        cartona+=`
         <div class="col-md-3">
                    <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                     <h3 class="text-white">${arr[i].strArea}</h3>
            </div>
        ` }
    document.querySelector('.row').innerHTML = cartona
    CardInfo(arr)

}


////////////******* Ingredient *******//////////////////////


let ingredient = document.getElementById("Ingredients");
ingredient.addEventListener('click', function(){
    getIngredients();
    closeSideNav();
})
async function getIngredients() {
    rowData.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayIngredient(respone.meals.slice(0, 20))

}
function displayIngredient(arr){
    rowData.innerHTML = ""
    cartona = ``
    for(let i=0 ; i<arr.length ; i++){
        cartona+=`
         <div class="col-md-3">
                <div class="rounded-2 text-center cursor-pointer text-whit">
                        <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                        <h3 class="text-white">${arr[i].strIngredient}</h3>
                        <p class = "text-white">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        ` }
    // document.querySelector('.row').innerHTML = cartona;
    rowData.innerHTML = cartona;
    CardInfo(arr)

}


//////////////******* Meals *******//////////////////////////

async function getMeals() {
    rowData.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
`)
    respone = await respone.json()
    // console.log(respone);
    displayMeals(respone.meals.slice(0, 20))

}

getMeals();
function displayMeals(arr) {
    let cartona = "";
        for(let i=0 ; i<arr.length ; i++){
            cartona+=`
                <div class="col-md-3 car" id="getDetails "> 
                    <div class="card position-relative rounded-3 text-center ">
                        <img src="${arr[i].strMealThumb}" class="card-img-top rounded-3" alt="...">
                            <div class="card-text rounded-3">
                                <h3 class=" d-flex justify-content-center align-items-center h-100">${arr[i].strMeal}</h3>
                            </div>
                    </div>
                </div>
        `
    }

    rowData.innerHTML = cartona;    
    CardInfo(arr)
}

// let getDetails = document.getElementById('getDetails');
// getDetails.addEventListener('click', function(){
//   console.log("hello");
// })

// async function getMealDetails(mealID) {
//     closeSideNav()
//     rowData.innerHTML = ""
//     // searchContainer.innerHTML = "";


//     let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`);
//     respone = await respone.json();
//     displayMealDetails(respone.meals[0])
//     console.log(respone.meals[0]);
// }

///////////******   MealsDetalies ******//////////////

function CardInfo() {
    let showCard = $(".car")
    for (let i = 0; i < showCard.length; i++) {
        showCard.eq(i).click(async function () {
            
            console.log("data");
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`)
            let data = await res.json()
            console.log(data);
            displayMealDetails(data)


        })

    }

   
}
function displayMealDetails(arr) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (arr[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${Areameals.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${meal.ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${arr[i].tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartona;
    CardInfo(arr)
}






















/////////////********* Contact Us *******/////////////////// 

 let contactUs = document.getElementById('contact');
 contactUs.addEventListener('click', function(){
    showContacts();
    closeSideNav();
 })


function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}



function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}








function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
  

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])

}

async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])


}