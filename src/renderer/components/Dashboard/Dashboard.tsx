import axios from 'axios';
import clsx from 'clsx';
import React from 'react';
import { useQuery } from 'react-query';

export interface DashboardProps {
  className?: string;
}

const getNextExams = async () => {
  const test = axios.get('https://em.kevinludwig.dev/pruefungstermine/next/30');
  return test;
};

/**
 * Dashboard Component
 */
export const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const exams = useQuery('nextExams', getNextExams);

  return <div className={clsx('', className)}>{JSON.stringify(exams)}</div>;
};

export default Dashboard;
