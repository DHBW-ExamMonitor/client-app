import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'renderer/api/api';
import { getCourses } from 'renderer/api/courses';
import { createStudent, CreateStudentDto } from 'renderer/api/students';
import capitalize from 'renderer/capitalize';
import Button from 'renderer/components/Ui/Button';
import Dropdown from 'renderer/components/Ui/Dropdown';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import { StudentType } from 'renderer/types/student';
import createAndUpdateStudentFormValidationSchema from '../validation/createAndUpdateStudentFormValidationSchema';

export interface CreateStudentModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * AddStudentModal Component
 */
export const CreateStudentModal: React.FC<CreateStudentModalProps> = ({
  open,
  setOpen,
}) => {
  const { data } = useQuery('courses', getCourses);
  const { mutate, isLoading } = useMutation(
    (values: CreateStudentDto) => createStudent(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['students']);
      },
      onError: (err) => {
        // eslint-disable-next-line no-alert
        console.log(err);
      },
    }
  );
  return (
    <Modal open={open}>
      <Formik
        initialValues={{
          name: '',
          matrikelnummer: '',
          kursId: '',
          studentenStatus: StudentType.IMMATRIKULIERT.toString(),
        }}
        validationSchema={createAndUpdateStudentFormValidationSchema}
        onSubmit={(values) => {
          try {
            mutate(values);
            setOpen(false);
          } catch (error) {
            console.log(error);
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
                    {capitalize(status)}
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
            <Button loading={isLoading} type="submit">
              Erstellen
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default CreateStudentModal;
