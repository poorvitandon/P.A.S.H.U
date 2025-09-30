import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cog as Cow, Camera, Zap, Wifi } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: t('aiPowered'),
      description: t('aiPoweredDesc'),
    },
    {
      icon: <Cow className="h-8 w-8 text-primary" />,
      title: t('multiBreed'),
      description: t('multiBreedDesc'),
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: t('instant'),
      description: t('instantDesc'),
    },
    {
      icon: <Wifi className="h-8 w-8 text-primary" />,
      title: t('offline'),
      description: t('offlineDesc'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="px-4 lg:px-6 py-4 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Cow className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">{t('appName')}</h1>
              <p className="text-sm text-muted-foreground">{t('appFullName')}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/language')}
          >
            {t('selectLanguage')}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('appName')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              {t('tagline')}
            </p>
            <div className="space-x-4">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate('/login')}
              >
                {t('getStarted')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate('/language')}
              >
                {t('selectLanguage')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features')}
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-primary rounded-lg">
              <Cow className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">{t('appName')}</span>
          </div>
          <p className="text-gray-400">
            {t('appFullName')} - Government of India Initiative
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;