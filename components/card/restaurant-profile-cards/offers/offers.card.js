import React from 'react';

const OffersCard = ({ icon, description, points }) => {
  return (
    <div className="loyalty-point-card bg-white border-0">
      {React.isValidElement(icon) ? (
        <div className="loyalty-progress-bar">
          {icon}
          <div className="loyalty-point-count font-14px-20px-500 text-secondary-grey">
            {points}
          </div>
        </div>
      ) : (
        <div className="loyalty-progress-bar" style={{ background: '#8E6AF4' }}>
          <img src={icon} alt="" />
        </div>
      )}

      <div className="font-14px-20px-400">{description}</div>
    </div>
  );
};
export default OffersCard;
