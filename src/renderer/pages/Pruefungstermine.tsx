import { PlusIcon } from '@heroicons/react/outline';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
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
  const [open, setOpen] = React.useState(false);
  const [showEmptyRooms, setShowEmptyRooms] = React.useState(false);
  const [showEmptySupervisors, setShowEmptySupervisors] = React.useState(false);
  const [showNextThreeMonths, setShowNextThreeMonths] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState<
    Pruefungstermine | undefined
  >([]);

  useEffect(() => {
    const temp: Pruefungstermine = [];
    try {
      data?.every((pt) => {
        if (!showNextThreeMonths && !showEmptyRooms && !showEmptySupervisors) {
          temp.push(pt);
          return true;
        }
        if (
          showNextThreeMonths &&
          new Date(pt.dateTime) > new Date() &&
          new Date(pt.dateTime) <
            new Date(new Date().setMonth(new Date().getMonth() + 3)) &&
          showEmptyRooms &&
          pt.raeume.length === 0 &&
          showEmptySupervisors &&
          pt.aufsichtsPersonen.length === 0
        ) {
          temp.push(pt);
          return true;
        }
        if (
          !showEmptyRooms &&
          showNextThreeMonths &&
          new Date(pt.dateTime) > new Date() &&
          new Date(pt.dateTime) <
            new Date(new Date().setMonth(new Date().getMonth() + 3)) &&
          showEmptySupervisors &&
          pt.aufsichtsPersonen.length === 0
        ) {
          temp.push(pt);
          return true;
        }
        if (
          showNextThreeMonths &&
          new Date(pt.dateTime) > new Date() &&
          new Date(pt.dateTime) <
            new Date(new Date().setMonth(new Date().getMonth() + 3)) &&
          showEmptyRooms &&
          pt.raeume.length === 0 &&
          !showEmptySupervisors
        ) {
          temp.push(pt);
          return true;
        }
        if (
          !showNextThreeMonths &&
          showEmptyRooms &&
          pt.raeume.length === 0 &&
          showEmptySupervisors &&
          pt.aufsichtsPersonen.length === 0
        ) {
          temp.push(pt);
          return true;
        }
        if (
          !showNextThreeMonths &&
          !showEmptyRooms &&
          showEmptySupervisors &&
          pt.aufsichtsPersonen.length === 0
        ) {
          temp.push(pt);
          return true;
        }
        if (
          !showNextThreeMonths &&
          !showEmptySupervisors &&
          showEmptyRooms &&
          pt.raeume.length === 0
        ) {
          temp.push(pt);
          return true;
        }
        if (
          !showEmptyRooms &&
          !showEmptySupervisors &&
          showNextThreeMonths &&
          new Date(pt.dateTime) > new Date() &&
          new Date(pt.dateTime) <
            new Date(new Date().setMonth(new Date().getMonth() + 3))
        ) {
          temp.push(pt);
          return true;
        }
        return true;
      });
    } catch (e) {
      toast.error('Es ist ein Fehler beim Anfragen der Daten aufgetreten.');
    } finally {
      setFilteredData(temp);
    }
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
          data={filteredData?.sort(
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
