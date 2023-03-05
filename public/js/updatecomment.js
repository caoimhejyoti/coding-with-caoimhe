//DESCRIPTION: ASYNC FNC to update a comment using the specified id.
const updateCommentHandler = async (event) => {
  event.preventDefault();

  const updatedComment = document.querySelector('#update-comment').value.trim();
  const post_id = event.target.getAttribute('data-id');
  const comment_id = window.location.toString().split('/').pop();

  if (updatedComment) {
    try {
      const response = await fetch(`/api/comments/${comment_id}`, {
        method: 'PUT',
        body: JSON.stringify({ updatedComment }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/blogposts/${post_id}`);
      }
    } catch (err) {
      alert('Failed to update comment');
    }
  } else {
    alert('Please ensure you have entered a new comment.');
  }
};

//EventListeners
document
  .querySelector('#submit-updated-comment')
  .addEventListener('click', updateCommentHandler);
