'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react'
import { getCarouselImagesFromDB, addCarouselImageToDB, updateCarouselImageInDB, deleteCarouselImageFromDB } from '@/lib/firebase-service'
import type { CarouselImage } from '@/types'

export default function CarouselAdmin() {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null)
  const [formData, setFormData] = useState({
    url: '',
    alt: '',
    title: '',
    subtitle: '',
    link: ''
  })

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    setLoading(true)
    try {
      const data = await getCarouselImagesFromDB()
      setImages(data)
    } catch (error) {
      console.error('Error loading carousel images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingImage) {
        await updateCarouselImageInDB(editingImage.id, formData)
      } else {
        await addCarouselImageToDB(formData)
      }

      await loadImages()
      resetForm()
    } catch (error) {
      console.error('Error saving carousel image:', error)
      alert('Error saving carousel image. Please try again.')
    }
  }

  const handleEdit = (image: CarouselImage) => {
    setEditingImage(image)
    setFormData({
      url: image.url,
      alt: image.alt,
      title: image.title || '',
      subtitle: image.subtitle || '',
      link: image.link || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this carousel image?')) {
      try {
        await deleteCarouselImageFromDB(id)
        await loadImages()
      } catch (error) {
        console.error('Error deleting carousel image:', error)
        alert('Error deleting carousel image. Please try again.')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      url: '',
      alt: '',
      title: '',
      subtitle: '',
      link: ''
    })
    setEditingImage(null)
    setShowModal(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Carousel Management</h1>
          <p className="text-gray-600">Manage homepage carousel images</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Carousel Image
        </button>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                {image.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    {image.subtitle && (
                      <p className="text-white/90 text-sm">{image.subtitle}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">{image.alt}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(image)}
                    className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingImage ? 'Edit Carousel Image' : 'Add New Carousel Image'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text *</label>
                  <input
                    type="text"
                    required
                    value={formData.alt}
                    onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Descriptive text for accessibility"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Display title on image"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (Optional)</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional text below title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/page"
                  />
                </div>

                {formData.url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
                    <div className="relative h-48 rounded-lg overflow-hidden border border-gray-300">
                      <img src={formData.url} alt="Preview" className="w-full h-full object-cover" />
                      {formData.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <h3 className="text-white font-semibold text-lg">{formData.title}</h3>
                          {formData.subtitle && (
                            <p className="text-white/90 text-sm">{formData.subtitle}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingImage ? 'Update' : 'Create'} Carousel Image
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}