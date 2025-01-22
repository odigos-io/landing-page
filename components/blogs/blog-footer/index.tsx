'use client'
import theme from '@/style/theme'
import { Text } from '@/reuseable-components'
import { calculateReadingTime } from '@/utils'

const COLOR = '#F5F5F576'

export const BlogFooter = ({ blog }: { blog: any }) => {
  const { tags, content, pubDate } = blog

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Text color={COLOR} fontFam={theme.font_family.secondary}>
        {tags?.[0]?.toUpperCase() || 'OBSERVABILITY'}
      </Text>
      <Text color={COLOR} fontFam={theme.font_family.secondary}>
        {'|'}
      </Text>
      <Text color={COLOR} fontFam={theme.font_family.secondary}>
        {`${calculateReadingTime(content)} MIN READ` || ''}
      </Text>
      <Text color={COLOR} fontFam={theme.font_family.secondary}>
        {'|'}
      </Text>
      <Text color={COLOR} fontFam={theme.font_family.secondary}>
        {new Date(pubDate).toDateString() || '-'}
      </Text>
    </div>
  )
}
