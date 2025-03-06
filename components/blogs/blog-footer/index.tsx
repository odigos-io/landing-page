'use client'
import theme from '@/style/theme'
import useIsMobile from '@/hooks/useIsMobile'
import { calculateReadingTime } from '@/utils'
import { Button, Text, UnderlineText } from '@/reuseable-components'

const COLOR = '#F5F5F576'

export const BlogFooter = ({ blog, isBlogPage }: { blog: any; isBlogPage?: boolean }) => {
  const { tags, content, pubDate, boldTag, buttonText, buttonLink } = blog
  const isMobile = useIsMobile()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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

      {!!boldTag && (
        <>
          <Text color={COLOR} fontFam={theme.font_family.secondary}>
            {'|'}
          </Text>
          <Text fontFam={theme.font_family.secondary}>{boldTag}</Text>
        </>
      )}

      {!!buttonText && !!buttonLink && isBlogPage && (
        <>
          <Text color={COLOR} fontFam={theme.font_family.secondary}>
            {'|'}
          </Text>
          <>
            <Button
              onClick={() => window.open(buttonLink, '_blank', 'noopener,noreferrer')}
              style={{
                background: theme.colors.secondary,
                width: isMobile ? 200 : 300,
              }}
              containerStyle={{
                width: isMobile ? 203 : 303,
              }}
            >
              <UnderlineText size={isMobile ? 16 : 20}>{buttonText}</UnderlineText>
            </Button>
          </>
        </>
      )}
    </div>
  )
}
