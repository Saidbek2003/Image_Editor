const fileInput=document. querySelector(".file-input"),
filterOptions=document.querySelectorAll(".filter button"),
previewImg=document.querySelector(".preview-img img"),
filterName=document.querySelector(".filter-info .name"),
filterSlider=document.querySelector(".slider input"),
filterValue=document.querySelector(".slider .value"),
// container=document.querySelector(".container"),
rotateOptions = document.querySelectorAll(".rotate button"),
resetFilterBtn=document.querySelector(".reset-filter"),
chooseImgBtn=document.querySelector(".choose-img");
saveImgBtn=document.querySelector(".save-img");
let  Brightness =100,Saturaton=100,Invertion=0,Grayscale=0;
let rotate= 0,flipHorizontal=1,flipvertical=1;
const applyFilters=()=>{ 
  previewImg.style.transform=`rotate(${rotate}deg) scale(${flipHorizontal},${flipvertical} ) `// scale(${flipHorizontal} ,)
  // previewImg.style.transform=``
  previewImg.style.filter=`brightness(${Brightness}%) invert(${Invertion}%)  grayscale(${Grayscale}%) saturate(${Saturaton}%)`
  
  }  
  const loadImage=()=>{
let file=fileInput.files[0];
if(!file){ return}
previewImg.src=URL.createObjectURL(file)

previewImg.addEventListener("load",()=>{
  console.log("dd");
  document.querySelector(".container").classList.remove("disable");
});
}
filterOptions.forEach(option=>{
option.addEventListener("click",()=>{
document.querySelector(".filter .active").classList.remove("active");
  option.classList.add("active")
  console.log(option);
  filterName.innerText =option.innerText   
  if(option.id==="brightness"){
    filterSlider.max="200"
    filterValue.innerText=`${Brightness}`
   }else if(option.id==="saturation"){
     filterSlider.max="200"
     filterValue.innerText=`${Saturaton}`

   }else if(option.id==="inversion"){
     filterSlider.max="100"
     filterValue.innerText=`${Invertion}`
  console.log(Invertion);
   
   }else if(option.id==="grayscale"){
     filterSlider.max="100"
     filterValue.innerText=`${Grayscale}`

   }
})
})
const  updateFilter=()=>{
  filterValue.innerText=`${filterSlider.value}%`;
  const selectedFilter=document.querySelector(".filter .active")
  
  if(selectedFilter.id==="brightness"){
  Brightness=filterSlider.value;
}else if (selectedFilter.id==="saturation") {
  Saturaton=filterSlider.value;
 }else if (selectedFilter.id==="inversion") {
  Invertion=filterSlider.value;
  
 }else if (selectedFilter.id==="grayscale") {
  Grayscale=filterSlider.value;
 } 
 applyFilters();
}



// console.log(document.querySelector(".filter .active"));
// console.log(rotateOptions);
 
//  console.log(Invertion,selectedFilter=document.querySelector(".filter .active"));

 rotateOptions.forEach(option => {
     option.addEventListener("click",()=>{
       console.log(option);
       if(option.id==="left"){
         rotate -= 90;
       }else if(option.id==="right"){
         rotate += 90;
       }
       else if(option.id==="horizontal"){
         flipHorizontal =flipHorizontal=== 1 ? -1 : 1
       }
       else if(option.id==="vertical"){
        flipvertical = flipvertical=== 1 ? -1 : 1
       }

       applyFilters()
     })
 });
 const resetFilter=()=>{
    Brightness =100;Saturaton=100;Invertion=0;Grayscale=0;
  rotate= 0;flipHorizontal=1;flipvertical=1;
  applyFilters()   
 }
const saveImg=()=>{
  const canvas=document.createElement("canvas")
  const ctx=canvas.getContext("2d");
  canvas.width=previewImg.naturalWidth;
  canvas.height=previewImg.naturalHeight;
  ctx.translate(canvas.width/2, canvas.height/2)
  ctx.filter=`brightness(${Brightness}%) invert(${Invertion}%)  grayscale(${Grayscale}%) saturate(${Saturaton}%)`
  ctx.scale(flipHorizontal,flipvertical)
  if (rotate!==0) {
      ctx.rotate(rotate*Math.PI/180)

  }
  ctx.drawImage(previewImg,-canvas.width / 2, -canvas.height / 2,canvas.width , canvas.height)
  const link=document.createElement("a");
  link.download="image.jpg"
  link.href=canvas.toDataURL();
  link.click();
}
 
   fileInput.addEventListener("change", loadImage)
   filterSlider.addEventListener("input",()=> updateFilter())
   resetFilterBtn.addEventListener("click",()=> resetFilter())
   saveImgBtn.addEventListener("click",()=> saveImg())
   chooseImgBtn.addEventListener('click',()=> fileInput.click()); 
