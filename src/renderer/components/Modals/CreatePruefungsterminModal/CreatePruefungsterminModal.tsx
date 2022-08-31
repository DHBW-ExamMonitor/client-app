import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'renderer/api/api';
import { getCourses } from 'renderer/api/courses';
import {
  CreateOrUpdatePruefungsterminDto,
  createPruefungstermin,
} from 'renderer/api/pruefungstermine';
import Button from 'renderer/components/Ui/Button';
import Dropdown from 'renderer/components/Ui/Dropdown';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import MultiselectDropdown from 'renderer/components/Ui/MultiselectDropdown';
import { Modules } from 'renderer/types/module';
import { MultiselectValue } from 'renderer/components/Ui/MultiselectDropdown/MultiselectDropdown';
import { format } from 'date-fns';
import createAndUpdatePruefungsterminFormValidationSchema from '../validation/createAndUpdatePruefungsterminFormValidationSchema';

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
          name: '',
          hilfsmittel: '',
          raeume: '',
          aufsichtsPersonen: '',
          notizen: '',
          dateTime: format(new Date(Date.now()), 'yyyy-MM-dd HH:mm').replace(
            ' ',
            'T'
          ),
          modul: modules[0].id,
          kurse: [] as MultiselectValue[],
        }}
        validationSchema={createAndUpdatePruefungsterminFormValidationSchema}
        onSubmit={(values) => {
          try {
            mutate({
              ...values,
              kurse: values.kurse.map((a) => a.value),
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
                {modules.map((module) => (
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
              secondary
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
