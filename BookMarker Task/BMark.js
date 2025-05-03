alert("Welcome to Bookmark Manager!");
alert("You can Add, Delete, and visit your favorite sites easily.");
alert("Please enter the site name and URL in the form below.");

var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var sitesContainer;

if (localStorage.getItem('sites') == null) { 
    sitesContainer = [];
}
else {
    sitesContainer = JSON.parse(localStorage.getItem('sites'));
    displaySites();
}

// To make a control on the site name and URL inputs
if (siteUrlInput.value.includes('https://') || siteUrlInput.value.includes('http://')) {
    siteUrlInput.value = siteUrlInput.value;
}
else {
    siteUrlInput.value = 'https://' + siteUrlInput.value;
}

var sitesCont1ainer = [];
function summession() {
    site = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    }
    sitesContainer.push(site);

    clearForm();

    displaySites();

    localStorage.setItem('sites', JSON.stringify(sitesContainer));
}

function clearForm() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

function displaySites() {
    var cartona = '';
    for (var i = 1; i < sitesContainer.length; i++) {
        cartona += `
            <tr>
                <td>${i}</td>
                <td>${sitesContainer[i].name}</td>
                <td><a href="${sitesContainer[i].url}" class="btn btn-success">Visit</a></td>
                <td><button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button></td>
            </tr>    
        `;
    };
    // debugger
    document.getElementById('sites').innerHTML = cartona;
}

function deleteSite(del) {
    sitesContainer.splice(del, 1);
    localStorage.setItem('sites', JSON.stringify(sitesContainer));
    displaySites();
}









