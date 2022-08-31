import {
  BookOpenIcon,
  CodeIcon,
  DocumentTextIcon,
} from '@heroicons/react/outline';
import { Field, FieldProps, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import PageLayout from 'renderer/components/PageLayout';
import Button from 'renderer/components/Ui/Button';
import InputField from 'renderer/components/Ui/InputField';

/**
 * Settings Component
 */
export const Settings: React.FC = () => {
  return (
    <>
      <PageLayout title="Einstellungen" hideButton>
        <div className="flex flex-col justify-between h-full">
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

          <div className="mt-24 text-gray-600">
            <h1 className="text-2xl font-bold mb-4">Contributions</h1>
            <h1 className="inline-flex items-center">
              <CodeIcon className="h-10 w-10 mr-2" />
              Entwicklung
            </h1>
            <ul className="list-disc list-inside ml-2">
              <li>Moritz Kaltenstadler</li>
              <li>Nicolas Kurzweil</li>
              <li>Kevin Ludwig</li>
            </ul>
          </div>
          <div className="mt-12 text-gray-600">
            <h1 className="inline-flex items-center">
              <DocumentTextIcon className="h-10 w-10 mr-2" />
              Projekt
            </h1>
            <ul className="list-disc list-inside ml-2">
              <li>Tamara Romer</li>
              <li>Joshua Iyagbaye</li>
              <li>Chiara Frankenbach</li>
              <li>Rafael Geigges</li>
              <li>Alicia Preisegger</li>
            </ul>
          </div>
          <div className="mt-12 text-gray-600">
            <h1 className="inline-flex items-center">
              <BookOpenIcon className="h-10 w-10 mr-2" />
              Dokumentation
            </h1>
            <ul className="list-disc list-inside ml-2">
              <li>Sven Schäfer</li>
              <li>Bastian Maucher</li>
            </ul>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Settings;
