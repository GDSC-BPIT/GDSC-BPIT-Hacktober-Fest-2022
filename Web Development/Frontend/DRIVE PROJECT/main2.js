                                        // lect-1jan   
      
                      //modifications done in main3
  
(function () {

    let btn = document.querySelector("#buttonaddfolder");
    let divcontainer = document.querySelector("#container");
    let mytemplates = document.querySelector("#mytemplates");
    let fid = -1;
    let folders = [];

    btn.addEventListener("click", addfolder);//botton click karne per addfolder folders create karne main help karega

    //ye function folder banane main help karega addfolderHTML/template/class  ke though
    function addfolder() {
        let fname = prompt("ENTERS FOLDERS NAME");
        if (!!fname) {//aagr file exist karegi to add kardo folders

            fid++; //file id bdate jao

            //aagr folder pehle se exist kare to ye karenge 
            let exist =folders.some(f => f.name == fname);
            
            if(exist ==false){ //aaagr idx -ve 1 hua to mtlb file nhi hai pehle se 

                folders.push({ //ye array main push kardo folder ko
                    id: fid,
                    name: fname
                });
            addFolderHTMLToPage(fname, fid);

            
            persistdatatostorage(); //data persist karne ke ley jo hamne banaya hai
        }
        else{
            alert(fname+ " ALREADY EXIST");   //aaagr file hui to ye aaega likha 
        }
       

       
    }
    else{
        alert("ENTER VALID NAME ");     //aaagr folder cancel karoge to ye likha aaega
    }



        

        }

    
   //ye folder ko edit karne ka function
    function editfolder() {

        let divfolder = this.parentNode; //ye vo folder edit karna hai use parent node bolenge idher
        let divName = divfolder.querySelector("[purpose='name']");

        let fname = prompt("ENTERS NEW FOLDER'S NAME");
        if (!!fname) { //aaagr file hogi to chalega ye
           
            divName.innerHTML   = fname;//change folder name jaega idher

            let fid = parseInt(divfolder.getAttribute("fid"));  //dont know

            //ye loop us file id per jaega use fid dega edit vali or folder.name main jakar uska fname badla hua daal dega
            let folder = folders.find(f => f.id == fid);
           folder.name =fname;
            persistdatatostorage();
        }
    

    }

    //ye folder ko delete karne ka function
    function deletefolder() {
        let divfolder = this.parentNode;//ye jo folder delete karna hai use parent node bolenge idher
        let divName = divfolder.querySelector("[purpose='name']");
        
        //divName.innerhtml is se jo file delete karni hai recent uska name show hoga
       let flag = confirm("DO YOU WANT TO DELETE " + divName.innerHTML);
       if(flag==true){//ye true hua to remove kardo
        divcontainer.removeChild(divfolder);
        let fid =parseInt(divfolder.getAttribute("fid"));//don't know

        //ye us idx jo delete karna hai use badal degi nay index se
        let idx=folders.findIndex(function(f){
            return f.id=fid; 

        }); 
        folders.splice(idx,1); //ye us index ke folder ko hta degi
        persistdatatostorage();//data persist rakhne ke ley

       }
       
    }

    //ye funtion html ka data laega jo hamne class template main banaya hai
    //and folders create karaega ye
    //check main1()sample aagr dekhna hai to udher explained hai
    function addFolderHTMLToPage(fname, fid) {
        let divfoldertemplate = mytemplates.content.querySelector(".folder");
        let divfolder = document.importNode(divfoldertemplate, true);//clone/copy

        let divName = divfolder.querySelector("[purpose='name']");

        let spanEdit = divfolder.querySelector("span[action='edit']");
        let spanDelete = divfolder.querySelector("span[action='delete']");
        
        divName.innerHTML = fname;
        spanEdit.addEventListener("click", editfolder);
        spanDelete.addEventListener("click", deletefolder);
        divfolder.setAttribute("fid", fid); //ye attribute local storage main id show karne ke ley kaam aata hai
        divcontainer.appendChild(divfolder);


    }

    //ye data ko persist rakhne ka function jo refresh karne ke baad bhi tikka rahe
    function persistdatatostorage() {
        let fjson =JSON.stringify(folders);//ye data ko string main karke store karega local storage main
       localStorage.setItem("data",fjson); //ye string main karke data local storage main add karne ke ley 
    }

    //ye loadDataFromStorage ye kaam karega ki jaab haam page ko refresh karenge 
    //jo folders hamne pehle banay the vo load ho jay vapis 
    function loadDataFromStorage() {
        let fjson = localStorage.getItem("data"); //ye data ko vapis lanne ke ley hota hai use
        if (!!fjson) { //aaagr refresh se pehle ka  data hua means ye true hua to load karega ye if ka content
            folders = JSON.parse(fjson);//folders ka data ajaega is se load hokar
           
            //ye folders se html ke thorugh data vapis aajaega
           
            folders.forEach(f =>{
           
            if(f.id >fid){                               //ye iskey karte hai kyuki local storage main file id puri store
                                                         //jis index per ho us se aage se start ho store karna isley ye karte hai
                fid= f.id; //fid main daaal do
            }
            addFolderHTMLToPage(f.name, f.id);

        }); 
                
    }
    }

    loadDataFromStorage();//ye overall pure page per lagega kyuki folders vapis aajay jo refresh karne se pehle banay the


})();

