const dogListUl = document.querySelector("#dog-list-ul")
const dogModal = document.querySelector(".modal")
const span = document.getElementsByClassName("close")[0];


let allDogs = async () => {
    let response = await fetch("http://localhost:3000/dogs")
    let dogs = await response.json()
    dogs.forEach((dog) => {
        // create dog element
        let dogLi = document.createElement("li")
        dogLi.addEventListener("click", () => {
            // get modal
            let modalContent = document.querySelector("#dog-modal")

            // clear previous content
            let child = modalContent.lastElementChild;  
        while (child) { 
            modalContent.removeChild(child); 
            child = modalContent.lastElementChild; 
        }
            // add dog img to modal
            let modalImg = document.createElement("img")
            modalImg.setAttribute("class", "modal-img")
            modalImg.src = dog.image_url

            // add rating to modal
            let modalRating = document.createElement('h3')
            modalRating.innerText = `Rating: ${dog.rating.value}/10`

            // add rate dog button to modal
            let addRating = document.createElement('h4')
            addRating.innerText = "Rate This Dog"
            addRating.addEventListener("click", () =>{
                let ratingInput = document.createElement("input")
                modalContent.append(ratingInput)

                let submitButton = document.createElement("button")
                submitButton.innerText = "Submit Rating"
                submitButton.addEventListener("click", ()=>{
                    dog.rating.value = ratingInput.value
                    modalRating.innerText = `Rating: ${ratingInput.value}/10`
                    modalContent.append(modalRating)
                    console.log(dog.rating.value)
                })
                modalContent.append(submitButton)


            })

            // append content to modal 
            modalContent.append(modalImg)
            modalContent.append(modalRating)
            modalContent.append(addRating)

            dogModal.style.display = "block";
        })

        // create dog image
        let dogImg = document.createElement("img")
        dogImg.className = "dog-img"
        dogImg.src = dog.image_url

        // create display rating
        // let dogRating = document.createElement('h3')
        // if (dog.rating){
        //     dogRating.innerText = `Rating: ${dog.rating}`
        // } else {dogRating.innerText = "Rating: 10"}

        // append
        dogLi.append(dogImg)
        // dogLi.append(dogRating)
        dogListUl.append(dogLi)
    })
}

span.onclick = function() {
    dogModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == dogModal) {
      dogModal.style.display = "none";
      
    }
  }

allDogs()