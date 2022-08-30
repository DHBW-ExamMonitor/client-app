/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'renderer/api/api';
import { getCourses } from 'renderer/api/courses';
import {
  CreateOrUpdatePruefungsterminDto,
  createPruefungstermin,
  createPruefungsterminWithStudents,
} from 'renderer/api/pruefungstermine';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import MultiselectDropdown from 'renderer/components/Ui/MultiselectDropdown';
import { MultiselectValue } from 'renderer/components/Ui/MultiselectDropdown/MultiselectDropdown';
import { format } from 'date-fns';
import { Pruefungstermin } from 'renderer/types/pruefungstermin';
import CheckboxField from 'renderer/components/Ui/CheckboxField';
import createAndUpdatePruefungsterminFormValidationSchema from '../validation/createAndUpdatePruefungsterminFormValidationSchema';

export interface CopyPruefungsterminModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  termin: Pruefungstermin;
}

/**
 * CopyPruefungsterminModal Component
 */
export const CopyPruefungsterminModal: React.FC<
  CopyPruefungsterminModalProps
> = ({ open, setOpen, termin }) => {
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

  const createWithTeilnahmeMutation = useMutation(
    (values: CreateOrUpdatePruefungsterminDto) =>
      createPruefungsterminWithStudents(values, termin),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['pruefungstermine']);
        queryClient.invalidateQueries(['teilnahmen']);
      },
      onError: (err) => {
        // eslint-disable-next-line no-alert
        console.log(err);
      },
    }
  );

  const courses = useQuery('courses', getCourses);

  return (
    <Modal open={open}>
      <Formik
        initialValues={{
          name: `${termin.name} (Kopie)`,
          hilfsmittel: termin.hilfsmittel,
          raeume: termin.raeume,
          aufsichtsPersonen: termin.aufsichtsPersonen,
          notizen: termin.notizen,
          dateTime: format(
            new Date(termin.dateTime),
            'yyyy-MM-dd HH:mm'
          ).replace(' ', 'T'),
          modul: termin.modul.id,
          kurse: termin.kurse.map((k) => {
            return { value: k.id, label: k.name };
          }),
          copyStudents: true,
        }}
        validationSchema={createAndUpdatePruefungsterminFormValidationSchema}
        onSubmit={(values) => {
          try {
            if (values.copyStudents) {
              const v: any = values;
              delete v.copyStudents;
              createWithTeilnahmeMutation.mutate({
                ...v,
                dateTime: new Date(v.dateTime),
                kurse: v.kurse.map((k: any) => k.value),
              });
            } else {
              const v: any = values;
              delete v.copyStudents;
              mutate({
                ...v,
                dateTime: new Date(v.dateTime),
                kurse: v.kurse.map((k: any) => k.value),
              });
            }
          } catch (error) {
            console.log(error);
          } finally {
            setOpen(false);
          }
        }}
      >
        <Form className="space-y-6">
          <Field name="copyStudents">
            {({ field, meta }: FieldProps) => (
              <CheckboxField
                field={field}
                meta={meta}
                label="Alle Studierenden, bei denen der Status nicht 'Bestanden' oder 'Angerechnet' ist, kopieren"
                type="checkbox"
                defaultChecked
              />
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

export default CopyPruefungsterminModal;
