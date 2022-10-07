//in this project we learn how promises work
//node install puppeteer
//cmd - node hackerrank_Automation.js
const puppeteer = require('puppeteer');

const codeobj = require('./codes') //isme solutions paade hai question 1 ke 
//login credentials
const loginLink ='https://www.hackerrank.com/auth/login'
const email ='deathnote053@gmail.com'
const password ='123456'





//this function helps to open browser and he promise that he will open 
let browserOpen = puppeteer.launch({
    headless : false,//this is required to show headless
    args :['--start-maximized'], //it will helps to open in full page
    defaultViewport:null//means we given in normal view port of desktop
})

let page



//when promise of browser open it .and it will promise that it will open the page  
browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;//promise of page open 
}).then(function(newTab){ //it will promise to open new tab and website
    page = newTab
    let hackerrankOpenPromise = newTab.goto("https://www.google.com/")
    return hackerrankOpenPromise
}).then(function(){
    let element =page.waitForSelector("input[type='text']",{visible: true})
    return element
}).then(function(){
    let elementpromise =page.type("input[type='text']","hackerrank",{delay:100})

    return elementpromise
}).then(function(){
    let elementpromisepressed =page.keyboard.press("Enter",{delay:50})

    return elementpromisepressed })
.then(function(){
    let elementaddress =page.waitForSelector('a[href="https://www.hackerrank.com/login"]',{visible: true})
    return elementaddress
}).then(function(){
    let keyswill = page.click('a[href="https://www.hackerrank.com/login"]')
    return keyswill
}).then(function(){
    let pageload = page.waitForSelector("input[id ='input-1']",{visible: true})
    return pageload
}).then(function(){ //it will promise to enter email in input 1
    let emailIsEntered = page.type("input[id ='input-1']" ,email ,{delay : 100})
    return emailIsEntered
}).then(function(){ //it will promise to enter password
    let passwordIsentered = page.type("input[type='password']" ,password ,{delay: 100})
    return passwordIsentered
}).then(function(){//it will promise to login
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]',{delay:100 })
    return loginButtonClicked
}).then(function(){ //ye promise karta hai algorithm vale section main jaega
   let clickOnAlgoPromise = waitAndClick('.topic-name[data-automation="algorithms"] ',page)
   return clickOnAlgoPromise
}).then(function(){//ye promise karta hai open kar dega warmup
    let getToWarmUp = waitAndClick('input[value="warmup"]',page)
    return getToWarmUp
}).then(function(){
    //$$ act as query selector and all challenges saare questions la dega warmup ke
    let allChallenges = page.$$( '.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:80})
    return allChallenges
}).then(function(questionsArr){ //questions length aajaegi isme
    console.log('number of question',questionsArr.length)
    let questionWillBeSolved = questionSolver(page ,questionsArr[0],codeobj.answers[0]) //question 1 ka answer zero index se lelo
    return questionWillBeSolved
})




//this function basically doing is when the current page is loaded sometimes 
//data or  selector in page is not loaded completed 
//to insure that we make a function called waitAndclick 
//this function fire and check .if the current page loaded then we perform our operations in current page
//means in simple words data load hokar jaab complete hokar milega taaab hum aage ka kaam karenge
//to wait function load ho jay taab taak rooke rakhta hai aage ke promises ko
//here selector is our data which is loading in currentpage(cpage)

function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitforModePromise = cPage.waitForSelector(selector)//promise karta hai load ho janege selector 
        waitforModePromise.then(function(){
            let clickMOdal =cPage.click(selector) //jaab selector load ho jaenge promise karta hai aab click kar sakte hai ander
            return clickMOdal
        }).then(function(){
            resolve()//aagr uper se sahi taab chalega
        }).catch(function(err){
            reject()//aagr page thik se load nhi hua themn nhin chalega
        })
    })
}

//ye question lakar dega page ka and usse click kar dega usse

//and ussse input lekar solve kar dega

function questionSolver( page ,question, answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClick = question.click();//ye promise karta hai click karke le aaega question ko
        questionWillBeClick.then(function(){
                                              //ye promise karta hai question ka editor khol dega
        let EditorInfocusPromise = waitAndClick('.monaco-editor.no-user-select.vs',page)
        return EditorInfocusPromise
     }).then(function(){
        //aaasal main editor main code main automatic brackets close ho jate hai
        //so hum code custom input main dalenge
        return waitAndClick('.checkbox-input' ,page)

     }).then(function(){  //isme input jaega 
                            //wait karenge ki aaega input isme waitr for selector ki help se
        return page.waitForSelector('textarea.custominput',page)
     }).then(function(){
                      //isme type hota dikhai dega answer
         return page.type('textarea.custominput',answer ,{delay:40})
     }).then(function(){//aab hum control+a karenge select ke ley custom input se 
                       //pehle control ka promise fhir a ka and fhir cut x ka promise
                       //then cut karke editor main paste and submit 
        let CTRLPressed = page.keyboard.down('Control')
        return CTRLPressed
     }).then(function(){
        let aISPressed = page.keyboard.press('A',{delay:100})
        return aISPressed
     }).then(function(){
        let XisPressed = page.keyboard.press('X',{delay:100})
        return XisPressed
     }).then(function(){
        let CtrlisUnpreseed = page.keyboard.up('Control')
        return CtrlisUnpreseed
     }).then(function(){
        let maineditorinpressed = waitAndClick('.monaco-editor.no-user-select.vs',page)
        return maineditorinpressed
     }).then(function(){
          let ctrlispressed = page.keyboard.down('Control')
          return ctrlispressed
     }).then(function(){
        let aISPressed = page.keyboard.press('A',{delay:100})
        return aISPressed
     }).then(function(){
        let vISPressed = page.keyboard.press('V',{delay:100})
        return vISPressed
     }).then(function(){
        let CtrlisUnpreseed = page.keyboard.up('Control')
        return CtrlisUnpreseed
    }).then(function(){//ye promise karta hai open kar dega warmup
        let getToWarmUp = waitAndClick('.hr-monaco__run-code',page)
        return getToWarmUp
    }).then(function(){
                        //ye submit per click kar dega akri main
        return page.click('.hr-monaco__run-code',{delay:20})
    }).then(function(){
        resolve()
    }).catch(function(err){
        reject();
    })
    })
}