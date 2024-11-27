document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.error-message').style.display = 'none';
    document.querySelector('.sent-message').style.display = 'none';

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    emailjs.send('service_opbia4m', 'template_b6j8qte', {
        to_email: 'mkoduri73@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
    })
    .then(function() {
        // Hide loading
        document.querySelector('.loading').style.display = 'none';
        // Show success message
        document.querySelector('.sent-message').style.display = 'block';
        // Reset form
        document.getElementById('contact-form').reset();
    }, function(error) {
        // Hide loading
        document.querySelector('.loading').style.display = 'none';
        // Show error message
        document.querySelector('.error-message').style.display = 'block';
        document.querySelector('.error-message').innerHTML = 'Message could not be sent. Please try again later.';
        console.error('EmailJS error:', error);
    });
})
