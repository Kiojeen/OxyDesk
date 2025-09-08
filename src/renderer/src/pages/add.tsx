import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import supabase from '../db/supabase'

export default function Add() {
  const { t, i18n } = useTranslation()

  const [formData, setFormData] = useState({
    workType: 'copying',
    customerName: '',
    phoneNumber: '',
    workStatus: 'completed',
    workId: '',
    pricePerPage: 0,
    numberOfPages: 0,
    discount: 0,
    totalAccount: '',
    receivedAmount: 0,
    paymentStatus: 'paid',
    remaining: 0,
    notes: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleClearData = () => {
    setFormData({
      workType: 'copying',
      customerName: '',
      phoneNumber: '',
      workStatus: 'completed',
      workId: '',
      pricePerPage: 0,
      numberOfPages: 0,
      discount: 0,
      totalAccount: '',
      receivedAmount: 0,
      paymentStatus: 'paid',
      remaining: 0,
      notes: ''
    })
  }

  const handleSaveData = async (e: React.FormEvent) => {
    console.log('Saving data:', formData)
    // Add saving logic here
    const { error } = await supabase.from('work_orders').insert([
      {
        work_type: formData.workType,
        customer_name: formData.customerName,
        phone_number: formData.phoneNumber,
        work_status: formData.workStatus,
        price_per_page: formData.pricePerPage,
        number_of_pages: formData.numberOfPages,
        discount: formData.discount,
        received_amount: formData.receivedAmount,
        payment_status: formData.paymentStatus,
        notes: formData.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])

    if (error) {
      alert(`Error: ${error.message}`)
    } else {
      alert('Work order saved successfully!')
      setFormData({
        workType: 'copying',
        customerName: '',
        phoneNumber: '',
        workStatus: 'completed',
        workId: '',
        pricePerPage: 0,
        numberOfPages: 0,
        discount: 0,
        totalAccount: '',
        receivedAmount: 0,
        paymentStatus: 'paid',
        remaining: 0,
        notes: ''
      })
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold text-foreground">{t('pageTitle')}</h1>
        </header>

        {/* Client Details */}
        <Card className="shadow-sm border">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-foreground">
              {t('sections.clientDetails')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Work Type */}
              <div className="space-y-2">
                <Label>{t('fields.workType')}</Label>
                <Select
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                  value={formData.workType}
                  onValueChange={(value) => handleInputChange('workType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('fields.workType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="copying">{t('options.copying')}</SelectItem>
                    <SelectItem value="translation">{t('options.translation')}</SelectItem>
                    <SelectItem value="printing">{t('options.printing')}</SelectItem>
                    <SelectItem value="scanning">{t('options.scanning')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Name */}
              <div className="space-y-2">
                <Label htmlFor="customerName">{t('fields.customerName')}</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder={t('fields.customerName')}
                  className="border-gray-400 focus:border-teal-500"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">{t('fields.phoneNumber')}</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="078xxxxxxxx"
                  className="border-gray-400 focus:border-teal-500"
                />
              </div>

              {/* Work Status + Work ID */}
              <div className="space-y-2">
                <Label>{t('fields.workStatus')}</Label>
                <div className="flex gap-3">
                  <Select
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    value={formData.workStatus}
                    onValueChange={(value) => handleInputChange('workStatus', value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder={t('fields.workStatus')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">{t('options.completed')}</SelectItem>
                      <SelectItem value="inProgress">{t('options.inProgress')}</SelectItem>
                      <SelectItem value="pending">{t('options.pending')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    className="w-32 border-gray-400 focus:border-teal-500"
                    value={formData.workId}
                    onChange={(e) => handleInputChange('workId', e.target.value)}
                    placeholder={t('fields.workId')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Details */}
        <Card className="shadow-sm border">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-foreground">
              {t('sections.priceDetails')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Helper Component for Currency Fields */}
              {[
                { id: 'pricePerPage', label: t('fields.pricePerPage'), placeholder: '1000' },
                { id: 'discount', label: t('fields.discount'), placeholder: '500' },
                { id: 'totalAccount', label: t('fields.totalAccount'), placeholder: '2500' }
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <div className="relative">
                    <Input
                      id={field.id}
                      value={(formData as any)[field.id]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="pr-10 text-right border-gray-400 focus:border-teal-500"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                      {t('actions.currency')}
                    </span>
                  </div>
                </div>
              ))}

              {/* Number of Pages (no currency) */}
              <div className="space-y-2">
                <Label htmlFor="numberOfPages">{t('fields.numberOfPages')}</Label>
                <Input
                  id="numberOfPages"
                  value={formData.numberOfPages}
                  onChange={(e) => handleInputChange('numberOfPages', e.target.value)}
                  placeholder="3"
                  className="text-right border-gray-400 focus:border-teal-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card className="shadow-sm border">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-foreground">
              {t('sections.paymentStatus')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Received Amount */}
              <div className="space-y-2">
                <Label htmlFor="receivedAmount">{t('fields.receivedAmount')}</Label>
                <div className="relative">
                  <Input
                    id="receivedAmount"
                    value={formData.receivedAmount}
                    onChange={(e) => handleInputChange('receivedAmount', e.target.value)}
                    placeholder="6000"
                    className="pr-10 text-right border-gray-400 focus:border-teal-500"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                    {t('actions.currency')}
                  </span>
                </div>
              </div>

              {/* Payment Status - Updated to Select */}
              <div className="space-y-2">
                <Label htmlFor="paymentStatus">{t('fields.paymentStatus')}</Label>
                <Select
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                  value={formData.paymentStatus}
                  onValueChange={(value) => handleInputChange('paymentStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('fields.paymentStatus')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">{t('options.paid')}</SelectItem>
                    <SelectItem value="unpaid">{t('options.unpaid')}</SelectItem>
                    <SelectItem value="pending">{t('options.pending')}</SelectItem>
                    <SelectItem value="overdue">{t('options.overdue')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Remaining */}
              <div className="space-y-2">
                <Label htmlFor="remaining">{t('fields.remaining')}</Label>
                <div className="relative">
                  <Input
                    id="remaining"
                    value={formData.remaining}
                    onChange={(e) => handleInputChange('remaining', e.target.value)}
                    placeholder="0"
                    className="pr-10 text-right border-gray-400 focus:border-teal-500"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                    {t('actions.currency')}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="shadow-sm border">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-foreground">
              {t('sections.notes')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder={t('fields.notesPlaceholder')}
              className="min-h-[120px] resize-none border-gray-400 focus:border-teal-500"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={handleClearData}
            className="bg-gray-100 hover:bg-gray-200 text-muted-foreground border border-gray-300 transition"
          >
            {t('actions.clearData')}
          </Button>
          <Button
            onClick={handleSaveData}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 transition"
          >
            {t('actions.saveData')}
          </Button>
        </div>
      </div>
    </div>
  )
}
