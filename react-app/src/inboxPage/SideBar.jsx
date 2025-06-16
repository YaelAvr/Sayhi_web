import React, { useState } from 'react';
import LabelButton from './labelButton/LabelButton';
import CreateMailButton from './createMailButton/CreateMailButton';
import LabelsTitle from './labelTitle/LabelsTitle';
import inboxIcon from './labelButton/icons/inbox.svg';
import starredIcon from './labelButton/icons/starred.svg';
import sentIcon from './labelButton/icons/sent.svg';
import draftsIcon from './labelButton/icons/drafts.svg';
import spamIcon from './labelButton/icons/spam.svg';

const defaultLabels = [
  'Inbox',
  'Starred',
  'Sent',
  'Drafts',
  'Spam'
];

const iconMap = {
  Inbox: inboxIcon,
  Starred: starredIcon,
  Sent: sentIcon,
  Drafts: draftsIcon,
  Spam: spamIcon,
};

// 1. הקומפוננטה מקבלת את onComposeClick כ-prop
function SideBar({ onComposeClick }) { 
    const [selected, setSelected] = useState('Inbox');
    
  return (
    <div style={{ width: '180px', padding: '10px' }}>
      {/* 2. אנו מעבירים את הפונקציה הזו ישירות לכפתור */}
      <CreateMailButton onClick={onComposeClick} /> 
      
      {defaultLabels.map(label => (
        <LabelButton
          key={label}
          label={label}
          selected={selected === label}
          iconSrc={iconMap[label]}
          onClick={() => {
            console.log(label);
            setSelected(label);
          }}
        />
      ))}

      <LabelsTitle />
    </div>
  );
}

export default SideBar;