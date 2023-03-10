// DESCRIPTION: ASYNC FNC to create a new comment.
const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-content').value.trim();
  const post_id = window.location.toString().split('/').pop();

  if (comment && post_id) {
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

// DESCRIPTION: ASYNC FNC to delete a blog post using the specified id.
const delButtonHandler = async (event) => {
  try {
    const post_id = window.location.toString().split('/').pop();
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/blogposts/${post_id}`);
    }
  } catch (err) {
    alert('Failed to delete Post');
  }
};

//EventListeners
const commentBtn = document.querySelector('.comment-btn');
commentBtn.addEventListener('click', newCommentHandler);

document.querySelectorAll('#comment-del').forEach((deleteButton) => {
  deleteButton.addEventListener('click', delButtonHandler);
});
