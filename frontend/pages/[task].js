import { useRouter } from 'next/router'

export default function Task() {
  const router = useRouter()
  const { task } = router.query

  return <p>task: {task}</p>
}