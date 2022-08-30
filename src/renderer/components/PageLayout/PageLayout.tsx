import { ArrowLeftIcon } from '@heroicons/react/outline';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Ui/Button';

export interface PageLayoutProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  buttonText?: string;
  buttonAction?: () => void;
  buttonIcon?: React.ReactNode;
  hideButton?: boolean;
  navigateBack?: boolean;
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
  buttonIcon,
  hideButton,
  navigateBack,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          {navigateBack && (
            <div>
              <Button
                type="button"
                className="mr-4 rounded-full h-11 w-11 px-0 py-0 flex items-center justify-center"
                secondary
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </div>
          )}
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            {subTitle && (
              <p className="mt-2 text-sm text-gray-700">{subTitle}</p>
            )}
          </div>

          {!hideButton && buttonAction && (
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Button type="button" onClick={() => buttonAction()}>
                {buttonIcon}
                {buttonText}
              </Button>
            </div>
          )}
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
