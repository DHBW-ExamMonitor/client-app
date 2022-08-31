import { PlusIcon } from '@heroicons/react/outline';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getCourses } from 'renderer/api/courses';
import { getStudents } from 'renderer/api/students';
import capitalize from 'renderer/capitalize';
import CreateStudentModal from 'renderer/components/Modals/CreateStudentModal';
import PageLayout from 'renderer/components/PageLayout';
import StudentsList from 'renderer/components/Students/StudentsList';
import Button from 'renderer/components/Ui/Button';
import Dropdown from 'renderer/components/Ui/Dropdown';
import downloadFile from 'renderer/downloadFile';

/**
 * Students Component
 */
export const Students: React.FC = () => {
  const [kursId, setKursId] = useState<string | null>(null);
  const { data: courses } = useQuery('courses', getCourses);

  const { data } = useQuery(['students', kursId], async (context) => {
    return getStudents(context.queryKey[1]);
  });

  const downloadCSV = async () => {
    if (data && data.length) {
      let csvContent = 'Matrikelnummer;Name;Status;Kurs\r\n';
      data.forEach((student) => {
        csvContent += `${student.matrikelnummer};${student.name};${capitalize(
          student.studentenStatus
        )};${
          courses?.find((course) => course.id === student.kursId)?.name
        }\r\n`;
      });

      downloadFile({
        fileContents: csvContent,
        fileName: 'Studierendenliste',
        mimeType: 'text/csv',
      });
    }
  };

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
              {data && data.length > 0 && (
                <div className="mt-6 ml-4">
                  <Button type="button" onClick={downloadCSV}>
                    Studierendenliste herunterladen
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
        <StudentsList data={data} />
      </PageLayout>
    </>
  );
};

export default Students;
