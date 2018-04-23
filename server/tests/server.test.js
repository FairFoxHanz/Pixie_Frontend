const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");
const sinon = require("sinon");

const app = require("../server");
const { Event } = require("../models/event");
// new Event({
//   name,
//   place,
//   eventDate: Date.parse(date),
//   inventory,
//   _user: req.user.id
// });
// const todos = [
//   {
//     _id: new ObjectID(),
//     name,
//     place,
//     eventDate: Date.parse(),
//     inventory,
//     _user: "xxx"
//   }
// ];

// beforeEach(done => {
//   Todo.remove({})
//     .then(() => {
//       return Todo.insertMany(todos);
//     })
//     .then(() => done());
// });

describe("POST /api/events/create", () => {
  //   beforeEach(function() {
  //     const auth = require("../middlewares/require_login");
  //     sinon.stub(auth, "requireLogin").callsFake(function(req, res, next) {
  //       return next();
  //     });
  //   });
  it("should return 401 if user not authorized", done => {
    console.log(app);
    request(app)
      .post("/api/events/create")
      .send({})
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
