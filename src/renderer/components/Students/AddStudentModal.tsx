import axios from 'axios';
import clsx from 'clsx';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import Button from '../Ui/Button';
import InputField from '../Ui/InputField';
import Modal from '../Ui/Modal';

type AddStudentModalFormProps = {
  name: string;
  matrikelnummer: string;
  kursId: string;
  studentenStatus: string;
};

const createStudent = async (values: AddStudentModalFormProps) => {
  const test = await axios.post('http://localhost:3000/studenten', {
    name: values.name,
    matrikelnummer: values.matrikelnummer,
    kursId: values.kursId,
    studentenStatus: values.studentenStatus,
  });
  const data = await test.data;
  return data;
};

export interface AddStudentModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * AddStudentModal Component
 */
export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  open,
  setOpen,
}) => {
  const { mutate } = useMutation(
    (values: AddStudentModalFormProps) => createStudent(values),
    {
      onError: (err: any) => {
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
          studentenStatus: 'IMMATRIKULIERT',
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
        <Form>
          <Field name="name">
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
          <div className="mt-2">
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>

            <Field
              as="select"
              name="service"
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

          <div className="mt-2">
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-700"
            >
              Kurs
            </label>

            <Field
              as="select"
              name="service"
              className={clsx(
                'border-gray-300',
                'mt-1 text-sm block font-medium w-full rounded-md text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500'
              )}
            >
              {['WWIBE119'].map((course) => (
                <option key={course} value={course}>
                  {course}
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

export default AddStudentModal;
