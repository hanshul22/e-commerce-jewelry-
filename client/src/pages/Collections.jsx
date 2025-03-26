import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { 
  FaPlus,
  FaSearch,
  FaFilter,
  FaTrash,
  FaPencilAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { 
  getCollections, 
  createCollection, 
  updateCollection, 
  deleteCollection,
  addItemToCollection,
  removeItemFromCollection 
} from '../lib/collections';

const collectionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  category: z.string().min(1, 'Category is required'),
});

function Collections() {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sortBy: 'created_at:desc'
  });

  // Fetch collections
  const { data: collections, isLoading } = useQuery(
    ['collections', filters],
    () => getCollections(filters)
  );

  // Mutations
  const createMutation = useMutation(createCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries('collections');
      toast.success('Collection created successfully');
      setIsCreateModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to create collection');
    }
  });

  const updateMutation = useMutation(updateCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries('collections');
      toast.success('Collection updated successfully');
      setEditingCollection(null);
    },
    onError: () => {
      toast.error('Failed to update collection');
    }
  });

  const deleteMutation = useMutation(deleteCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries('collections');
      toast.success('Collection deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete collection');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
    };

    try {
      const validated = collectionSchema.parse(data);
      if (editingCollection) {
        await updateMutation.mutateAsync({ id: editingCollection.id, ...validated });
      } else {
        await createMutation.mutateAsync(validated);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          toast.error(err.message);
        });
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-serif text-secondary">My Collections</h1>
          <p className="text-gray-600 mt-2">Organize and manage your favorite pieces</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus className="h-5 w-5" />
          New Collection
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <FaSearch className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search collections..."
            className="input pl-10"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
        
        <div className="flex gap-4">
          <select
            className="input"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            <option value="favorites">Favorites</option>
            <option value="wishlist">Wishlist</option>
            <option value="gift-ideas">Gift Ideas</option>
          </select>

          <select
            className="input"
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
          >
            <option value="created_at:desc">Newest First</option>
            <option value="created_at:asc">Oldest First</option>
            <option value="title:asc">Name A-Z</option>
            <option value="title:desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Collections Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
        </div>
      ) : collections?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No collections found. Create your first collection!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections?.map((collection) => (
            <div key={collection.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-xl text-secondary">{collection.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingCollection(collection)}
                    className="text-gray-400 hover:text-primary"
                  >
                    <FaPencilAlt className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this collection?')) {
                        deleteMutation.mutate(collection.id);
                      }
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{collection.description}</p>
              
              <div className="flex justify-between items-center text-sm">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  {collection.category}
                </span>
                <span className="text-gray-500">
                  {collection.collection_items?.length || 0} items
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || editingCollection) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-serif text-secondary mb-4">
              {editingCollection ? 'Edit Collection' : 'Create New Collection'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingCollection?.title}
                  className="input mt-1"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingCollection?.description}
                  className="input mt-1"
                  rows={3}
                  maxLength={500}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  defaultValue={editingCollection?.category}
                  className="input mt-1"
                >
                  <option value="">Select a category</option>
                  <option value="favorites">Favorites</option>
                  <option value="wishlist">Wishlist</option>
                  <option value="gift-ideas">Gift Ideas</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingCollection(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingCollection ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collections;