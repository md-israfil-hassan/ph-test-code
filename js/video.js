// show video upload time 
function getTimeString(time){
    // get Hour and rest seconds
    const hour = parseInt(time / 3600) ;
let reminigSeconds = time % 3600 ;
const minute = parseInt(reminigSeconds / 60) ;
 let seconds = reminigSeconds % 60 ;
return `${hour}h ${minute}m ${seconds}s ago` ;

}

const removeActiveClass = () =>{
  const button = document.getElementsByClassName('category-btn') ;
for( let btn of button ){
btn.classList.remove('active') ;
}
}

// fecth, load and show category on Html 

const loadCategories = () =>{
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then( (res) => res.json())
.then((data) => displayCategorie(data.categories))
.catch( (error) => console.log(error))
}

const loadCategoriesVideo = (id) =>{
fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`) 
.then((res) => res.json())
.then( (data) => {
removeActiveClass()
  const btn = document.getElementById(`btn-${id}`) 
  btn.classList.add('active')
  displayVideos(data.category)
})
.catch( (error) => console.log(error))
} ;

// description function

const loadDetails = async (videoId) =>{
let url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
const res = await fetch(url) ;
const data = await res.json() ;
  displayDetails(data.video) ;
}

const displayDetails = (data) =>{
const detailsContainer = document.getElementById('modal-container')
detailsContainer.innerHTML=`
<img src="${data.thumbnail}" />
<p class=" font-semibold ">${data.description}</p>
`;
document.getElementById('customModal').showModal() ;

}


// creat a load video
const loadVideos = (searchText = '') =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`) 
    .then( (res) => res.json())
    .then((data) => displayVideos(data.videos))
}

const displayVideos= (videos) =>{
  const videoContainer = document.getElementById('videos') 
  videoContainer.innerHTML='' ;
    
if( videos.length == 0 ){
videoContainer.classList.remove('grid')
  videoContainer.innerHTML=`
  <div class="gap-2 min-h-[300px] w-full flex flex-col justify-center items-center ">
  <img src="assets/icon.png" /> 
  <h2 class=" text-2xl font-bold text-gray-700" > Oops! Sorry,There is no
  content here</h2>
  </div>
  `;
}
else{
  videoContainer.classList.add('grid')
}

  videos.forEach((video) =>{
// console.log(video)
const card = document.createElement('div')
card.classList.add('card')
card.innerHTML=`
 <figure class="h-[200px] relative ">
    <img
      src="${video.thumbnail}" class="w-full h-full object-cover " />

    ${video.others.posted_date?.length == 0 ? "" : `
        <span class=" absolute text-[10px] right-3 bottom-2 bg-black text-white p-1 rounded "> ${getTimeString(video.others.posted_date)}</span>`
      }

  </figure>
  <div class=" flex px-2 gap-3 py-3">
  <div>
<img src="${video.authors[0].profile_picture}" class=" w-10 h-10 rounded-full object-cover " />
  </div>

  <div> 
  <h2 class=" font-bold"> ${video.title}</h2>
<div class="flex items-center gap-2 "> 
<p class=" text-gray-400 text-xs ">${video.authors[0].profile_name} </p>
 ${ (video.authors[0].verified == true ? '<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>' : '' )}

<button onclick="loadDetails('${video.video_id}')" class="btn btn-xs rounded-md ">Details</button>
</div>
<p  class=" text-[10px] text-gray-500 ">${video.others.views} views</p>
</div>
  </div>
`;
videoContainer.append(card)
card.classList.add('card-bodi')
    })
};

// creat displayCategory
const displayCategorie = (categorys) =>{
    const divContainer = document.getElementById('category') ;
    // add a data Html
  categorys.forEach( (item) => {
    // console.log(item)
    const div = document.createElement('div') ;
    div.innerHTML =`
    <button id="btn-${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class="btn category-btn"> ${item.category}<i class="fa-solid fa-forward"></i></button>
    ` ;
divContainer.append(div)

  })
}

// input-fild search option 

document.getElementById('input-fild').addEventListener('keyup', (a)=>{

 loadVideos(a.target.value)
})


loadCategories() ;
loadVideos(); 