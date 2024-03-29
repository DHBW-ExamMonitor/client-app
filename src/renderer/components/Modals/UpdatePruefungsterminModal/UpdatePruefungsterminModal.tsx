import { format } from 'date-fns';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'renderer/api/api';
import { getCourses } from 'renderer/api/courses';
import {
  CreateOrUpdatePruefungsterminDto,
  updatePruefungstermin,
} from 'renderer/api/pruefungstermine';
import Button from 'renderer/components/Ui/Button';
import Dropdown from 'renderer/components/Ui/Dropdown';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import MultiselectDropdown, {
  MultiselectValue,
} from 'renderer/components/Ui/MultiselectDropdown/MultiselectDropdown';
import TextAreaField from 'renderer/components/Ui/TextAreaField';
import { Modules } from 'renderer/types/module';
import { Pruefungstermin } from 'renderer/types/pruefungstermin';
import createAndUpdatePruefungsterminFormValidationSchema from '../validation/createAndUpdatePruefungsterminFormValidationSchema';

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
      onSuccess: () => {
        queryClient.invalidateQueries(['pruefungstermine']);
      },
      onError: (err) => {
        // eslint-disable-next-line no-alert
        console.log(err);
      },
    }
  );

  const courses = useQuery('courses', getCourses);

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
          kurse: pruefungstermin.kurse.map((k) => {
            return { value: k.id, label: k.name };
          }),
        }}
        validationSchema={createAndUpdatePruefungsterminFormValidationSchema}
        onSubmit={(values) => {
          try {
            mutate({
              ...values,
              kurse: values.kurse.map((k) => k.value),
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

          <Field name="kurse">
            {({ field, meta }: FieldProps) => (
              <MultiselectDropdown
                data={
                  courses.data?.map((course) => {
                    return {
                      label: course.name,
                      value: course.id,
                    };
                  }) as MultiselectValue[]
                }
                field={field}
                meta={meta}
                label="Kurse"
              />
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
              <TextAreaField
                field={field}
                meta={meta}
                label="Notizen"
                rows={5}
                placeholder="Notizen"
                maxChars={1000}
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
              secondary
              onClick={() => setOpen(false)}
            >
              Abbrechen
            </Button>
            <Button type="submit">Aktualisieren</Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default UpdatePruefungsterminModal;
