import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { usePosts } from '../hooks/usePosts'
import { PostsTable } from '../components/PostsTable'
import { CreatePostForm } from '../components/CreatePostForm'
import { EditPostForm } from '../components/EditPostForm'
import { Post } from '../types'
import styles from './DashboardPage.module.scss'

/**
 * Dashboard page component
 * Displays posts with CRUD operations
 */
export function DashboardPage() {
  const { data: posts = [], isLoading, error } = usePosts()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setShowCreateForm(false)
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
  }

  const handleCreateSuccess = () => {
    setShowCreateForm(false)
  }

  const handleEditSuccess = () => {
    setEditingPost(null)
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading posts: {error.message}</p>
      </div>
    )
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Dashboard</h1>
            <CardDescription className={styles.subtitle}>
              Manage your posts - Create, Read, Update, Delete
            </CardDescription>
          </div>
          {!showCreateForm && !editingPost && (
            <Button onClick={() => setShowCreateForm(true)}>
              Create New Post
            </Button>
          )}
        </header>

        <div className={styles.content}>
          {showCreateForm && (
            <Card className={styles.formCard}>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent>
                <CreatePostForm onSuccess={handleCreateSuccess} />
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          )}

          {editingPost && (
            <Card className={styles.formCard}>
              <CardHeader>
                <CardTitle>Edit Post</CardTitle>
              </CardHeader>
              <CardContent>
                <EditPostForm
                  post={editingPost}
                  onSuccess={handleEditSuccess}
                  onCancel={handleCancelEdit}
                />
              </CardContent>
            </Card>
          )}

          <Card className={styles.postsCard}>
            <CardHeader>
              <CardTitle>Posts ({posts.length})</CardTitle>
              <CardDescription>
                Using JSONPlaceholder API - All operations are simulated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PostsTable posts={posts} onEdit={handleEdit} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

