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
    text_to_list = text_to_list + "<li>" + item + "</li>";
  });
  return text_to_list;
}

function projectInfoTemplate(projObj) {
  var title = '<p class="info-data info-title">' + projObj.title + "</p>";

  var status = '<p class="info-data">' + projObj.status + " ";
  if (projObj.timeline.from == projObj.timeline.to) {
    status = status + projObj.timeline.from;
  } else {
    status = status + projObj.timeline.from + "-" + projObj.timeline.to;
  }
  status = status + "</p>";

  var description =
    '<p class="info-data">' + projObj.details.description + "</p>";

  var imp_entity =
    '<h4 class="info-data">Implementation Entities:</h4><ul>' +
    addList(projObj.implementationEntity) +
    "</ul>";

  var locations = '<h4 class="info-data info-loc">Locations:</h4><ul>';
  Object.entries(projObj.locations).forEach(([district, places]) => {
    if (places === undefined || places.length == 0) {
      return;
    } else {
      const districtName = districts_map[district] || district;

      locations = locations + "<h5>" + districtName + "</h5><ul>";
      places.forEach((p) => {
        locations = locations + "<li>" + p + "</li>";
      });
      locations = locations + "</ul>";
    }
  });
  locations = locations + "</ul>";

  var intended_beneficiaries =
    '<h4 class="info-data">Intended beneficiaries:</h4>' +
    '<p class="info-data">' +
    projObj.details.beneficiaries +
    "</p>";

  var societal_challenges =
    '<h4 class="info-data">Societal challenges addressed:</h4><ul>' +
    addList(projObj.details.societalChallenges) +
    "</ul>";
  var ecosystems_targeted =
    '<h4 class="info-data">Ecosystems targeted:</h4><ul>' +
    addList(projObj.details.ecosystemsTargeted) +
    "</ul>";

  var ecosystem_svcs_enhanced =
    '<h4 class="info-data">Ecosystem services enhanced:</h4>' +
    '<p class="info-data">' +
    projObj.details.servicesEnhanced +
    "</p>";

  var climate_risks =
    '<h4 class="info-data">Climate risks addressed:</h4>' +
    '<p class="info-data">' +
    projObj.details.climate_risks +
    "</p>";

  var biodiversity_risks =
    '<h4 class="info-data">Biodiversity risks addressed:</h4>' +
    '<p class="info-data">' +
    projObj.details.biodiversity_risks +
    "</p>";

  var references = '<h4 class="info-data">Reference(s):</h4><ul>';
  projObj.details.references.forEach((r) => {
    references =
      references + '<li><a href="' + r + '" target="_blank">' + r + "</a></li>";
  });
  references = references + "</ul>";

  var html =
    title +
    status +
    description +
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
