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

export default function Add() {
  const { t, i18n } = useTranslation()

  const [formData, setFormData] = useState({
    workType: 'duplication',
    customerName: '',
    phoneNumber: '',
    workStatus: 'completed',
    workId: '',
    pricePerPage: '',
    numberOfPages: '',
    discount: '',
    totalAccount: '',
    receivedAmount: '',
    paymentStatus: '',
    remaining: '',
    notes: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleClearData = () => {
    setFormData({
      workType: 'duplication',
      customerName: '',
      phoneNumber: '',
      workStatus: 'completed',
      workId: '',
      pricePerPage: '',
      numberOfPages: '',
      discount: '',
      totalAccount: '',
      receivedAmount: '',
      paymentStatus: '',
      remaining: '',
      notes: ''
    })
  }

  const handleSaveData = () => {
    console.log('Saving data:', formData)
    // Add saving logic here
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('pageTitle')}</h1>
        </div>

        {/* Client Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{t('sections.clientDetails')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Work Type */}
              <div className="space-y-2">
                <Label>{t('fields.workType')}</Label>
                <Select
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                  value={formData.workType}
                  onValueChange={(value) => handleInputChange('workType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="duplication">{t('options.duplication')}</SelectItem>
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
                />
              </div>

              {/* Work Status & Work ID */}
              <div className="space-y-2">
                <Label>{t('fields.workStatus')}</Label>
                <div className="flex gap-2">
                  <Select
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    value={formData.workStatus}
                    onValueChange={(value) => handleInputChange('workStatus', value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">{t('options.completed')}</SelectItem>
                      <SelectItem value="inProgress">{t('options.inProgress')}</SelectItem>
                      <SelectItem value="pending">{t('options.pending')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    className="w-32"
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{t('sections.priceDetails')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Per Page */}
              <div className="space-y-2">
                <Label htmlFor="pricePerPage">{t('fields.pricePerPage')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="pricePerPage"
                    value={formData.pricePerPage}
                    onChange={(e) => handleInputChange('pricePerPage', e.target.value)}
                    placeholder="1000"
                  />
                  <span className="text-foreground font-medium">{t('actions.currency')}</span>
                </div>
              </div>

              {/* Number of Pages */}
              <div className="space-y-2">
                <Label htmlFor="numberOfPages">{t('fields.numberOfPages')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="numberOfPages"
                    value={formData.numberOfPages}
                    onChange={(e) => handleInputChange('numberOfPages', e.target.value)}
                    placeholder="3"
                  />
                  <span className="text-foreground font-medium">{t('actions.currency')}</span>
                </div>
              </div>

              {/* Discount */}
              <div className="space-y-2">
                <Label htmlFor="discount">{t('fields.discount')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="discount"
                    value={formData.discount}
                    onChange={(e) => handleInputChange('discount', e.target.value)}
                    placeholder="500"
                  />
                  <span className="text-foreground font-medium">{t('actions.currency')}</span>
                </div>
              </div>

              {/* Total Account */}
              <div className="space-y-2">
                <Label htmlFor="totalAccount">{t('fields.totalAccount')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="totalAccount"
                    value={formData.totalAccount}
                    onChange={(e) => handleInputChange('totalAccount', e.target.value)}
                    placeholder="2500"
                  />
                  <span className="text-foreground font-medium">{t('actions.currency')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{t('sections.paymentStatus')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Received Amount */}
              <div className="space-y-2">
                <Label htmlFor="receivedAmount">{t('fields.receivedAmount')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="receivedAmount"
                    value={formData.receivedAmount}
                    onChange={(e) => handleInputChange('receivedAmount', e.target.value)}
                    placeholder="6000"
                  />
                  <span className="text-foreground font-medium">{t('actions.currency')}</span>
                </div>
              </div>

              {/* Payment Status */}
              <div className="space-y-2">
                <Label htmlFor="paymentStatus">{t('fields.paymentStatus')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
                    placeholder="3500"
                  />
                  <span className="text-foreground font-medium">{t('actions.currency')}</span>
                </div>
              </div>

              {/* Remaining */}
              <div className="space-y-2">
                <Label htmlFor="remaining">{t('fields.remaining')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="remaining"
                    value={formData.remaining}
                    onChange={(e) => handleInputChange('remaining', e.target.value)}
                    placeholder="0"
                  />
                  <span className="text-foreground font-medium">{t('actions.currency')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{t('sections.notes')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder={t('fields.notesPlaceholder')}
              className="min-h-[120px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={handleClearData}
            className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600"
          >
            {t('actions.clearData')}
          </Button>
          <Button onClick={handleSaveData} className="bg-teal-600 hover:bg-teal-700 text-white">
            {t('actions.saveData')}
          </Button>
        </div>
      </div>
    </div>
  )
}
