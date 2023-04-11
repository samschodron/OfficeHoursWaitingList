import * as yup from 'yup';

export const createWaitingRoomSchema = yup
    .object({
        teaching_assistant_first_name: yup.string().trim().required(),
        teaching_assistant_last_name: yup.string().trim().required(),
        waiting_room_name: yup.string().trim().required()
    })
    .required();
    
    export const destroyWaitingRoomSchema = yup
    .object({
        waiting_room_name: yup.string().trim().required(),
        room_code_pk: yup.string().trim().required()
    })
    .required();