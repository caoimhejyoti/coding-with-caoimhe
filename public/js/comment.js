console.log('hello - in comment.js'); //used for debugging

//COMPLETE! DESCRIPTION: ASYNC FNC to create a new comment.
const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log('hello - in newCommentHandler'); //used for debugging

  const comment = document.querySelector('#comment-content').value.trim();
  const post_id = window.location.toString().split('/').pop();

  console.log(comment);
  console.log(post_id);

  if (comment && post_id) {
    console.log('Inside if, before commnet post req');
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

//DESCRIPTION: ASYNC FNC to update a comment using the specified id.
const updateCommentHandler = async (event) => {
  event.preventDefault();
  console.log('hello - in update comment fnc'); //used for debugging

  const updatedComment = document.querySelector('#update-comment').value.trim();

  // const post_id = FIXME:;

  if (updatedComment) {
    try {
      console.log(updatedComment); //used for debugging
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ updatedComment }),
        headers: { 'Content-Type': 'application/json' },
      });

      // console.log(response);

      if (response.ok) {
        console.log('worked');
        document.location.replace('/blogposts/${post_id}');
      }
    } catch (err) {
      console.log(err); //used for debugging
      alert('Failed to update comment');
    }
  } else {
    alert('Please ensure you have entered a new comment.');
  }
};

//FIXME: DESCRIPTION: ASYNC FNC to delete a blog post using the specified id.
const delButtonHandler = async (event) => {
  try {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/blogposts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/blogposts');
    }
  } catch (err) {
    alert('Failed to delete Post');
  }
};

// COMPLETE!
const commentBtn = document.querySelector('.comment-btn');
commentBtn.addEventListener(
  'click',
  newCommentHandler,
  console.log('clicked comment')
);

// FIXME: this is not currently working
const updateBtn = document.querySelectorAll('.updateBtn');
updateBtn.addEventListener(
  'click',
  updateCommentHandler,
  console.log('clicked submit to update comment')
);


const delCommentBtn = document.querySelectorAll('.comment-delbtn');
delCommentBtn.addEventListener('click', delButtonHandler, console.log("clicked delete comment");)

// FIXME: only copied across
document.querySelectorAll('#comment-del').forEach((deleteButton) => {
  deleteButton.addEventListener('click', delButtonHandler);
});
