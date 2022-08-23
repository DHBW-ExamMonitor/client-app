import { format } from 'date-fns';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createCourse, CreateCourseDto } from 'renderer/api/courses';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import createAndUpdateCourseFormValidationSchema from '../validation/createAndUpdateCourseFormValidationSchema';

export interface AddCourseModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * CreateCourseModal Component
 */
export const CreateCourseModal: React.FC<AddCourseModalProps> = ({
  open,
  setOpen,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (values: CreateCourseDto) => createCourse(values),
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
    <Modal open={open}>
      <Formik
        initialValues={{
          name: '',
          studienende: format(new Date(Date.now()), 'yyyy-MM-dd'),
        }}
        validationSchema={createAndUpdateCourseFormValidationSchema}
        onSubmit={async (values) => {
          console.log(values);
          try {
            mutate({
              name: values.name,
              studienende: new Date(values.studienende),
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

          <Field name="studienende">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Studienende"
                type="date"
                placeholder="Studienende"
              />
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

export default CreateCourseModal;
