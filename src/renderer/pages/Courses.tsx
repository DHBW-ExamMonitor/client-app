import React from 'react';
import { useQuery } from 'react-query';
import { getCourses } from 'renderer/api/courses';
import CreateCourseModal from 'renderer/components/Modals/CreateCourseModal';
import PageLayout from 'renderer/components/PageLayout';
import { Course } from 'renderer/types/course';

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
        <div className="mt-2">
          {data?.map((course: Course) => (
            <div key={course.id}>{course.name}</div>
          ))}
        </div>
      </PageLayout>
    </>
  );
};

export default Courses;
