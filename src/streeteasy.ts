function checkForTourButton() {
    const buttons = document.querySelectorAll('button')
    const filteredButtons = Array.prototype.filter.call(buttons, function (el) {
        return el.textContent.trim().toLowerCase() === 'request a tour'
    })

    if (filteredButtons.length > 0) {
        const tourButton = filteredButtons[0]
        console.log('Found the "Request a tour" button')

        tourButton.addEventListener('click', function () {
            chrome.storage.sync.set(
                { apartment: { contacted: 'test' } },
                function () {
                    console.log('Saved to storage')
                }
            )
        })

        chrome.storage.sync.get(['apartment'], function (items) {
            console.log('Apartment data', items.apartment)
            if (items.apartment?.contacted) {
                console.log('Already contacted:', items.apartment.contacted)
                tourButton.innerHTML = 'Contact Again!'
            }
        })

        return true
    }

    return false
}

const observer = new MutationObserver(() => {
    if (checkForTourButton()) {
        observer.disconnect() // Stop observing once button is found
    }
})

// Start observing changes to the body
observer.observe(document.body, {
    childList: true,
    subtree: true,
})

// Also run once just in case it's already present
checkForTourButton()
