import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Languages } from 'lucide-react';

const LanguageSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageSelect = (lang: 'en' | 'hi') => {
    setLanguage(lang);
  };

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Languages className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {t('chooseLanguage')}
            </CardTitle>
            <CardDescription>
              Choose your preferred language to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="lg"
                className="w-full h-16 text-lg justify-start"
                onClick={() => handleLanguageSelect('en')}
              >
                🇺🇸 English
              </Button>
              <Button
                variant={language === 'hi' ? 'default' : 'outline'}
                size="lg"
                className="w-full h-16 text-lg justify-start"
                onClick={() => handleLanguageSelect('hi')}
              >
                🇮🇳 हिंदी (Hindi)
              </Button>
            </div>
            <Button 
              size="lg" 
              className="w-full mt-6"
              onClick={handleContinue}
            >
              {t('continue')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LanguageSelectionPage;