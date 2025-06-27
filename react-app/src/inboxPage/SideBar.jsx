import React, {useState} from 'react';
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
  onOpenDeleteLabel,
  currentLabelName,
  onLabelSelect // new prop from parent to update currentLabel
}) { 
    
  return (
    <div className="sidebar-container">
      <CreateMailButton onClick={onComposeClick} /> 
      
      <div className="default-labels-section" style={{ marginTop: '16px' }}>
        {defaultLabels.map(label => (
          <LabelButton
            key={label.id}
            label={label}
            selected={currentLabelName === label.name}
            iconSrc={iconMap[label.name]} 
            // highlight this label and inform parent to load mails of this label
            onClick={() =>  onLabelSelect(label.name)}
          />
        ))}
      </div>

      <hr className="sidebar-divider" /> 
      <LabelsTitle onAddClick={onAddLabelClick} />

      <div className="custom-labels-section">
        {customLabels && customLabels.map(label => (
          <LabelButton
            key={label.id}
            label={label}
            selected={currentLabelName === label.name}
            iconSrc={customLabelIcon} 
            // highlight this label and inform parent to load mails of this label
            onClick={() => onLabelSelect(label.name)}
            onEditClick={() => onOpenEditLabel(label)} 
            onDeleteClick={() => onOpenDeleteLabel(label)}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;