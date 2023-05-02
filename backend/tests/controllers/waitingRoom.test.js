const request = require('supertest')
require('dotenv').config();

const token = process.env.AUTH_TOKEN_TEST
const baseUrl = `http://localhost:4000`

// 1) POST /waitingRoom/createWaitingRoom

// tests that it correctly creates a new waiting list
describe('POST create a new waiting list happy case', () => {
    let roomCode;

    afterEach(async () => {
        const requestBody = JSON.stringify({
            room_code_pk: roomCode
        })

        const response = await request(baseUrl)
            .post(`/waitingRoom/destroyWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);
    })

    const requestBody = JSON.stringify({
        teaching_assistant_first_name: 'Charmaine',
        teaching_assistant_last_name: 'Seah',
        waiting_room_name: 'comp sci 506'
    })

    test('should return status code 200', async () => {
        const response = await request(baseUrl)
            .post(`/waitingRoom/createWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        roomCode = response.body['room_code']
        expect(response.statusCode).toBe(200);
    })

    test('should return first name, last name, and room name successfully', async () => {
        const response = await request(baseUrl)
            .post(`/waitingRoom/createWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        const data = response.body.data
        const firstName = data['teaching_assistant_first_name']
        const lastName = data['teaching_assistant_last_name']
        const roomName = data['waiting_room_name']
        roomCode = response.body['room_code']

        expect(firstName).toMatch('Charmaine');
        expect(lastName).toMatch('Seah');
        expect(roomName).toMatch('comp sci 506');
    })
})

// 2) GET /waitingRoom/getAllStudentsInWaitingRoom/?roomCode=${roomCode} 

// test that it correctly retrieves all students in a waiting list given the room code
describe('GET all students in a waiting list given a room code happy case', () => {
    let roomCode;

    beforeAll(async () => {
        // create a new waiting list

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

        // add student to the newly created list
        requestBody = JSON.stringify({
            student_first_name: 'Jane',
            student_last_name: 'Doe',
            room_code: roomCode
        })
        await request(baseUrl)
            .post('/student/joinWaitingRoom').set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);
    })

    afterAll(async () => {
        const requestBody = JSON.stringify({
            room_code_pk: roomCode
        })

        const response = await request(baseUrl)
            .post(`/waitingRoom/destroyWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);
    })

    test('should return status code 200', async () => {
        const response = await request(baseUrl)
            .get(`/waitingRoom/getAllStudentsInWaitingRoom/?roomCode=${roomCode}`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            });

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

// test that it correctly throws an error when no room code is provided
describe('GET all students in a waiting list when no room code is provided', () => {
    test('should return status code 422', async () => {
        const response = await request(baseUrl)
            .get(`/waitingRoom/getAllStudentsInWaitingRoom/`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            });

        expect(response.statusCode).toBe(422);
    })
})

// 3) POST /waitingRoom/destroyWaitingRoom

// tests that it correctly deletes a waiting list given the room code
describe('POST delete a waiting list happy case', () => {
    let roomCode;

    // create a new waiting list
    beforeAll(async () => {
        const requestBody = JSON.stringify({
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
        const requestBody = JSON.stringify({
            room_code_pk: roomCode
        })

        const response = await request(baseUrl)
            .post(`/waitingRoom/destroyWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        expect(response.statusCode).toBe(200);
    })
})