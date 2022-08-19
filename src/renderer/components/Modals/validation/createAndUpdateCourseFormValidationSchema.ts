import * as Yup from 'yup';

export const createAndUpdateCourseFormValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Zu kurz!')
    .max(25, 'Zu lang!')
    .required('Erforderlich!'),
  jahrgang: Yup.number()
    .min(1000, 'Zu niedrig!')
    .max(9999, 'Zu hoch!')
    .required('Erforderlich!'),
});

export default createAndUpdateCourseFormValidationSchema;
