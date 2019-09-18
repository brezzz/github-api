'use strict';
function displayResults(responseJson) {
  // if there are previous results, remove them
  
  $('#results-list').empty();
  // iterate through the owner object, stopping at the max number of results
  
/*found in object here:https://developer.github.com/v3/repos/#list-user-repositories - owner.login, owner.html_url  & owner.avatar_url */

    console.log(responseJson);
    console.log(responseJson.length); //at bottom of console.
    console.log('Username is: ' + responseJson[0].owner.login);
    console.log(`${responseJson[0].owner.login}\'s github url is:`  + responseJson[0].owner.html_url);
    
 let user = responseJson[0].owner.login;
 let profile = 
      `<li><h3><a href="${responseJson[0].owner.html_url}">${responseJson[0].owner.login}</a></h3>
      <img src='${responseJson[0].owner.avatar_url}'>
      <a href="${responseJson[0].owner.html_url}"><p>${responseJson[0].owner.html_url}</p></a>
      </li>
      
      <h4 class='repos'><a href ='https://github.com/${user}?tab=repositories'> Repos</a>: ${responseJson.length}</h4> `   
    $('#results-list').append(profile);
   for (let i = 0; i < responseJson.length; i++){   
     $('#results-list').append(
`
      <ul class= 'repos'><span id='name'><a href='${responseJson[i].html_url}'>${responseJson[i].name}</a></span>:
      <li>"${responseJson[i].description}"</li></ul>`)
       
      
    }
  //display the results section
 // console.log(responseJson);  
  $('#results').removeClass('hidden');
};

function getUser(username) {
  
//GET /users/:username/repos

  const url = `https://api.github.com/users/${username}/repos`;
console.log(url);
 $('#js-error-message').html("");
$('#results-list').html("");
fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

    
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-search-username').val();
    getUser(username);
    console.log('Line 60 - username is: ' + username)
  });
}

$(watchForm);
