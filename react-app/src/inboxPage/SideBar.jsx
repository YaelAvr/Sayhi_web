import React, {useState} from 'react'; // --- שינוי #1: אין צורך ב-useState יותר ---
import LabelButton from './labelButton/LabelButton';
import CreateMailButton from './createMailButton/CreateMailButton';
import LabelsTitle from './labelTitle/LabelsTitle';
import './SideBar.css';
import { ReactComponent as Inbox } from './labelButton/icons/inbox.svg';
import { ReactComponent as Starred } from './labelButton/icons/starred.svg';
import { ReactComponent as Sent } from './labelButton/icons/sent.svg';
import { ReactComponent as Drafts } from './labelButton/icons/drafts.svg';
import { ReactComponent as Spam } from './labelButton/icons/spam.svg';
import { ReactComponent as Custom } from './labelButton/icons/customLabel.svg';

const iconMap = {
  'Inbox': <Inbox className="label-icon " alt="Inbox icon" />,
  'Starred': <Starred className="label-icon" alt="Starred icon" />,
  'Sent': <Sent className="label-icon" alt="Sent icon" />,
  'Drafts': <Drafts className="label-icon" alt="Drafts icon" />,
  'Spam': <Spam className="label-icon" alt="Spam icon" />
};

// --- שינוי #2: הוספת props חדשים: currentLabelName ו-onLabelClick ---
function SideBar({ 
  onComposeClick, 
  defaultLabels, 
  customLabels, 
  onAddLabelClick,
  onOpenEditLabel,
  onOpenDeleteLabel,
  currentLabelName,
  // onLabelClick,
  onLabelSelect // new prop from parent to update currentLabel
}) { 
    // --- שינוי #3: מחקנו את ה-useState שהיה כאן ---
    // const [selected, setSelected] = useState('Inbox');
    
  return (
    <div className="sidebar-container">
      <CreateMailButton onClick={onComposeClick} /> 
      
      <div className="default-labels-section">
        {defaultLabels.map(label => (
          <LabelButton
            key={label.id}
            label={label}
            // --- שינוי #4: ההחלטה על סימון מגיעה מההורה ---
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
            // ההחלטה על סימון מגיעה מההורה
            selected={currentLabelName === label.name}
            // iconSrc={customLabelIcon} 
            iconSrc={ <Custom className="label-icon" alt="Custom icon" />} 

            // highlight this label and inform parent to load mails of this label
            onClick={() => onLabelSelect(label.name)}
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