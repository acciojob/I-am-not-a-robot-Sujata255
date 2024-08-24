document.addEventListener('DOMContentLoaded', () => {
  const imageContainer = document.getElementById('image-container');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const messagePara = document.getElementById('para');

  const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
  let selectedImages = [];
  let clickCount = 0;

  // Function to shuffle an array
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Function to render images
  function renderImages() {
    // Clear previous images and selections
    imageContainer.innerHTML = '';
    selectedImages = [];
    clickCount = 0;
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    messagePara.textContent = '';

    // Choose a random image to duplicate
    const duplicateImage = imageClasses[Math.floor(Math.random() * imageClasses.length)];

    // Create an array with 5 unique images and 1 duplicate
    const imagesArray = [...imageClasses];
    imagesArray.push(duplicateImage);

    // Shuffle the images array
    const shuffledImages = shuffleArray(imagesArray);

    // Render images to the DOM
    shuffledImages.forEach((imgClass, index) => {
      const imgElement = document.createElement('img');
      imgElement.classList.add(imgClass);
      imgElement.dataset.class = imgClass;
      imgElement.addEventListener('click', () => handleImageClick(imgElement));
      imageContainer.appendChild(imgElement);
    });
  }

  // Handle image click event
  function handleImageClick(imgElement) {
    // If image is already selected, do nothing
    if (imgElement.classList.contains('selected') || clickCount >= 2) return;

    imgElement.classList.add('selected');
    selectedImages.push(imgElement.dataset.class);
    clickCount++;

    // Show Reset button after first click
    if (clickCount === 1) {
      resetButton.style.display = 'inline-block';
    }

    // Show Verify button after second click
    if (clickCount === 2) {
      verifyButton.style.display = 'inline-block';
    }
  }

  // Handle Reset button click
  resetButton.addEventListener('click', () => {
    renderImages();
  });

  // Handle Verify button click
  verifyButton.addEventListener('click', () => {
    verifyButton.style.display = 'none';

    if (selectedImages[0] === selectedImages[1]) {
      messagePara.textContent = 'You are a human. Congratulations!';
      messagePara.style.color = '#4caf50';
    } else {
      messagePara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      messagePara.style.color = '#f44336';
    }
  });

  // Initial render
  renderImages();
});
