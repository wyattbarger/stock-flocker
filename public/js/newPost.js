// // const newPost = async () => {
// //     const stockID = window.location.pathname.split('/')[2];
// //     const response = await fetch(`/api/stocks/${stockID}/posts`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //     });
  
// //     if (response.status === 200) {
// //         alert('Posted successfully!');
// //         document.location.reload();
// //     } else {
// //       alert('Failed to post.');
// //     }
// //   };
  
// //   document.querySelector('#postSubmit').addEventListener('click', newPost);
// const newPost = async () => {
//     const stockID = window.location.pathname.split('/')[2]; // Assuming the page ID is in the third segment of the URL
//     const title = document.querySelector('#title').value.trim();
//     const content = document.querySelector('#content').value.trim();
//     const url = `/api/stocks/:id/posts`;
    
//     const response = await fetch(url, {
//       method: 'POST',
//       body: JSON.stringify({title, content}),
//       headers: { 'Content-Type': 'application/json' },
//     });
  
//     if (response.status === 200) {
//       alert('Posted successfully!');
//       document.location.reload(); 
//     } else {
//       alert('Failed to post.');
//     }
//   };
  
//   document.querySelector('#postSubmit').addEventListener('click', newPost);