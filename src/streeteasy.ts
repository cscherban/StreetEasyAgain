type ApartmentData = {
    address?: string
    price?: string
    rentOrSale?: string
    feeInfo?: string
    squareFootage?: string
    pricePerFt?: string
    rooms?: string
    beds?: string
    baths?: string
    neighborhood?: string
    contacted?: Date
}

function checkForTourButton() {
    const buttons = document.querySelectorAll('button')
    const filteredButtons = Array.prototype.filter.call(buttons, function (el) {
        return el.textContent.trim().toLowerCase() === 'request a tour'
    })

    const slug = location.pathname.replace(/^\/building\//, '')

    if (slug === '') {
        console.log('Not a building page, exiting')
        return false
    }

    const address = document
        .querySelector('[data-testid="address"]')
        ?.textContent?.trim()

    // Price
    const price = document
        .querySelector('[data-testid="priceInfo"] h4')
        ?.textContent?.trim()

    // Rent/Sale indicator
    const rentOrSale = document
        .querySelector('[data-testid="priceInfo"] p')
        ?.textContent?.trim()

    // Fee info (e.g., "No fee")
    const feeInfo = document
        .querySelector('[data-testid="pill-noFee"] span')
        ?.textContent?.trim()

    // Square footage
    const squareFootage = document
        .querySelectorAll(
            '[data-testid="propertyDetails"] .PropertyDetails_item__4mGTQ'
        )[0]
        ?.textContent?.trim()

    // Price per ft²
    const pricePerFt = document
        .querySelectorAll(
            '[data-testid="propertyDetails"] .PropertyDetails_item__4mGTQ'
        )[1]
        ?.textContent?.trim()

    // Rooms
    const rooms = document
        .querySelectorAll(
            '[data-testid="propertyDetails"] .PropertyDetails_item__4mGTQ'
        )[2]
        ?.textContent?.trim()

    // Bedrooms
    const beds = document
        .querySelectorAll(
            '[data-testid="propertyDetails"] .PropertyDetails_item__4mGTQ'
        )[3]
        ?.textContent?.trim()

    // Bathrooms
    const baths = document
        .querySelectorAll(
            '[data-testid="propertyDetails"] .PropertyDetails_item__4mGTQ'
        )[4]
        ?.textContent?.trim()

    // Neighborhood
    const neighborhood = document
        .querySelector('[data-testid="buildingSummaryList"] a')
        ?.textContent?.trim()

    const appartmentData: ApartmentData = {
        address,
        price,
        rentOrSale,
        feeInfo,
        squareFootage,
        pricePerFt,
        rooms,
        beds,
        baths,
        neighborhood,
    }

    const appartmentName = address ?? slug

    if (appartmentName && filteredButtons.length > 0) {
        const tourButton = filteredButtons[0]
        console.log('Found the "Request a tour" button')

        tourButton.addEventListener('click', function () {
            appartmentData.contacted = new Date()
            chrome.storage.sync.set(
                { [appartmentName]: appartmentData },
                function () {
                    console.log('Saved to storage')
                }
            )
        })

        chrome.storage.sync.get([appartmentName], function (items) {
            console.log('Apartment data', items[appartmentName])
            const data = items[appartmentName]
            if (data?.contacted) {
                console.log('Already contacted:', data)
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
