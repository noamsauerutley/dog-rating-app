const dogListUl = document.querySelector("#dog-list-url")

let allDogs = async (() => {
    let response = await fetch("http//localhost:3000/dogs")
    let dogs = await response.json()
    dogs.forEach((dog) => {
        let dogLI = document.createElement("li")
        let dogImg = document.createElement("img")
        dogImg.src = dog.image_url
        dogLi.append(dogImg)
        dogListUl.append(dogLi)
    })
})