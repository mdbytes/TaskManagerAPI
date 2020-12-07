$learnMoreButton = document.querySelector('#learn-more-button')
$apiDetails = document.querySelector('#api-details')

$learnMoreButton.addEventListener('click', e => {
  $apiDetails.scrollIntoView()
})
