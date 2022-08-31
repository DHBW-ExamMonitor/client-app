import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'renderer/api/api';
import { getCourses } from 'renderer/api/courses';
import { updateStudent } from 'renderer/api/students';
import Button from 'renderer/components/Ui/Button';
import Dropdown from 'renderer/components/Ui/Dropdown';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import { Student, StudentType } from 'renderer/types/student';
import createAndUpdateStudentFormValidationSchema from '../validation/createAndUpdateStudentFormValidationSchema';

export interface UpdateStudentModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  student: Student;
}

/**
 * AddStudentModal Component
 */
export const UpdateStudentModal: React.FC<UpdateStudentModalProps> = ({
  open,
  setOpen,
  student,
}) => {
  const { data } = useQuery('courses', getCourses);
  const { mutate } = useMutation((values: Student) => updateStudent(values), {
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    },
    onError: (err) => {
      // eslint-disable-next-line no-alert
      console.log(err);
    },
  });
  return (
    <Modal open={open}>
      <Formik
        initialValues={{
          name: student.name ?? '',
          matrikelnummer: student.matrikelnummer ?? '',
          kursId: student.kursId ?? '',
          studentenStatus:
            student.studentenStatus ?? StudentType.IMMATRIKULIERT.toString(),
        }}
        validationSchema={createAndUpdateStudentFormValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          try {
            mutate({
              id: student.id,
              ...values,
            });
            toast.success(`Student "${values.name}" erfolgreich bearbeitet.`);
          } catch (error) {
            console.log(error);
            toast.error(
              `Fehler beim Bearbeiten des Studierenden "${values.name}".`
            );
          } finally {
            setOpen(false);
          }
        }}
      >
        <Form className="space-y-6">
          <Field name="name">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Name"
                type="text"
                placeholder="Name"
              />
            )}
          </Field>

          <Field name="matrikelnummer">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Matrikelnummer"
                type="text"
                placeholder="Matrikelnummer"
              />
            )}
          </Field>

          <Field name="studentenStatus">
            {({ field, meta }: FieldProps) => (
              <Dropdown field={field} meta={meta} label="Status">
                {['IMMATRIKULIERT', 'EXMATRIKULIERT'].map((status) => (
                  <option key={status} value={status}>
                    {status.toLowerCase()}
                  </option>
                ))}
              </Dropdown>
            )}
          </Field>

          <Field name="kursId">
            {({ field, meta }: FieldProps) => (
              <Dropdown field={field} meta={meta} label="Kurs">
                <option>Auswählen...</option>
                {data?.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Dropdown>
            )}
          </Field>

          <div className="flex mt-4 justify-end">
            <Button
              type="button"
              className="mr-2"
              secondary
              onClick={() => setOpen(false)}
            >
              Abbrechen
            </Button>
            <Button type="submit">Aktualisieren</Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default UpdateStudentModal;
