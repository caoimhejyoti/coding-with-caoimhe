//DESCRIPTION: ASYNC FNC to update a blog post using the specified id.
const updateBtnHandler = async (event) => {
  event.preventDefault();

  const updatedName = document
    .querySelector('#update-blogPost-name')
    .value.trim();
  const updatedContent = document
    .querySelector('#update-blogPost-content')
    .value.trim();

  if (updatedName && updatedContent) {
    try {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/updatepost/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ updatedName, updatedContent }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      }
    } catch (err) {
      alert('Failed to update Post');
    }
  } else {
    alert('Please ensure you have updated the Title and Content.');
  }
};

document.querySelector('#submit').addEventListener('click', updateBtnHandler);
