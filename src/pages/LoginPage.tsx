import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, Cog as Cow, CreditCard, Phone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const aadhaarSchema = z.object({
  aadhaar: z.string().regex(/^\d{12}$/, 'Please enter a valid 12-digit Aadhaar number'),
});

const phoneSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
});

type AadhaarFormData = z.infer<typeof aadhaarSchema>;
type PhoneFormData = z.infer<typeof phoneSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('aadhaar');

  const aadhaarForm = useForm<AadhaarFormData>({
    resolver: zodResolver(aadhaarSchema),
    defaultValues: {
      aadhaar: '',
    },
  });

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onAadhaarSubmit = async (data: AadhaarFormData) => {
    setIsLoading(true);
    try {
      const success = await login({ aadhaar: data.aadhaar });
      if (success) {
        toast.success(t('loginSuccess'));
        navigate('/breed-recognition');
      } else {
        toast.error(t('loginError'));
      }
    } catch (error) {
      toast.error(t('loginError'));
    } finally {
      setIsLoading(false);
    }
  };

  const onPhoneSubmit = async (data: PhoneFormData) => {
    setIsLoading(true);
    try {
      const success = await login({ phone: data.phone });
      if (success) {
        toast.success(t('loginSuccess'));
        navigate('/breed-recognition');
      } else {
        toast.error(t('loginError'));
      }
    } catch (error) {
      toast.error(t('loginError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/language')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Cow className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {t('loginTitle')}
            </CardTitle>
            <CardDescription>
              {t('loginSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="aadhaar" className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Aadhaar</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="aadhaar" className="mt-6">
                <Form {...aadhaarForm}>
                  <form onSubmit={aadhaarForm.handleSubmit(onAadhaarSubmit)} className="space-y-6">
                    <FormField
                      control={aadhaarForm.control}
                      name="aadhaar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('aadhaarNumber')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('enterAadhaar')}
                              type="tel"
                              maxLength={12}
                              className="text-lg h-12"
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value.replace(/\D/g, '');
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? t('loading') : t('login')}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="phone" className="mt-6">
                <Form {...phoneForm}>
                  <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                    <FormField
                      control={phoneForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('phoneNumber')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('enterPhone')}
                              type="tel"
                              maxLength={10}
                              className="text-lg h-12"
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value.replace(/\D/g, '');
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? t('loading') : t('login')}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;