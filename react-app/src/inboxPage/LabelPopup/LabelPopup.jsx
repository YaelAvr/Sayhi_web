import React, { useEffect, useState } from "react";
import "./LabelPopup.css";

const LabelPopup = ({ mail, allLabels, onToggleLabel, onClose }) => {
  const [selectedLabelIds, setSelectedLabelIds] = useState([]);

  useEffect(() => {
    setSelectedLabelIds(mail?.labels || []);
  }, [mail]);

  if (!mail) return null;

  const handleCheckboxChange = (label) => {
    const isChecked = selectedLabelIds.includes(label.id);
    const updated = isChecked
      ? selectedLabelIds.filter(id => id !== label.id)
      : [...selectedLabelIds, label.id];

    setSelectedLabelIds(updated);

    // שולחת לשרת את שם הלייבל (label.name), ואת המצב הישן (isChecked)
    onToggleLabel(mail.id, label.name, isChecked);
  };

  return (
    <div className="label-popup-overlay" onClick={onClose}>
      <div className="label-popup" onClick={(e) => e.stopPropagation()}>
        <h4>Choose labels</h4>
        <ul>
          {allLabels.map(label => {
            const isDisabled = ["Inbox", "Sent", "Drafts"].includes(label.name);
            const isChecked = selectedLabelIds.includes(label.id);

            return (
              <li key={label.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => {
                      if (!isDisabled) {
                        handleCheckboxChange(label);
                      }
                    }}
                  />
                  {label.name}
                </label>
              </li>
            );
          })}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LabelPopup;