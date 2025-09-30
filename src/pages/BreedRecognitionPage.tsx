import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, Camera, Upload, Loader as Loader2, CircleCheck as CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BreedResult {
  breed: string;
  confidence: number;
  description?: string;
}

const BreedRecognitionPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<BreedResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const mockBreedRecognition = async (): Promise<BreedResult> => {
    // Mock API call with random results for demonstration
    const breeds = [
      { breed: 'Gir Cow', confidence: 92, description: 'Indigenous Indian breed known for high milk quality' },
      { breed: 'Murrah Buffalo', confidence: 88, description: 'Premier buffalo breed of India' },
      { breed: 'Holstein Friesian', confidence: 85, description: 'High milk producing dairy breed' },
      { breed: 'Sahiwal Cow', confidence: 90, description: 'Heat tolerant zebu breed' },
      { breed: 'Jersey Cow', confidence: 87, description: 'Small but efficient dairy breed' },
    ];
    
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing time
    return breeds[Math.floor(Math.random() * breeds.length)];
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await mockBreedRecognition();
      setResult(result);
      toast.success('Analysis completed successfully!');
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewDetails = () => {
    if (result) {
      navigate('/dashboard', {
        state: {
          breedInfo: result,
        },
      });
    }
  };

  const handleTryAgain = () => {
    setSelectedImage(null);
    setResult(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="px-4 py-4 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/login')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-primary">
              {t('breedRecognitionTitle')}
            </h1>
          </div>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Image Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {selectedImage ? 'Selected Image' : 'Upload Cattle/Buffalo Image'}
              </CardTitle>
              <CardDescription className="text-center">
                {selectedImage 
                  ? 'Review your image and click submit for analysis' 
                  : 'Upload an image or take a photo for breed recognition'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Preview */}
              {selectedImage && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-w-full h-64 object-contain rounded-lg border"
                    />
                  </div>
                </div>
              )}

              {/* Upload Buttons */}
              {!selectedImage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-32 flex flex-col space-y-2 border-dashed border-2"
                    onClick={handleUploadClick}
                  >
                    <Upload className="h-8 w-8" />
                    <span>{t('uploadImage')}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-32 flex flex-col space-y-2 border-dashed border-2"
                    onClick={handleCameraCapture}
                  >
                    <Camera className="h-8 w-8" />
                    <span>{t('capturePhoto')}</span>
                  </Button>
                </div>
              )}

              {/* Submit/Try Again Button */}
              {selectedImage && !result && (
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t('analyzing')}
                    </>
                  ) : (
                    t('submitForAnalysis')
                  )}
                </Button>
              )}

              {result && (
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleViewDetails}
                  >
                    {t('viewDetails')}
                  </Button>
                  <Button
                    size="lg"
                    className="w-full"
                    variant="outline"
                    onClick={handleTryAgain}
                  >
                    {t('tryAgain')}
                  </Button>
                </div>
              )}

              {/* Hidden file inputs */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <input
                type="file"
                ref={cameraInputRef}
                className="hidden"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
              />
            </CardContent>
          </Card>

          {/* Results Card */}
          {result && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-600">{t('result')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-green-800">
                      {result.breed}
                    </h3>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {result.confidence}% {t('confidence')}
                    </Badge>
                  </div>
                  {result.description && (
                    <p className="text-green-700 mt-2">
                      {result.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreedRecognitionPage;