import reddit from './reddit';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Event listener as we submit the form
searchForm.addEventListener('submit', e => {
  //Get search Term
  const searchTerm = searchInput.value;
  //Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  //This selects the checkBox with name sortby and takes the input value
  //get the limit
  const searchLimit = document.getElementById('limit').value;

  //Check inputs
  if (searchTerm === '') {
    //show a message
    showMessage('Please add a search Term', 'alert-danger');
  }
  //clear input
  searchInput.value = '';
  //search reddit
  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    //loop through posts
    results.forEach(post => {
      //check for image
      let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
      output += `
       <div class="card" style="width:18rem;">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-danger">Read More</a>
    <hr>
    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
    <span class="badge badge-dark">Score: ${post.score}</span>
  </div>
</div>

       `;
    });
    output += '</div>'; //Here we append not add this to output
    document.getElementById('results').innerHTML = output;
  });
  e.preventDefault();
});

//Show message
const showMessage = (message, classname) => {
  //Create the div
  const div = document.createElement('div');
  //add class
  div.className = `alert ${classname}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //Get the parent container
  const searchContainer = document.getElementById('search-container');
  //get search
  const search = document.getElementById('search');
  //Insert the message
  searchContainer.insertBefore(div, search);
  //Timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
};

//truncate text
const truncateText = (text, limit) => {
  const shorten = text.indexOf(' ', limit);
  if (shorten == -1) {
    return text;
  }
  return text.substring(0, shorten);
};
