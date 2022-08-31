import * as Yup from 'yup';

export const createAndUpdateStudentFormValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Zu kurz!')
    .max(50, 'Zu lang!')
    .required('Erforderlich!'),
  matrikelnummer: Yup.string()
    .min(5, 'Zu kurz!')
    .max(10, 'Zu lang!')
    .required('Erforderlich!'),
  kursId: Yup.string()
    .test({
      message: 'Wählen Sie einen Kurs.',
      test: (arr) => {
        return arr !== 'Auswählen...';
      },
    })
    .required('Erforderlich!'),
  studentenStatus: Yup.string().required('Erforderlich!'),
});

export default createAndUpdateStudentFormValidationSchema;
