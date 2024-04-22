const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Kittens', () => {
    describe('/GET kittens', () => {
        it('it should GET all the kittens', (done) => {
            chai.request(server)
                .get('/api/cards')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/POST kitten', () => {
        it('it should POST a kitten ', (done) => {
            let kitten = {
                name: "Test Kitten",
                age: 1
            }
            chai.request(server)
                .post('/api/cards')
                .send(kitten)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    //Delete block TBA
});