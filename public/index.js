document.getElementById('healthcheck-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('website-url').value;
    const device = 'mobile'; // Or get this from another input/select field
  
    fetch('/check-website-health', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, device })
    })
    .then(response => response.json())
    .then(data => {
      // Process and display the results
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });