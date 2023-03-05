console.log('hello - in updatecomment.js'); //used for debugging

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

document
  .querySelector('#submit-updated-comment')
  .addEventListener('click', updateCommentHandler);
