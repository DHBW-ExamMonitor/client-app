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
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Termin
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Kurse
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Hilfsmittel
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Räume
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Aufsichtspersonen
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Notizen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData?.map((pruefungstermin) => (
                <>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {pruefungstermin.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {format(
                      new Date(pruefungstermin.dateTime),
                      'dd.MM.yyyy HH:mm'
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {/* {pruefungstermin.kurse.map((kurs) => kurs.name).join(', ')} */}
                    {pruefungstermin.kurse.map((kurs) => kurs.name).join(', ')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {pruefungstermin.hilfsmittel}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {pruefungstermin.raeume}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {pruefungstermin.aufsichtsPersonen}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {pruefungstermin.notizen}
                  </td>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </PageLayout>
    </>
  );
};

export default Module;
