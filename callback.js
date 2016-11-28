// callback hell example refactoring..

// 1.
record.addEventListen('click', function () {
  var id = record.dataset.id;
  var endpoint = '/api/v1/records' + id;

  http.get(endpoint, function(res) {
    record.innerHTML = res.data.view;
  });
});

// 2.
function attach(node, status, done) {
  node.addEventListener('click', function() {
    var id = node.dataset.id;
    var endpoint = '/api/v1/records' + id;

    http.get(endpoint, function (res) {
      node.innerHTML = res.data.view;
      reportStatus(res.status, function() {
        done(res);
      });
    });

    function reportStatus(status, then) {
      status.innerHTML = 'Status: ' + status;
      then();
    }
  });
}

attach(record, status, function(res) {
  console.log(res);
});

// 2.1 names anonymous function, removes synchronus callback
function attach(node, status, done) {
  node.addEventListener('click', function handler() {
    var id = node.dataset.id;
    var endpoint = 'api/v1/records/' + id;

    htt.get(endpoint, function ajax(res) {
      node.innerHTML = res.data.view;
      reportStatus(res.status);
      done(res);
    });

    function reportStatus(code) {
      status.innerHTML = res.data.view;
      reportStatus(res.status);
      done(res);
    }
  });
}

attach(record, status, function(res) {
  console.log(res);
});

// 3
function attach(node, status, done) {
  function handler() {
    var id = node.dataset.id;
    var endpoint = '/api/v1/records/' + id;

    http.get(endpoint, updateView);
  }

  function updateView(res) {
    node.innerHTML = res.data.view;
    status.innerHTML = 'Status: ' + res.status;
    done(res);
  }
  node.addEventListener('click', handler);
}

attach(record, status, function done(res) {
  console.log(res);
});
