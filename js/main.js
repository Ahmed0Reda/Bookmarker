var siteName = document.querySelector(".site-name");
var SiteUrl = document.querySelector(".site-url");
var submitButton = document.querySelector('.btn-submit')
var siteSearch = document.querySelector('.site-search')
var modal = document.querySelector('.my-custom')

var webSiteNameRegex = /^[A-Za-z]{3,}/
var webStieUrlRegex = /^(https:\/\/)?(w{3}\.)?\w+\.\w{2,}$/

var allWebSites = []

if(localStorage.getItem("allWebSites") != null){
    allWebSites = JSON.parse(localStorage.getItem("allWebSites"));
    displayAllWebSites(allWebSites);
}

function addSite(){
    if(validation(siteName, webSiteNameRegex) && validation(SiteUrl, webStieUrlRegex)){
        if(submitButton.innerHTML === "Submit"){
            var webSite = {
                name: siteName.value,
                url: SiteUrl.value
            };
            allWebSites.push(webSite)
            console.log(allWebSites);
            localStorage.setItem('allWebSites', JSON.stringify(allWebSites))
            clearForm()
            displayAllWebSites(allWebSites)
            siteName.classList.remove('is-valid')
            SiteUrl.classList.remove('is-valid')
        }else{
            var webSite = {
                name: siteName.value,
                url: SiteUrl.value
            };
            allWebSites.splice( updateIdx, 1, webSite)
            localStorage.setItem('allWebSites', JSON.stringify(allWebSites))
            clearForm()
            displayAllWebSites(allWebSites)
            submitButton.innerHTML = "Submit"
            siteName.classList.remove('is-valid')
            SiteUrl.classList.remove('is-valid')
        }
    }
    else{
        modal.classList.add('d-flex');
        document.querySelector(".btn-close").addEventListener('click', function(){
            modal.classList.remove('d-flex');
        })
    }
    
}


function clearForm(){
    siteName.value = "";
    SiteUrl.value = "";
}


function displayAllWebSites(sites){
    var websites = ''
    for(var i = 0 ;i < sites.length; i++){
        websites = websites + `              <tr>
                <th scope="row">${i+1}</th>
                <td>${sites[i].name}</td>
                <td><a class="btn btn-visit " target="_blank" href="https://${sites[i].url}"><i class="fa-solid fa-eye pe-2"></i>Vist</a></td>
                <td><button onclick='updateSite(${sites[i].oldIndex == undefined ? i : sites[i].oldIndex})' class="btn btn-warning"><i class="fa-solid fa-pen-to-square pe-2"></i>Update</button></td>
                <td><button onclick='deleteSite(${sites[i].oldIndex == undefined ? i : sites[i].oldIndex})' class="btn btn-danger "><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
              </tr>`
    }
    document.querySelector('tbody').innerHTML = websites;
}


function deleteSite(idx){
    allWebSites.splice(idx, 1);
    localStorage.setItem('allWebSites', JSON.stringify(allWebSites))
    displayAllWebSites(allWebSites)
}

function updateSite(idx){
    siteName.value = allWebSites[idx].name;
    SiteUrl.value = allWebSites[idx].url;
    updateIdx = idx;
    submitButton.innerHTML = "Update"
    return updateIdx
}

function search(term){
    var foundedSite = [];
    for (var i = 0; i < allWebSites.length; i++){
        if(allWebSites[i].name.toLowerCase().includes(term.toLowerCase())){
            var search = allWebSites[i];
            search.oldIndex = i;
            foundedSite.push(search);
        }
    }
    displayAllWebSites(foundedSite)
}

// function nameValidation(value){
//     value = webSiteNameRegex.test(siteName.value)
//     if(value){

//     }
//    return webSiteNameRegex.test(siteName.value);
// }
// function urlValidation(){
//     return webStieUrlRegex.test(SiteUrl.value);
// }
function validation(element, regex){
    var testRegex = regex;
    if(testRegex.test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid")
    }
    return testRegex.test(element.value)
}
siteName.addEventListener('keyup', function(){
    validation(siteName, webSiteNameRegex);
});
SiteUrl.addEventListener('keyup', function(){
    validation(SiteUrl, webStieUrlRegex);
}); 

