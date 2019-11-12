const dogListUl = document.querySelector("#dog-list-ul")
const dogModal = document.querySelector(".modal")
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    dogModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == dogModal) {
      dogModal.style.display = "none";  
    }
}

let allDogs = async () => {
    let response = await fetch("http://localhost:3000/dogs")
    let dogs = await response.json()
    dogs.forEach((dog) => {
        //create dog function
        createDog(dog)
    })
}

allDogs()


function createDog(dog) {
    // create dog element
    let dogLi = document.createElement("li")

    //add event listener to dog li
    addEventListenerToDogLi(dog, dogLi)

    // create dog image
    let dogImg = document.createElement("img")
    dogImg.className = "dog-img"
    dogImg.src = dog.image_url

    // append
    dogLi.append(dogImg)
    // dogLi.append(dogRating)
    dogListUl.append(dogLi)
}




function addEventListenerToDogLi(dog, dogLi) {
    dogLi.addEventListener("click", () => {
        showDog(dog)
    })
}

let showDog = (dog) => {
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
  
          // add rate dog link to modal
          let addRating = document.createElement('h4')
          addRating.innerText = "Rate This Dog"
  
          //add event listener to addRating
          addEventListenerToAddRating(addRating, modalContent, modalRating, dog)
  
          // add comment link to modal
          let addComment = document.createElement('h4')
          addComment.innerText = "Leave A Comment"
  
          // add event listener to addComment
           addComment.addEventListener("click", () => {
               newComment(dog, modalContent)
           })
           
  
          // create comments display
          let commentsUl = document.createElement('ul')
          commentsUl.setAttribute("id", "comments-ul")
          let commentsHeader = document.createElement('h3')
          commentsHeader.innerText = "Comments"
          comments = dog.comments
          comments.forEach(comment => {
              // create li
              let commentLi = document.createElement('li')
              commentLi.innerText = `${comment.author} said: ${comment.content}`
      
              // append
              commentsUl.appendChild(commentLi)
          })
  
  
          // append content to modal 
  
          modalContent.append(modalImg)
          modalContent.append(modalRating)
          modalContent.append(addRating)
          modalContent.append(addComment)
          modalContent.append(commentsUl)
  
          dogModal.style.display = "block";
}

let newComment = (dog, modalContent) => {
    // clear modal content
    let child = modalContent.lastElementChild;
        while (child) {
            modalContent.removeChild(child);
            child = modalContent.lastElementChild;
        }

    // load comment form
    // load author input
    let author = document.createElement("div")
    let authorLabel = document.createElement("label")
    authorLabel.innerText = "Your Name: "
    let authorInput = document.createElement("input")
    author.append(authorLabel)
    author.append(authorInput)
    
    // load content input
    let content = document.createElement("div")
    let contentLabel = document.createElement("label")
    contentLabel.innerText = "Your Comment: "
    let contentInput = document.createElement("TEXTAREA")
    content.append(contentLabel)
    content.append(contentInput)
    // load submit button
    let submitButton = document.createElement("button")
    submitButton.innerText = "Submit Comment"
    submitButton.addEventListener ("click", () => {
        createNewComment(dog, modalContent, authorInput, contentInput)
    })
    modalContent.append(author)
    modalContent.append(content)
    modalContent.append(submitButton)
}

function addEventListenerToAddRating(addRating, modalContent, modalRating, dog) {
    addRating.addEventListener("click", () => {
        let ratingInput = document.createElement("input")
        modalRating.append(ratingInput)

        let submitButton = document.createElement("button")
        submitButton.innerText = "Submit Rating"
        submitButton.addEventListener("click", () => {
            let newRating = (parseInt(dog.rating.value) + parseInt(ratingInput.value))/2
            fetch(`http://localhost:3000/ratings/${dog.rating.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    value: newRating
                })
            })
            .then(r => r.json())
            .then(resObj => {
                modalRating.innerText = `${resObj.value}/10`
            })
        })
        modalRating.append(submitButton)
    })
}

let createNewComment = async (dog, modalContent, authorInput, contentInput) => {
    let commentAuthor = authorInput.value
    let commentContent = contentInput.value

    let response = await fetch(`http://localhost:3000/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            author: commentAuthor,
            content: commentContent,
            dog_id: dog.id
        })
    })
    let createdComment = await response.json()
    showDog(dog)
    let newCommentLi = document.createElement("li")
    newCommentLi.innerText = `${createdComment.author} said: ${createdComment.content}`
    let commentsUl = document.querySelector("#comments-ul")
    commentsUl.append(newCommentLi)
}

    let topDogs = async () => {
        let response = await fetch("http://localhost:3000/dogs")
        let dogs = await response.json()
        let sortedDogs = dogs.sort((a, b) => (a.rating.value > b.rating.value) ? 1 : -1)

        sortedDogs.forEach((dog) => {
        //     //create dog function
        //     createDog(dog)
        console.log(dog)
        })
    }

    let topDogsButton = document.querySelector("#top-dogs")
    topDogsButton.addEventListener("click",() => {topDogs()})


