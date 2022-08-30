import { PlusIcon } from '@heroicons/react/outline';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getCourses } from 'renderer/api/courses';
import { getStudents } from 'renderer/api/students';
import CreateStudentModal from 'renderer/components/Modals/CreateStudentModal';
import PageLayout from 'renderer/components/PageLayout';
import StudentsList from 'renderer/components/Students/StudentsList';
import CsvLink from 'renderer/components/Ui/CsvLink';
import Dropdown from 'renderer/components/Ui/Dropdown';

/**
 * Students Component
 */
export const Students: React.FC = () => {
  const [kursId, setKursId] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<object[]>([]);
  const { data: courses } = useQuery('courses', getCourses);

  const { data } = useQuery(
    ['students', kursId],
    async (context) => {
      return getStudents(context.queryKey[1]);
    },
    {
      onSuccess: (s) => {
        const temp: object[] = [];
        s.forEach((student) => {
          temp.push({
            Matrikelnummer: student.matrikelnummer,
            Name: student.name,
            Status: student.studentenStatus,
            kurs: courses?.find((course) => course.id === student.kursId)?.name,
          });
        });
        setCsvData(temp);
      },
    }
  );

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CreateStudentModal open={open} setOpen={setOpen} />
      <PageLayout
        title="Studierende"
        subTitle="Alle Studierenden mit Matrikelnummer."
        buttonText="Neue Studierende Person"
        buttonAction={() => setOpen(true)}
        buttonIcon={<PlusIcon className="h-5 w-5 mr-2" />}
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
              <div className="mt-6 ml-4">
                <CsvLink
                  data={csvData}
                  filename="Studierendenliste"
                  buttonText="Studierendenliste herunterladen"
                />
              </div>
            </Form>
          )}
        </Formik>
        <StudentsList data={data} />
      </PageLayout>
    </>
  );
};

export default Students;
