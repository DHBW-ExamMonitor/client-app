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

  // console.log(
  //   format(new Date(pruefungstermin.dateTime), 'yyyy-MM-dd HH:mm').replace(
  //     ' ',
  //     'T'
  //   )
  // );

  return (
    <Modal open={open} setOpen={setOpen}>
      <Formik
        initialValues={{
          name: pruefungstermin.name,
          hilfsmittel: pruefungstermin.hilfsmittel,
          raeume: pruefungstermin.raeume,
          aufsichtsPersonen: pruefungstermin.aufsichtsPersonen,
          notizen: pruefungstermin.notizen,
          dateTime: pruefungstermin.dateTime,
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
                defaultValue={format(
                  new Date(pruefungstermin.dateTime),
                  'yyyy-MM-dd HH:mm'
                ).replace(' ', 'T')}
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
