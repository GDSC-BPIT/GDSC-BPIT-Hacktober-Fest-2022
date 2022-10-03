const loginLink = "https://www.linkedin.com/home";
let email = "xyz"; // your email id
let password = "xyz"; // your password

let puppeteer = require("puppeteer");
(async function () {
    try {
        let browserWillbeLaunced = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        });

        let newTab = await browserWillbeLaunced.newPage();

        await newTab.goto(loginLink);

        await newTab.type(" input[id='session_key'] ", email, {
            delay: 100,
        });

        await newTab.type("input[id='session_password']", password, {
            delay: 100,
        });

        await newTab.click('button[class="sign-in-form__submit-button"]', {
            delay: 100,
        });

        await waitAndClick('a[data-test-global-nav-link="mynetwork"]', newTab);
        console.log('Open my network tab')

        await waitAndClick('a[data-test-global-nav-link="jobs"]', newTab);
        console.log('Open Job tab')

        await waitAndClick('a[href="/jobs/search/?keywords=amazon&origin=JOBS_HOME_SEARCH_CARDS&start=0"]', newTab);
        console.log('Open Amazon Job tab')

        await waitAndClick('a[href="/jobs/view/2673500710/?alternateChannel=search&refId=soZj9ZSnX5FHGH6bFcnNBQ%3D%3D&trackingId=1l0cKuHc3nY28J7IH1U%2Bag%3D%3D&trk=d_flagship3_people&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_jobs%3BTDKxlukLQgK6aNpmdt6VsA%3D%3D"]', newTab);
        console.log('Open Jobs tab')

       
    } catch (error) {
        console.log(error);
    }
}
)();

function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector);
        waitForModalPromise
            .then(function () {
                let clickModalPromise = cPage.click(selector, { delay: 200 });
                return clickModalPromise;
            })
            .then(function () {
                resolve();
            })
            .catch(function () {
                reject();
            });
    });
}
