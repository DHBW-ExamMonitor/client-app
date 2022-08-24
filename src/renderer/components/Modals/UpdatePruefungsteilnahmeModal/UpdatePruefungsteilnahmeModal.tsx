import { Field, FieldProps, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from 'renderer/api/api';
import {
  CreateOrUpdatePruefungsteilnahmeDto,
  updatePruefungsteilnahme,
} from 'renderer/api/pruefungsteilnahme';
import Button from 'renderer/components/Ui/Button';
import Dropdown from 'renderer/components/Ui/Dropdown';
import InputField from 'renderer/components/Ui/InputField';
import Modal from 'renderer/components/Ui/Modal';
import {
  Pruefungsteilnahme,
  TeilnahmeStatus,
  Versuch,
} from 'renderer/types/pruefungsteilnahme';

export interface UpdatePruefungsterminModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  teilnahme: Pruefungsteilnahme;
}

/**
 * UpdatePruefungsteilnahmeModal Component
 */
export const UpdatePruefungsteilnahmeModal: React.FC<
  UpdatePruefungsterminModalProps
> = ({ open, setOpen, teilnahme }) => {
  const { mutate } = useMutation(
    (values: CreateOrUpdatePruefungsteilnahmeDto) =>
      updatePruefungsteilnahme(values, teilnahme.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teilnahmen']);
      },
      onError: (err) => {
        // eslint-disable-next-line no-alert
        console.log(err);
      },
    }
  );
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Modal open={open}>
      <Formik
        initialValues={{
          versuch: teilnahme.versuch.toString(),
          studentId: teilnahme.studentId,
          pruefungsterminId: teilnahme.pruefungsterminId,
          pruefungsteilnahmeStatus:
            teilnahme.pruefungsteilnahmeStatus.toString(),
          notizen: teilnahme.notizen ?? '',
        }}
        onSubmit={(values) => {
          try {
            setLoading(true);
            mutate(values);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
            setOpen(false);
          }
        }}
      >
        <Form className="space-y-6">
          <Field name="versuch">
            {({ field, meta }: FieldProps) => (
              <Dropdown field={field} meta={meta} label="Versuch">
                {Object.values(Versuch)
                  .filter((v) => typeof v === 'string')
                  .map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
              </Dropdown>
            )}
          </Field>

          <Field name="pruefungsteilnahmeStatus">
            {({ field, meta }: FieldProps) => (
              <Dropdown field={field} meta={meta} label="Teilnahmestatus">
                {Object.values(TeilnahmeStatus)
                  .filter((v) => typeof v === 'string')
                  .map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
              </Dropdown>
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

          <div className="flex mt-4 justify-end">
            <Button
              type="button"
              className="mr-2"
              secondary
              onClick={() => setOpen(false)}
            >
              Abbrechen
            </Button>
            <Button loading={loading} type="submit">
              Aktualisieren
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default UpdatePruefungsteilnahmeModal;
