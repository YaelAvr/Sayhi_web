import React, { useState } from 'react';
import LabelButton from './LabelButton';
import CreateMailButton from './CreateMailButton';
import LabelsTitle from './LabelsTitle';

const defaultLabels = [
  'Inbox',
  'Starred',
  'Sent',
  'Drafts',
  'Spam'
];

function SideBar() {
    const [selected, setSelected] = useState('Inbox');
  return (
    <div style={{ width: '180px', padding: '10px' }}>
      <CreateMailButton onClick={() => console.log('Create Mail')} />
      {defaultLabels.map(label => (
        <LabelButton
          key={label}
          label={label}
          selected={selected === label}
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
