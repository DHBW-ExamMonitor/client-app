import axios from 'axios';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from 'renderer/api/api';
import Button from 'renderer/components/Ui/Button';
import CheckboxField from 'renderer/components/Ui/CheckboxField';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import { Module } from 'renderer/types/module';

type UpdateModuleModalFormProps = {
  id: string;
  name: string;
  vorlesungen: string;
  aktiv: boolean;
};

const updateModule = async (values: UpdateModuleModalFormProps) => {
  const update = await axios.put(`http://localhost:3000/module/${values.id}`, {
    name: values.name,
    vorlesungen: values.vorlesungen,
    aktiv: values.aktiv,
  });
  const data = await update.data;
  return data;
};

export interface UpdateModuleModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  module: Module;
}

/**
 * UpdateModuleModal Component
 */
export const UpdateModuleModal: React.FC<UpdateModuleModalProps> = ({
  open,
  setOpen,
  module,
}) => {
  const { mutate } = useMutation(
    (values: UpdateModuleModalFormProps) => updateModule(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['modules']);
      },
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
          name: module.name ?? '',
          vorlesungen: module.vorlesungen ?? '',
          aktiv: module.aktiv ?? false,
        }}
        onSubmit={(values) => {
          console.log(values);
          try {
            mutate({ id: module.id, ...values });
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

          <Field name="aktiv">
            {({ field, meta }: FieldProps) => (
              <CheckboxField field={field} meta={meta} label="Aktiv" />
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

export default UpdateModuleModal;
