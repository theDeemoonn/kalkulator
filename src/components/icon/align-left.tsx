import * as React from 'react';

const AlignLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.8611 15L6 10M6 10L10.8611 5M6 10H18M2 2V18"
      stroke="#242424"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default AlignLeft;
