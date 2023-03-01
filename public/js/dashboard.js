console.log('hello - in dashboard.js'); //used for debugging

//COMPLETE! DESCRIPTION: ASYNC FNC to creat a new blog post
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blogPost-name').value.trim();
  const content = document.querySelector('#blogPost-content').value.trim();

  if (name && content) {
    const response = await fetch(`/dashboard`, {
      method: 'POST',
      body: JSON.stringify({ name, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create Blog post');
    }
  } else {
    alert(
      'Please ensure you have filled out both the Title and Content sections.'
    );
  }
};

//COMPLETE! DESCRIPTION: ASYNC FNC to delete a blog post using the specified id.
const delButtonHandler = async (event) => {
  try {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/dashboard/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    }
  } catch (err) {
    alert('Failed to delete Post');
  }
};

//DESCRIPTION: ASYNC FNC to update a blog post using the specified id.
const updateBtnHandler = async (event) => {
  const id = event.target.getAttribute('data-id');

  const response = await fetch(`/api/updatepost/${id}`, {
    method: "GET",
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
  document.location.replace(`/api/updatepost/${id}`);
  } else {
    alert('Unable to update post at this time. Please try again');
}};

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', newFormHandler);

document.querySelectorAll('.delBtn').forEach((deleteButton) => {
  deleteButton.addEventListener('click', delButtonHandler);
});

// document.querySelectorAll('.updateBtn').forEach((updateButton) => {
//   updateButton.addEventListener('click', updateBtnHandler);
// });
