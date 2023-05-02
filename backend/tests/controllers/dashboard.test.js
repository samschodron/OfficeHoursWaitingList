const request = require('supertest')
require('dotenv').config();

const token = process.env.AUTH_TOKEN_TEST
const baseUrl = `http://localhost:4000`

// 1) GET /dashboard/get-all-open-waiting-lists 

// tests that it retrieves all the user's created and active 
// waiting lists successfully
describe('GET all created and active waiting lists happy case', () => {
    let roomCode1, roomCode2;

    // create 2 new waiting lists
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

        roomCode1 = response.body['room_code']

        requestBody = JSON.stringify({
            teaching_assistant_first_name: 'Charmaine',
            teaching_assistant_last_name: 'Seah',
            waiting_room_name: 'comp sci 200'
        })

        response = await request(baseUrl)
            .post(`/waitingRoom/createWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        roomCode2 = response.body['room_code']
    })

    afterAll(async () => {
        let requestBody = JSON.stringify({
            room_code_pk: roomCode1
        })

        let response = await request(baseUrl)
            .post(`/waitingRoom/destroyWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        requestBody = JSON.stringify({
            room_code_pk: roomCode2
        })

        response = await request(baseUrl)
            .post(`/waitingRoom/destroyWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);
    })

    test('should return status code 200', async () => {
        const response = await request(baseUrl)
            .get('/dashboard/get-all-open-waiting-lists')
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })

        expect(response.statusCode).toBe(200);
    });

    test('should return a list containing the two newly created rooms', async () => {
        const response = await request(baseUrl)
            .get('/dashboard/get-all-open-waiting-lists ')
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })

        const data = response.body['query_result']
        let room1Exists = false;
        let room2Exists = false;

        for (let i = 0; i < data.length; i++) {
            let room = data[i];

            if (room['room_code_pk'] === roomCode1) {
                room1Exists = true;
            } else if (room['room_code_pk'] === roomCode2) {
                room2Exists = true;
            }
        }

        expect(room1Exists).toBe(true)
        expect(room2Exists).toBe(true)
    })
})

// 1) GET /dashboard/getAllJoinedWaitingRooms

// tests that it retrieves all the user's joined and active lists
describe('GET all joined and active waiting lists happy case', () => {
    let roomCode1, roomCode2, lastInsertedId1, lastInsertedId2;

    // create 2 new waiting lists
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

        roomCode1 = response.body['room_code']

        requestBody = JSON.stringify({
            teaching_assistant_first_name: 'Charmaine',
            teaching_assistant_last_name: 'Seah',
            waiting_room_name: 'comp sci 200'
        })

        response = await request(baseUrl)
            .post(`/waitingRoom/createWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        roomCode2 = response.body['room_code']

        // join room1
        requestBody = JSON.stringify({
            student_first_name: 'Jane',
            student_last_name: 'Doe',
            room_code: roomCode1
        })
        response = await request(baseUrl)
            .post('/student/joinWaitingRoom').set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        lastInsertedId1 = response.body['last_inserted_id']

        // join room2
        requestBody = JSON.stringify({
            student_first_name: 'John',
            student_last_name: 'Smith',
            room_code: roomCode2
        })
        response = await request(baseUrl)
            .post('/student/joinWaitingRoom').set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        lastInsertedId2 = response.body['last_inserted_id']
    })

    afterAll(async () => {
        let requestBody = JSON.stringify({
            room_code_pk: roomCode1
        })

        let response = await request(baseUrl)
            .post(`/waitingRoom/destroyWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);

        requestBody = JSON.stringify({
            room_code_pk: roomCode2
        })

        response = await request(baseUrl)
            .post(`/waitingRoom/destroyWaitingRoom`)
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })
            .send(requestBody);
    })

    test('should return status code 200', async () => {
        const response = await request(baseUrl)
            .get('/dashboard/getAllJoinedWaitingRooms')
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })

        expect(response.statusCode).toBe(200);
    });

    test('should return a list containing the two joined rooms', async () => {
        const response = await request(baseUrl)
            .get('/dashboard/getAllJoinedWaitingRooms')
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            })

        const data = response.body['query_result']
        let room1Exists = false;
        let room2Exists = false;

        for (let i = 0; i < data.length; i++) {
            let room = data[i];

            if (room['room_code_pk'] === roomCode1) {
                room1Exists = true;
            } else if (room['room_code_pk'] === roomCode2) {
                room2Exists = true;
            }
        }

        expect(room1Exists).toBe(true)
        expect(room2Exists).toBe(true)
    })
})

