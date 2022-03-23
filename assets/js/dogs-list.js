let dogsContainerEl = document.querySelector("#dog-list-container");
let limitWarningEl = document.querySelector("#limit-warning");

// // temp search parameters to ensure this code works
// let dogAge = "young,adult";
// let dogSize = "large";
// let dogBreed = "shepherd";
// let dogGender = "male,female";
// let dogLocation = "43202";

// get list of adoptable dogs that meet user criteria submitted in form on landing page
function getAdoptionList(dogAge, dogSize, dogBreed, dogGender, dogLocation) {
  //window.location.href = "./adoptable-dogs.html";
  console.log(dogAge, dogSize, dogBreed, dogGender, dogLocation);
  // var requestUrl = "https://api.petfinder.com/v2/animals?type=dog&status=adoptable&limit=30&age=" + dogAge + "&size=" + dogSize + "&breed=" + dogBreed + "&gender=" + dogGender + "&location=" + dogLocation;

  // // make request to url
  // fetch(requestUrl, { 
  //   method: "GET", 
  //   headers: new Headers({
  //     "Authorization": "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJveE5rRDV6MWlmWklWazYwQTlUcEdEdnc5V2ZIVDlLN3lhb2p6YkFISXZkWlFtYW9rMiIsImp0aSI6ImNlM2YwZjhjZGE2NDFlNjJkZDQ3MTBiYWMwMTMyZmEwODU5NjgwZGNhNTlhZWYxZWM5OTM3NzY3MGY0OWU3NDQwNTc0N2NiZWYwZjI2M2UzIiwiaWF0IjoxNjQ4MDUyMTEyLCJuYmYiOjE2NDgwNTIxMTIsImV4cCI6MTY0ODA1NTcxMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.Q9OWcfHn5XvghKm7qVBEn0TIFWlTWkTDcULuaKD4pmnD8kLVwdoj6Q67ggEVzanQAfSIlJZvtLJ16Z9ScPiDDIrj37K6tLc4yyhvanHwihRDjcVTuwoNVoESAFYJKoH9Z_qyMDmDp4JNd2jvMM5gsJotX7-Txm-gCqeIwW1_nKKgMz8jtO2B7gQwZL9Lddfu9VNZktNC59uMcgF38qCxe4heXy1Zcr9IICgZqUHkf8XQj0M_jhu_iDJTGIXwFmdXeEPnERwsg91-Z_R6Qk5JtFBMPQRs14FMQ5Vmv9nrez7uNAM2LUFvW-8KuKHrPJ9lYCrjval_5MthyizRw1fHJg", 
  //   })
  // })
  //   .then(function(response) {
  //     // request was successful
  //     if (response.ok) {
  //       response.json().then(function(data) {
  //         // send response data to function to display list of dogs
  //         console.log(data);
  //         displayDogs(data);

  //         // check if api has paginated issues
  //         if (data.pagination.total_count > 30) {
  //         displayWarning();
  //         }
  //       })
  //     }
  //     else {
  //       // if not successful, display error message
  //       console.log("error message");
  //     }
  //   }); 
}

let displayDogs = function(dogs) {
  if (dogs.animals.length === 0) {
    console.log("no available dogs")
    dogsContainerEl.textContent = "There are no available dogs near you that match your criteria. Please try again.";
    return;
  }
  // if more than 30 animals in returned array, display first 30
  if (dogs.animals.length > 30) {
    dogs.animals.length = 30;
  }
  // loop over adoptable dogs
  for (let i = 0; i < dogs.animals.length; i++) {
    // define dog id
    let dogId = dogs.animals[i].id;
    // create a link element container for each dog
    let dogEl = document.createElement("a");
    dogEl.classList = "flex max-w-full rounded overflow-hidden shadow-lg align-middle";
    dogEl.setAttribute("href", "./page3.html?dog=" + dogId);

    // create div for image of dog to display
    let dogImageEl = document.createElement("div");
    dogImageEl.classList = "flex items-center px-6 py-4";

    // define image url
    if (dogs.animals[i].primary_photo_cropped === null) {
      dogImageEl.innerHTML = "<img src='./assets/images/img_placeholder.png' alt='dogs.animals[i].name' />";
    }
    else {
      let dogImageUrl = dogs.animals[i].primary_photo_cropped.full;
      let urlEnding = dogImageUrl.split("=")[1];
      dogImageEl.innerHTML = "<img src='https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/" + dogId + "/1/?bust=" + urlEnding + "&width=300' alt='dogs.animals[i].name' />";
    }

    // append to link element container
    dogEl.appendChild(dogImageEl);

    // create a container for the dog information
    let dogInfoContainer = document.createElement("div");
    dogInfoContainer.classList = "px-6 py-4";

    // create a title element that displays dog's name
    let dogName = dogs.animals[i].name;
    let dogTitleEl = document.createElement("h2");
    dogTitleEl.classList = "font-bold text-xl mb-2";
    dogTitleEl.textContent = "Meet " + dogName;

    // create a div element that displays dog's basic information
    let primaryDogBreed = dogs.animals[i].breeds.primary;
    let ageOfDog = dogs.animals[i].age;
    let sexOfDog = dogs.animals[i].gender;
    let dogInfoEl = document.createElement("div");
    //dogInfoEl.classList = "";
    dogInfoEl.innerHTML = "<p class='flex flex-wrap'>Breed: " + primaryDogBreed + "</p><p class='flex flex-wrap'>Age: " + ageOfDog + "</p><p class='flex flex-wrap'>Gender: " + sexOfDog + "</p>";

    // append title and paragraph to dog info container
    dogInfoContainer.appendChild(dogTitleEl);
    dogInfoContainer.appendChild(dogInfoEl);

    // append dog info container to link element container
    dogEl.appendChild(dogInfoContainer);

    dogsContainerEl.appendChild(dogEl);
  }
}

let displayWarning = function() {
  // add text to warning container
  limitWarningEl.textContent = "To see more than 30 dogs, visit ";

  // create a link to petfinder.com 
  let linkEl = document.createElement("a");
  linkEl.textContent = "Petfinder.com";
  linkEl.setAttribute("href", "https://www.petfinder.com/search/dogs-for-adoption/us");
  linkEl.setAttribute("target", "_blank");

  // append link to warning container
  limitWarningEl.appendChild(linkEl);
}


//getAdoptionList();