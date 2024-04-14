document.addEventListener('DOMContentLoaded', function() {
    const ticketForm = document.getElementById('ticket-form');
    const ticketsContainer = document.getElementById('tickets');
  
    ticketForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const issue = document.getElementById('issue').value;
  
      if (name.trim() === '' || issue.trim() === '') {
        alert('Please fill out all fields');
        return;
      }
  
      const ticket = document.createElement('div');
      ticket.classList.add('ticket');
      ticket.innerHTML = `
        <h3>Name: ${name}</h3>
        <p>Issue: ${issue}</p>
      `;
  
      ticketsContainer.appendChild(ticket);
  
      // Clear form fields
      document.getElementById('name').value = '';
      document.getElementById('issue').value = '';
    });
  });
    