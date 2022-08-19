import * as Yup from 'yup';

export const createAndUpdatePruefungsterminFormValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Zu kurz!')
    .max(100, 'Zu lang!')
    .required('Erforderlich!'),
  hilfsmittel: Yup.string().min(5, 'Zu kurz!').max(100, 'Zu lang!'),
  raueme: Yup.string().min(5, 'Zu kurz!').max(100, 'Zu lang!'),
  aufsichtsPersonen: Yup.string().min(5, 'Zu kurz!').max(100, 'Zu lang!'),
  notizen: Yup.string().min(5, 'Zu kurz!').max(100, 'Zu lang!'),
  dateTime: Yup.string()
    .min(5, 'Zu kurz!')
    .max(100, 'Zu lang!')
    .required('Erforderlich!'),
  modul: Yup.string()
    .test({
      message: 'Wählen Sie ein Modul.',
      test: (arr) => {
        console.log(arr);
        return arr !== 'Auswählen...';
      },
    })
    .required('Erforderlich!'),
});

export default createAndUpdatePruefungsterminFormValidationSchema;
