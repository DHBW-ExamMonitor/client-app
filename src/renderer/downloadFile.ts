export const downloadFile = (config: {
  fileContents: string;
  fileName: string;
  mimeType: string;
}) => {
  const { mimeType, fileContents, fileName } = config;
  const blob = new Blob([fileContents], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadFile;
