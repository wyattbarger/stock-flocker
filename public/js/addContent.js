const addPost = async (event) => { 
  event.preventDefault();
  const stockId = window.location.pathname.split('/').pop()
  const title = document.querySelector('#title').value.trim(); 
  const content = document.querySelector('#content').value.trim();
  if (title && content) {
      const serverResponse = await fetch(`/api/stocks/${stockId}/posts`, { 
          method: 'POST',
          body: JSON.stringify({ title, content }), 
          headers: { 'Content-Type': 'application/json' }, 
      });
      if (serverResponse.ok) {
        document.location.replace(`/api/stocks/:id`);
      } else {
          alert('There was a problem adding your post. Please contact and admin and try again later.'); 
      }
  }
};

document.querySelector('#add-post').addEventListener('submit', addPost);

// const addPostBtn = document.querySelector("add-post");

// addPostBtn.addEventListener('click', function(event) { // Changed the add post button logic to include a prevent defauult for testing purposes.
//     event.preventDefault();
//     addPost(stockId, title, content);
// });
