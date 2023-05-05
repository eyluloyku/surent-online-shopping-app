import request from "supertest";
//import { chai, expect } from "chai";
import chai from "chai";
import chaiSorted from 'chai-sorted';
const expect = chai.expect;

import app from './server.js';
import cors from "cors";

chai.use(chaiSorted);

await sleep(1000)
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


describe('GET /getAll', function() {
    it('List all products', function(done) {
        request(app)
            .get('/api/products/getAll')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });
});

describe('GET /getReview', function() {
    it('List all reviews of a product', function(done) {
        request(app)
            .get('/api/products/getReview/644fecbb22d8786395295149')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.property("reviews");
                expect(response.body.reviews).to.be.an("array");
                done();
            });
    });
});

describe('GET /prodID', function() {
    it('Get single, specific product by ID', function(done) {
        request(app)
            .get('/api/products/prodID/644fecbb22d8786395295149')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.all.keys('_id', 'Pname', 'price', 'stock', 'Discount_rate', 'Distribution_inf',
                        '__v', 'category', 'createdAt', 'description', 'images', 'numOfReviews', 'rating', 'reviews', 'updatedAt', 'variants', 
                            'warranty');
                done();
            });
    });
});

describe('GET /prodID', function() {
    it('Get single, specific product by ID', function(done) {
        request(app)
            .get('/api/products/prodID/64510ef54ac4b97f0f4ab1d9')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.all.keys('_id', 'Pname', 'price', 'stock', 'Discount_rate', 'Distribution_inf',
                        '__v', 'category', 'createdAt', 'description', 'images', 'numOfReviews', 'rating', 'reviews', 'updatedAt', 'variants', 
                            'warranty');
                done();
            });
    });
});

describe('GET /category', function() {
    it('Get products by category', function(done) {
        request(app)
            .get('/api/products/prodCategory/dress')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });
});

describe('GET /category', function() {
    it('Get products by category', function(done) {
        request(app)
            .get('/api/products/prodCategory/bag')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });
});

describe('POST /add', function() {
    it('Add a new product', function(done) {

        let product = {
            Pname:"test_product",
            price:210,
            stock:50,
            variants:"test",
            description:"Introducing the test product",
            warranty: 30,
            Distribution_inf: "SUrent",
            Discount_rate: 25,
            category: "urban"
        };

        request(app)
            .post('/api/products/add')
            .send(product)
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.all.keys('_id', 'Pname', 'price', 'stock', 'Discount_rate', 'Distribution_inf',
                        '__v', 'category', 'createdAt', 'description', 'images', 'numOfReviews', 'rating', 'reviews', 'updatedAt', 'variants', 
                            'warranty');
                done();
            });
    });
});

describe('GET / user details', function() {
    it('Get user details without token ', function(done) {
        request(app)
            .get('/api/users/details')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(403);
                done();
            });
    });
});

describe('POST / post review', function() {
    it('Post a product review without token ', function(done) {
        request(app)
            .post('/api/products/postReview/644fecbb22d8786395295149')
            .send({})
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(403);
                done();
            });
    });
});

/*
describe('DELETE / prodID', function() {
    it('Delete the product with given id', function(done) {
        request(app)
            .delete('/api/rem/6453018f6a73a154ff729465') //CHANGE ID!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                done();
            });
    });
});
*/

describe('GET / products sorted by price', function() {
    it('Get products in descending order with respect to price ', function(done) {
        request(app)
            .get('/api/products/sort/price')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.sortedBy("price", {descending: true});
                done();
            });
    });
});

describe('GET / products sorted by rating', function() {
    it('Get products in descending order with respect to rating ', function(done) {
        request(app)
            .get('/api/products/sort/rating')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.sortedBy("rating", {descending: true});
                done();
            });
    });
});

describe('GET / orders by user ID - user without orders', function() {
    it('Get orders of a user with given ID - no such order in this case ', function(done) {
        request(app)
            .get('/api/orders/getOrders/642c93dac1cabc1f427bca40') //USER WITHOUT ORDER!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(404);
                done();
            });
    });
});

describe('GET / orders by user ID - user without orders', function() {
    it('Get orders of a user with given ID - no such order in this case ', function(done) {
        request(app)
            .get('/api/orders/getOrders/642c93dac1cabc1f427bca40') //USER WITHOUT ORDER!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(404);
                done();
            });
    });
});

describe('GET / orders by user ID - no such user', function() {
    it('Get orders of a user with given ID - no such user in this case ', function(done) {
        request(app)
            .get('/api/orders/getOrders/642c93dac1cabc1f427acb04') //NO SUCH USER!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(404);
                done();
            });
    });
});

/*
describe('GET / orders by user ID', function() {
    it('Get orders of a user with given ID', function(done) {
        request(app)
            .get('/api/orders/getOrders/') //PUT SOME VALID ID WITH ORDERS!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });
});
*/

describe('POST /login ', function() {
    it('Login', function(done) {

        let login = {
            email: "eylul2@test.com",
            password: "Aa12345,"
        };

        request(app)
            .post('/api/logIn')
            .send(login)
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.all.keys('accessToken', 'refreshToken', 'userId', 'error', 'message');
                done();
            });
    });
});

describe('GET / carts by user ID', function() {
    it('Get carts of a user with given ID', function(done) {
        request(app)
            .get('/api/carts', cors(),
                    {headers:{userId:"644eb19068c98d2d1b8672e9"}}) //PUT SOME VALID ID WITH ORDERS!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                done();
            });
    });
});

