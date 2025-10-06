import { useState } from "react";
import styles from "./DropdownList.module.css";

export default function DropdownList({
  options = [],
  onSelect,
  placeholder = "Select...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect && onSelect(option);
    setIsOpen(false); // أغلق القائمة بعد الاختيار
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownButton} onClick={toggleDropdown}>
        {selected ? selected : placeholder}
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
