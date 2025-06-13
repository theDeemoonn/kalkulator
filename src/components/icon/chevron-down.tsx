import * as React from 'react';

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={7}
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 1L6.00081 5.58L11 1"
      stroke="#99928B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ChevronDown;
