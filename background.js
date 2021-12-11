/**
  Open certain website in singleton mode (only one tab instance is allowed)
  @author Leon Li <mail@omgxy.com>
  @version 1.0
 */

const host = 'www.omgxy.com'
const url = 'https://' + host + '/'
const patten = url + '*'

chrome.webNavigation.onBeforeNavigate.addListener((e) => {
  if (e.url.split('/')[2] == host) {
    chrome.tabs.query(
      { url: patten },
      (tabs) => {
        if (tabs.length > 1) {
          tabs.forEach((item, index) => tabs[index] = item.id)
          chrome.tabs.remove(tabs, () => {
            openTab(true)
          })
        }
      }
    )
  }
});

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
      chrome.tabs.query(
        { url: patten },
        (tabs) => {
          if (tabs.length == 0) {
            openTab(false)
          }
        }
      )
    }
  }
);

function openTab(active) {
  chrome.tabs.create({
    'index': 0,
    'active': active,
    'url': url
  })
}