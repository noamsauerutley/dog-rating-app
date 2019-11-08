const dogListUl = document.querySelector("#dog-list-ul")

let allDogs = async () => {
    let response = await fetch("http://localhost:3000/dogs")
    let dogs = await response.json()
    dogs.forEach((dog) => {
        let dogLi = document.createElement("li")
        let dogImg = document.createElement("img")
        dogImg.className = "dog-img"
        dogImg.src = dog.image_url
        dogLi.append(dogImg)
        dogListUl.append(dogLi)
    })
}
allDogs()