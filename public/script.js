
document.getElementById('queueForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Get form data
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
  
    // Display form data using alert
    alert(`Last Name: ${lastName}\nFirst Name: ${firstName}\nEmail: ${email}`);
    
    const data = {
        lastName: lastName,
        firstName: firstName,
        email: email
    };
    //alert(JSON.stringify(data))
    // Send POST request to server
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      console.log('Server response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  