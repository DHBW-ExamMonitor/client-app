import { PlusIcon } from '@heroicons/react/outline';
import { Field, FieldProps, Form, Formik } from 'formik';
import React from 'react';
import { useQuery } from 'react-query';
import { getModules } from 'renderer/api/modules';
import { getPruefungstermine } from 'renderer/api/pruefungstermine';
import CreatePruefungsterminModal from 'renderer/components/Modals/CreatePruefungsterminModal';
import PageLayout from 'renderer/components/PageLayout';
import PTList from 'renderer/components/Pruefungstermine/PTList';
import CheckboxField from 'renderer/components/Ui/CheckboxField';

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
  const filteredData = data
    ?.filter((pt) => {
      if (!showNextThreeMonths && !showEmptyRooms && !showEmptySupervisors) {
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
        console.log('1');
        console.log(pt);
        return true;
      } else if (
        showNextThreeMonths &&
        new Date(pt.dateTime) > new Date() &&
        new Date(pt.dateTime) <
          new Date(new Date().setMonth(new Date().getMonth() + 3)) &&
        showEmptyRooms &&
        pt.raeume.length === 0
      ) {
        console.log('2');
        console.log(pt);
        return true;
      } else {
        return false;
      }
    })
    .sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

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
            console.log(values);
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
        <PTList data={filteredData} modules={modules.data} />
      </PageLayout>
    </>
  );
};

export default Modules;
