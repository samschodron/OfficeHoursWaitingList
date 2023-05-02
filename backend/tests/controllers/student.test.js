const request = require('supertest')
require('dotenv').config();

const token = process.env.AUTH_TOKEN_TEST
const baseUrl = `http://localhost:4000`

// 1) POST /student/joinWaitingRoom

// tests that a student is able to join a waiting list successfully
describe('POST student joins a waitlist happy case', () => {
    let roomCode;

    // create a new waiting list
    beforeAll(async () => {
        let requestBody = JSON.stringify({
            teaching_assistant_first_name: 'Charmaine',
            teaching_assistant_last_name: 'Seah',
            waiting_room_name: 'comp sci 506'
        })

        const response = await request(baseUrl)
            .post(`/waitingRoom/createWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        roomCode = response.body['room_code']
    })

    test('should return status code 200', async () => {
        requestBody = JSON.stringify({
            student_first_name: 'Jane',
            student_last_name: 'Doe',
            room_code: roomCode
        })

        const response = await request(baseUrl)
            .post('/student/joinWaitingRoom').set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        expect(response.statusCode).toBe(200);
    });

    test('should return a list of students of length 1', async () => {
        const response = await request(baseUrl)
            .get(`/waitingRoom/getAllStudentsInWaitingRoom/?roomCode=${roomCode}`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            });

        const data = response.body['query_result']
        expect(data.length === 1).toBe(true)
    })
})

// tests that an error is thrown when trying to join a list that does not exist
describe('POST student is unable to join a waiting list that does not exist', () => {
    const roomCode = '12345'

    test('should return status code 404', async () => {
        requestBody = JSON.stringify({
            student_first_name: 'Jane',
            student_last_name: 'Doe',
            room_code: roomCode
        })

        const response = await request(baseUrl)
            .post('/student/joinWaitingRoom').set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        expect(response.statusCode).toBe(404);
    });
})

// 2) POST /student/leaveWaitingRoom

// tests that a student is able to leave a waiting list successfully
describe('POST student leaves a waitlist happy case', () => {
    let roomCode, lastInsertedId;

    // create a new waiting list
    beforeAll(async () => {
        let requestBody = JSON.stringify({
            teaching_assistant_first_name: 'Charmaine',
            teaching_assistant_last_name: 'Seah',
            waiting_room_name: 'comp sci 506'
        })

        let response = await request(baseUrl)
            .post(`/waitingRoom/createWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        roomCode = response.body['room_code']

        // add student to the newly created list
        requestBody = JSON.stringify({
            student_first_name: 'Jane',
            student_last_name: 'Doe',
            room_code: roomCode
        })
        response = await request(baseUrl)
            .post('/student/joinWaitingRoom').set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        lastInsertedId = response.body['last_inserted_id']
    })

    test('should return status code 200', async () => {
        requestBody = JSON.stringify({
            studentID_pk: lastInsertedId
        })

        const response = await request(baseUrl)
            .post('/student/leaveWaitingRoom').set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        expect(response.statusCode).toBe(200);
    });

    test('should return a list of students of length 0 after student has left the waiting list', async () => {
        const response = await request(baseUrl)
            .get(`/waitingRoom/getAllStudentsInWaitingRoom/?roomCode=${roomCode}`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            });

        const data = response.body['query_result']
        expect(data.length === 0).toBe(true)
    })
})

// 3) GET /student/studentFind

// tests that a student's position in the queue is returned correctly
// we will be a student into the list

describe('GET student position in the queue happy case', () => {
    let roomCode, lastInsertedId;

    // create a new waiting list and add a student to the list
    beforeAll(async () => {
        let requestBody = JSON.stringify({
            teaching_assistant_first_name: 'Charmaine',
            teaching_assistant_last_name: 'Seah',
            waiting_room_name: 'comp sci 506'
        })

        let response = await request(baseUrl)
            .post(`/waitingRoom/createWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        roomCode = response.body['room_code']

        // add student to the newly created list
        requestBody = JSON.stringify({
            student_first_name: 'Jane',
            student_last_name: 'Doe',
            room_code: roomCode
        })
        response = await request(baseUrl)
            .post('/student/joinWaitingRoom')
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        lastInsertedId = response.body['last_inserted_id']
    })

    test('should return status code 200', async () => {
        requestBody = JSON.stringify({
            studentID_pk: lastInsertedId,
            room_code_pk: roomCode
        })

        const response = await request(baseUrl)
            .post('/student/studentFind')
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        expect(response.statusCode).toBe(200);
    });

    test('should return the student position which is 1st', async () => {
        const response = await request(baseUrl)
            .post(`/student/studentFind`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        const studentPosition = response.body.message
        expect(studentPosition).toBe(1)
    })
})