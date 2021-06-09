console.log("hello");
showNotes();
//if user adds a notes ,add it to the localstorage
let addbtn = document.getElementById('addbtn')
addbtn.addEventListener("click",function(_e){

    let addTxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem("notes");
    
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        text: addtxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value = "";
    addtitle.value = "";
    // console.log(notesObj);

    showNotes();
})
//to show elements from localstorage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html ="";
    notesObj.forEach(function( element, index){
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${index + 1,element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deletenotes(this.id)"class="btn btn-primary">Delete Notes</button>
          </div>
        </div>
        `
    });

    let noteselem = document.getElementById('notes');
    if(notesObj.length != 0){
        noteselem.innerHTML = html;
    }
    else{
        noteselem.innerHTML = "Nothing to Show"
    }
}
//deletenotes
function deletenotes(index){
// console.log("im deleted" , index);
let notes = localStorage.getItem("notes");
    
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index ,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

// search

let search = document.getElementById('searchtxt');
search.addEventListener("input", function(){
  
  let inputval = search.value.toLowerCase();
//   console.log('input fired', inputval);
  
  let noteCard = document.getElementsByClassName('noteCard');
  Array.from(noteCard).forEach(function(element){
      let cardtxt = element.getElementsByTagName("p")[0].innerText;
    //   console.log(cardtxt);
    if(cardtxt.includes(inputval)){
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
  })
})