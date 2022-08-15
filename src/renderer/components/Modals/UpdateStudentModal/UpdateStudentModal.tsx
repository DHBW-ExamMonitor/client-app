import clsx from 'clsx';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'renderer/api/api';
import { getCourses } from 'renderer/api/courses';
import { updateStudent } from 'renderer/api/students';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import { Student, StudentType } from 'renderer/types/student';

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
        onSubmit={(values) => {
          console.log(values);
          try {
            mutate({
              id: student.id,
              ...values,
            });
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

export default UpdateStudentModal;
