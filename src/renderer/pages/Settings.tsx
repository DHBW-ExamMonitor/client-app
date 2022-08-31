import { Field, FieldProps, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCourse } from 'renderer/api/courses';
import CourseInfo from 'renderer/components/Courses/CourseInfo';
import PageLayout from 'renderer/components/PageLayout';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';

/**
 * Settings Component
 */
export const Settings: React.FC = () => {
  const { id } = useParams();
  const { data } = useQuery(['kurs', id!], ({ queryKey }) =>
    getCourse(queryKey[1])
  );

  return (
    <>
      <PageLayout title="Einstellungen" hideButton>
        <CourseInfo course={data} />
        <Formik
          initialValues={{
            apiUrl: localStorage.getItem('apiUrl') ?? 'http://141.68.121.11',
          }}
          onSubmit={(values) => {
            localStorage.setItem('apiUrl', values.apiUrl);
            toast.success('Einstellungen gespeichert');

            // reloading window over ipc renderer in main process
            // @ts-ignore
            window.electron.ipcRenderer.reload();
          }}
        >
          <Form className="space-y-6 max-w-md">
            <div>
              <p className="text-sm">
                Standardadresse im DHBW-Netzwerk: http://141.68.121.11
              </p>
            </div>
            <Field name="apiUrl">
              {({ field, meta }: FieldProps) => (
                <InputField
                  field={field}
                  meta={meta}
                  label="Server"
                  type="text"
                  placeholder="Server"
                />
              )}
            </Field>
            <div>
              <Button id="reload" type="submit">
                Speichern
              </Button>
            </div>
          </Form>
        </Formik>
      </PageLayout>
    </>
  );
};

export default Settings;
