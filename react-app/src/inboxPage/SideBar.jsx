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

function SideBar({ onComposeClick, defaultLabels, customLabels, onAddLabelClick  }) { 
    const [selected, setSelected] = useState('Inbox');
    
  return (
    <div className="sidebar-container">
      <CreateMailButton onClick={onComposeClick} /> 
      
      {/* default labels part*/}
      <div className="labels-section">
        {defaultLabels.map(label => (
          <LabelButton
            key={label.id}
            label={label.name}
            selected={selected === label.name}
            iconSrc={iconMap[label.name]} 
            onClick={() => setSelected(label.name)}
          />
        ))}
      </div>

      {/* labels title and the dividing line*/}
      <hr className="sidebar-divider" /> 
      <LabelsTitle onAddClick={onAddLabelClick} />

      {/* custom labels part*/} 
      <div className="labels-section">
        {customLabels && customLabels.map(label => (
          <LabelButton
            key={label.id}
            label={label.name}
            selected={selected === label.name}
            iconSrc={customLabelIcon} 
            onClick={() => setSelected(label.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;