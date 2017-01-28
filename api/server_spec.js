var request = require('supertest');

describe('Post api/devices/distribution', function() {
  var server;
  beforeEach(function () {
    delete require.cache[require.resolve('./server')];
    server = require('./server');
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('Should return', function(done) {
    var base_url = '/api/devices/distribution?'
    var service_id = "TestServiceId"
    var action = "TestActionService";
    var person_id = 'testPersonId';
    request(server).post(base_url+'serviceid='+service_id+'action='+action+'personid='+person_id).send({"data":"somedata"}).expect(function(res) {
      res.body = {"data":"somedata"}
    })
    .end(function(err, result) {
      assert.equal(result.body.foo, 'Bar');
      done();
    });
    // .expect(200, {
    //   serviceid: service_id,
    //   action: action,
    //   person_id: person_id
    // }, done);
  });
});
// 	var service_id = req.query.serviceid || 'no-input';
// 	var action = req.query.action || 'no-input';
// 	var person_id = req.query.personid || 'no-input';

// http://localhost:8082/api/devices/distribution?serviceid=4&action=sdfa3&personid=test
//
// app.post('/api/devices/distribution', function (req, res) {
// 	console.log(req.body)
// 	var service_id = req.query.serviceid || 'no-input';
// 	var action = req.query.action || 'no-input';
// 	var person_id = req.query.personid || 'no-input';
// 	res.status(200).send("Test Response :" + service_id + ' ' + action + '' + person_id);
// });
//
//
// // Action
//
// app.post('/api/devices/action', function (req, res) {
// 	  var service_id = req.query.serviceid;
// 		var action = req.query.action;
// 		var person_id = req.query.personid;
// 		res.status(200).send("Test Response :" + service_id + ' ' + action + '' + person_id);
// });
