const EMAIL_ADDRESS = "blablabla@gmail.com";


function fetchChromeUpdates(emailAddress) {
  var feedUrl = "https://cloud.google.com/feeds/google-cloud-security-bulletins.xml";
  var response = UrlFetchApp.fetch(feedUrl);
  var xml = XmlService.parse(response.getContentText());
  var entries = xml.getRootElement().getChildren("entry", XmlService.getNamespace("http://www.w3.org/2005/Atom"));
  
  if (entries.length > 0) {
    var latestUpdate = entries[0];
    var title = latestUpdate.getChild("title", XmlService.getNamespace("http://www.w3.org/2005/Atom")).getText();
    var link = latestUpdate.getChild("link", XmlService.getNamespace("http://www.w3.org/2005/Atom")).getAttribute("href").getValue();
    var updated = latestUpdate.getChild("updated", XmlService.getNamespace("http://www.w3.org/2005/Atom")).getText();
    
    var updatedDate = new Date(updated);
    var currentDate = new Date();
    var timeDifference = currentDate.getTime() - updatedDate.getTime();
    var daysDifference = timeDifference / (1000 * 3600 * 24);
    
    if (daysDifference <= 2) {
      var fullTitle = title + " (Updated: " + updatedDate + ")";
      
      Logger.log("Latest Chrome Update: " + fullTitle);
      
      var lastChecked = PropertiesService.getScriptProperties().getProperty("lastTitle");
      if (fullTitle !== lastChecked) {
        MailApp.sendEmail({
          to: emailAddress,
          subject: "New Chrome Update Released! " + updatedDate,
          body: "Google Chrome has a new update: " + fullTitle + "\nCheck it out: " + link
        });
        PropertiesService.getScriptProperties().setProperty("lastTitle", fullTitle);
      }
    }
  }
}

// Example usage
fetchChromeUpdates(EMAIL_ADDRESS);

function fetchGooglePatchUpdates(emailAddress) {
  var feedUrl = "https://cloud.google.com/feeds/google-cloud-security-bulletins.xml";
  var response = UrlFetchApp.fetch(feedUrl);
  var xml = XmlService.parse(response.getContentText());
  var entries = xml.getRootElement().getChildren("entry", XmlService.getNamespace("http://www.w3.org/2005/Atom"));
  
  if (entries.length > 0) {
    var latestUpdate = entries[0];
    var title = latestUpdate.getChild("title", XmlService.getNamespace("http://www.w3.org/2005/Atom")).getText();
    var link = latestUpdate.getChild("link", XmlService.getNamespace("http://www.w3.org/2005/Atom")).getAttribute("href").getValue();
    var updated = latestUpdate.getChild("updated", XmlService.getNamespace("http://www.w3.org/2005/Atom")).getText();
    
    var updatedDate = new Date(updated);
    var currentDate = new Date();
    var timeDifference = currentDate.getTime() - updatedDate.getTime();
    var daysDifference = timeDifference / (1000 * 3600 * 24);
    
    if (daysDifference <= 2) {
      var fullTitle = title + " (Updated: " + updatedDate + ")";
      
      Logger.log("Latest Chrome Update: " + fullTitle);
      
      var lastChecked = PropertiesService.getScriptProperties().getProperty("lastTitle");
      if (fullTitle !== lastChecked) {
        MailApp.sendEmail({
          to: emailAddress,
          subject: "New Google Security Pacth Released! " + updatedDate,
          body: "Google Cloud has a new security patch release: " + fullTitle + "\nCheck it out: " + link + "\n\n Updated:\n" + updatedDate
        });
        PropertiesService.getScriptProperties().setProperty("lastTitle", fullTitle);
      }
    }
  }
}

// Example usage
fetchGooglePatchUpdates(EMAIL_ADDRESS);
