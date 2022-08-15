import axios from 'axios';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';

type CreateModuleModalFormProps = {
  name: string;
  vorlesungen: string;
};

const createStudent = async (values: CreateModuleModalFormProps) => {
  const test = await axios.post('http://localhost:3000/module', {
    name: values.name,
    vorlesungen: values.vorlesungen,
  });
  console.log(test);
  const data = await test.data;
  return data;
};

export interface CreateModuleModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * CreateModuleModal Component
 */
export const CreateModuleModal: React.FC<CreateModuleModalProps> = ({
  open,
  setOpen,
}) => {
  const { mutate } = useMutation(
    (values: CreateModuleModalFormProps) => createStudent(values),
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
          vorlesungen: '',
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

          <Field name="vorlesungen">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Vorlesungen"
                type="text"
                placeholder="Vorlesungen"
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

export default CreateModuleModal;
