import { format } from 'date-fns';
import { Course } from 'renderer/types/course';

export interface CourseInfoProps {
  course?: Course;
}

export const CourseInfo: React.FC<CourseInfoProps> = ({ course }) => {
  if (!course) {
    return null;
  }

  return (
    <>
      <div className="flex flex-row mb-8">
        <div className="text-sm text-gray-500 mr-2 flex-col">
          <div>Name:</div>
          <div>Studienende:</div>
        </div>
        <div className="text-sm text-gray-500 flex-col">
          <div>{course?.name}</div>
          <div>{format(new Date(course?.studienende), 'dd.MM.yyyy')}</div>
        </div>
      </div>
    </>
  );
};

export default CourseInfo;
