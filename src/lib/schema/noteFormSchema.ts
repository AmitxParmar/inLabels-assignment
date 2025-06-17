import { z } from 'zod'

export const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  content: z.string().min(5, 'Content must be at least 5 characters.'),
  color: z.enum([
    '#F8F9FA',
    '#FFF3BF',
    '#D3F9D8',
    '#FFE3E3',
    '#E7F5FF',
    '#F3F0F0',
  ]),
  category: z.enum(['work', 'personal', 'ideas']),
  isPinned: z.boolean(),
})
