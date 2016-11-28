// callback hell example refactoring..

record.addEventListen('click', function () {
  var id = record.dataset.id;
  var endpoint = '/api/v1/records' + id;
  // imagine the http object
  http.get(endpoint, function(res) {
    record.innerHTML = res.data.view;
  });
});
