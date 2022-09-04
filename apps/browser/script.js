const frontPage = '<div class="front-page"><h3 class="heading">Welcome to Markify</h3><div class="button-div"><button class="signin-btn" type="button"><a href="http://localhost:3000/auth" target="_blank">Signin</a></button></div></div>';
const homePage = '<div class="search"><input class="search-bar" type="text" /><button class="btn">+</button></div>';

fetch('http://localhost:8000/user')
    .then(data => data.json())
    .then(Userdata => {
        console.log(Userdata)
        if (Userdata.message == 'unauthorised') {
            document.getElementById('ins').innerHTML = frontPage
        }
        else {
            document.getElementById('ins').innerHTML = homePage
            var item = ''
            for (let i = 0; i < Userdata.data.bookmarks.length; i++) {
                let name = Userdata.data.bookmarks[i].Name
                let url = Userdata.data.bookmarks[i].URL
                item += '<div class="item"><hr /><a class="link" href="' + url + '" target="_blank">' + name + '</a></div>'
                console.log(item)
                document.getElementById('item-list').innerHTML = item
            }
        }
    })