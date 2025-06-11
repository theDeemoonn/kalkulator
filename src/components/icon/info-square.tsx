import * as React from 'react';

const InfoSquare = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.99973 5.7785V5.83599M7.94504 8.29691H9.35129L9.35156 12.5156M13.2187 2.25C14.6167 2.25 15.75 3.38327 15.75 4.78124L15.75 13.2188C15.75 14.6167 14.6167 15.75 13.2188 15.75H4.78125C3.38328 15.75 2.25 14.6167 2.25 13.2188V4.78124C2.25 3.38327 3.38328 2.25 4.78125 2.25H13.2187Z"
      stroke="#99928B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default InfoSquare;
