(function () {
    let btnaddFolder = document.querySelector("#addFolder");
    let btnaddTextFile = document.querySelector("#addTextFolder");
    let btnaddAlbum = document.querySelector("#addAlbum");
    let divbreadCrumb = document.querySelector("#breadCrumb");
    let divContainer = document.querySelector("#container");
    let aRootPath = divbreadCrumb.querySelector("a[purpose='path']");
 
    let divAppTitle = document.querySelector("#app-title");
    let divAppmenuBar = document.querySelector("#app-menu-bar");
    let divAppBody = document.querySelector("#app-body");
    let appClose=document.querySelector("#app-close");
    let templates = document.querySelector("#templates");
    let resources = []; //isme array main store karenge content
    let cfid = -1; //initial at current root folder -1
    let rid = 0;//resource id ko initial zero lo
 
    btnaddFolder.addEventListener("click", addFolder);
    btnaddTextFile.addEventListener("click", addTextFile);
    btnaddAlbum.addEventListener("click",addAlbum);
    aRootPath.addEventListener("click", viewFolderFromPath);
   appClose.addEventListener("click",closeapp);
 
   function closeapp(){
      divAppTitle.innerHTML="";
      divAppmenuBar.innerHTML="";
      divAppBody.innerHTML="";
   }
  function addAlbum(){
    let rname = prompt("ENTER FOLDER'S NAME");
 
    if (rname != null) {
       rname = rname.trim();
    }
 
    if (!rname) {
       alert("EMPTY NAME IS NOT ALLOWED");
       return;
    }

    let alreadyExist = resources.some(r => r.rname == rname && r.pid == cfid);
    if (alreadyExist == true) {
       alert(rname + "NAME IS ALREADY IN USE.ENTER ANOTHER NAME");
       return;
    }

    let pid = cfid;
    rid++;
    addAlbumHTML(rname, rid, pid);
    resources.push({
       rid: rid,
       rname: rname,
       rtype: "album",
       pid: cfid

    });
    saveToStorage();
  }
 
 
    //persist-ram,storage
    //validations-unique, non-blank
    function addFolder() {
       let rname = prompt("ENTER FOLDER'S NAME");
 
       //name main space nhi aay isley trim kardo name
       if (rname != null) {
          rname = rname.trim();
       }
       //empty folder validation
       if (!rname) {
          alert("EMPTY NAME IS NOT ALLOWED");
          return;
       }
 
 
       //unique rahe name mtlb same name parent main na save ho
 
       //haam kya karenge aagar rname aaega dubara to to nhi karenge save and parent id main cfid aaagr equal hue to 
       //mtln exist karti hai pehle se to taab bhi save nhi karenge folder
       let alreadyExist = resources.some(r => r.rname == rname && r.pid == cfid);
       if (alreadyExist == true) {
          alert(rname + "NAME IS ALREADY IN USE.ENTER ANOTHER NAME");
          return;
       }
 
       let pid = cfid;
       rid++;//resource id ko ++ karke bedgho  
       addFolderHTML(rname, rid, pid);
       resources.push({
          rid: rid,
          rname: rname,
          rtype: "folder",
          pid: cfid
 
       });
       saveToStorage();
 
    }
    //    tfname=text file name 
    function addTextFile() {
       let rname = prompt("ENTER TEXT FILE  NAME");
 
       //name main space nhi aay isley trim kardo name
       if (rname != null) {
          rname = rname.trim();
       }
       //empty folder validation
       if (!rname) {
          alert("EMPTY NAME IS NOT ALLOWED");
          return;
       }
 
 
       //unique rahe name mtlb same name parent main na save ho
 
       //haam kya karenge aagar rname aaega dubara to to nhi karenge save and parent id main cfid aaagr equal hue to 
       //mtln exist karti hai pehle se to taab bhi save nhi karenge folder
       let alreadyExist = resources.some(r => r.rname == rname && r.pid == cfid);
       if (alreadyExist == true) {
          alert(rname + "NAME IS ALREADY IN USE.ENTER ANOTHER NAME");
          return;
       }
 
       let pid = cfid;
       rid++;//resource id ko ++ karke bedgho  
       addTextFileHTML(rname, rid, pid);
 
 
       resources.push({
          rid: rid,
          rname: rname,
          rtype: "text-file",
          pid: cfid,
          isBold: true,
          isItalic: false,
          isUnderline: false,
          bgColor: "#f7f3f3",
          textColor: "#474343",
          fontFamily: "cursive",
          fontSize: 22,
          content: "I am a new file."
 
       });
       saveToStorage();
 
 
 
    }
 
    function deleteFolder() {
       let spanDelete = this;
       let divfolder = spanDelete.parentNode;
       let divName = divfolder.querySelector("[purpose='name']");
       let fidtbd = divfolder.getAttribute("rid");
       let fname = divName.innerHTML;
 
       let childrenExists = resources.some(r => r.pid == fidtbd);
       let sure = confirm(`ARE YOU SURE YOU WANT TO DELETE ${fname}?` + (childrenExists ? ".it also has children." : ""));
       if (!sure) {
          return;
       }
 
 
 
       //html
       divContainer.removeChild(divfolder);
 
       //ram
       deleteHelper(fidtbd);
 
       //storage
       saveToStorage();
    }
 
    //ye deleteHelper he main kaam karega folder ko delete karne main recussion laag rahi hai 
    //pehel ander ke folder delete hoenge fhir bahar ke 
    function deleteHelper(fidtbd) {
 
       let children = resources.filter(r => r.pid == fidtbd);
       for (let i = 0; i < children.length; i++) {
          deleteFolder(children[i].rid);//this is capable of delete
       }
       let ridx = resources.findIndex(r => r.rid == fidtbd);
       resources.splice(ridx, 1);//splice ka kaam badsically ye hai ki vo  eek rid ko hta dega  child  ki 
    }
 
 
 
    function deleteTextFile() {
 
       let spanDelete = this;
       let divTextFile = spanDelete.parentNode;
       let divName = divTextFile.querySelector("[purpose='name']");
 
       let fidtbd = parseInt(divTextFile.getAttribute("rid"));
       let fname = divName.innerHTML;
 
       let sure = confirm(`Are you sure you want to delete ${fname}?`);
       if (!sure) {
          return;
       }
 
 
       //html
       divContainer.removeChild(divTextFile);
 
       //ram
       let ridx = resources.findIndex(r => r.rid == fidtbd);
       resources.splice(ridx, 1);
 
       //storage
       saveToStorage();
 
    }
 
    function deleteAlbum() {
 
        let spanDelete = this;
        let divAlbum = spanDelete.parentNode;
        let divName = divAlbum.querySelector("[purpose='name']");
  
        let fidtbd = parseInt(divAlbum.getAttribute("rid"));
        let fname = divName.innerHTML;
  
        let sure = confirm(`Are you sure you want to delete ${fname}?`);
        if (!sure) {
           return;
        }
  
  
        //html
        divContainer.removeChild(divAlbum);
  
        //ram
        let ridx = resources.findIndex(r => r.rid == fidtbd);
        resources.splice(ridx, 1);
  
        //storage
        saveToStorage();
  
     }
 
 
    function renameFolder() {
       let nrname = prompt("ENTER  NEW FOLDER'S NAME");//nrname(new resource name)
 
       //name main space nhi aay isley trim kardo name
       if (nrname != null) {
          nrname = nrname.trim();
       }
       //empty folder validation
       if (!nrname) {
          alert("EMPTY NAME IS NOT ALLOWED");
          return;
       }
 
       let spanRename = this;  //is se span main jakar folder ke ander ko this bolte hai
       let divFolder = spanRename.parentNode; //div ke ander jakar folder ko parent bolenge span rename ka
       let divName = divFolder.querySelector("[purpose=name]");//div folder se uska name nikal lenge
       let orname = divName.innerHTML; //orname(old resource name ) div folder ke ander se jakar purana name nikalega ye
 
       //ribTBU(resource name to be edited) ye haam rid nikalenge taaki us id ka
       //use karke ham uska rename kar sake
       let ribTBU = parseInt(divFolder.getAttribute("rid"));
       if (nrname == orname) {
          alert("THIS NAME ALREADY EXIST .TRY ANOTHER NAME");
          return;
       }
 
       //aab haam check karenge ye jo edit karenge uska name bhi pehle se to exist nhi karta
       //to usper alreadyExist vali condition jagenge jo pehle use kari thi
       let alreadyExist = resources.some(r => r.rname == nrname && r.pid == cfid);
       if (alreadyExist == true) {
          alert(nrname + "NAME IS ALREADY IN USE.ENTER ANOTHER NAME");
          return;
       }
 
       //change karenge html main
       divName.innerHTML = nrname;
 
       //change ram
       //find se haam jis resource per pehle vo folder ka name tha .us he id per haam rname karenge
       //taaki dubara id nhi bane resource ki us name per
       let resource = resources.find(r => r.rid == ribTBU);
       resource.rname = nrname;
 
       //change storage
       saveToStorage();
 
 
 
    }
    function renameTextFile() {
       let nrname = prompt("ENTER  NEW FILE'S NAME");//nrname(new resource name)
 
       //name main space nhi aay isley trim kardo name
       if (nrname != null) {
          nrname = nrname.trim();
       }
       //empty folder validation
       if (!nrname) {
          alert("EMPTY NAME IS NOT ALLOWED");
          return;
       }
 
       let spanRename = this;
       let divTextFile = spanRename.parentNode; //div ke ander jakar folder ko parent bolenge span rename ka
       let divName = divTextFile.querySelector("[purpose=name]");
       let orname = divName.innerHTML; //orname(old resource name ) div folder ke ander se jakar purana name nikalega ye
 
 
       let ribTBU = parseInt(divTextFile.getAttribute("rid"));
       if (nrname == orname) {
          alert("THIS NAME ALREADY EXIST .TRY ANOTHER NAME");
          return;
       }
 
       //aab haam check karenge ye jo edit karenge uska name bhi pehle se to exist nhi karta
       //to usper alreadyExist vali condition jagenge jo pehle use kari thi
       let alreadyExist = resources.some(r => r.rname == nrname && r.pid == cfid);
       if (alreadyExist == true) {
          alert(nrname + "NAME IS ALREADY IN USE.ENTER ANOTHER NAME");
          return;
       }
 
       //change karenge html main
       divName.innerHTML = nrname;
 
       //change ram
       //find se haam jis resource per pehle vo folder ka name tha .us he id per haam rname karenge
       //taaki dubara id nhi bane resource ki us name per
       let resource = resources.find(r => r.rid == ribTBU);
       resource.rname = nrname;
 
       //change storage
       saveToStorage();
 
 
    }

    //same renametextFile ke code ki tarah
    function renameAlbum() {
        let nrname = prompt("ENTER  NEW FILE'S NAME");
  
        if (nrname != null) {
           nrname = nrname.trim();
        }
       
        if (!nrname) {
           alert("EMPTY NAME IS NOT ALLOWED");
           return;
        }
  
        let spanRename = this;
        let divAlbum = spanRename.parentNode; //div ke ander jakar folder ko parent bolenge span rename ka
        let divName = divAlbum.querySelector("[purpose=name]");
        let orname = divName.innerHTML; //orname(old resource name ) div folder ke ander se jakar purana name nikalega ye
  
  
        let ribTBU = parseInt(divAlbum.getAttribute("rid"));
        if (nrname == orname) {
           alert("THIS NAME ALREADY EXIST .TRY ANOTHER NAME");
           return;
        }
  
        let alreadyExist = resources.some(r => r.rname == nrname && r.pid == cfid);
        if (alreadyExist == true) {
           alert(nrname + "NAME IS ALREADY IN USE.ENTER ANOTHER NAME");
           return;
        }
  
        //change karenge html main
        divName.innerHTML = nrname;
  
        //change ram
        //find se haam jis resource per pehle vo folder ka name tha .us he id per haam rname karenge
        //taaki dubara id nhi bane resource ki us name per
        let resource = resources.find(r => r.rid == ribTBU);
        resource.rname = nrname;
  
        //change storage
        saveToStorage();
  
  
     }
  
 
 
    //view ke ander ka kaam
    function viewFolder() {
       let spanView = this;
       let divFolder = spanView.parentNode; //folder ke ander aajenge is se span view ke
       let divName = divFolder.querySelector("[purpose='name']"); //name aajaega folder ka
 
       let fname = divName.innerHTML;//folder name aajaega is se
       let fid = parseInt(divFolder.getAttribute("rid"));//is se resource ki id aajegi us  folder id main
 
       let apathTemplate = templates.content.querySelector("a[purpose='path']"); //path le lenge is se
       let apth = document.importNode(apathTemplate, true); //clone of apathtemplete
 
       apth.innerHTML = fname; //path main us folder ka name daal denge
       apth.setAttribute("rid", fid);//id daal denge vo vali jis me honge
       apth.addEventListener("click", viewFolderFromPath); //ye call karenge taaki us directory per aajay jo chaheye
       divbreadCrumb.appendChild(apth); //breadcrumb main daal denge
 
       cfid = fid; //aab current folder main jis folder main hai vo daal denge
       divContainer.innerHTML = "";//container khali kar denge jaise he kisi ke ander view ke amder enter karenge to
 
       //is se cureent folder ke ander honge taabhi changes honge
       for (let i = 0; i < resources.length; i++) {
          if (resources[i].pid == cfid) {
             addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid);
 
          } else if (resources[i].rtype == "text-file") {
             addTextFileHTML(resources[i].rname, resources[i].rid, resources[i].pid);
          }else if (resources[i].rtype == "album") {
            addAlbumHTML(resources[i].rname, resources[i].rid, resources[i].pid);
      }
       }
    }
 
    //ye function breadcrumb main jisper jana hoga usper jane main help karega by path 
    //jaise root per click karenge to bss vo he dikega or kuch nhi path ki help se
    function viewFolderFromPath() {
       let aPath = this;
       let fid = parseInt(aPath.getAttribute("rid")); //is se uss folder ki id aaegi jo chaheye
 
       //set the breadcrumb
       for (let i = divbreadCrumb.children.length - 1; i >= 0; i--) {
          if (divbreadCrumb.children[i] == aPath) {
             break;
          }
          divbreadCrumb.removeChild(divbreadCrumb.children[i]);
       }
 
       //set the container
       cfid = fid; //current folder kardo
       divContainer.innerHTML = "";//khali kardo container
       //is se cureent folder ke ander honge taabhi changes honge
 
       for (let i = 0; i < resources.length; i++) {
 
          if (resources[i].pid == cfid) {
             if (resources[i].rtype == "folder") {
                addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid);
             } else if (resources[i].rtype == "text-file") {
                addTextFileHTML(resources[i].rname, resources[i].rid, resources[i].pid);
             }else if (resources[i].rtype == "album") {
                addAlbumHTML(resources[i].rname, resources[i].rid, resources[i].pid);
          }
          }
 
 
       }
 
 
 
    }
 
 
    function viewTextFile() {
       let spanView = this;
       let divTextFile = spanView.parentNode;
       let divName = divTextFile.querySelector("[purpose=name]");
       let fname = divName.innerHTML;
       let fid = parseInt(divTextFile.getAttribute("rid"));
 
       let divNotepadMenuTemplate = templates.content.querySelector("[purpose=notepad-menu]");
       let divNotepadMenu = document.importNode(divNotepadMenuTemplate, true);
       divAppmenuBar.innerHTML = "";
       divAppmenuBar.appendChild(divNotepadMenu);
 
       let divNotepadBodyTemplate = templates.content.querySelector("[purpose=notepad-body]");
       let divNotepadBody = document.importNode(divNotepadBodyTemplate, true);
       divAppBody.innerHTML = "";
       divAppBody.appendChild(divNotepadBody);
 
       divAppTitle.innerHTML = fname;
       divAppTitle.setAttribute("rid", fid);
 
       //ye sara kaam notepad ke ley ho rha hai
       let spanSave = divAppmenuBar.querySelector("[action=save]");
       let spanBold = divAppmenuBar.querySelector("[action=bold]");
       let spanItalic = divAppmenuBar.querySelector("[action=italic]");
       let spanUnderline = divAppmenuBar.querySelector("[action=underline]");
       let inputBGColor = divAppmenuBar.querySelector("[action=bg-color]");
       let inputTextColor = divAppmenuBar.querySelector("[action=fg-color]");
       let selectFontFamily = divAppmenuBar.querySelector("[action=font-family]");
       let selectFontSize = divAppmenuBar.querySelector("[action=font-size]");
       let spanDownload = divAppmenuBar.querySelector("[action=download]");
       let spanForUpload = divAppmenuBar.querySelector("[action=forupload]");
       let inputUpload = divAppmenuBar.querySelector("[action=upload]");
        let textArea = divAppBody.querySelector("textArea");
 
       spanSave.addEventListener("click", saveNotepad);
       spanBold.addEventListener("click", makeNotepadBold);
       spanItalic.addEventListener("click", makeNotepadItalic);
       spanUnderline.addEventListener("click", makeNotepadUnderline);
       inputBGColor.addEventListener("change", changeNotepadBGColor);
       inputTextColor.addEventListener("change", changeNotepadTextColor);
       selectFontFamily.addEventListener("change", changeNotepadFontFamily);
       selectFontSize.addEventListener("change", changeNotepadFontSize);
       spanDownload.addEventListener("click", downloadNotepad);
       inputUpload.addEventListener("change", uploadNotepad);

       spanForUpload.addEventListener("click", function(){
           inputUpload.click();
       })
 
 
 
       let resource = resources.find(r => r.rid == fid);
       spanBold.setAttribute("pressed", !resource.isBold);
       spanItalic.setAttribute("pressed", !resource.isItalic);
       spanUnderline.setAttribute("pressed", !resource.isUnderline);
       inputBGColor.value = resource.bgColor;
       inputTextColor.value = resource.textColor;
       selectFontFamily.value = resource.fontFamily;
       selectFontSize.value = resource.fontSize;
       textArea.value = resource.content;
 
       spanBold.dispatchEvent(new Event("click"));
       spanItalic.dispatchEvent(new Event("click"));
       spanUnderline.dispatchEvent(new Event("click"));
       inputBGColor.dispatchEvent(new Event("change"));
       inputTextColor.dispatchEvent(new Event("change"));
       selectFontFamily.dispatchEvent(new Event("change"));
       selectFontSize.dispatchEvent(new Event("change"));
 
 
    }

    function viewAlbum(){
        let spanView = this;
        let divAlbum = spanView.parentNode;
        let divName = divAlbum.querySelector("[purpose=name]");
        let fname = divName.innerHTML;
        let fid = parseInt(divAlbum.getAttribute("rid"));
  
        let divAlbumMenuTemplate = templates.content.querySelector("[purpose=album-menu]");
        let divAlbumMenu = document.importNode(divAlbumMenuTemplate, true);
        divAppmenuBar.innerHTML = "";
        divAppmenuBar.appendChild(divAlbumMenu);
  
        let divAlbumBodyTemplate = templates.content.querySelector("[purpose=album-body]");
        let divAlbumBody = document.importNode(divAlbumBodyTemplate, true);
        divAppBody.innerHTML = "";
        divAppBody.appendChild(divAlbumBody);
  
        divAppTitle.innerHTML = fname;
        divAppTitle.setAttribute("rid", fid);

        let spanAdd=divAlbumMenu.querySelector("[action=add]");
        spanAdd.addEventListener("click",addPictureToAlbum);
       
    }
    //ye function picture add karane main help karega
    function addPictureToAlbum(){
       let iurl=prompt("ENTER THE IMAGE URL");
       if(!iurl){
          return;
       }
       let img=document.createElement("img");
       img.setAttribute("src",iurl);
       img.addEventListener("click",showPictureInMain);

       let divPictureList=divAppBody.querySelector(".picture-list");
       divPictureList.appendChild(img);
    }

    function showPictureInMain(){
       let divPictureMainImg=divAppBody.querySelector(".picture-main > img");
       divPictureMainImg.setAttribute("src",this.getAttribute("src"));

       let divPictureList=divAppBody.querySelector(".picture-list");
       let imgs=divPictureList.querySelectorAll("img");
       for(i=0;i<imgs.length;i++){
          imgs[i].setAttribute("pressed",false);
       }
       this.setAttribute("pressed",true);
    }
  
    //ye function download ke ley hai 
    function downloadNotepad() {
       let fid = parseInt(divAppTitle.getAttribute("rid"));//pehle file id nikal lo or udher se data fetch ho jaega
       let resource = resources.find(r => r.rid == fid);//ye resource ki help se data nikal lenge
       let divNotepadMenu = this.parentNode;//ye div main menu se download ka button nikal lega 
 
 
       //ye main kaam hai 
       let strForDownload = JSON.stringify(resource);//.hoga kya pehle resource ka data string main hokar save hoga storage main download ke ley
       let encodedData = encodeURIComponent(strForDownload);//ye encoded ki help se data ho string se vapis normal form main kar lenge data ko
 
       let aDownload = divNotepadMenu.querySelector("a[purpose=download]");
       aDownload.setAttribute("href", "data:text/json;charset=utf-8," + encodedData);
       aDownload.setAttribute("download", resource.rname + ".json");
       aDownload.click();
 
    }
    function uploadNotepad() {
       let file = window.event.target.files[0];
       let reader = new FileReader();
       reader.addEventListener("load", function () {
          let data = window.event.target.result;
          let resource = JSON.parse(data);
 
          let spanBold = divAppmenuBar.querySelector("[action=bold]");
          let spanItalic = divAppmenuBar.querySelector("[action=italic]");
          let spanUnderline = divAppmenuBar.querySelector("[action=underline]");
          let inputBGColor = divAppmenuBar.querySelector("[action=bg-color]");
          let inputTextColor = divAppmenuBar.querySelector("[action=fg-color]");
          let selectFontFamily = divAppmenuBar.querySelector("[action=font-family]");
          let selectFontSize = divAppmenuBar.querySelector("[action=font-size]");
          let textArea = divAppBody.querySelector("textArea");
 
          spanBold.setAttribute("pressed", !resource.isBold);
          spanItalic.setAttribute("pressed", !resource.isItalic);
          spanUnderline.setAttribute("pressed", !resource.isUnderline);
          inputBGColor.value = resource.bgColor;
          inputTextColor.value = resource.textColor;
          selectFontFamily.value = resource.fontFamily;
          selectFontSize.value = resource.fontSize;
          textArea.value = resource.content;
 
          spanBold.dispatchEvent(new Event("click"));
          spanItalic.dispatchEvent(new Event("click"));
          spanUnderline.dispatchEvent(new Event("click"));
          inputBGColor.dispatchEvent(new Event("change"));
          inputTextColor.dispatchEvent(new Event("change"));
          selectFontFamily.dispatchEvent(new Event("change"));
          selectFontSize.dispatchEvent(new Event("change"));
 
       })
       reader.readAsText(file);
 
    }
 
    function saveNotepad() {
       let fid = parseInt(divAppTitle.getAttribute("rid"));
       let resource = resources.find(r => r.rid == fid);
 
       let spanBold = divAppmenuBar.querySelector("[action=bold]");
       let spanItalic = divAppmenuBar.querySelector("[action=italic]");
       let spanUnderline = divAppmenuBar.querySelector("[action=underline]");
       let inputBGColor = divAppmenuBar.querySelector("[action=bg-color]");
       let inputTextColor = divAppmenuBar.querySelector("[action=fg-color]");
       let selectFontFamily = divAppmenuBar.querySelector("[action=font-family]");
       let selectFontSize = divAppmenuBar.querySelector("[action=font-size]");
       let textArea = divAppBody.querySelector("textArea");
 
       resource.isBold = spanBold.getAttribute("pressed") == "true";
       resource.isItalic = spanItalic.getAttribute("pressed") == "true";
       resource.isUnderline = spanUnderline.getAttribute("pressed") == "true";
       resource.bgColor = inputBGColor.value;
       resource.textColor = inputTextColor.value;
       resource.fontFamily = selectFontFamily.value;
       resource.fontSize = selectFontSize.value;
       resource.content = textArea.value;
 
       saveToStorage();
    }
 
 
 
 
    function makeNotepadBold() {
       let textArea = divAppBody.querySelector("textArea");
       let isPressed = this.getAttribute("pressed") == "true";
       if (isPressed == false) {
          this.setAttribute("pressed", true);
          textArea.style.fontWeight = "bold";
       } else {
          this.setAttribute("pressed", false);
          textArea.style.fontWeight = "normal";
       }
    }
 
    function makeNotepadItalic() {
       let textArea = divAppBody.querySelector("textArea");
       let isPressed = this.getAttribute("pressed") == "true";
       if (isPressed == false) {
          this.setAttribute("pressed", true);
          textArea.style.fontStyle = "italic";
       } else {
          this.setAttribute("pressed", false);
          textArea.style.fontStyle = "normal";
       }
    }
    function makeNotepadUnderline() {
       let textArea = divAppBody.querySelector("textArea");
       let isPressed = this.getAttribute("pressed") == "true";
       if (isPressed == false) {
          this.setAttribute("pressed", true);
          textArea.style.textDecoration = "underline";
       } else {
          this.setAttribute("pressed", false);
          textArea.style.textDecoration = "none";
       }
    }
 
 
 
    //notepad ke aander ka bg-color kaam sara kaam ye function karega
 
    function changeNotepadBGColor() {
       let color = this.value;
       let textArea = divAppBody.querySelector("textArea");
       textArea.style.backgroundColor = color;
    }
 
    function changeNotepadTextColor() {
       let color = this.value;
       let textArea = divAppBody.querySelector("textArea");
       textArea.style.color = color;
    }
 
    function changeNotepadFontFamily() {
       let fontFamily = this.value;
       let textArea = divAppBody.querySelector("textArea");
       textArea.style.fontFamily = fontFamily;
    }
 
    function changeNotepadFontSize() {
       let fontSize = this.value;
       let textArea = divAppBody.querySelector("textArea");
       textArea.style.fontSize = fontSize;
    }
 
 
 
 
 
    //rid(resource id),rname(resource name),pid(parent id)
    function addFolderHTML(rname, rid, pid) {
       let divFolderTemplate = templates.content.querySelector(".folder");
       let divFolder = document.importNode(divFolderTemplate, true);
 
       let spanRename = divFolder.querySelector("[action=rename]");
       let spanDelete = divFolder.querySelector("[action=delete]");
       let spanView = divFolder.querySelector("[action=view]");
       let divName = divFolder.querySelector("[purpose=name]");
 
       spanRename.addEventListener("click", renameFolder);
       spanDelete.addEventListener("click", deleteFolder);
       spanView.addEventListener("click", viewFolder);
 
       divName.innerHTML = rname;//aab resource name fname ki tarah work karega
       divFolder.setAttribute("rid", rid);//aab attribute set karenge resource id bhi show ho
       divFolder.setAttribute("pid", pid); //aab attribute dalenge taaki parent id bhi show ho
       divContainer.appendChild(divFolder);
 
 
 
    }
 
 
    function addTextFileHTML(rname, rid, pid) {
       let divTextFileTemplate = templates.content.querySelector(".text-file");
       let divTextFile = document.importNode(divTextFileTemplate, true); // makes a copy
 
       let spanRename = divTextFile.querySelector("[action=rename]");
       let spanDelete = divTextFile.querySelector("[action=delete]");
       let spanView = divTextFile.querySelector("[action=view]");
       let divName = divTextFile.querySelector("[purpose=name]");
 
       spanRename.addEventListener("click", renameTextFile);
       spanDelete.addEventListener("click", deleteTextFile);
       spanView.addEventListener("click", viewTextFile);
       divName.innerHTML = rname;
       divTextFile.setAttribute("rid", rid);
       divTextFile.setAttribute("pid", pid);
 
       divContainer.appendChild(divTextFile);
    }

    function addAlbumHTML(rname, rid, pid) {
        let divAlbumTemplate = templates.content.querySelector(".album");
        let divAlbum = document.importNode(divAlbumTemplate, true); // makes a copy
  
        let spanRename = divAlbum.querySelector("[action=rename]");
        let spanDelete = divAlbum.querySelector("[action=delete]");
        let spanView = divAlbum.querySelector("[action=view]");
        let divName = divAlbum.querySelector("[purpose=name]");
  
        spanRename.addEventListener("click", renameAlbum);
        spanDelete.addEventListener("click", deleteAlbum);
        spanView.addEventListener("click", viewAlbum);
        divName.innerHTML = rname;
        divAlbum.setAttribute("rid", rid);
        divAlbum.setAttribute("pid", pid);
  
        divContainer.appendChild(divAlbum);
     }
 
  
   
    //rjson(resource json)
    function saveToStorage() {
       let rjson = JSON.stringify(resources); //local storage main data main show hoga string ki form main
       localStorage.setItem("data", rjson);
    }
    //data persist rahe load karne ke baad uska fn
    function loadfromStorage() {
       let rjson = localStorage.getItem("data");//get karenge
       if (!rjson) {
          return;
       }
       resources = JSON.parse(rjson); //resources se data lekar load karenge
       for (let i = 0; i < resources.length; i++) {
          //ye condition hai bss root vale parent folder and text-file ko bss dikaho load karne ke baad 
          //jinka parent id current folder and text-file ke barabar hai.means show only root folder and text-fileafter reloading
          if (resources[i].pid == cfid) {
             if (resources[i].rtype == "folder") {
                addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid);
             } else if (resources[i].rtype == "text-file") {
                addTextFileHTML(resources[i].rname, resources[i].rid, resources[i].pid);
             }else if (resources[i].rtype == "album") {
                addAlbumHTML(resources[i].rname, resources[i].rid, resources[i].pid);
          }
        }
          //ye second conditon hai jaise he load karenge to rid hogi vo aage se start ho naki vapis zero se start ho assign karna
          if (resources[i].rid > rid) {
             rid = resources[i].rid;
          }
 
       }
 
    }
 
 
 
 
    loadfromStorage();
 
 
 })();