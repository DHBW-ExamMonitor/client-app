import * as Yup from 'yup';

export const createAndUpdateModulesFormValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Zu kurz!')
    .max(100, 'Zu lang!')
    .required('Erforderlich!'),
  vorlesungen: Yup.string()
    .min(5, 'Zu kurz!')
    .max(100, 'Zu lang!')
    .required('Erforderlich!'),
});

export default createAndUpdateModulesFormValidationSchema;
