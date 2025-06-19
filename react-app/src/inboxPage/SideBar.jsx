import React, { useState } from 'react';
import LabelButton from './labelButton/LabelButton';
import CreateMailButton from './createMailButton/CreateMailButton';
import LabelsTitle from './labelTitle/LabelsTitle';
import './SideBar.css';
import inboxIcon from './labelButton/icons/inbox.svg';
import starredIcon from './labelButton/icons/starred.svg';
import sentIcon from './labelButton/icons/sent.svg';
import draftsIcon from './labelButton/icons/drafts.svg';
import spamIcon from './labelButton/icons/spam.svg';
import customLabelIcon from './labelButton/icons/customLabel.svg'; 

const iconMap = {
  'Inbox': inboxIcon,
  'starred': starredIcon,
  'Sent': sentIcon,
  'Drafts': draftsIcon,
  'Spam': spamIcon,
};

function SideBar({ 
  onComposeClick, 
  defaultLabels, 
  customLabels, 
  onAddLabelClick,
  onOpenEditLabel,
  onOpenDeleteLabel
}) { 
    const [selected, setSelected] = useState('Inbox');
    
  return (
    <div className="sidebar-container">
      <CreateMailButton onClick={onComposeClick} /> 
      
      {/* default labels part (ללא שינוי) */}
      <div className="default-labels-section" style={{ marginTop: '16px' }}>
        {defaultLabels.map(label => (
          <LabelButton
            key={label.id}
            label={label}
            selected={selected === label.name}
            iconSrc={iconMap[label.name]} 
            onClick={() => setSelected(label.name)}
          />
        ))}
      </div>

      <hr className="sidebar-divider" /> 
      <LabelsTitle onAddClick={onAddLabelClick} />

      {/* custom labels part (עם התיקון) */}
      <div className="custom-labels-section">
        {customLabels && customLabels.map(label => (
          <LabelButton
            key={label.id}
            label={label}
            selected={selected === label.name}
            iconSrc={customLabelIcon} 
            onClick={() => setSelected(label.name)}
            // 2. עכשיו מעבירים את הפונקציות הנכונות ל-LabelButton
            // השמות onEditClick ו-onDeleteClick הם השמות ש-LabelButton מצפה לקבל
            onEditClick={() => onOpenEditLabel(label)} 
            onDeleteClick={() => onOpenDeleteLabel(label)}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;