async function addPost(stockId, title, content) { // Placeholder function to test the Post post route. 
    try {
      const postData = {
        title: title,
        content: content,
      };
      const response = await fetch(`/api/stocks/${stockId}/posts`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const newPost = await response.json();
        console.log(newPost);
        history.back();
      } else {
        alert('Failed to add post');
      }
    } catch (error) {
      console.error(error);
    }
};

const addPostBtn = document.querySelector("add-post");

addPostBtn.addEventListener('click', function(event) { // Changed the add post button logic to include a prevent defauult for testing purposes.
    event.preventDefault();
    addPost(stockId, title, content);
});
