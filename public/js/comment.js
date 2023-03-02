console.log('hello - in comment.js'); //used for debugging

//CONFIRM IF WORKING
const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log('hello - in newCommentHandler'); //used for debugging

  const comment = document.querySelector('#comment-content').value.trim();
  const post_id = window.location.toString().split('/').pop();

  console.log(comment);
  console.log(post_id);

  if (comment && post_id) {
    console.log("Inside if, before commnet post req");
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/blogposts/${post_id}`);
    } else {
      alert('Failed to create Comment');
    }
  } else {
    alert('Please ensure you have written a comment.');
  }
};

const commentBtn = document.querySelector('.comment-btn');

commentBtn.addEventListener(
  'click',
  newCommentHandler,
  console.log('clicked comment')
);
