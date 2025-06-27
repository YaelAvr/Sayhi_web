import React, { useEffect, useState } from "react";
import "./LabelPopup.css";

const LabelPopup = ({ mail, allLabels, onToggleLabel, onClose }) => {
  const [selectedLabelIds, setSelectedLabelIds] = useState([]);

  // Update selected labels when the mail changes
  useEffect(() => {
    setSelectedLabelIds(mail?.labels || []);
  }, [mail]);

  if (!mail) return null;

  const handleCheckboxChange = (label) => {
    const isChecked = selectedLabelIds.includes(label.id);
    // Update local checkbox state
    const updated = isChecked
      ? selectedLabelIds.filter(id => id !== label.id)
      : [...selectedLabelIds, label.id];

    setSelectedLabelIds(updated);

    // Notify parent about the label toggle: label name and current state
    onToggleLabel(mail.id, label.name, isChecked);
  };

  return (
    <div className="label-popup-overlay" onClick={onClose}>
      <div className="label-popup" onClick={(e) => e.stopPropagation()}>
        <h4>Choose labels</h4>

        {/* Scrollable wrapper for long label lists */}
        <div className="label-list-scrollable">
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
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LabelPopup;