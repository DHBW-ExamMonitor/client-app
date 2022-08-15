import axios from 'axios';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';

type CreateCourseModalFormProps = {
  name: string;
};

const createCourse = async (values: CreateCourseModalFormProps) => {
  const course = await axios.post('http://localhost:3000/kurse', {
    name: values.name,
  });
  const data = await course.data;
  return data;
};

export interface AddCourseModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * AddStudentModal Component
 */
export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  open,
  setOpen,
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (values: CreateCourseModalFormProps) => createCourse(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('courses');
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <Modal open={open} setOpen={setOpen}>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={async (values) => {
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
                label="Name"
                type="text"
                placeholder="Name"
              />
            )}
          </Field>

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

export default AddCourseModal;
