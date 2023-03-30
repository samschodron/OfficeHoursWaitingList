import * as yup from 'yup';

export const joinWaitingRoomSchema = yup
    .object({
        student_first_name: yup.string().trim().required(),
        student_last_name: yup.string().trim().required(),
        time_entered: yup.string().trim().required(),
        time_left: yup.string().trim().required(),
        room_ID: yup.string().trim().required(),
        is_waiting: yup.string().trim().required()
    })
    .required();

export const leaveWaitingRoomSchema = yup
    .object({
        teaching_assistant_first_name: yup.string().trim().required(),
        teaching_assistant_last_name: yup.string().trim().required()
    })
    .required();