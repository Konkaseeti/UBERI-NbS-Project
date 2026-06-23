const districts_map = {
  corozal: "Corozal",
  orangeWalk: "Orange Walk",
  belize: "Belize",
  cayo: "Cayo",
  stannCreek: "Stann Creek",
  toledo: "Toledo",
};

function checkRemoveElementById(id) {
  const checkRemove = document.getElementById(id);
  if (checkRemove) {
    checkRemove.remove();
  }
}

function addList(objectList) {
  var text_to_list = "";
  objectList.forEach((item) => {
    formatted_item =
      String(item).charAt(0).toLocaleUpperCase() + String(item).slice(1);
    text_to_list = text_to_list + "<li>" + formatted_item + "</li>";
  });
  return text_to_list;
}

function replaceNewLine(text) {
  if (!text) return "Error: Missing text.";
  cleaned_text = String(text)
    .trim()
    .replace(/\*new_line\*$/, "");
  return String(cleaned_text).replaceAll("*new_line*", "<br><br>");
}
function projectInfoTemplate(projObj) {
  var title =
    '<div class="info-data info-title"><strong>' +
    projObj.title +
    "</strong></div>";

  var status = '<p class="info-data">' + projObj.status + " ";
  if (projObj.timeline.from == projObj.timeline.to) {
    status = status + projObj.timeline.from;
  } else {
    status = status + projObj.timeline.from + "-" + projObj.timeline.to;
  }
  status = status + "</p>";

  var description =
    '<p class="info-data">' +
    replaceNewLine(projObj.details.description) +
    "</p>";

  var funder = "";
  if (
    projObj.details.funder &&
    projObj.details.funder.length > 0 &&
    projObj.details.funder[0].trim() !== ""
  ) {
    funder =
      '<strong class="info-data">Who funded this project?:</strong>' +
      '<p class="info-data">' +
      (projObj.details.funder ? projObj.details.funder : "undefined") +
      "</p>";
  }

  var lead_implementation_entity =
    '<strong class="info-data">Lead Implementation Entity:</strong>' +
    '<p class="info-data">' +
    (projObj.lead_entity ? projObj.lead_entity : "undefined") +
    "</p>";

  var imp_entity = "";
  if (
    projObj.implementationEntity &&
    projObj.implementationEntity.length > 0 &&
    projObj.implementationEntity[0].trim() !== ""
  ) {
    imp_entity =
      '<strong class="info-data">Implementation Entities:</strong><ul>' +
      addList(projObj.implementationEntity) +
      "</ul>";
  }

  var locations = '<strong class="info-data info-loc">Locations:</strong><ul>';
  Object.entries(projObj.locations).forEach(([district, places]) => {
    if (places === undefined || places.length == 0) {
      return;
    } else {
      const districtName = districts_map[district] || district;

      locations =
        locations + "<strong>" + districtName + " District </strong><ul>";
      places.forEach((p) => {
        locations = locations + "<li>" + p + "</li>";
      });
      locations = locations + "</ul>";
    }
  });
  locations = locations + "</ul>";

  var intended_beneficiaries =
    '<strong class="info-data">Intended beneficiaries:</strong>' +
    '<p class="info-data">' +
    replaceNewLine(projObj.details.beneficiaries) +
    "</p>";

  var societal_challenges =
    '<strong class="info-data">Societal challenges addressed:</strong><ul>' +
    addList(projObj.details.societalChallenges) +
    "</ul>";
  var ecosystems_targeted =
    '<strong class="info-data">Ecosystems targeted:</strong><ul>' +
    addList(projObj.details.ecosystemsTargeted) +
    "</ul>";

  var ecosystem_svcs_enhanced =
    '<strong class="info-data">Ecosystem services enhanced:</strong>' +
    '<p class="info-data">' +
    replaceNewLine(projObj.details.servicesEnhanced) +
    "</p>";

  var climate_risks =
    '<strong class="info-data">Climate risks addressed:</strong>' +
    '<p class="info-data">' +
    replaceNewLine(projObj.details.climate_risks) +
    "</p>";

  var biodiversity_risks =
    '<strong class="info-data">Biodiversity risks addressed:</strong>' +
    '<p class="info-data">' +
    replaceNewLine(projObj.details.biodiversity_risks) +
    "</p>";

  var references = '<strong class="info-data">Resources:</strong><ul>';
  projObj.details.references.forEach((r) => {
    if (String(r).includes("https")) {
      references =
        references +
        '<li><a href="' +
        r +
        '" target="_blank">' +
        r +
        "</a></li>";
    } else if (String(r).includes("www.") && !String(r).includes("https")) {
      references =
        references +
        '<li><a href="https://' +
        r +
        '" target="_blank">' +
        r +
        "</a></li>";
    } else {
      references = references + "<li><p" + r + ">" + r + "</p></li>";
    }
  });
  references = references + "</ul>";

  var html =
    title +
    status +
    description +
    funder +
    lead_implementation_entity +
    imp_entity +
    locations +
    intended_beneficiaries +
    societal_challenges +
    ecosystems_targeted +
    ecosystem_svcs_enhanced +
    climate_risks +
    biodiversity_risks +
    references;

  return html;
}
