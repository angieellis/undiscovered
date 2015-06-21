var assert = require('assert');

// describe('homepage', function(){
//   it('should respond to GET',function(){
//     superagent
//       .get('http://localhost:'+port)
//       .end(function(res){
//         expect(res.status).to.equal(200);
//     })
//   })

// describe('homepage', function(){
//   it('should respond to GET',function(done){
//     superagent
//       .get('http://localhost:'+port)
//       .end(function(res){
//         expect(res.status).to.equal(200);
//         done();
//     })
//   })

describe('String#split', function(){
  it('should return an array', function(){
    assert(Array.isArray('a,b,c'.split(',')));
  });
})
