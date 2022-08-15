import clsx from 'clsx';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import {
  CreateOrUpdatePruefungsterminDto,
  createPruefungstermin,
} from 'renderer/api/pruefungstermine';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import { Modules } from 'renderer/types/module';

export interface CreatePruefungsterminModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  modules?: Modules;
}

/**
 * CreatePruefungsterminModal Component
 */
export const CreatePruefungsterminModal: React.FC<
  CreatePruefungsterminModalProps
> = ({ open, setOpen, modules }) => {
  const { mutate } = useMutation(
    (values: CreateOrUpdatePruefungsterminDto) => createPruefungstermin(values),
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
    <Modal open={open} setOpen={setOpen}>
      <Formik
        initialValues={{
          name: '',
          hilfsmittel: '',
          raeume: '',
          aufsichtsPersonen: '',
          notizen: '',
          dateTime: new Date(Date.now()),
          modul: modules[0].id,
        }}
        onSubmit={(values) => {
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
          <div>
            <label
              htmlFor="modul"
              className="block text-sm font-medium text-gray-700"
            >
              Modul
            </label>

            <Field
              as="select"
              name="modul"
              className={clsx(
                'border-gray-300',
                'mt-1 text-sm block font-medium w-full rounded-md text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500'
              )}
            >
              {modules?.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
            </Field>
          </div>

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
                // onChange={(e) => {
                //   console.log(e.target.value);
                //   field.onChange(e);
                // }}
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

export default CreatePruefungsterminModal;
