//DOM-DOCUMent OBJECT MODEL                      //lecture-29dec,30dec

                                         //modifications done in main 2

                                        //  iife use karenge -taaaki name space pollution na aay means ki eek file ke changes 
                                        //dusri files main na dikhai de
                                        // iife multiple files main use mainly karte hai haam use
(function () {

  let btn = document.querySelector("#buttonaddfolder");//button ki id ko chalane ke ley #-sharp use karte hai 
  let divcontainer = document.querySelector("#container"); //div ko call karega
  let mytemplates = document.querySelector("#mytemplates");//template ko call karega
  let fid = 0;//file id show hogi is se
    let folders =[];//isme file store karenge taaki bar bar functions na create ho sabke ley
  //let h1=document.querySelector("h1");

  //btn.addEventListener("click",function(){
  //   h1.style.color="green";
  //})
  //btn.addEventListener("mouseover",function(){
  //  h1.style.color="blue";
  //})
  //btn.addEventListener("mouseout",function(){
  //  h1.style.color="red";
  //})


  btn.addEventListener("click", function () {
    //divcontainer.style.border="2px solid red"; //isko laganae se border ka color change ho jaega click karne per

    let fname = prompt("ENTER THE FOLDER NAME");// ye click karne per folder name banega prompt function ki help se 

    if (!fname) { //aaagr file undefined ,non exit to return false hoga
      return;   //aaagr fname hoga nhi click karne per to return karenge
    }
    
    //alert(fname);//ye alert karne ke ley use hota hai

    //div main jakar mytemplates use hoga .kyuki class ke ley .use hota hai and  template class hai 
    //and # use nhi hota template ko access karne ke ley . use hota hai
    let divfoldertemplate = mytemplates.content.querySelector(".folder");

    //divfolder main import node ki help se  template ka clone banaega mtlb copy  banaega folders ki .kyuki haame temp/folder eek nhi banana
    //bar bar folder ban sake is ley ham clone banate hai template ka niche div folder main jaise bna dea hai
    let divfolder = document.importNode(divfoldertemplate, true);
    //ye class ke ander ke folder ko access karne ke ley use hoga
    let divname = divfolder.querySelector("[purpose='name']");
    divname.innerHTML = fname;
    divfolder.setAttribute("fid", ++fid); //is se hoga ye ki id show hogi inspect main aalag se iss folder ki and
    //id hogi har temp ki aapni



    //ye spandelete- function kaam ye karega aaagr delete per click karenge to usper jakar pehle puchega ki delete karna hai
    //ye folder ya nhi .aaagr ha bolenge to delete kar denge aaagr mn karenge to nhi delete hoga folder 
    let spanDelete = divfolder.querySelector("span[action='delete']");
    
    spanDelete.addEventListener("click", function () {
      let flag = confirm("DO YOU TO DELETE THE FOLDER " + divname.innerHTML);  //divname.innerHTML is ley folder name main use karenge kyuki
      //jaab edit karne ke baad delete kare to edit vala fname aay
      //start vala fname nhi
      //ex-fnam dit karke fname kara to delete karunga to fname show
      //ho naki fnam iss ley divname.innerHTML use kara
      if (flag == true) {
        divcontainer.removeChild(divfolder);

        //iska aabhi nhi pta
        let idx= folders.findIndex(f => f.id == parseInt(divfolder.getAttribute("fid")));
        folders.splice(idx,1);
        persistFolder();
      }
    });

    
    //ye spanedit- function kaam ye karega aaagr edit per click karenge to usper jakar pehle puchega ki edit karna hai
    //ye folder ya nhi .aaagr ha bolenge to edit kar denge aaagr mn karenge to nhi edit hoga folder 
    let spanEdit = divfolder.querySelector("span[action='edit']");
    spanEdit.addEventListener("click", function () {
      let fname = prompt("ENTER THE NEW FOLDER NAME "); //new folder name dalne ke ley prompt ka use  edit main 
      if (!fname) {
        return;
      }
      let divname = divfolder.querySelector("[purpose='name']");
      divname.innerHTML = fname;
      //abhi nhi pta
      let folder=folders.find(f => f.id == parseInt(divfolder.getAttribute("fid")));
      folder.name = fname;
      persistFolder();

    });

    //divcontainer jakar append ke through content add karka jaega jo ham divfolder main dalenege
    divcontainer.appendChild(divfolder);
    folders.push({
      id: fid ,
      name: fname

    });
    persistFolder();
});

function persistFolder(){
  console.log(folders);
  let fjson = JSON.stringify(folders);
  localStorage.setItem("data", fjson);
}


})();

