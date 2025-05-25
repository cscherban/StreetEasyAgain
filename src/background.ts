chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log('Item clicked', info, tab)
    if (info.menuItemId === 'lookup') {
        if (info.srcUrl) {
            // TODO: reverse image search
            console.log('srcUrl', info.srcUrl)
        }
    } else if (info.menuItemId === 'selected') {
        console.log('selected')
    } else if (info.menuItemId === 'checkbox') {
        console.log('checkbox')
    }
})

chrome.runtime.onInstalled.addListener(function () {
    // Create a lookup item.
    chrome.contextMenus.create({
        title: 'lookup',
        contexts: ['image', 'selection'],
        id: 'lookup',
    })

    chrome.contextMenus.create({
        title: 'lookup selected',
        contexts: ['selection'],
        id: 'selected',
    })

    // Create a checkbox item.
    chrome.contextMenus.create({
        title: 'Toggle Auto-Lookup',
        type: 'checkbox',
        id: 'checkbox',
    })
})
