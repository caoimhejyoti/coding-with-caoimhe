console.log("hello - in comment.js"); //used for debugging

//WORKING!
const newCommentHandler = async (event) => {
  console.log("hello - in newCommentHandler"); //used for debugging
  event.preventDefault();
  console.log("inside newCommentHandler");

  const comment = document.querySelector('#comment-content').value.trim();

  if (comment) {
    const response = await fetch(`/api/blogposts/:id`, {
      method: 'POST',
      body: JSON.stringify({ comment}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/api/blogposts/:id');
    } else {
      alert('Failed to create Comment');
    }; 
  }else{
    alert('Please ensure you have written a comment.');
  };
};

const commentBtn = document.querySelector('#submit')

commentBtn.addEventListener('submit',newCommentHandler);