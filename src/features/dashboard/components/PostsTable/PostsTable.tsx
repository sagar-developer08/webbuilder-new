import { useMemo, useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table'
import { Button } from '@/ui/button'
import { Pagination } from '@/shared/components/Pagination'
import { Post } from '../../types'
import { useDeletePost } from '../../hooks/useDeletePost'
import styles from './PostsTable.module.scss'

interface PostsTableProps {
  posts: Post[]
  onEdit: (post: Post) => void
  isLoading?: boolean
  itemsPerPage?: number
}

/**
 * Posts table component with pagination
 */
export function PostsTable({
  posts,
  onEdit,
  isLoading = false,
  itemsPerPage = 10,
}: PostsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const deletePost = useDeletePost()

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost.mutate(id)
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / itemsPerPage)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return posts.slice(startIndex, endIndex)
  }, [posts, currentPage, itemsPerPage])

  // Reset to first page when posts change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [posts.length, totalPages, currentPage])

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No posts found.</p>
      </div>
    )
  }

  return (
    <div className={styles.postsTable}>
      <div className={styles.tableWrapper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={styles.idColumn}>ID</TableHead>
              <TableHead className={styles.titleColumn}>Title</TableHead>
              <TableHead className={styles.bodyColumn}>Content</TableHead>
              <TableHead className={styles.userColumn}>User ID</TableHead>
              <TableHead className={styles.actionsColumn}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className={styles.idColumn}>{post.id}</TableCell>
                <TableCell className={styles.titleColumn}>
                  <div className={styles.titleCell}>{post.title}</div>
                </TableCell>
                <TableCell className={styles.bodyColumn}>
                  <div className={styles.bodyCell}>{post.body}</div>
                </TableCell>
                <TableCell className={styles.userColumn}>{post.userId}</TableCell>
                <TableCell className={styles.actionsColumn}>
                  <div className={styles.actions}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(post)}
                      disabled={deletePost.isPending}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      disabled={deletePost.isPending && deletePost.variables === post.id}
                    >
                      {deletePost.isPending && deletePost.variables === post.id
                        ? 'Deleting...'
                        : 'Delete'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={posts.length}
        />
      )}
    </div>
  )
}

