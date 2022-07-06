import axios from 'axios';
import clsx from 'clsx';
import { Formik } from 'formik';
import React from 'react';
import { useMutation } from 'react-query';
import Modal from '../Ui/Modal';

const createStudent = async (name: string) => {
  const test = await axios.post('https://em.kevinludwig.dev/studenten', {
    name,
  });
  const data = await test.data;
  return data;
};

/**
 * AddStudentModal Component
 */
export const AddStudentModal: React.FC = () => {
  const { mutate } = useMutation((name: string) => createStudent(name), {
    onError: (err) => {
      // eslint-disable-next-line no-alert
      alert(err);
    },
  });
  const [open, setOpen] = React.useState(false);
  return (
    <Modal open={open} setOpen={setOpen}>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={({ name }) => {
          mutate(name);
        }}
      >
        <Form></Form>
      </Formik>
      <div className={clsx('')}>Test</div>
    </Modal>
  );
};

export default AddStudentModal;
