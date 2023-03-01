console.log('hello - in update.js'); //used for debugging

//DESCRIPTION: ASYNC FNC to update a blog post using the specified id.
const updateBtnHandler = async (event) => {
    //How is the content being created?
    const name = document.querySelector('#update-blogPost-name').value.trim();
    const content = document
      .querySelector('#update-blogPost-content')
      .value.trim();
  
    try {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/dashboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, content }),
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      }
    } catch (err) {
      alert('Failed to delete Post');
    }
  };