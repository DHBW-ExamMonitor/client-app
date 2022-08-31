import { PlusIcon } from '@heroicons/react/outline';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getModules } from 'renderer/api/modules';
import { getPruefungstermine } from 'renderer/api/pruefungstermine';
import CreatePruefungsterminModal from 'renderer/components/Modals/CreatePruefungsterminModal';
import PageLayout from 'renderer/components/PageLayout';
import PTList from 'renderer/components/Pruefungstermine/PTList';
import CheckboxField from 'renderer/components/Ui/CheckboxField';
import { Pruefungstermine } from 'renderer/types/pruefungstermin';

/**
 * Pruefungstermine Component
 */
export const Modules: React.FC = () => {
  const { data } = useQuery('pruefungstermine', getPruefungstermine);
  const modules = useQuery('modules', getModules);
  const [open, setOpen] = useState(false);
  const [showEmptyRooms, setShowEmptyRooms] = useState(false);
  const [showEmptySupervisors, setShowEmptySupervisors] = useState(false);
  const [showNextThreeMonths, setShowNextThreeMonths] = useState(false);
  const [filteredData, setFilteredData] = useState<Pruefungstermine>([]);

  const filter = async (
    d: Pruefungstermine,
    ser: boolean,
    ses: boolean,
    sntm: boolean
  ) => {
    if (d && d.length) {
      const temp: Pruefungstermine = [];

      // eslint-disable-next-line no-restricted-syntax
      for await (const pt of d) {
        const now: Date = new Date(Date.now());
        const inThreeMonths = new Date(
          new Date(Date.now()).setMonth(now.getMonth() + 3)
        );
        const ptDate: Date = new Date(pt.dateTime);
        let add = true;

        if (ser && pt.raeume.length !== 0) {
          add = false;
        } else if (ses && pt.aufsichtsPersonen.length !== 0) {
          add = false;
        } else if ((sntm && ptDate < now) || ptDate > inThreeMonths) {
          add = false;
        }
        if (add) temp.push(pt);
      }
      setFilteredData([...temp]);
    }
  };

  useEffect(() => {
    filter(
      data ?? [],
      showEmptyRooms,
      showEmptySupervisors,
      showNextThreeMonths
    );
  }, [data, showEmptyRooms, showEmptySupervisors, showNextThreeMonths]);

  return (
    <>
      <CreatePruefungsterminModal
        open={open}
        setOpen={setOpen}
        modules={modules.data}
      />
      <PageLayout
        title="Prüfungstermine"
        subTitle="Alle Prüfungstermine."
        buttonText="Neuer Prüfungstermin"
        buttonAction={() => setOpen(true)}
        buttonIcon={<PlusIcon className="h-5 w-5 mr-2" />}
      >
        <Formik
          initialValues={{
            showEmptyRooms: false,
            showEmptySupervisors: false,
            showNextThreeMonths: false,
          }}
          onSubmit={(values) => {
            setShowEmptyRooms(values.showEmptyRooms);
            setShowEmptySupervisors(values.showEmptySupervisors);
            setShowNextThreeMonths(values.showNextThreeMonths);
          }}
        >
          {({ submitForm }) => (
            <Form className="mb-8 space-y-3">
              <Field name="showEmptyRooms">
                {({ field, meta }: FieldProps) => (
                  <CheckboxField
                    field={field}
                    meta={meta}
                    label="Nur Prüfungstermine mit leeren Räumen anzeigen."
                    onChange={(e) => {
                      field.onChange(e);
                      submitForm();
                    }}
                  />
                )}
              </Field>
              <Field name="showEmptySupervisors">
                {({ field, meta }: FieldProps) => (
                  <CheckboxField
                    field={field}
                    meta={meta}
                    label="Nur Prüfungstermine mit leeren Aufsichtspersonen anzeigen."
                    onChange={(e) => {
                      field.onChange(e);
                      submitForm();
                    }}
                  />
                )}
              </Field>
              <Field name="showNextThreeMonths">
                {({ field, meta }: FieldProps) => (
                  <CheckboxField
                    field={field}
                    meta={meta}
                    label="Nur Prüfungstermine der nächsten drei Monate anzeigen."
                    onChange={(e) => {
                      field.onChange(e);
                      submitForm();
                    }}
                  />
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <PTList
          data={filteredData.sort(
            (a, b) =>
              new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
          )}
          modules={modules.data}
        />
      </PageLayout>
    </>
  );
};

export default Modules;
