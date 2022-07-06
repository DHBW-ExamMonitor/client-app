import React from 'react';
import Button from '../Ui/Button';

export interface PageLayoutProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  buttonText: string;
  buttonAction: () => void;
}

/**
 * PageLayout Component
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subTitle,
  buttonText,
  buttonAction,
  children,
}) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <p className="mt-2 text-sm text-gray-700">{subTitle}</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button type="button" onClick={() => buttonAction()}>
              {buttonText}
            </Button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
