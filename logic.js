

//An array which will store all the tasks
info=[] 

//this function gets the data from the form and adds it to the info array
function fetchdata(){
    // fname=document.getElementById("Fname").value
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
    info.unshift({
        // Fname:fname,
        Tname:tname,
        Email:email,
        Time:time,
        Day:{Mon: mon, Tues:tues, Wed:wed, Thurs:thurs, Fri:fri, Sat:sat, Sun:sun},
    })
}

//this function returns the days on which alarm has been set
function dayfind(object){
     return Object.keys(object.Day).filter(day=>object.Day[day]==true)
}

//this function displays the task that we have added
function displaycontent(){
        const tasks=document.getElementById('tasks');
        tasks.innerHTML='';
        for(var i =0;i<info.length;i++){
            const paragraph=document.createElement('p');

            info.forEach((task)=>{
                const tname=document.createElement('label')
                const time=document.createElement('label')
                const day=document.createElement('label')
                const linebreak1=document.createElement('br')
                const linebreak2=document.createElement('br')
                tname.textContent=task.Tname
                time.textContent=task.Time
                day.textContent=dayfind(task)
                paragraph.appendChild(tname)
                paragraph.appendChild(linebreak1)
                paragraph.appendChild(time)
                paragraph.appendChild(linebreak2)
                paragraph.appendChild(day)
            });
            paragraph.classList.add('task')
            tasks.appendChild(paragraph)
        }
        

}

//the function is called when the submit button is clicked.
var element=document.getElementById('form')
element.addEventListener("submit",function(event){
    event.preventDefault()
    //checking whether atleast one day is selected or not
    check=document.querySelectorAll('input[type = "checkbox"]');
    chk=0
    for(i=0;i<check.length;i++){
        if(check[i].checked==true){
            chk=1
        }
    }
    //if atleast one day is selected then we update our info array or else show alert message.
    if(chk){
        fetchdata()
        console.log(info[0].Time)
        displaycontent()
    }
    else{
        alert("Please select atleast one day")
    }
})



