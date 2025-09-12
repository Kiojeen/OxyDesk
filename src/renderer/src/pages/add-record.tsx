import React, { useState, useEffect } from 'react'
import {
  Save,
  RotateCcw,
  User,
  Briefcase,
  Calculator,
  CreditCard,
  StickyNote,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { z } from 'zod'

// Zod schema for form validation
const formSchema = z.object({
  clientName: z.string().min(1, 'اسم الزبون مطلوب'),
  workType: z.string().min(1, 'نوع العمل مطلوب'),
  workDetails: z.string().optional(),
  pricePerUnit: z.string().refine(
    (val) => {
      const num = parseFloat(val)
      return !isNaN(num) && num > 0
    },
    { message: 'سعر الوحدة يجب أن يكون أكبر من صفر' }
  ),
  quantity: z.string().refine(
    (val) => {
      const num = parseFloat(val)
      return !isNaN(num) && num > 0
    },
    { message: 'العدد يجب أن يكون أكبر من صفر' }
  ),
  discount: z.string().optional(),
  total: z.string(),
  paid: z.string().optional(),
  remaining: z.string(),
  notes: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

interface FormSectionProps {
  title: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export const FormSection = ({ title, children, className, icon }: FormSectionProps) => {
  return (
    <fieldset
      className={`border-2 rounded-xl p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300 ${className || ''}`}
    >
      <legend className="px-4 text-lg font-bold select-none text-gray-800 flex items-center gap-2 bg-white">
        {icon}
        {title}
      </legend>
      <div className="flex flex-col gap-4 mt-2">{children}</div>
    </fieldset>
  )
}

interface FormFieldProps {
  label: string
  children: React.ReactNode
  className?: string
  required?: boolean
  error?: string
}

export const FormField = ({ label, children, className, required, error }: FormFieldProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      <label className="text-sm text-gray-700 font-semibold select-none flex items-center gap-1">
        {label}
        {required && <span className="text-red-500 text-base">*</span>}
      </label>
      <div
        className={`border-2 rounded-xl px-2 bg-white focus-within:ring-3 transition-all duration-200 ${
          error
            ? 'border-red-300 focus-within:ring-red-200 focus-within:border-red-400'
            : 'border-gray-200 focus-within:ring-orange-200 focus-within:border-orange-400 hover:border-gray-300'
        }`}
      >
        {children}
      </div>
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 animate-pulse">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

export default function AddRecord() {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    workType: '',
    workDetails: '',
    pricePerUnit: '0',
    quantity: '0',
    discount: '0',
    total: '0',
    paid: '0',
    remaining: '0',
    notes: ''
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  // Validate form using Zod
  const validateForm = () => {
    try {
      formSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  // Calculate totals with improved precision
  useEffect(() => {
    const price = Math.max(0, parseFloat(formData.pricePerUnit) || 0)
    const qty = Math.max(0, parseFloat(formData.quantity) || 0)
    const disc = Math.max(0, parseFloat(formData.discount || '0') || 0)
    const paidAmount = Math.max(0, parseFloat(formData.paid || '0') || 0)

    const calculatedTotal = Math.max(0, price * qty - disc)
    const calculatedRemaining = Math.max(0, calculatedTotal - paidAmount)

    // Format numbers more elegantly
    const formatNumber = (num: number) => {
      if (num === Math.floor(num)) {
        return num.toString()
      }
      return num.toFixed(2).replace(/\.?0+$/, '')
    }

    setFormData((prev) => ({
      ...prev,
      total: formatNumber(calculatedTotal),
      remaining: formatNumber(calculatedRemaining)
    }))
  }, [formData.pricePerUnit, formData.quantity, formData.discount, formData.paid])

  const handleSave = () => {
    if (validateForm()) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      // Here you would typically save the data
      console.log('Form saved:', formData)
    }
  }

  const handleReset = () => {
    setFormData({
      clientName: '',
      workType: '',
      workDetails: '',
      pricePerUnit: '0',
      quantity: '0',
      discount: '0',
      total: '0',
      paid: '0',
      remaining: '0',
      notes: ''
    })
    setErrors({})
    setShowSuccess(false)
  }

  // Handle number input changes with validation
  const handleNumberChange = (field: keyof FormData, value: string) => {
    const numValue = value === '' ? '0' : value
    if (numValue === '' || /^\d*\.?\d*$/.test(numValue)) {
      setFormData({ ...formData, [field]: numValue })

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }
  }

  // Handle text input changes
  const handleTextChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const paymentStatus = () => {
    const remaining = parseFloat(formData.remaining) || 0
    if (remaining === 0 && parseFloat(formData.total) > 0) {
      return { text: 'مدفوع بالكامل', color: 'text-green-600', bg: 'bg-green-100' }
    } else if (remaining > 0 && parseFloat(formData.paid || '0') > 0) {
      return { text: 'دفع جزئي', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    } else if (remaining > 0) {
      return { text: 'غير مدفوع', color: 'text-red-600', bg: 'bg-red-100' }
    }
    return { text: '', color: '', bg: '' }
  }

  const status = paymentStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="flex flex-col gap-8 p-6 max-w-[1400px] mx-auto font-sans">
        {/* Success notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
            <CheckCircle size={20} />
            تم حفظ التقرير بنجاح!
          </div>
        )}

        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 select-none">
            إضافة تقرير جديد
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Client Information */}
          <FormSection
            className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300"
            title="بيانات العميل"
            icon={<User className="text-orange-600" size={20} />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Column */}
              <FormField label="اسم الزبون" required error={errors.clientName}>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleTextChange('clientName', e.target.value)}
                  placeholder="ادخل اسم الزبون"
                  className="w-full bg-transparent focus:outline-none py-2 px-1 text-lg"
                />
              </FormField>

              {/* Second Column */}
              <FormField label="نوع العمل" required error={errors.workType}>
                <input
                  type="text"
                  value={formData.workType}
                  onChange={(e) => handleTextChange('workType', e.target.value)}
                  placeholder="ادخل نوع العمل"
                  className="w-full bg-transparent focus:outline-none py-2 px-1 text-lg"
                />
              </FormField>

              {/* Textarea - Spans Across Both Columns */}
              <FormField label="تفاصيل العمل" className="col-span-full">
                <textarea
                  value={formData.workDetails}
                  onChange={(e) => handleTextChange('workDetails', e.target.value)}
                  placeholder="ادخل تفاصيل العمل"
                  rows={4}
                  className="w-full bg-transparent resize-none focus:outline-none py-2 px-1 text-lg"
                />
              </FormField>
            </div>
          </FormSection>

          {/* Payment Details */}
          <FormSection
            className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-300"
            title="تفاصيل التكلفة"
            icon={<Calculator className="text-green-600" size={20} />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="سعر الوحدة (د.ع.)" required error={errors.pricePerUnit}>
                <input
                  type="number"
                  value={formData.pricePerUnit}
                  onChange={(e) => handleNumberChange('pricePerUnit', e.target.value)}
                  placeholder="ادخل السعر"
                  step="250"
                  min="0"
                  className="w-full bg-transparent focus:outline-none py-2 px-1 text-lg"
                />
              </FormField>
              <FormField label="العدد" required error={errors.quantity}>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleNumberChange('quantity', e.target.value)}
                  placeholder="ادخل العدد"
                  min="0"
                  step="1"
                  className="w-full bg-transparent focus:outline-none py-2 px-1 text-lg"
                />
              </FormField>
              <FormField label="الخصم (د.ع.)">
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => handleNumberChange('discount', e.target.value)}
                  placeholder="ادخل الخصم"
                  step="250"
                  min="0"
                  className="w-full bg-transparent focus:outline-none py-2 px-1 text-lg"
                />
              </FormField>
              <FormField label="المجموع الكلي (د.ع.)">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={formData.total}
                    readOnly
                    className="w-full bg-gray-50 focus:outline-none py-2 px-1 text-lg font-bold text-green-700 rounded-lg"
                  />
                </div>
              </FormField>
            </div>
          </FormSection>

          {/* Payment Status */}
          <FormSection
            className="bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-300"
            title="حالة الدفع"
            icon={<CreditCard className="text-yellow-600" size={20} />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="الواصل (د.ع.)">
                <input
                  type="number"
                  value={formData.paid}
                  onChange={(e) => handleNumberChange('paid', e.target.value)}
                  placeholder="ادخل المبلغ الواصل"
                  step="250"
                  min="0"
                  className="w-full bg-transparent focus:outline-none py-2 px-1 text-lg"
                />
              </FormField>
              <FormField label="المتبقي (د.ع.)">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={formData.remaining}
                    readOnly
                    className="w-full bg-gray-50 focus:outline-none py-2 px-1 text-lg font-bold text-red-700 rounded-lg"
                  />
                </div>
              </FormField>
            </div>

            {/* Payment Status Indicator */}
            {status.text && (
              <div
                className={`${status.bg} ${status.color} p-3 rounded-xl text-center font-bold text-lg border-2 border-current border-opacity-20`}
              >
                {status.text}
              </div>
            )}
          </FormSection>

          {/* Notes */}
          <FormSection
            className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-300"
            title="الملاحظات"
            icon={<StickyNote className="text-blue-600" size={20} />}
          >
            <FormField label="أدخل الملاحظات هنا">
              <textarea
                value={formData.notes}
                onChange={(e) => handleTextChange('notes', e.target.value)}
                placeholder="اكتب ملاحظات إضافية..."
                rows={6}
                className="w-full h-full bg-transparent resize-none focus:outline-none py-2 px-1 text-lg"
              />
            </FormField>
          </FormSection>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-12 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-bold text-xl flex items-center justify-center gap-3"
          >
            <Save size={24} />
            حفظ التقرير
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-12 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-bold text-xl flex items-center justify-center gap-3"
          >
            <RotateCcw size={24} />
            إعادة تعيين
          </button>
        </div>

        {/* Summary Card */}
        {parseFloat(formData.total) > 0 && (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">ملخص التقرير</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">المجموع الكلي</p>
                <p className="text-2xl font-bold text-blue-600">{formData.total} د.ع.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">المبلغ المدفوع</p>
                <p className="text-2xl font-bold text-green-600">{formData.paid} د.ع.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">المبلغ المتبقي</p>
                <p className="text-2xl font-bold text-red-600">{formData.remaining} د.ع.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
