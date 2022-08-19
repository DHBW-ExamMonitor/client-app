import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';
import { useQuery } from 'react-query';
import { getStudents } from 'renderer/api/students';
import CreateStudentModal from 'renderer/components/Modals/CreateStudentModal';
import PageLayout from 'renderer/components/PageLayout';
import StudentsList from 'renderer/components/Students/StudentsList';

/**
 * Students Component
 */
export const Students: React.FC = () => {
  const { data } = useQuery('students', getStudents);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CreateStudentModal open={open} setOpen={setOpen} />
      <PageLayout
        title="Studierende"
        subTitle="Alle Studenten mit Matrikelnummer."
        buttonText="Neuer Student"
        buttonAction={() => setOpen(true)}
        buttonIcon={<PlusIcon className="h-5 w-5 mr-2" />}
      >
        <StudentsList data={data} />
      </PageLayout>
    </>
  );
};

export default Students;
