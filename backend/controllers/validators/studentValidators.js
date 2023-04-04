import * as yup from 'yup';

export const joinWaitingRoomSchema = yup
    .object({
        student_first_name: yup.string().trim().required(),
        student_last_name: yup.string().trim().required(),
        room_code: yup.string().trim().required()
    })
    .required();

export const leaveWaitingRoomSchema = yup
    .object({
        teaching_assistant_first_name: yup.string().trim().required(),
        teaching_assistant_last_name: yup.string().trim().required()
    })
    .required();