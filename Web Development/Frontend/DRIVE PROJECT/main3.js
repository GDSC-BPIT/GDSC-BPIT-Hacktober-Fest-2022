(function () {


    let btn = document.querySelector("#buttonaddfolder");
    let divcontainer = document.querySelector("#container");
    let aRootPath = document.querySelector(".path");
    let mytemplates = document.querySelector("#mytemplates");
    let divbreadCrumb = document.querySelector('#divbreadCrumb');
    let fid = -1;
    let folders = [];
    let cfid = -1; //ye current folder id hai jo root dega sabko mtlb jisper haam honge

    btn.addEventListener("click", addFolder);
    aRootPath.addEventListener("click",navigateToBreadcrumb);

    function addFolder() {
        let fname = prompt("ENTERS FOLDER's NAME ");

        if (!!fname) {

            let exist = folders.some(f => f.name == fname);

            if (exist == false) {
                fid++;
                //RAM
                folders.push({
                    id: fid,
                    name: fname,
                    pid: cfid        //pid parent id hai root ki jisper haam honge usse current fid se update kar denge
                });

                //HTML
                addFolderHTML(fname, fid, cfid);//aab three parameter pass karenge

                //storage
                saveToStorage();

            }

            else {
                alert(fname + " ALREADY EXIST");
            }



        }
        else {
            alert("ENTER VALID NAME ");
        }


    }
    function editFolder() {
        let divfolder = this.parentNode;
        let divName = divfolder.querySelector("[purpose='name']");
        let ofname = divName.innerHTML; //old fname

        let nfname = prompt("ENTER NEW FOLDER'S NAME" + ofname); //new fname

        if (!!nfname) {

            if (nfname != ofname) { //aaagr file pehle se exist karti hogi taab nhi chalega ye

                let exist = folders.filter(f => f.pid == cfid).some(f => f.name == nfname); //aagr new fname exist karega edit vala to already exist kar denge
                // filter ye karega aaagr parent node  main koi pehle se folder name exist karta hai to folder vapis name same na ho
                if (exist == false) {

                    //RAM
                    let folder = folders.filter(f => f.pid == cfid).find(f => f.name == ofname); //aaagr edit vala folder exist nhi karta hoga exist to change kar denge f.name main
                    // filter don't know
                    folder.name = nfname; //edit newfname daal denge
                    //HTML
                    divName.innerHTML = nfname;


                    //storage
                    saveToStorage();

                }

                else {
                    alert(nfname + " ALREADY EXIST");
                }

            }
            else {
                alert(" THIS IS OLD NAME .PLEASE ENTER NEW NAME !! ");
            }
        } else {
            alert("PLEASE ENTER A NAME ");
        }


    }
    function deleteFolder() {
        let divfolder = this.parentNode;
        let divName = divfolder.querySelector("[purpose='name']");
        let fidtbd =divfolder.getAttribute("fid");



        let flag = confirm("DO YOU WANT TO DELETE " + divName.innerHTML + "?");
        if (flag == true) {
            let exists =folders.some(f => f.pid == fidtbd);
            if( exists== false){
            //ram
            let fidx = folders.findIndex( f => f.id ==fidtbd);
            //filter don't know
            folders.splice(fidx, 1);

            //html
            divcontainer.removeChild(divfolder);

            //storage
            saveToStorage();
            }else{
                alert("CAN'T DELETE .HAS CHILDRENS");
            }

        }



    }

    function navigateToBreadcrumb(){
        let fnmae = this.innerHTML;
        cfid = parseInt(this.getAttribute("fid"));

        divcontainer.innerHTML ="";
        folders.filter(f => f.pid == cfid).forEach(f => {
            addFolderHTML(f.name, f.id, f.pid);
        })

        while(this.nextSibling){
            this.parentNode.removeChild(this.nextSibling);
        }

    }

    function viewFolder() {
        let divfolder = this.parentNode;
        let divName = divfolder.querySelector("[purpose='name']");

         cfid = parseInt(divfolder.getAttribute("fid"));// jis folder per click karenge us folder ki id daal do current folder main 
        //aab hamara current folder us fid main aaajega jo fid main haam honge

        let apathTemplate = mytemplates.content.querySelector(".path"); //template se path class  dalenge 
        let apath = document.importNode(apathTemplate, true); //clone of path aaded

        apath.innerHTML = divName.innerHTML; //aap jaab koi name dalega to vo inner html se aaega
        apath.setAttribute("fid",cfid);
        apath.addEventListener("click",navigateToBreadcrumb);
        divbreadCrumb.appendChild(apath);//root ke sath sath uper name view main dala hua add ho jaega

        divcontainer.innerHTML = "";//divcontainer ko khali kardo jaise he folder ke aader aay nay main

        folders.filter(f => f.pid == cfid).forEach(f => {
            addFolderHTML(f.name, f.id, f.pid);
        })
    }

    function addFolderHTML(fname, fid, pid) {
        let divfoldertemplate = mytemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divfoldertemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        let spanEdit = divFolder.querySelector("span[action='edit']");
        let spanDelete = divFolder.querySelector("span[action='delete']");
        let spanview = divFolder.querySelector("span[action='view']");
        divFolder.setAttribute("fid", fid);//ye attribute local storage main id show karne ke ley kaam aata hai
        divFolder.setAttribute("pid", pid);//aab local storage main uska parent node bhi show karenge haam
        divName.innerHTML = fname;
        spanEdit.addEventListener("click", editFolder);
        spanDelete.addEventListener("click", deleteFolder);
        spanview.addEventListener("click", viewFolder);

        divcontainer.appendChild(divFolder);

    }

    //ye persistTostorage vala function hai
    function saveToStorage() {
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);

    }
    function loadFromStorage() {
        let fjson = localStorage.getItem("data");
        if (!!fjson) {
            folders = JSON.parse(fjson);
            folders.forEach(f => {

                if (f.id > fid) {
                    fid = f.id;
                }

                if (f.pid == cfid) {                       //aaagr current folder parent folder main hoga taab changes karenge html main
                    addFolderHTML(f.name, f.id);
                }
            });
        }

    }

    loadFromStorage();
})();