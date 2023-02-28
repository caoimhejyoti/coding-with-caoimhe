// const sequelize = require("../../config/connection");

console.log("hello - in dashboard.js");
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blogPost-name').value.trim();
  const content = document.querySelector('#blogPost-content').value.trim();


  if (name && content) {
    const response = await fetch(`/dashboard`, {
      method: 'POST',
      body: JSON.stringify({ name, content}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create Blog post');
    }; 
  }else{
    alert('Please ensure you have filled out both the Title and Content sections.');
  };
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/dashboard/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete Post');
    }
  }
};

const submitButton = document.querySelector('#submit')
const deleteButton = document.querySelector('.delBtn')

submitButton.addEventListener('click',newFormHandler);
deleteButton.addEventListener('click',delButtonHandler);
