import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import { EventRegister } from 'react-native-event-listeners';

const LanguageDropdown = () => {
  const { changeLanguage, language } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('En');

  // Use useEffect to get the selected language from local storage when the component mounts
  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      changeLanguage(storedLanguage);
    }
  }, [changeLanguage]);

  const handleLanguageSelect = (code, language) => {
    setSelectedLanguage(code);
    // Save the selected language code to local storage
    localStorage.setItem('selectedLanguage', code);
    // You can add additional logic here when a language is selected
    EventRegister.emit('changeLanguage', code);
    changeLanguage(code);
  };

  const languageOptions = [
    { code: 'En', name: 'En' },
    { code: 'He', name: 'He' }
    // Add more language options as needed
  ];

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="language-dropdown">
        {selectedLanguage}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {languageOptions.map((language, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleLanguageSelect(language.code, language.name)}
          >
            {language.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
