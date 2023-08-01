

//this function gets the data from the form and adds it to the info array
function fetchdata(){

    tname=document.getElementById("Tname").value
    email=document.getElementById("email").value
    time=document.getElementById("time").value
    mon=document.getElementById("mon").checked
    tues=document.getElementById("tues").checked
    wed=document.getElementById("wed").checked
    thurs=document.getElementById("thurs").checked
    fri=document.getElementById("fri").checked
    sat=document.getElementById("sat").checked
    sun=document.getElementById("sun").checked
    id=uniId()
    info=localRetrieve()

    //if no data present then assign make info an array
    if(info==null){
        info=[]
    }                                   
    info.push({
        Id:id,
        Tname:tname,
        Email:email,
        Time:time,
        Day:{Mon: mon, Tues:tues, Wed:wed, Thurs:thurs, Fri:fri, Sat:sat, Sun:sun},
    })
    localStore(info)
}

//function to  update local storage 
function localStore(info){
   const JSS=JSON.stringify(info);
   localStorage.setItem('TaskData',JSS);
}


//function to retrieve data from local storage
function localRetrieve(){
    const JSS=localStorage.getItem('TaskData');
    return JSON.parse(JSS);
}

//function to delete data from local storage

function deleteTask(event){
    taskId=this.value;
    info=localRetrieve();
    console.log(taskId)
    info=info.filter(task =>task.Id!=taskId);
    localStorage.removeItem('TaskData');
    localStore(info);
    location.reload()
}

//function to generate unique id
function uniId(){
    const uniqueId=crypto.randomUUID();
    return uniqueId;
}

//this function returns the days on which alarm has been set
function dayfind(object){
     return Object.keys(object.Day).filter(day=>object.Day[day]==true);
}


//Function to build the paragraph task
function taskbuilder(task){
    const paragraph=document.createElement('p');
    const tname=document.createElement('h2');
    const time=document.createElement('label');
    const day=document.createElement('label');
    const linebreak1=document.createElement('br');
    const linebreak2=document.createElement('br');
    const button=document.createElement('button');
    button.value=task.Id;
    button.textContent='Delete';
    button.classList.add('deleteButton');
    // adding event listener to button to delete task
    button.addEventListener('click',deleteTask);
    tname.textContent=task.Tname;
    time.textContent=task.Time;
    day.textContent=dayfind(task);
    paragraph.appendChild(tname);
    paragraph.appendChild(linebreak1);
    paragraph.appendChild(time);
    paragraph.appendChild(linebreak2);
    paragraph.appendChild(day);
    paragraph.appendChild(button);
    paragraph.classList.add('task');

    tasks.appendChild(paragraph);
}


//this function displays the task that we have added
function displaycontent(){
        const tasks=document.getElementById('tasks');
        tasks.innerHTML='';
        info=localRetrieve();
        if(info){
            info.forEach(taskbuilder);
        }

        }
        

//the function is called when the submit button is clicked.
var element=document.getElementById('form')
element.addEventListener("submit",function(event){
    event.preventDefault();
    //checking whether atleast one day is selected or not
    check=document.querySelectorAll('input[type = "checkbox"]');
    chk=0
    for(i=0;i<check.length;i++){
        if(check[i].checked==true){
            chk=1;
        }
    }
    //if atleast one day is selected then we update our info array or else show alert message.
    if(chk){
        fetchdata();
        displaycontent();
    }
    else{
        alert("Please select atleast one day");
    }
})



//To retrieve data when page is reloaded

window.addEventListener('load',function(){
    displaycontent();
})
