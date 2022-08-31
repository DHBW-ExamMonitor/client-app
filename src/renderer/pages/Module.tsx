import { format } from 'date-fns';
import { Field, FieldProps, Form, Formik } from 'formik';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCourses } from 'renderer/api/courses';
import { getModules } from 'renderer/api/modules';
import { getPruefungstermineByModuleId } from 'renderer/api/pruefungstermine';
import PageLayout from 'renderer/components/PageLayout';
import Dropdown from 'renderer/components/Ui/Dropdown';
import TableData from 'renderer/components/Ui/TableData';
import TableHead from 'renderer/components/Ui/TableHead';

/**
 * Module Component
 */
export const Module: React.FC = () => {
  const { id } = useParams();
  const [kursId, setKursId] = React.useState<string | null>(null);
  const { data: courses } = useQuery('courses', getCourses);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = useQuery(['pruefungstermineProModul', id!], ({ queryKey }) =>
    getPruefungstermineByModuleId(queryKey[1])
  );

  const { data: modules } = useQuery('modules', getModules);

  const filteredData = data
    ?.filter((item) => {
      if (kursId) {
        // eslint-disable-next-line no-restricted-syntax
        for (const kurse of item.kurse) {
          if (kurse.id === kursId) {
            return true;
          }
          return false;
        }
        return false;
      }
      return true;
    })
    .sort(
      (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    );

  return (
    <>
      <PageLayout
        title={`Modul "${modules?.find((a) => a.id === id)?.name ?? ''}"`}
        subTitle="Alle Prüfungstermine"
        navigateBack
      >
        <Formik
          initialValues={{
            kursId: '',
          }}
          onSubmit={(values) => {
            setKursId(values.kursId);
          }}
        >
          {({ submitForm }) => (
            <Form className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <Field name="kursId">
                {({ field, meta }: FieldProps) => (
                  <Dropdown
                    field={field}
                    meta={meta}
                    label="Kurs"
                    onChange={(e) => {
                      field.onChange(e);
                      submitForm();
                    }}
                  >
                    <option value="">Alle Kurse</option>
                    {courses?.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </Dropdown>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <TableHead name="Name" className="sm:pl-6" />
                <TableHead name="Termin" />
                <TableHead name="Kurse" />
                <TableHead name="Hilfsmittel" />
                <TableHead name="Räume" />
                <TableHead name="Aufsichtspersonen" />
                <TableHead name="Notizen" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData?.map((pruefungstermin) => (
                <tr>
                  <TableData
                    data={pruefungstermin.name}
                    className="pl-4 pr-3 font-medium text-gray-900 sm:pl-6"
                  />
                  <TableData
                    data={format(
                      new Date(pruefungstermin.dateTime),
                      'dd.MM.yyyy HH:mm'
                    )}
                  />
                  <TableData
                    data={pruefungstermin.kurse
                      .map((kurs) => kurs.name)
                      .join(', ')}
                  />
                  <TableData data={pruefungstermin.hilfsmittel ?? ''} />
                  <TableData data={pruefungstermin.raeume} />
                  <TableData data={pruefungstermin.aufsichtsPersonen} />
                  <TableData data={pruefungstermin.notizen} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageLayout>
    </>
  );
};

export default Module;
