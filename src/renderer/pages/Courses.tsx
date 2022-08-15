import React from 'react';
import { useQuery } from 'react-query';
import { getCourses } from 'renderer/api/courses';
import CoursesList from 'renderer/components/Courses/CoursesList';
import CreateCourseModal from 'renderer/components/Modals/CreateCourseModal';
import PageLayout from 'renderer/components/PageLayout';

/**
 * Courses Component
 */
export const Courses: React.FC = () => {
  const { data } = useQuery('courses', getCourses);
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <CreateCourseModal open={open} setOpen={setOpen} />
      <PageLayout
        title="Kurse"
        subTitle="Alle Kurse in der Übersicht."
        buttonText="Neuer Kurs"
        buttonAction={() => setOpen(true)}
      >
        <CoursesList data={data} />
      </PageLayout>
    </>
  );
};

export default Courses;
