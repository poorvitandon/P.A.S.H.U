import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Chrome as Home, Stethoscope, FileText, LogOut, Camera } from 'lucide-react';

interface BreedInfo {
  breed: string;
  confidence: number;
  description?: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const breedInfo = location.state?.breedInfo as BreedInfo | undefined;

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNewScan = () => {
    navigate('/breed-recognition');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="px-4 py-4 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-primary">
              {t('appName')}
            </h1>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t('logout')}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="home" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>{t('home')}</span>
              </TabsTrigger>
              <TabsTrigger value="vet" className="flex items-center space-x-2">
                <Stethoscope className="h-4 w-4" />
                <span>{t('vet')}</span>
              </TabsTrigger>
              <TabsTrigger value="schemes" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{t('schemes')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="space-y-6">
              {breedInfo && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800">{t('lastIdentification')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-green-900">
                          {breedInfo.breed}
                        </h3>
                        {breedInfo.description && (
                          <p className="text-green-700 mt-2">
                            {breedInfo.description}
                          </p>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {breedInfo.confidence}% {t('confidence')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>{t('quickActions')}</CardTitle>
                  <CardDescription>{t('quickActionsDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleNewScan}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    {t('scanNewBreed')}
                  </Button>

                  {breedInfo && (
                    <>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveTab('schemes')}
                      >
                        <FileText className="h-5 w-5 mr-2" />
                        {t('viewSchemes')}
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveTab('vet')}
                      >
                        <Stethoscope className="h-5 w-5 mr-2" />
                        {t('findVet')}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('aboutBreed')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {breedInfo ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">{t('characteristics')}</h4>
                        <p className="text-muted-foreground">
                          {t('characteristicsPlaceholder')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('careRequirements')}</h4>
                        <p className="text-muted-foreground">
                          {t('careRequirementsPlaceholder')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      {t('scanBreedToViewInfo')}
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vet" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('nearbyVets')}</CardTitle>
                  <CardDescription>{t('nearbyVetsDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <VetCard
                      name="Central Veterinary Hospital"
                      phone="+91-11-12345678"
                      address="Sector 15, Rohini, New Delhi"
                      specialization="Large Animal Care"
                      emergency={true}
                    />
                    <VetCard
                      name="Gujarat Veterinary Clinic"
                      phone="+91-79-98765432"
                      address="Naroda Road, Ahmedabad, Gujarat"
                      specialization="Cattle Breeding"
                      emergency={true}
                    />
                    <VetCard
                      name="Punjab Animal Hospital"
                      phone="+91-161-2345678"
                      address="Model Town, Ludhiana, Punjab"
                      specialization="Buffalo Care"
                      emergency={true}
                    />
                    <VetCard
                      name="Maharashtra Vet Care"
                      phone="+91-20-87654321"
                      address="Shivaji Nagar, Pune, Maharashtra"
                      specialization="Dairy Health"
                      emergency={false}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schemes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('governmentSchemes')}</CardTitle>
                  <CardDescription>{t('governmentSchemesDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <SchemeCard
                      title="National Livestock Mission"
                      titleHi="राष्ट्रीय पशुधन मिशन"
                      description="A comprehensive program to develop livestock sector in a scientific manner"
                      descriptionHi="वैज्ञानिक तरीके से पशुधन क्षेत्र के विकास के लिए एक व्यापक कार्यक्रम"
                      benefits="Financial assistance for breed improvement, feed and fodder development"
                      benefitsHi="नस्ल सुधार, चारा और चारा विकास के लिए वित्तीय सहायता"
                      website="https://dahd.nic.in"
                    />
                    <SchemeCard
                      title="Rashtriya Gokul Mission"
                      titleHi="राष्ट्रीय गोकुल मिशन"
                      description="Conservation and development of indigenous bovine breeds"
                      descriptionHi="देशी गोजातीय नस्लों का संरक्षण और विकास"
                      benefits="Support for breeding, rearing and conservation of indigenous breeds"
                      benefitsHi="स्वदेशी नस्लों के प्रजनन, पालन-पोषण और संरक्षण के लिए समर्थन"
                      website="https://dahd.nic.in"
                      breedSpecific={breedInfo?.breed}
                    />
                    <SchemeCard
                      title="Dairy Entrepreneurship Development Scheme"
                      titleHi="डेयरी उद्यमिता विकास योजना"
                      description="Creating self-employment opportunities in dairy sector"
                      descriptionHi="डेयरी क्षेत्र में स्वरोजगार के अवसर पैदा करना"
                      benefits="Capital subsidy, training, and technical support"
                      benefitsHi="पूंजी सब्सिडी, प्रशिक्षण और तकनीकी सहायता"
                      website="https://www.nddb.coop"
                    />
                    <SchemeCard
                      title="Pashu Kisan Credit Card"
                      titleHi="पशु किसान क्रेडिट कार्ड"
                      description="Credit facility for dairy farmers"
                      descriptionHi="डेयरी किसानों के लिए ऋण सुविधा"
                      benefits="Easy credit access for purchasing cattle, feed, and equipment"
                      benefitsHi="मवेशी, चारा और उपकरण खरीदने के लिए आसान ऋण"
                      website="https://www.nabard.org"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface VetCardProps {
  name: string;
  phone: string;
  address: string;
  specialization: string;
  emergency: boolean;
}

const VetCard: React.FC<VetCardProps> = ({ name, phone, address, specialization, emergency }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg">{name}</h3>
              {emergency && (
                <Badge variant="destructive" className="text-xs">
                  {t('emergency')}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{specialization}</p>
            <p className="text-sm text-muted-foreground">{address}</p>
            <a
              href={`tel:${phone}`}
              className="text-sm text-primary hover:underline font-medium"
            >
              {phone}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface SchemeCardProps {
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  benefits: string;
  benefitsHi: string;
  website: string;
  breedSpecific?: string;
}

const SchemeCard: React.FC<SchemeCardProps> = ({
  title,
  titleHi,
  description,
  descriptionHi,
  benefits,
  benefitsHi,
  website,
  breedSpecific,
}) => {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';

  return (
    <Card className={breedSpecific ? 'border-green-300 bg-green-50' : ''}>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg">
              {isHindi ? titleHi : title}
            </h3>
            {breedSpecific && (
              <Badge variant="secondary" className="ml-2">
                {t('relevantToYourBreed')}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {isHindi ? descriptionHi : description}
          </p>
          <div>
            <h4 className="font-medium text-sm mb-1">{t('benefits')}:</h4>
            <p className="text-sm text-muted-foreground">
              {isHindi ? benefitsHi : benefits}
            </p>
          </div>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline font-medium inline-block"
          >
            {t('learnMore')} →
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
