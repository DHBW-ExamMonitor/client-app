import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCourse } from 'renderer/api/courses';
import CourseInfo from 'renderer/components/Courses/CourseInfo';
import StudentsImporter from 'renderer/components/Courses/StudentsImporter';
import PageLayout from 'renderer/components/PageLayout';

/**
 * Kurs Component
 */
export const Kurs: React.FC = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = useQuery(['kurs', id!], ({ queryKey }) =>
    getCourse(queryKey[1])
  );

  return (
    <>
      <PageLayout title="Kurs" subTitle="" hideButton navigateBack>
        <CourseInfo course={data} />
        <StudentsImporter kursId={id ?? ''} />
      </PageLayout>
    </>
  );
};

export default Kurs;
