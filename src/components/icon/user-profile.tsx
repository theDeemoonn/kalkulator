import * as React from 'react';

const UserProfile = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.69824 16.25C3.80275 14.4077 6.22348 13.1468 10.0001 13.1468C13.7768 13.1468 16.1975 14.4077 17.302 16.25M13.0001 6.75C13.0001 8.40685 11.657 9.75 10.0001 9.75C8.34328 9.75 7.00014 8.40685 7.00014 6.75C7.00014 5.09315 8.34328 3.75 10.0001 3.75C11.657 3.75 13.0001 5.09315 13.0001 6.75Z"
      stroke="#99928B"
      strokeLinecap="round"
    />
  </svg>
);
export default UserProfile;
