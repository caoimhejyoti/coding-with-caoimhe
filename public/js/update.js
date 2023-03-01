console.log('hello - in update.js'); //used for debugging

//DESCRIPTION: ASYNC FNC to update a blog post using the specified id.
const updateBtnHandler = async (event) => {
  event.preventDefault();
  console.log('hellow - in update fnc'); //used for debugging

  const updatedName = document
    .querySelector('#update-blogPost-name')
    .value.trim();
  const updatedContent = document
    .querySelector('#update-blogPost-content')
    .value.trim();

  try {
    console.log(updatedName); //used for debugging
    console.log(updatedContent); //used for debugging
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/api/updatepost/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ updatedName, updatedContent }),
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log(response);

    if (response.ok) {
      console.log('worked');
      document.location.replace('/dashboard');
    }
  } catch (err) {
    console.log(err); //used for debugging
    alert('Failed to update Post');
  }
};

document.querySelector('#submit').addEventListener('click', updateBtnHandler);
