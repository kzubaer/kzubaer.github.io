/* Particle background + small interactions
   Lightweight, no external libs.
   - Responsive particle count
   - Mouse repulsion
*/
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));
