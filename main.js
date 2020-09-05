
let timer
let deleteFirstPhotoDelay


async function start(){
try{

        //await will not run line untill now excute
const response = await fetch("https://dog.ceo/api/breeds/list/all")
const data = await response.json()
//console.log(data)
createBreedList(data.message)

} catch(e){
    console.log("There is a problem")
}

}

start()


function createBreedList(breedList){
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed </option>
        ${Object.keys(breedList).map(function(breed){
            return `<option>${breed}</options>`

   }).join('')}
  
</select>
`
}

async function loadByBreed(breed){
    if(breed !="Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images
        `)
        const data = await response.json()
        createSlideshow(data.message)

    }

}

function createSlideshow(images){
    let currentPostion =0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if(images.length >1){
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>`

    currentPostion += 2
    if(images.length ==2) currentPostion =0
    timer = setInterval(nextSlide,3000)
    }else{
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>`

    }

    function nextSlide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend",`<div class="slide" style="background-image: url('${images[currentPostion]}')"></div>`)
        deleteFirstPhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove()
        },1000)
        if(currentPostion +1 >= images.length){
            currentPostion =0
        }else{
            currentPostion++
        }

    }

}