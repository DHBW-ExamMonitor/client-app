import clsx from 'clsx';
import { format } from 'date-fns';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import {
  CreateOrUpdatePruefungsterminDto,
  updatePruefungstermin,
} from 'renderer/api/pruefungstermine';
import Button from 'renderer/components/Ui/Button';
import Dropdown from 'renderer/components/Ui/Dropdown';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import { Modules } from 'renderer/types/module';
import { Pruefungstermin } from 'renderer/types/pruefungstermin';

export interface UpdatePruefungsterminModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  modules?: Modules;
  pruefungstermin: Pruefungstermin;
}

/**
 * UpdatePruefungsterminModal Component
 */
export const UpdatePruefungsterminModal: React.FC<
  UpdatePruefungsterminModalProps
> = ({ open, setOpen, modules, pruefungstermin }) => {
  const { mutate } = useMutation(
    (values: CreateOrUpdatePruefungsterminDto) =>
      updatePruefungstermin(values, pruefungstermin.id),
    {
      onError: (err) => {
        // eslint-disable-next-line no-alert
        console.log(err);
      },
    }
  );

  if (!modules || !modules.length) {
    return null;
  }

  return (
    <Modal open={open}>
      <Formik
        initialValues={{
          name: pruefungstermin.name ?? '',
          hilfsmittel: pruefungstermin.hilfsmittel ?? '',
          raeume: pruefungstermin.raeume,
          aufsichtsPersonen: pruefungstermin.aufsichtsPersonen,
          notizen: pruefungstermin.notizen ?? '',
          dateTime: format(
            new Date(pruefungstermin.dateTime),
            'yyyy-MM-dd HH:mm'
          ).replace(' ', 'T'),
          modul: modules[0].id,
        }}
        onSubmit={(values) => {
          try {
            mutate({
              ...values,
              dateTime: new Date(values.dateTime),
            });
          } catch (error) {
            console.log(error);
          } finally {
            setOpen(false);
          }
        }}
      >
        <Form className="space-y-6">
          <Field name="modul">
            {({ field, meta }: FieldProps) => (
              <Dropdown field={field} meta={meta} label="Modul">
                {modules?.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </Dropdown>
            )}
          </Field>

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

          <Field name="hilfsmittel">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Hilfsmittel"
                type="text"
                placeholder="Hilfsmittel"
              />
            )}
          </Field>

          <Field name="raeume">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Räume"
                type="text"
                placeholder="Räume"
              />
            )}
          </Field>

          <Field name="aufsichtsPersonen">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Aufsichtspersonen"
                type="text"
                placeholder="Aufsichtspersonen"
              />
            )}
          </Field>

          <Field name="notizen">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Notizen"
                type="text"
                placeholder="Notizen"
              />
            )}
          </Field>

          <Field name="dateTime">
            {({ field, meta }: FieldProps) => (
              <InputField
                field={field}
                meta={meta}
                label="Termin"
                type="datetime-local"
                placeholder="Termin"
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

export default UpdatePruefungsterminModal;
