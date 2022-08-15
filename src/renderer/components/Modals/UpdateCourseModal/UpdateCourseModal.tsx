import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateCourse } from 'renderer/api/courses';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import { Course } from 'renderer/types/course';

export interface UpdateCourseModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  course: Course;
}

/**
 * UpdateCourseModal Component
 */
export const UpdateCourseModal: React.FC<UpdateCourseModalProps> = ({
  open,
  setOpen,
  course,
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((values: Course) => updateCourse(values), {
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <Modal open={open}>
      <Formik
        initialValues={{
          name: course.name ?? '',
          jahrgang: course.jahrgang ?? new Date().getFullYear(),
        }}
        onSubmit={async (values) => {
          console.log(values);
          try {
            mutate({
              id: course.id,
              name: values.name,
              jahrgang: values.jahrgang.toString(),
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

          <Field name="jahrgang">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Jahrgang"
                type="number"
                placeholder="Jahrgang"
              />
            )}
          </Field>

          <div className="flex mt-4 justify-end">
            <Button
              type="button"
              className="mr-2"
              onClick={() => setOpen(false)}
            >
              Abbrechen
            </Button>
            <Button type="submit">Erstellen</Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default UpdateCourseModal;
