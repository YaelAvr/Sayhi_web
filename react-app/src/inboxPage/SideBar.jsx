import React from 'react'; // --- שינוי #1: אין צורך ב-useState יותר ---
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

// --- שינוי #2: הוספת props חדשים: currentLabelName ו-onLabelClick ---
function SideBar({ 
  onComposeClick, 
  defaultLabels, 
  customLabels, 
  onAddLabelClick,
  onOpenEditLabel,
  onOpenDeleteLabel,
  currentLabelName,
  onLabelClick,
  onLabelSelect // new prop from parent to update currentLabel
}) { 
    // --- שינוי #3: מחקנו את ה-useState שהיה כאן ---
    
  return (
    <div className="sidebar-container">
      <CreateMailButton onClick={onComposeClick} /> 
      
      <div className="default-labels-section" style={{ marginTop: '16px' }}>
        {defaultLabels.map(label => (
          <LabelButton
            key={label.id}
            label={label}
            // --- שינוי #4: ההחלטה על סימון מגיעה מההורה ---
            selected={currentLabelName === label.name}
            iconSrc={iconMap[label.name]} 
            // highlight this label and inform parent to load mails of this label
            onClick={() => { setSelected(label.name); onLabelSelect(label.name);}}
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
            iconSrc={customLabelIcon} 
            // highlight this label and inform parent to load mails of this label
            onClick={() => { setSelected(label.name); onLabelSelect(label.name);}}
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