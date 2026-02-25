import { memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { Post } from '../../types'
import styles from './PostCard.module.scss'

interface PostCardProps {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

/**
 * Post card component
 * Memoized to prevent unnecessary re-renders
 */
export const PostCard = memo(function PostCard({
  post,
  onEdit,
  onDelete,
  isDeleting = false,
}: PostCardProps) {
  return (
    <Card className={styles.postCard}>
      <CardHeader>
        <CardTitle className={styles.title}>{post.title}</CardTitle>
        <CardDescription className={styles.meta}>
          Post ID: {post.id} • User ID: {post.userId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className={styles.body}>{post.body}</p>
        <div className={styles.actions}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(post)}
            disabled={isDeleting}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

