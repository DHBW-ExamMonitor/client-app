import clsx from 'clsx';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getCourses } from 'renderer/api/courses';
import { createStudent, CreateStudentDto } from 'renderer/api/students';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import { StudentType } from 'renderer/types/student';

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
  const { mutate } = useMutation(
    (values: CreateStudentDto) => createStudent(values),
    {
      onError: (err) => {
        // eslint-disable-next-line no-alert
        console.log(err);
      },
    }
  );
  return (
    <Modal open={open} setOpen={setOpen}>
      <Formik
        initialValues={{
          name: '',
          matrikelnummer: '',
          kursId: '',
          studentenStatus: StudentType.IMMATRIKULIERT,
        }}
        onSubmit={(values) => {
          console.log(values);
          try {
            mutate(values);
          } catch (error) {
            console.log(error);
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

          <div>
            <label
              htmlFor="studentenStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>

            <Field
              as="select"
              name="studentenStatus"
              className={clsx(
                'border-gray-300',
                'mt-1 text-sm block font-medium w-full rounded-md text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500'
              )}
            >
              {['IMMATRIKULIERT', 'EXMATRIKULIERT'].map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </Field>
          </div>

          <div>
            <label
              htmlFor="kursId"
              className="block text-sm font-medium text-gray-700"
            >
              Kurs
            </label>

            <Field
              as="select"
              name="kursId"
              className={clsx(
                'border-gray-300',
                'mt-1 text-sm block font-medium w-full rounded-md text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500'
              )}
            >
              <option>Auswählen...</option>
              {data?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </Field>
          </div>

          <div className="flex mt-4 justify-end">
            <Button className="mr-2" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button type="submit">Erstellen</Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default CreateStudentModal;
