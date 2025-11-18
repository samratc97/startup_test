'use client'

import { useEffect, useState } from 'react'
import { Save, Phone, Mail, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { getContactInfoFromDB, updateContactInfoInDB } from '@/lib/firebase-service'
import type { ContactInfo } from '@/types'

export default function ContactAdmin() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<{
    email: string
    phone: string
    address: string
    website?: string
    socialMedia?: {
      facebook?: string
      twitter?: string
      linkedin?: string
      instagram?: string
    }
  }>({
    email: '',
    phone: '',
    address: '',
    website: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  })

  useEffect(() => {
    loadContactInfo()
  }, [])

  const loadContactInfo = async () => {
    setLoading(true)
    try {
      const data = await getContactInfoFromDB()
      setContactInfo(data)
      if (data) {
        setFormData({
          email: data.email,
          phone: data.phone,
          address: data.address,
          website: data.website || '',
          socialMedia: data.socialMedia || {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: ''
          }
        })
      }
    } catch (error) {
      console.error('Error loading contact info:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateContactInfoInDB(formData)
      alert('Contact information updated successfully!')
      await loadContactInfo()
    } catch (error) {
      console.error('Error saving contact info:', error)
      alert('Error saving contact information. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h1>
        <p className="text-gray-600">Manage contact details and social media links</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Contact Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="contact@icfai.ac.in"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 123 456 7890"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="inline h-4 w-4 mr-1" />
                Address *
              </label>
              <textarea
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Full address including city, state, and PIN code"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Globe className="inline h-4 w-4 mr-1" />
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.icfai.ac.in"
              />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Facebook className="inline h-4 w-4 mr-1" />
                  Facebook
                </label>
                <input
                  type="url"
                  value={formData.socialMedia?.facebook || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, facebook: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://facebook.com/your-page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Twitter className="inline h-4 w-4 mr-1" />
                  Twitter
                </label>
                <input
                  type="url"
                  value={formData.socialMedia?.twitter || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, twitter: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://twitter.com/your-handle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Linkedin className="inline h-4 w-4 mr-1" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.socialMedia?.linkedin || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, linkedin: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/company/your-company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Instagram className="inline h-4 w-4 mr-1" />
                  Instagram
                </label>
                <input
                  type="url"
                  value={formData.socialMedia?.instagram || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, instagram: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://instagram.com/your-profile"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
            >
              <Save className="h-5 w-5 mr-2" />
              {saving ? 'Saving...' : 'Save Contact Information'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Card */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Mail className="h-5 w-5 mr-3 text-blue-600" />
            <span>{formData.email || 'No email set'}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Phone className="h-5 w-5 mr-3 text-blue-600" />
            <span>{formData.phone || 'No phone set'}</span>
          </div>
          <div className="flex items-start text-gray-700">
            <MapPin className="h-5 w-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" />
            <span>{formData.address || 'No address set'}</span>
          </div>
          {formData.website && (
            <div className="flex items-center text-gray-700">
              <Globe className="h-5 w-5 mr-3 text-blue-600" />
              <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {formData.website}
              </a>
            </div>
          )}
          
          {(formData.socialMedia?.facebook || formData.socialMedia?.twitter || formData.socialMedia?.linkedin || formData.socialMedia?.instagram) && (
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-gray-700 mb-2">Social Media Links:</p>
              <div className="flex gap-3">
                {formData.socialMedia?.facebook && (
                  <a href={formData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                    <Facebook className="h-6 w-6" />
                  </a>
                )}
                {formData.socialMedia?.twitter && (
                  <a href={formData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                    <Twitter className="h-6 w-6" />
                  </a>
                )}
                {formData.socialMedia?.linkedin && (
                  <a href={formData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
                {formData.socialMedia?.instagram && (
                  <a href={formData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
                    <Instagram className="h-6 w-6" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}