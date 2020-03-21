var btnTweet = document.getElementById("btn-tweet");
var listTweet = document.getElementById("content-tweets");

listener();

function listener() {
    document.getElementById("input").addEventListener("submit", addTweet);
    
    listTweet.addEventListener('click', deleteTweet);

    document.addEventListener('DOMContentLoaded', localStorageReady);
}

function addTweet(e) {
    e.preventDefault();
    
    const tweet = document.getElementById("tweet").value;

    const btnEliminar = document.createElement('a');
    btnEliminar.classList = "delete-tweet";
    btnEliminar.innerText = 'X';
    
    const li = document.createElement('li');
    li.classList = "col-m-9";
    li.innerText = tweet;
    li.appendChild(btnEliminar);
    listTweet.appendChild(li);
    addLocalStorage(tweet);
}

function deleteTweet(e) {
    e.preventDefault();

    if(e.target.className === 'delete-tweet') {
        e.target.parentElement.remove();
        deleteTweetLocalStorage(e.target.parentElement.innerText);
        alert("Desea Elimina el tweet?");
    }
}

function addLocalStorage(tweet) {
    let tweets;

    tweets = getLocalStorage();

    tweets.push(tweet);

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getLocalStorage() {
    let tweets;
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    }
    else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function localStorageReady() {
    let tweets;
    tweets = getLocalStorage();

    tweets.forEach(element => {
        const btnEliminar = document.createElement('a');
        btnEliminar.classList = "delete-tweet";
        btnEliminar.innerText = 'X';
        
        
        const li = document.createElement('li');
        li.innerText = element;
        li.appendChild(btnEliminar);
        
        listTweet.appendChild(li);
    });
}


function deleteTweetLocalStorage(tweet) {
    let tweets, tweetDelete;

    tweetDelete = tweet.substring(0, tweet.length -1);

    tweets = getLocalStorage();

    tweets.forEach(function(element, index){
        if(tweetDelete === element) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
