// const sequelize = require("../../config/connection");

console.log("hello - in dashboard.js");
const newFormHandler = async (event) => {
  console.log("HELLO - start of new form handler");
  event.preventDefault();

  const name = document.querySelector('#blogPost-name').value.trim();
  const content = document.querySelector('#blogPost-content').value.trim();


  if (name && content) {
    console.log("name and content ok");
    console.log(name);
    console.log(content);
    const response = await fetch(`/dashboard`, {
      method: 'POST',
      body: JSON.stringify({ name, content}),
      headers: {
        'Content-Type': 'application/json',
      },
      
    },
    console.log("within fetch request"),
    );

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create Blog post');
    }; 
  }else{
    alert('Please ensure you have filled out both the Title and post content sections.');
  };
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/dashboard/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete Post');
    }
  }
};

// document
//   .querySelector('.new-blogPost-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.blogPost-list')
//   .addEventListener('click', delButtonHandler);

const submitButton = document.querySelector('#submit')

submitButton.addEventListener('click',newFormHandler);