import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Landing Page
    appName: 'P.A.S.H.U',
    appFullName: 'Promoting Advanced Solutions for Herd Understanding',
    tagline: 'Advanced AI-powered cattle and buffalo breed recognition system for farmers and livestock professionals',
    selectLanguage: 'Select Language',
    getStarted: 'Get Started',
    about: 'About',
    features: 'Features',
    
    // Language Selection
    chooseLanguage: 'Choose Your Preferred Language',
    english: 'English',
    hindi: 'हिंदी',
    continue: 'Continue',
    
    // Login Page
    loginTitle: 'Login to P.A.S.H.U',
    loginSubtitle: 'Enter your Aadhaar number or Phone number to continue',
    aadhaarNumber: 'Aadhaar Number',
    phoneNumber: 'Phone Number',
    enterAadhaar: 'Enter 12-digit Aadhaar number',
    enterPhone: 'Enter 10-digit phone number',
    login: 'Login',
    loginWith: 'Login with',
    switchTo: 'Switch to',
    
    // Breed Recognition Page
    breedRecognitionTitle: 'Cattle & Buffalo Breed Recognition',
    uploadImage: 'Upload Image',
    capturePhoto: 'Capture Photo',
    submitForAnalysis: 'Submit for Analysis',
    analyzing: 'Analyzing...',
    result: 'Result',
    breedIdentified: 'Breed Identified',
    confidence: 'Confidence',
    tryAgain: 'Try Again',
    viewDetails: 'View Details',

    // Dashboard
    home: 'Home',
    vet: 'Vet',
    schemes: 'Schemes',
    logout: 'Logout',
    lastIdentification: 'Last Identification',
    quickActions: 'Quick Actions',
    quickActionsDesc: 'What would you like to do?',
    scanNewBreed: 'Scan New Breed',
    viewSchemes: 'View Government Schemes',
    findVet: 'Find Nearby Vets',
    aboutBreed: 'About This Breed',
    characteristics: 'Characteristics',
    characteristicsPlaceholder: 'Detailed breed characteristics will be displayed here after breed identification.',
    careRequirements: 'Care Requirements',
    careRequirementsPlaceholder: 'Specific care requirements and best practices for this breed.',
    scanBreedToViewInfo: 'Scan a breed to view detailed information',

    // Vet Info
    nearbyVets: 'Nearby Veterinary Services',
    nearbyVetsDesc: 'Find veterinary clinics and hospitals near you',
    emergency: 'Emergency',

    // Schemes
    governmentSchemes: 'Government Schemes',
    governmentSchemesDesc: 'Available government schemes for livestock farmers',
    benefits: 'Benefits',
    learnMore: 'Learn More',
    relevantToYourBreed: 'Relevant to your breed',
    
    // Common
    back: 'Back',
    next: 'Next',
    cancel: 'Cancel',
    success: 'Success',
    error: 'Error',
    loading: 'Loading...',
    
    // Validation Messages
    invalidAadhaar: 'Please enter a valid 12-digit Aadhaar number',
    invalidPhone: 'Please enter a valid 10-digit phone number',
    loginSuccess: 'Login successful!',
    loginError: 'Login failed. Please try again.',
    
    // Features
    aiPowered: 'AI-Powered Recognition',
    aiPoweredDesc: 'Advanced machine learning models for accurate breed identification',
    multiBreed: 'Multi-Breed Support',
    multiBreedDesc: 'Recognition of various cattle and buffalo breeds',
    instant: 'Instant Results',
    instantDesc: 'Get breed identification results in seconds',
    offline: 'Offline Capability',
    offlineDesc: 'Works even with limited internet connectivity',
  },
  hi: {
    // Landing Page
    appName: 'पशु',
    appFullName: 'पशुओं की उन्नत समझ को बढ़ावा देना',
    tagline: 'किसानों और पशुपालन पेशेवरों के लिए उन्नत AI-संचालित गाय और भैंस की नस्ल पहचान प्रणाली',
    selectLanguage: 'भाषा चुनें',
    getStarted: 'शुरू करें',
    about: 'के बारे में',
    features: 'सुविधाएं',
    
    // Language Selection
    chooseLanguage: 'अपनी पसंदीदा भाषा चुनें',
    english: 'English',
    hindi: 'हिंदी',
    continue: 'जारी रखें',
    
    // Login Page
    loginTitle: 'पशु में लॉगिन करें',
    loginSubtitle: 'जारी रखने के लिए अपना आधार नंबर या फोन नंबर दर्ज करें',
    aadhaarNumber: 'आधार नंबर',
    phoneNumber: 'फोन नंबर',
    enterAadhaar: '12 अंकों का आधार नंबर दर्ज करें',
    enterPhone: '10 अंकों का फोन नंबर दर्ज करें',
    login: 'लॉगिन',
    loginWith: 'लॉगिन करें',
    switchTo: 'बदलें',
    
    // Breed Recognition Page
    breedRecognitionTitle: 'गाय और भैंस की नस्ल पहचान',
    uploadImage: 'चित्र अपलोड करें',
    capturePhoto: 'फोटो लें',
    submitForAnalysis: 'विश्लेषण के लिए भेजें',
    analyzing: 'विश्लेषण कर रहे हैं...',
    result: 'परिणाम',
    breedIdentified: 'नस्ल की पहचान',
    confidence: 'विश्वास',
    tryAgain: 'फिर से कोशिश करें',
    viewDetails: 'विवरण देखें',

    // Dashboard
    home: 'होम',
    vet: 'पशु चिकित्सक',
    schemes: 'योजनाएं',
    logout: 'लॉगआउट',
    lastIdentification: 'अंतिम पहचान',
    quickActions: 'त्वरित क्रियाएं',
    quickActionsDesc: 'आप क्या करना चाहेंगे?',
    scanNewBreed: 'नई नस्ल स्कैन करें',
    viewSchemes: 'सरकारी योजनाएं देखें',
    findVet: 'नजदीकी पशु चिकित्सक खोजें',
    aboutBreed: 'इस नस्ल के बारे में',
    characteristics: 'विशेषताएं',
    characteristicsPlaceholder: 'नस्ल पहचान के बाद विस्तृत नस्ल विशेषताएं यहां प्रदर्शित की जाएंगी।',
    careRequirements: 'देखभाल आवश्यकताएं',
    careRequirementsPlaceholder: 'इस नस्ल के लिए विशिष्ट देखभाल आवश्यकताएं और सर्वोत्तम प्रथाएं।',
    scanBreedToViewInfo: 'विस्तृत जानकारी देखने के लिए एक नस्ल स्कैन करें',

    // Vet Info
    nearbyVets: 'नजदीकी पशु चिकित्सा सेवाएं',
    nearbyVetsDesc: 'अपने पास पशु चिकित्सा क्लीनिक और अस्पताल खोजें',
    emergency: 'आपातकाल',

    // Schemes
    governmentSchemes: 'सरकारी योजनाएं',
    governmentSchemesDesc: 'पशुधन किसानों के लिए उपलब्ध सरकारी योजनाएं',
    benefits: 'लाभ',
    learnMore: 'और जानें',
    relevantToYourBreed: 'आपकी नस्ल के लिए प्रासंगिक',
    
    // Common
    back: 'वापस',
    next: 'अगला',
    cancel: 'रद्द करें',
    success: 'सफलता',
    error: 'त्रुटि',
    loading: 'लोड हो रहा है...',
    
    // Validation Messages
    invalidAadhaar: 'कृपया एक वैध 12-अंकीय आधार नंबर दर्ज करें',
    invalidPhone: 'कृपया एक वैध 10-अंकीय फोन नंबर दर्ज करें',
    loginSuccess: 'लॉगिन सफल!',
    loginError: 'लॉगिन असफल। कृपया फिर से कोशिश करें।',
    
    // Features
    aiPowered: 'AI-संचालित पहचान',
    aiPoweredDesc: 'सटीक नस्ल पहचान के लिए उन्नत मशीन लर्निंग मॉडल',
    multiBreed: 'मल्टी-नस्ल समर्थन',
    multiBreedDesc: 'विभिन्न गाय और भैंस की नस्लों की पहचान',
    instant: 'तुरंत परिणाम',
    instantDesc: 'सेकंड में नस्ल पहचान के परिणाम प्राप्त करें',
    offline: 'ऑफलाइन क्षमता',
    offlineDesc: 'सीमित इंटरनेट कनेक्टिविटी के साथ भी काम करता है',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};